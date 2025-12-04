# CultureLab Website – Product & Design Specification (v2)

> This document is for an AI coding assistant (Codex / GPT).  
> It describes **what to build**, **why**, and **how it should feel**, so you can implement the whole site end-to-end with reasonable technical decisions.

Core tech direction (Codex may choose exact versions/libs):

- Framework: **Next.js** (App Router) or equivalent modern React meta-framework
- Styling: **Tailwind CSS** + a **small custom component system** (no heavy UI kit)
- Animation: **Framer Motion**
- Optional 3D: **React Three Fiber** (for a single subtle 3D hero element)
- Data: Hardcoded JSON/arrays for now (no real DB required), but structure code so it’s easy to swap later.
- The main language for the website should be Simplified Mandarin Chinese.

---

## 0. Product Overview

**Name:** CultureLab  
**Tagline:** “Reading · Culture · Community”（阅读 · 文化 · 社群）

CultureLab is a **reading & cultural events community** that organizes:

- Offline & online **reading salons**
- **Cross-cultural talks** & workshops
- Small **creative projects** around literature, language, and art

The website is both:

1. A **public face** (introduce the project, build trust)  
2. An **operations hub** (events, membership info, registration, payments, waitlists, newsletter, etc.)

Primary objectives:

- Convert visitors into:
  - **Event registrants** (paid + free)
  - **Members / subscribers**
  - **Newsletter / WeChat contacts**
- Showcase a **serious, thoughtful, beautifully designed community** (not a generic club).

---

## 1. Audience & Goals

### 1.1 Target audiences

1. **Curious students & young professionals**
   - Many are multilingual, internationally minded.
   - Care about reading, ideas, and meaningful conversation.
   - Often in universities / urban centers (e.g., Beijing).

2. **Guest speakers, collaborators, partners**
   - Need to understand quickly what CultureLab is and why it’s credible.
   - May be deciding whether to co-host an event.

### 1.2 Top goals

1. Home page should quickly answer:
   - “What is CultureLab?”
   - “What kinds of events do they run?”
   - “How can I join or attend something soon?”
2. Event pages should:
   - Explain the **value** of the event.
   - Provide a clear **registration + payment** or **RSVP** flow.
   - Handle **waitlists** when events are full.
   - Offer **Add to calendar** and **WeChat group join** after payment/RSVP.
3. Membership page should:
   - Explain **tiers** and benefits clearly.
   - Feel aspirational but not scammy.
4. Blog and archives should:
   - Show that the community is **active & thoughtful**.
   - Provide recaps and essays that demonstrate the “intellectual vibe”.
5. Newsletter & contact capture should:
   - Make it easy for casual visitors to stay connected.

---

## 2. Brand, Tone & Aesthetic

### 2.1 Brand keywords

- **Curated salons** – guest-led, topic-specific, small circle
- **Slow & deep** – slow reading, deep conversations
- **Warm** – cozy, lamp-lit atmospheres, not harsh neon or corporate
- **Intelligent** – considered layouts, good typography
- **Cross-cultural** – bilingual hints, not monolingual monoculture

### 2.2 Visual mood

Design should feel like:

- An **evening salon table** with warm light, tea, cue cards, a mic
- An **indie art & literary magazine**
- A **small but serious studio** that cares about craft

Avoid:

- Generic SaaS dashboard aesthetics
- Excessive gradients or chaotic 3D / particle spam

### 2.3 Color direction (descriptive)

Not strict hex codes; Codex should choose harmonious values matching the vibe:

- **Background base:** very dark, with a subtle blue/indigo undertone
  - Feels like a night sky or deep library walls.
- **Primary accent:** warm amber/orange (“lamp light over pages”)
- **Secondary accent:** teal/cyan (“digital / future / cross-cultural” note)
- **Surface cards:** slightly lighter dark panels, with subtle blur/glass effect
- **Text:** off-white with good contrast; avoid pure #ffffff wherever possible.

Use accent colors sparingly to highlight:

- Buttons
- Links
- Important headings
- Focus states

### 2.4 Typography

- **Headings:**
  - Serif display font with character (e.g., Playfair Display or similar).
  - Works well with both Latin & Chinese headings.
  - Use different sizes for H1–H3 to create hierarchy.

- **Body text:**
  - Clean sans-serif (e.g., Inter / system UI).
  - Comfortable line height (especially for blog content).
  - Line length ~65–80 characters max.

Overall feel: like reading a **well-designed magazine**, not a generic blog.

---

## 3. Global Architecture

### 3.1 Routes & information architecture

Core routes:

- `/` – Home / Landing
- `/events` – Events list
- `/events/[slug]` – Event detail (description + registration / payment / RSVP / waitlist)
- `/events/[slug]/pay` – Payment step (WeChat / Alipay QR & instructions)
- `/blog` – Blog index (with tags/categories)
- `/blog/[slug]` – Blog post detail
- `/members` – Membership tiers & benefits
- `/about` – About page (origin story, values, team, logic behind CultureLab)
- `/account` – My Account (placeholder for future auth)
- `/admin` – Admin stub (front-end only)
- `/*` – Custom 404 page

No real auth or DB is required yet; all data can be stored as local arrays/objects.

### 3.2 Data model hints (for Codex)

Codex can choose exact types, but should allow for:

**Event:**

- `id`
- `slug`
- `title`
- `dateTime` (ISO or string)
- `location` (text; includes “Online” vs physical)
- `priceCNY` (number; 0 = free)
- `capacity` (optional; number) – used for waitlist logic
- `registeredCount` (for demo; can be mocked)
- `isOnline` (boolean)
- `shortDescription`
- `longDescription` (text/markdown)
- `tags` (array of strings; e.g., “阅读沙龙”, “跨文化对谈”)
- `wechatGroupQR` (path to image) – for post-payment/RSVP
- `paymentQRs` (optional mapping: `{ wechat: url, alipay: url }`)

**Blog Post:**

- `id`
- `slug`
- `title`
- `date`
- `excerpt`
- `content` (markdown/text)
- `tags` (e.g., “阅读笔记”, “活动回顾”, “跨文化”)

**Membership Tier:**

- `id`
- `nameEn`
- `nameZh`
- `pricePerMonthCNY`
- `highlight` (boolean)
- `benefits` (array of strings)

Testimonials, partners, and newsletter submissions can also be dummy arrays or simple static sections.

---

## 4. Global Layout & Navigation

### 4.1 Layout

- Shared `<Layout>` with:
  - Sticky header
  - Main content region
  - Footer
- Max content width ~1100–1200px, centered, with generous side padding on large screens.

### 4.2 Header

Content:

- Left:
  - Wordmark: `CultureLab` (with “Lab” accent color).
- Center/Right (desktop):
  - Nav links:
    - Events 活动 → `/events`
    - Blog 文章 → `/blog`
    - Membership 会员 → `/members`
    - About 关于 → `/about`
  - Accent button: `Account` / `My Account` → `/account` (rounded pill).
- Mobile:
  - Compact header with logo + a simple menu toggle (could be inline nav instead of a complex drawer).

Behavior:

- Sticky: remains at top while scrolling.
- On scroll down:
  - Slightly smaller header height.
  - Background becomes more opaque (e.g., from translucent to solid dark).
- Hover:
  - Links brighten slightly.
  - Optional underline animation (subtle, not flashy).

### 4.3 Footer

Content:

- Main line: `© 20XX CultureLab`
- Subline: `Reading · Culture · Community`
- Icons/text for social / China-specific channels:
  - WeChat 公众号
  - 小红书
  - Bilibili
  - (These can be placeholder links with sample URLs or “Coming soon” text.)

Design: simple, aligned center or grid; keep consistent spacing.

---

## 5. Home / Landing Page (`/`)

### 5.1 Hero

**Goal:** Instantly convey what CultureLab is and invite action.

Content:

- Eyebrow (small, all caps, spaced): `READING · CULTURE · COMMUNITY`
- Main headline:
  - `Slow reading for a fast world.`
- Subheadline (Chinese):
  - `在快节奏世界里，为认真阅读和深度对话留一块角落。`
- Supporting paragraph (2–3 sentences) explaining:
  > 我们通过读书会、跨文化对谈和小型工作坊，把一本书变成一场生活实践。  
  > 线上线下结合，为你找到同频的伙伴。
- CTAs:
  - Primary: `查看近期活动` → `/events`
  - Secondary: `了解会员计划` → `/members`

Layout:

- Desktop: two columns.
  - Left: text + CTAs.
  - Right: animated hero visual (3D / depth).
- Mobile: stack vertically; text first, visual second.

### 5.2 Hero visual (3D / Framer-Motion)

Choose one of these or combine subtly:

1. **Floating glass cards (Framer Motion)**:
   - Several overlapping cards representing:
     - Event cards (title, date)
     - Book covers
     - Small quotes
   - Cards have semi-transparent glass backgrounds, soft inner glow.
   - Cards gently float (y translation) and tilt on hover; slight parallax on mouse move.

2. **Salon vignette (React Three Fiber)**:
   - A small round table with tea set、cue cards、mic/recorder、open notebook。
   - Chairs or silhouettes around, warm pendant light, subtle skyline/acoustic panels.
   - Agenda card can show下一个活动标题/日期；slow orbit + gentle breathing light; allow light zoom/pan.

Motion style: slow, smooth, calming.

### 5.3 Upcoming events section

Section title: `Upcoming Events · 即将举办`

Layout:

- Show 3–4 upcoming events as cards in a grid (1 column mobile, 2–3 on desktop).
- Each card shows:
  - Date & time
  - Title
  - Location (badge indicating `线上` vs a physical place)
  - Short description (1–2 sentences)
  - Price (`¥99` or “Free 免费”)
  - A subtle `报名 →` text or icon on hover.

Cards:

- Rounded corners (16–24px)
- Dark surfaces with border & subtle gradient.
- Hover: slight lift, accent border, maybe glow at corners.

### 5.4 “Why CultureLab exists” / Story

Short narrative section explaining:

- Information overload vs slow thought.
- Reading as a practice, not just content consumption.
- Cross-cultural dimension: exploring ideas across languages and contexts.

Layout:

- Two columns:
  - Left: 3–4 short paragraphs.
  - Right: bullet list or icon list:
    - `慢读书会 · Slow Reading Salons`
    - `跨文化对谈 · Cross-Cultural Dialogues`
    - `小范围深度交流 · Small, Curated Groups`

### 5.5 Blog preview

Section title: `Latest Posts · 最新文章`

- Show latest 3 posts with:
  - Date
  - Title
  - Excerpt
  - `阅读全文 →`

Design: editorial, not too “card-y”; emphasize typography.

### 5.6 Membership teaser

Small section at bottom:

- Title: `For those who want to go deeper.`
- One short paragraph about membership.
- Button: `查看会员权益` → `/members`.

---

## 6. Events (List, Detail, RSVP/Payment, Waitlist)

### 6.1 Events list (`/events`)

Goals:

- Quickly show what’s coming up.
- Clearly separate **upcoming** and **past** events.

Structure:

- Page title: `Events · 活动`
- Two sections:
  1. `Upcoming · 即将举办`  
     - All events whose date is in the future (or flagged as upcoming).
  2. `Past · 往期活动`  
     - Past events, visually slightly muted (lower opacity, grayscale cover images, etc.).
     - Each card links to its detail page, where you can optionally connect to a recap blog post.

Each event card:

- Date & time
- Title
- Location
- Tag chips (e.g. “阅读沙龙”, “线上”)
- Short description
- Price
- Button/label: `详情与报名 →`

Add simple **filters**:

- At least one filter by tag or type:
  - Example: pill buttons `全部`, `线下`, `线上`.
  - If clicked, filter the list on the client side.

### 6.2 Event detail (`/events/[slug]`)

Layout: 2-column on desktop.

Left: **Content**

- Title
- Date & time (prominent)
- Location (with an indicator: online vs offline)
- Detailed description (3–6 paragraphs)
- “Who this is for” – bullet list
- “What you’ll get” – bullet list

Right: **Registration panel**

The registration panel must handle:

1. **Paid event with available spots**
2. **Paid event full → Waitlist**
3. **Free event with available spots**
4. **Free event full → Waitlist**

Elements:

- Price line:
  - For paid: `费用：¥99`
  - For free: `费用：Free 免费`
- If capacity is known:
  - Display “X / Y 已报名” or a simple availability marker like “名额紧张 / 充足”.
- Form fields:
  - Name 姓名 (required)
  - WeChat ID 微信号 (required)
  - Email 邮箱 (optional)
  - Option: “我想加入邮件通讯 / Newsletter” (checkbox)

- Payment/RSVP action:

  - If **paid & spots available**:
    - Show payment method choice:
      - `微信支付 WeChat Pay`
      - `支付宝 Alipay`
    - Button text: `去支付 · Pay`
    - On submit: go to `/events/[slug]/pay` with chosen method.

  - If **paid & full (capacity reached)**:
    - Explain: “本次活动已满额，但你可以加入候补名单。”
    - Button text: `加入候补名单`
    - On submit: store the info as waitlist (in this MVP, just show a success state).

  - If **free & spots available**:
    - No payment method selection.
    - Button text: `提交报名`
    - On submit: show success screen with confirmation and WeChat group QR.

  - If **free & full**:
    - Similar to paid full: `加入候补名单`.

After successful submission (in-place or as a confirmation view):

- Show:
  - Short text: `报名信息已收到，我们会尽快与你确认。`
  - If an event has a WeChat group:
    - Show a WeChat QR code with text:
      > “请扫码加入活动微信群，详细信息将会在群内发布。”

### 6.3 Payment page (`/events/[slug]/pay`)

This page represents the payment step after submitting the form for a paid event.

Content:

- Title: `完成支付 · Complete Payment`
- Short text:
  > 请使用 {微信支付 / 支付宝} 扫描下方二维码完成支付。  
  > 支付成功后，我们会通过微信或邮箱向你确认报名信息，并发送活动详情。

Layout:

- Centered card with:
  - Payment method label (WeChat / Alipay)
  - QR image (placeholder for now)
  - Amount (`¥X`)
  - Brief instructions:
    - “支付成功后请截图保存凭证。”
    - “若支付后 24 小时内未收到确认，请通过微信联系主办方。”

Post-payment next step (MVP):

- Provide a button: `我已完成支付` → shows a confirmation state:
  - Thank you text
  - WeChat group QR code for event group (if available)
  - Suggest adding to calendar: `添加到日历 Add to calendar` (see next subsection).

### 6.4 Add-to-calendar feature

For each event (on detail page, and on post-payment confirmation):

- Provide an `添加到日历 Add to Calendar` button or small link.
- When clicked:
  - Trigger download of an `.ics` file pre-filled with:
    - event title, date/time, location, and description
  - Optionally present links:
    - `添加到 Google 日历` (web link)
    - `下载日历文件 (.ics)`

Exact implementation details are flexible, but UX should feel straightforward and polished.

---

## 7. Blog (with Tags & Past Event Recaps)

### 7.1 Blog index (`/blog`)

Goals:

- Look like an editorial list.
- Allow simple navigation by **tags / categories**.
- Posts/播客/回顾对所有人公开，便于分享传播。

Content:

- Page title: `Blog · 阅读札记`
- Intro: short text describing the blog:
  > 这里是我们的阅读札记、活动回顾和跨文化随笔，记录慢阅读社区的日常。

Features:

- Tag filter row (chips):
  - Example tags: `全部`, `阅读笔记`, `活动回顾`, `跨文化`.
  - Click to filter posts; default is `全部`.
- List or grid of posts (2 columns on desktop, 1 column on mobile):

Each post card:

- Date
- Title
- Tags (small chips)
- Excerpt
- `阅读全文 →`

### 7.2 Blog post detail (`/blog/[slug]`)

Design:

- Narrow content width (680–760px).
- Dark `prose` style for text (headings, lists, quotes).
- Top area:
  - Title
  - Date
  - Tags
- Body: several paragraphs, maybe sub-headings.

Integration with events:

- For posts that are **event recaps**, show:
  - A callout at top or bottom:
    - “这篇文章是活动 ‘XXX’ 的回顾”
    - Link back to the event page.

Skeleton loading:

- When navigating between posts client-side:
  - Show skeleton placeholders (title bar, lines, etc.) for a brief moment.
  - Skeleton styling: subtle, dark theme-appropriate.

---

## 8. Membership (`/members`)

### 8.1 Purpose

Explain and sell the **membership tiers** for deeper community engagement.

Content:

- Title: `Membership · 会员计划`
- Intro text (2–3 lines) explaining:
  - Why membership exists (support the community, get stable participation, better experience).
  - That membership is optional but valued.

### 8.2 Tiers

Three tiers (with example copy):

1. **Explorer 探索会员**
   - Price: `¥19 / 月`
   - Benefits:
     - 每月 1 场线下活动会员价
     - 在线读书会参与权
     - 会员通讯 Newsletter
2. **Creator 创作者会员** (highlighted)
   - Price: `¥49 / 月`
   - Benefits:
     - 所有活动会员价
     - 小组共创工作坊优先报名
     - 专属讨论群
     - 活动回放 & 笔记访问权限
3. **Patron 赞助人**
   - Price: `¥99 / 月`
   - Benefits:
     - 包含 Creator 权益
     - 核心活动内圈席位
     - 联合策划一场活动机会（需沟通确认）

Design:

- Cards in 1/3/3 layout (stack on mobile).
- Middle tier card: visually highlighted (brighter, maybe bigger).
- Button on each: `成为会员`.

Interaction:

- For now, clicking `成为会员` may:
  - Open a small panel or page that reuses payment flow idea (not fully implemented), **or**
  - Show a message: “Membership purchase will be added soon; contact us for early access.”
  - Either is acceptable as long as the UX feels consistent and not broken.

---

## 9. About Page (`/about`)

Purpose: give context and build emotional trust.

Content sections:

1. **Origin story**
   - How CultureLab started (e.g. a few friends tired of superficial content).
   - Why reading and cross-cultural dialogue matter.
2. **Values**
   - 3–5 short principles, e.g.:
     - “Slow before fast”
     - “多语种、多视角”
     - “Small, deep, human-scale experiences”
3. **Team / hosts**
   - Small profiles (names/aliases, 1-2 lines on each).
   - Simple photos or placeholders.
4. **Timeline / milestones** (optional)
   - A simple vertical timeline with major events: first salon, first cross-cultural talk, etc.

Design: spacious, rooted in typography; fewer cards, more content blocks.

---

## 10. Newsletter & Contact Capture

Location:

- A **“Stay in touch” section** near bottom of home page.
- Short nods on About page and maybe Blog sidebar.
- Optional form in footer.

Copy example:

- Title: `Stay in the loop · 保持联系`
- Text:
  > 留下邮箱或微信号，我们会在有新活动、开放报名或发布长文时第一时间通知你。

Fields:

- Email (optional)
- WeChat ID (optional)
- Checkbox: “我同意接收来自 CultureLab 的活动与内容更新”

UX:

- On submit, show a success message (“感谢你的信任，我们会在有新内容时联系你。”).
- Data can be printed to console or stored in memory in MVP.

---

## 11. Testimonials & Social Proof

### 11.1 Testimonials

Section on home or About:

- Title: `Voices from the community · 社群的声音`
- 3–5 quotes:
  - Short 1–2 sentence impressions from participants.
  - Show name/alias, maybe school/role (e.g. “THU CS student”).
- Cards with light borders; quotes can use italic or callout style.

### 11.2 Photo gallery / highlights

A small gallery section:

- Title: `Moments · 活动瞬间`
- Grid of 6–9 images:
  - People reading, discussion tables, notebooks, etc. (placeholder photos are fine).
- Clicking an image can:
  - Either open a simple lightbox (if easy) or
  - Show a slightly larger on hover (scale & shadow).

### 11.3 Partner / collaborator logos

A strip of logos or text:

- Title: `Partners & Collaborators · 合作伙伴`
- Even if there are no real partners yet, design the section with placeholders.
- Layout: row of small logos or pill cards with names.

---

## 12. WeChat & Social (China-specific)

### 12.1 WeChat group joining flow

After:

- successful **event payment**, or
- successful **free RSVP**,

Show:

- A **WeChat group QR code** (static image for now).
- Text:
  > 请扫码加入活动微信群，详细信息（地点、注意事项等）会在群内发布。

This can be part of the confirmation state on `/events/[slug]` or `/events/[slug]/pay`.

### 12.2 WeChat / 小红书 / Bilibili links

Place small icons/links in the footer and possibly on About page:

- 微信公众号
- 小红书账号
- Bilibili 频道

For now, the URLs can be dummy links like `https://example.com`, but the layout should expect real social links.

---

## 13. Account Page (`/account`)

Purpose: placeholder for future member dashboard.

Content:

- Title: `My Account · 我的账户`
- Text:
  > 登录与个人中心功能将在后续版本上线。  
  > 如需确认报名或会员信息，请通过微信或邮件联系主办方。

Optional:

- Fake “profile card”:
  - Name: “访客 / Visitor”
  - Membership status: “未登录 / Guest”
  - Buttons labeled “即将上线 · Coming soon” (disabled style).

---

## 14. Admin Stub (`/admin`)

Purpose: conceptual foundation for internal tools, no real auth.

Content:

- Title: `Admin · 管理后台（演示）`
- Sections:
  - Events overview:
    - List of events with:
      - Title, date, capacity, registeredCount (mock).
    - Buttons for “Edit” or “View registrations” can be **non-functional** or open modals with dummy data.
  - Blog posts overview:
    - Titles, dates, tags.
  - Quick actions (non-functional):
    - “+ 创建新活动”
    - “+ 发布新文章”

Design:

- Minimal admin-style layout, but still on-brand (dark theme, accent colors).
- This is not a full product; it’s just there to signal long-term vision.

---

## 15. Motion & Microinteractions (Framer Motion)

### 15.1 Global principles

- Motion should be **subtle, slow, and elegant**.
- Avoid distracting bounce / spring effects.
- Use motion to:
  - Guide attention.
  - Reinforce hierarchy (e.g., hero moves more than small elements).

### 15.2 Patterns

1. **Page load / route transitions**
   - Main content fades in and moves up slightly (e.g. 12–20px).
   - Duration ~0.4–0.6s, easeOut.

2. **Hero visual**
   - Continuous slow animation (floating cards or slowly rotating 3D object).
   - On mouse move (desktop), small parallax effect (few px only).

3. **Cards**
   - Hover: slight lift, shadow, border color shift towards accent.
   - Maybe slight tilt or scale (1.02) on hover for important cards (membership).

4. **Buttons**
   - Hover: background brightens, slight scale (1.03).
   - Tap: quick scale down (0.97) then back.

5. **Form errors**
   - If validation fails, red border & small shake (horizontal with low amplitude).

6. **Skeleton loading**
   - Soft shimmer or gradient on skeleton blocks.
   - Used on:
     - Blog post content
     - Event detail card
   - Should not last long—just enough to avoid jarring blank screens.

---

## 16. Responsive Design

### 16.1 Mobile first

Design from mobile upwards:

- Single-column layout.
- Generous padding (16–20px).
- Hero stacks text then visual.
- Cards full width; spacing between sections generous.

### 16.2 Tablet & Desktop

Tablet:

- Two columns where appropriate (events, blog).
- Consider stacked nav with maybe a simple menu.

Desktop:

- 2–3 column grids for events, blog, memberships.
- Max width ~1100–1200px.
- Hero with two columns.

Make sure:

- Navigation is always clear and reachable.
- Text remains readable (no tiny fonts on mobile).

---

## 17. Analytics Hooks

No need to integrate a specific analytics provider, but:

- Code structure should make it easy to add analytics later.
- At a minimum, centralize potential tracking hooks or comments around:
  - Clicking `查看近期活动` on home.
  - Starting / completing event registration.
  - Starting / completing payment.
  - Clicking `成为会员`.
  - Submitting the newsletter form.

Codex can implement these as simple stub functions or comments like `// trackEvent("start_checkout", {...})`.

---

## 18. Non-goals (MVP)

For this first version, **do NOT** implement:

- Real user authentication (no login / signup / JWT needed).
- Real database (no persistence required beyond runtime).
- Real payment webhooks or proper integration with WeChat Pay / Alipay APIs.
- Full admin functionality or permissions.
- Complex multi-language infrastructure (if needed later, can be added).

---

## 19. Quality Checklist (for Codex)

Before considering the implementation done, confirm:

1. **Visual & UX**
   - Hero is distinctive and visually rich, with depth/3D/motion.
   - Cards, buttons, and typography are consistent across pages.
   - Home → Events → Event detail → Payment / RSVP → Confirmation feels smooth and coherent.

2. **Content & structure**
   - Upcoming & past events separation works.
   - Blog supports tag filtering, and sample posts exist.
   - Membership tiers are clear, with benefits and highlight styling.
   - About page tells an origin story & values.

3. **Community features**
   - Newsletter / contact form exists and works (at least to a success state).
   - Waitlist logic is represented in UI and copy.
   - WeChat group QR is shown in relevant confirmation flows.

4. **Polish**
   - Custom 404 page is designed and on-brand.
   - Skeleton loading states appear appropriately.
   - Responsive behavior is tested on mobile & desktop sizes.
   - No glaring layout or alignment issues.

If there is a tradeoff between **more features** and **higher visual/interaction quality**, prioritize **quality**.

CultureLab should feel like a small, carefully crafted, real project—not a generic template.
