import express from 'express';
import multer from 'multer';
import cors from 'cors';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { Resend } from 'resend';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.join(__dirname, '..');

const app = express();
const PORT = 3001;
const DATA_FILE = path.join(ROOT, 'public', 'portfolio-data.json');
const CONTACTS_FILE = path.join(ROOT, 'public', 'contacts.json');
const UPLOADS_DIR = path.join(ROOT, 'public', 'uploads');
const ADMIN_TOKEN = process.env.ADMIN_TOKEN || 'trimmic2024';

// Ensure uploads dir exists
if (!fs.existsSync(UPLOADS_DIR)) fs.mkdirSync(UPLOADS_DIR, { recursive: true });

// Allow all origins (local dev admin tool)
app.use(cors());
app.use(express.json({ limit: '10mb' }));

// ─── Multer ────────────────────────────────────────────────
const storage = multer.diskStorage({
  destination: UPLOADS_DIR,
  filename: (_, file, cb) => {
    const ext = path.extname(file.originalname).toLowerCase();
    cb(null, `${Date.now()}-${Math.random().toString(36).slice(2)}${ext}`);
  },
});
const upload = multer({ storage, limits: { fileSize: 500 * 1024 * 1024 } });

// ─── Helpers ───────────────────────────────────────────────
function readData() {
  try {
    const raw = fs.readFileSync(DATA_FILE, 'utf8');
    return JSON.parse(raw);
  } catch {
    return { items: [] };
  }
}

function writeData(d) {
  fs.writeFileSync(DATA_FILE, JSON.stringify(d, null, 2), 'utf8');
}

function auth(req, res, next) {
  const tok = req.headers['x-admin-token'];
  if (tok !== ADMIN_TOKEN) {
    return res.status(401).json({ error: 'Unauthorized' });
  }
  next();
}

// ─── Public ────────────────────────────────────────────────
app.get('/api/portfolio', (_, res) => {
  try {
    res.json(readData().items);
  } catch (err) {
    res.status(500).json({ error: String(err) });
  }
});

// ─── Auth ──────────────────────────────────────────────────
app.post('/api/admin/login', (req, res) => {
  try {
    const { password } = req.body || {};
    if (password === ADMIN_TOKEN) {
      res.json({ token: ADMIN_TOKEN });
    } else {
      res.status(401).json({ error: 'Wrong password' });
    }
  } catch (err) {
    res.status(500).json({ error: String(err) });
  }
});

// ─── Portfolio CRUD ────────────────────────────────────────
app.post('/api/admin/portfolio', auth, (req, res) => {
  try {
    const d = readData();
    const item = { id: Date.now(), ...req.body, createdAt: new Date().toISOString() };
    d.items.unshift(item);
    writeData(d);
    res.json(item);
  } catch (err) {
    res.status(500).json({ error: String(err) });
  }
});

app.put('/api/admin/portfolio/:id', auth, (req, res) => {
  try {
    const d = readData();
    const i = d.items.findIndex(x => String(x.id) === req.params.id);
    if (i < 0) return res.status(404).json({ error: 'Not found' });
    d.items[i] = { ...d.items[i], ...req.body };
    writeData(d);
    res.json(d.items[i]);
  } catch (err) {
    res.status(500).json({ error: String(err) });
  }
});

app.delete('/api/admin/portfolio/:id', auth, (req, res) => {
  try {
    const d = readData();
    d.items = d.items.filter(x => String(x.id) !== req.params.id);
    writeData(d);
    res.json({ ok: true });
  } catch (err) {
    res.status(500).json({ error: String(err) });
  }
});

app.put('/api/admin/portfolio-order', auth, (req, res) => {
  try {
    const d = readData();
    const map = Object.fromEntries(d.items.map(i => [String(i.id), i]));
    d.items = (req.body.ids || []).map(id => map[String(id)]).filter(Boolean);
    writeData(d);
    res.json({ ok: true });
  } catch (err) {
    res.status(500).json({ error: String(err) });
  }
});

// ─── Contact form ──────────────────────────────────────────
app.post('/api/contacts', async (req, res) => {
  try {
    const { name, email, service, budget, message } = req.body || {};
    if (!name?.trim()) return res.status(400).json({ error: 'Name is required' });
    if (!email?.includes('@')) return res.status(400).json({ error: 'Valid email is required' });
    if (!message?.trim()) return res.status(400).json({ error: 'Message is required' });

    // Save to contacts.json
    let data = { contacts: [] };
    try { data = JSON.parse(fs.readFileSync(CONTACTS_FILE, 'utf8')); } catch {}
    const contact = { id: Date.now(), name: name.trim(), email, service, budget, message: message.trim(), submittedAt: new Date().toISOString() };
    data.contacts.unshift(contact);
    fs.writeFileSync(CONTACTS_FILE, JSON.stringify(data, null, 2));
    console.log('[Contact] Saved from', email);

    // Send email if Resend key is configured
    if (process.env.RESEND_API_KEY) {
      try {
        const resend = new Resend(process.env.RESEND_API_KEY);
        await resend.emails.send({
          from: 'Trimmic Studio <hello@trimmic.com>',
          to: ['hello@trimmic.com'],
          replyTo: email,
          subject: `New inquiry from ${name.trim()}`,
          html: `<div style="font-family:sans-serif;max-width:600px;margin:0 auto;padding:24px">
            <h2 style="margin-top:0">New Project Inquiry</h2>
            <table style="width:100%;border-collapse:collapse">
              <tr><td style="padding:8px 0;font-weight:bold;width:120px">Name</td><td>${name.trim()}</td></tr>
              <tr><td style="padding:8px 0;font-weight:bold">Email</td><td><a href="mailto:${email}">${email}</a></td></tr>
              <tr><td style="padding:8px 0;font-weight:bold">Service</td><td>${service || 'Not specified'}</td></tr>
              <tr><td style="padding:8px 0;font-weight:bold">Budget</td><td>${budget || 'Not specified'}</td></tr>
            </table>
            <hr style="margin:16px 0;border:none;border-top:1px solid #eee"/>
            <p style="font-weight:bold;margin-bottom:8px">Message</p>
            <p style="white-space:pre-wrap;margin:0">${message.trim().replace(/</g, '&lt;').replace(/>/g, '&gt;')}</p>
          </div>`,
        });
        console.log('[Contact] Email sent to hello@trimmic.com');
      } catch (emailErr) {
        console.error('[Contact] Email error (message was still saved):', emailErr.message);
      }
    } else {
      console.log('[Contact] RESEND_API_KEY not set — skipping email (message saved to contacts.json)');
    }

    res.status(201).json({ success: true });
  } catch (err) {
    res.status(500).json({ error: String(err) });
  }
});

// ─── File upload ───────────────────────────────────────────
app.post('/api/admin/upload', auth, upload.single('file'), (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ error: 'No file received' });
    res.json({ url: `/uploads/${req.file.filename}` });
  } catch (err) {
    res.status(500).json({ error: String(err) });
  }
});

// ─── Global error handler ──────────────────────────────────
app.use((err, req, res, _next) => {
  console.error('[CMS Error]', err);
  res.status(500).json({ error: err.message || String(err) });
});

// ─── Start ─────────────────────────────────────────────────
app.listen(PORT, () => {
  console.log('');
  console.log('  Trimmic CMS Server running');
  console.log('  API    -> http://localhost:' + PORT);
  console.log('  Upload -> http://localhost:' + PORT + '/api/admin/upload');
  console.log('  Token  -> ' + ADMIN_TOKEN);
  console.log('');
});

process.on('uncaughtException', err => console.error('[Uncaught]', err));
process.on('unhandledRejection', err => console.error('[Unhandled]', err));
