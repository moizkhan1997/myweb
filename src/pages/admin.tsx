import React, { useState, useEffect, useRef, useCallback } from "react";

const CATEGORIES = [
  "SaaS Videos",
  "Shorts",
  "UGC",
  "YouTube Videos",
  "Branding",
  "Motion Graphics",
  "Explainer Videos",
  "Digital Marketing",
];

type Item = {
  id: number;
  title: string;
  client: string;
  category: string;
  tall: boolean;
  imageUrl: string | null;
  videoUrl: string;
  description: string;
  createdAt: string;
};

type FormState = Omit<Item, "id" | "createdAt">;

const BLANK: FormState = {
  title: "",
  client: "",
  category: "SaaS Videos",
  tall: false,
  imageUrl: null,
  videoUrl: "",
  description: "",
};

function getYouTubeId(url: string) {
  const m = url.match(/[?&]v=([^&]+)/) || url.match(/youtu\.be\/([^?]+)/);
  return m ? m[1] : null;
}

function Thumbnail({ item }: { item: Item }) {
  const ytId = item.videoUrl ? getYouTubeId(item.videoUrl) : null;
  if (item.imageUrl) {
    const isVideo = /\.(mp4|mov|webm)$/i.test(item.imageUrl);
    if (isVideo) {
      return (
        <video src={item.imageUrl} className="h-full w-full object-cover" muted loop />
      );
    }
    return <img src={item.imageUrl} alt={item.title} className="h-full w-full object-cover" />;
  }
  if (ytId) {
    return (
      <img
        src={`https://img.youtube.com/vi/${ytId}/maxresdefault.jpg`}
        onError={(e) => { e.currentTarget.src = `https://img.youtube.com/vi/${ytId}/hqdefault.jpg`; }}
        alt={item.title}
        className="h-full w-full object-cover"
      />
    );
  }
  return (
    <div
      className="h-full w-full flex items-center justify-center text-3xl font-bold text-white"
      style={{ background: "linear-gradient(120deg,#febe41,#e17eb3,#8cc86c,#4bbfae)" }}
    >
      {item.title?.[0] ?? "?"}
    </div>
  );
}

export default function AdminPage() {
  const [token, setToken] = useState(() => sessionStorage.getItem("trimmic-cms") || "");
  const [password, setPassword] = useState("");
  const [loginErr, setLoginErr] = useState("");

  const [items, setItems] = useState<Item[]>([]);
  const [loading, setLoading] = useState(false);
  const [filter, setFilter] = useState("All");

  const [modal, setModal] = useState<"add" | "edit" | null>(null);
  const [editId, setEditId] = useState<number | null>(null);
  const [form, setForm] = useState<FormState>(BLANK);
  const [saving, setSaving] = useState(false);
  const [deleteId, setDeleteId] = useState<number | null>(null);

  const [uploading, setUploading] = useState(false);
  const [dragOver, setDragOver] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);

  const headers = { "x-admin-token": token, "Content-Type": "application/json" };

  // ── Auth ──────────────────────────────────────────────────
  function login(e: React.FormEvent) {
    e.preventDefault();
    if (password === "trimmic2024") {
      setToken("trimmic2024");
      sessionStorage.setItem("trimmic-cms", "trimmic2024");
    } else {
      setLoginErr("Wrong password.");
    }
  }

  function logout() {
    setToken("");
    sessionStorage.removeItem("trimmic-cms");
  }

  // ── Data ──────────────────────────────────────────────────
  const load = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch("/portfolio-data.json?" + Date.now());
      const data = await res.json();
      setItems(data.items || []);
    } catch {
      setItems([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { if (token) load(); }, [token, load]);

  // ── Upload ────────────────────────────────────────────────
  async function uploadFile(file: File) {
    setUploading(true);
    const fd = new FormData();
    fd.append("file", file);
    try {
      const res = await fetch("/api/admin/upload", {
        method: "POST",
        headers: { "x-admin-token": token },
        body: fd,
      });
      const { url } = await res.json();
      setForm(f => ({ ...f, imageUrl: url }));
    } catch {
      alert("Upload failed — is the CMS server running?");
    } finally {
      setUploading(false);
    }
  }

  // ── CRUD ──────────────────────────────────────────────────
  function openAdd() { setForm(BLANK); setEditId(null); setModal("add"); }
  function openEdit(item: Item) {
    setForm({
      title: item.title,
      client: item.client,
      category: item.category,
      tall: item.tall,
      imageUrl: item.imageUrl,
      videoUrl: item.videoUrl || "",
      description: item.description || "",
    });
    setEditId(item.id);
    setModal("edit");
  }

  async function save() {
    if (!form.title.trim()) return alert("Title is required");
    setSaving(true);
    try {
      const url = modal === "add" ? "/api/admin/portfolio" : `/api/admin/portfolio/${editId}`;
      const res = await fetch(url, {
        method: modal === "add" ? "POST" : "PUT",
        headers,
        body: JSON.stringify(form),
      });
      if (res.ok) { await load(); setModal(null); }
      else alert("Save failed");
    } catch { alert("Save failed — is the CMS server running?"); }
    finally { setSaving(false); }
  }

  async function del(id: number) {
    if (!confirm("Delete this item permanently?")) return;
    setDeleteId(id);
    try {
      await fetch(`/api/admin/portfolio/${id}`, { method: "DELETE", headers });
      await load();
    } catch { alert("Delete failed"); }
    finally { setDeleteId(null); }
  }

  const filtered = filter === "All" ? items : items.filter(i => i.category === filter);

  // ── Login screen ──────────────────────────────────────────
  if (!token) {
    return (
      <div className="min-h-screen bg-ink flex items-center justify-center p-6">
        <div
          aria-hidden
          className="pointer-events-none fixed inset-0 opacity-20"
          style={{ background: "radial-gradient(60% 60% at 30% 30%,#febe41 0%,transparent 70%),radial-gradient(50% 50% at 80% 80%,#e17eb3 0%,transparent 70%)" }}
        />
        <div className="relative bg-white rounded-3xl p-10 w-full max-w-sm shadow-2xl">
          <div className="text-center mb-8">
            <div className="mx-auto h-14 w-14 rounded-2xl bg-ink flex items-center justify-center mb-4">
              <svg viewBox="0 0 180 180" className="h-8 w-8" fill="none">
                <path d="M99.27,180h-22.46v-54.02c-.3-5.58-1.27-14.85-2.51-18.58-2.73-8.15-10.17-15.63-20.42-20.51-8.45-4.03-27.72-8.04-34.43-9.25l-9.8-1.76c-3.52-.63-5.19-4.71-3.13-7.64l23.02-32.62c1.33-1.89,3.5-3.01,5.81-3.01h139.03v22.46H43.3l-2.87,4.07c7.94,1.94,16.95,4.52,23.11,7.46,15.96,7.61,27.34,19.57,32.06,33.67,2.69,8.03,3.52,22.09,3.66,24.83v.57s.01,54.32.01,54.32Z" fill="white" />
              </svg>
            </div>
            <h1 className="font-display text-2xl">Trimmic CMS</h1>
            <p className="text-muted-foreground text-sm mt-1">Portfolio Manager</p>
          </div>
          <form onSubmit={login} className="space-y-4">
            {loginErr && (
              <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">{loginErr}</div>
            )}
            <div>
              <label className="block text-xs font-medium uppercase tracking-widest text-muted-foreground mb-2">Password</label>
              <input
                type="password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                placeholder="Enter admin password"
                autoFocus
                className="w-full rounded-2xl border border-border px-5 py-3.5 text-sm focus:outline-none focus:ring-2 focus:ring-ink/20"
              />
            </div>
            <button
              type="submit"
              className="w-full rounded-full bg-ink text-cream py-4 text-sm font-medium hover:bg-ink/90 transition"
            >
              Sign in →
            </button>
          </form>
          <p className="mt-6 text-center text-xs text-muted-foreground">
            Default password: <code className="bg-muted px-1.5 py-0.5 rounded">trimmic2024</code>
          </p>
        </div>
      </div>
    );
  }

  // ── Dashboard ─────────────────────────────────────────────
  return (
    <div className="min-h-screen bg-[#f7f6f2] text-foreground">

      {/* Header */}
      <header className="sticky top-0 z-30 bg-white border-b border-border">
        <div className="px-6 md:px-10 flex items-center justify-between h-16">
          <div className="flex items-center gap-3">
            <div className="h-8 w-8 rounded-xl bg-ink flex items-center justify-center shrink-0">
              <svg viewBox="0 0 180 180" className="h-5 w-5" fill="none">
                <path d="M99.27,180h-22.46v-54.02c-.3-5.58-1.27-14.85-2.51-18.58-2.73-8.15-10.17-15.63-20.42-20.51-8.45-4.03-27.72-8.04-34.43-9.25l-9.8-1.76c-3.52-.63-5.19-4.71-3.13-7.64l23.02-32.62c1.33-1.89,3.5-3.01,5.81-3.01h139.03v22.46H43.3l-2.87,4.07c7.94,1.94,16.95,4.52,23.11,7.46,15.96,7.61,27.34,19.57,32.06,33.67,2.69,8.03,3.52,22.09,3.66,24.83v.57s.01,54.32.01,54.32Z" fill="white" />
              </svg>
            </div>
            <div className="leading-tight">
              <div className="font-display text-base">Trimmic CMS</div>
              <div className="text-xs text-muted-foreground">{items.length} portfolio items</div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <a
              href="/"
              target="_blank"
              className="hidden sm:inline-flex items-center gap-1.5 rounded-full border border-border px-4 py-2 text-xs font-medium hover:bg-muted transition"
            >
              View Site ↗
            </a>
            <button
              onClick={openAdd}
              className="inline-flex items-center gap-1.5 rounded-full bg-ink text-cream px-5 py-2.5 text-sm font-medium hover:bg-ink/90 transition"
            >
              + New Item
            </button>
            <button
              onClick={logout}
              className="h-9 w-9 rounded-full border border-border flex items-center justify-center text-muted-foreground hover:bg-muted transition text-sm"
              title="Sign out"
            >
              ↩
            </button>
          </div>
        </div>
      </header>

      <div className="px-6 md:px-10 py-8">

        {/* Stats row */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
          {[
            { label: "Total Items", value: items.length },
            { label: "With Video", value: items.filter(i => i.videoUrl).length },
            { label: "Featured", value: items.filter(i => i.tall).length },
            { label: "Categories", value: [...new Set(items.map(i => i.category))].length },
          ].map(s => (
            <div key={s.label} className="bg-white rounded-2xl border border-border p-5">
              <div className="font-display text-3xl">{s.value}</div>
              <div className="text-xs text-muted-foreground mt-1 uppercase tracking-widest">{s.label}</div>
            </div>
          ))}
        </div>

        {/* Filter pills */}
        <div className="flex items-center gap-2 mb-6 flex-wrap">
          {["All", ...CATEGORIES].map(cat => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`rounded-full px-4 py-1.5 text-sm font-medium transition ${
                filter === cat
                  ? "bg-ink text-cream"
                  : "bg-white border border-border text-muted-foreground hover:text-foreground hover:border-ink/30"
              }`}
            >
              {cat}
              {cat !== "All" && (
                <span className="ml-1.5 text-xs opacity-60">
                  {items.filter(i => i.category === cat).length}
                </span>
              )}
            </button>
          ))}
        </div>

        {/* Grid */}
        {loading ? (
          <div className="flex items-center justify-center py-24 text-muted-foreground">
            <span className="animate-spin text-2xl mr-3">↻</span> Loading…
          </div>
        ) : filtered.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-28 text-center">
            <div className="h-20 w-20 rounded-3xl bg-gradient-brand flex items-center justify-center text-3xl mb-4">🎬</div>
            <h3 className="font-display text-2xl">No items yet</h3>
            <p className="text-muted-foreground mt-2 text-sm max-w-xs">
              Click <strong>"+ New Item"</strong> to add your first portfolio piece — upload a video, image, or paste a YouTube link.
            </p>
            <button
              onClick={openAdd}
              className="mt-6 rounded-full bg-ink text-cream px-7 py-3.5 text-sm font-medium hover:bg-ink/90 transition"
            >
              + Add your first item
            </button>
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {filtered.map(item => (
              <div
                key={item.id}
                className="group relative bg-white rounded-2xl border border-border overflow-hidden hover:shadow-lg hover:-translate-y-0.5 transition-all duration-200"
              >
                {/* Thumbnail */}
                <div className="relative h-44 overflow-hidden bg-muted">
                  <Thumbnail item={item} />
                  {/* Hover actions */}
                  <div className="absolute inset-0 bg-ink/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-3">
                    <button
                      onClick={() => openEdit(item)}
                      className="h-10 w-10 rounded-full bg-white text-ink flex items-center justify-center hover:bg-ink hover:text-cream transition shadow-lg text-base"
                      title="Edit"
                    >
                      ✏
                    </button>
                    <button
                      onClick={() => del(item.id)}
                      disabled={deleteId === item.id}
                      className="h-10 w-10 rounded-full bg-white text-red-500 flex items-center justify-center hover:bg-red-500 hover:text-white transition shadow-lg text-base"
                      title="Delete"
                    >
                      {deleteId === item.id ? "…" : "✕"}
                    </button>
                  </div>
                  {/* Badges */}
                  <div className="absolute top-2 left-2 flex gap-1.5">
                    {item.tall && (
                      <span className="rounded-full bg-brand-yellow text-ink text-[10px] font-semibold px-2 py-0.5 uppercase tracking-wide">
                        Featured
                      </span>
                    )}
                    {item.videoUrl && (
                      <span className="rounded-full bg-ink/80 text-cream text-[10px] font-semibold px-2 py-0.5 uppercase tracking-wide">
                        ▶ Video
                      </span>
                    )}
                  </div>
                </div>
                {/* Info */}
                <div className="p-4">
                  <div className="text-[10px] font-semibold uppercase tracking-widest text-muted-foreground mb-1">
                    {item.category}
                  </div>
                  <h3 className="font-display text-lg leading-tight">{item.title}</h3>
                  <p className="text-sm text-muted-foreground mt-0.5">{item.client}</p>
                  {item.description && (
                    <p className="text-xs text-muted-foreground mt-2 line-clamp-2">{item.description}</p>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* ── Add / Edit Modal ── */}
      {modal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-ink/50 backdrop-blur-sm"
          onClick={() => setModal(null)}
        >
          <div
            className="bg-white rounded-3xl w-full max-w-2xl max-h-[92vh] overflow-y-auto shadow-2xl"
            onClick={e => e.stopPropagation()}
          >
            {/* Modal header */}
            <div className="sticky top-0 bg-white border-b border-border px-8 py-5 flex items-center justify-between rounded-t-3xl">
              <h2 className="font-display text-xl">
                {modal === "add" ? "Add Portfolio Item" : "Edit Item"}
              </h2>
              <button
                onClick={() => setModal(null)}
                className="h-9 w-9 rounded-full border border-border flex items-center justify-center text-muted-foreground hover:bg-muted transition"
              >
                ✕
              </button>
            </div>

            <div className="px-8 py-6 space-y-6">

              {/* ── Image / Video Upload ── */}
              <div>
                <label className="block text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-3">
                  Media — Image or Video
                </label>

                {/* Drop zone */}
                <div
                  className={`relative border-2 border-dashed rounded-2xl transition-colors ${
                    dragOver ? "border-ink bg-ink/5" : "border-border"
                  }`}
                  onDragOver={e => { e.preventDefault(); setDragOver(true); }}
                  onDragLeave={() => setDragOver(false)}
                  onDrop={e => {
                    e.preventDefault(); setDragOver(false);
                    const f = e.dataTransfer.files[0];
                    if (f) uploadFile(f);
                  }}
                >
                  {form.imageUrl ? (
                    <div className="relative h-52 rounded-xl overflow-hidden">
                      {/\.(mp4|mov|webm)$/i.test(form.imageUrl) ? (
                        <video src={form.imageUrl} className="h-full w-full object-cover" controls />
                      ) : (
                        <img src={form.imageUrl} alt="Preview" className="h-full w-full object-cover" />
                      )}
                      <button
                        onClick={() => setForm(f => ({ ...f, imageUrl: null }))}
                        className="absolute top-3 right-3 h-8 w-8 rounded-full bg-ink/70 text-cream flex items-center justify-center hover:bg-ink transition text-sm"
                      >
                        ✕
                      </button>
                    </div>
                  ) : (
                    <button
                      type="button"
                      onClick={() => fileRef.current?.click()}
                      className="w-full h-40 flex flex-col items-center justify-center gap-3 text-muted-foreground hover:text-foreground transition"
                    >
                      {uploading ? (
                        <><span className="text-3xl animate-spin">↻</span><span className="text-sm">Uploading…</span></>
                      ) : (
                        <>
                          <div className="h-12 w-12 rounded-2xl bg-muted flex items-center justify-center text-2xl">📁</div>
                          <div className="text-sm">Drag & drop or <span className="underline font-medium">browse files</span></div>
                          <div className="text-xs opacity-50">JPG, PNG, GIF, MP4, MOV — up to 500 MB</div>
                        </>
                      )}
                    </button>
                  )}
                </div>
                <input
                  ref={fileRef}
                  type="file"
                  className="hidden"
                  accept="image/*,video/*"
                  onChange={e => { const f = e.target.files?.[0]; if (f) uploadFile(f); e.target.value = ""; }}
                />

                <div className="mt-3 flex items-center gap-3">
                  <div className="h-px flex-1 bg-border" />
                  <span className="text-xs text-muted-foreground">or paste a URL</span>
                  <div className="h-px flex-1 bg-border" />
                </div>
                <input
                  type="url"
                  value={form.imageUrl ?? ""}
                  onChange={e => setForm(f => ({ ...f, imageUrl: e.target.value || null }))}
                  placeholder="https://example.com/thumbnail.jpg"
                  className="mt-3 w-full rounded-xl border border-border px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-ink/20"
                />
              </div>

              {/* ── Video URL ── */}
              <div>
                <label className="block text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-2">
                  Video Link <span className="normal-case text-muted-foreground/60 tracking-normal">(YouTube, Vimeo, or direct MP4)</span>
                </label>
                <input
                  type="url"
                  value={form.videoUrl}
                  onChange={e => setForm(f => ({ ...f, videoUrl: e.target.value }))}
                  placeholder="https://youtube.com/watch?v=..."
                  className="w-full rounded-xl border border-border px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-ink/20"
                />
              </div>

              {/* ── Title + Client ── */}
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-2">
                    Title *
                  </label>
                  <input
                    type="text"
                    value={form.title}
                    onChange={e => setForm(f => ({ ...f, title: e.target.value }))}
                    placeholder="Project name"
                    className="w-full rounded-xl border border-border px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-ink/20"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-2">
                    Client / Brand
                  </label>
                  <input
                    type="text"
                    value={form.client}
                    onChange={e => setForm(f => ({ ...f, client: e.target.value }))}
                    placeholder="Client or company name"
                    className="w-full rounded-xl border border-border px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-ink/20"
                  />
                </div>
              </div>

              {/* ── Category ── */}
              <div>
                <label className="block text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-2">
                  Category
                </label>
                <select
                  value={form.category}
                  onChange={e => setForm(f => ({ ...f, category: e.target.value }))}
                  className="w-full rounded-xl border border-border px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-ink/20 bg-white"
                >
                  {CATEGORIES.map(c => <option key={c}>{c}</option>)}
                </select>
              </div>

              {/* ── Description ── */}
              <div>
                <label className="block text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-2">
                  Description <span className="normal-case text-muted-foreground/60 tracking-normal">(optional)</span>
                </label>
                <textarea
                  value={form.description}
                  onChange={e => setForm(f => ({ ...f, description: e.target.value }))}
                  rows={3}
                  placeholder="Brief description of what was made and why it slaps…"
                  className="w-full rounded-xl border border-border px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-ink/20 resize-none"
                />
              </div>

              {/* ── Featured toggle ── */}
              <div className="flex items-center justify-between rounded-2xl border border-border bg-muted/30 p-5">
                <div>
                  <div className="font-medium text-sm">Featured / Tall card</div>
                  <div className="text-xs text-muted-foreground mt-0.5">
                    Makes this item taller in the portfolio grid — great for hero work
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => setForm(f => ({ ...f, tall: !f.tall }))}
                  className={`relative h-7 w-12 rounded-full transition-colors shrink-0 ${form.tall ? "bg-ink" : "bg-border"}`}
                >
                  <span
                    className={`absolute top-1 left-1 h-5 w-5 rounded-full bg-white shadow transition-transform ${form.tall ? "translate-x-5" : ""}`}
                  />
                </button>
              </div>
            </div>

            {/* Modal footer */}
            <div className="sticky bottom-0 bg-white border-t border-border px-8 py-5 flex items-center gap-3 rounded-b-3xl">
              <button
                onClick={save}
                disabled={saving}
                className="flex-1 rounded-full bg-ink text-cream py-4 text-sm font-medium hover:bg-ink/90 transition disabled:opacity-60"
              >
                {saving ? "Saving…" : modal === "add" ? "Add to Portfolio →" : "Save Changes →"}
              </button>
              <button
                onClick={() => setModal(null)}
                className="rounded-full border border-border px-6 py-4 text-sm font-medium hover:bg-muted transition"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
