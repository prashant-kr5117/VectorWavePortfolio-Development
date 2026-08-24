// One-time import of the posts that used to be hardcoded in lib/posts.ts.
// Run with: npm run migrate:posts
// Requires NEXT_PUBLIC_SANITY_PROJECT_ID, NEXT_PUBLIC_SANITY_DATASET and
// SANITY_API_WRITE_TOKEN (a token with "Editor" access) in .env.local.
import { createClient } from "@sanity/client";
import { randomUUID } from "node:crypto";

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "production",
  apiVersion: "2026-08-24",
  token: process.env.SANITY_API_WRITE_TOKEN,
  useCdn: false,
});

const legacyPosts = [
  {
    slug: "5-signs-your-business-has-outgrown-spreadsheets",
    title: "5 signs your business has outgrown spreadsheets",
    excerpt:
      "How to tell when scattered spreadsheets are costing you more than an ERP implementation would.",
    content: [
      "Spreadsheets are a great way to get a business off the ground. They're flexible, familiar, and free. But as a business grows, the same spreadsheets that once felt efficient start to quietly work against you.",
      "The first sign is version confusion. When more than one person is updating the same numbers, you inevitably end up with conflicting copies, and nobody is fully sure which version is correct.",
      "The second sign is manual reconciliation. If someone on your team spends hours each week copying numbers between sheets, invoices, and emails, that is time an ERP system gives back immediately.",
      "The third sign is a lack of real-time visibility. Spreadsheets are a snapshot in time. The moment they're exported, they're already out of date, which makes forecasting and decision-making harder than it needs to be.",
      "The fourth sign is scaling pain during onboarding. New hires need to be taught your specific spreadsheet quirks and workarounds, none of which are documented anywhere formal.",
      "The fifth sign is audit anxiety. When compliance or investors ask for clean records, a patchwork of spreadsheets rarely holds up well under scrutiny.",
      "None of this means spreadsheets are bad. It means there's a point where the cost of maintaining them quietly exceeds the cost of implementing a proper system, and most businesses cross that line well before they notice it.",
    ],
    category: "ERP",
    author: "VectorWave Team",
    dateValue: "2026-06-18",
  },
  {
    slug: "zoho-crm-automation-where-teams-leave-value-on-the-table",
    title: "Zoho CRM automation: where most teams leave value on the table",
    excerpt:
      "The follow-up sequences, lead scoring rules, and pipeline automations most CRM setups skip.",
    content: [
      "Most businesses implement Zoho CRM to organise contacts and track deals, then stop right before the part that actually pays for the system: automation.",
      "Follow-up sequences are the easiest win. A lead that doesn't hear back within an hour is dramatically less likely to convert, yet most sales teams still rely on someone remembering to follow up manually.",
      "Lead scoring is the second missed opportunity. Without it, every lead looks the same to your sales team, and reps spend equal time on a browsing visitor and a ready-to-buy prospect.",
      "Pipeline automation closes the loop: automatically moving deals between stages based on activity, notifying the right person at the right time, and flagging deals that have gone quiet.",
      "The teams that get the most out of Zoho CRM treat automation as the primary reason for the system, not an optional add-on after setup.",
    ],
    category: "CRM",
    author: "VectorWave Team",
    dateValue: "2026-06-09",
  },
  {
    slug: "where-ai-actually-pays-off-inside-a-growing-business",
    title: "Where AI actually pays off inside a growing business",
    excerpt:
      "Practical automation use cases we're deploying inside CRM and finance systems today.",
    content: [
      "There's a lot of noise around AI right now, and most of it doesn't translate into anything a growing business can actually use this quarter.",
      "The use cases that hold up are narrower than the hype: automatically summarising long support threads, flagging invoices that look anomalous before they're paid, and drafting first-pass follow-up emails from CRM activity.",
      "In every case, the pattern is the same: AI removes a specific, repetitive task from someone's day, rather than trying to replace judgement entirely.",
      "The businesses seeing real returns are the ones who picked one workflow, measured the time it saved, and only then expanded to the next one.",
    ],
    category: "AI",
    author: "VectorWave Team",
    dateValue: "2026-05-22",
  },
  {
    slug: "what-makes-a-business-website-actually-convert",
    title: "What makes a business website actually convert",
    excerpt:
      "Speed, clarity, and trust signals: the fundamentals that matter more than trends.",
    content: [
      "It's tempting to chase the latest design trend, but the sites that consistently convert visitors into leads share a much shorter list of fundamentals.",
      "Speed comes first. A slow-loading page loses visitors before they've even seen the offer.",
      "Clarity comes second. Visitors should understand what you do and who it's for within a few seconds of landing, without needing to scroll.",
      "Trust signals close the gap: real client names, specific outcomes, and a visible way to get in touch all matter more than another animation.",
    ],
    category: "Web Dev",
    author: "VectorWave Team",
    dateValue: "2026-05-14",
  },
  {
    slug: "getting-your-chart-of-accounts-audit-ready-with-zoho-books",
    title: "Getting your chart of accounts audit-ready with Zoho Books",
    excerpt:
      "A practical checklist for structuring finance data so reporting holds up under scrutiny.",
    content: [
      "A clean chart of accounts is the foundation everything else in Zoho Books sits on top of, and it's usually the first thing that falls apart as a business grows quickly.",
      "Start by mapping accounts to how your business actually reports, not how the default template is structured.",
      "Keep a consistent naming convention across accounts so anyone reviewing your books later can follow the logic without a walkthrough.",
      "Reconcile monthly, not quarterly. Small discrepancies compound, and catching them early is far less painful than catching them during an audit.",
    ],
    category: "Finance",
    author: "VectorWave Team",
    dateValue: "2026-04-28",
  },
  {
    slug: "zoho-vs-odoo-choosing-the-right-erp-foundation",
    title: "Zoho vs Odoo: choosing the right ERP foundation",
    excerpt:
      "A side-by-side look at where each platform fits best, based on real implementations.",
    content: [
      "Zoho and Odoo are both strong ERP foundations, but they tend to fit different shapes of business.",
      "Zoho's strength is its breadth: dozens of connected apps that work well together out of the box, which suits businesses that want one vendor and fast time to value.",
      "Odoo's strength is its modularity: you install only what you need, and its open-source core gives more room for deep customisation when a business has unusual processes.",
      "In practice, the decision usually comes down to how standard your processes are. The more standard, the faster Zoho gets you live. The more specific, the more Odoo's flexibility pays off.",
    ],
    category: "ERP",
    author: "VectorWave Team",
    dateValue: "2026-04-10",
  },
];

function toBlocks(paragraphs) {
  return paragraphs.map((text) => ({
    _type: "block",
    _key: randomUUID(),
    style: "normal",
    markDefs: [],
    children: [{ _type: "span", _key: randomUUID(), text, marks: [] }],
  }));
}

async function run() {
  if (!process.env.SANITY_API_WRITE_TOKEN) {
    throw new Error("SANITY_API_WRITE_TOKEN is not set. Add it to .env.local first.");
  }

  for (const post of legacyPosts) {
    const doc = {
      _id: `post-${post.slug}`,
      _type: "post",
      title: post.title,
      slug: { _type: "slug", current: post.slug },
      excerpt: post.excerpt,
      category: post.category,
      author: post.author,
      publishedAt: new Date(post.dateValue).toISOString(),
      body: toBlocks(post.content),
    };
    await client.createOrReplace(doc);
    console.log(`Migrated: ${post.slug}`);
  }

  console.log(`Done. Migrated ${legacyPosts.length} posts.`);
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});
