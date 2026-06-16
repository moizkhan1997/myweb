import React, { useRef, useState, useEffect, useLayoutEffect } from "react";
import { Link } from "wouter";
import { Nav } from "@/components/nav";
import { useSEO, useJsonLd } from "@/lib/seo";
import NotFound from "./not-found";
import agencyPromoUrl from "@assets/agency-promo.mp4?url";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);

/* ─── CMS types ──────────────────────────────────────────── */

type CmsItem = {
  id: number;
  title: string;
  client: string;
  category: string;
  tall: boolean;
  imageUrl: string | null;
  videoUrl: string;
  description: string;
};

function getYouTubeId(url: string) {
  const m = url.match(/[?&]v=([^&]+)/) || url.match(/youtu\.be\/([^?]+)/);
  return m ? m[1] : null;
}

const SLUG_TO_CATEGORY: Record<string, string> = {
  "saas-videos": "SaaS Videos",
  "shorts": "Shorts",
  "ugc": "UGC",
  "youtube-videos": "YouTube Videos",
  "digital-marketing": "Digital Marketing",
  "content-creation": "Content Creation",
  "social-media-management": "Social Media Management",
  "branding": "Branding",
  "explainer-videos": "Explainer Videos",
  "motion-graphics": "Motion Graphics",
};

/* ─── Types ──────────────────────────────────────────────── */

type Item = { n: string; title: string; body: string };
type Plan = { title: string; price: string; desc: string; features: string[]; popular?: boolean; accent: string };
type WorkCard = { title: string; cat: string; tint: string };
type Faq = { q: string; a: string };

type ServiceData = {
  slug: string;
  accentColor: string;
  seo: { title: string; description: string };
  hero: { badge: string; h1: string; subtitle: string };
  showreel: { badge: string; h2: string; desc: string };
  whyUs: { h2: string; items: Item[] };
  plans: Plan[];
  work: WorkCard[];
  faqs: Faq[];
  cta: { h2: string; desc: string };
};

/* ─── Accent word parser  [Word] → italic colored span ─── */

function H({ text, color }: { text: string; color: string }) {
  const parts = text.split(/\[([^\]]+)\]/);
  return (
    <>
      {parts.map((p, i) =>
        i % 2 === 1
          ? <span key={i} className="font-serif-italic font-normal" style={{ color }}>{p}</span>
          : p
      )}
    </>
  );
}

/* ─── Shared data ────────────────────────────────────────── */

const TESTIMONIALS = [
  { quote: "Trimmic turned our boring product tour into something we're proud to put on our homepage. Conversions went up 34% in the first month.", name: "Sarah K., Founder", loc: "Austin, TX" },
  { quote: "We needed content fast for our Product Hunt launch. They delivered in 5 days and it looked better than anything we'd seen from bigger agencies.", name: "James R., Head of Marketing", loc: "London, UK" },
  { quote: "Finally a team that actually understands our brand. They didn't just make content. They told our story.", name: "Priya M., CEO", loc: "Singapore" },
  { quote: "The script they wrote was better than what our copywriter came up with. End-to-end service, zero stress.", name: "Tom W., Product Lead", loc: "Berlin, Germany" },
  { quote: "We've worked with 3 agencies before Trimmic. None of them came close. These guys just get it.", name: "Ali H., CMO", loc: "Dubai, UAE" },
];

const SUB_NAV = [
  { label: "Viral Hits",    href: "#viral-hits",    color: "var(--brand-yellow)" },
  { label: "Our Process",   href: "#our-process",   color: "var(--brand-pink)" },
  { label: "Pricing",       href: "#pricing",        color: "var(--brand-green)" },
  { label: "Previous Work", href: "#previous-work", color: "var(--brand-turquoise)" },
  { label: "Testimonials",  href: "#testimonials",  color: "var(--brand-yellow)" },
  { label: "FAQ",           href: "#faq",            color: "var(--brand-pink)" },
];

/* ─── Service data ───────────────────────────────────────── */

const SERVICES: Record<string, ServiceData> = {

  "shorts": {
    slug: "shorts",
    accentColor: "var(--brand-pink)",
    seo: {
      title: "Short-Form Video Production (TikTok, Reels, Shorts) | Trimmic",
      description: "TikTok, Reels, and YouTube Shorts engineered for algorithmic growth, with hooks that grab in 2 seconds and storytelling that earns the share.",
    },
    hero: {
      badge: "Short-form video production",
      h1: "Shorts That Stop The Scroll [Dead.]",
      subtitle: "TikTok, Reels, and YouTube Shorts engineered for algorithmic growth, with hooks that grab in 2 seconds and storytelling that earns the share.",
    },
    showreel: {
      badge: "Shorts in Action",
      h2: "We make your brand [impossible] to scroll past.",
      desc: "From hook writing to final cut, we build short-form content that performs across TikTok, Instagram, YouTube, and LinkedIn. Every frame designed for retention.",
    },
    whyUs: {
      h2: "Fast. [Hook-first.] Built to go viral.",
      items: [
        { n: "01", title: "Hook Engineering", body: "We craft the first 2 seconds to stop the scroll. Every short starts with a tested hook structure built to keep viewers watching." },
        { n: "02", title: "Platform-Native Editing", body: "Each short is edited for its platform: pacing, captions, aspect ratios, and audio optimized for TikTok, Reels, or Shorts." },
        { n: "03", title: "Trend-Aware Production", body: "We monitor trending sounds, formats, and creative styles weekly so your content always feels timely and native to the feed." },
        { n: "04", title: "Hook A/B Variants", body: "Growth packages include multiple hook variants per video, so you can test what converts and scale the winner." },
        { n: "05", title: "Sound Design Included", body: "Every short gets music selection, SFX, and audio mixing tuned for mobile-first playback, with and without sound." },
        { n: "06", title: "Fast Batch Delivery", body: "Batch production means consistent posting without creative blocks. We deliver in scheduled drops that keep your feed alive." },
      ],
    },
    plans: [
      {
        title: "Starter Pack", price: "$299", accent: "var(--brand-yellow)",
        desc: "Perfect for brands testing short-form or launching a single campaign.",
        features: ["3 shorts (15–60s each)", "Hook writing included", "Captions & subtitles", "Platform-optimised delivery", "1 revision round", "9:16 + 16:9 formats"],
      },
      {
        title: "Growth Pack", price: "$799", popular: true, accent: "var(--brand-pink)",
        desc: "For brands ready to go consistent with a full short-form content engine.",
        features: ["10 shorts per month", "A/B hook variants", "Motion graphics included", "Sound design per video", "Unlimited revisions", "Slack support throughout"],
      },
      {
        title: "Monthly Retainer", price: "$1,800/mo", accent: "var(--brand-green)",
        desc: "An embedded short-form team that keeps your brand in every feed, every week.",
        features: ["20 shorts per month", "Dedicated editor", "Trend monitoring & hooks", "Weekly delivery batches", "Priority turnaround", "Monthly performance review"],
      },
    ],
    work: [
      { title: "Viral Product Reveal", cat: "TikTok · Product Short", tint: "var(--brand-yellow)" },
      { title: "Brand Launch Reel", cat: "Instagram Reels · Brand", tint: "var(--brand-pink)" },
      { title: "30-Day Engagement Series", cat: "YouTube Shorts · Series", tint: "var(--brand-green)" },
      { title: "CEO Thought Leadership", cat: "LinkedIn · Talking Head", tint: "var(--brand-turquoise)" },
      { title: "Flash Sale Hook", cat: "TikTok · Conversion Ad", tint: "var(--brand-yellow)" },
      { title: "App Feature Highlight", cat: "Reels · Feature Demo", tint: "var(--brand-pink)" },
    ],
    faqs: [
      { q: "Which platforms do you create shorts for?", a: "TikTok, Instagram Reels, YouTube Shorts, LinkedIn Video, Twitter/X, and Pinterest Idea Pins. Each is edited natively for its platform." },
      { q: "What's the ideal length for a short?", a: "Depends on the platform. TikTok and Reels perform best at 7–30s for hooks, 30–60s for storytelling. We'll recommend the right length per goal." },
      { q: "Do you add captions and subtitles?", a: "Yes, always. 85% of social video is watched without sound. Every short includes styled, platform-native captions." },
      { q: "Can I use existing footage?", a: "Absolutely. We can edit raw footage you provide, or handle full production from scratch: shooting, editing, and delivery." },
      { q: "How do you handle trending audio?", a: "We monitor trending sounds weekly and recommend usage per platform. We also clear music rights for paid promotion where needed." },
      { q: "What formats will I receive?", a: "9:16 (vertical), 16:9 (landscape), and 1:1 (square), all included in Growth and Retainer packages, starter gets 9:16 + 16:9." },
    ],
    cta: {
      h2: "Got a Brand Worth [Seeing?]",
      desc: "Tell us your goal. We'll build short-form content that stops the scroll, earns the share, and keeps your brand growing, week after week.",
    },
  },

  "ugc": {
    slug: "ugc",
    accentColor: "var(--brand-green)",
    seo: {
      title: "UGC Video Content Creation Agency | Trimmic",
      description: "Raw, authentic, creator-style UGC videos that blend into the feed and quietly outperform every polished ad you've ever run.",
    },
    hero: {
      badge: "User-generated content production",
      h1: "UGC That Feels Real. [Converts] Even Harder.",
      subtitle: "Raw, authentic, creator-style videos that blend into the feed. They quietly outperform every polished ad you've ever run.",
    },
    showreel: {
      badge: "UGC in Action",
      h2: "Content that [earns] trust before it earns the click.",
      desc: "We produce UGC that keeps the realness intact: script-led, creator-performed, and edited to feel organic while hitting every conversion beat.",
    },
    whyUs: {
      h2: "Authentic. [Scripted.] Impossible to skip.",
      items: [
        { n: "01", title: "Script & Brief Included", body: "We write the hook, the story, and the CTA. Creators just bring the energy. Your brand stays in control of the message." },
        { n: "02", title: "Creator Matching", body: "We match creators to your product's audience: age, niche, tone, and aesthetic. No random talent, only right-fit faces." },
        { n: "03", title: "Multiple Hook Variants", body: "Each video comes with 2–3 hook variations so you can A/B test what resonates before scaling spend." },
        { n: "04", title: "Raw + Edited Delivery", body: "You get both raw files and edited cuts, so you can repurpose, remix, or run both as separate ad variants." },
        { n: "05", title: "Unlimited Usage Rights", body: "Every UGC asset comes with full usage rights: organic, paid, website, email, forever. No re-licensing fees." },
        { n: "06", title: "Fast Production Cycle", body: "From brief to final delivery in 5–10 business days. Rush options available for launch windows and campaign deadlines." },
      ],
    },
    plans: [
      {
        title: "Starter", price: "$499", accent: "var(--brand-yellow)",
        desc: "Test UGC with a small, high-quality batch before scaling.",
        features: ["3 UGC videos", "Script & brief included", "1 creator option", "Raw + edited delivery", "1 revision round", "Full usage rights"],
      },
      {
        title: "Growth", price: "$1,100", popular: true, accent: "var(--brand-pink)",
        desc: "For brands ready to scale UGC as a core creative channel.",
        features: ["8 UGC videos", "Multiple creator options", "Hook A/B variants", "Sound-designed cuts", "Unlimited revisions", "Performance-ready formats"],
      },
      {
        title: "Retainer", price: "$2,200/mo", accent: "var(--brand-green)",
        desc: "A steady stream of fresh UGC every month. Never run out of creative.",
        features: ["15 UGC videos/month", "Dedicated creator roster", "Full script production", "Weekly delivery", "Priority turnaround", "Monthly strategy call"],
      },
    ],
    work: [
      { title: "Skincare Routine Demo", cat: "UGC · Lifestyle", tint: "var(--brand-green)" },
      { title: "SaaS Testimonial", cat: "UGC · Tech", tint: "var(--brand-yellow)" },
      { title: "Unboxing Haul", cat: "UGC · E-commerce", tint: "var(--brand-pink)" },
      { title: "Fitness App Walkthrough", cat: "UGC · Health", tint: "var(--brand-turquoise)" },
      { title: "Food Delivery Review", cat: "UGC · F&B", tint: "var(--brand-green)" },
      { title: "Fashion Try-On Reel", cat: "UGC · Fashion", tint: "var(--brand-yellow)" },
    ],
    faqs: [
      { q: "What is UGC and why does it work?", a: "UGC (user-generated content) mimics organic creator posts rather than polished ads. It blends into the feed, feels trustworthy, and typically outperforms branded creative on paid channels." },
      { q: "Do you provide the creators or do I?", a: "We have a roster of vetted creators across niches. You can also provide your own talent. We'll handle scripting, direction, and editing either way." },
      { q: "Who writes the script?", a: "We do. Every brief comes with a hook, story structure, and CTA built around your product's key selling points. You review and approve before filming." },
      { q: "What platforms is UGC best for?", a: "TikTok, Instagram Reels, Facebook Ads, and YouTube Shorts. Anywhere native-feeling video outperforms polished brand creative." },
      { q: "Do I own the content?", a: "Yes, fully. Every asset comes with unlimited, perpetual usage rights for organic and paid use across all platforms." },
      { q: "How fast can you deliver?", a: "Most batches are delivered within 5–10 business days from brief approval. Rush delivery (3–5 days) is available on request." },
    ],
    cta: {
      h2: "Ready to Make Content That [Actually Converts?]",
      desc: "Tell us your product and your audience. We'll build UGC that feels like it came from your best customer, and performs like your best ad.",
    },
  },

  "youtube-videos": {
    slug: "youtube-videos",
    accentColor: "var(--brand-turquoise)",
    seo: {
      title: "YouTube Video Production & Channel Growth | Trimmic",
      description: "Long-form video strategy, scripting, and production that grows your channel, deepens trust, and turns viewers into customers.",
    },
    hero: {
      badge: "YouTube video production",
      h1: "YouTube Videos That [Build] Your Brand.",
      subtitle: "Long-form video strategy, scripting, and production that grows your channel, deepens trust, and turns viewers into customers.",
    },
    showreel: {
      badge: "YouTube in Action",
      h2: "We make your channel [impossible] to stop watching.",
      desc: "From research and scripting to cinematic editing and thumbnail direction. We handle the full YouTube production pipeline so you can focus on building the brand.",
    },
    whyUs: {
      h2: "Strategy-led. [Binge-worthy.] Built to grow.",
      items: [
        { n: "01", title: "Research-First Approach", body: "Every video starts with keyword research, audience analysis, and topic validation. We build content people are already searching for." },
        { n: "02", title: "Script + Outline Included", body: "We write or structure every script: hooks, pacing, transitions, and calls-to-action that hold attention and drive retention." },
        { n: "03", title: "Cinematic Editing", body: "B-roll, motion graphics, chapter markers, and colour grading that makes your video look like it belongs on a premium channel." },
        { n: "04", title: "Thumbnail Direction", body: "Thumbnails drive clicks. We design high-CTR thumbnails with proven visual formulas that stand out in a competitive feed." },
        { n: "05", title: "SEO Titles & Descriptions", body: "Every upload comes with an SEO-optimised title, description, tags, and chapter timestamps to maximise discoverability." },
        { n: "06", title: "Consistent Channel Identity", body: "Intros, outros, lower-thirds, and end screens designed to build brand recognition and subscriber loyalty across every video." },
      ],
    },
    plans: [
      {
        title: "Standard", price: "$899", accent: "var(--brand-yellow)",
        desc: "One polished long-form video built to perform from day one.",
        features: ["1 video (8–15 min)", "Research & outline", "Cinematic editing", "Chapters & timestamps", "Thumbnail design", "2 revision rounds"],
      },
      {
        title: "Growth Channel", price: "$2,000/mo", popular: true, accent: "var(--brand-pink)",
        desc: "A monthly production cadence that keeps your channel growing consistently.",
        features: ["4 videos/month", "Full script + research", "Custom motion intros", "SEO-optimised metadata", "Unlimited revisions", "Monthly analytics review"],
      },
      {
        title: "Channel Retainer", price: "$3,800/mo", accent: "var(--brand-green)",
        desc: "Your embedded YouTube team: strategy, production, and publishing handled end-to-end.",
        features: ["8 videos/month", "Dedicated producer", "Script, edit, thumbnail + SEO", "Community tab strategy", "Shorts clips from long-form", "Weekly delivery + check-ins"],
      },
    ],
    work: [
      { title: "Startup Founder Story", cat: "YouTube · Documentary", tint: "var(--brand-turquoise)" },
      { title: "SaaS Product Deep Dive", cat: "YouTube · Tutorial", tint: "var(--brand-yellow)" },
      { title: "Brand Channel Trailer", cat: "YouTube · Brand Video", tint: "var(--brand-pink)" },
      { title: "Investor Pitch Video", cat: "YouTube · Corporate", tint: "var(--brand-green)" },
      { title: "Weekly Tech Review Series", cat: "YouTube · Series", tint: "var(--brand-turquoise)" },
      { title: "Behind The Scenes", cat: "YouTube · Vlog Style", tint: "var(--brand-yellow)" },
    ],
    faqs: [
      { q: "What video length do you produce?", a: "Typically 8–20 minutes for standard long-form, though we also do 3–8 minute mid-form depending on your niche and audience retention data." },
      { q: "Do you handle SEO and titles?", a: "Yes, every video comes with an SEO-optimised title, description, tags, and chapter timestamps researched for your specific niche and search intent." },
      { q: "Do you design thumbnails?", a: "Absolutely. Thumbnails are included in all packages, designed with proven CTR formulas, A/B variants available on Growth and Retainer plans." },
      { q: "Can you work from my raw footage?", a: "Yes. You can provide raw recordings, screen captures, or talking-head footage and we'll handle all editing, graphics, and delivery." },
      { q: "What format will I receive?", a: "Final MP4 in 1080p or 4K, optimised for YouTube upload. Chapters are embedded and a social cut (60s highlight) is included in Growth plans and above." },
      { q: "How do you help my channel grow?", a: "Through research-led topic selection, retention-optimised editing, and SEO metadata. We build content specifically designed to surface in YouTube search and recommendations." },
    ],
    cta: {
      h2: "Got a Channel Worth [Growing?]",
      desc: "Tell us your niche, your audience, and your goals. We'll build a YouTube presence your viewers can't stop watching. Your competitors can't ignore.",
    },
  },

  "digital-marketing": {
    slug: "digital-marketing",
    accentColor: "var(--brand-yellow)",
    seo: {
      title: "Digital Marketing & Performance Ad Creative | Trimmic",
      description: "Paid creative, funnel assets, and ad variants engineered for ROAS, built on what actually works across Meta, TikTok, Google, and LinkedIn.",
    },
    hero: {
      badge: "Performance creative & paid advertising",
      h1: "Ad Creative That [Converts,] Not Just Clicks.",
      subtitle: "Paid creative, funnel assets, and ad variants engineered for ROAS, built on what actually works across Meta, TikTok, Google, and LinkedIn.",
    },
    showreel: {
      badge: "Performance Creative in Action",
      h2: "We make ads your [audience] actually wants to watch.",
      desc: "From hook to CTA, every creative we produce is built to stop the scroll, earn the click, and close the conversion, with variants for testing and scaling.",
    },
    whyUs: {
      h2: "ROAS-focused. [Creative-obsessed.] Built to scale.",
      items: [
        { n: "01", title: "Conversion-First Creative", body: "Every ad is built with a conversion goal in mind: from hook to offer to CTA. We don't make ads that look good but don't sell." },
        { n: "02", title: "Platform-Specific Formats", body: "Meta, TikTok, Google Display, LinkedIn. Every platform gets its own native creative treatment, not a resized copy of something else." },
        { n: "03", title: "Hook A/B Variants", body: "Every asset comes with multiple hook variations so your media buyer can test and scale what works without waiting on creative turnaround." },
        { n: "04", title: "Static + Motion Options", body: "We produce video ads, animated statics, carousels, and story ads. Whatever the funnel stage and platform demands." },
        { n: "05", title: "Copy & CTA Included", body: "Ad copy, headline variants, and CTA language are written as part of every brief, so your creative and copy always work together." },
        { n: "06", title: "Fast Iteration Cycles", body: "When a creative fatigue hits, we turn new variants around in 48–72 hours. No bottlenecks on your scaling." },
      ],
    },
    plans: [
      {
        title: "Starter", price: "$599", accent: "var(--brand-yellow)",
        desc: "Launch your first paid campaign with a tight, tested creative set.",
        features: ["5 ad creatives (15–30s)", "2 format variants per ad", "Copy & CTA included", "Platform-optimised delivery", "1 revision round", "Full usage rights"],
      },
      {
        title: "Growth", price: "$1,400", popular: true, accent: "var(--brand-pink)",
        desc: "For brands scaling spend and needing constant fresh creative.",
        features: ["15 ad creatives", "3 hook variants per ad", "Static + motion options", "A/B testing sets", "Unlimited revisions", "Slack support throughout"],
      },
      {
        title: "Retainer", price: "$2,800/mo", accent: "var(--brand-green)",
        desc: "A dedicated creative team embedded in your paid media operation.",
        features: ["30 creatives/month", "Creative strategist included", "Funnel-aware asset sets", "Weekly delivery drops", "Performance iteration", "Monthly creative report"],
      },
    ],
    work: [
      { title: "E-commerce ROAS Campaign", cat: "Meta Ads · Video", tint: "var(--brand-pink)" },
      { title: "SaaS Trial Acquisition", cat: "Google Ads · Creative", tint: "var(--brand-yellow)" },
      { title: "App Install Series", cat: "TikTok Ads · Creative", tint: "var(--brand-green)" },
      { title: "Retargeting Sequence", cat: "Meta Ads · Funnel", tint: "var(--brand-turquoise)" },
      { title: "Black Friday Bundle Ads", cat: "Multi-platform · Campaign", tint: "var(--brand-pink)" },
      { title: "B2B Lead Gen Creative", cat: "LinkedIn Ads · Video", tint: "var(--brand-yellow)" },
    ],
    faqs: [
      { q: "Which ad platforms do you create for?", a: "Meta (Facebook + Instagram), TikTok, Google Display & YouTube, LinkedIn, Pinterest, and Snapchat. Each gets platform-native creative treatment." },
      { q: "Do you write the ad copy?", a: "Yes, primary text, headlines, and CTA variants are written as part of every brief. We work alongside your media buyer or handle it ourselves." },
      { q: "How many hook variants do you include?", a: "Starter gets 1 hook per creative. Growth gets 3 hook variants per ad. Retainer plans get unlimited hook iterations based on performance data." },
      { q: "Can you iterate on winning creatives?", a: "Absolutely. Retainer clients get ongoing iteration. We take your top performers and build new variants, extensions, and seasonal spins continuously." },
      { q: "Do you provide targeting advice?", a: "We can advise on creative-targeting alignment, but we don't manage ad accounts directly. We work best alongside your in-house media buyer or agency." },
      { q: "What's the turnaround time?", a: "First batch delivered in 5–7 business days. Retainer clients get weekly delivery drops and 48-hour turnaround on iteration requests." },
    ],
    cta: {
      h2: "Got Ad Spend Looking for [Better Creative?]",
      desc: "Tell us your platform, your product, and your conversion goal. We'll build creative that earns every click and scales every pound of your budget.",
    },
  },

  "content-creation": {
    slug: "content-creation",
    accentColor: "var(--brand-pink)",
    seo: {
      title: "Content Creation Agency | Trimmic",
      description: "Blog posts, carousels, email newsletters, pitch decks, and everything in between, all on-brand, all built to move your audience.",
    },
    hero: {
      badge: "Content strategy & creation",
      h1: "Content That Makes Your Brand [Impossible] to Ignore.",
      subtitle: "Blog posts, carousels, email newsletters, pitch decks, and everything in between, all on-brand, all built to move your audience.",
    },
    showreel: {
      badge: "Content in Action",
      h2: "We give your brand a [voice] worth listening to.",
      desc: "We build content systems that stay consistent across every channel: strategy, writing, design, and delivery in one place, so your brand always has something worth saying.",
    },
    whyUs: {
      h2: "Brand-led. [Multi-format.] Built to last.",
      items: [
        { n: "01", title: "Brand Voice First", body: "We develop or refine your brand voice before writing a single word, so every piece sounds like you, not us." },
        { n: "02", title: "Multi-Format Output", body: "Blog posts, LinkedIn carousels, email sequences, pitch decks, case studies. One team, all formats, zero inconsistency." },
        { n: "03", title: "Strategy Before Creation", body: "Every content plan starts with audience mapping, keyword research, and editorial strategy, not a random content calendar." },
        { n: "04", title: "SEO-Aware Writing", body: "Every long-form piece is written with search intent in mind, built to rank, educate, and convert over time." },
        { n: "05", title: "Fast, Consistent Output", body: "Weekly delivery cadence means you always have something to post, without creative blocks, briefs, or chasing freelancers." },
        { n: "06", title: "Notion-Based Workflow", body: "All content is delivered via a shared Notion workspace. Draft, feedback, and approval in one place, no email chains." },
      ],
    },
    plans: [
      {
        title: "Starter", price: "$499/mo", accent: "var(--brand-yellow)",
        desc: "For brands who need consistent, on-brand content without the overhead.",
        features: ["8 content pieces/month", "Blog posts or carousels", "Brand voice guidelines", "SEO basics included", "1 revision round", "Delivered via Notion"],
      },
      {
        title: "Growth", price: "$1,200/mo", popular: true, accent: "var(--brand-pink)",
        desc: "A full content engine for brands ready to own their category.",
        features: ["20 pieces/month", "Mixed formats (blogs, carousels, emails)", "Custom brand voice", "SEO + keyword strategy", "Unlimited revisions", "Slack support"],
      },
      {
        title: "Full Studio", price: "$2,500/mo", accent: "var(--brand-green)",
        desc: "End-to-end content production, from strategy to publication.",
        features: ["Unlimited content", "Dedicated content strategist", "Full calendar management", "Multi-platform distribution", "Analytics reporting", "Weekly check-ins"],
      },
    ],
    work: [
      { title: "B2B LinkedIn Campaign", cat: "Content · Social", tint: "var(--brand-green)" },
      { title: "Email Newsletter Series", cat: "Content · Email", tint: "var(--brand-yellow)" },
      { title: "Blog & SEO Strategy", cat: "Content · Blog", tint: "var(--brand-pink)" },
      { title: "Pitch Deck Story", cat: "Content · Presentation", tint: "var(--brand-turquoise)" },
      { title: "Product Launch Assets", cat: "Content · Multi-format", tint: "var(--brand-green)" },
      { title: "Thought Leadership Series", cat: "Content · LinkedIn", tint: "var(--brand-yellow)" },
    ],
    faqs: [
      { q: "What content formats do you create?", a: "Blog posts, LinkedIn carousels, email newsletters, Twitter/X threads, pitch decks, case studies, landing page copy, and more. We adapt to whatever your channels demand." },
      { q: "Do you develop our brand voice?", a: "Yes, all plans include brand voice development or refinement. We document tone, vocabulary, and persona before writing anything." },
      { q: "How do revisions work?", a: "Starter includes 1 revision round per piece. Growth and Full Studio include unlimited revisions until you're happy with every word." },
      { q: "Do you handle posting and distribution?", a: "Full Studio includes distribution management across your channels. Growth and Starter deliver content ready for you to post." },
      { q: "Who owns the content?", a: "Yes, 100%. All content is written exclusively for your brand and transferred in full upon delivery." },
      { q: "How quickly can we start?", a: "Onboarding and strategy session in week one, first content delivered in week two. Most clients are in full production within 10 days." },
    ],
    cta: {
      h2: "Got a Brand That Deserves to Be [Heard?]",
      desc: "Tell us your audience and your goals. We'll build a content system that makes your brand impossible to scroll past, on every channel that matters.",
    },
  },

  "social-media-management": {
    slug: "social-media-management",
    accentColor: "var(--brand-green)",
    seo: {
      title: "Social Media Management Services | Trimmic",
      description: "Consistent posting, community management, and growth strategy across every platform, so your brand stays loud, relevant, and impossible to ignore.",
    },
    hero: {
      badge: "Social media management",
      h1: "Your Brand. [Always On.] Always Sharp.",
      subtitle: "Consistent posting, community management, and growth strategy across every platform, so your brand stays loud, relevant, and impossible to ignore.",
    },
    showreel: {
      badge: "Social Media in Action",
      h2: "We keep your brand [alive] in every feed.",
      desc: "From content calendars to community engagement, we run your social media like it's the most important channel in your business, because it probably is.",
    },
    whyUs: {
      h2: "Strategy-led. [Community-first.] Relentlessly consistent.",
      items: [
        { n: "01", title: "Platform-Specific Strategy", body: "Every platform gets its own strategy. What works on TikTok doesn't work on LinkedIn. We treat each channel as its own." },
        { n: "02", title: "Content Calendars That Work", body: "We build editorial calendars around your product launches, seasonal moments, and trending topics. Never reactive, always planned." },
        { n: "03", title: "Community Management", body: "Comments, DMs, and mentions handled daily. Every reply protects your brand voice and builds real audience relationships." },
        { n: "04", title: "Original Visual Content", body: "Custom graphics, short-form videos, carousels, and stories designed specifically for social, not repurposed from other formats." },
        { n: "05", title: "Analytics & Reporting", body: "Monthly reports on reach, engagement, follower growth, and content performance, with recommendations that actually inform next month's strategy." },
        { n: "06", title: "Trend Monitoring", body: "We watch what's trending in your industry daily and jump on relevant moments fast, so your brand stays culturally current." },
      ],
    },
    plans: [
      {
        title: "Starter", price: "$799/mo", accent: "var(--brand-yellow)",
        desc: "Consistent presence on your primary platforms without the overhead.",
        features: ["3 platforms managed", "12 posts/month", "Captions + hashtags", "Community management (1hr/day)", "Monthly performance report", "Content calendar"],
      },
      {
        title: "Growth", price: "$1,800/mo", popular: true, accent: "var(--brand-pink)",
        desc: "A full social media operation that actively grows your audience.",
        features: ["5 platforms managed", "30 posts/month", "Custom graphics + short videos", "Full community management", "Bi-weekly strategy calls", "Analytics dashboard"],
      },
      {
        title: "Full Management", price: "$3,500/mo", accent: "var(--brand-green)",
        desc: "Your brand's social presence, fully owned. Strategy to execution.",
        features: ["All major platforms", "Daily posting", "Short-form video + stories", "Full team engagement", "Paid content boosting strategy", "Weekly reports + calls"],
      },
    ],
    work: [
      { title: "Fashion Brand Growth", cat: "Social · Instagram", tint: "var(--brand-pink)" },
      { title: "SaaS LinkedIn Presence", cat: "Social · LinkedIn", tint: "var(--brand-turquoise)" },
      { title: "Food Brand TikTok", cat: "Social · TikTok", tint: "var(--brand-yellow)" },
      { title: "Startup Twitter/X Build", cat: "Social · X (Twitter)", tint: "var(--brand-green)" },
      { title: "E-commerce Pinterest", cat: "Social · Pinterest", tint: "var(--brand-pink)" },
      { title: "Creator YouTube Strategy", cat: "Social · YouTube", tint: "var(--brand-turquoise)" },
    ],
    faqs: [
      { q: "Which platforms do you manage?", a: "Instagram, TikTok, LinkedIn, Twitter/X, Facebook, YouTube, and Pinterest. Most clients start with 2–3 platforms and expand from there." },
      { q: "How many posts do you publish per month?", a: "Starter: 12 posts. Growth: 30 posts. Full Management: daily posting plus stories, reels, and community content as needed." },
      { q: "Do you respond to comments and DMs?", a: "Yes, community management is included in all plans. We respond in your brand voice within defined hours and escalate anything requiring your attention." },
      { q: "Do you create the visuals and copy?", a: "Yes, everything. Captions, graphics, short videos, carousels, and stories are all produced by our team using your brand guidelines." },
      { q: "How do you measure success?", a: "Monthly reports cover follower growth, reach, engagement rate, story views, and link clicks. We set quarterly goals and review progress monthly." },
      { q: "Can I approve content before it's posted?", a: "Absolutely. All content goes through your Notion approval board before scheduling. Nothing posts without your sign-off." },
    ],
    cta: {
      h2: "Ready for a Social Presence That Actually [Grows?]",
      desc: "Tell us your platforms, your audience, and your goals. We'll build a social strategy that keeps your brand loud, consistent, and growing, every single week.",
    },
  },

  "branding": {
    slug: "branding",
    accentColor: "var(--brand-turquoise)",
    seo: {
      title: "Brand Identity & Branding Design Agency | Trimmic",
      description: "Logos, visual systems, brand guidelines, and motion assets that give your brand a presence worth remembering, with a system worth scaling.",
    },
    hero: {
      badge: "Brand identity & design systems",
      h1: "An Identity That [Refuses] to Blend In.",
      subtitle: "Logos, visual systems, brand guidelines, and motion assets that give your brand a presence worth remembering, with a system worth scaling.",
    },
    showreel: {
      badge: "Branding in Action",
      h2: "We build brands that [pick a fight] with boring.",
      desc: "From strategy to final asset delivery, we create visual identities that feel alive, built for digital-first brands that need to stand out everywhere.",
    },
    whyUs: {
      h2: "Research-first. [Brave by default.] Built to scale.",
      items: [
        { n: "01", title: "Strategy Before Design", body: "We start with audience research, competitor mapping, and positioning before a single logo concept is drawn. Beautiful design means nothing without strategy." },
        { n: "02", title: "Full Logo Suite", body: "Primary logo, wordmark, icon, stacked variant, dark and light versions. Every logo format you'll ever need, built to work at any size." },
        { n: "03", title: "Motion-Ready System", body: "Every identity we build is designed with motion in mind. Animated logo reveals, transitions, and social templates ready for video from day one." },
        { n: "04", title: "Comprehensive Brand Guidelines", body: "Colour palette, typography, iconography, photography direction, tone of voice, and do/don't examples, so your team can scale the brand without breaking it." },
        { n: "05", title: "Multiple Concepts", body: "We present 2–3 distinct brand directions before refining, so you choose the strategic fit, not just the personal favourite." },
        { n: "06", title: "Trademark-Safe Design", body: "We run preliminary trademark checks on all logo concepts so you can launch with confidence and protect what you build." },
      ],
    },
    plans: [
      {
        title: "Starter Identity", price: "$1,500", accent: "var(--brand-yellow)",
        desc: "A clean, professional identity to launch your brand with confidence.",
        features: ["Logo (3 concepts, 1 refined)", "Colour palette + typography", "Brand guidelines (PDF)", "Primary logo + 4 variants", "File delivery (SVG/PNG/PDF)", "2 revision rounds"],
      },
      {
        title: "Full Brand", price: "$3,500", popular: true, accent: "var(--brand-pink)",
        desc: "A complete visual identity system built for digital-first brands.",
        features: ["Full logo suite (all variants)", "Complete brand identity system", "Motion logo intro", "Tone of voice guidelines", "Social media kit", "Business card + letterhead"],
      },
      {
        title: "Brand + Motion", price: "$6,500", accent: "var(--brand-green)",
        desc: "Everything in Full Brand, plus a motion design system to bring your identity to life.",
        features: ["Everything in Full Brand", "10 custom motion assets", "Animated logo reveal + outro", "Social story templates (10)", "Brand video (30s)", "Full source file handover"],
      },
    ],
    work: [
      { title: "FinTech Brand System", cat: "Brand · Identity", tint: "var(--brand-yellow)" },
      { title: "SaaS Visual Identity", cat: "Brand · Digital", tint: "var(--brand-pink)" },
      { title: "Food Brand Packaging", cat: "Brand · Packaging", tint: "var(--brand-green)" },
      { title: "App Icon + UI Kit", cat: "Brand · Digital System", tint: "var(--brand-turquoise)" },
      { title: "Personal Brand Suite", cat: "Brand · Personal", tint: "var(--brand-yellow)" },
      { title: "Agency Rebrand", cat: "Brand · Full System", tint: "var(--brand-pink)" },
    ],
    faqs: [
      { q: "What's included in a brand identity?", a: "At minimum: logo suite, colour palette, typography system, and brand guidelines. Full Brand adds motion, voice guidelines, and social kits. Brand + Motion adds a full animation system." },
      { q: "How many logo concepts will I see?", a: "2–3 distinct strategic directions in the first round. We don't present 10 options and ask you to pick. We curate the best fits for your brief." },
      { q: "How long does branding take?", a: "Starter Identity: 2–3 weeks. Full Brand: 4–6 weeks. Brand + Motion: 6–8 weeks. Timelines depend on feedback turnaround." },
      { q: "Do you provide source files?", a: "Yes, all packages include vector source files (AI/SVG) plus export-ready PNGs, PDFs, and web formats. Brand + Motion includes After Effects project files." },
      { q: "Can you work with an existing brand?", a: "Absolutely. We offer brand refresh and evolution, taking existing elements and building a stronger, more consistent system around them." },
      { q: "Do you check for trademark conflicts?", a: "We run preliminary trademark searches on all logo directions before presenting them. Final legal trademark registration is your responsibility, but we flag conflicts early." },
    ],
    cta: {
      h2: "Got a Brand That Deserves to Be [Remembered?]",
      desc: "Tell us who you are, who you're for, and what you want to stand for. We'll build an identity that makes you impossible to confuse. And impossible to forget.",
    },
  },

  "explainer-videos": {
    slug: "explainer-videos",
    accentColor: "var(--brand-yellow)",
    seo: {
      title: "Explainer Video Production Company | Trimmic",
      description: "Animated explainers that take the most technical, niche, or complicated product and make it crystal clear in 90 seconds or less.",
    },
    hero: {
      badge: "Explainer video production",
      h1: "Complex Ideas, [Brilliantly] Simple.",
      subtitle: "Animated explainers that take the most technical, niche, or complicated product and make it crystal clear in 90 seconds or less.",
    },
    showreel: {
      badge: "Explainer Videos in Action",
      h2: "We make your product [impossible] to misunderstand.",
      desc: "From scriptwriting and storyboarding to animation, voiceover, and sound design. We create explainers that work on homepages, pitch decks, onboarding flows, and investor presentations.",
    },
    whyUs: {
      h2: "Story-first. [Animation-obsessed.] Built to clarify.",
      items: [
        { n: "01", title: "Script & Storyboard Included", body: "Every project starts with a discovery call, then a script that distills your value prop into a clear, engaging story, before a single frame is animated." },
        { n: "02", title: "Custom Animation Style", body: "No templates. Every explainer is animated in a style that matches your brand: flat 2D, motion graphics, screen recording, or character-based." },
        { n: "03", title: "Professional Voiceover", body: "We cast and direct native voiceover talent that matches your brand tone: warm, authoritative, energetic, or conversational." },
        { n: "04", title: "Sound Design & Music", body: "Custom sound effects and background music that reinforce your story and make the video feel polished from first frame to last." },
        { n: "05", title: "Revision-Friendly Process", body: "We structure the project in stages: script, storyboard, animation, with feedback rounds built in so nothing goes off-track." },
        { n: "06", title: "Fast Delivery", body: "Most explainers delivered in 7–14 business days. Rush delivery available for launches, demos, and investor deadlines." },
      ],
    },
    plans: [
      {
        title: "Standard", price: "$699", accent: "var(--brand-yellow)",
        desc: "One sharp explainer that makes your product click instantly.",
        features: ["60–90s animated explainer", "Script & storyboard", "Professional voiceover", "Background music & SFX", "2 revision rounds", "HD MP4 delivery"],
      },
      {
        title: "Premium", price: "$1,500", popular: true, accent: "var(--brand-pink)",
        desc: "A full-featured explainer for product launches, investor decks, and homepage heroes.",
        features: ["90–120s explainer", "Custom character or UI animation", "Script + storyboard + direction", "Premium voiceover talent", "Unlimited revisions", "HD + social cuts"],
      },
      {
        title: "Retainer", price: "$2,800/mo", accent: "var(--brand-green)",
        desc: "Ongoing explainer production for product updates, onboarding flows, and feature releases.",
        features: ["4 explainers/month", "Dedicated animator", "Full production pipeline", "Slack support", "Priority turnaround", "Monthly performance review"],
      },
    ],
    work: [
      { title: "FinTech Product Explainer", cat: "Explainer · 2D Animation", tint: "var(--brand-turquoise)" },
      { title: "SaaS Onboarding Video", cat: "Explainer · Screen Motion", tint: "var(--brand-yellow)" },
      { title: "Healthcare Platform Tour", cat: "Explainer · Character", tint: "var(--brand-green)" },
      { title: "Startup Pitch Explainer", cat: "Explainer · Motion", tint: "var(--brand-pink)" },
      { title: "B2B Service Overview", cat: "Explainer · 2D", tint: "var(--brand-turquoise)" },
      { title: "App Feature Walkthrough", cat: "Explainer · UI Motion", tint: "var(--brand-yellow)" },
    ],
    faqs: [
      { q: "What types of explainer videos do you make?", a: "2D animation, motion graphics, screen recording with animation, character-based animation, and mixed-media explainers. We recommend the right style for your product and audience." },
      { q: "Do you write the script?", a: "Yes, always. The script is the most important part of an explainer. We research your product, audience, and competition before writing a single word." },
      { q: "How long should an explainer be?", a: "60–90 seconds is the sweet spot for most products. Complex B2B solutions sometimes warrant 90–120s. We'll advise based on your specific use case." },
      { q: "Can I provide my own voiceover?", a: "Absolutely. You can provide your own voice recording or use our talent roster. We also offer multi-language voiceover for global audiences." },
      { q: "What file formats do I receive?", a: "HD MP4 (1080p) for web. Optionally: social cuts (16:9, 9:16, 1:1), GIF version, and subtitle file (SRT). Lottie JSON available for animated web embeds on request." },
      { q: "How many revisions are included?", a: "Standard: 2 rounds. Premium and Retainer: unlimited. We don't consider a project done until the explainer communicates exactly what you need it to." },
    ],
    cta: {
      h2: "Got a Product That's Hard to [Explain?]",
      desc: "That's exactly where we thrive. Tell us what it does and who it's for. We'll turn it into an explainer your audience watches until the very last second.",
    },
  },

  "motion-graphics": {
    slug: "motion-graphics",
    accentColor: "var(--brand-pink)",
    seo: {
      title: "Motion Graphics & Animation Studio | Trimmic",
      description: "Kinetic type, logo animations, data visualizations, and motion systems that make your brand feel alive, on every screen, at every scale.",
    },
    hero: {
      badge: "Motion design & animation",
      h1: "Motion That Makes People [Stop and Rewind.]",
      subtitle: "Kinetic type, logo animations, data visualizations, and motion systems that make your brand feel alive, on every screen, at every scale.",
    },
    showreel: {
      badge: "Motion Graphics in Action",
      h2: "We turn static design into something that [moves people.]",
      desc: "From logo reveals to full motion design systems, we create animation that earns attention, reinforces brand identity, and makes every video feel premium from the very first frame.",
    },
    whyUs: {
      h2: "Brand-safe. [Craft-obsessed.] Built for any screen.",
      items: [
        { n: "01", title: "Brand-Safe Animation", body: "Every motion asset is built strictly within your brand system: colours, typography, and style always consistent, never off-brand." },
        { n: "02", title: "After Effects + Lottie", body: "We work in After Effects for video and export Lottie JSON for web, so your animations work equally well in video and on your website." },
        { n: "03", title: "Kinetic Typography", body: "Words that move with purpose. We animate type that guides attention, reinforces hierarchy, and makes every headline land harder." },
        { n: "04", title: "2D + Light 3D", body: "Flat 2D animation, shape morphing, parallax effects, and light 3D transitions. All handled in-house without render farm delays." },
        { n: "05", title: "Iteration-Ready", body: "All projects are built with clean, organised After Effects files, so updating text, colours, or timing is fast and cost-efficient." },
        { n: "06", title: "Format-Flexible Delivery", body: "MP4, GIF, WebM, Lottie JSON, ProRes for broadcast. We deliver in every format your platform and workflow demands." },
      ],
    },
    plans: [
      {
        title: "Short Loop", price: "$499", accent: "var(--brand-yellow)",
        desc: "A single motion asset built to run on repeat without getting old.",
        features: ["Up to 30s motion graphic", "Custom design + animation", "Lottie / MP4 / GIF delivery", "Brand colour-accurate", "2 revision rounds", "Source file included"],
      },
      {
        title: "Full Sequence", price: "$1,200", popular: true, accent: "var(--brand-pink)",
        desc: "A complete motion sequence for launch videos, intros, or brand reels.",
        features: ["Up to 90s motion sequence", "Complex transitions + kinetic type", "Custom motion design system", "Multiple format exports", "Unlimited revisions", "After Effects source files"],
      },
      {
        title: "Monthly Retainer", price: "$2,500/mo", accent: "var(--brand-green)",
        desc: "A dedicated motion designer on your team, without the full-time cost.",
        features: ["6 motion assets/month", "Dedicated motion designer", "Consistent brand motion system", "Priority delivery", "Slack support throughout", "Monthly creative review"],
      },
    ],
    work: [
      { title: "Brand Intro Animation", cat: "Motion · Logo Reveal", tint: "var(--brand-pink)" },
      { title: "Data Visualisation Reel", cat: "Motion · Infographic", tint: "var(--brand-green)" },
      { title: "Kinetic Type Campaign", cat: "Motion · Typography", tint: "var(--brand-yellow)" },
      { title: "App UI Transition Pack", cat: "Motion · UI", tint: "var(--brand-turquoise)" },
      { title: "Event Opener Film", cat: "Motion · Event", tint: "var(--brand-pink)" },
      { title: "Social Story Pack", cat: "Motion · Stories", tint: "var(--brand-green)" },
    ],
    faqs: [
      { q: "What software do you use?", a: "Primarily Adobe After Effects, with Illustrator for vector assets. We export to Lottie (Bodymovin) for web, and all standard video formats for other uses." },
      { q: "Can you animate our existing brand assets?", a: "Yes, we work from your logo, colour palette, and typography to build motion that feels like a natural extension of your existing brand." },
      { q: "Do you deliver Lottie files for web?", a: "Absolutely. All relevant assets are exported as Lottie JSON, optimised for web performance, and tested across major browsers." },
      { q: "What if we need to update the text or colours later?", a: "Retainer and Full Sequence clients receive organised After Effects source files, making future updates fast and cost-efficient." },
      { q: "Can you do 3D animation?", a: "We handle light 3D: depth, parallax, and layer-based 3D within After Effects. For fully rendered 3D, we work with trusted 3D partners and manage the project end-to-end." },
      { q: "What format will I receive?", a: "Standard delivery: MP4 (H.264), GIF, and Lottie JSON. On request: ProRes 4444, WebM, transparent PNG sequence, and social-specific format cuts." },
    ],
    cta: {
      h2: "Got a Brand Ready to Come [Alive?]",
      desc: "Tell us what needs to move and why it matters. We'll build motion that makes your brand feel like the most polished thing in any feed, deck, or screen.",
    },
  },

};

/* ─── Sub-nav ────────────────────────────────────────────── */

function SubNav() {
  return (
    <div className="fixed top-[76px] left-1/2 -translate-x-1/2 z-40">
      <nav className="flex items-center divide-x divide-border/50 overflow-hidden rounded-full border border-border/50 bg-background/90 shadow-soft backdrop-blur-xl">
        {SUB_NAV.map((link) => (
          <a
            key={link.href}
            href={link.href}
            className="group relative flex items-center gap-2 px-5 py-2.5 transition hover:bg-black/[0.04]"
          >
            <span
              className="h-1.5 w-1.5 shrink-0 rounded-full transition-transform duration-200 group-hover:scale-150"
              style={{ backgroundColor: link.color }}
            />
            <span className="text-xs font-semibold uppercase tracking-widest text-[color:var(--ink)]/55 transition group-hover:text-[color:var(--ink)]">
              {link.label}
            </span>
          </a>
        ))}
      </nav>
    </div>
  );
}

/* ─── Page component ─────────────────────────────────────── */

export default function ServicePage({ params }: { params: { slug: string } }) {
  const data = SERVICES[params.slug];
  if (!data) return <NotFound />;

  useSEO({
    title: data.seo.title,
    description: data.seo.description,
    path: `/service/${data.slug}`,
  });
  useJsonLd({
    "@context": "https://schema.org",
    "@type": "Service",
    serviceType: data.hero.badge,
    name: data.seo.title,
    provider: { "@type": "Organization", name: "Trimmic", url: "https://www.trimmic.com/" },
    areaServed: "Worldwide",
    description: data.seo.description,
  });

  const pageRef = useRef<HTMLDivElement>(null);
  useLayoutEffect(() => {
    window.scrollTo(0, 0);
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
  }, [params.slug]);
  useEffect(() => {
    const root = pageRef.current;
    if (!root) return;

    const tweens: gsap.core.Tween[] = [];
    const observers: IntersectionObserver[] = [];

    // Hero — staggered entry with clip reveal on h1
    tweens.push(gsap.from(root.querySelectorAll(".g-sp-hero-badge"), {
      opacity: 0, scale: 0.85, duration: 0.6, ease: "back.out(1.7)", delay: 0.2,
    }));
    tweens.push(gsap.from(root.querySelectorAll(".g-sp-hero-h1"), {
      yPercent: 110, duration: 1.1, ease: "power4.out", delay: 0.45,
    }));
    tweens.push(gsap.from(root.querySelectorAll(".g-sp-hero-sub"), {
      opacity: 0, y: 24, duration: 0.8, ease: "power3.out", delay: 0.75,
    }));
    tweens.push(gsap.from(root.querySelectorAll(".g-sp-hero-btns > *"), {
      opacity: 0, y: 16, duration: 0.65, ease: "power3.out", delay: 0.9, stagger: 0.1,
    }));

    const onScroll = (triggerSel: string, targetSel: string, vars: gsap.TweenVars) => {
      const trigger = root.querySelector(triggerSel);
      const targets = Array.from(root.querySelectorAll(targetSel));
      if (!trigger || !targets.length) return;
      const obs = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) {
          tweens.push(gsap.from(targets, vars));
          obs.disconnect();
        }
      }, { threshold: 0.12 });
      obs.observe(trigger);
      observers.push(obs);
    };

    // Showreel — left/right slide
    onScroll(".g-sp-showreel-left",  ".g-sp-showreel-left",  { x: -60, duration: 1, ease: "power3.out" });
    onScroll(".g-sp-showreel-right", ".g-sp-showreel-right", { x: 60,  duration: 1, ease: "power3.out" });

    // Section headings — badge fades, h2 clips up from below
    onScroll(".g-sp-why-heading",     ".g-sp-why-badge",     { opacity: 0, y: 10, duration: 0.45, ease: "power2.out" });
    onScroll(".g-sp-why-heading",     ".g-sp-why-h2",        { yPercent: 105, duration: 0.95, ease: "power4.out", delay: 0.08 });
    onScroll(".g-sp-pricing-heading", ".g-sp-pricing-badge", { opacity: 0, y: 10, duration: 0.45, ease: "power2.out" });
    onScroll(".g-sp-pricing-heading", ".g-sp-pricing-h2",    { yPercent: 105, duration: 0.95, ease: "power4.out", delay: 0.08 });
    onScroll(".g-sp-work-heading",    ".g-sp-work-badge",    { opacity: 0, y: 10, duration: 0.45, ease: "power2.out" });
    onScroll(".g-sp-work-heading",    ".g-sp-work-h2",       { yPercent: 105, duration: 0.95, ease: "power4.out", delay: 0.08 });
    onScroll(".g-sp-test-heading",    ".g-sp-test-badge",    { opacity: 0, y: 10, duration: 0.45, ease: "power2.out" });
    onScroll(".g-sp-test-heading",    ".g-sp-test-h2",       { yPercent: 105, duration: 0.95, ease: "power4.out", delay: 0.08 });
    onScroll(".g-sp-faq-heading",     ".g-sp-faq-h2",        { yPercent: 105, duration: 0.95, ease: "power4.out" });

    // Section content
    onScroll(".g-sp-why-grid",   ".g-sp-why-item",   { opacity: 0, y: 50, duration: 0.7,  ease: "power3.out", stagger: 0.06 });
    onScroll(".g-sp-plans-grid", ".g-sp-plan",       { opacity: 0, y: 55, duration: 0.8,  ease: "expo.out" });
    onScroll(".g-sp-work-grid",  ".g-sp-work-card",  { opacity: 0, y: 45, scale: 0.96, duration: 0.7, ease: "power3.out", stagger: 0.08 });
    onScroll(".g-sp-test-stats", ".g-sp-test-stat",  { opacity: 0, x: -18, duration: 0.5, ease: "power3.out", stagger: 0.07 });
    onScroll(".g-sp-faq-list",   ".g-sp-faq-item",   { opacity: 0, x: -28, duration: 0.6, ease: "power3.out", stagger: 0.05 });
    onScroll(".g-sp-cta-content",".g-sp-cta-content",{ opacity: 0, y: 55, scale: 0.97, duration: 0.9, ease: "expo.out" });

    return () => {
      tweens.forEach(t => t.kill());
      observers.forEach(o => o.disconnect());
    };
  }, [params.slug]);

  return (
    <div ref={pageRef} className="bg-[color:var(--cream)] text-[color:var(--ink)]">
      <Nav />
      <SubNav />
      <main>
        <Hero data={data} />
        <Showreel data={data} />
        <WhyUs data={data} />
        <Pricing data={data} />
        <PreviousWork data={data} />
        <TestimonialsSection />
        <FAQSection data={data} />
        <ClosingCTA data={data} />
      </main>
    </div>
  );
}

/* ─── Section components ─────────────────────────────────── */

function Hero({ data }: { data: ServiceData }) {
  return (
    <section id="viral-hits" className="relative min-h-[100svh] w-full overflow-hidden bg-[#08090d] text-white">
      <div className="absolute inset-0">
        <video className="absolute inset-0 h-full w-full object-cover" src={agencyPromoUrl} autoPlay muted loop playsInline />
        <div
          className="absolute inset-0"
          style={{ background: "radial-gradient(circle at top left, rgba(255,215,110,0.16), transparent 24%), radial-gradient(circle at 80% 20%, rgba(236,121,208,0.15), transparent 20%), linear-gradient(90deg, rgba(8,9,13,0.95), rgba(8,9,13,0.7) 40%, rgba(8,9,13,0.25) 100%)" }}
          aria-hidden
        />
        <div className="absolute left-10 top-24 h-1 w-40 rounded-full bg-[#f9c946]/40 blur-2xl" aria-hidden />
        <div className="absolute right-10 top-44 h-1 w-56 rounded-full bg-[#e16fb3]/30 blur-2xl" aria-hidden />
        <div className="absolute left-1/2 top-56 h-1 w-64 -translate-x-1/2 rounded-full bg-[#4bbfae]/30 blur-2xl" aria-hidden />
      </div>
      <div className="relative z-10 flex min-h-[100svh] flex-col justify-center px-8 md:px-14 lg:px-20 pt-32 pb-20">
        <div className="g-sp-hero-content max-w-3xl">
          <p className="g-sp-hero-badge text-xs uppercase tracking-[0.35em] text-white/50">{data.hero.badge}</p>
          <div className="mt-6 overflow-hidden pb-2">
            <h1 className="g-sp-hero-h1 font-display text-5xl leading-[1.02] sm:text-6xl md:text-7xl">
              <H text={data.hero.h1} color={data.accentColor} />
            </h1>
          </div>
          <p className="g-sp-hero-sub mt-6 max-w-2xl text-base text-white/75 sm:text-lg">{data.hero.subtitle}</p>
          <div className="g-sp-hero-btns mt-10 flex flex-wrap gap-4">
            <a href="#pricing" className="inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-semibold text-[#090b10] transition hover:opacity-90">
              View Pricing →
            </a>
            <Link href="/contact" className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-6 py-3 text-sm font-semibold text-white transition hover:bg-white/15">
              Book a Call →
            </Link>
          </div>
        </div>
      </div>
      <a href="#our-process" className="absolute bottom-10 left-6 z-10 flex items-center gap-3 text-white/90 sm:left-16">
        <span className="relative inline-flex h-4 w-4 items-center justify-center">
          <span className="pulse-ring relative inline-block h-3 w-3 rounded-full" style={{ backgroundColor: data.accentColor }} />
        </span>
        <span className="text-sm">Check out the offer</span>
      </a>
    </section>
  );
}

function Showreel({ data }: { data: ServiceData }) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);
  const toggle = () => {
    const v = videoRef.current;
    if (!v) return;
    if (v.paused) { v.play(); setPlaying(true); } else { v.pause(); setPlaying(false); }
  };

  return (
    <section id="our-process" className="px-8 md:px-14 lg:px-20 py-24 sm:py-32">
      <div className="mx-auto grid max-w-7xl gap-12 md:grid-cols-2">
        <div className="g-sp-showreel-left">
          <span className="inline-block rounded-full bg-black/5 px-3 py-1 text-xs font-semibold uppercase tracking-widest">{data.showreel.badge}</span>
          <h2 className="font-display mt-6 text-5xl leading-[0.95] sm:text-6xl md:text-7xl text-[color:var(--ink)]">
            <H text={data.showreel.h2} color={data.accentColor} />
          </h2>
          <p className="mt-6 max-w-lg text-lg text-[color:var(--ink)]/75">{data.showreel.desc}</p>
        </div>
        <div className="g-sp-showreel-right">
          <div className="relative overflow-hidden rounded-[2rem] border border-[color:var(--border)] bg-white shadow-soft">
            <div className="aspect-[16/10] w-full overflow-hidden bg-[#0a0c11]">
              <video ref={videoRef} src={agencyPromoUrl} muted loop playsInline className="h-full w-full object-cover" onClick={toggle} />
            </div>
            <button type="button" onClick={toggle} aria-label={playing ? "Pause" : "Play"}
              className={`absolute inset-0 flex items-center justify-center transition ${playing ? "opacity-0 hover:opacity-100" : "opacity-100"}`}>
              <span className="grid h-20 w-20 place-items-center rounded-full bg-white shadow-xl transition hover:scale-105">
                {playing
                  ? <span className="flex gap-1.5"><span className="block h-6 w-1.5 bg-[color:var(--ink)]" /><span className="block h-6 w-1.5 bg-[color:var(--ink)]" /></span>
                  : <span className="ml-1 block h-0 w-0 border-y-[12px] border-l-[18px] border-y-transparent border-l-[color:var(--ink)]" />}
              </span>
            </button>
          </div>
          <p className="mt-3 text-xs font-semibold uppercase tracking-[0.25em] text-[color:var(--ink)]/60">Showreel 2025</p>
        </div>
      </div>
    </section>
  );
}

function WhyUs({ data }: { data: ServiceData }) {
  return (
    <section className="px-8 md:px-14 lg:px-20 py-24">
      <div className="w-full">
        <div className="g-sp-why-heading">
          <span className="g-sp-why-badge inline-block rounded-full bg-black/5 px-3 py-1 text-xs font-semibold uppercase tracking-widest">Why Us?</span>
          <div className="mt-6 overflow-hidden pb-2">
            <h2 className="g-sp-why-h2 font-display text-5xl leading-[0.95] sm:text-6xl md:text-7xl">
              <H text={data.whyUs.h2} color={data.accentColor} />
            </h2>
          </div>
        </div>
        <div className="g-sp-why-grid mt-14 grid gap-x-12 gap-y-10 md:grid-cols-2">
          {data.whyUs.items.map((it) => (
            <div key={it.n} className="g-sp-why-item border-t border-black/15 pt-6">
              <div className="flex items-baseline gap-4">
                <span className="font-display text-3xl text-[color:var(--ink)]/40">{it.n}</span>
                <h3 className="font-display text-2xl">{it.title}</h3>
              </div>
              <p className="mt-3 max-w-md text-[color:var(--ink)]/75">{it.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Pricing({ data }: { data: ServiceData }) {
  return (
    <section id="pricing" className="px-8 md:px-14 lg:px-20 py-24">
      <div className="w-full">
        <div className="g-sp-pricing-heading">
          <span className="g-sp-pricing-badge inline-block rounded-full bg-black/5 px-3 py-1 text-xs font-semibold uppercase tracking-widest">Pricing</span>
          <div className="mt-6 overflow-hidden pb-2">
            <h2 className="g-sp-pricing-h2 font-display text-5xl leading-[0.95] sm:text-6xl md:text-7xl">
              Flexible Plans for <br />Every{" "}
              <span className="font-serif-italic font-normal" style={{ color: data.accentColor }}>Stage</span>{" "}
              of Growth
            </h2>
          </div>
        </div>
        <div className="g-sp-plans-grid mt-14 grid gap-6 md:grid-cols-3">
          {data.plans.map((p) => (
            <div key={p.title}
              className={`g-sp-plan relative flex flex-col rounded-3xl border bg-white p-8 transition hover:-translate-y-1 hover:shadow-2xl ${p.popular ? "border-[color:var(--ink)] shadow-xl ring-2 ring-[color:var(--ink)]" : "border-black/10"}`}>
              {p.popular && (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-[color:var(--ink)] px-4 py-1 text-xs font-bold uppercase tracking-widest text-white">
                  Most Popular
                </span>
              )}
              <span className="inline-block h-2 w-12 rounded-full" style={{ backgroundColor: p.accent }} />
              <h3 className="font-display mt-5 text-3xl">{p.title}</h3>
              <p className="font-display mt-3 text-5xl">{p.price}</p>
              <p className="mt-3 text-sm text-[color:var(--ink)]/70">{p.desc}</p>
              <Link href="/contact" className="mt-6 inline-flex justify-center rounded-full bg-[color:var(--ink)] px-5 py-3 text-sm font-semibold text-white transition hover:opacity-90">
                Book a Call
              </Link>
              <ul className="mt-6 space-y-3 border-t border-black/10 pt-6 text-sm">
                {p.features.map((f) => (
                  <li key={f} className="flex gap-2">
                    <span className="mt-0.5 text-[color:var(--brand-green)]">✓</span>
                    <span>{f}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function PreviousWork({ data }: { data: ServiceData }) {
  const [cmsItems, setCmsItems] = useState<CmsItem[]>([]);
  const categoryName = SLUG_TO_CATEGORY[data.slug] || "";

  useEffect(() => {
    fetch("/portfolio-data.json?" + Date.now())
      .then(r => r.json())
      .then(d => {
        const filtered = (d.items || []).filter((i: CmsItem) => i.category === categoryName);
        setCmsItems(filtered);
      })
      .catch(() => {});
  }, [categoryName]);

  return (
    <section id="previous-work" className="px-8 md:px-14 lg:px-20 py-24">
      <div className="w-full">
        <div className="g-sp-work-heading">
          <span className="g-sp-work-badge inline-block rounded-full bg-black/5 px-3 py-1 text-xs font-semibold uppercase tracking-widest">Previous Work</span>
          <div className="mt-6 overflow-hidden pb-2">
            <h2 className="g-sp-work-h2 font-display text-5xl leading-[0.95] sm:text-6xl md:text-7xl">
              How we do anything is <br />how we do{" "}
              <span className="font-serif-italic font-normal text-[color:var(--brand-yellow)]">everything.</span>
            </h2>
          </div>
        </div>
        <div className="g-sp-work-grid mt-14 grid gap-6 md:grid-cols-2">
          {cmsItems.length > 0
            ? cmsItems.map((item) => <CmsWorkCard key={item.id} item={item} />)
            : data.work.map((w) => <WorkCard key={w.title} {...w} />)
          }
        </div>
      </div>
    </section>
  );
}

function VideoModal({ item, onClose }: { item: CmsItem; onClose: () => void }) {
  const ytId = item.videoUrl ? getYouTubeId(item.videoUrl) : null;
  const isDirectVideo = item.videoUrl && /\.(mp4|mov|webm)$/i.test(item.videoUrl);
  const isUploadedVideo = item.imageUrl && /\.(mp4|mov|webm)$/i.test(item.imageUrl);
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => { document.removeEventListener("keydown", onKey); document.body.style.overflow = ""; };
  }, [onClose]);
  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center bg-black/90 backdrop-blur-sm p-4" onClick={onClose}>
      <button onClick={onClose} className="absolute top-5 right-5 h-11 w-11 rounded-full bg-white/10 text-white hover:bg-white/20 transition flex items-center justify-center text-xl z-10">✕</button>
      <div className="relative w-full max-w-5xl" style={{ aspectRatio: "16/9" }} onClick={e => e.stopPropagation()}>
        {ytId ? (
          <iframe src={`https://www.youtube.com/embed/${ytId}?autoplay=1&rel=0`} className="h-full w-full rounded-2xl" allow="autoplay; fullscreen" allowFullScreen />
        ) : isDirectVideo ? (
          <video src={item.videoUrl} className="h-full w-full rounded-2xl" controls autoPlay />
        ) : isUploadedVideo ? (
          <video src={item.imageUrl!} className="h-full w-full rounded-2xl" controls autoPlay />
        ) : (
          <div className="h-full w-full rounded-2xl bg-black flex items-center justify-center text-white/40">No video available</div>
        )}
      </div>
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-center">
        <p className="font-display text-xl text-white">{item.title}</p>
        {item.client && <p className="text-sm text-white/50 mt-1">{item.client}</p>}
      </div>
    </div>
  );
}

function CmsWorkCard({ item }: { item: CmsItem }) {
  const [open, setOpen] = useState(false);
  const ytId = item.videoUrl ? getYouTubeId(item.videoUrl) : null;
  const thumb = item.imageUrl || (ytId ? `https://img.youtube.com/vi/${ytId}/hqdefault.jpg` : null);
  return (
    <>
      {open && <VideoModal item={item} onClose={() => setOpen(false)} />}
      <div
        className="g-sp-work-card group relative aspect-video overflow-hidden rounded-3xl cursor-pointer"
        style={!thumb ? { backgroundImage: "linear-gradient(135deg,var(--brand-yellow) 0%,#1a1a1a 100%)" } : undefined}
        onClick={() => setOpen(true)}
      >
        {thumb && (
          /\.(mp4|mov|webm)$/i.test(thumb)
            ? <video src={thumb} className="absolute inset-0 h-full w-full object-cover" muted loop playsInline autoPlay />
            : <img src={thumb} alt={item.title} className="absolute inset-0 h-full w-full object-cover transition duration-700 group-hover:scale-105" />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
        <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-4 p-6">
          <div>
            <h3 className="font-display text-2xl text-white sm:text-3xl">{item.title}</h3>
            {item.client && <p className="text-sm text-white/50 mt-0.5">{item.client}</p>}
          </div>
          <span className="shrink-0 rounded-full bg-white/15 px-3 py-1 text-xs font-medium text-white backdrop-blur">{item.category}</span>
        </div>
        <div className="absolute top-4 right-4 h-11 w-11 rounded-full bg-white/20 backdrop-blur flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition text-sm">▶</div>
      </div>
    </>
  );
}

function WorkCard({ title, cat, tint }: { title: string; cat: string; tint: string }) {
  const ref = useRef<HTMLVideoElement>(null);
  return (
    <div
      className="g-sp-work-card group relative aspect-video overflow-hidden rounded-3xl"
      style={{ backgroundImage: `linear-gradient(135deg, ${tint} 0%, #1a1a1a 100%)` }}
      onMouseEnter={() => ref.current?.play().catch(() => {})}
      onMouseLeave={() => { const v = ref.current; if (v) { v.pause(); v.currentTime = 0; } }}
    >
      <video ref={ref} muted loop playsInline className="absolute inset-0 h-full w-full object-cover opacity-0 transition group-hover:opacity-100" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
      <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-4 p-6">
        <h3 className="font-display text-2xl text-white sm:text-3xl">{title}</h3>
        <span className="shrink-0 rounded-full bg-white/15 px-3 py-1 text-xs font-medium text-white backdrop-blur">{cat}</span>
      </div>
    </div>
  );
}

function TestimonialsSection() {
  const stats = ["50+ Projects Delivered", "100% Client Satisfaction", "4.9/5.0 Average Rating"];
  const card = (t: (typeof TESTIMONIALS)[number], i: number) => (
    <div key={i} className="w-[360px] shrink-0 rounded-3xl border border-black/10 bg-white p-6 shadow-sm sm:w-[420px]">
      <div className="flex gap-1 text-[color:var(--brand-yellow)]">{"★★★★★".split("").map((s, k) => <span key={k}>{s}</span>)}</div>
      <p className="mt-4 text-[15px] leading-relaxed text-[color:var(--ink)]/85">"{t.quote}"</p>
      <div className="mt-5 border-t border-black/10 pt-4">
        <p className="text-sm font-bold">{t.name}</p>
        <p className="text-xs text-[color:var(--ink)]/60">{t.loc}</p>
      </div>
    </div>
  );

  return (
    <section id="testimonials" className="px-8 md:px-14 lg:px-20 py-24">
      <div className="w-full">
        <div className="g-sp-test-heading">
          <span className="g-sp-test-badge inline-block rounded-full bg-black/5 px-3 py-1 text-xs font-semibold uppercase tracking-widest">Testimonials</span>
          <div className="mt-6 overflow-hidden pb-2">
            <h2 className="g-sp-test-h2 font-display text-5xl leading-[0.95] sm:text-6xl md:text-7xl">
              Trusted by founders, <br />loved by{" "}
              <span className="font-serif-italic font-normal text-[color:var(--brand-pink)]">results.</span>
            </h2>
          </div>
        </div>
        <div className="g-sp-test-stats mt-10 flex flex-wrap gap-3">
          {stats.map((s) => (
            <span key={s} className="g-sp-test-stat rounded-full border border-black/15 bg-white px-5 py-2 text-sm font-semibold">{s}</span>
          ))}
        </div>
      </div>
      <div className="marquee-pause mt-14 flex overflow-hidden">
        <div className="marquee gap-6 pr-6">
          {[...TESTIMONIALS, ...TESTIMONIALS].map((t, i) => card(t, i))}
        </div>
      </div>
    </section>
  );
}

function FAQSection({ data }: { data: ServiceData }) {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <section id="faq" className="px-8 md:px-14 lg:px-20 py-24">
      <div className="mx-auto max-w-4xl">
        <div className="g-sp-faq-heading overflow-hidden pb-2">
          <h2 className="g-sp-faq-h2 font-display text-5xl leading-[0.95] sm:text-6xl md:text-7xl">
            Frequently Asked{" "}
            <span className="font-serif-italic font-normal text-[color:var(--brand-green)]">Questions</span>
          </h2>
        </div>
        <div className="g-sp-faq-list mt-12 divide-y divide-black/15 border-y border-black/15">
          {data.faqs.map((f, i) => {
            const isOpen = open === i;
            return (
              <div key={f.q} className="g-sp-faq-item">
                <button type="button" onClick={() => setOpen(isOpen ? null : i)}
                  className="flex w-full items-center justify-between gap-6 py-6 text-left" aria-expanded={isOpen}>
                  <span className="font-display text-xl sm:text-2xl">{f.q}</span>
                  <span className={`grid h-9 w-9 shrink-0 place-items-center rounded-full border border-black/20 text-xl transition ${isOpen ? "rotate-45 bg-[color:var(--ink)] text-white" : ""}`}>
                    +
                  </span>
                </button>
                <div className="grid overflow-hidden transition-all duration-300 ease-out" style={{ gridTemplateRows: isOpen ? "1fr" : "0fr" }}>
                  <div className="min-h-0">
                    <p className="pb-6 pr-12 text-[color:var(--ink)]/75">{f.a}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function ClosingCTA({ data }: { data: ServiceData }) {
  return (
    <section id="contact" className="px-4 py-28 sm:px-10 sm:py-36">
      <div className="g-sp-cta-content mx-auto max-w-5xl text-center">
        <h2 className="font-display text-5xl leading-[0.95] sm:text-7xl md:text-8xl">
          <H text={data.cta.h2} color={data.accentColor} />
        </h2>
        <p className="mx-auto mt-6 max-w-2xl text-lg text-[color:var(--ink)]/75">{data.cta.desc}</p>
        <div className="mt-10 flex flex-wrap justify-center gap-4">
          <Link href="/contact" className="rounded-full bg-[color:var(--ink)] px-7 py-4 text-base font-semibold text-white transition hover:opacity-90">
            Start a Project →
          </Link>
          <Link href="/contact" className="rounded-full border-2 border-[color:var(--ink)] px-7 py-4 text-base font-semibold text-[color:var(--ink)] transition hover:bg-[color:var(--ink)] hover:text-white">
            Book a Discovery Call
          </Link>
        </div>
      </div>
    </section>
  );
}
