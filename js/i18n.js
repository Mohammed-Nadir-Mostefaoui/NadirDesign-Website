/* ============================================================
   i18n — EN / FR / AR language switching
   Translations are inlined so the site works on file:// too.
   - Replaces [data-i18n="key"] elements
   - Sets dir="rtl" and lang attr on <html> for Arabic
   - Persists choice in localStorage
   ============================================================ */

(function () {
  const STORAGE_KEY = 'nadir-lang';
  const DEFAULT_LANG = 'en';
  const RTL_LANGS = ['ar'];

  /* ── Inline translations ─────────────────────────────────── */
  const LOCALES = {
    en: {
      nav: {
        projects:   'Projects',
        experience: 'Experience',
        skills:     'Skills',
        insights:   'Insights',
        contact:    'Contact Me',
        back_to_top: 'Back to top',
        theme_to_dark: 'Switch to dark mode',
        theme_to_light: 'Switch to light mode',
        dropdown_aria: 'Show projects menu',
        all_projects: 'All projects'
      },
      hero: {
        greeting:      "Hi, I'm Nadir Mostefaoui",
        title:         'Product\nDesigner',
        bio:           'I design product interfaces for B2B SaaS, ERP modules, sales dashboards, mobile-first apps, and multi-role enterprise platforms.',
        cta_primary:   "Let's Talk",
        cta_secondary: 'View My Work',
        cta_cv:        'View CV',
        scroll:        'Scroll',
        scroll_aria:   'Scroll to explore',
        stat2_num:     '20+',
        stat2_label:   'Projects\ncontributed',
        stat3_num:     '03',
        stat3_label:   'Countries\nexperience'
      },
      work: {
        label:         'SELECTED WORK',
        title:         'Case Studies',
        subtitle:      'A closer look at how I turn complex, data-heavy workflows into usable products.',
        nda:           'NDA: specifics generalized, no confidential data shown',
        cta:           'View Case Study',
        flow_problem:  'Problem',
        flow_approach: 'Approach',
        flow_outcome:  'Outcome',
        cs1: {
          hook:         'Design System',
          short:        'Design System',
          tag:          'ERP · Design System',
          title:        'Datamaster Design System',
          role:         'Product Designer (UI/UX), sole designer',
          problem:      'No consistency across products, outdated visuals, and poor responsiveness across a growing ERP suite.',
          approach:     'Built a full design system from scratch (palette, typography, an 8px spacing grid, a custom icon set, and a growing component library), documented for dev handoff.',
          outcome:      'First rollout, in the Task Management App, cut task execution time by 50% in usability testing.',
          stat1_num: '50', stat1_suffix: '%',  stat1_label: 'faster in first rollout',
          stat2_num: '8',  stat2_suffix: 'px', stat2_label: 'spacing grid system',
          tag1: 'Design Systems', tag2: 'Component Library', tag3: 'Dev Handoff'
        },
        cs2: {
          hook:         'Retail Operations App',
          short:        'Task Master',
          tag:          'Retail Operations · Mobile-First',
          title:        'Task Master · Retail Ops App',
          role:         'Product Designer, sole designer',
          problem:      'Store operations (purchasing, inventory, stock corrections, shelf labelling), scattered across spreadsheets and disconnected tools.',
          approach:     'Unified six workflows into one task model (List → Details → Execution), built the design system under it, and iterated with real supermarket users across mobile, tablet, and desktop.',
          outcome:      "50% faster task execution, fewer stock-correction errors, and the visual benchmark for Datamaster's ERP suite.",
          stat1_num: '50', stat1_suffix: '%', stat1_label: 'faster task execution',
          stat2_num: '6',  stat2_suffix: '',  stat2_label: 'workflows unified',
          stat3_num: '390', stat3_suffix: '+', stat3_label: 'screens, 3 breakpoints',
          tag1: 'Mobile-First', tag2: 'User Flows', tag3: 'Usability Testing'
        },
        cs3: {
          hook:         'B2B Sales ERP Module',
          short:        'Sales ERP',
          tag:          'ERP · Sales Operations',
          title:        'B2B Sales ERP Module',
          role:         'Product Designer (UI/UX)',
          problem:      'Client, order, and invoice data fragmented across tools: dense screens, poor readability.',
          approach:     'Mid-fidelity, three-zone layout (navigation, tables, and quick actions), prioritizing logic over polish across 4 end-to-end sales flows.',
          outcome:      'A clear data hierarchy across the full quote-to-return flow, and the layout foundation for 4 more ERP modules.',
          stat1_num: '8',   stat1_suffix: '', stat1_label: 'core screens',
          stat2_num: '50',  stat2_suffix: '', stat2_label: 'frame states',
          stat3_num: '9.1', stat3_suffix: '', stat3_label: 'version reached',
          tag1: 'Data Visualization', tag2: 'Enterprise UX', tag3: 'Prototyping'
        },
        cs4: {
          hook:         'eLearning Platform',
          short:        'eLearning',
          tag:          'eLearning · Multi-Role Platform',
          title:        'eLearning Platform',
          role:         'Product Designer (UI/UX)',
          problem:      'Teachers hosted lessons on YouTube with no control over courses, students, or analytics.',
          approach:     'Ran a Design Thinking process across 3 roles (Teacher, Admin, Super Admin), with role-based permissions and modular chapters → lessons → exams.',
          outcome:      'Teachers can now fully manage courses without external platforms, a centralized ecosystem ready to scale.',
          stat1_num: '3', stat1_suffix: '', stat1_label: 'user roles designed',
          stat2_num: '3', stat2_suffix: '', stat2_label: 'dashboards shipped',
          tag1: 'Design Thinking', tag2: 'Role-Based UX', tag3: 'Arabic UX'
        },
        cs5: {
          hook:         'Design System',
          short:        'Design System',
          tag:          'ERP · Design System',
          title:        'Iksir Design System',
          role:         'Product Designer, led the project (2-person team)',
          problem:      'A growing ERP and mobile suite with no shared UI language: inconsistent components, slow builds, and no accessibility or trilingual foundation.',
          approach:     'Led a token-first design system (a three-layer token architecture, accessibility baked in, a trilingual (LTR/RTL) foundation, and the entire mobile layer), documented for dev handoff.',
          outcome:      'Shipped V1, and the team now designs and builds against it: one source of truth across web and mobile, with light/dark and RTL handled automatically.',
          stat1_num: '1033', stat1_suffix: '', stat1_label: 'design variables',
          stat2_num: '24', stat2_suffix: '', stat2_label: 'components shipped',
          tag1: 'Design Systems', tag2: 'Accessibility', tag3: 'Design Tokens'
        }
      },
      experience: {
        /* NOTE on nawat/dma/atqin `duration` below: these three roles are
           still ongoing ("Present"), so js/experience.js recomputes and
           overwrites this text live from each role's start date on every
           load and language switch. The strings here only matter as the
           first-paint/no-JS fallback — keep them roughly accurate when
           editing nearby content, but don't worry about them drifting. */
        label:    'PROFESSIONAL JOURNEY',
        title:    'My Experience',
        subtitle: 'Over the years, I\'ve had the privilege to work with amazing teams and clients.',
        tag_pd:   'Product Design',
        tag_ds:   'Design Systems',
        tag_lead: 'Leadership',
        tag_ux:   'UX Research',
        nawat: {
          company:   'Nawat Studio',
          role:      'Product Designer',
          city:      'Tlemcen',
          country:   'Algeria',
          work_type: 'Remote',
          dates:     'Jan 2026 - Present',
          duration:  '7 mos',
          desc_0:    '- Datamaster Analytics is the anchor client of Nawat Studio, so my concurrent Datamaster role (below) is that same work, delivered through the studio.',
          desc_1:    '- Leading product design for B2B SaaS and enterprise software clients',
          desc_2:    '- Managing and mentoring a product designer, reviewing deliverables, and ensuring design quality.',
          desc_3:    '- Delivering ERP interfaces, design systems, and IA restructuring across client engagements.'
        },
        dma: {
          company:   'Datamaster Analytics',
          city:      'Bezons, Île-de-France',
          country:   'France',
          work_type: 'Remote',
          dates:     'Sep 2024 - Present',
          duration:  '1 yr 11 mos',
          role_a:    'Product Designer',
          dates_a:   'Dec 2024 - Present',
          desc_a0:   'Sole product designer for a growing ERP platform, responsible for the full design scope across multiple business modules and a complete post-rebranding design system.',
          desc_a1:   '- Designed five core ERP modules end-to-end: B2B Sales, Purchase, POS, Finance, and Accounting, each handling high data density across complex multi-role workflows',
          desc_a2:   '- Building a comprehensive design library post-rebranding, Figma component system plus a dedicated website that makes the design system accessible to non-designers',
          desc_a3:   '- Leading an information architecture project to restructure and unify all existing products before a full platform redesign',
          desc_a4:   '- Collaborated daily with business analysts, technical leads, and front-end and back-end developers to deliver dev-ready Figma files',
          role_b:    'UI/UX Designer',
          dates_b:   'Sep 2024 - Nov 2024',
          desc_b0:   'Initial freelance engagement focused on the company\'s mobile product.',
          desc_b1:   '- Designed a mobile-first Task Management App for retail warehouse teams, full end-to-end design across 2 iterations over the project lifecycle'
        },
        five: {
          company:   'Five Angles',
          role:      'UI/UX Designer',
          country:   'Dubai',
          city:      'United Arab Emirates',
          work_type: 'Remote',
          dates:     'Mar 2024 - Dec 2024',
          duration:  '10 mos',
          desc_0a:   'Worked with a ',
          desc_0b:   'Dubai-based agency',
          desc_0c:   ' on a range of client projects across multiple industries.',
          desc_1:    '- Designed the Super Admin, Admin, and Teacher dashboards for a multi-role e-learning platform, course management, content creation flows, and student progress tracking.',
          desc_2:    '- Redesigned a real estate platform, property listings, search and filter systems, and agent dashboard.',
          desc_3:    '- Designed a case management system for a charity organization supporting divorced women, sensitive user context requiring clear, accessible flows.',
          desc_4:    '- Delivered multiple landing page designs for various clients.'
        },
        gld: {
          company:   'SARL GLD',
          role:      'UX Designer',
          city:      'Tlemcen',
          country:   'Algeria',
          work_type: 'Remote',
          dates:     'July 2024',
          duration:  '1 mo',
          desc_0:    'Conducted a UX audit for the e-commerce platform of a B2B wholesale company (cosmetics and detergents sector).',
          desc_1:    '- Identified usability issues across key user flows and worked directly with the developer to implement improvements on the spot'
        },
        atqin: {
          company:   'Atqin',
          role:      'Co-Founder & Product Design Lead',
          city:      'Tlemcen',
          country:   'Algeria',
          work_type: 'Remote',
          badge:     'Volunteer',
          dates:     '2023 - Present',
          duration:  '3 yrs 2 mos',
          desc_0:    '- Co-founded a volunteer community of tech professionals, designed a system for a nonprofit Quran clubs management platform and a website for a historic cultural establishment.',
          desc_1:    '- Coordinating team projects and managing community growth.'
        }
      },
      skills: {
        label:    'CAPABILITIES',
        title:    'My Skills',
        subtitle: 'A comprehensive skill set developed through years of hands-on experience.',
        product: {
          title: 'Product Skills',
          t1: 'Product Thinking',
          t2: 'Agile / Scrum',
          t3: 'Design Thinking Framework',
          t4: 'Stakeholder Communication',
          t5: 'Design Critique & Feedback'
        },
        ux: {
          title: 'UX Skills',
          t1: 'User Research',
          t2: 'Usability Testing',
          t3: 'Wireframing & Prototyping',
          t4: 'User Flows',
          t5: 'Information Architecture',
          t6: 'Competitive Analysis'
        },
        ui: {
          title: 'UI Skills',
          t1: 'Visual Design',
          t2: 'Design Systems',
          t3: 'Mobile App Design',
          t4: 'Responsive / Web Design',
          t5: 'Typography',
          t6: 'Color Theory'
        },
        tools: {
          title: 'Design Tools'
        },
        technical: {
          title: 'Technical',
          t1: 'HTML & CSS · Basics',
          t2: 'Web & Mobile Development · Basic Understanding'
        },
        collab: {
          title: 'Collaboration Tools'
        },
        soft: {
          title: 'Soft Skills',
          t1: 'Problem Solving',
          t2: 'Cross-functional Collaboration',
          t3: 'Self-management / Remote Work'
        },
        languages: {
          title: 'Languages',
          t1: 'English · Professional',
          t2: 'Arabic · Native',
          t3: 'Français · Professionnel'
        }
      },
      footer: {
        badge:            'Available for new projects',
        heading:          "Let's build something great",
        subtitle:         "Have an idea or a project in mind? I'd love to hear about it, send a message or reach out directly below.",
        watermark:        'NADIR',
        form_title:       'Send a Message',
        form_name:        'Name',
        form_email:       'Email',
        form_message:     'Message',
        form_send:        'Send Message',
        form_sending:     'Sending…',
        form_sent:        'Message sent!',
        form_error:       'Something went wrong, please try again, or email me directly.',
        contacts_title:   'Direct Contacts',
        contact_email:    'Email',
        contact_linkedin: 'LinkedIn',
        contact_whatsapp: 'WhatsApp',
        contact_instagram:'Instagram',
        copy_label:       'Copy email address',
        cv_label:         'Résumé / CV',
        cv_value:         'Preview & download (PDF)',
        cv_title:         'Curriculum Vitae',
        cv_sub:           'Nadir Mostefaoui · Product Designer',
        cv_download:      'Download PDF',
        cv_open:          'Open in new tab',
        cv_close:         'Close',
        copy_done:        'Copied!',
        copyright:        'Nadir Mostefaoui. All rights reserved.'
      },
      cs: {
        ui: { enlarge: "Enlarge", enlarge_aria: "Enlarge image", copy: "Copy hex", copied: "Copied!", close: "Close" }, hero: { eyebrow: "Case Study 01 · Design System", title: "Iksir Design System", sub: "A token-first design foundation (consistent, accessible, and trilingual), that Datamaster's web and mobile products build on.", badge: "Client work, specifics generalized, no confidential data shown", role_k: "Role", role_v: "Product Designer, led the project", team_k: "Team", team_v: "2 designers", timeline_k: "Timeline", timeline_v: "Feb – Jun 2026 · V1", platforms_k: "Platforms", platforms_v: "Web · iOS · Android", cta: "Let's build something like this", status: "V1 shipped · web + mobile · in active development" },
        stats: { variables: "design variables", components: "components", patterns: "UX patterns", colours: "colour tokens", languages: "languages (LTR + RTL)", modes: "modes (light + dark)" },
        problem: { eyebrow: "The problem", title: "A growing product suite with no shared language", lead: "Datamaster builds a modular ERP and a family of mobile apps under its Iksir product brand. As the suite grew, every screen was solving the same UI problems from scratch.", c1t: "Inconsistency slowed everything", c1p: "Colours, spacing, buttons, and form validation were rebuilt per screen and behaved differently across the products, costing development time and creating avoidable UI bugs.", c2t: "Two stacks, no lock-in", c2p: "The web is moving from Ant Design to Shadcn, with Flutter on mobile. The system had to feed them all the same decisions through tokens, while staying library-agnostic, so the team keeps the freedom to build beyond any single framework.", c3t: "Built for three languages", c3p: "The products are expanding to French, English, and Arabic (the task app first), so true right-to-left support and dual-script typography had to live in the foundation from the start, not be bolted on later." },
        role: { eyebrow: "My role", title: "A two-person team: I set the direction", lead: "We were two product designers. I led the project end to end: the strategy, the client relationship, and every foundational decision the system is built on. This case study is my side of that work.", mine_tag: "Led by me", mine1: "Strategy, discovery, and the stakeholder relationship with the client", mine2: "The full design-token strategy and three-layer architecture", mine3: "The trilingual & right-to-left (LTR/RTL) foundation", mine4: "The accessibility framework, baked into the tokens", mine5: "The entire mobile layer, platform rules and mobile components", mine6: "All documentation, guides, and the governance model", mine7: "Structuring the project and shipping V1, and the rollout strategy now", partner_h: "My design partner", partner1: "Audit of the existing web product", partner2: "Figma production of the web/desktop components", partner3: "Building the documentation website", partner4: "The later polished visual pass on the public library", partner_note: "The full team story lives in a separate studio case study, this page focuses on the decisions and craft I owned." },
        process: { eyebrow: "The process", title: "From audit to a shipped V1", lead: "I structured the work into phases, though in practice they overlapped and looped back as we learned, not a straight line. Each one still closed with a decision the next could build on.", p1_label: "Phase", p1_title: "Audit & alignment", p1_body: "I ran stakeholder discovery to understand the business, then wrote the vision and success criteria. I audited the mobile task app and found it ran on a completely standalone, hard-coded system, disconnected from any shared foundation.", p1_call: "<b>My call →</b> reframe those hundreds of validated mobile screens as the blueprint for the system's mobile layer, instead of treating them as a problem to clean up.", p2_label: "Phase", p2_title: "Foundations", p2_body: "I defined the token architecture (a strict naming convention (category · property · concept · state) sitting on a three-layer chain of primitives → semantics → components), so developers would never hard-code a value again. Alongside it I authored the trilingual/RTL architecture (logical properties, dual-script type, icon-mirroring rules) and an accessibility framework expressed directly as tokens.", p2_call: "<b>The decision that mattered →</b> make light/dark and LTR/RTL properties of the tokens themselves, so a single source of truth adapts automatically rather than being maintained twice.", p3_label: "Phase", p3_title: "Components, mobile layer & documentation", p3_body: "As the library scaled to 24 components and 5 patterns, I designed the entire mobile layer (platform rules and the mobile-native components (bottom sheets, tab bars, numeric keypad, scanner overlay, task cards)), in both Figma and the documentation site. Then I structured the project and shipped V1.", p3_call: "<b>The principle I held →</b> treat the documentation as a product in its own right, the single spec both designers and developers work from.", loop: "<b>Not a straight line, </b> the mobile layer is the clearest example. What Phase 1 flagged as a hard-coded, disconnected task app became, by Phase 3, the system's mobile component library, through several passes, not one. I designed the layer, my design partner reviewed each round and pushed it further, every loop tightened the components until they held up as a system." },
        system: { eyebrow: "The system", title: "Three layers, one source of truth", lead: "Each layer consumes only the one below it. Skip a layer and you break the single-source-of-truth guarantee, so components never touch raw values.", delivers: "<b>What that buys, </b> change a decision once and every product inherits it: one source of truth across two engineering stacks, light/dark and RTL resolved automatically, and WCAG AA enforced at the token level.", l1_tag: "Layer 01 · Primitives", l1_title: "Raw values, named by value", l1_body: "Hex codes, pixel sizes, durations. The only place a literal value is ever written.", l2_tag: "Layer 02 · Semantic tokens", l2_title: "Named by intent: the only layer components use", l2_body: "Maps primitives to meaning, and carries both light/dark and LTR/RTL values automatically.", l3_tag: "Layer 03 · Components & patterns", l3_title: "Consume semantics only", l3_body: "Every component is built from semantic tokens (never a hard-coded value), so it adapts to any mode or language for free.", cap1: "<b>Documentation platform</b>: overview, live stats, and the three-layer architecture.", cap2: "<b>Six principles</b>: the constraints behind every token, component, and pattern." },
        found: { eyebrow: "Foundations", title: "Colour, type, space: all tokenised", lead: "191 colour tokens across brand, content, background, border, and status groups, each with a light and a dark value. Type pairs a Latin family with an Arabic one at matching optical weight.", cap_colour: "<b>Colour</b>: 191 semantic tokens across five groups, every one with a light and dark value.", cap_type: "<b>Type</b> · 9 roles in two scripts: Latin (Montserrat + Inter) and Arabic (Alexandria + Inter), with a +2&nbsp;px Arabic size bump.", tip: "Tip: click any swatch to copy its hex, the same tokens the products read from.", underneath: "Underneath: a 22-step spacing scale on a 4-pt grid, 8 semantic radius aliases, 4 elevation levels, and 86 Lucide icons at a 1.5 px stroke in three sizes, each with RTL mirroring rules." },
        lib: { eyebrow: "The library", title: "24 components: every state, documented", lead: "From Button (450 variants because every hierarchy × size × icon position × state is accounted for, not padding for its own sake), to the mobile-native pieces I designed for the task app. Each one is built and documented, ready to drop in.", core_label: "Core components", cap_button: "<b>Button</b>: 450 variants", cap_input: "<b>Input</b>: 336 variants", cap_card: "<b>Card</b>: 12 variants", cap_modal: "<b>Modal</b>: icon × size", mobile_label: "Mobile-native: the layer I designed", cap_task: "<b>Task Card</b>: 17 variants across priority, status, and subtasks", cap_tabnav: "<b>Bottom Tab Nav</b>: active pill + badges", cap_sheet: "<b>Bottom Sheet</b>: collapsed / half / full", patterns_label: "Patterns", cap_charts: "<b>Charts</b>: line, bar, donut, area, sparkline, mobile-first", cap_charttokens: "<b>Chart tokens</b>: palette drawn from primitives + usage rules", note: "<b>A note on what's shown:</b> Iksir is live client work under NDA, so I'm showing only a selection of the design system (a sample of its tokens, components, and patterns, not the full library), and none of the client's production screens or real data. What you see here is a curated slice that's safe to share, the complete system and the products it powers stay private." },
        a11y: { eyebrow: "Accessibility", title: "WCAG 2.1 AA, built into the foundation", lead: "Accessibility was one of the areas I owned. I didn't just document WCAG 2.1 AA, I turned it into tokens, reusable Figma checks (a contrast matrix and a 44×44 touch-target component), and a testing workflow the whole team designs and builds against.", i1_t: "Contrast as a contract", i1_p: "4.5:1 for text, 3:1 for large text and UI, verified across light and dark, with unsafe combinations corrected at the token level.", i2_t: "Never colour alone", i2_p: "ERP statuses always pair colour with an icon and a text label, so meaning survives colour-blindness and greyscale.", i3_t: "Touch & focus tokens", i3_p: "A 44×44 pt minimum touch target and a 2 px offset focus ring are tokenised, keyboard and mobile users are covered by default.", i4_t: "Trilingual screen readers", i4_p: "Dynamic <code>lang</code>/<code>dir</code>, logical reading order, and localised labels so assistive tech reads French, English, and Arabic correctly.", i5_t: "Testable, not just documented", i5_p: "I set up a checking workflow across every surface (contrast plugins in Figma, axe and Lighthouse on web, VoiceOver and TalkBack on mobile), so accessibility is verified at each handoff, not assumed.", i6_t: "Dual-script sizing", i6_p: "Arabic body text is bumped 1–2 px above the Latin baseline, with line-height tokens tuned so complex ligatures never clip in dense data tables." },
        status: { eyebrow: "Where it stands", title: "Shipped, and still evolving", s1_label: "Done", s1_t: "V1 released", s1_p: "Foundations, 24 components, 5 patterns, and the documentation platform, all live as the official V1.", s2_label: "Live & iterating", s2_t: "Adoption & polish", s2_p: "The library is in use and the team now designs and builds against it. My design partner led a polished public version of the site on top of the shared V1.", s3_label: "In progress", s3_t: "Integration strategy", s3_p: "I'm defining how the system rolls into the real products, and keeping governance open until it's fully stable." },
        gov: { eyebrow: "Governance", title: "Rules that keep it coherent as it grows", r1_t: "Always use semantic tokens", r1_p: "Components reference intent (brand/primary), never raw values, this is what makes the system maintainable and mode-switchable.", r2_t: "Respect the three-layer chain", r2_p: "Primitives → semantics → components. Never skip a layer, it breaks the single source of truth.", r3_t: "Light + dark, RTL + LTR, built in", r3_p: "Every semantic token carries both, no parallel colour sets, no manual mirroring.", r4_t: "The docs are the spec", r4_p: "Token references, states, and do/don't guidance are requirements, with a workflow that lets a non-coder publish updates safely." },
        reflect: { eyebrow: "Reflection", quote: "Leading a system means designing the <span>decisions</span>, not just the screens.", p1: "The hardest (and most rewarding), part wasn't drawing components. It was making choices that had to hold up across two engineering stacks, three languages, two colour modes, and a second designer's hands. Getting the architecture and the accessibility right early is what let the library scale without collapsing into exceptions.", p2: "It also reshaped how I work: treating documentation as a product, writing rules that other people can follow without me in the room, and staying accountable for a system long after its first release." },
        closing: { eyebrow: "Let's talk", title: "Have a system like this in mind?", lead: "I design systems, products, and the foundations under them. Tell me what you're building, and let's make it consistent, accessible, and fast to ship." },
        pager: { all: "Back to homepage", contact: "Get in touch" }, more: { eyebrow: "Keep exploring", title: "More case studies" },
        form: { ptype_label: "What can I help with?", pt_ds: "Design system", pt_web: "Web app / SaaS", pt_mobile: "Mobile app", pt_erp: "ERP / internal tool", pt_job: "Job opportunity", pt_other: "Something else" }
      },
      cs2: {
        hero: { eyebrow: "Case Study 02 · Retail Operations App", title: "Task Master", sub: "A task-management app for retail store teams, purchasing, inventory, stock corrections, and shelf operations turned into one clear, scannable workflow across mobile, tablet, and desktop.", role_k: "Role", role_v: "Product Designer, sole designer", client_k: "Client", client_v: "Datamaster Analytics · ERP, France", team_k: "Team", team_v: "BA · tech lead · 3 dev teams", platforms_k: "Platforms", platforms_v: "Mobile · Tablet · Desktop", cta: "Let's build something like this", status: "In use by retail teams · new modules in design" },
        stats: { faster: "faster task execution in usability tests", workflows: "operational workflows unified", screens: "screens designed", breakpoints: "breakpoints: mobile, tablet, desktop", components: "components in the supporting library", iterations: "major product iterations" },
        problem: { eyebrow: "The problem", title: "Store operations ran on spreadsheets and memory", lead: "Retail teams coordinate a store's daily operations (receiving purchases, counting inventory, correcting stock, relabelling shelves), on their feet, on shared devices, against the clock. The tooling didn't match that reality.", c1t: "Scattered tools, invisible progress", c1p: "Operations lived in manual spreadsheets and disconnected tools. Every store ran the same tasks its own way, and nobody could see the state of the work without asking someone.", c2t: "One task, many moving parts", c2p: "A single stock correction touches zones, articles, quantities, reasons, and validation. Switching between tools mid-task is where the errors crept in, and errors in stock data are expensive.", c3t: "The first version taught us", c3p: "The first-generation app (which I also designed), proved the concept but exposed hard lessons: inconsistent visuals, weak responsiveness, and screens that asked floor workers to read when they needed to act." },
        role: { eyebrow: "My role", title: "Sole designer, embedded in the operation", lead: "I was the only product designer on this product. I worked directly with the business analyst who owned the requirements, and with the engineers who shipped it, everything visual or interactive crossed my desk.", mine_tag: "Owned by me", mine1: "End-to-end UX and UI for all six workflows, on mobile, tablet, and desktop", mine2: "Translating functional documents into task flows, wireframes, and data hierarchies", mine3: "The unified task model the whole app is built on", mine4: "The design system, colour, type, spacing, icons, and the component library", mine5: "Dev-ready Figma specs and the continuous iteration loop with the developers", partner_h: "The team around me", partner1: "Business analyst, requirements, domain knowledge, end-user feedback", partner2: "Technical lead: feasibility and interaction logic", partner3: "Mobile, front-end & back-end developers, implementation partners", partner4: "Stakeholders: priorities and review cycles", partner_note: "Collaboration was direct and continuous, Figma versions, Teams calls, short review loops. No formal sprints, no waiting." },
        process: { eyebrow: "The process", title: "From the shop floor to the screen", lead: "The work moved in loops, not a line, but each pass had a centre of gravity: understand the operation, model it, then iterate it against reality.", p1_label: "Phase 1", p1_title: "Understand the operation", p1_body: "With the business analyst I ran visualization sessions that turned functional documents into task flows, wireframes, and data hierarchies, starting on paper. Before any UI, I needed to know what a worker actually holds, scans, counts, and confirms in each operation.", p1_call: "<b>My call →</b> design for the worker's context first (standing, one-handed, on a shared device, interrupted constantly), and let every layout decision follow from that.", p2_label: "Phase 2", p2_title: "One task model for six workflows", p2_body: "Purchasing, inventory, shelf labelling, stock correction, sales-floor replenishment, and ad-hoc tasks all behave differently on paper. I structured every one of them into the same three layers, a task list with filters, a task detail with its people and data, and an execution view with direct in-task actions. Learn the app once, and every operation feels familiar.", p2_call: "<b>The decision that mattered →</b> one model, not six mini-apps. It's what made the app scalable to new modules and instantly learnable for new staff.", p3_label: "Phase 3", p3_title: "Iterate against reality", p3_body: "Screens went to the developers and to usability tests with real supermarket users, and their feedback came straight back into Figma, clearer specs, tighter spacing, better data rendering. The redesign measured 50% faster task execution than the old flows, and shared testing sessions kept design and engineering honest with each other.", p3_call: "<b>The principle I held →</b> a spec is a conversation, not a handoff. Short direct loops with four developers beat any formal process we could have run.", loop: "<b>The loop in action, </b> after release, field reality pushed us further: floor workers wanted to drive whole operations from the barcode scanner. That became a dedicated scan-first variant of the task flows, 47 screens designed around the scanner as the primary input, not the keyboard.", lofi_label: "Where it started: paper and lo-fi", cap_lofi1: "<b>Paper first</b>: sketching the task screens before touching Figma.", cap_lofi2: "<b>Data hierarchy</b>: deciding what a worker reads first, second, and never.", cap_lofi3: "<b>Lo-fi wireframes</b>: structure and flow validated in grayscale before any styling." },
        ba: { eyebrow: "The redesign", title: "Same operation, a generation apart", lead: "The second iteration rebuilt every screen on the new foundation: a calmer surface, a stronger hierarchy, and task cards that surface priority, status, assignees, and article counts at a glance, so the list itself answers most questions.", before_label: "Before: first generation", cap_b1: "<b>Mobile, v1</b>: functional, but tags and metadata compete for attention and every card reads the same.", cap_b2: "<b>Desktop, v1</b>: a card grid that treated a supervisor's overview like a bigger phone.", after_label: "After: Task Master", cap_a1: "<b>Mobile, v2</b> · expandable task cards: priority, status, team, and article count readable in one pass, the task ID copyable in one tap.", cap_a2: "<b>Desktop, v2</b> · a supervisor's view proper: denser columns, global search and sort, creation and filtering one click away.", note: "<b>A note on what's shown:</b> this is live client work under NDA. Every screen here uses placeholder content (the repeated IDs and “999 articles” are intentional dummy data), and some flows are simplified. The real product and its data stay private." },
        model: { eyebrow: "The core idea", title: "List → Details → Execution", lead: "Every workflow (from a year-end inventory to a single shelf relabel), moves through the same three layers. The layers stay identical, only the data inside them changes.", l1_tag: "Layer 01 · List view", l1_title: "See the work, not the tool", l1_body: "All tasks in one place with search, filters, and sorting. Priority, status, team, and scale are readable without opening anything.", l2_tag: "Layer 02 · Task details", l2_title: "Everything the task knows", l2_body: "Who's responsible, current status, related documents and articles, the full context of one task, structured the same way in every workflow.", l3_tag: "Layer 03 · Execution view", l3_title: "Act without leaving the task", l3_body: "Direct in-task actions (count, correct, scan, validate), with the scanner as a first-class input. The task closes where the work happens.", cap1: "<b>List view</b>: expandable cards keep the overview scannable.", cap2: "<b>One entry point</b>: the six workflows and the scanner, one sheet away from anywhere.", cap3: "<b>Tablet</b>: the same model breathing in two columns, nothing to relearn between devices." },
        found: { eyebrow: "The foundation", title: "A design system grew out of the product", lead: "Six workflows on three breakpoints can't stay consistent by discipline alone. So alongside the app I built Datamaster's design system (colour, type, spacing, icons, and a full component library), and the second iteration of Task Master was assembled from it.", tip: "Tip: click any swatch to copy its hex, the brand's real palette, built around the logo's blue.", underneath: "Underneath: ten-step ramps for every colour role plus four support palettes, a Material-aligned type scale on Rubik with a handwritten accent face for annotations, an 8-px spacing rhythm, five responsive breakpoints, and an icon set redrawn from Streamline's Solar Linear style to match the brand, in five sizes, from 12 to 48 px.", cap_colour: "<b>Colour</b>: every role in ten steps, tested for contrast in data-dense screens.", cap_type: "<b>Type</b>: 15 styles from Display to Label on Rubik, scaled for long, data-heavy interfaces.", lib_label: "From the component library", cap_buttons: "<b>Buttons</b>: every hierarchy and state", cap_inputs: "<b>Inputs</b>: with validation states", cap_date: "<b>Date pickers</b>: calendars & ranges", cap_selection: "<b>Selection controls</b>: switch, radio, checkbox", cap_nav: "<b>Navigation</b>: sidebar, rail, and tab bar for the three breakpoints", cap_icons: "<b>Icons</b>: one visual voice for data-dense screens, S to XXL", inv_label: "In the library", note: "<b>Why it matters here, </b> the system is the quiet hero of the 50% result: consistent components made the redesign fast to assemble, easy for developers to reuse, and instantly familiar from screen to screen. It now serves as the visual reference for Datamaster's wider ERP modules." },
        impact: { eyebrow: "Results & impact", title: "What it changed", lead: "The redesign was validated where it counts (with real supermarket users doing real operations), and in the day-to-day speed of the team building it.", i1_t: "50% faster task execution", i1_p: "In usability tests with real supermarket users, the redesigned flows cut task time roughly in half, clearer hierarchy, fewer steps, and no tool-switching mid-task.", i2_t: "Fewer errors where they hurt", i2_p: "Stock corrections and order tracking (the two places where a mistake costs real money), saw reduced error rates once the flows guided the work step by step.", i3_t: "Developers shipped faster", i3_p: "Reusable components and dev-ready specs cut rework and kept implementation faithful to the design, the developers' own words, not mine.", i4_t: "The benchmark for the suite", i4_p: "Task Master became the reference for how Datamaster's future ERP modules should look, feel, and be built, the app that proved the foundation." },
        status: { eyebrow: "Where it stands", title: "Shipped, in use, still growing", s1_label: "Done", s1_t: "Redesign shipped", s1_p: "The second-generation app is what retail teams work with today, across mobile, tablet, and desktop.", s2_label: "Live & iterating", s2_t: "New modules in design", s2_p: "Purchasing and inventory keep deepening, and the scan-first flows came out of this loop, the field keeps teaching us.", s3_label: "In progress", s3_t: "Multilingual rollout", s3_p: "French, English, and Arabic support is rolling out across Datamaster's products, starting with this app." },
        reflect: { eyebrow: "Reflection", quote: "The complexity lives in the operation. The interface's job is to <span>absorb it</span>, not pass it on.", p1: "The hardest part of this project wasn't drawing screens, it was compressing a messy, physical, interrupted operation into a model a tired worker can trust at 7 a.m. Getting the task model right early is what let six very different workflows ship as one coherent product, and what makes the next module cheaper than the last.", p2: "It also settled how I want to work with engineers: no ceremony, short loops, specs treated as conversations. And it taught me that a redesign is strongest when you designed the first version too, you're not guessing at what failed, you measured it." },
        closing: { eyebrow: "Let's talk", title: "Have an operation to untangle?", lead: "I design the interfaces behind heavy operations (ERP modules, internal tools, mobile-first workflows), and the foundations that keep them consistent. Tell me what your team is wrestling with." }
      },
      cs3: {
        hero: { eyebrow: "Case Study 03 · Enterprise Sales ERP", title: "B2B Sales ERP Module", sub: "The sales heart of an ERP suite, quotes, orders, preparation, delivery, and returns for professional clients, structured into one readable, data-dense workspace instead of a pile of fragmented tools.", role_k: "Role", role_v: "Product Designer · UI/UX", client_k: "Client", client_v: "Datamaster Analytics · ERP, France", team_k: "Team", team_v: "BA · tech lead · front & back-end devs", platform_k: "Platform", platform_v: "Desktop web · data-dense screens", cta: "Let's build something like this", status: "Structure validated · ready for visual refinement" },
        stats: { flows: "end-to-end sales flows, quote to return", screens: "core screens carrying the whole module", states: "frame states covering the edge cases", versions: "iteration versions with the team", modules: "ERP modules built on this layout logic", docs: "printable documents, screen to paper" },
        problem: { eyebrow: "The problem", title: "Professional sales lived in fragments", lead: "Managing B2B sales (clients, quotes, orders, invoices, deliveries), meant hopping between disconnected tools. Nobody had one place where the state of a sale was simply visible.", c1t: "Fragmented data, no visibility", c1p: "Client records, orders, invoices, and delivery states were scattered across several tools. Keeping a consistent picture of one sale required manual cross-checking, and trust in memory.", c2t: "Density that buried the signal", c2p: "Sales screens are inherently heavy: tables, filters, statuses, and relationships between entities. The metrics people actually needed were buried under repetitive information.", c3t: "No shared layout rhythm", c3p: "Existing screens lacked a unified structure, each one solved its own layout its own way. Every new screen made the system harder to read, not easier." },
        role: { eyebrow: "My role", title: "The designer between the rules and the screens", lead: "I owned the design of the module end-to-end: turning business rules and data models into flows, layouts, and screen structures the whole team could align on, and refine together as the build took shape.", mine_tag: "Owned by me", mine1: "The full UX and UI of the sales module, 4 flows, 8 core screens, 50 frame states", mine2: "Mapping functional requirements into visual flows and screen structures with the BA", mine3: "The three-zone layout system and the data hierarchy inside every table", mine4: "Surfacing business rules in the interface, validations, guardrails, and edge-case states", mine5: "Short review-and-revision cycles with the BA and developers, from v1 to v9.1", partner_h: "The team around me", partner1: "Business analyst, user research, business rules, and requirement documents", partner2: "Technical lead: data models and technical constraints", partner3: "Front-end & back-end developers, implementation partners in every cycle", partner_note: "Collaboration ran in short, direct loops, layout reviews with the BA, data-behaviour discussions with the developers, adjustments straight back into Figma." },
        process: { eyebrow: "How I worked", title: "Three moves, made in loops", lead: "This was never a tidy waterfall. Three moves (see the whole pipeline, structure before polish, and iterate with the team), ran alongside each other, and I looped back to each as the module took shape. They're less a sequence than the three things I kept doing.", p1_label: "Move", p1_title: "See the whole pipeline", p1_body: "With the business analyst I translated requirement documents and business rules into visual flows: how a quote becomes an order, how an order is prepared and delivered, how a return comes back. Four end-to-end flows emerged, and one pipeline that connects them.", p1_call: "<b>My call →</b> make the pipeline itself clickable, not just visible. A persistent stepper (Quote → Order → Preparation → Delivery → Invoice), lets you jump straight to any stage: click Invoice from the Delivery screen and you land in Finance &amp; Accounting, where invoicing actually lives. The sales journey never feels cut off.", p2_label: "Move", p2_title: "Structure before polish", p2_body: "I kept the screens deliberately at mid-fidelity: layout logic, structure, and readability over visual decoration. A limited set of brand colours (blue, gray, white), kept the screens familiar without pretending a design system existed where none did yet. Every hour went into hierarchy, contrast, and composition.", p2_call: "<b>The principle →</b> polish can't fix an unreadable table. If the structure doesn't work in gray and blue, it won't work in anything.", p3_label: "Move", p3_title: "Iterate with the whole team", p3_body: "Each layout ran through a three-step loop: the business analyst reviewed it against the business rules, I revised the design accordingly, and then the developers refined it against the data models and technical constraints. Nine versions later, the structure had survived contact with every rule and edge case the team could throw at it.", p3_call: "<b>What v9.1 means →</b> not indecision, validation. Every version is a full loop: BA review, design revision, then developer refinement, absorbed back into the structure.", note: "<b>Business rules, made visible, </b> the flows don't just display data, they defend it. A discount that pushes the margin below the authorized threshold stops the quote and demands explicit confirmation, incomplete documents and exceeded order limits get the same treatment. The interface carries the company's rules, not just its records." },
        layout: { eyebrow: "The core idea", title: "Three zones for every screen", lead: "High-volume data needs a stable stage. Every screen in the module (whatever the flow), is built on the same three-zone structure, so users always know where to look and where to act.", z1_tag: "Zone 01 · Left sidebar", z1_title: "Navigate the sales world", z1_body: "Compact, icon-driven navigation between the module's sections, always present, never competing with the data for attention.", z2_tag: "Zone 02 · Central workspace", z2_title: "Where the data lives", z2_body: "Dynamic tables and lists carrying the real volume, per-column sorting and filters, global filters, line actions, and pagination built for thousands of records.", z3_tag: "Zone 03 · Header", z3_title: "Context and quick actions", z3_body: "The document's identity, its state in the pipeline, and the actions that matter now (create, validate, send, print), one click from anywhere.", cap1: "<b>Quote tracking</b> · one table answers the daily question: where is every quote, and what needs my attention?", cap2: "<b>Order management</b>: preparation orders and delivery notes in one command centre, with save-PDF, email, and print on every line.", cap3: "<b>Returns</b> · same skeleton, different flow: a master list beside the detail, so processing a return never loses its context." },
        pipe: { eyebrow: "The flows", title: "Quote → Order → Preparation → Delivery → Returns", lead: "One sale, many hands: the commercial team drafts the quote, the warehouse prepares, logistics delivers, and sometimes goods come back. The module follows the document through every hand-over, and the stepper keeps everyone oriented.", quote_label: "Where it starts: building a quote", cap_create: "<b>Quote creation</b> · a long, dense form tamed by numbered sections: info, contact, products, delivery, payment conditions, and a running summary. Automatic discount rules apply themselves as lines are added.", cap_alert: "<b>The guardrail</b>: a discount that eats the margin stops the flow and demands a human decision. Quiet screens, loud exceptions.", order_label: "Through the warehouse: order to doorstep", cap_orders: "<b>Order tracking</b>: quotes that became orders, with their preparation state one glance away.", cap_prep: "<b>Preparation</b>: ordered vs. prepared vs. remaining, per article and per zone. The table is the checklist.", cap_delivery: "<b>Delivery</b>: merchandise, sender, recipient, and logistics on one screen, down to the recipient's signature.", docs_label: "Down to the paperwork", cap_doc1: "<b>Preparation order</b>: what the warehouse actually holds in hand.", cap_doc2: "<b>Delivery note</b>: travels with the goods, signed at the door.", cap_doc3: "<b>Return note</b>: the paper trail when goods come back.", docs_note: "The flow doesn't end at the screen, preparation orders, delivery notes, and return notes were designed as printable documents too, so the same information stays legible on paper in a warehouse aisle.", nda: "<b>A note on what's shown:</b> this is live client work under NDA. Every screen uses placeholder content (the repeated clients, dates, and amounts are intentional dummy data), and some flows are simplified. The real product and its data stay private." },
        impact: { eyebrow: "Results & impact", title: "What it delivered", lead: "The module's job was to make complex sales operations readable and buildable, and to leave a structure the rest of the ERP could stand on.", i1_t: "Complex data, readable at last", i1_p: "Large volumes of sales data organized into a clear, navigable hierarchy, users locate and interpret dense information without wading through it.", i2_t: "A validated structure, ready to build", i2_p: "The mid-fidelity prototype defines layout logic, user flow, and data hierarchy across all four flows, confronted with business rules and data models for nine versions, and ready for visual refinement.", i3_t: "Business rules in the interface", i3_p: "Margin guardrails, completeness checks, and order limits are part of the flows themselves, the design catches costly mistakes before they become documents.", i4_t: "The blueprint for the suite", i4_p: "The three-zone structure became the layout foundation for the ERP's other modules (Purchase, Finance, and Accounting), keeping the suite consistent at the system level." },
        status: { eyebrow: "Where it stands", title: "Validated, adopted, moving to hi-fi", s1_label: "Done", s1_t: "Structure validated", s1_p: "All four sales flows validated at mid-fidelity with the business analyst, technical lead, and developers, v9.1 is the version the team builds against.", s2_label: "Live & growing", s2_t: "The suite follows", s2_p: "The module's layout logic now carries the wider ERP, I went on to design the Purchase and Finance & Accounting modules on the same structure.", s3_label: "Next", s3_t: "Visual refinement", s3_p: "With the structure proven, the screens are ready for the high-fidelity pass, full visual polish applied on top of a layout that already works." },
        reflect: { eyebrow: "Reflection", quote: "At mid-fidelity, <span>structure</span> is the design. If the hierarchy doesn't work in gray and blue, no amount of polish will save it.", p1: "This project sharpened how I design data-heavy interfaces: readable hierarchy first, high contrast between content and actions, and compositions that stay calm under hundreds of rows. It also proved that consistency doesn't have to wait for a design system, a well-structured layout and a disciplined visual language carried four modules.", p2: "And it confirmed a way of working I trust: sit between the business analyst and the developers, treat their rules and constraints as design material, and iterate in short cycles until the structure survives everything the domain throws at it." },
        closing: { eyebrow: "Let's talk", title: "Drowning in data-dense screens?", lead: "I design the interfaces behind heavy operations (ERP modules, dashboards, internal tools), and the structures that keep complex data readable. Tell me what your team is wrestling with." }
      }
    },
    fr: {
      nav: {
        projects:   'Projets',
        experience: 'Expérience',
        skills:     'Compétences',
        insights:   'Articles',
        contact:    'Me Contacter',
        back_to_top: 'Retour en haut',
        theme_to_dark: 'Passer en mode sombre',
        theme_to_light: 'Passer en mode clair',
        dropdown_aria: 'Afficher le menu des projets',
        all_projects: 'Tous les projets'
      },
      hero: {
        greeting:      'Bonjour, je suis Nadir Mostefaoui',
        title:         'Designer\nProduit',
        bio:           'Je conçois des interfaces pour des solutions B2B SaaS, des modules ERP, des tableaux de bord de ventes, des applications mobiles et des plateformes d\'entreprise multi-rôles.',
        cta_primary:   'Discutons',
        cta_secondary: 'Voir mon travail',
        cta_cv:        'Voir le CV',
        scroll:        'Défiler',
        scroll_aria:   'Faire défiler pour explorer',
        stat2_num:     '20+',
        stat2_label:   'Projets\naccompagnés',
        stat3_num:     '03',
        stat3_label:   "Pays\nd'expérience"
      },
      work: {
        label:         'TRAVAUX SÉLECTIONNÉS',
        title:         'Études de Cas',
        subtitle:      'Un regard plus proche sur la façon dont je transforme des workflows complexes et riches en données en produits utilisables.',
        nda:           'Confidentialité: détails généralisés, aucune donnée confidentielle',
        cta:           'Voir l\'étude de cas',
        flow_problem:  'Problème',
        flow_approach: 'Approche',
        flow_outcome:  'Résultat',
        cs1: {
          hook:         'Système de Design',
          short:        'Système de Design',
          tag:          'ERP · Système de Design',
          title:        'Système de Design Datamaster',
          role:         'Designer Produit (UI/UX), designer unique',
          problem:      'Aucune cohérence entre les produits, visuels dépassés et mauvaise réactivité sur une suite ERP en pleine croissance.',
          approach:     'Construction d\'un système de design complet (palette, typographie, grille d\'espacement de 8px, jeu d\'icônes personnalisé et bibliothèque de composants évolutive), documenté pour le handoff développeurs.',
          outcome:      'Premier déploiement, dans l\'application de gestion des tâches, réduisant le temps d\'exécution des tâches de 50 % lors des tests d\'utilisabilité.',
          stat1_num: '50', stat1_suffix: '%',  stat1_label: 'plus rapide dès le premier déploiement',
          stat2_num: '8',  stat2_suffix: 'px', stat2_label: 'grille d\'espacement',
          tag1: 'Systèmes de Design', tag2: 'Bibliothèque de Composants', tag3: 'Handoff Dev'
        },
        cs2: {
          hook:         'Application d\'Opérations Retail',
          short:        'Task Master',
          tag:          'Opérations Retail · Mobile-First',
          title:        'Task Master · App d\'Opérations Retail',
          role:         'Designer Produit, designer unique',
          problem:      'Opérations en magasin (achats, inventaire, corrections de stock, balisage), éparpillées entre tableurs et outils déconnectés.',
          approach:     'Six workflows unifiés dans un même modèle de tâche (Liste → Détails → Exécution), avec le design system construit en dessous, itéré avec de vrais utilisateurs en supermarché sur mobile, tablette et desktop.',
          outcome:      '50 % d\'exécution des tâches plus rapide, moins d\'erreurs de correction de stock, et la référence visuelle de la suite ERP de Datamaster.',
          stat1_num: '50', stat1_suffix: '%', stat1_label: 'exécution des tâches plus rapide',
          stat2_num: '6',  stat2_suffix: '',  stat2_label: 'workflows unifiés',
          stat3_num: '390', stat3_suffix: '+', stat3_label: 'écrans, 3 breakpoints',
          tag1: 'Mobile-First', tag2: 'Parcours Utilisateur', tag3: 'Tests d\'Utilisabilité'
        },
        cs3: {
          hook:         'Module ERP Ventes B2B',
          short:        'ERP Ventes',
          tag:          'ERP · Opérations Commerciales',
          title:        'Module ERP Ventes B2B',
          role:         'Designer Produit (UI/UX)',
          problem:      'Données clients, commandes et factures fragmentées entre plusieurs outils, écrans denses, faible lisibilité.',
          approach:     'Mise en page à trois zones en moyenne fidélité (navigation, tableaux et actions rapides), priorisant la logique sur la finition à travers 4 parcours de vente de bout en bout.',
          outcome:      'Une hiérarchie de données claire sur tout le parcours devis-à-retour, et la base de mise en page pour 4 autres modules ERP.',
          stat1_num: '8',   stat1_suffix: '', stat1_label: 'écrans principaux',
          stat2_num: '50',  stat2_suffix: '', stat2_label: 'états d\'écran',
          stat3_num: '9.1', stat3_suffix: '', stat3_label: 'version atteinte',
          tag1: 'Visualisation de Données', tag2: 'UX Entreprise', tag3: 'Prototypage'
        },
        cs4: {
          hook:         'Plateforme eLearning',
          short:        'eLearning',
          tag:          'eLearning · Plateforme Multi-Rôles',
          title:        'Plateforme eLearning',
          role:         'Designer Produit (UI/UX)',
          problem:      'Les enseignants hébergeaient leurs cours sur YouTube, sans aucun contrôle sur les cours, les élèves ou les statistiques.',
          approach:     'Processus de Design Thinking mené sur 3 rôles (Enseignant, Admin, Super Admin), avec permissions par rôle et chapitres → leçons → examens modulaires.',
          outcome:      'Les enseignants gèrent désormais entièrement leurs cours sans plateforme externe, un écosystème centralisé prêt à évoluer.',
          stat1_num: '3', stat1_suffix: '', stat1_label: 'rôles utilisateurs conçus',
          stat2_num: '3', stat2_suffix: '', stat2_label: 'tableaux de bord livrés',
          tag1: 'Design Thinking', tag2: 'UX par Rôle', tag3: 'UX Arabe'
        },
        cs5: {
          hook:         'Système de Design',
          short:        'Système de Design',
          tag:          'ERP · Système de Design',
          title:        'Système de Design Iksir',
          role:         'Designer Produit, pilote du projet (équipe de 2)',
          problem:      'Une suite ERP et mobile en croissance sans langage d\'UI commun, composants incohérents, développement lent, et aucune fondation d\'accessibilité ou trilingue.',
          approach:     'Pilotage d\'un système de design orienté tokens (architecture de tokens à trois couches, accessibilité intégrée, fondation trilingue (LTR/RTL) et toute la couche mobile), documenté pour le handoff développeurs.',
          outcome:      'V1 livrée, et l\'équipe conçoit et développe désormais en s\'appuyant dessus : une source unique de vérité sur le web et le mobile, avec le clair/sombre et le RTL gérés automatiquement.',
          stat1_num: '1033', stat1_suffix: '', stat1_label: 'variables de design',
          stat2_num: '24', stat2_suffix: '', stat2_label: 'composants livrés',
          tag1: 'Systèmes de Design', tag2: 'Accessibilité', tag3: 'Design Tokens'
        }
      },
      experience: {
        label:    'PARCOURS PROFESSIONNEL',
        title:    'Mon Expérience',
        subtitle: 'Au fil des années, j\'ai eu le privilège de travailler avec des équipes et des clients formidables.',
        tag_pd:   'Design Produit',
        tag_ds:   'Systèmes de Design',
        tag_lead: 'Leadership',
        tag_ux:   'Recherche UX',
        nawat: {
          company:   'Nawat Studio',
          role:      'Designer Produit',
          city:      'Tlemcen',
          country:   'Algérie',
          work_type: 'À distance',
          dates:     'Janv. 2026 - Présent',
          duration:  '7 mois',
          desc_0:    '- Datamaster Analytics est le client principal de Nawat Studio, mon rôle simultané chez Datamaster (ci-dessous) correspond donc au même travail, réalisé via le studio.',
          desc_1:    '- Direction du design produit pour des clients B2B SaaS et logiciels d\'entreprise',
          desc_2:    '- Encadrement d\'un designer produit, révision des livrables et garantie de la qualité du design.',
          desc_3:    '- Livraison d\'interfaces ERP, de systèmes de design et de restructuration de l\'architecture de l\'information.'
        },
        dma: {
          company:   'Datamaster Analytics',
          city:      'Bezons, Île-de-France',
          country:   'France',
          work_type: 'À distance',
          dates:     'Sept. 2024 - Présent',
          duration:  '1 an 11 mois',
          role_a:    'Designer Produit',
          dates_a:   'Déc. 2024 - Présent',
          desc_a0:   'Seul designer produit pour une plateforme ERP en pleine croissance, responsable de l\'ensemble du périmètre design sur plusieurs modules métiers et d\'un système de design complet post-rebranding.',
          desc_a1:   '- Conception de cinq modules ERP de bout en bout : Ventes B2B, Achats, PDV, Finance et Comptabilité, chacun gérant des données denses sur des workflows multi-rôles complexes',
          desc_a2:   '- Construction d\'une bibliothèque de design complète post-rebranding, système de composants Figma et un site dédié rendant le système de design accessible aux non-designers',
          desc_a3:   '- Direction d\'un projet d\'architecture de l\'information pour restructurer et unifier tous les produits existants avant une refonte complète de la plateforme',
          desc_a4:   '- Collaboration quotidienne avec les analystes métier, les responsables techniques et les développeurs front-end et back-end pour livrer des fichiers Figma prêts au développement',
          role_b:    'Designer UI/UX',
          dates_b:   'Sept. 2024 - Nov. 2024',
          desc_b0:   'Mission freelance initiale axée sur le produit mobile de l\'entreprise.',
          desc_b1:   '- Conception d\'une application de gestion des tâches mobile-first pour les équipes d\'entrepôt, design complet de bout en bout sur 2 itérations tout au long du cycle de projet'
        },
        five: {
          company:   'Five Angles',
          role:      'Designer UI/UX',
          country:   'Dubaï',
          city:      'Émirats Arabes Unis',
          work_type: 'À distance',
          dates:     'Mars 2024 - Déc. 2024',
          duration:  '10 mois',
          desc_0a:   'Travail avec une ',
          desc_0b:   'agence basée à Dubaï',
          desc_0c:   ' sur des projets clients dans plusieurs secteurs.',
          desc_1:    '- Conception des tableaux de bord Super Admin, Admin et Enseignant d\'une plateforme e-learning multi-rôles, gestion des cours, flux de création de contenu et suivi de la progression des élèves.',
          desc_2:    '- Refonte d\'une plateforme immobilière, annonces de biens, systèmes de recherche et de filtres, et tableau de bord agent.',
          desc_3:    '- Conception d\'un système de gestion de dossiers pour une organisation caritative soutenant les femmes divorcées, contexte utilisateur sensible nécessitant des parcours clairs et accessibles.',
          desc_4:    '- Livraison de plusieurs designs de pages d\'atterrissage pour divers clients.'
        },
        gld: {
          company:   'SARL GLD',
          role:      'Designer UX',
          city:      'Tlemcen',
          country:   'Algérie',
          work_type: 'À distance',
          dates:     'Juillet 2024',
          duration:  '1 mois',
          desc_0:    'Réalisation d\'un audit UX pour la plateforme e-commerce d\'une entreprise de gros B2B (secteur cosmétiques et détergents).',
          desc_1:    '- Identification des problèmes d\'utilisabilité sur les parcours clés et collaboration directe avec le développeur pour mettre en œuvre des améliorations sur le moment'
        },
        atqin: {
          company:   'Atqin',
          role:      'Co-Fondateur & Lead Design Produit',
          city:      'Tlemcen',
          country:   'Algérie',
          work_type: 'À distance',
          badge:     'Bénévole',
          dates:     '2023 - Présent',
          duration:  '3 ans 2 mois',
          desc_0:    '- Co-fondation d\'une communauté bénévole de professionnels tech, conception d\'un système pour une plateforme de gestion de clubs Coran à but non lucratif et d\'un site pour un établissement culturel historique.',
          desc_1:    '- Coordination des projets d\'équipe et gestion de la croissance de la communauté.'
        }
      },
      skills: {
        label:    'COMPÉTENCES',
        title:    'Mes Compétences',
        subtitle: 'Un ensemble de compétences complet, développé au fil d\'années d\'expérience pratique.',
        product: {
          title: 'Compétences Produit',
          t1: 'Product Thinking',
          t2: 'Agile / Scrum',
          t3: 'Design Thinking Framework',
          t4: 'Communication avec les Parties Prenantes',
          t5: 'Critique et Retour sur le Design'
        },
        ux: {
          title: 'Compétences UX',
          t1: 'Recherche Utilisateur',
          t2: 'Tests d\'Utilisabilité',
          t3: 'Wireframing et Prototypage',
          t4: 'Parcours Utilisateur',
          t5: 'Architecture de l\'Information',
          t6: 'Analyse Concurrentielle'
        },
        ui: {
          title: 'Compétences UI',
          t1: 'Design Visuel',
          t2: 'Systèmes de Design',
          t3: 'Design d\'Application Mobile',
          t4: 'Design Web / Responsive',
          t5: 'Typographie',
          t6: 'Théorie des Couleurs'
        },
        tools: {
          title: 'Outils de Design'
        },
        technical: {
          title: 'Technique',
          t1: 'HTML & CSS · Notions de Base',
          t2: 'Développement Web & Mobile · Compréhension de Base'
        },
        collab: {
          title: 'Outils de Collaboration'
        },
        soft: {
          title: 'Savoir-être',
          t1: 'Résolution de Problèmes',
          t2: 'Collaboration Transversale',
          t3: 'Autonomie / Télétravail'
        },
        languages: {
          title: 'Langues',
          t1: 'Anglais · Professionnel',
          t2: 'Arabe · Langue Maternelle',
          t3: 'Français · Professionnel'
        }
      },
      footer: {
        badge:            'Disponible pour de nouveaux projets',
        heading:          'Créons quelque chose de formidable',
        subtitle:         "Un projet ou une idée en tête ? J'aimerais en discuter, envoyez un message ou contactez-moi directement ci-dessous.",
        watermark:        'NADIR',
        form_title:       'Envoyer un message',
        form_name:        'Nom',
        form_email:       'Email',
        form_message:     'Message',
        form_send:        'Envoyer le message',
        form_sending:     'Envoi en cours…',
        form_sent:        'Message envoyé !',
        form_error:       "Une erreur s'est produite, veuillez réessayer, ou m'écrire directement par email.",
        contacts_title:   'Contacts Directs',
        contact_email:    'Email',
        contact_linkedin: 'LinkedIn',
        contact_whatsapp: 'WhatsApp',
        contact_instagram:'Instagram',
        copy_label:       "Copier l'adresse email",
        cv_label:         'CV',
        cv_value:         'Aperçu et téléchargement (PDF)',
        cv_title:         'Curriculum Vitae',
        cv_sub:           'Nadir Mostefaoui · Designer Produit',
        cv_download:      'Télécharger le PDF',
        cv_open:          'Ouvrir dans un onglet',
        cv_close:         'Fermer',
        copy_done:        'Copié !',
        copyright:        'Nadir Mostefaoui. Tous droits réservés.'
      },
      cs: {
        ui: { enlarge: "Agrandir", enlarge_aria: "Agrandir l'image", copy: "Copier le code", copied: "Copié !", close: "Fermer" }, hero: { eyebrow: "Étude de cas 01 · Design System", title: "Iksir Design System", sub: "Une base de design orientée tokens (cohérente, accessible et trilingue), sur laquelle reposent les produits web et mobiles de Datamaster.", badge: "Travail client, informations généralisées, aucune donnée confidentielle affichée", role_k: "Rôle", role_v: "Designer Produit, pilote du projet", team_k: "Équipe", team_v: "2 designers", timeline_k: "Période", timeline_v: "Fév. – Juin 2026 · V1", platforms_k: "Plateformes", platforms_v: "Web · iOS · Android", cta: "Lançons un projet comme celui-ci", status: "V1 livrée · web + mobile · en développement actif" },
        stats: { variables: "variables de design", components: "composants", patterns: "patterns UX", colours: "tokens de couleur", languages: "langues (LTR + RTL)", modes: "modes (clair + sombre)" },
        problem: { eyebrow: "Le problème", title: "Une suite de produits en croissance sans langage commun", lead: "Datamaster développe un ERP modulaire et une famille d'applications mobiles sous sa marque produit Iksir. À mesure que la suite grandissait, chaque écran résolvait les mêmes problèmes d'interface depuis zéro.", c1t: "L'incohérence ralentissait tout", c1p: "Couleurs, espacements, boutons et validation de formulaires étaient reconstruits écran par écran et se comportaient différemment d'un produit à l'autre, coûtant du temps de développement et générant des bugs d'interface évitables.", c2t: "Deux stacks, aucun verrouillage", c2p: "Le web migre d'Ant Design vers Shadcn, avec Flutter sur mobile. Le système devait leur transmettre à tous les mêmes décisions via les tokens, tout en restant indépendant des bibliothèques, pour que l'équipe garde la liberté de construire au-delà de n'importe quel framework.", c3t: "Conçu pour trois langues", c3p: "Les produits s'étendent au français, à l'anglais et à l'arabe (l'application de tâches en premier), donc un vrai support de droite à gauche et une typographie bi-script devaient vivre dans la base dès le départ, pas être ajoutés après coup." },
        role: { eyebrow: "Mon rôle", title: "Une équipe de deux: j'ai donné la direction", lead: "Nous étions deux designers produit. J'ai piloté le projet de bout en bout : la stratégie, la relation client et chaque décision fondatrice sur laquelle le système repose. Cette étude de cas présente ma part de ce travail.", mine_tag: "Piloté par moi", mine1: "Stratégie, découverte et relation avec les parties prenantes", mine2: "Toute la stratégie de design tokens et l'architecture à trois couches", mine3: "La base trilingue et de droite à gauche (LTR/RTL)", mine4: "Le cadre d'accessibilité, intégré aux tokens", mine5: "Toute la couche mobile, règles de plateforme et composants mobiles", mine6: "Toute la documentation, les guides et le modèle de gouvernance", mine7: "La structuration du projet et la livraison de la V1, et la stratégie de déploiement en cours", partner_h: "Mon binôme designer", partner1: "Audit du produit web existant", partner2: "Production Figma des composants web/desktop", partner3: "Construction du site de documentation", partner4: "La passe visuelle soignée ultérieure sur la bibliothèque publique", partner_note: "L'histoire complète de l'équipe vit dans une étude de cas séparée, au nom du studio, cette page se concentre sur les décisions et le travail que j'ai menés." },
        process: { eyebrow: "Le processus", title: "De l'audit à une V1 livrée", lead: "J'ai structuré le travail en phases, même si, en pratique, elles se chevauchaient et revenaient en arrière au fil des apprentissages, pas en ligne droite. Chacune se terminait néanmoins par une décision sur laquelle la suivante pouvait s'appuyer.", p1_label: "Phase", p1_title: "Audit et alignement", p1_body: "J'ai mené la découverte auprès des parties prenantes pour comprendre l'entreprise, puis rédigé la vision et les critères de réussite. J'ai audité l'application de tâches mobile et découvert qu'elle reposait sur un système totalement autonome, aux valeurs codées en dur, déconnecté de toute base partagée.", p1_call: "<b>Mon choix →</b> reconsidérer ces centaines d'écrans mobiles validés comme le plan directeur de la couche mobile du système, plutôt que comme un problème à nettoyer.", p2_label: "Phase", p2_title: "Fondations", p2_body: "J'ai défini l'architecture des tokens (une convention de nommage stricte (catégorie · propriété · concept · état) posée sur une chaîne à trois couches primitives → sémantiques → composants), pour que les développeurs ne codent plus jamais une valeur en dur. En parallèle, j'ai rédigé l'architecture trilingue/RTL (propriétés logiques, typographie bi-script, règles de miroir des icônes) et un cadre d'accessibilité exprimé directement sous forme de tokens.", p2_call: "<b>La décision qui comptait →</b> faire du clair/sombre et du LTR/RTL des propriétés des tokens eux-mêmes, pour qu'une source unique de vérité s'adapte automatiquement au lieu d'être maintenue en double.", p3_label: "Phase", p3_title: "Composants, couche mobile et documentation", p3_body: "À mesure que la bibliothèque atteignait 24 composants et 5 patterns, j'ai conçu toute la couche mobile (règles de plateforme et composants natifs mobiles (bottom sheets, barres d'onglets, pavé numérique, overlay de scanner, cartes de tâches)), à la fois dans Figma et sur le site de documentation. Puis j'ai structuré le projet et livré la V1.", p3_call: "<b>Le principe que j'ai tenu →</b> traiter la documentation comme un produit à part entière, la spécification unique sur laquelle designers et développeurs travaillent.", loop: "<b>Pas une ligne droite, </b> la couche mobile en est l'exemple le plus clair. Ce que la phase 1 a signalé comme une application de tâches autonome et codée en dur est devenu, en phase 3, la bibliothèque de composants mobiles du système, au fil de plusieurs itérations, pas d'une seule. J'ai conçu la couche, mon binôme designer a revu chaque passage et l'a poussé plus loin, et chaque boucle a affiné les composants jusqu'à ce qu'ils tiennent en tant que système." },
        system: { eyebrow: "Le système", title: "Trois couches, une source unique de vérité", lead: "Chaque couche ne consomme que celle du dessous. Sautez une couche et vous brisez la garantie de source unique, les composants ne touchent donc jamais aux valeurs brutes.", delivers: "<b>Ce que cela apporte, </b> changez une décision une fois et chaque produit en hérite : une source unique de vérité pour deux stacks d'ingénierie, le clair/sombre et le RTL résolus automatiquement, et le WCAG AA appliqué au niveau des tokens.", l1_tag: "Couche 01 · Primitives", l1_title: "Valeurs brutes, nommées par valeur", l1_body: "Codes hexadécimaux, tailles en pixels, durées. Le seul endroit où une valeur littérale est écrite.", l2_tag: "Couche 02 · Tokens sémantiques", l2_title: "Nommés par intention, la seule couche que les composants utilisent", l2_body: "Fait correspondre les primitives à un sens et porte automatiquement les valeurs clair/sombre et LTR/RTL.", l3_tag: "Couche 03 · Composants et patterns", l3_title: "Ne consomment que le sémantique", l3_body: "Chaque composant est construit à partir de tokens sémantiques (jamais une valeur codée en dur), il s'adapte donc gratuitement à tout mode ou toute langue.", cap1: "<b>Plateforme de documentation</b>: vue d'ensemble, statistiques en direct et l'architecture à trois couches.", cap2: "<b>Six principes</b>: les contraintes derrière chaque token, composant et pattern." },
        found: { eyebrow: "Fondations", title: "Couleur, typographie, espace: tout en tokens", lead: "191 tokens de couleur répartis en groupes marque, contenu, arrière-plan, bordure et statut, chacun avec une valeur claire et une valeur sombre. La typographie associe une famille latine à une famille arabe de poids optique équivalent.", cap_colour: "<b>Couleur</b>: 191 tokens sémantiques répartis en cinq groupes, chacun avec une valeur claire et sombre.", cap_type: "<b>Typographie</b> · 9 rôles en deux écritures : latine (Montserrat + Inter) et arabe (Alexandria + Inter), avec un bonus de +2&nbsp;px pour l'arabe.", tip: "Astuce : cliquez sur un échantillon pour copier son code hex, les mêmes tokens que lisent les produits.", underneath: "En dessous : une échelle d'espacement à 22 pas sur une grille de 4 pt, 8 alias de rayon sémantiques, 4 niveaux d'élévation et 86 icônes Lucide au trait de 1,5 px en trois tailles, chacune avec ses règles de miroir RTL." },
        lib: { eyebrow: "La bibliothèque", title: "24 composants: chaque état, documenté", lead: "Du bouton (450 variantes parce que chaque hiérarchie × taille × position d'icône × état est couverte, non pour gonfler les chiffres), jusqu'aux pièces natives mobiles que j'ai conçues pour l'application de tâches. Chacune est construite et documentée, prête à l'emploi.", core_label: "Composants principaux", cap_button: "<b>Bouton</b>: 450 variantes", cap_input: "<b>Champ de saisie</b>: 336 variantes", cap_card: "<b>Carte</b>: 12 variantes", cap_modal: "<b>Fenêtre modale</b>: icône × taille", mobile_label: "Natifs mobiles: la couche que j'ai conçue", cap_task: "<b>Carte de tâche</b>: 17 variantes selon priorité, statut et sous-tâches", cap_tabnav: "<b>Barre d'onglets</b>: pastille active + badges", cap_sheet: "<b>Bottom sheet</b>: repliée / à mi-hauteur / plein écran", patterns_label: "Patterns", cap_charts: "<b>Graphiques</b>: courbe, barres, donut, aire, sparkline, pensés mobile d'abord", cap_charttokens: "<b>Tokens de graphiques</b>: palette issue des primitives + règles d'usage", note: "<b>Une note sur ce qui est montré :</b> Iksir est un travail client en cours sous NDA, je ne montre donc qu'une sélection du design system (un échantillon de ses tokens, composants et patterns, pas la bibliothèque complète), et aucun écran de production du client ni aucune donnée réelle. Ce que vous voyez ici est un extrait choisi, sûr à partager, le système complet et les produits qu'il alimente restent privés." },
        a11y: { eyebrow: "Accessibilité", title: "WCAG 2.1 AA, intégrée à la base", lead: "L'accessibilité faisait partie des domaines que je pilotais. Je n'ai pas seulement documenté le WCAG 2.1 AA, je l'ai transformé en tokens, en vérifications Figma réutilisables (une matrice de contraste et un composant de zone tactile 44×44) et en un flux de test avec lequel toute l'équipe conçoit et construit.", i1_t: "Le contraste comme contrat", i1_p: "4,5:1 pour le texte, 3:1 pour le grand texte et l'UI, vérifiés en clair comme en sombre, les combinaisons risquées étant corrigées au niveau des tokens.", i2_t: "Jamais la couleur seule", i2_p: "Les statuts ERP associent toujours la couleur à une icône et à un libellé, pour que le sens survive au daltonisme et aux niveaux de gris.", i3_t: "Tokens de zone tactile et de focus", i3_p: "Une zone tactile minimale de 44×44 pt et un anneau de focus décalé de 2 px sont en tokens, les utilisateurs au clavier et sur mobile sont couverts par défaut.", i4_t: "Lecteurs d'écran trilingues", i4_p: "Attributs <code>lang</code>/<code>dir</code> dynamiques, ordre de lecture logique et libellés localisés, pour que les technologies d'assistance lisent correctement le français, l'anglais et l'arabe.", i5_t: "Testable, pas seulement documentée", i5_p: "J'ai mis en place un flux de vérification sur chaque surface (plugins de contraste dans Figma, axe et Lighthouse sur le web, VoiceOver et TalkBack sur mobile), pour que l'accessibilité soit vérifiée à chaque handoff, jamais supposée.", i6_t: "Dimensionnement bi-script", i6_p: "Le texte courant arabe est augmenté de 1 à 2 px par rapport à la ligne de base latine, avec des tokens de hauteur de ligne ajustés pour que les ligatures complexes ne soient jamais coupées dans les tableaux de données denses." },
        status: { eyebrow: "Où en est le projet", title: "Livré, et en constante évolution", s1_label: "Fait", s1_t: "V1 publiée", s1_p: "Fondations, 24 composants, 5 patterns et la plateforme de documentation, tout est en ligne comme V1 officielle.", s2_label: "En ligne et en itération", s2_t: "Adoption et finitions", s2_p: "La bibliothèque est utilisée et l'équipe conçoit et développe désormais en s'appuyant dessus. Mon binôme designer a piloté une version publique soignée du site par-dessus la V1 partagée.", s3_label: "En cours", s3_t: "Stratégie d'intégration", s3_p: "Je définis comment le système s'intègre aux vrais produits, et je garde la gouvernance ouverte jusqu'à ce qu'il soit pleinement stable." },
        gov: { eyebrow: "Gouvernance", title: "Des règles qui la gardent cohérente en grandissant", r1_t: "Toujours utiliser des tokens sémantiques", r1_p: "Les composants référencent l'intention (brand/primary), jamais les valeurs brutes, c'est ce qui rend le système maintenable et compatible avec le changement de mode.", r2_t: "Respecter la chaîne à trois couches", r2_p: "Primitives → sémantiques → composants. Ne jamais sauter une couche, cela brise la source unique de vérité.", r3_t: "Clair + sombre, RTL + LTR, intégrés", r3_p: "Chaque token sémantique porte les deux, aucun jeu de couleurs parallèle, aucun miroir manuel.", r4_t: "La documentation, c'est la spécification", r4_p: "Références de tokens, états et recommandations à faire ou à éviter sont des exigences, avec un flux qui permet à une personne non technique de publier des mises à jour en toute sécurité." },
        reflect: { eyebrow: "Réflexion", quote: "Piloter un système, c'est concevoir les <span>décisions</span>, pas seulement les écrans.", p1: "Le plus difficile (et le plus gratifiant), n'était pas de dessiner des composants. C'était de faire des choix qui devaient tenir sur deux stacks techniques, trois langues, deux modes de couleur et entre les mains d'un second designer. Avoir posé tôt l'architecture et l'accessibilité, c'est ce qui a permis à la bibliothèque de grandir sans s'effondrer en exceptions.", p2: "Cela a aussi transformé ma façon de travailler : traiter la documentation comme un produit, écrire des règles que d'autres peuvent suivre sans moi dans la pièce, et rester responsable d'un système bien après sa première version." },
        closing: { eyebrow: "Discutons", title: "Un système comme celui-ci en tête ?", lead: "Je conçois des systèmes, des produits et les fondations en dessous. Dites-moi ce que vous construisez, et rendons-le cohérent, accessible et rapide à livrer." },
        pager: { all: "Retour à l'accueil", contact: "Me contacter" }, more: { eyebrow: "À explorer", title: "Plus d'études de cas" },
        form: { ptype_label: "Comment puis-je aider ?", pt_ds: "Design system", pt_web: "App web / SaaS", pt_mobile: "App mobile", pt_erp: "ERP / outil interne", pt_job: "Opportunité d'emploi", pt_other: "Autre chose" }
      },
      cs2: {
        hero: { eyebrow: "Étude de cas 02 · Application d'opérations retail", title: "Task Master", sub: "Une application de gestion des tâches pour les équipes de magasin, achats, inventaire, corrections de stock et opérations en rayon réunis en un flux clair, lisible d'un coup d'œil, sur mobile, tablette et desktop.", role_k: "Rôle", role_v: "Designer Produit, designer unique", client_k: "Client", client_v: "Datamaster Analytics · ERP, France", team_k: "Équipe", team_v: "BA · lead technique · 3 équipes dev", platforms_k: "Plateformes", platforms_v: "Mobile · Tablette · Desktop", cta: "Lançons un projet comme celui-ci", status: "Utilisée par les équipes retail · nouveaux modules en conception" },
        stats: { faster: "exécution des tâches plus rapide en tests d'utilisabilité", workflows: "workflows opérationnels unifiés", screens: "écrans conçus", breakpoints: "breakpoints: mobile, tablette, desktop", components: "composants dans la bibliothèque associée", iterations: "itérations majeures du produit" },
        problem: { eyebrow: "Le problème", title: "Des opérations gérées à coups de tableurs et de mémoire", lead: "Les équipes retail coordonnent les opérations quotidiennes d'un magasin (réception des achats, comptage d'inventaire, correction de stock, réétiquetage des rayons), debout, sur des appareils partagés, contre la montre. L'outillage ne collait pas à cette réalité.", c1t: "Des outils éparpillés, une progression invisible", c1p: "Les opérations vivaient dans des tableurs manuels et des outils déconnectés. Chaque magasin menait les mêmes tâches à sa façon, et personne ne voyait l'état du travail sans devoir demander à quelqu'un.", c2t: "Une tâche, beaucoup de pièces mobiles", c2p: "Une simple correction de stock touche des zones, des articles, des quantités, des motifs et une validation. Changer d'outil en pleine tâche, c'est là que les erreurs se glissaient, et les erreurs de stock coûtent cher.", c3t: "La première version nous a servi de leçon", c3p: "L'application de première génération (que j'avais moi aussi conçue), a validé le concept mais révélé de vraies leçons : des visuels incohérents, une responsivité fragile, et des écrans qui demandaient aux équipes de terrain de lire quand elles avaient besoin d'agir." },
        role: { eyebrow: "Mon rôle", title: "Designer unique, immergé dans l'opération", lead: "J'étais le seul designer produit sur cette application. Je travaillais en direct avec le business analyst qui portait les exigences, et avec les ingénieurs qui l'ont livré, tout ce qui est visuel ou interactif passait par moi.", mine_tag: "Sous ma responsabilité", mine1: "UX et UI de bout en bout pour les six workflows, sur mobile, tablette et desktop", mine2: "La traduction des documents fonctionnels en parcours de tâches, wireframes et hiérarchies de données", mine3: "Le modèle de tâche unifié sur lequel toute l'application repose", mine4: "Le design system, couleurs, typographie, espacements, icônes et la bibliothèque de composants", mine5: "Des specs Figma prêtes pour le développement et la boucle d'itération continue avec les développeurs", partner_h: "L'équipe autour de moi", partner1: "Business analyst, exigences, connaissance métier, retours des utilisateurs finaux", partner2: "Lead technique: faisabilité et logique d'interaction", partner3: "Développeurs mobile, front-end & back-end, partenaires d'implémentation", partner4: "Parties prenantes: priorités et cycles de revue", partner_note: "Une collaboration directe et continue, versions Figma, appels Teams, boucles de revue courtes. Pas de sprints formels, pas d'attente." },
        process: { eyebrow: "Le processus", title: "Du terrain du magasin à l'écran", lead: "Le travail avançait en boucles, pas en ligne droite, mais chaque passe avait un centre de gravité : comprendre l'opération, la modéliser, puis l'itérer face à la réalité.", p1_label: "Phase 1", p1_title: "Comprendre l'opération", p1_body: "Avec le business analyst, j'ai mené des sessions de visualisation qui ont transformé les documents fonctionnels en parcours de tâches, wireframes et hiérarchies de données, en commençant sur papier. Avant toute interface, je devais savoir ce qu'un employé tient, scanne, compte et confirme réellement dans chaque opération.", p1_call: "<b>Mon parti pris →</b> concevoir d'abord pour le contexte de l'employé (debout, une seule main libre, sur un appareil partagé, interrompu sans cesse), et laisser chaque décision de mise en page en découler.", p2_label: "Phase 2", p2_title: "Un seul modèle de tâche pour six workflows", p2_body: "Achat, inventaire, balisage, correction de stock, approvisionnement de la surface de vente et tâches diverses se comportent tous différemment sur le papier. Je les ai tous structurés dans les trois mêmes couches, une liste de tâches avec filtres, un détail de tâche avec ses personnes et ses données, et une vue d'exécution avec des actions directes dans la tâche. On apprend l'application une fois, et chaque opération devient familière.", p2_call: "<b>La décision qui a compté →</b> un seul modèle, pas six mini-applications. C'est ce qui a rendu l'application extensible à de nouveaux modules et immédiatement assimilable pour les nouveaux employés.", p3_label: "Phase 3", p3_title: "Itérer face à la réalité", p3_body: "Les écrans partaient chez les développeurs et en tests d'utilisabilité avec de vrais utilisateurs de supermarché, et leurs retours revenaient directement dans Figma, des specs plus claires, des espacements plus justes, un meilleur rendu des données. Les tests ont mesuré une exécution des tâches 50 % plus rapide qu'avec les anciens flux, et les sessions de test partagées ont gardé le design et l'ingénierie honnêtes l'un envers l'autre.", p3_call: "<b>Le principe que j'ai tenu →</b> une spec est une conversation, pas un handoff. Des boucles courtes et directes avec quatre développeurs valent mieux que n'importe quel processus formel.", loop: "<b>La boucle en action, </b> après la mise en production, la réalité du terrain nous a poussés plus loin : les équipes voulaient piloter des opérations entières depuis le scanner de codes-barres. C'est devenu une variante dédiée « scan d'abord » des flux de tâches, 47 écrans conçus autour du scanner comme entrée principale, pas du clavier.", lofi_label: "Là où tout a commencé: papier et lo-fi", cap_lofi1: "<b>Le papier d'abord</b>: esquisser les écrans de tâches avant de toucher Figma.", cap_lofi2: "<b>Hiérarchie des données</b>: décider ce qu'un employé lit en premier, en second, et jamais.", cap_lofi3: "<b>Wireframes lo-fi</b>: structure et flux validés en niveaux de gris avant tout habillage." },
        ba: { eyebrow: "La refonte", title: "La même opération, une génération d'écart", lead: "La seconde itération a reconstruit chaque écran sur la nouvelle fondation : une surface plus calme, une hiérarchie plus forte, et des cartes de tâches qui exposent priorité, statut, assignés et nombre d'articles d'un coup d'œil, pour que la liste réponde elle-même à la plupart des questions.", before_label: "Avant: première génération", cap_b1: "<b>Mobile, v1</b>: fonctionnel, mais tags et métadonnées se disputent l'attention et chaque carte se lit pareil.", cap_b2: "<b>Desktop, v1</b>: une grille de cartes qui traitait la vue du superviseur comme un téléphone en plus grand.", after_label: "Après: Task Master", cap_a1: "<b>Mobile, v2</b> · des cartes de tâches dépliables : priorité, statut, équipe et nombre d'articles lisibles en une passe, l'identifiant de la tâche copiable d'un geste.", cap_a2: "<b>Desktop, v2</b> · une vraie vue de supervision : des colonnes plus denses, recherche et tri globaux, création et filtres à un clic.", note: "<b>Note sur ce qui est montré :</b> il s'agit d'un travail client sous NDA. Chaque écran utilise un contenu fictif (les identifiants répétés et les « 999 articles » sont des données factices volontaires), et certains flux sont simplifiés. Le vrai produit et ses données restent privés." },
        model: { eyebrow: "L'idée centrale", title: "Liste → Détails → Exécution", lead: "Chaque workflow (d'un inventaire de fin d'année au réétiquetage d'un seul rayon), traverse les trois mêmes couches. Les couches restent identiques, seules les données à l'intérieur changent.", l1_tag: "Couche 01 · Vue liste", l1_title: "Voir le travail, pas l'outil", l1_body: "Toutes les tâches au même endroit, avec recherche, filtres et tri. Priorité, statut, équipe et ampleur se lisent sans rien ouvrir.", l2_tag: "Couche 02 · Détails de la tâche", l2_title: "Tout ce que la tâche sait", l2_body: "Le responsable, le statut courant, les documents et articles liés, le contexte complet d'une tâche, structuré de la même façon dans chaque workflow.", l3_tag: "Couche 03 · Vue d'exécution", l3_title: "Agir sans quitter la tâche", l3_body: "Des actions directes dans la tâche (compter, corriger, scanner, valider), avec le scanner comme entrée de premier rang. La tâche se clôt là où le travail se fait.", cap1: "<b>Vue liste</b>: des cartes dépliables gardent la vue d'ensemble lisible.", cap2: "<b>Un point d'entrée unique</b>: les six workflows et le scanner, accessibles d'un geste, où que l'on soit.", cap3: "<b>Tablette</b>: le même modèle qui respire sur deux colonnes, rien à réapprendre d'un appareil à l'autre." },
        found: { eyebrow: "La fondation", title: "Un design system né du produit", lead: "Six workflows sur trois breakpoints ne restent pas cohérents par simple discipline. Alors, en parallèle de l'application, j'ai construit le design system de Datamaster (couleurs, typographie, espacements, icônes et une bibliothèque complète de composants), et la seconde itération de Task Master en a été assemblée.", tip: "Astuce : cliquez sur une pastille pour copier son code hex, la vraie palette de la marque, construite autour du bleu du logo.", underneath: "En dessous : des rampes de dix paliers pour chaque rôle de couleur plus quatre palettes de soutien, une échelle typographique alignée sur Material avec Rubik et une police d'accent manuscrite pour les annotations, un rythme d'espacement de 8 px, cinq breakpoints responsive, et un jeu d'icônes redessiné depuis le style Solar Linear de Streamline pour coller à la marque, en cinq tailles, de 12 à 48 px.", cap_colour: "<b>Couleur</b>: chaque rôle en dix paliers, testés pour le contraste dans des écrans denses en données.", cap_type: "<b>Typographie</b>: 15 styles, de Display à Label, sur Rubik, calibrés pour des interfaces longues et chargées en données.", lib_label: "Extraits de la bibliothèque de composants", cap_buttons: "<b>Boutons</b>: chaque hiérarchie et chaque état", cap_inputs: "<b>Champs</b>: avec états de validation", cap_date: "<b>Sélecteurs de date</b>: calendriers & plages", cap_selection: "<b>Contrôles de sélection</b>: switch, radio, checkbox", cap_nav: "<b>Navigation</b>: sidebar, navigation rail et barre d'onglets pour les trois breakpoints", cap_icons: "<b>Icônes</b>: une seule voix visuelle pour des écrans denses, de S à XXL", inv_label: "Dans la bibliothèque", note: "<b>Pourquoi c'est important ici, </b> le système est le héros discret du résultat des 50 % : des composants cohérents ont rendu la refonte rapide à assembler, la réutilisation facile pour les développeurs, et l'interface immédiatement familière d'un écran à l'autre. Il sert aujourd'hui de référence visuelle aux autres modules ERP de Datamaster." },
        impact: { eyebrow: "Résultats & impact", title: "Ce que ça a changé", lead: "La refonte a été validée là où ça compte (avec de vrais utilisateurs de supermarché sur de vraies opérations), et dans la vitesse quotidienne de l'équipe qui la construit.", i1_t: "Exécution des tâches 50 % plus rapide", i1_p: "En tests d'utilisabilité avec de vrais utilisateurs de supermarché, les flux repensés ont à peu près divisé par deux le temps par tâche, hiérarchie plus claire, moins d'étapes, et aucun changement d'outil en pleine tâche.", i2_t: "Moins d'erreurs là où elles font mal", i2_p: "Les corrections de stock et le suivi des commandes (les deux endroits où une erreur coûte de l'argent réel), ont vu leurs taux d'erreur baisser une fois le travail guidé pas à pas par les flux.", i3_t: "Des développeurs plus rapides", i3_p: "Des composants réutilisables et des specs prêtes pour le développement ont réduit les reprises et gardé l'implémentation fidèle au design, ce sont les mots des développeurs, pas les miens.", i4_t: "La référence de la suite", i4_p: "Task Master est devenu la référence de l'apparence, du ressenti et de la construction des futurs modules ERP de Datamaster, l'application qui a prouvé la fondation." },
        status: { eyebrow: "Où en est le projet", title: "Livrée, utilisée, et ça continue", s1_label: "Fait", s1_t: "Refonte livrée", s1_p: "L'application de seconde génération est celle avec laquelle les équipes retail travaillent aujourd'hui, sur mobile, tablette et desktop.", s2_label: "En ligne et en itération", s2_t: "Nouveaux modules en conception", s2_p: "Les achats et l'inventaire continuent de s'approfondir, et les flux « scan d'abord » sont nés de cette boucle, le terrain continue de nous apprendre.", s3_label: "En cours", s3_t: "Déploiement multilingue", s3_p: "Le support du français, de l'anglais et de l'arabe se déploie sur les produits Datamaster, en commençant par cette application." },
        reflect: { eyebrow: "Réflexion", quote: "La complexité vit dans l'opération. Le rôle de l'interface est de <span>l'absorber</span>, pas de la transmettre.", p1: "Le plus dur dans ce projet n'était pas de dessiner des écrans, c'était de compresser une opération physique, désordonnée et sans cesse interrompue en un modèle auquel un employé fatigué peut se fier à 7 h du matin. Avoir posé tôt le bon modèle de tâche, c'est ce qui a permis à six workflows très différents de sortir comme un seul produit cohérent, et ce qui rend chaque nouveau module moins coûteux que le précédent.", p2: "Cela a aussi fixé ma façon de travailler avec les ingénieurs : pas de cérémonie, des boucles courtes, des specs traitées comme des conversations. Et cela m'a appris qu'une refonte est plus forte quand on a aussi conçu la première version, on ne devine pas ce qui a échoué, on l'a mesuré." },
        closing: { eyebrow: "Discutons", title: "Une opération à démêler ?", lead: "Je conçois les interfaces derrière les opérations lourdes (modules ERP, outils internes, workflows mobile-first), et les fondations qui les gardent cohérentes. Dites-moi ce avec quoi votre équipe se débat." }
      },
      cs3: {
        hero: { eyebrow: "Étude de cas 03 · ERP Ventes B2B", title: "Module ERP Ventes B2B", sub: "Le cœur commercial d'une suite ERP, devis, commandes, préparation, livraison et retours pour les clients professionnels, structurés en un espace de travail lisible et dense en données, plutôt qu'un empilement d'outils fragmentés.", role_k: "Rôle", role_v: "Designer Produit · UI/UX", client_k: "Client", client_v: "Datamaster Analytics · ERP, France", team_k: "Équipe", team_v: "BA · lead technique · devs front & back-end", platform_k: "Plateforme", platform_v: "Web desktop · écrans denses en données", cta: "Lançons un projet comme celui-ci", status: "Structure validée · prête pour le raffinement visuel" },
        stats: { flows: "flux de vente de bout en bout, du devis au retour", screens: "écrans clés qui portent tout le module", states: "états d'écran couvrant les cas limites", versions: "versions d'itération avec l'équipe", modules: "modules ERP bâtis sur cette logique de mise en page", docs: "documents imprimables, de l'écran au papier" },
        problem: { eyebrow: "Le problème", title: "La vente professionnelle vivait en fragments", lead: "Gérer les ventes B2B (clients, devis, commandes, factures, livraisons), voulait dire jongler entre des outils déconnectés. Personne n'avait un endroit où l'état d'une vente était simplement visible.", c1t: "Données fragmentées, zéro visibilité", c1p: "Fiches clients, commandes, factures et états de livraison étaient éparpillés sur plusieurs outils. Garder une image cohérente d'une vente exigeait des recoupements manuels, et une bonne mémoire.", c2t: "Une densité qui noyait le signal", c2p: "Les écrans de vente sont lourds par nature : tableaux, filtres, statuts, relations entre entités. Les métriques dont les gens avaient réellement besoin étaient enfouies sous l'information répétitive.", c3t: "Aucun rythme de mise en page partagé", c3p: "Les écrans existants manquaient de structure unifiée, chacun résolvait sa mise en page à sa façon. Chaque nouvel écran rendait le système plus difficile à lire, pas plus simple." },
        role: { eyebrow: "Mon rôle", title: "Le designer entre les règles et les écrans", lead: "J'ai porté le design du module de bout en bout : transformer règles métier et modèles de données en flux, en mises en page et en structures d'écran sur lesquelles toute l'équipe pouvait s'aligner, puis affiner ensemble à mesure que le développement prenait forme.", mine_tag: "Sous ma responsabilité", mine1: "L'UX et l'UI complètes du module de ventes, 4 flux, 8 écrans clés, 50 états d'écran", mine2: "La traduction des exigences fonctionnelles en flux visuels et structures d'écran, avec le BA", mine3: "Le système de mise en page à trois zones et la hiérarchie des données de chaque tableau", mine4: "Les règles métier rendues visibles dans l'interface, validations, garde-fous et cas limites", mine5: "Des cycles courts de revue et de révision avec le BA et les développeurs, de la v1 à la v9.1", partner_h: "L'équipe autour de moi", partner1: "Business analyst, recherche utilisateur, règles métier et documents d'exigences", partner2: "Lead technique, modèles de données et contraintes techniques", partner3: "Développeurs front-end & back-end, partenaires d'implémentation à chaque cycle", partner_note: "La collaboration tournait en boucles courtes et directes, revues de mise en page avec le BA, discussions sur le comportement des données avec les développeurs, ajustements aussitôt reportés dans Figma." },
        process: { eyebrow: "Ma façon de travailler", title: "Trois axes, travaillés en boucles", lead: "Rien ici n'a suivi une cascade bien rangée. Trois axes (voir le pipeline en entier, la structure avant la finition, itérer avec l'équipe), ont avancé de front, et j'y suis revenu en boucle à mesure que le module prenait forme. Moins une séquence que les trois choses que je n'ai jamais cessé de faire.", p1_label: "Axe", p1_title: "Voir le pipeline en entier", p1_body: "Avec le business analyst, j'ai traduit les documents d'exigences et les règles métier en flux visuels : comment un devis devient une commande, comment une commande est préparée puis livrée, comment un retour revient. Quatre flux de bout en bout ont émergé, et un pipeline qui les relie.", p1_call: "<b>Mon parti pris →</b> rendre le pipeline lui-même cliquable, pas seulement visible. Un stepper persistant (Devis → Commande → Préparation → Livraison → Facture), permet de sauter directement à n'importe quelle étape : cliquez sur Facture depuis l'écran Livraison et vous atterrissez dans Finance & Comptabilité, là où vit vraiment la facturation. Le parcours de vente ne semble jamais coupé.", p2_label: "Axe", p2_title: "La structure avant la finition", p2_body: "J'ai volontairement maintenu les écrans en mid-fidelity : logique de mise en page, structure et lisibilité plutôt que décoration visuelle. Une palette réduite aux couleurs de la marque (bleu, gris, blanc), gardait les écrans familiers, sans prétendre qu'un design system existait là où il n'y en avait pas encore. Chaque heure est allée à la hiérarchie, au contraste et à la composition.", p2_call: "<b>Le principe →</b> la finition ne répare pas un tableau illisible. Si la structure ne fonctionne pas en gris et bleu, elle ne fonctionnera dans rien d'autre.", p3_label: "Axe", p3_title: "Itérer avec toute l'équipe", p3_body: "Chaque mise en page passait par une boucle en trois temps : le business analyst la confrontait aux règles métier, je révisais le design en conséquence, puis les développeurs l'affinaient face aux modèles de données et aux contraintes techniques. Neuf versions plus tard, la structure avait survécu à toutes les règles et à tous les cas limites que l'équipe pouvait lui opposer.", p3_call: "<b>Ce que v9.1 veut dire →</b> pas de l'indécision, de la validation. Chaque version est une boucle complète : revue du BA, révision du design, puis affinage par les développeurs, réabsorbés dans la structure.", note: "<b>Des règles métier rendues visibles, </b> les flux ne se contentent pas d'afficher les données, ils les défendent. Une remise qui fait passer la marge sous le seuil autorisé bloque le devis et exige une confirmation explicite, documents incomplets et limites de commande dépassées reçoivent le même traitement. L'interface porte les règles de l'entreprise, pas seulement ses données." },
        layout: { eyebrow: "L'idée centrale", title: "Trois zones pour chaque écran", lead: "Un gros volume de données a besoin d'une scène stable. Chaque écran du module (quel que soit le flux), repose sur la même structure à trois zones : on sait toujours où regarder, et où agir.", z1_tag: "Zone 01 · Barre latérale", z1_title: "Naviguer dans l'univers des ventes", z1_body: "Une navigation compacte, portée par les icônes, entre les sections du module, toujours présente, sans jamais disputer l'attention aux données.", z2_tag: "Zone 02 · Espace de travail central", z2_title: "Là où vivent les données", z2_body: "Des tableaux et des listes dynamiques qui portent le vrai volume, tri et filtres par colonne, filtres globaux, actions par ligne et pagination pensée pour des milliers d'enregistrements.", z3_tag: "Zone 03 · En-tête", z3_title: "Contexte et actions rapides", z3_body: "L'identité du document, son état dans le pipeline et les actions qui comptent maintenant (créer, valider, envoyer, imprimer), à un clic, où que l'on soit.", cap1: "<b>Suivi des devis</b> · un seul tableau répond à la question quotidienne : où en est chaque devis, et lequel réclame mon attention ?", cap2: "<b>Pilotage des commandes</b>: ordres de préparation et bons de livraison dans un même centre de commande, avec PDF, e-mail et impression sur chaque ligne.", cap3: "<b>Retours</b> · même squelette, autre flux : la liste maîtresse à côté du détail, pour traiter un retour sans jamais perdre son contexte." },
        pipe: { eyebrow: "Les flux", title: "Devis → Commande → Préparation → Livraison → Retours", lead: "Une vente, plusieurs mains : le commercial rédige le devis, l'entrepôt prépare, la logistique livre, et parfois la marchandise revient. Le module suit le document à chaque passage de relais, et le stepper garde tout le monde orienté.", quote_label: "Là où tout commence: construire un devis", cap_create: "<b>Création du devis</b> · un long formulaire dense apprivoisé par des sections numérotées : informations, contact, produits, livraison, conditions de paiement et un résumé toujours visible. Les règles de remise automatiques s'appliquent à mesure que les lignes s'ajoutent.", cap_alert: "<b>Le garde-fou</b>: une remise qui mange la marge arrête le flux et exige une décision humaine. Des écrans calmes, des exceptions qui se font entendre.", order_label: "À travers l'entrepôt: de la commande au pas de porte", cap_orders: "<b>Suivi des commandes</b>: les devis devenus commandes, avec leur état de préparation visible d'un coup d'œil.", cap_prep: "<b>Préparation</b>: commandé vs préparé vs restant, par article et par zone. Le tableau fait office de checklist.", cap_delivery: "<b>Livraison</b>: marchandise, expéditeur, destinataire et logistique sur un seul écran, jusqu'à la signature du destinataire.", docs_label: "Jusqu'au papier", cap_doc1: "<b>Ordre de préparation</b>: ce que l'entrepôt tient réellement en main.", cap_doc2: "<b>Bon de livraison</b>: voyage avec la marchandise, signé à la porte.", cap_doc3: "<b>Bon de retour</b>: la trace écrite quand la marchandise revient.", docs_note: "Le flux ne s'arrête pas à l'écran, ordres de préparation, bons de livraison et bons de retour ont aussi été conçus comme documents imprimables, pour que la même information reste lisible sur papier, dans une allée d'entrepôt.", nda: "<b>Note sur ce qui est montré :</b> il s'agit d'un travail client sous NDA. Chaque écran utilise un contenu fictif (les clients, dates et montants répétés sont des données factices volontaires), et certains flux sont simplifiés. Le vrai produit et ses données restent privés." },
        impact: { eyebrow: "Résultats & impact", title: "Ce que ça a livré", lead: "Le rôle du module : rendre des opérations de vente complexes lisibles et constructibles, et laisser une structure sur laquelle le reste de l'ERP pouvait s'appuyer.", i1_t: "Des données complexes, enfin lisibles", i1_p: "De gros volumes de données de vente organisés en une hiérarchie claire et navigable, on localise et on interprète l'information dense sans devoir s'y frayer un chemin.", i2_t: "Une structure validée, prête à construire", i2_p: "Le prototype mid-fi définit la logique de mise en page, le parcours utilisateur et la hiérarchie des données sur les quatre flux, confronté aux règles métier et aux modèles de données pendant neuf versions, et prêt pour le raffinement visuel.", i3_t: "Les règles métier dans l'interface", i3_p: "Garde-fous de marge, contrôles de complétude et limites de commande font partie des flux eux-mêmes, le design attrape les erreurs coûteuses avant qu'elles ne deviennent des documents.", i4_t: "Le plan directeur de la suite", i4_p: "La structure à trois zones est devenue la fondation de mise en page des autres modules de l'ERP (Achat, Finance et Comptabilité), pour garder la suite cohérente à l'échelle du système." },
        status: { eyebrow: "Où en est le projet", title: "Validé, adopté, en route vers le hi-fi", s1_label: "Fait", s1_t: "Structure validée", s1_p: "Les quatre flux de vente validés en mid-fidelity avec le business analyst, le lead technique et les développeurs, la v9.1 est la version sur laquelle l'équipe construit.", s2_label: "Adopté et en croissance", s2_t: "La suite emboîte le pas", s2_p: "La logique de mise en page du module porte désormais l'ERP au sens large, j'ai ensuite conçu les modules Achat et Finance & Comptabilité sur la même structure.", s3_label: "À venir", s3_t: "Raffinement visuel", s3_p: "La structure ayant fait ses preuves, les écrans sont prêts pour la passe hi-fi, la finition visuelle complète, appliquée sur une mise en page qui fonctionne déjà." },
        reflect: { eyebrow: "Réflexion", quote: "En mid-fidelity, la <span>structure</span> est le design. Si la hiérarchie ne tient pas en gris et bleu, aucune finition ne la sauvera.", p1: "Ce projet a aiguisé ma façon de concevoir les interfaces denses en données : la hiérarchie lisible d'abord, un contraste fort entre contenu et actions, et des compositions qui restent calmes sous des centaines de lignes. Il a aussi prouvé que la cohérence n'attend pas un design system, une mise en page bien structurée et un langage visuel discipliné ont porté quatre modules.", p2: "Et il a confirmé une manière de travailler en laquelle je crois : se placer entre le business analyst et les développeurs, traiter leurs règles et leurs contraintes comme un matériau de design, et itérer en cycles courts jusqu'à ce que la structure survive à tout ce que le domaine lui oppose." },
        closing: { eyebrow: "Discutons", title: "Noyé sous des écrans denses en données ?", lead: "Je conçois les interfaces derrière les opérations lourdes (modules ERP, dashboards, outils internes), et les structures qui gardent les données complexes lisibles. Dites-moi ce contre quoi votre équipe se débat." }
      }
    },
    ar: {
      nav: {
        projects:   'المشاريع',
        experience: 'الخبرة',
        skills:     'المهارات',
        insights:   'المقالات',
        contact:    'تواصل معي',
        back_to_top: 'العودة إلى الأعلى',
        theme_to_dark: 'التبديل إلى الوضع الداكن',
        theme_to_light: 'التبديل إلى الوضع الفاتح',
        dropdown_aria: 'إظهار قائمة المشاريع',
        all_projects: 'جميع المشاريع'
      },
      hero: {
        greeting:      'مرحباً، أنا نَذِير مصطفاوي',
        title:         'مُصَمِّم\nمُنتَجَات',
        bio:           'أصمم واجهات المنتجات لحلول B2B SaaS ووحدات ERP ولوحات تحكم المبيعات والتطبيقات ذات الأولوية للجوال ومنصات المؤسسات متعددة الأدوار.',
        cta_primary:   'لنتحدث',
        cta_secondary: 'شاهد أعمالي',
        cta_cv:        'عرض السيرة الذاتية',
        scroll:        'مرّر',
        scroll_aria:   'مرّر للاستكشاف',
        stat2_num:     '+20',
        stat2_label:   'مشروع\nساهمتُ فيه',
        stat3_num:     '03',
        stat3_label:   'دول\nعملت فيها'
      },
      work: {
        label:         'أعمال مختارة',
        title:         'دراسات',
        subtitle:      'نظرة أقرب على كيفية تحويلي لسير عمل معقد وكثيف البيانات إلى منتجات سهلة الاستخدام.',
        nda:           'اتفاقية سرية: التفاصيل مُعمَّمة، دون أي بيانات سرّية',
        cta:           'عرض دراسة الحالة',
        flow_problem:  'المشكلة',
        flow_approach: 'النهج',
        flow_outcome:  'النتيجة',
        cs1: {
          hook:         'نظام تصميم',
          short:        'نظام تصميم',
          tag:          'ERP · نظام تصميم',
          title:        'نظام تصميم Datamaster',
          role:         'مصمم منتجات (UI/UX)، المصمم الوحيد',
          problem:      'غياب الاتساق بين المنتجات، وواجهات بصرية قديمة، وضعف في الاستجابة عبر مجموعة ERP في نمو متسارع.',
          approach:     'بناء نظام تصميم متكامل من الصفر (لوحة ألوان، وتايبوغرافيا، وشبكة تباعد بمقاس 8px، ومجموعة أيقونات مخصصة، ومكتبة مكونات متنامية)، موثّقة لتسليمها للمطورين.',
          outcome:      'التطبيق الأول، في تطبيق إدارة المهام، خفّض زمن تنفيذ المهام بنسبة 50% في اختبارات قابلية الاستخدام.',
          stat1_num: '50', stat1_suffix: '%', stat1_label: 'أسرع في أول تطبيق',
          stat2_num: '8',  stat2_suffix: 'px', stat2_label: 'نظام شبكة التباعد',
          tag1: 'أنظمة التصميم', tag2: 'مكتبة المكونات', tag3: 'تسليم للمطورين'
        },
        cs2: {
          hook:         'تطبيق عمليات التجزئة',
          short:        'Task Master',
          tag:          'عمليات التجزئة · أولوية الجوال',
          title:        'Task Master · تطبيق عمليات التجزئة',
          role:         'مصمم منتجات، المصمم الوحيد',
          problem:      'عمليات المتاجر (الشراء، الجرد، تصحيح المخزون، وسم الأرفف)، مبعثرة بين جداول بيانات وأدوات منفصلة.',
          approach:     'توحيد ستة مسارات عمل في نموذج مهمة واحد (قائمة ← تفاصيل ← تنفيذ)، مع بناء نظام التصميم أسفله، والتكرار مع مستخدمين حقيقيين في السوبر ماركت على الجوال والجهاز اللوحي وسطح المكتب.',
          outcome:      'تنفيذ أسرع للمهام بنسبة 50%، أخطاء أقل في تصحيح المخزون، والمرجع البصري لمنظومة ERP لدى Datamaster.',
          stat1_num: '50', stat1_suffix: '%', stat1_label: 'تنفيذ أسرع للمهام',
          stat2_num: '6',  stat2_suffix: '',  stat2_label: 'مسارات عمل موحّدة',
          stat3_num: '390', stat3_suffix: '+', stat3_label: 'شاشة عبر 3 breakpoints',
          tag1: 'أولوية الجوال', tag2: 'مسارات المستخدم', tag3: 'اختبار قابلية الاستخدام'
        },
        cs3: {
          hook:         'وحدة ERP لمبيعات B2B',
          short:        'ERP للمبيعات',
          tag:          'ERP · عمليات المبيعات',
          title:        'وحدة ERP لمبيعات B2B',
          role:         'مصمم منتجات (UI/UX)',
          problem:      'بيانات العملاء والطلبات والفواتير مبعثرة بين أدوات متعددة، شاشات مزدحمة وقابلية قراءة ضعيفة.',
          approach:     'تصميم بدقة متوسطة بثلاث مناطق (تنقل وجداول وإجراءات سريعة)، يُقدّم المنطق على الصقل عبر 4 مسارات مبيعات متكاملة.',
          outcome:      'تسلسل واضح للبيانات عبر مسار كامل من عرض السعر إلى الإرجاع، وأساس التصميم لأربع وحدات ERP إضافية.',
          stat1_num: '8',   stat1_suffix: '', stat1_label: 'شاشات أساسية',
          stat2_num: '50',  stat2_suffix: '', stat2_label: 'حالة frame',
          stat3_num: '9.1', stat3_suffix: '', stat3_label: 'الإصدار الذي تم بلوغه',
          tag1: 'تصور البيانات', tag2: 'تجربة مستخدم للمؤسسات', tag3: 'النماذج الأولية'
        },
        cs4: {
          hook:         'منصة تعليم إلكتروني',
          short:        'تعليم إلكتروني',
          tag:          'تعليم إلكتروني · منصة متعددة الأدوار',
          title:        'منصة تعليم إلكتروني',
          role:         'مصمم منتجات (UI/UX)',
          problem:      'كان المعلمون يستضيفون دروسهم على يوتيوب دون أي تحكم في الدورات أو الطلاب أو التحليلات.',
          approach:     'تطبيق منهجية التفكير التصميمي عبر 3 أدوار (معلم، مسؤول، مسؤول عام)، مع صلاحيات مبنية على الأدوار وفصول معيارية ← دروس ← اختبارات.',
          outcome:      'أصبح بإمكان المعلمين الآن إدارة دوراتهم بالكامل دون الحاجة لمنصات خارجية، نظام مركزي جاهز للتوسّع.',
          stat1_num: '3', stat1_suffix: '', stat1_label: 'أدوار مستخدمين مصمَّمة',
          stat2_num: '3', stat2_suffix: '', stat2_label: 'لوحات تحكم مُسلَّمة',
          tag1: 'التفكير التصميمي', tag2: 'تجربة مستخدم حسب الدور', tag3: 'تجربة مستخدم عربية'
        },
        cs5: {
          hook:         'نظام تصميم',
          short:        'نظام تصميم',
          tag:          'ERP · نظام تصميم',
          title:        'نظام تصميم Iksir',
          role:         'مصمم منتجات، قاد المشروع (فريق من شخصين)',
          problem:      'مجموعة ERP وتطبيقات جوال متنامية دون لغة واجهة موحّدة، مكوّنات غير متسقة، وبناء بطيء، ودون أساس لإمكانية الوصول أو تعدّد اللغات.',
          approach:     'قيادة نظام تصميم قائم على الـtokens (بنية tokens من ثلاث طبقات، وaccessibility مدمجة، وأساس ثلاثي اللغة (LTR/RTL)، وكامل طبقة الجوال)، موثّق لتسليمه للمطورين.',
          outcome:      'إطلاق النسخة الأولى، وصار الفريق يصمّم ويبني استنادًا إليها: مصدر حقيقة واحد عبر الويب والجوال، مع معالجة الوضعين الفاتح/الداكن واتجاه RTL تلقائيًا.',
          stat1_num: '1033', stat1_suffix: '', stat1_label: 'متغيّر تصميم',
          stat2_num: '24', stat2_suffix: '', stat2_label: 'مكوّنًا مُطلقًا',
          tag1: 'أنظمة التصميم', tag2: 'إمكانية الوصول', tag3: 'الـDesign Tokens'
        }
      },
      experience: {
        label:    'المسيرة المهنية',
        title:    'تجربتي المهنية',
        subtitle: 'على مرّ السنين، أتيحت لي فرصة العمل مع فرق وعملاء رائعين.',
        tag_pd:   'تصميم المنتج',
        tag_ds:   'أنظمة التصميم',
        tag_lead: 'القيادة',
        tag_ux:   'أبحاث تجربة المستخدم',
        nawat: {
          company:   'استوديو نواة',
          role:      'مصمم منتجات',
          city:      'تلمسان',
          country:   'الجزائر',
          work_type: 'عن بُعد',
          dates:     'يناير 2026 - حتى الآن',
          duration:  '7 أشهر',
          desc_0:    '- شركة Datamaster Analytics هي العميل الرئيسي لاستوديو نواة، لذا فإن دوري المتزامن في Datamaster (أدناه) هو نفس العمل، مُنجَز عبر الاستوديو.',
          desc_1:    '- قيادة تصميم المنتج لعملاء B2B SaaS وبرامج المؤسسات',
          desc_2:    '- الإشراف على مصمم منتجات وتوجيهه، ومراجعة التسليمات وضمان جودة التصميم.',
          desc_3:    '- تسليم واجهات ERP وأنظمة التصميم وإعادة هيكلة معمارية المعلومات عبر مشاريع العملاء.'
        },
        dma: {
          company:   'Datamaster Analytics',
          city:      'بيزون، إيل-دو-فرانس',
          country:   'فرنسا',
          work_type: 'عن بُعد',
          dates:     'سبتمبر 2024 - حتى الآن',
          duration:  'سنة و11 شهرًا',
          role_a:    'مصمم منتجات',
          dates_a:   'ديسمبر 2024 - حتى الآن',
          desc_a0:   'المصمم الوحيد لمنصة ERP في مرحلة نمو متسارعة، المسؤول عن النطاق الكامل للتصميم عبر وحدات أعمال متعددة ونظام تصميم متكامل عقب إعادة تحديد هوية العلامة التجارية.',
          desc_a1:   '- تصميم خمس وحدات ERP أساسية من الألف إلى الياء: المبيعات B2B، والمشتريات، ونقاط البيع، والمالية، والمحاسبة، كل منها يتعامل مع كثافة بيانات عالية عبر مسارات عمل معقدة متعددة الأدوار',
          desc_a2:   '- بناء مكتبة تصميم شاملة عقب إعادة تحديد الهوية، نظام مكونات Figma وموقع مخصص يجعل نظام التصميم في متناول غير المصممين',
          desc_a3:   '- قيادة مشروع معمارية المعلومات لإعادة هيكلة جميع المنتجات الحالية وتوحيدها قبل إعادة تصميم المنصة بالكامل',
          desc_a4:   '- التعاون اليومي مع محللي الأعمال والقادة التقنيين ومطوري الـfront-end والـback-end لتسليم ملفات Figma جاهزة للتطوير',
          role_b:    'مصمم UI/UX',
          dates_b:   'سبتمبر 2024 - نوفمبر 2024',
          desc_b0:   'مهمة فريلانس أولية مركّزة على المنتج الجوّال للشركة.',
          desc_b1:   '- تصميم تطبيق إدارة مهام بأولوية للجوّال لفرق مستودعات التجزئة، تصميم متكامل من الألف إلى الياء عبر تكرارين على مدار دورة المشروع'
        },
        five: {
          company:   'Five Angles',
          role:      'مصمم UI/UX',
          country:   'دبي',
          city:      'الإمارات العربية المتحدة',
          work_type: 'عن بُعد',
          dates:     'مارس 2024 - ديسمبر 2024',
          duration:  '10 أشهر',
          desc_0a:   'عمل مع ',
          desc_0b:   'وكالة مقرّها دبي',
          desc_0c:   ' على مشاريع عملاء في قطاعات متعددة.',
          desc_1:    '- تصميم لوحات تحكم المسؤول العام والمسؤول والمعلم لمنصة تعليم إلكتروني متعددة الأدوار، إدارة الدورات وتدفقات إنشاء المحتوى وتتبع تقدم الطلاب.',
          desc_2:    '- إعادة تصميم منصة عقارية، قوائم العقارات وأنظمة البحث والتصفية ولوحة تحكم الوكيل.',
          desc_3:    '- تصميم نظام إدارة قضايا لمنظمة خيرية تدعم المطلقات، سياق مستخدم حساس يتطلب تدفقات واضحة وسهلة الوصول.',
          desc_4:    '- تسليم تصاميم متعددة لصفحات الهبوط لعملاء متنوعين.'
        },
        gld: {
          company:   'SARL GLD',
          role:      'مصمم UX',
          city:      'تلمسان',
          country:   'الجزائر',
          work_type: 'عن بُعد',
          dates:     'يوليو 2024',
          duration:  'شهر واحد',
          desc_0:    'إجراء تدقيق UX لمنصة التجارة الإلكترونية لشركة بيع بالجملة B2B (قطاع مستحضرات التجميل والمنظفات).',
          desc_1:    '- تحديد مشكلات سهولة الاستخدام عبر تدفقات المستخدم الرئيسية والتعاون المباشر مع المطوّر لتطبيق التحسينات فوراً'
        },
        atqin: {
          company:   'أتقن',
          role:      'مؤسس مشارك وقائد تصميم المنتج',
          city:      'تلمسان',
          country:   'الجزائر',
          work_type: 'عن بُعد',
          badge:     'تطوعي',
          dates:     '2023 - حتى الآن',
          duration:  '3 سنوات وشهران',
          desc_0:    '- المشاركة في تأسيس مجتمع تطوعي من المتخصصين في التقنية، وتصميم نظام لمنصة إدارة حلقات القرآن غير الربحية وموقع لمؤسسة ثقافية تاريخية.',
          desc_1:    '- تنسيق مشاريع الفريق وإدارة نمو المجتمع.'
        }
      },
      skills: {
        label:    'المهارات',
        title:    'مهاراتي',
        subtitle: 'مجموعة مهارات شاملة اكتسبتها عبر سنوات من الخبرة العملية.',
        product: {
          title: 'مهارات المنتج',
          t1: 'التفكير المنتجي',
          t2: 'Agile / Scrum',
          t3: 'إطار التفكير التصميمي',
          t4: 'التواصل مع أصحاب المصلحة',
          t5: 'نقد التصميم وتقديم الملاحظات'
        },
        ux: {
          title: 'مهارات تجربة المستخدم',
          t1: 'أبحاث المستخدم',
          t2: 'اختبار قابلية الاستخدام',
          t3: 'الـwireframes والنماذج الأولية',
          t4: 'مسارات المستخدم',
          t5: 'معمارية المعلومات',
          t6: 'تحليل المنافسين'
        },
        ui: {
          title: 'مهارات واجهة المستخدم',
          t1: 'التصميم البصري',
          t2: 'أنظمة التصميم',
          t3: 'تصميم تطبيقات الجوال',
          t4: 'تصميم متجاوب للويب',
          t5: 'التايبوغرافيا',
          t6: 'نظرية الألوان'
        },
        tools: {
          title: 'أدوات التصميم'
        },
        technical: {
          title: 'المهارات التقنية',
          t1: 'HTML و CSS · أساسيات',
          t2: 'تطوير الويب والجوال · فهم أساسي'
        },
        collab: {
          title: 'أدوات التعاون'
        },
        soft: {
          title: 'المهارات الشخصية',
          t1: 'حل المشكلات',
          t2: 'التعاون بين الفرق',
          t3: 'الإدارة الذاتية / العمل عن بُعد'
        },
        languages: {
          title: 'اللغات',
          t1: 'الإنجليزية · احترافية',
          t2: 'العربية · اللغة الأم',
          t3: 'الفرنسية · احترافية'
        }
      },
      footer: {
        badge:            'متاح لمشاريع جديدة',
        heading:          'لنبنِ شيئًا رائعًا معًا',
        subtitle:         'لديك فكرة أو مشروع في ذهنك؟ يسعدني معرفة المزيد، أرسل رسالة أو تواصل معي مباشرة أدناه.',
        watermark:        'نذير',
        form_title:       'أرسل رسالة',
        form_name:        'الاسم',
        form_email:       'البريد الإلكتروني',
        form_message:     'الرسالة',
        form_send:        'إرسال الرسالة',
        form_sending:     'جارٍ الإرسال…',
        form_sent:        'تم إرسال الرسالة!',
        form_error:       'حدث خطأ ما، يرجى المحاولة مرة أخرى أو مراسلتي مباشرة عبر البريد الإلكتروني.',
        contacts_title:   'التواصل المباشر',
        contact_email:    'البريد الإلكتروني',
        contact_linkedin: 'لينكدإن',
        contact_whatsapp: 'واتساب',
        contact_instagram:'إنستغرام',
        copy_label:       'نسخ البريد الإلكتروني',
        cv_label:         'السيرة الذاتية',
        cv_value:         'معاينة وتحميل (PDF)',
        cv_title:         'السيرة الذاتية',
        cv_sub:           'نذير مصطفاوي · مصمم منتجات',
        cv_download:      'تحميل PDF',
        cv_open:          'فتح في تبويب جديد',
        cv_close:         'إغلاق',
        copy_done:        'تم النسخ!',
        copyright:        'نذير مصطفاوي. جميع الحقوق محفوظة.'
      },
      cs: {
        ui: { enlarge: "تكبير", enlarge_aria: "تكبير الصورة", copy: "نسخ الكود", copied: "تم النسخ!", close: "إغلاق" }, hero: { eyebrow: "دراسة حالة 01 · Design System", title: "نظام تصميم Iksir", sub: "أساس تصميم قائم على الـtokens (متسق وسهل الوصول وثلاثي اللغة)، تعتمد عليه منتجات Datamaster على الويب والجوال.", badge: "عمل لعميل: التفاصيل معمّمة، ولا تظهر أي بيانات سرية", role_k: "الدور", role_v: "مصمم منتجات، قاد المشروع", team_k: "الفريق", team_v: "مصمّمان", timeline_k: "المدة", timeline_v: "فبراير – يونيو 2026 · V1", platforms_k: "المنصات", platforms_v: "الويب · iOS · Android", cta: "لنبدأ مشروعًا مثل هذا", status: "النسخة V1 مُطلَقة · ويب + جوال · قيد التطوير النشط" },
        stats: { variables: "متغيّر تصميم", components: "مكوّنًا", patterns: "أنماط UX", colours: "token لوني", languages: "لغات (LTR + RTL)", modes: "وضعان (فاتح + داكن)" },
        problem: { eyebrow: "المشكلة", title: "مجموعة منتجات متنامية دون لغة مشتركة", lead: "تبني Datamaster نظام ERP معياريًا وعائلة من تطبيقات الجوال تحت علامتها Iksir. ومع نمو المجموعة، كانت كل شاشة تحلّ نفس مشاكل الواجهة من الصفر.", c1t: "عدم الاتساق كان يبطّئ كل شيء", c1p: "الألوان والتباعدات والأزرار والتحقّق من النماذج كانت تُعاد بناؤها في كل شاشة وتتصرّف بشكل مختلف بين المنتجات، ممّا يكلّف وقت تطوير ويُنتج أخطاء واجهة يمكن تجنّبها.", c2t: "منصّتان، دون تقييد", c2p: "الويب ينتقل من Ant Design إلى Shadcn، مع Flutter على الجوال. كان على النظام أن يمدّها جميعًا بالقرارات نفسها عبر الـtokens، مع بقائه مستقلًّا عن أي مكتبة، لكي يحتفظ الفريق بحرية البناء خارج أي إطار عمل واحد.", c3t: "مبني لثلاث لغات", c3p: "المنتجات تتوسّع إلى الفرنسية والإنجليزية والعربية (تطبيق المهام أولًا)، لذا كان لا بد أن يعيش دعم الكتابة من اليمين إلى اليسار والتايبوغرافيا ثنائية النص داخل الأساس منذ البداية، لا أن يُضاف لاحقًا." },
        role: { eyebrow: "دوري", title: "فريق من شخصين: أنا من رسم الاتجاه", lead: "كنّا مصمّمَي منتج. قدتُ المشروع من البداية إلى النهاية: الاستراتيجية، والعلاقة مع العميل، وكل قرار تأسيسي يقوم عليه النظام. تعرض هذه الدراسة الجزء الخاص بي من هذا العمل.", mine_tag: "بقيادتي", mine1: "الاستراتيجية والاستكشاف والعلاقة مع الأطراف المعنية لدى العميل", mine2: "كامل استراتيجية الـdesign tokens والبنية ذات الطبقات الثلاث", mine3: "الأساس ثلاثي اللغة ومن اليمين إلى اليسار (LTR/RTL)", mine4: "إطار إمكانية الوصول، مدمَجًا داخل الـtokens", mine5: "كامل طبقة الجوال: قواعد المنصّة والمكوّنات المخصّصة للجوال", mine6: "كل التوثيق والأدلة ونموذج الحَوكمة", mine7: "هيكلة المشروع وإطلاق V1: واستراتيجية التبنّي الجارية الآن", partner_h: "شريكي في التصميم", partner1: "تدقيق المنتج الويب الحالي", partner2: "إنتاج مكوّنات الويب/سطح المكتب في Figma", partner3: "بناء موقع التوثيق", partner4: "التحسين البصري اللاحق للمكتبة العامة", partner_note: "قصة الفريق الكاملة موجودة في دراسة حالة منفصلة باسم الاستوديو، هذه الصفحة تركّز على القرارات والعمل الذي أنجزته بنفسي." },
        process: { eyebrow: "المسار", title: "من التدقيق إلى نسخة V1 مُطلَقة", lead: "هيكلتُ العمل في مراحل، وإن كانت في الواقع متداخلة وتعود إلى الوراء مع كل ما نتعلّمه، لا في خط مستقيم. ومع ذلك كانت كل مرحلة تُختَم بقرار تبني عليه المرحلة التالية.", p1_label: "المرحلة", p1_title: "التدقيق والمواءمة", p1_body: "أجريتُ استكشافًا مع الأطراف المعنية لفهم النشاط، ثم كتبتُ الرؤية ومعايير النجاح. دقّقتُ تطبيق المهام على الجوال فوجدتُه يعمل بنظام مستقلّ تمامًا وبقيم مكتوبة يدويًا، منفصلًا عن أي أساس مشترك.", p1_call: "<b>قراري ←</b> إعادة النظر في مئات شاشات الجوال المُثبَتة باعتبارها المخطّط المرجعي لطبقة الجوال في النظام، بدلًا من التعامل معها كمشكلة يجب تنظيفها.", p2_label: "المرحلة", p2_title: "الأساسات", p2_body: "حدّدتُ بنية الـtokens (نظام تسمية صارم (فئة · خاصية · مفهوم · حالة) قائم على سلسلة من ثلاث طبقات: primitives ثم semantics ثم components)، حتى لا يكتب المطوّرون قيمة يدويًا مرة أخرى أبدًا. وإلى جانب ذلك، وضعتُ البنية ثلاثية اللغة/RTL (الخصائص المنطقية، والتايبوغرافيا ثنائية النص، وقواعد عكس الأيقونات) وإطار إمكانية وصول مُعبَّرًا عنه مباشرة على شكل tokens.", p2_call: "<b>القرار الحاسم ←</b> جعل الوضعين الفاتح/الداكن واتجاهي LTR/RTL خصائص للـtokens نفسها، لكي يتكيّف مصدر الحقيقة الواحد تلقائيًا بدلًا من صيانته مرتين.", p3_label: "المرحلة", p3_title: "المكوّنات وطبقة الجوال والتوثيق", p3_body: "مع اتساع المكتبة إلى 24 مكوّنًا و5 أنماط، صمّمتُ كامل طبقة الجوال (قواعد المنصّة والمكوّنات المخصّصة للجوال (bottom sheets، أشرطة التبويب، لوحة الأرقام، طبقة الماسح، بطاقات المهام))، في Figma وعلى موقع التوثيق معًا. ثم هيكلتُ المشروع وأطلقتُ V1.", p3_call: "<b>المبدأ الذي تمسّكتُ به ←</b> التعامل مع التوثيق كمنتج قائم بذاته، المرجع الوحيد الذي يعمل منه المصمّمون والمطوّرون معًا.", loop: "<b>ليس خطًّا مستقيمًا، </b> الطبقة المخصّصة للجوال هي المثال الأوضح. ما رصدته المرحلة 1 كتطبيق مهام منفصل ومكتوب يدويًا أصبح في المرحلة 3 مكتبة مكوّنات الجوال في النظام، عبر عدّة تكرارات، لا مرّة واحدة. صمّمتُ الطبقة، وراجعها شريكي المصمّم في كل جولة ودفعها أبعد، وكل دورة شدّت المكوّنات حتى صمدت كنظام." },
        system: { eyebrow: "النظام", title: "ثلاث طبقات، مصدر واحد للحقيقة", lead: "كل طبقة لا تستهلك إلا التي تحتها مباشرة. تجاوَز طبقة واحدة وتكسر ضمان المصدر الواحد للحقيقة، لذا لا تلمس المكوّنات القيم الخام أبدًا.", delivers: "<b>ما الذي يمنحه ذلك، </b> غيّر قرارًا مرة واحدة فيرثه كل منتج: مصدر حقيقة واحد عبر منصّتَي تطوير، والوضعان الفاتح/الداكن واتجاه RTL يُحلّان تلقائيًا، ومعيار WCAG AA مطبّق على مستوى الـtokens.", l1_tag: "الطبقة 01 · Primitives", l1_title: "قيم خام، مُسمّاة بقيمتها", l1_body: "أكواد hex وأحجام بالبكسل ومدد زمنية. المكان الوحيد الذي تُكتب فيه قيمة صريحة.", l2_tag: "الطبقة 02 · الـtokens السيمانتيكية", l2_title: "مُسمّاة بالنيّة: الطبقة الوحيدة التي تستخدمها المكوّنات", l2_body: "تربط الـprimitives بالمعنى، وتحمل تلقائيًا قيم الوضعين الفاتح/الداكن واتجاهي LTR/RTL.", l3_tag: "الطبقة 03 · المكوّنات والأنماط", l3_title: "لا تستهلك إلا السيمانتيكي", l3_body: "كل مكوّن مبني من tokens سيمانتيكية (لا قيمة مكتوبة يدويًا أبدًا)، لذا يتكيّف مع أي وضع أو لغة بلا تكلفة.", cap1: "<b>منصّة التوثيق</b>: نظرة عامة وإحصاءات حيّة والبنية ذات الطبقات الثلاث.", cap2: "<b>ستة مبادئ</b>: القيود التي تقف خلف كل token ومكوّن ونمط." },
        found: { eyebrow: "الأساسات", title: "اللون والتايبوغرافيا والمسافات: كلها في tokens", lead: "191 token لونيًا موزّعة على مجموعات: العلامة، المحتوى، الخلفية، الحدود، والحالة، لكل منها قيمة فاتحة وأخرى داكنة. وتقرن التايبوغرافيا عائلة لاتينية بعائلة عربية بوزن بصري متكافئ.", cap_colour: "<b>اللون</b>: 191 token سيمانتيكيًا موزّعة على خمس مجموعات، لكل منها قيمة فاتحة وداكنة.", cap_type: "<b>التايبوغرافيا</b> · 9 أدوار في نصّين: لاتيني (Montserrat + Inter) وعربي (Alexandria + Inter)، مع زيادة +2&nbsp;px للعربية.", tip: "نصيحة: انقر أي عيّنة لنسخ كود الـhex، نفس الـtokens التي تقرأها المنتجات.", underneath: "وتحت ذلك: مقياس تباعد من 22 خطوة على شبكة 4pt، و8 قيم radius سيمانتيكية، و4 مستويات elevation، و86 أيقونة Lucide بسُمك 1.5px في ثلاثة أحجام، كل منها بقواعد عكسها في RTL." },
        lib: { eyebrow: "المكتبة", title: "24 مكوّنًا: كل حالة موثّقة", lead: "من الزر (450 نسخة لأن كل تسلسل × حجم × موضع أيقونة × حالة محسوب، لا حشوًا لذاته)، إلى القطع المخصّصة للجوال التي صمّمتُها لتطبيق المهام. كل واحدة مبنية وموثّقة، جاهزة للاستخدام.", core_label: "المكوّنات الأساسية", cap_button: "<b>الزر</b>: 450 نسخة", cap_input: "<b>حقل الإدخال</b>: 336 نسخة", cap_card: "<b>البطاقة</b>: 12 نسخة", cap_modal: "<b>الـModal</b>: أيقونة × حجم", mobile_label: "المخصّصة للجوال: الطبقة التي صمّمتُها", cap_task: "<b>بطاقة المهمة</b>: 17 نسخة حسب الأولوية والحالة والمهام الفرعية", cap_tabnav: "<b>شريط التبويب السفلي</b>: مؤشّر نشط + شارات", cap_sheet: "<b>Bottom sheet</b>: مطوية / نصفية / كاملة", patterns_label: "الأنماط", cap_charts: "<b>الرسوم البيانية</b>: خطية، أعمدة، دونات، مساحية، sparkline، مصمّمة للجوال أولًا", cap_charttokens: "<b>tokens الرسوم</b>: لوحة مشتقّة من الـprimitives + قواعد الاستخدام", note: "<b>ملاحظة حول ما يُعرَض:</b> Iksir عمل حيّ لعميل تحت اتفاقية سرية (NDA)، لذا أعرض جزءًا مختارًا فقط من نظام التصميم (عيّنة من الـtokens والمكوّنات والأنماط، لا المكتبة الكاملة)، ولا أي شاشات إنتاج لدى العميل أو بيانات حقيقية. ما ترونه هنا نموذج منتقى آمن للمشاركة، أما النظام الكامل والمنتجات التي يشغّلها فتبقى خاصة." },
        a11y: { eyebrow: "إمكانية الوصول", title: "WCAG 2.1 AA، مدمجة في الأساس", lead: "كانت إمكانية الوصول من المجالات التي أتولّاها. لم أكتفِ بتوثيق WCAG 2.1 AA، بل حوّلتُه إلى tokens، وإلى فحوص قابلة لإعادة الاستخدام في Figma (مصفوفة تباين ومكوّن هدف لمسي 44×44)، وإلى تدفّق اختبار يصمّم ويبني عليه الفريق كله.", i1_t: "التباين كعقد", i1_p: "4.5:1 للنص، و3:1 للنص الكبير وعناصر الواجهة، مُتحقَّق منها في الوضعين الفاتح والداكن، مع تصحيح التركيبات غير الآمنة على مستوى الـtokens.", i2_t: "لا اعتماد على اللون وحده", i2_p: "تقرن حالات ERP اللونَ دائمًا بأيقونة ونص، لكي يبقى المعنى قائمًا مع عمى الألوان والتدرّج الرمادي.", i3_t: "tokens للهدف اللمسي والتركيز", i3_p: "هدف لمسي أدنى 44×44 pt وحلقة تركيز مُزاحة 2 px، كلاهما في tokens، مستخدمو لوحة المفاتيح والجوال مشمولون افتراضيًا.", i4_t: "قارئات الشاشة ثلاثية اللغة", i4_p: "سمتا <code>lang</code>/<code>dir</code> ديناميكيتان، وترتيب قراءة منطقي، وتسميات مُترجَمة، لكي تقرأ التقنيات المساعِدة الفرنسية والإنجليزية والعربية بشكل صحيح.", i5_t: "قابلة للاختبار، لا مجرّد موثّقة", i5_p: "أنشأتُ تدفّق فحص على كل سطح (إضافات التباين في Figma، وaxe وLighthouse على الويب، وVoiceOver وTalkBack على الجوال)، لتُتحقَّق إمكانية الوصول عند كل تسليم، لا أن تُفترَض.", i6_t: "أحجام النصّين", i6_p: "يُزاد نص المتن العربي بمقدار 1–2 px عن خط الأساس اللاتيني، مع ضبط tokens ارتفاع السطر بحيث لا تُقتَص الروابط المعقّدة أبدًا في الجداول الكثيفة." },
        status: { eyebrow: "أين وصل المشروع", title: "مُطلَق، ولا يزال يتطوّر", s1_label: "منجز", s1_t: "إطلاق V1", s1_p: "الأساسات، و24 مكوّنًا، و5 أنماط، ومنصّة التوثيق، كلها متاحة كنسخة V1 رسمية.", s2_label: "متاح وقيد التطوير", s2_t: "التبنّي والصقل", s2_p: "المكتبة قيد الاستخدام، وصار الفريق يصمّم ويبني استنادًا إليها. قاد شريكي المصمّم نسخة عامة مصقولة من الموقع فوق V1 المشتركة.", s3_label: "قيد التنفيذ", s3_t: "استراتيجية الدمج", s3_p: "أحدّد كيفية دمج النظام في المنتجات الفعلية، وأُبقي الحَوكمة مفتوحة حتى يستقرّ تمامًا." },
        gov: { eyebrow: "الحَوكمة", title: "قواعد تُبقيه متماسكًا مع نموّه", r1_t: "استخدم دائمًا الـtokens السيمانتيكية", r1_p: "تشير المكوّنات إلى النيّة (brand/primary)، لا إلى القيم الخام، وهذا ما يجعل النظام قابلًا للصيانة وتبديل الأوضاع.", r2_t: "احترم سلسلة الطبقات الثلاث", r2_p: "primitives ثم semantics ثم components. لا تتجاوز طبقة أبدًا، فذلك يكسر المصدر الواحد للحقيقة.", r3_t: "فاتح + داكن، RTL + LTR، مدمجة", r3_p: "كل token سيمانتيكي يحمل الوضعين، دون مجموعات ألوان موازية، ودون عكس يدوي.", r4_t: "التوثيق هو المواصفة", r4_p: "مراجع الـtokens والحالات وإرشادات الصواب/الخطأ متطلّبات، مع تدفّق يتيح لغير المبرمج نشر التحديثات بأمان." },
        reflect: { eyebrow: "خلاصة", quote: "قيادة نظام تعني تصميم <span>القرارات</span>، لا الشاشات فحسب.", p1: "الجزء الأصعب (والأكثر إرضاءً)، لم يكن رسم المكوّنات. بل اتخاذ خيارات تصمد عبر منصّتين تقنيتين، وثلاث لغات، ووضعين للألوان، وبين يدَي مصمّم ثانٍ. إرساء البنية وإمكانية الوصول مبكرًا هو ما سمح للمكتبة بالنمو دون أن تنهار إلى استثناءات.", p2: "كما أعاد ذلك تشكيل طريقة عملي: التعامل مع التوثيق كمنتج، وكتابة قواعد يستطيع الآخرون اتّباعها دون وجودي في الغرفة، والبقاء مسؤولًا عن نظام بعد إصداره الأول بوقت طويل." },
        closing: { eyebrow: "لنتحدّث", title: "هل لديك نظام مثل هذا في ذهنك؟", lead: "أصمّم أنظمة ومنتجات والأساسات التي تحتها. أخبرني بما تبنيه، ولنجعله متسقًا وسهل الوصول وسريع الإطلاق." },
        pager: { all: "العودة إلى الصفحة الرئيسية", contact: "تواصل معي" }, more: { eyebrow: "تابِع الاستكشاف", title: "المزيد من دراسات الحالة" },
        form: { ptype_label: "بماذا يمكنني المساعدة؟", pt_ds: "نظام تصميم", pt_web: "تطبيق ويب / SaaS", pt_mobile: "تطبيق جوال", pt_erp: "ERP / أداة داخلية", pt_job: "فرصة عمل", pt_other: "شيء آخر" }
      },
      cs2: {
        hero: { eyebrow: "دراسة حالة 02 · تطبيق عمليات التجزئة", title: "Task Master", sub: "تطبيق لإدارة المهام لفرق متاجر التجزئة، الشراء والجرد وتصحيح المخزون وعمليات الأرفف في مسار عمل واحد واضح يُقرأ بلمحة، على الجوال والجهاز اللوحي وسطح المكتب.", role_k: "الدور", role_v: "مصمم منتجات، المصمم الوحيد", client_k: "العميل", client_v: "Datamaster Analytics · ERP، فرنسا", team_k: "الفريق", team_v: "محلّل أعمال · قائد تقني · 3 فرق تطوير", platforms_k: "المنصات", platforms_v: "جوال · جهاز لوحي · سطح مكتب", cta: "لنبدأ مشروعًا مثل هذا", status: "قيد الاستخدام لدى فرق التجزئة · وحدات جديدة قيد التصميم" },
        stats: { faster: "تنفيذ أسرع للمهام في اختبارات قابلية الاستخدام", workflows: "مسارات عمل تشغيلية موحّدة", screens: "شاشة مصمّمة", breakpoints: "breakpoints: جوال، لوحي، سطح مكتب", components: "مكوّنًا في المكتبة الداعمة", iterations: "إصداران رئيسيان للمنتج" },
        problem: { eyebrow: "المشكلة", title: "عمليات المتاجر كانت تُدار بجداول البيانات والذاكرة", lead: "تنسّق فرق التجزئة العمليات اليومية للمتجر (استلام المشتريات، وجرد المخزون، وتصحيحه، وإعادة وسم الأرفف)، وهم واقفون، على أجهزة مشتركة، في سباق مع الوقت. ولم تكن الأدوات على قدر هذا الواقع.", c1t: "أدوات مبعثرة وتقدّم غير مرئي", c1p: "كانت العمليات تعيش في جداول بيانات يدوية وأدوات منفصلة. كل متجر ينفّذ المهام نفسها بطريقته، ولا أحد يرى حالة العمل دون أن يسأل أحدًا.", c2t: "مهمة واحدة وأجزاء متحركة كثيرة", c2p: "تصحيح مخزون واحد يمسّ مناطق وأصنافًا وكميات وأسبابًا وتحققًا. والتبديل بين الأدوات في منتصف المهمة هو حيث كانت تتسلّل الأخطاء، وأخطاء بيانات المخزون مكلفة.", c3t: "النسخة الأولى كانت درسًا لنا", c3p: "التطبيق من الجيل الأول (الذي صممته أنا أيضًا)، أثبت الفكرة لكنه كشف دروسًا قاسية: مرئيات غير متسقة، وتجاوب ضعيف، وشاشات تطلب من عمّال الصالة أن يقرؤوا وهم بحاجة إلى أن يتصرّفوا." },
        role: { eyebrow: "دوري", title: "مصمم وحيد، منغمس في العملية", lead: "كنت مصمم المنتج الوحيد في هذا المنتج. عملت مباشرة مع محلّل الأعمال صاحب المتطلبات، ومع المهندسين الذين أطلقوه، وكل ما هو بصري أو تفاعلي كان يمرّ عبري.", mine_tag: "من مسؤوليتي", mine1: "تجربة المستخدم والواجهة من البداية إلى النهاية لمسارات العمل الستة، على الجوال واللوحي وسطح المكتب", mine2: "ترجمة الوثائق الوظيفية إلى تدفقات مهام وwireframes وتسلسلات البيانات", mine3: "نموذج المهمة الموحّد الذي بُني عليه التطبيق كله", mine4: "نظام التصميم، الألوان والتايبوغرافيا والتباعدات والأيقونات ومكتبة المكوّنات", mine5: "مواصفات Figma جاهزة للتطوير وحلقة تكرار مستمرة مع المطورين", partner_h: "الفريق من حولي", partner1: "محلّل الأعمال، المتطلبات والمعرفة بالمجال وملاحظات المستخدمين النهائيين", partner2: "القائد التقني: الجدوى ومنطق التفاعل", partner3: "مطورو الجوال والـfront-end والـback-end: شركاء التنفيذ", partner4: "أصحاب المصلحة: الأولويات ودورات المراجعة", partner_note: "كان التعاون مباشرًا ومستمرًا، نسخ Figma ومكالمات Teams وحلقات مراجعة قصيرة. لا sprints رسمية ولا انتظار." },
        process: { eyebrow: "العملية", title: "من أرض المتجر إلى الشاشة", lead: "سار العمل في حلقات لا في خط مستقيم، لكن لكل جولة مركز ثقل: افهم العملية، ثم نمذجها، ثم كرّرها في مواجهة الواقع.", p1_label: "المرحلة 1", p1_title: "فهم العملية", p1_body: "مع محلّل الأعمال أجريت جلسات تصوّر حوّلت الوثائق الوظيفية إلى تدفقات مهام وwireframes وتسلسلات البيانات، بدءًا من الورق. قبل أي واجهة، كان عليّ أن أعرف ما الذي يحمله العامل فعلًا ويمسحه ويعدّه ويؤكده في كل عملية.", p1_call: "<b>قراري ←</b> التصميم أولًا لسياق العامل (واقفًا، بيد واحدة، على جهاز مشترك، ومقاطَعًا باستمرار)، وترك كل قرار في التخطيط ينبع من ذلك.", p2_label: "المرحلة 2", p2_title: "نموذج مهمة واحد لستة مسارات عمل", p2_body: "الشراء والجرد ووسم الأرفف وتصحيح المخزون وتزويد صالة البيع والمهام المتفرقة تتصرف جميعها بشكل مختلف على الورق. هيكلتُها كلها في الطبقات الثلاث نفسها، قائمة مهام مع فلاتر، وتفاصيل مهمة بأشخاصها وبياناتها، وعرض تنفيذ بإجراءات مباشرة داخل المهمة. تعلّم التطبيق مرة واحدة، وستبدو كل عملية مألوفة.", p2_call: "<b>القرار الذي صنع الفرق ←</b> نموذج واحد، لا ستة تطبيقات مصغّرة. هذا ما جعل التطبيق قابلًا للتوسع نحو وحدات جديدة وسهل التعلّم فورًا للموظفين الجدد.", p3_label: "المرحلة 3", p3_title: "التكرار في مواجهة الواقع", p3_body: "كانت الشاشات تذهب إلى المطورين وإلى اختبارات قابلية الاستخدام مع مستخدمين حقيقيين في السوبر ماركت، وتعود ملاحظاتهم مباشرة إلى Figma، مواصفات أوضح وتباعدات أدق وعرض أفضل للبيانات. سجّلت إعادة التصميم تنفيذًا للمهام أسرع بنسبة 50% من التدفقات القديمة، وأبقت جلسات الاختبار المشتركة التصميم والهندسة صادقَين أحدهما مع الآخر.", p3_call: "<b>المبدأ الذي تمسكت به ←</b> المواصفة حوارٌ لا تسليم. حلقات قصيرة مباشرة مع أربعة مطورين تتفوق على أي عملية رسمية كنا سنعتمدها.", loop: "<b>الحلقة عمليًا، </b> بعد الإطلاق دفعنا الواقعُ الميداني أبعد: أراد عمّال الصالة قيادة عمليات كاملة من ماسح الباركود. فصار ذلك نسخة مخصصة من تدفقات المهام تبدأ بالمسح، 47 شاشة صُممت حول الماسح كوسيلة الإدخال الأولى لا لوحة المفاتيح.", lofi_label: "حيث بدأ كل شيء: الورق والـwireframes", cap_lofi1: "<b>الورق أولًا</b>: رسم شاشات المهام قبل لمس Figma.", cap_lofi2: "<b>تسلسل البيانات</b>: تحديد ما يقرؤه العامل أولًا وثانيًا وما لا يقرؤه أبدًا.", cap_lofi3: "<b>Wireframes منخفضة الدقة</b>: بنية وتدفق جرى التحقق منهما بالرمادي قبل أي تجميل." },
        ba: { eyebrow: "إعادة التصميم", title: "العملية نفسها، وبينهما جيل كامل", lead: "أعادت النسخة الثانية بناء كل شاشة على الأساس الجديد: سطح أهدأ، وتسلسل أقوى، وبطاقات مهام تُظهر الأولوية والحالة والمكلّفين وعدد الأصناف بلمحة، بحيث تجيب القائمة نفسها عن معظم الأسئلة.", before_label: "قبل: الجيل الأول", cap_b1: "<b>الجوال، النسخة 1</b>: عملي، لكن الوسوم والبيانات الوصفية تتنافس على الانتباه وكل بطاقة تُقرأ مثل غيرها.", cap_b2: "<b>سطح المكتب، النسخة 1</b>: شبكة بطاقات عاملت نظرة المشرف كأنها هاتف أكبر حجمًا.", after_label: "بعد: Task Master", cap_a1: "<b>الجوال، النسخة 2</b> · بطاقات مهام قابلة للتوسيع: الأولوية والحالة والفريق وعدد الأصناف تُقرأ في مرور واحد، ومعرّف المهمة يُنسخ بلمسة.", cap_a2: "<b>سطح المكتب، النسخة 2</b> · عرضُ مشرفٍ حقيقي: أعمدة أكثف، بحث وفرز شاملان، والإنشاء والترشيح على بعد نقرة.", note: "<b>ملاحظة على المعروض:</b> هذا عمل حي لعميل تحت اتفاقية سرية. كل شاشة هنا تستخدم محتوى وهميًا (المعرّفات المتكررة و«999 صنفًا» بيانات تجريبية مقصودة)، وبعض التدفقات مبسّطة. المنتج الحقيقي وبياناته يبقيان خاصّين." },
        model: { eyebrow: "الفكرة المحورية", title: "قائمة ← تفاصيل ← تنفيذ", lead: "كل مسار عمل (من جرد نهاية السنة إلى إعادة وسم رفّ واحد)، يمرّ عبر الطبقات الثلاث نفسها. تبقى الطبقات كما هي، وتتغير البيانات داخلها فقط.", l1_tag: "الطبقة 01 · عرض القائمة", l1_title: "رؤية العمل لا الأداة", l1_body: "كل المهام في مكان واحد مع بحث وفلاتر وفرز. الأولوية والحالة والفريق والحجم تُقرأ دون فتح أي شيء.", l2_tag: "الطبقة 02 · تفاصيل المهمة", l2_title: "كل ما تعرفه المهمة", l2_body: "المسؤول، والحالة الحالية، والمستندات والأصناف المرتبطة، السياق الكامل لمهمة واحدة، بالهيكلة نفسها في كل مسار عمل.", l3_tag: "الطبقة 03 · عرض التنفيذ", l3_title: "تصرّف دون مغادرة المهمة", l3_body: "إجراءات مباشرة داخل المهمة (عدّ وتصحيح ومسح وتأكيد)، مع الماسح كوسيلة إدخال من الدرجة الأولى. تُغلق المهمة حيث يحدث العمل.", cap1: "<b>عرض القائمة</b>: بطاقات قابلة للتوسيع تُبقي النظرة العامة سهلة القراءة.", cap2: "<b>نقطة دخول واحدة</b>: مسارات العمل الستة والماسح، على بُعد bottom sheet واحد من أي مكان.", cap3: "<b>الجهاز اللوحي</b>: النموذج نفسه يتنفس في عمودين، ولا شيء يُعاد تعلّمه بين الأجهزة." },
        found: { eyebrow: "الأساس", title: "نظام تصميم نبت من داخل المنتج", lead: "ستة مسارات عمل على ثلاثة breakpoints لا تبقى متسقة بالانضباط وحده. لذلك، وبموازاة التطبيق، بنيت نظام تصميم Datamaster (الألوان والتايبوغرافيا والتباعدات والأيقونات ومكتبة مكوّنات كاملة)، ومن هذا النظام جُمعت النسخة الثانية من Task Master.", tip: "نصيحة: انقر أي لون لنسخ كود الـhex الخاص به، لوحة العلامة الحقيقية، المبنية حول أزرق الشعار.", underneath: "في الأسفل: تدرجات من عشر درجات لكل دور لوني مع أربع لوحات مساندة، وسلّم تايبوغرافي موائم لـMaterial على خط Rubik مع خط بلمسة يدوية للتعليقات، وإيقاع تباعد من 8 بكسل، وخمسة breakpoints متجاوبة، ومجموعة أيقونات أُعيد رسمها من نمط Solar Linear لدى Streamline لتوائم العلامة، بخمسة أحجام من 12 إلى 48 بكسل.", cap_colour: "<b>اللون</b>: كل دور في عشر درجات، مُختبَرة للتباين في شاشات كثيفة البيانات.", cap_type: "<b>التايبوغرافيا</b>: 15 نمطًا من Display إلى Label على خط Rubik، معايَرة لواجهات طويلة مثقلة بالبيانات.", lib_label: "من مكتبة المكوّنات", cap_buttons: "<b>الأزرار</b>: كل تسلسل وكل حالة", cap_inputs: "<b>الحقول</b>: مع حالات التحقق", cap_date: "<b>منتقيات التاريخ (Date pickers)</b>: تقاويم ونطاقات", cap_selection: "<b>عناصر الاختيار</b>: switch وradio وcheckbox", cap_nav: "<b>التنقل</b>: شريط جانبي وnavigation rail وشريط تبويبات للـbreakpoints الثلاثة", cap_icons: "<b>الأيقونات</b>: صوت بصري واحد لشاشات كثيفة البيانات، من S إلى XXL", inv_label: "داخل المكتبة", note: "<b>لماذا يهمّ هنا، </b> النظام هو البطل الهادئ وراء نتيجة الـ50%: مكوّنات متسقة جعلت إعادة التصميم سريعة التجميع، وسهلة إعادة الاستخدام للمطورين، ومألوفة فورًا من شاشة إلى أخرى. وهو اليوم المرجع البصري لوحدات ERP الأوسع لدى Datamaster." },
        impact: { eyebrow: "النتائج والأثر", title: "ما الذي تغيّر", lead: "جرى التحقق من إعادة التصميم حيث يهمّ فعلًا (مع مستخدمين حقيقيين في السوبر ماركت يؤدون عمليات حقيقية)، وفي السرعة اليومية للفريق الذي يبنيها.", i1_t: "تنفيذ أسرع للمهام بنسبة 50%", i1_p: "في اختبارات قابلية الاستخدام مع مستخدمين حقيقيين، خفّضت التدفقات المعاد تصميمها زمن المهمة إلى النصف تقريبًا، تسلسل أوضح، وخطوات أقل، ولا تبديل أدوات في منتصف المهمة.", i2_t: "أخطاء أقل حيث تؤلم", i2_p: "تصحيحات المخزون وتتبّع الطلبات (الموضعان اللذان يكلّف الخطأ فيهما مالًا حقيقيًا)، شهدا انخفاضًا في معدلات الخطأ بعدما صارت التدفقات ترشد العمل خطوة بخطوة.", i3_t: "مطورون أسرع في الإنجاز", i3_p: "المكوّنات القابلة لإعادة الاستخدام والمواصفات الجاهزة للتطوير قلّلت إعادة العمل وأبقت التنفيذ وفيًّا للتصميم، وهذا كلام المطورين لا كلامي.", i4_t: "مرجع المنظومة", i4_p: "صار Task Master المرجع لكيف ينبغي أن تبدو وحدات ERP المقبلة لدى Datamaster وتُحَسّ وتُبنى، التطبيق الذي أثبت الأساس." },
        status: { eyebrow: "أين وصل المشروع", title: "أُطلق، ويُستخدم، وما زال ينمو", s1_label: "منجز", s1_t: "إطلاق إعادة التصميم", s1_p: "تطبيق الجيل الثاني هو ما تعمل به فرق التجزئة اليوم، على الجوال والجهاز اللوحي وسطح المكتب.", s2_label: "متاح وقيد التطوير", s2_t: "وحدات جديدة قيد التصميم", s2_p: "الشراء والجرد يزدادان عمقًا، وتدفقات «المسح أولًا» خرجت من هذه الحلقة، فالميدان لا يكفّ عن تعليمنا.", s3_label: "قيد التنفيذ", s3_t: "طرح متعدد اللغات", s3_p: "دعم الفرنسية والإنجليزية والعربية يُطرح عبر منتجات Datamaster، بدءًا من هذا التطبيق." },
        reflect: { eyebrow: "خلاصة", quote: "التعقيد يسكن العملية. ووظيفة الواجهة أن <span>تمتصّه</span>، لا أن تمرّره.", p1: "أصعب ما في هذا المشروع لم يكن رسم الشاشات، بل ضغط عملية مادية فوضوية كثيرة المقاطعات في نموذج يثق به عامل مُنهك في السابعة صباحًا. ضبطُ نموذج المهمة مبكرًا هو ما سمح لستة مسارات عمل شديدة الاختلاف بالخروج كمنتج واحد متماسك، وما يجعل كل وحدة جديدة أقل كلفة من سابقتها.", p2: "كما حسم طريقتي في العمل مع المهندسين: لا مراسم، وحلقات قصيرة، ومواصفات تُعامل كمحادثات. وعلّمني أن إعادة التصميم تكون أقوى حين تكون قد صممت النسخة الأولى أيضًا، فأنت لا تخمّن ما الذي فشل، بل قد قِسته." },
        closing: { eyebrow: "لنتحدّث", title: "لديك عملية تحتاج إلى تفكيك؟", lead: "أصمّم الواجهات خلف العمليات الثقيلة (وحدات ERP والأدوات الداخلية ومسارات العمل المصمّمة للجوال أولًا)، والأساسات التي تُبقيها متسقة. أخبرني بما يواجهه فريقك." }
      },
      cs3: {
        hero: { eyebrow: "دراسة حالة 03 · ERP لمبيعات B2B", title: "وحدة ERP لمبيعات B2B", sub: "القلب التجاري لمنظومة ERP، عروض الأسعار والطلبات والتجهيز والتسليم والإرجاع لعملاء الشركات، منظّمة في مساحة عمل واحدة مقروءة وكثيفة البيانات، بدل كومة من الأدوات المتفرّقة.", role_k: "الدور", role_v: "مصمم منتجات · UI/UX", client_k: "العميل", client_v: "Datamaster Analytics · ERP، فرنسا", team_k: "الفريق", team_v: "محلّل أعمال · قائد تقني · مطوّرو front & back-end", platform_k: "المنصة", platform_v: "ويب سطح المكتب · شاشات كثيفة البيانات", cta: "لنبدأ مشروعًا مثل هذا", status: "البنية معتمدة · جاهزة للصقل البصري" },
        stats: { flows: "تدفقات بيع كاملة، من عرض السعر إلى الإرجاع", screens: "شاشات أساسية تحمل الوحدة كاملة", states: "حالة frame تغطّي الحالات الحدّية", versions: "إصدارات من التكرار مع الفريق", modules: "وحدات ERP بُنيت على منطق التخطيط نفسه", docs: "مستندات قابلة للطباعة، من الشاشة إلى الورق" },
        problem: { eyebrow: "المشكلة", title: "مبيعات الشركات كانت تعيش مبعثرة", lead: "إدارة مبيعات B2B (العملاء وعروض الأسعار والطلبات والفواتير والتسليمات)، كانت تعني التنقّل بين أدوات غير مترابطة. لم يكن لدى أحد مكان واحد تظهر فيه حالة أي عملية بيع بوضوح.", c1t: "بيانات مجزّأة، ولا رؤية شاملة", c1p: "سجلات العملاء والطلبات والفواتير وحالات التسليم كانت موزّعة على عدة أدوات. الحفاظ على صورة متّسقة لعملية بيع واحدة كان يتطلّب مطابقة يدوية، وثقة بالذاكرة.", c2t: "كثافة تدفن الإشارة", c2p: "شاشات المبيعات ثقيلة بطبيعتها: جداول وفلاتر وحالات وعلاقات بين الكيانات. المؤشرات التي يحتاجها الناس فعلًا كانت مدفونة تحت معلومات متكررة.", c3t: "لا إيقاع تخطيط مشترك", c3p: "الشاشات القائمة كانت تفتقر إلى بنية موحّدة، كل شاشة تحلّ تخطيطها على طريقتها. وكل شاشة جديدة كانت تجعل النظام أصعب في القراءة، لا أسهل." },
        role: { eyebrow: "دوري", title: "المصمم بين القواعد والشاشات", lead: "تولّيتُ تصميم الوحدة من البداية إلى النهاية: تحويل قواعد العمل ونماذج البيانات إلى تدفقات وتخطيطات وبنى شاشات يتوافق عليها الفريق كله، ثم صقلها معًا مع تقدّم البناء.", mine_tag: "من مسؤوليتي", mine1: "كامل الـUX والـUI لوحدة المبيعات، 4 تدفقات، 8 شاشات أساسية، 50 حالة frame", mine2: "ترجمة المتطلبات الوظيفية إلى تدفقات بصرية وبنى شاشات، بالتعاون مع محلّل الأعمال", mine3: "نظام التخطيط بثلاث مناطق وتسلسل البيانات داخل كل جدول", mine4: "إظهار قواعد العمل في الواجهة، عمليات التحقق والضوابط والحالات الحدّية", mine5: "دورات قصيرة من المراجعة والتنقيح مع محلّل الأعمال والمطوّرين، من الإصدار 1 حتى 9.1", partner_h: "الفريق من حولي", partner1: "محلّل الأعمال: بحث المستخدمين وقواعد العمل ووثائق المتطلبات", partner2: "القائد التقني: نماذج البيانات والقيود التقنية", partner3: "مطوّرو front-end وback-end: شركاء التنفيذ في كل دورة", partner_note: "جرى التعاون في حلقات قصيرة ومباشرة، مراجعات التخطيط مع محلّل الأعمال، ونقاشات سلوك البيانات مع المطوّرين، وتعديلات تعود فورًا إلى Figma." },
        process: { eyebrow: "كيف عملت", title: "ثلاثة محاور، في حلقات متكررة", lead: "لم يكن هذا waterfall مرتّبًا قط. ثلاثة محاور (رؤية المسار كاملًا، والبنية قبل الصقل، والتكرار مع الفريق)، سارت جنبًا إلى جنب، وكنت أعود إليها كلما تشكّلت الوحدة أكثر. هي أقرب إلى ثلاثة أشياء واظبتُ عليها منها إلى تسلسلٍ من المراحل.", p1_label: "المحور", p1_title: "رؤية المسار كاملًا", p1_body: "مع محلّل الأعمال تم ترجمت وثائق المتطلبات وقواعد العمل إلى تدفقات بصرية: كيف يتحوّل عرض السعر إلى طلب، وكيف يُجهَّز الطلب ثم يُسلَّم، وكيف يعود الإرجاع. برزت أربعة تدفقات كاملة، ومسار واحد يربطها.", p1_call: "<b>قراري ←</b> جعل مسار البيع نفسه قابلًا للنقر، لا مجرد مرئي. شريط stepper ثابت (عرض السعر ← الطلب ← التجهيز ← التسليم ← الفاتورة)، يتيح القفز مباشرة إلى أي مرحلة: انقر على الفاتورة من شاشة التسليم فتصل مباشرة إلى وحدة المالية والمحاسبة، حيث تعيش الفوترة فعليًا. فلا تنقطع رحلة البيع أبدًا.", p2_label: "المحور", p2_title: "البنية قبل الصقل", p2_body: "أبقيتُ الشاشات عمدًا عند مستوى mid-fidelity: منطق التخطيط والبنية وسهولة القراءة قبل الزخرفة البصرية. مجموعة محدودة من ألوان العلامة (أزرق ورمادي وأبيض)، أبقت الشاشات مألوفة من دون ادّعاء وجود نظام تصميم لم يكن قائمًا بعد. كل ساعة عمل ذهبت إلى التسلسل والتباين والتكوين.", p2_call: "<b>المبدأ ←</b> الصقل لا يُصلح جدولًا غير مقروء. إن لم تنجح البنية بالرمادي والأزرق، فلن تنجح بأي شيء آخر.", p3_label: "المحور", p3_title: "التكرار مع الفريق كله", p3_body: "كان كل تخطيط يمرّ بحلقة من ثلاث خطوات: يراجعه محلّل الأعمال على ضوء قواعد العمل، فأنقّح التصميم بناءً على ذلك، ثم يصقله المطوّرون في مواجهة نماذج البيانات والقيود التقنية. بعد تسعة إصدارات، كانت البنية قد صمدت أمام كل قاعدة وكل حالة حدّية استطاع الفريق أن يختبرها بها.", p3_call: "<b>ماذا يعني الإصدار 9.1 ←</b> ليس ترددًا، بل اعتمادًا. كل إصدار حلقة كاملة: مراجعة محلّل الأعمال، فتنقيح التصميم، فصقل المطوّرين، تُستوعَب كلها في البنية.", note: "<b>قواعد عمل مرئية، </b> التدفقات لا تعرض البيانات فحسب، بل تدافع عنها. الخصم الذي يهبط بالهامش دون الحدّ المسموح يوقف عرض السعر ويطلب تأكيدًا صريحًا، والمستندات الناقصة وتجاوز حدود الطلب تلقى المعاملة نفسها. الواجهة تحمل قواعد الشركة، لا سجلاتها فقط." },
        layout: { eyebrow: "الفكرة المحورية", title: "ثلاث مناطق لكل شاشة", lead: "البيانات الغزيرة تحتاج مرحلةً ثابتة. كل شاشة في الوحدة (أيًّا كان التدفق)، مبنية على البنية ذاتها بثلاث مناطق، فيعرف المستخدمون دائمًا أين ينظرون وأين يتصرّفون.", z1_tag: "المنطقة 01 · الشريط الجانبي", z1_title: "التنقّل في عالم المبيعات", z1_body: "تنقّل مضغوط قائم على الأيقونات بين أقسام الوحدة، حاضر دائمًا، ولا ينازع البيانات على الانتباه أبدًا.", z2_tag: "المنطقة 02 · مساحة العمل الوسطى", z2_title: "حيث تعيش البيانات", z2_body: "جداول وقوائم ديناميكية تحمل الحجم الحقيقي، فرز وفلاتر لكل عمود، وفلاتر عامة، وإجراءات على مستوى الصف، وترقيم صفحات مُصمَّم لآلاف السجلات.", z3_tag: "المنطقة 03 · الترويسة", z3_title: "السياق والإجراءات السريعة", z3_body: "هوية المستند وموضعه في المسار والإجراءات المهمة الآن (إنشاء واعتماد وإرسال وطباعة)، على بُعد نقرة من أي مكان.", cap1: "<b>متابعة عروض الأسعار</b> · جدول واحد يجيب عن سؤال كل يوم: أين وصل كل عرض سعر، وأيّها يحتاج انتباهي؟", cap2: "<b>إدارة الطلبات</b>: أوامر التجهيز وسندات التسليم في مركز قيادة واحد، مع حفظ PDF والبريد والطباعة على كل صف.", cap3: "<b>الإرجاع</b> · الهيكل نفسه بتدفق مختلف: قائمة رئيسية إلى جانب التفاصيل، ليُعالَج الإرجاع من دون أن يفقد سياقه." },
        pipe: { eyebrow: "التدفقات", title: "عرض السعر ← الطلب ← التجهيز ← التسليم ← الإرجاع", lead: "بيعٌ واحد وأيادٍ كثيرة: الفريق التجاري يحرّر عرض السعر، والمستودع يجهّز، واللوجستيات تسلّم، وأحيانًا تعود البضاعة. تتبع الوحدة المستند عند كل تسليم لليد التالية، ويُبقي الـstepper الجميع على اتجاه واحد.", quote_label: "حيث يبدأ كل شيء: بناء عرض السعر", cap_create: "<b>إنشاء عرض السعر</b> · نموذج طويل وكثيف روّضته أقسام مرقّمة: المعلومات، وجهة الاتصال، والمنتجات، والتسليم، وشروط الدفع، وملخص دائم الحضور. قواعد الخصم التلقائية تُطبّق نفسها مع إضافة البنود.", cap_alert: "<b>الضابط</b>: الخصم الذي يلتهم الهامش يوقف التدفق ويطلب قرارًا بشريًا. شاشات هادئة، واستثناءات مسموعة.", order_label: "عبر المستودع: من الطلب إلى الباب", cap_orders: "<b>متابعة الطلبات</b>: عروض الأسعار التي صارت طلبات، وحالة تجهيزها على مرمى نظرة.", cap_prep: "<b>التجهيز</b>: المطلوب مقابل المجهَّز مقابل المتبقي، لكل صنف ولكل منطقة. الجدول هو قائمة التحقق.", cap_delivery: "<b>التسليم</b>: البضاعة والمرسِل والمستلِم واللوجستيات على شاشة واحدة، وصولًا إلى توقيع المستلِم.", docs_label: "وصولًا إلى الورق", cap_doc1: "<b>أمر التجهيز</b>: ما يمسكه المستودع في يده فعلًا.", cap_doc2: "<b>سند التسليم</b>: يسافر مع البضاعة، ويُوقَّع عند الباب.", cap_doc3: "<b>سند الإرجاع</b>: الأثر الورقي حين تعود البضاعة.", docs_note: "لا ينتهي التدفق عند الشاشة، فقد صُمّمت أوامر التجهيز وسندات التسليم وسندات الإرجاع كمستندات قابلة للطباعة أيضًا، لتبقى المعلومات ذاتها مقروءة على الورق في ممر المستودع.", nda: "<b>ملاحظة على المعروض:</b> هذا عمل حي لعميل تحت اتفاقية سرية. كل شاشة تستخدم محتوى وهميًا (العملاء والتواريخ والمبالغ المتكررة بيانات تجريبية مقصودة)، وبعض التدفقات مبسّطة. المنتج الحقيقي وبياناته يبقيان خاصّين." },
        impact: { eyebrow: "النتائج والأثر", title: "ما الذي قدّمه", lead: "كانت مهمة الوحدة أن تجعل عمليات البيع المعقدة مقروءة وقابلة للبناء، وأن تترك بنية يقف عليها بقية الـERP.", i1_t: "بيانات معقدة، مقروءة أخيرًا", i1_p: "أحجام كبيرة من بيانات المبيعات منظّمة في تسلسل واضح سهل التنقّل، يحدّد المستخدمون المعلومات الكثيفة ويفسّرونها من دون الغرق فيها.", i2_t: "بنية معتمدة، جاهزة للبناء", i2_p: "يحدّد نموذج الـmid-fi منطق التخطيط ومسار المستخدم وتسلسل البيانات عبر التدفقات الأربعة، بعد أن ووجه بقواعد العمل ونماذج البيانات على مدى تسعة إصدارات، وبات جاهزًا للصقل البصري.", i3_t: "قواعد العمل داخل الواجهة", i3_p: "ضوابط الهامش وفحوص الاكتمال وحدود الطلب جزء من التدفقات نفسها، التصميم يلتقط الأخطاء المكلفة قبل أن تتحوّل إلى مستندات.", i4_t: "المخطط الأساس للمنظومة", i4_p: "أصبحت البنية بثلاث مناطق أساس التخطيط لبقية وحدات الـERP (المشتريات والمالية والمحاسبة)، بما يُبقي المنظومة متّسقة على مستوى النظام." },
        status: { eyebrow: "أين وصل المشروع", title: "معتمَد ومتبنًّى وفي طريقه إلى الـhi-fi", s1_label: "منجز", s1_t: "البنية معتمدة", s1_p: "التدفقات الأربعة للبيع معتمدة عند مستوى mid-fidelity مع محلّل الأعمال والقائد التقني والمطوّرين، والإصدار 9.1 هو ما يبني عليه الفريق.", s2_label: "متبنًّى ويتوسّع", s2_t: "المنظومة تحذو حذوه", s2_p: "منطق التخطيط في الوحدة يحمل الآن الـERP الأوسع، إذ صمّمتُ بعده وحدة المشتريات ووحدة المالية والمحاسبة على البنية نفسها.", s3_label: "التالي", s3_t: "الصقل البصري", s3_p: "بعد أن أثبتت البنية نفسها، باتت الشاشات جاهزة لمرحلة الـhi-fi، صقل بصري كامل يُطبَّق فوق تخطيطٍ يعمل بالفعل." },
        reflect: { eyebrow: "خلاصة", quote: "عند مستوى الـmid-fi، <span>البنية</span> هي التصميم. إن لم يصمد التسلسل بالرمادي والأزرق، فلن ينقذها أي قدر من الصقل.", p1: "شحذ هذا المشروع طريقتي في تصميم الواجهات كثيفة البيانات: تسلسل مقروء أولًا، وتباين عالٍ بين المحتوى والإجراءات، وتكوينات تبقى هادئة تحت مئات الصفوف. وأثبت أيضًا أن الاتساق لا ينتظر نظام تصميم، فتخطيطٌ محكم البنية ولغة بصرية منضبطة حملا أربع وحدات.", p2: "وأكّد طريقة عمل أثق بها: أن أجلس بين محلّل الأعمال والمطوّرين، وأتعامل مع قواعدهم وقيودهم كمادة تصميم، وأكرّر في دورات قصيرة حتى تصمد البنية أمام كل ما يرميه عليها المجال." },
        closing: { eyebrow: "لنتحدّث", title: "تغرق في شاشات كثيفة البيانات؟", lead: "أصمّم الواجهات التي تقف خلف العمليات الثقيلة (وحدات ERP ولوحات المعلومات وأدوات داخلية)، والبنى التي تُبقي البيانات المعقدة مقروءة. أخبرني بما يصارعه فريقك." }
      }
    }
  };

  let currentLang = DEFAULT_LANG;

  function getLang() {
    return localStorage.getItem(STORAGE_KEY) || DEFAULT_LANG;
  }

  function getNestedValue(obj, path) {
    return path.split('.').reduce((acc, key) => acc?.[key], obj);
  }

  function applyTranslations(t) {
    document.querySelectorAll('[data-i18n]').forEach(el => {
      const key   = el.getAttribute('data-i18n');
      const value = getNestedValue(t, key);
      if (value === undefined) return;

      if (el.tagName === 'H1' || el.tagName === 'H2' || el.hasAttribute('data-i18n-html')) {
        el.innerHTML = value.replace(/\n/g, '<br>');
      } else {
        el.textContent = value;
      }
    });

    document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
      const key   = el.getAttribute('data-i18n-placeholder');
      const value = getNestedValue(t, key);
      if (value) el.setAttribute('placeholder', value);
    });

    document.querySelectorAll('[data-i18n-aria-label]').forEach(el => {
      const key   = el.getAttribute('data-i18n-aria-label');
      const value = getNestedValue(t, key);
      if (value) el.setAttribute('aria-label', value);
    });
  }

  function applyDirection(lang) {
    const isRTL = RTL_LANGS.includes(lang);
    document.documentElement.setAttribute('dir',  isRTL ? 'rtl' : 'ltr');
    document.documentElement.setAttribute('lang', lang);
  }

  function applyFavicon(lang) {
    const favicon = document.getElementById('favicon-link');
    if (!favicon) return;
    favicon.href = RTL_LANGS.includes(lang)
      ? 'assets/icons/favicon-ar.svg'
      : 'assets/icons/favicon.svg';
  }

  function updateLangButtons(lang) {
    document.querySelectorAll('[data-lang-btn]').forEach(btn => {
      const btnLang = btn.getAttribute('data-lang-btn');
      btn.classList.toggle('active', btnLang === lang);
      btn.setAttribute('aria-pressed', btnLang === lang ? 'true' : 'false');
    });
  }

  function switchLang(lang) {
    const locale = LOCALES[lang] || LOCALES[DEFAULT_LANG];
    currentLang  = lang;
    localStorage.setItem(STORAGE_KEY, lang);
    applyDirection(lang);
    applyFavicon(lang);
    applyTranslations(locale);
    updateLangButtons(lang);
    document.dispatchEvent(new CustomEvent('langchange', { detail: lang }));
  }

  /* Public API */
  window.i18n = {
    switch:  switchLang,
    current: () => currentLang,
    t:       (key) => getNestedValue(LOCALES[currentLang], key) || key
  };

  /* Init */
  document.addEventListener('DOMContentLoaded', function () {
    switchLang(getLang());

    document.querySelectorAll('[data-lang-btn]').forEach(btn => {
      btn.addEventListener('click', function () {
        switchLang(btn.getAttribute('data-lang-btn'));
      });
    });
  });
})();
