# Notion AI Prompt — Job Search CRM

Copy everything below into Notion AI.

---

Build me a job search CRM with two linked databases and two page templates.

**DATABASE 1: "Target Companies"**

Properties:
- Company Name — Title
- Market — Select: Middle East, English-Speaking Remote, Algeria
- Priority — Select: High, Medium, Low
- Status — Select: Researching, Applied, In Contact, Interviewing, Offer, Rejected, Paused
- Industry/Product — Select: B2B SaaS, ERP, Fintech, Design Tools/Systems, Other
- Company Size — Select: 1–10, 11–50, 51–200, 201–1000, 1000+
- Hiring Signal — Select: Portfolio/Take-home first, Panel-heavy, Unknown
- Source — Select: LinkedIn, Bayt, Wuzzuf, Remote Rocketship, We Work Remotely, RemoteOK, Wellfound, Referral, Other
- Job Posting URL — URL
- Salary Range — Text
- Fit Notes — Text
- Date Added — Date
- Last Touch — Date
- Next Action — Text
- Next Action Date — Date
- People — Relation to "Contacts" database

**DATABASE 2: "Contacts"**

Properties:
- Name — Title
- Company — Relation to "Target Companies"
- Role — Select: Founder, Recruiter, Design Lead, Hiring Manager, Other
- LinkedIn URL — URL
- Relationship Stage — Select: Not yet followed, Following, Commenting, DM sent, Replied, Ongoing conversation, Call scheduled, Cold
- Last Interaction Date — Date
- Next Planned Touch — Text

**PAGE TEMPLATE — "New Target Company"** (default template for new Target Companies entries)

1. **Snapshot** — what the company does, product type, size, market.
2. **Why This Fits** — 1–2 lines connecting my background (B2B SaaS, ERP, design systems, accessibility, Arabic/RTL localization) to what this company needs.
3. **Hiring Signal** — what I know about their process (portfolio review or take-home mentioned? multi-round panel?) and what that means for how much time I invest here.
4. **People To Know** — linked view of Contacts filtered to this company.
5. **Interaction Log** — dated bullet log: comments left, DMs sent, replies received, calls held.
6. **Next Action** — one clear next step and a date.

**PAGE TEMPLATE — "New Contact"** (default template for new Contacts entries)

1. **Who they are** — role, why they matter, how I found them.
2. **Engagement History** — dated log of comments, DMs, replies.
3. **Notes** — what they post about, tone, anything useful for the next comment or message.
4. **Next Planned Touch** — one line, one date.

Keep both databases and templates practical and minimal — no properties or sections beyond what's listed above.

---

*Context if Notion AI asks for more detail: this tracks a remote Product Designer job search, prioritizing Middle East companies first, then English-speaking remote, then Algeria. Portfolio/take-home-weighted hiring processes are preferred over panel-heavy ones.*
