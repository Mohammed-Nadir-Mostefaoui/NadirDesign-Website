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
        theme_to_light: 'Switch to light mode'
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
        nda:           'NDA — specifics generalized, no confidential data shown',
        cta:           'View Case Study',
        flow_problem:  'Problem',
        flow_approach: 'Approach',
        flow_outcome:  'Outcome',
        cs1: {
          hook:         'Design System',
          short:        'Design System',
          tag:          'ERP · Design System',
          title:        'Datamaster Design System',
          role:         'Product Designer (UI/UX) — sole designer',
          problem:      'No consistency across products, outdated visuals, and poor responsiveness across a growing ERP suite.',
          approach:     'Built a full design system from scratch — palette, typography, an 8px spacing grid, a custom icon set, and a growing component library — documented for dev handoff.',
          outcome:      'First rollout, in the Task Management App, cut task execution time by 50% in usability testing.',
          stat1_num: '50', stat1_suffix: '%',  stat1_label: 'faster in first rollout',
          stat2_num: '8',  stat2_suffix: 'px', stat2_label: 'spacing grid system',
          tag1: 'Design Systems', tag2: 'Component Library', tag3: 'Dev Handoff'
        },
        cs2: {
          hook:         'Task Management App',
          short:        'Task App',
          tag:          'Mobile · B2B SaaS',
          title:        'Task Management App',
          role:         'Product Designer (UI/UX)',
          problem:      'Complex warehouse operations — inventory, order prep, marking, stock correction — buried in a clunky workflow.',
          approach:     'Structured a 3-layer flow — List View → Task Detail → Action/Completion — and iterated directly with real supermarket users.',
          outcome:      '50% faster task execution, fewer stock-correction errors, and a benchmark for future ERP modules.',
          stat1_num: '50', stat1_suffix: '%', stat1_label: 'faster task execution',
          stat2_num: '3',  stat2_suffix: '',  stat2_label: 'layer task flow',
          tag1: 'Mobile-First', tag2: 'User Flows', tag3: 'Usability Testing'
        },
        cs3: {
          hook:         'B2B Sales ERP Module',
          short:        'Sales ERP',
          tag:          'ERP · Sales Operations',
          title:        'B2B Sales ERP Module',
          role:         'Product Designer (UI/UX)',
          problem:      'Client, order, and invoice data fragmented across tools — dense screens, poor readability.',
          approach:     'Mid-fidelity, three-zone layout — navigation, tables, and quick actions — prioritizing logic over polish across 4 end-to-end sales flows.',
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
          approach:     'Ran a Design Thinking process across 3 roles — Teacher, Admin, Super Admin — with role-based permissions and modular chapters → lessons → exams.',
          outcome:      'Teachers can now fully manage courses without external platforms — a centralized ecosystem ready to scale.',
          stat1_num: '3', stat1_suffix: '', stat1_label: 'user roles designed',
          stat2_num: '3', stat2_suffix: '', stat2_label: 'dashboards shipped',
          tag1: 'Design Thinking', tag2: 'Role-Based UX', tag3: 'Arabic UX'
        },
        cs5: {
          hook:         'Design System',
          short:        'Design System',
          tag:          'ERP · Design System',
          title:        'Iksir Design System',
          role:         'Product Designer — led the project (2-person team)',
          problem:      'A growing ERP and mobile suite with no shared UI language — inconsistent components, slow builds, and no accessibility or trilingual foundation.',
          approach:     'Led a token-first design system — a three-layer token architecture, accessibility baked in, a trilingual (LTR/RTL) foundation, and the entire mobile layer — documented for dev handoff.',
          outcome:      'Shipped V1 — and the team now designs and builds against it: one source of truth across web and mobile, with light/dark and RTL handled automatically.',
          stat1_num: '1033', stat1_suffix: '', stat1_label: 'design variables',
          stat2_num: '24', stat2_suffix: '', stat2_label: 'components shipped',
          tag1: 'Design Systems', tag2: 'Accessibility', tag3: 'Design Tokens'
        }
      },
      experience: {
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
          desc_0:    '- Datamaster Analytics is the anchor client of Nawat Studio — so my concurrent Datamaster role (below) is that same work, delivered through the studio.',
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
          desc_a1:   '- Designed five core ERP modules end-to-end: B2B Sales, Purchase, POS, Finance, and Compatibility — each handling high data density across complex multi-role workflows',
          desc_a2:   '- Building a comprehensive design library post-rebranding — Figma component system plus a dedicated website that makes the design system accessible to non-designers',
          desc_a3:   '- Leading an information architecture project to restructure and unify all existing products before a full platform redesign',
          desc_a4:   '- Collaborated daily with business analysts, technical leads, and front-end and back-end developers to deliver dev-ready Figma files',
          role_b:    'UI/UX Designer',
          dates_b:   'Sep 2024 - Nov 2024',
          desc_b0:   'Initial freelance engagement focused on the company\'s mobile product.',
          desc_b1:   '- Designed a mobile-first Task Management App for retail warehouse teams — full end-to-end design across 2 iterations over the project lifecycle'
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
          desc_1:    '- Designed the Super Admin, Admin, and Teacher dashboards for a multi-role e-learning platform — course management, content creation flows, and student progress tracking.',
          desc_2:    '- Redesigned a real estate platform — property listings, search and filter systems, and agent dashboard.',
          desc_3:    '- Designed a case management system for a charity organization supporting divorced women — sensitive user context requiring clear, accessible flows.',
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
          t1: 'HTML & CSS — Basics',
          t2: 'Web & Mobile Development — Basic Understanding'
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
          t1: 'English — Professional',
          t2: 'Arabic — Native',
          t3: 'Français — Professionnel'
        }
      },
      footer: {
        badge:            'Available for new projects',
        heading:          "Let's build something great",
        subtitle:         "Have an idea or a project in mind? I'd love to hear about it — send a message or reach out directly below.",
        watermark:        'NADIR',
        form_title:       'Send a Message',
        form_name:        'Name',
        form_email:       'Email',
        form_message:     'Message',
        form_send:        'Send Message',
        form_sending:     'Sending…',
        form_sent:        'Message sent!',
        form_error:       'Something went wrong — please try again, or email me directly.',
        contacts_title:   'Direct Contacts',
        contact_email:    'Email',
        contact_linkedin: 'LinkedIn',
        contact_whatsapp: 'WhatsApp',
        contact_instagram:'Instagram',
        copy_label:       'Copy email address',
        cv_label:         'Résumé / CV',
        cv_value:         'Preview & download (PDF)',
        cv_title:         'Curriculum Vitae',
        cv_sub:           'Nadir Mostefaoui — Product Designer',
        cv_download:      'Download PDF',
        cv_open:          'Open in new tab',
        cv_close:         'Close',
        copy_done:        'Copied!',
        copyright:        'Nadir Mostefaoui. All rights reserved.'
      },
      cs: {
        ui: { enlarge: "Enlarge", enlarge_aria: "Enlarge image", copy: "Copy hex", copied: "Copied!", close: "Close" }, hero: { eyebrow: "Case Study 01 · Design System", title: "Iksir Design System", sub: "A token-first design foundation — consistent, accessible, and trilingual — that Datamaster's web and mobile products build on.", badge: "Client work — specifics generalized, no confidential data shown", role_k: "Role", role_v: "Product Designer — led the project", team_k: "Team", team_v: "2 designers", timeline_k: "Timeline", timeline_v: "Feb – Jun 2026 · V1", platforms_k: "Platforms", platforms_v: "Web · iOS · Android", cta: "Let's build something like this", status: "V1 shipped · web + mobile · in active development" },
        stats: { variables: "design variables", components: "components", patterns: "UX patterns", colours: "colour tokens", languages: "languages (LTR + RTL)", modes: "modes (light + dark)" },
        problem: { eyebrow: "The problem", title: "A growing product suite with no shared language", lead: "Datamaster builds a modular ERP and a family of mobile apps under its Iksir product brand. As the suite grew, every screen was solving the same UI problems from scratch.", c1t: "Inconsistency slowed everything", c1p: "Colours, spacing, buttons, and form validation were rebuilt per screen and behaved differently across the products — costing development time and creating avoidable UI bugs.", c2t: "Two stacks, no lock-in", c2p: "The web is moving from Ant Design to Shadcn, with Flutter on mobile. The system had to feed them all the same decisions through tokens — while staying library-agnostic, so the team keeps the freedom to build beyond any single framework.", c3t: "Built for three languages", c3p: "The products are expanding to French, English, and Arabic — the task app first — so true right-to-left support and dual-script typography had to live in the foundation from the start, not be bolted on later." },
        role: { eyebrow: "My role", title: "A two-person team — I set the direction", lead: "We were two product designers. I led the project end to end: the strategy, the client relationship, and every foundational decision the system is built on. This case study is my side of that work.", mine_tag: "Led by me", mine1: "Strategy, discovery, and the stakeholder relationship with the client", mine2: "The full design-token strategy and three-layer architecture", mine3: "The trilingual & right-to-left (LTR/RTL) foundation", mine4: "The accessibility framework, baked into the tokens", mine5: "The entire mobile layer — platform rules and mobile components", mine6: "All documentation, guides, and the governance model", mine7: "Structuring the project and shipping V1 — and the rollout strategy now", partner_h: "My design partner", partner1: "Audit of the existing web product", partner2: "Figma production of the web/desktop components", partner3: "Building the documentation website", partner4: "The later polished visual pass on the public library", partner_note: "The full team story lives in a separate studio case study; this page focuses on the decisions and craft I owned." },
        process: { eyebrow: "The process", title: "From audit to a shipped V1", lead: "I structured the work into phases — though in practice they overlapped and looped back as we learned, not a straight line. Each one still closed with a decision the next could build on.", p1_label: "Phase", p1_title: "Audit & alignment", p1_body: "I ran stakeholder discovery to understand the business, then wrote the vision and success criteria. I audited the mobile task app and found it ran on a completely standalone, hard-coded system — disconnected from any shared foundation.", p1_call: "<b>My call →</b> reframe those hundreds of validated mobile screens as the blueprint for the system's mobile layer, instead of treating them as a problem to clean up.", p2_label: "Phase", p2_title: "Foundations", p2_body: "I defined the token architecture — a strict naming convention (category · property · concept · state) sitting on a three-layer chain of primitives → semantics → components — so developers would never hard-code a value again. Alongside it I authored the trilingual/RTL architecture (logical properties, dual-script type, icon-mirroring rules) and an accessibility framework expressed directly as tokens.", p2_call: "<b>The decision that mattered →</b> make light/dark and LTR/RTL properties of the tokens themselves, so a single source of truth adapts automatically rather than being maintained twice.", p3_label: "Phase", p3_title: "Components, mobile layer & documentation", p3_body: "As the library scaled to 24 components and 5 patterns, I designed the entire mobile layer — platform rules and the mobile-native components (bottom sheets, tab bars, numeric keypad, scanner overlay, task cards) — in both Figma and the documentation site. Then I structured the project and shipped V1.", p3_call: "<b>The principle I held →</b> treat the documentation as a product in its own right — the single spec both designers and developers work from.", loop: "<b>Not a straight line —</b> the mobile layer is the clearest example. What Phase 1 flagged as a hard-coded, disconnected task app became, by Phase 3, the system's mobile component library — through several passes, not one. I designed the layer; my design partner reviewed each round and pushed it further; every loop tightened the components until they held up as a system." },
        system: { eyebrow: "The system", title: "Three layers, one source of truth", lead: "Each layer consumes only the one below it. Skip a layer and you break the single-source-of-truth guarantee — so components never touch raw values.", delivers: "<b>What that buys —</b> change a decision once and every product inherits it: one source of truth across two engineering stacks, light/dark and RTL resolved automatically, and WCAG AA enforced at the token level.", l1_tag: "Layer 01 · Primitives", l1_title: "Raw values, named by value", l1_body: "Hex codes, pixel sizes, durations. The only place a literal value is ever written.", l2_tag: "Layer 02 · Semantic tokens", l2_title: "Named by intent — the only layer components use", l2_body: "Maps primitives to meaning, and carries both light/dark and LTR/RTL values automatically.", l3_tag: "Layer 03 · Components & patterns", l3_title: "Consume semantics only", l3_body: "Every component is built from semantic tokens — never a hard-coded value — so it adapts to any mode or language for free.", cap1: "<b>Documentation platform</b> — overview, live stats, and the three-layer architecture.", cap2: "<b>Six principles</b> — the constraints behind every token, component, and pattern." },
        found: { eyebrow: "Foundations", title: "Colour, type, space — all tokenised", lead: "191 colour tokens across brand, content, background, border, and status groups, each with a light and a dark value. Type pairs a Latin family with an Arabic one at matching optical weight.", cap_colour: "<b>Colour</b> — 191 semantic tokens across five groups, every one with a light and dark value.", cap_type: "<b>Type</b> — 9 roles in two scripts: Latin (Montserrat + Inter) and Arabic (Alexandria + Inter), with a +2&nbsp;px Arabic size bump.", tip: "Tip: click any swatch to copy its hex — the same tokens the products read from.", underneath: "Underneath: a 22-step spacing scale on a 4-pt grid, 8 semantic radius aliases, 4 elevation levels, and 86 Lucide icons at a 1.5 px stroke in three sizes — each with RTL mirroring rules." },
        lib: { eyebrow: "The library", title: "24 components — every state, documented", lead: "From Button — 450 variants because every hierarchy × size × icon position × state is accounted for, not padding for its own sake — to the mobile-native pieces I designed for the task app. Each one is built and documented, ready to drop in.", core_label: "Core components", cap_button: "<b>Button</b> — 450 variants", cap_input: "<b>Input</b> — 336 variants", cap_card: "<b>Card</b> — 12 variants", cap_modal: "<b>Modal</b> — icon × size", mobile_label: "Mobile-native — the layer I designed", cap_task: "<b>Task Card</b> — 17 variants across priority, status, and subtasks", cap_tabnav: "<b>Bottom Tab Nav</b> — active pill + badges", cap_sheet: "<b>Bottom Sheet</b> — collapsed / half / full", patterns_label: "Patterns", cap_charts: "<b>Charts</b> — line, bar, donut, area, sparkline; mobile-first", cap_charttokens: "<b>Chart tokens</b> — palette drawn from primitives + usage rules", note: "<b>A note on what's shown:</b> Iksir is live client work under NDA, so I'm showing only a selection of the design system — a sample of its tokens, components, and patterns, not the full library — and none of the client's production screens or real data. What you see here is a curated slice that's safe to share; the complete system and the products it powers stay private." },
        a11y: { eyebrow: "Accessibility", title: "WCAG 2.1 AA, built into the foundation", lead: "Accessibility was one of the areas I owned. I didn't just document WCAG 2.1 AA — I turned it into tokens, reusable Figma checks (a contrast matrix and a 44×44 touch-target component), and a testing workflow the whole team designs and builds against.", i1_t: "Contrast as a contract", i1_p: "4.5:1 for text, 3:1 for large text and UI — verified across light and dark, with unsafe combinations corrected at the token level.", i2_t: "Never colour alone", i2_p: "ERP statuses always pair colour with an icon and a text label, so meaning survives colour-blindness and greyscale.", i3_t: "Touch & focus tokens", i3_p: "A 44×44 pt minimum touch target and a 2 px offset focus ring are tokenised — keyboard and mobile users are covered by default.", i4_t: "Trilingual screen readers", i4_p: "Dynamic <code>lang</code>/<code>dir</code>, logical reading order, and localised labels so assistive tech reads French, English, and Arabic correctly.", i5_t: "Testable, not just documented", i5_p: "I set up a checking workflow across every surface — contrast plugins in Figma, axe and Lighthouse on web, VoiceOver and TalkBack on mobile — so accessibility is verified at each handoff, not assumed.", i6_t: "Dual-script sizing", i6_p: "Arabic body text is bumped 1–2 px above the Latin baseline, with line-height tokens tuned so complex ligatures never clip in dense data tables." },
        status: { eyebrow: "Where it stands", title: "Shipped, and still evolving", s1_label: "Done", s1_t: "V1 released", s1_p: "Foundations, 24 components, 5 patterns, and the documentation platform — all live as the official V1.", s2_label: "Live & iterating", s2_t: "Adoption & polish", s2_p: "The library is in use and the team now designs and builds against it. My design partner led a polished public version of the site on top of the shared V1.", s3_label: "In progress", s3_t: "Integration strategy", s3_p: "I'm defining how the system rolls into the real products, and keeping governance open until it's fully stable." },
        gov: { eyebrow: "Governance", title: "Rules that keep it coherent as it grows", r1_t: "Always use semantic tokens", r1_p: "Components reference intent (brand/primary), never raw values — this is what makes the system maintainable and mode-switchable.", r2_t: "Respect the three-layer chain", r2_p: "Primitives → semantics → components. Never skip a layer; it breaks the single source of truth.", r3_t: "Light + dark, RTL + LTR, built in", r3_p: "Every semantic token carries both — no parallel colour sets, no manual mirroring.", r4_t: "The docs are the spec", r4_p: "Token references, states, and do/don't guidance are requirements — with a workflow that lets a non-coder publish updates safely." },
        reflect: { eyebrow: "Reflection", quote: "Leading a system means designing the <span>decisions</span>, not just the screens.", p1: "The hardest — and most rewarding — part wasn't drawing components. It was making choices that had to hold up across two engineering stacks, three languages, two colour modes, and a second designer's hands. Getting the architecture and the accessibility right early is what let the library scale without collapsing into exceptions.", p2: "It also reshaped how I work: treating documentation as a product, writing rules that other people can follow without me in the room, and staying accountable for a system long after its first release." },
        closing: { eyebrow: "Let's talk", title: "Have a system like this in mind?", lead: "I design systems, products, and the foundations under them. Tell me what you're building — and let's make it consistent, accessible, and fast to ship." },
        pager: { all: "Back to all case studies", contact: "Get in touch" },
        form: { ptype_label: "What can I help with?", pt_ds: "Design system", pt_web: "Web app / SaaS", pt_mobile: "Mobile app", pt_erp: "ERP / internal tool", pt_other: "Something else" }
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
        theme_to_light: 'Passer en mode clair'
      },
      hero: {
        greeting:      'Bonjour, je suis Nadir Mostefaoui',
        title:         'Designer\nProduit',
        bio:           'Je conçois des interfaces pour des solutions B2B SaaS, des modules ERP, des tableaux de bord, des applications mobiles et des plateformes multi-rôles.',
        cta_primary:   'Discutons',
        cta_secondary: 'Voir mon travail',
        cta_cv:        'Voir le CV',
        scroll:        'Défiler',
        scroll_aria:   'Faire défiler pour explorer',
        stat2_num:     '20+',
        stat2_label:   'Projets\nréalisés',
        stat3_num:     '03',
        stat3_label:   "Pays\nd'expérience"
      },
      work: {
        label:         'TRAVAUX SÉLECTIONNÉS',
        title:         'Études de Cas',
        subtitle:      'Un regard plus proche sur la façon dont je transforme des workflows complexes et riches en données en produits utilisables.',
        nda:           'Confidentialité — détails généralisés, aucune donnée confidentielle',
        cta:           'Voir l\'étude de cas',
        flow_problem:  'Problème',
        flow_approach: 'Approche',
        flow_outcome:  'Résultat',
        cs1: {
          hook:         'Système de Design',
          short:        'Système de Design',
          tag:          'ERP · Système de Design',
          title:        'Système de Design Datamaster',
          role:         'Designer Produit (UI/UX) — designer unique',
          problem:      'Aucune cohérence entre les produits, visuels dépassés et mauvaise réactivité sur une suite ERP en pleine croissance.',
          approach:     'Construction d\'un système de design complet — palette, typographie, grille d\'espacement de 8px, jeu d\'icônes personnalisé et bibliothèque de composants évolutive — documenté pour la passation aux développeurs.',
          outcome:      'Premier déploiement, dans l\'application de gestion des tâches, réduisant le temps d\'exécution des tâches de 50 % lors des tests d\'utilisabilité.',
          stat1_num: '50', stat1_suffix: '%',  stat1_label: 'plus rapide dès le premier déploiement',
          stat2_num: '8',  stat2_suffix: 'px', stat2_label: 'grille d\'espacement',
          tag1: 'Systèmes de Design', tag2: 'Bibliothèque de Composants', tag3: 'Passation Dev'
        },
        cs2: {
          hook:         'Application de Gestion des Tâches',
          short:        'App de Tâches',
          tag:          'Mobile · B2B SaaS',
          title:        'Application de Gestion des Tâches',
          role:         'Designer Produit (UI/UX)',
          problem:      'Opérations d\'entrepôt complexes — inventaire, préparation des commandes, marquage, correction de stock — noyées dans un workflow peu pratique.',
          approach:     'Structuration d\'un flux à 3 niveaux — Vue Liste → Détail de la Tâche → Action/Complétion — itéré directement avec de vrais utilisateurs en supermarché.',
          outcome:      '50 % d\'exécution des tâches plus rapide, moins d\'erreurs de correction de stock, et une référence pour les futurs modules ERP.',
          stat1_num: '50', stat1_suffix: '%', stat1_label: 'exécution des tâches plus rapide',
          stat2_num: '3',  stat2_suffix: '',  stat2_label: 'niveaux dans le flux',
          tag1: 'Mobile-First', tag2: 'Parcours Utilisateur', tag3: 'Tests d\'Utilisabilité'
        },
        cs3: {
          hook:         'Module ERP Ventes B2B',
          short:        'ERP Ventes',
          tag:          'ERP · Opérations Commerciales',
          title:        'Module ERP Ventes B2B',
          role:         'Designer Produit (UI/UX)',
          problem:      'Données clients, commandes et factures fragmentées entre plusieurs outils — écrans denses, faible lisibilité.',
          approach:     'Mise en page à trois zones en moyenne fidélité — navigation, tableaux et actions rapides — priorisant la logique sur la finition à travers 4 parcours de vente de bout en bout.',
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
          approach:     'Processus de Design Thinking mené sur 3 rôles — Enseignant, Admin, Super Admin — avec permissions par rôle et chapitres → leçons → examens modulaires.',
          outcome:      'Les enseignants gèrent désormais entièrement leurs cours sans plateforme externe — un écosystème centralisé prêt à évoluer.',
          stat1_num: '3', stat1_suffix: '', stat1_label: 'rôles utilisateurs conçus',
          stat2_num: '3', stat2_suffix: '', stat2_label: 'tableaux de bord livrés',
          tag1: 'Design Thinking', tag2: 'UX par Rôle', tag3: 'UX Arabe'
        },
        cs5: {
          hook:         'Système de Design',
          short:        'Système de Design',
          tag:          'ERP · Système de Design',
          title:        'Système de Design Iksir',
          role:         'Designer Produit — pilote du projet (équipe de 2)',
          problem:      'Une suite ERP et mobile en croissance sans langage d\'UI commun — composants incohérents, développement lent, et aucune fondation d\'accessibilité ou trilingue.',
          approach:     'Pilotage d\'un système de design orienté tokens — architecture de tokens à trois couches, accessibilité intégrée, fondation trilingue (LTR/RTL) et toute la couche mobile — documenté pour la passation aux développeurs.',
          outcome:      'V1 livrée — et l\'équipe conçoit et développe désormais en s\'appuyant dessus : une source unique de vérité sur le web et le mobile, avec le clair/sombre et le RTL gérés automatiquement.',
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
          desc_0:    '- Datamaster Analytics est le client principal de Nawat Studio — mon rôle simultané chez Datamaster (ci-dessous) correspond donc au même travail, réalisé via le studio.',
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
          desc_a1:   '- Conception de cinq modules ERP de bout en bout : Ventes B2B, Achats, PDV, Finance et Comptabilité — chacun gérant des données denses sur des workflows multi-rôles complexes',
          desc_a2:   '- Construction d\'une bibliothèque de design complète post-rebranding — système de composants Figma et un site dédié rendant le système de design accessible aux non-designers',
          desc_a3:   '- Direction d\'un projet d\'architecture de l\'information pour restructurer et unifier tous les produits existants avant une refonte complète de la plateforme',
          desc_a4:   '- Collaboration quotidienne avec les analystes métier, les responsables techniques et les développeurs front-end et back-end pour livrer des fichiers Figma prêts au développement',
          role_b:    'Designer UI/UX',
          dates_b:   'Sept. 2024 - Nov. 2024',
          desc_b0:   'Mission freelance initiale axée sur le produit mobile de l\'entreprise.',
          desc_b1:   '- Conception d\'une application de gestion des tâches mobile-first pour les équipes d\'entrepôt — design complet de bout en bout sur 2 itérations tout au long du cycle de projet'
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
          desc_1:    '- Conception des tableaux de bord Super Admin, Admin et Enseignant d\'une plateforme e-learning multi-rôles — gestion des cours, flux de création de contenu et suivi de la progression des élèves.',
          desc_2:    '- Refonte d\'une plateforme immobilière — annonces de biens, systèmes de recherche et de filtres, et tableau de bord agent.',
          desc_3:    '- Conception d\'un système de gestion de dossiers pour une organisation caritative soutenant les femmes divorcées — contexte utilisateur sensible nécessitant des parcours clairs et accessibles.',
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
          t1: 'HTML & CSS — Notions de Base',
          t2: 'Développement Web & Mobile — Compréhension de Base'
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
          t1: 'Anglais — Professionnel',
          t2: 'Arabe — Langue Maternelle',
          t3: 'Français — Professionnel'
        }
      },
      footer: {
        badge:            'Disponible pour de nouveaux projets',
        heading:          'Créons quelque chose de formidable',
        subtitle:         "Un projet ou une idée en tête ? J'aimerais en discuter — envoyez un message ou contactez-moi directement ci-dessous.",
        watermark:        'NADIR',
        form_title:       'Envoyer un message',
        form_name:        'Nom',
        form_email:       'Email',
        form_message:     'Message',
        form_send:        'Envoyer le message',
        form_sending:     'Envoi en cours…',
        form_sent:        'Message envoyé !',
        form_error:       "Une erreur s'est produite — veuillez réessayer, ou m'écrire directement par email.",
        contacts_title:   'Contacts Directs',
        contact_email:    'Email',
        contact_linkedin: 'LinkedIn',
        contact_whatsapp: 'WhatsApp',
        contact_instagram:'Instagram',
        copy_label:       "Copier l'adresse email",
        cv_label:         'CV',
        cv_value:         'Aperçu et téléchargement (PDF)',
        cv_title:         'Curriculum Vitae',
        cv_sub:           'Nadir Mostefaoui — Designer Produit',
        cv_download:      'Télécharger le PDF',
        cv_open:          'Ouvrir dans un onglet',
        cv_close:         'Fermer',
        copy_done:        'Copié !',
        copyright:        'Nadir Mostefaoui. Tous droits réservés.'
      },
      cs: {
        ui: { enlarge: "Agrandir", enlarge_aria: "Agrandir l'image", copy: "Copier le code", copied: "Copié !", close: "Fermer" }, hero: { eyebrow: "Étude de cas 01 · Design System", title: "Iksir Design System", sub: "Une base de design orientée tokens — cohérente, accessible et trilingue — sur laquelle reposent les produits web et mobiles de Datamaster.", badge: "Travail client — informations généralisées, aucune donnée confidentielle affichée", role_k: "Rôle", role_v: "Designer Produit — pilote du projet", team_k: "Équipe", team_v: "2 designers", timeline_k: "Période", timeline_v: "Fév. – Juin 2026 · V1", platforms_k: "Plateformes", platforms_v: "Web · iOS · Android", cta: "Lançons un projet comme celui-ci", status: "V1 livrée · web + mobile · en développement actif" },
        stats: { variables: "variables de design", components: "composants", patterns: "modèles UX", colours: "tokens de couleur", languages: "langues (LTR + RTL)", modes: "modes (clair + sombre)" },
        problem: { eyebrow: "Le problème", title: "Une suite de produits en croissance sans langage commun", lead: "Datamaster développe un ERP modulaire et une famille d'applications mobiles sous sa marque produit Iksir. À mesure que la suite grandissait, chaque écran résolvait les mêmes problèmes d'interface depuis zéro.", c1t: "L'incohérence ralentissait tout", c1p: "Couleurs, espacements, boutons et validation de formulaires étaient reconstruits écran par écran et se comportaient différemment d'un produit à l'autre — coûtant du temps de développement et générant des bugs d'interface évitables.", c2t: "Deux stacks, aucun verrouillage", c2p: "Le web migre d'Ant Design vers Shadcn, avec Flutter sur mobile. Le système devait leur transmettre à tous les mêmes décisions via les tokens — tout en restant indépendant des bibliothèques, pour que l'équipe garde la liberté de construire au-delà de n'importe quel framework.", c3t: "Conçu pour trois langues", c3p: "Les produits s'étendent au français, à l'anglais et à l'arabe — l'application de tâches en premier — donc un vrai support de droite à gauche et une typographie bi-script devaient vivre dans la base dès le départ, pas être ajoutés après coup." },
        role: { eyebrow: "Mon rôle", title: "Une équipe de deux — j'ai donné la direction", lead: "Nous étions deux designers produit. J'ai piloté le projet de bout en bout : la stratégie, la relation client et chaque décision fondatrice sur laquelle le système repose. Cette étude de cas présente ma part de ce travail.", mine_tag: "Piloté par moi", mine1: "Stratégie, découverte et relation avec les parties prenantes", mine2: "Toute la stratégie de design tokens et l'architecture à trois couches", mine3: "La base trilingue et de droite à gauche (LTR/RTL)", mine4: "Le cadre d'accessibilité, intégré aux tokens", mine5: "Toute la couche mobile — règles de plateforme et composants mobiles", mine6: "Toute la documentation, les guides et le modèle de gouvernance", mine7: "La structuration du projet et la livraison de la V1 — et la stratégie de déploiement en cours", partner_h: "Mon binôme designer", partner1: "Audit du produit web existant", partner2: "Production Figma des composants web/desktop", partner3: "Construction du site de documentation", partner4: "La passe visuelle soignée ultérieure sur la bibliothèque publique", partner_note: "L'histoire complète de l'équipe vit dans une étude de cas séparée, au nom du studio ; cette page se concentre sur les décisions et le travail que j'ai menés." },
        process: { eyebrow: "Le processus", title: "De l'audit à une V1 livrée", lead: "J'ai structuré le travail en phases — même si, en pratique, elles se chevauchaient et revenaient en arrière au fil des apprentissages, pas en ligne droite. Chacune se terminait néanmoins par une décision sur laquelle la suivante pouvait s'appuyer.", p1_label: "Phase", p1_title: "Audit et alignement", p1_body: "J'ai mené la découverte auprès des parties prenantes pour comprendre l'entreprise, puis rédigé la vision et les critères de réussite. J'ai audité l'application de tâches mobile et découvert qu'elle reposait sur un système totalement autonome, aux valeurs codées en dur — déconnecté de toute base partagée.", p1_call: "<b>Mon choix →</b> reconsidérer ces centaines d'écrans mobiles validés comme le plan directeur de la couche mobile du système, plutôt que comme un problème à nettoyer.", p2_label: "Phase", p2_title: "Fondations", p2_body: "J'ai défini l'architecture des tokens — une convention de nommage stricte (catégorie · propriété · concept · état) posée sur une chaîne à trois couches primitives → sémantiques → composants — pour que les développeurs ne codent plus jamais une valeur en dur. En parallèle, j'ai rédigé l'architecture trilingue/RTL (propriétés logiques, typographie bi-script, règles de miroir des icônes) et un cadre d'accessibilité exprimé directement sous forme de tokens.", p2_call: "<b>La décision qui comptait →</b> faire du clair/sombre et du LTR/RTL des propriétés des tokens eux-mêmes, pour qu'une source unique de vérité s'adapte automatiquement au lieu d'être maintenue en double.", p3_label: "Phase", p3_title: "Composants, couche mobile et documentation", p3_body: "À mesure que la bibliothèque atteignait 24 composants et 5 modèles, j'ai conçu toute la couche mobile — règles de plateforme et composants natifs mobiles (bottom sheets, barres d'onglets, pavé numérique, overlay de scanner, cartes de tâches) — à la fois dans Figma et sur le site de documentation. Puis j'ai structuré le projet et livré la V1.", p3_call: "<b>Le principe que j'ai tenu →</b> traiter la documentation comme un produit à part entière — la spécification unique sur laquelle designers et développeurs travaillent.", loop: "<b>Pas une ligne droite —</b> la couche mobile en est l'exemple le plus clair. Ce que la phase 1 a signalé comme une application de tâches autonome et codée en dur est devenu, en phase 3, la bibliothèque de composants mobiles du système — au fil de plusieurs itérations, pas d'une seule. J'ai conçu la couche ; mon binôme designer a revu chaque passage et l'a poussé plus loin ; et chaque boucle a affiné les composants jusqu'à ce qu'ils tiennent en tant que système." },
        system: { eyebrow: "Le système", title: "Trois couches, une source unique de vérité", lead: "Chaque couche ne consomme que celle du dessous. Sautez une couche et vous brisez la garantie de source unique — les composants ne touchent donc jamais aux valeurs brutes.", delivers: "<b>Ce que cela apporte —</b> changez une décision une fois et chaque produit en hérite : une source unique de vérité pour deux stacks d'ingénierie, le clair/sombre et le RTL résolus automatiquement, et le WCAG AA appliqué au niveau des tokens.", l1_tag: "Couche 01 · Primitives", l1_title: "Valeurs brutes, nommées par valeur", l1_body: "Codes hexadécimaux, tailles en pixels, durées. Le seul endroit où une valeur littérale est écrite.", l2_tag: "Couche 02 · Tokens sémantiques", l2_title: "Nommés par intention — la seule couche que les composants utilisent", l2_body: "Fait correspondre les primitives à un sens et porte automatiquement les valeurs clair/sombre et LTR/RTL.", l3_tag: "Couche 03 · Composants et modèles", l3_title: "Ne consomment que le sémantique", l3_body: "Chaque composant est construit à partir de tokens sémantiques — jamais une valeur codée en dur — il s'adapte donc gratuitement à tout mode ou toute langue.", cap1: "<b>Plateforme de documentation</b> — vue d'ensemble, statistiques en direct et l'architecture à trois couches.", cap2: "<b>Six principes</b> — les contraintes derrière chaque token, composant et modèle." },
        found: { eyebrow: "Fondations", title: "Couleur, typographie, espace — tout en tokens", lead: "191 tokens de couleur répartis en groupes marque, contenu, arrière-plan, bordure et statut, chacun avec une valeur claire et une valeur sombre. La typographie associe une famille latine à une famille arabe de poids optique équivalent.", cap_colour: "<b>Couleur</b> — 191 tokens sémantiques répartis en cinq groupes, chacun avec une valeur claire et sombre.", cap_type: "<b>Typographie</b> — 9 rôles en deux écritures : latine (Montserrat + Inter) et arabe (Alexandria + Inter), avec un bonus de +2&nbsp;px pour l'arabe.", tip: "Astuce : cliquez sur un échantillon pour copier son code hex — les mêmes tokens que lisent les produits.", underneath: "En dessous : une échelle d'espacement à 22 pas sur une grille de 4 pt, 8 alias de rayon sémantiques, 4 niveaux d'élévation et 86 icônes Lucide au trait de 1,5 px en trois tailles — chacune avec ses règles de miroir RTL." },
        lib: { eyebrow: "La bibliothèque", title: "24 composants — chaque état, documenté", lead: "Du bouton — 450 variantes parce que chaque hiérarchie × taille × position d'icône × état est couverte, non pour gonfler les chiffres — jusqu'aux pièces natives mobiles que j'ai conçues pour l'application de tâches. Chacune est construite et documentée, prête à l'emploi.", core_label: "Composants principaux", cap_button: "<b>Bouton</b> — 450 variantes", cap_input: "<b>Champ de saisie</b> — 336 variantes", cap_card: "<b>Carte</b> — 12 variantes", cap_modal: "<b>Fenêtre modale</b> — icône × taille", mobile_label: "Natifs mobiles — la couche que j'ai conçue", cap_task: "<b>Carte de tâche</b> — 17 variantes selon priorité, statut et sous-tâches", cap_tabnav: "<b>Barre d'onglets</b> — pastille active + badges", cap_sheet: "<b>Bottom sheet</b> — repliée / à mi-hauteur / plein écran", patterns_label: "Modèles", cap_charts: "<b>Graphiques</b> — courbe, barres, donut, aire, sparkline ; pensés mobile d'abord", cap_charttokens: "<b>Tokens de graphiques</b> — palette issue des primitives + règles d'usage", note: "<b>Une note sur ce qui est montré :</b> Iksir est un travail client en cours sous NDA ; je ne montre donc qu'une sélection du design system — un échantillon de ses tokens, composants et modèles, pas la bibliothèque complète — et aucun écran de production du client ni aucune donnée réelle. Ce que vous voyez ici est un extrait choisi, sûr à partager ; le système complet et les produits qu'il alimente restent privés." },
        a11y: { eyebrow: "Accessibilité", title: "WCAG 2.1 AA, intégrée à la base", lead: "L'accessibilité faisait partie des domaines que je pilotais. Je n'ai pas seulement documenté le WCAG 2.1 AA — je l'ai transformé en tokens, en vérifications Figma réutilisables (une matrice de contraste et un composant de zone tactile 44×44) et en un flux de test avec lequel toute l'équipe conçoit et construit.", i1_t: "Le contraste comme contrat", i1_p: "4,5:1 pour le texte, 3:1 pour le grand texte et l'UI — vérifiés en clair comme en sombre, les combinaisons risquées étant corrigées au niveau des tokens.", i2_t: "Jamais la couleur seule", i2_p: "Les statuts ERP associent toujours la couleur à une icône et à un libellé, pour que le sens survive au daltonisme et aux niveaux de gris.", i3_t: "Tokens de zone tactile et de focus", i3_p: "Une zone tactile minimale de 44×44 pt et un anneau de focus décalé de 2 px sont en tokens — les utilisateurs au clavier et sur mobile sont couverts par défaut.", i4_t: "Lecteurs d'écran trilingues", i4_p: "Attributs <code>lang</code>/<code>dir</code> dynamiques, ordre de lecture logique et libellés localisés, pour que les technologies d'assistance lisent correctement le français, l'anglais et l'arabe.", i5_t: "Testable, pas seulement documentée", i5_p: "J'ai mis en place un flux de vérification sur chaque surface — plugins de contraste dans Figma, axe et Lighthouse sur le web, VoiceOver et TalkBack sur mobile — pour que l'accessibilité soit vérifiée à chaque passation, jamais supposée.", i6_t: "Dimensionnement bi-script", i6_p: "Le texte courant arabe est augmenté de 1 à 2 px par rapport à la ligne de base latine, avec des tokens de hauteur de ligne ajustés pour que les ligatures complexes ne soient jamais coupées dans les tableaux de données denses." },
        status: { eyebrow: "Où en est le projet", title: "Livré, et en constante évolution", s1_label: "Fait", s1_t: "V1 publiée", s1_p: "Fondations, 24 composants, 5 modèles et la plateforme de documentation — tout est en ligne comme V1 officielle.", s2_label: "En ligne et en itération", s2_t: "Adoption et finitions", s2_p: "La bibliothèque est utilisée et l'équipe conçoit et développe désormais en s'appuyant dessus. Mon binôme designer a piloté une version publique soignée du site par-dessus la V1 partagée.", s3_label: "En cours", s3_t: "Stratégie d'intégration", s3_p: "Je définis comment le système s'intègre aux vrais produits, et je garde la gouvernance ouverte jusqu'à ce qu'il soit pleinement stable." },
        gov: { eyebrow: "Gouvernance", title: "Des règles qui la gardent cohérente en grandissant", r1_t: "Toujours utiliser des tokens sémantiques", r1_p: "Les composants référencent l'intention (brand/primary), jamais les valeurs brutes — c'est ce qui rend le système maintenable et compatible avec le changement de mode.", r2_t: "Respecter la chaîne à trois couches", r2_p: "Primitives → sémantiques → composants. Ne jamais sauter une couche ; cela brise la source unique de vérité.", r3_t: "Clair + sombre, RTL + LTR, intégrés", r3_p: "Chaque token sémantique porte les deux — aucun jeu de couleurs parallèle, aucun miroir manuel.", r4_t: "La documentation, c'est la spécification", r4_p: "Références de tokens, états et recommandations à faire ou à éviter sont des exigences — avec un flux qui permet à une personne non technique de publier des mises à jour en toute sécurité." },
        reflect: { eyebrow: "Réflexion", quote: "Piloter un système, c'est concevoir les <span>décisions</span>, pas seulement les écrans.", p1: "Le plus difficile — et le plus gratifiant — n'était pas de dessiner des composants. C'était de faire des choix qui devaient tenir sur deux stacks techniques, trois langues, deux modes de couleur et entre les mains d'un second designer. Avoir posé tôt l'architecture et l'accessibilité, c'est ce qui a permis à la bibliothèque de grandir sans s'effondrer en exceptions.", p2: "Cela a aussi transformé ma façon de travailler : traiter la documentation comme un produit, écrire des règles que d'autres peuvent suivre sans moi dans la pièce, et rester responsable d'un système bien après sa première version." },
        closing: { eyebrow: "Discutons", title: "Un système comme celui-ci en tête ?", lead: "Je conçois des systèmes, des produits et les fondations en dessous. Dites-moi ce que vous construisez — et rendons-le cohérent, accessible et rapide à livrer." },
        pager: { all: "Retour aux études de cas", contact: "Me contacter" },
        form: { ptype_label: "Comment puis-je aider ?", pt_ds: "Design system", pt_web: "App web / SaaS", pt_mobile: "App mobile", pt_erp: "ERP / outil interne", pt_other: "Autre chose" }
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
        theme_to_light: 'التبديل إلى الوضع الفاتح'
      },
      hero: {
        greeting:      'مرحباً، أنا نَذِير مصطفاوي',
        title:         'مُصَمِّم\nمُنتَجَات',
        bio:           'أصمم واجهات المنتجات لحلول B2B SaaS ووحدات ERP ولوحات المبيعات والتطبيقات ذات الأولوية للجوال ومنصات المؤسسات متعددة الأدوار.',
        cta_primary:   'لنتحدث',
        cta_secondary: 'شاهد أعمالي',
        cta_cv:        'عرض السيرة الذاتية',
        scroll:        'مرّر',
        scroll_aria:   'مرّر للاستكشاف',
        stat2_num:     '+20',
        stat2_label:   'مشروع\nمُنجَز',
        stat3_num:     '03',
        stat3_label:   'دول\nعملت فيها'
      },
      work: {
        label:         'أعمال مختارة',
        title:         'دراسات حالة',
        subtitle:      'نظرة أقرب على كيفية تحويلي لسير عمل معقد وكثيف البيانات إلى منتجات سهلة الاستخدام.',
        nda:           'اتفاقية سرية — التفاصيل مُعمَّمة، دون أي بيانات سرّية',
        cta:           'عرض دراسة الحالة',
        flow_problem:  'المشكلة',
        flow_approach: 'النهج',
        flow_outcome:  'النتيجة',
        cs1: {
          hook:         'نظام تصميم',
          short:        'نظام تصميم',
          tag:          'ERP · نظام تصميم',
          title:        'نظام تصميم Datamaster',
          role:         'مصمم منتج (UI/UX) — المصمم الوحيد',
          problem:      'غياب الاتساق بين المنتجات، وواجهات بصرية قديمة، وضعف في الاستجابة عبر مجموعة ERP في نمو متسارع.',
          approach:     'بناء نظام تصميم متكامل من الصفر — لوحة ألوان، طباعة، شبكة تباعد بمقاس 8px، مجموعة أيقونات مخصصة، ومكتبة مكونات متنامية — موثّقة لتسليمها للمطورين.',
          outcome:      'التطبيق الأول، في تطبيق إدارة المهام، خفّض زمن تنفيذ المهام بنسبة 50% في اختبارات قابلية الاستخدام.',
          stat1_num: '50', stat1_suffix: '%', stat1_label: 'أسرع في أول تطبيق',
          stat2_num: '8',  stat2_suffix: 'px', stat2_label: 'نظام شبكة التباعد',
          tag1: 'أنظمة التصميم', tag2: 'مكتبة المكونات', tag3: 'تسليم للمطورين'
        },
        cs2: {
          hook:         'تطبيق إدارة المهام',
          short:        'تطبيق المهام',
          tag:          'جوال · B2B SaaS',
          title:        'تطبيق إدارة المهام',
          role:         'مصمم منتج (UI/UX)',
          problem:      'عمليات مستودعات معقدة — الجرد، تجهيز الطلبات، الوسم، تصحيح المخزون — مدفونة في سير عمل غير عملي.',
          approach:     'هيكلة تدفق من 3 طبقات — عرض القائمة ← تفاصيل المهمة ← الإجراء/الإنجاز — مع تكرار مباشر مع مستخدمين حقيقيين في متاجر السوبر ماركت.',
          outcome:      'تنفيذ أسرع للمهام بنسبة 50%، أخطاء أقل في تصحيح المخزون، ومرجع لوحدات ERP المستقبلية.',
          stat1_num: '50', stat1_suffix: '%', stat1_label: 'تنفيذ أسرع للمهام',
          stat2_num: '3',  stat2_suffix: '',  stat2_label: 'طبقات في تدفق المهام',
          tag1: 'أولوية الجوال', tag2: 'مسارات المستخدم', tag3: 'اختبار قابلية الاستخدام'
        },
        cs3: {
          hook:         'وحدة ERP لمبيعات B2B',
          short:        'ERP للمبيعات',
          tag:          'ERP · عمليات المبيعات',
          title:        'وحدة ERP لمبيعات B2B',
          role:         'مصمم منتج (UI/UX)',
          problem:      'بيانات العملاء والطلبات والفواتير مبعثرة بين أدوات متعددة — شاشات مزدحمة وقابلية قراءة ضعيفة.',
          approach:     'تصميم بدقة متوسطة بثلاث مناطق — تنقل وجداول وإجراءات سريعة — يُقدّم المنطق على الصقل عبر 4 مسارات مبيعات متكاملة.',
          outcome:      'تسلسل هرمي واضح للبيانات عبر مسار كامل من عرض السعر إلى الإرجاع، وأساس التصميم لأربع وحدات ERP إضافية.',
          stat1_num: '8',   stat1_suffix: '', stat1_label: 'شاشات أساسية',
          stat2_num: '50',  stat2_suffix: '', stat2_label: 'حالة إطار',
          stat3_num: '9.1', stat3_suffix: '', stat3_label: 'الإصدار الذي تم بلوغه',
          tag1: 'تصور البيانات', tag2: 'تجربة مستخدم للمؤسسات', tag3: 'النماذج الأولية'
        },
        cs4: {
          hook:         'منصة تعليم إلكتروني',
          short:        'تعليم إلكتروني',
          tag:          'تعليم إلكتروني · منصة متعددة الأدوار',
          title:        'منصة تعليم إلكتروني',
          role:         'مصمم منتج (UI/UX)',
          problem:      'كان المعلمون يستضيفون دروسهم على يوتيوب دون أي تحكم في الدورات أو الطلاب أو التحليلات.',
          approach:     'تطبيق منهجية التفكير التصميمي عبر 3 أدوار — معلم، مسؤول، مسؤول عام — مع صلاحيات مبنية على الأدوار وفصول معيارية ← دروس ← اختبارات.',
          outcome:      'أصبح بإمكان المعلمين الآن إدارة دوراتهم بالكامل دون الحاجة لمنصات خارجية — نظام مركزي جاهز للتوسّع.',
          stat1_num: '3', stat1_suffix: '', stat1_label: 'أدوار مستخدمين مصمَّمة',
          stat2_num: '3', stat2_suffix: '', stat2_label: 'لوحات تحكم مُسلَّمة',
          tag1: 'التفكير التصميمي', tag2: 'تجربة مستخدم حسب الدور', tag3: 'تجربة مستخدم عربية'
        },
        cs5: {
          hook:         'نظام تصميم',
          short:        'نظام تصميم',
          tag:          'ERP · نظام تصميم',
          title:        'نظام تصميم Iksir',
          role:         'مصمم منتج — قاد المشروع (فريق من شخصين)',
          problem:      'مجموعة ERP وتطبيقات جوال متنامية دون لغة واجهة موحّدة — مكوّنات غير متسقة، وبناء بطيء، ودون أساس للوصولية أو تعدّد اللغات.',
          approach:     'قيادة نظام تصميم قائم على الـtokens — بنية tokens من ثلاث طبقات، ووصولية مدمجة، وأساس ثلاثي اللغة (LTR/RTL)، وكامل طبقة الجوال — موثّق لتسليمه للمطورين.',
          outcome:      'إطلاق النسخة الأولى — وصار الفريق يصمّم ويبني استنادًا إليها: مصدر حقيقة واحد عبر الويب والموبايل، مع معالجة الوضعين الفاتح/الداكن واتجاه RTL تلقائيًا.',
          stat1_num: '1033', stat1_suffix: '', stat1_label: 'متغيّرات التصميم',
          stat2_num: '24', stat2_suffix: '', stat2_label: 'مكوّنات مُطلقة',
          tag1: 'أنظمة التصميم', tag2: 'الوصولية', tag3: 'رموز التصميم'
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
          company:   'أستديو نواة',
          role:      'مصمم منتج',
          city:      'تلمسان',
          country:   'الجزائر',
          work_type: 'عن بُعد',
          dates:     'يناير 2026 - حتى الآن',
          duration:  '7 أشهر',
          desc_0:    '- شركة Datamaster Analytics هي العميل الرئيسي لاستوديو نواة — لذا فإن دوري المتزامن في Datamaster (أدناه) هو نفس العمل، مُنجَز عبر الاستوديو.',
          desc_1:    '- قيادة تصميم المنتج لعملاء B2B SaaS وبرامج المؤسسات',
          desc_2:    '- الإشراف على مصمم منتج وتوجيهه، ومراجعة التسليمات وضمان جودة التصميم.',
          desc_3:    '- تسليم واجهات ERP وأنظمة التصميم وإعادة هيكلة معمارية المعلومات عبر مشاريع العملاء.'
        },
        dma: {
          company:   'Datamaster Analytics',
          city:      'بيزون، إيل-دو-فرانس',
          country:   'فرنسا',
          work_type: 'عن بُعد',
          dates:     'سبتمبر 2024 - حتى الآن',
          duration:  'سنة و11 شهرًا',
          role_a:    'مصمم منتج',
          dates_a:   'ديسمبر 2024 - حتى الآن',
          desc_a0:   'المصمم الوحيد لمنصة ERP في مرحلة نمو متسارعة، المسؤول عن النطاق الكامل للتصميم عبر وحدات أعمال متعددة ونظام تصميم متكامل عقب إعادة تحديد هوية العلامة التجارية.',
          desc_a1:   '- تصميم خمسة وحدات ERP من الألف إلى الياء: المبيعات B2B، والمشتريات، ونقاط البيع، والمالية والمحاسبة — كل منها يتعامل مع كثافة بيانات عالية عبر سير عمل معقدة متعددة الأدوار',
          desc_a2:   '- بناء مكتبة تصميم شاملة عقب إعادة تحديد الهوية — نظام مكونات Figma وموقع مخصص يجعل نظام التصميم في متناول غير المصممين',
          desc_a3:   '- قيادة مشروع معمارية المعلومات لإعادة هيكلة جميع المنتجات الحالية وتوحيدها قبل إعادة تصميم المنصة بالكامل',
          desc_a4:   '- التعاون اليومي مع محللي الأعمال والقادة التقنيين ومطوري الواجهة الأمامية والخلفية لتسليم ملفات Figma جاهزة للتطوير',
          role_b:    'مصمم UI/UX',
          dates_b:   'سبتمبر 2024 - نوفمبر 2024',
          desc_b0:   'مهمة فريلانس أولية مركّزة على المنتج الجوّال للشركة.',
          desc_b1:   '- تصميم تطبيق إدارة مهام بأولوية للجوّال لفرق مستودعات التجزئة — تصميم متكامل من الألف إلى الياء عبر تكرارين على مدار دورة المشروع'
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
          desc_1:    '- تصميم لوحات تحكم المسؤول العام والمسؤول والمعلم لمنصة تعليم إلكتروني متعددة الأدوار — إدارة الدورات وتدفقات إنشاء المحتوى وتتبع تقدم الطلاب.',
          desc_2:    '- إعادة تصميم منصة عقارية — قوائم العقارات وأنظمة البحث والتصفية ولوحة تحكم الوكيل.',
          desc_3:    '- تصميم نظام إدارة قضايا لمنظمة خيرية تدعم المطلقات — سياق مستخدم حساس يتطلب تدفقات واضحة وسهلة الوصول.',
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
          desc_0:    'إجراء مراجعة UX لمنصة التجارة الإلكترونية لشركة بيع بالجملة B2B (قطاع مستحضرات التجميل والمنظفات).',
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
          t2: 'أجايل / سكرم',
          t3: 'إطار التفكير التصميمي',
          t4: 'التواصل مع أصحاب المصلحة',
          t5: 'نقد التصميم وتقديم الملاحظات'
        },
        ux: {
          title: 'مهارات تجربة المستخدم',
          t1: 'أبحاث المستخدم',
          t2: 'اختبار قابلية الاستخدام',
          t3: 'التأطير الشبكي والنماذج الأولية',
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
          t5: 'الطباعة والتنضيد',
          t6: 'نظرية الألوان'
        },
        tools: {
          title: 'أدوات التصميم'
        },
        technical: {
          title: 'المهارات التقنية',
          t1: 'HTML و CSS — أساسيات',
          t2: 'تطوير الويب والجوال — فهم أساسي'
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
          t1: 'الإنجليزية — احترافية',
          t2: 'العربية — اللغة الأم',
          t3: 'الفرنسية — احترافية'
        }
      },
      footer: {
        badge:            'متاح لمشاريع جديدة',
        heading:          'لنبنِ شيئًا رائعًا معًا',
        subtitle:         'لديك فكرة أو مشروع في ذهنك؟ يسعدني معرفة المزيد — أرسل رسالة أو تواصل معي مباشرة أدناه.',
        watermark:        'نذير',
        form_title:       'أرسل رسالة',
        form_name:        'الاسم',
        form_email:       'البريد الإلكتروني',
        form_message:     'الرسالة',
        form_send:        'إرسال الرسالة',
        form_sending:     'جارٍ الإرسال…',
        form_sent:        'تم إرسال الرسالة!',
        form_error:       'حدث خطأ ما — يرجى المحاولة مرة أخرى أو مراسلتي مباشرة عبر البريد الإلكتروني.',
        contacts_title:   'التواصل المباشر',
        contact_email:    'البريد الإلكتروني',
        contact_linkedin: 'لينكدإن',
        contact_whatsapp: 'واتساب',
        contact_instagram:'إنستغرام',
        copy_label:       'نسخ البريد الإلكتروني',
        cv_label:         'السيرة الذاتية',
        cv_value:         'معاينة وتحميل (PDF)',
        cv_title:         'السيرة الذاتية',
        cv_sub:           'نذير مصطفاوي — مصمم منتجات',
        cv_download:      'تحميل PDF',
        cv_open:          'فتح في تبويب جديد',
        cv_close:         'إغلاق',
        copy_done:        'تم النسخ!',
        copyright:        'نذير مصطفاوي. جميع الحقوق محفوظة.'
      },
      cs: {
        ui: { enlarge: "تكبير", enlarge_aria: "تكبير الصورة", copy: "نسخ الكود", copied: "تم النسخ!", close: "إغلاق" }, hero: { eyebrow: "دراسة حالة 01 · Design System", title: "نظام تصميم Iksir", sub: "أساس تصميم قائم على الـtokens — متسق وسهل الوصول وثلاثي اللغة — تعتمد عليه منتجات Datamaster على الويب والموبايل.", badge: "عمل لعميل — التفاصيل معمّمة، ولا تظهر أي بيانات سرية", role_k: "الدور", role_v: "مصمم منتج — قاد المشروع", team_k: "الفريق", team_v: "مصمّمان", timeline_k: "المدة", timeline_v: "فبراير – يونيو 2026 · V1", platforms_k: "المنصات", platforms_v: "الويب · iOS · Android", cta: "لنبدأ مشروعًا مثل هذا", status: "النسخة V1 مُطلَقة · ويب + موبايل · قيد التطوير النشط" },
        stats: { variables: "متغيّرات تصميم", components: "مكوّنات", patterns: "أنماط UX", colours: "رموز لونية (tokens)", languages: "لغات (LTR + RTL)", modes: "وضعان (فاتح + داكن)" },
        problem: { eyebrow: "المشكلة", title: "مجموعة منتجات متنامية دون لغة مشتركة", lead: "تبني Datamaster نظام ERP معياريًا وعائلة من تطبيقات الموبايل تحت علامتها Iksir. ومع نمو المجموعة، كانت كل شاشة تحلّ نفس مشاكل الواجهة من الصفر.", c1t: "عدم الاتساق كان يبطّئ كل شيء", c1p: "الألوان والتباعدات والأزرار والتحقّق من النماذج كانت تُعاد بناؤها في كل شاشة وتتصرّف بشكل مختلف بين المنتجات — ممّا يكلّف وقت تطوير ويُنتج أخطاء واجهة يمكن تجنّبها.", c2t: "منصّتان، دون تقييد", c2p: "الويب ينتقل من Ant Design إلى Shadcn، مع Flutter على الموبايل. كان على النظام أن يمدّها جميعًا بالقرارات نفسها عبر الـtokens — مع بقائه مستقلًّا عن أي مكتبة، لكي يحتفظ الفريق بحرية البناء خارج أي إطار عمل واحد.", c3t: "مبني لثلاث لغات", c3p: "المنتجات تتوسّع إلى الفرنسية والإنجليزية والعربية — تطبيق المهام أولًا — لذا كان لا بد أن يعيش دعم الكتابة من اليمين إلى اليسار والطباعة ثنائية النص داخل الأساس منذ البداية، لا أن يُضاف لاحقًا." },
        role: { eyebrow: "دوري", title: "فريق من شخصين — أنا من رسم الاتجاه", lead: "كنّا مصمّمَي منتج. قدتُ المشروع من البداية إلى النهاية: الاستراتيجية، والعلاقة مع العميل، وكل قرار تأسيسي يقوم عليه النظام. تعرض هذه الدراسة الجزء الخاص بي من هذا العمل.", mine_tag: "بقيادتي", mine1: "الاستراتيجية والاستكشاف والعلاقة مع الأطراف المعنية لدى العميل", mine2: "كامل استراتيجية الـdesign tokens والبنية ذات الطبقات الثلاث", mine3: "الأساس ثلاثي اللغة ومن اليمين إلى اليسار (LTR/RTL)", mine4: "إطار إمكانية الوصول، مدمَجًا داخل الـtokens", mine5: "كامل طبقة الموبايل — قواعد المنصّة والمكوّنات المخصّصة للموبايل", mine6: "كل التوثيق والأدلة ونموذج الحَوكمة", mine7: "هيكلة المشروع وإطلاق V1 — واستراتيجية التبنّي الجارية الآن", partner_h: "شريكي في التصميم", partner1: "تدقيق المنتج الويب الحالي", partner2: "إنتاج مكوّنات الويب/سطح المكتب في Figma", partner3: "بناء موقع التوثيق", partner4: "التحسين البصري اللاحق للمكتبة العامة", partner_note: "قصة الفريق الكاملة موجودة في دراسة حالة منفصلة باسم الاستوديو؛ هذه الصفحة تركّز على القرارات والعمل الذي أنجزته بنفسي." },
        process: { eyebrow: "المسار", title: "من التدقيق إلى نسخة V1 مُطلَقة", lead: "هيكلتُ العمل في مراحل — وإن كانت في الواقع متداخلة وتعود إلى الوراء مع كل ما نتعلّمه، لا في خط مستقيم. ومع ذلك كانت كل مرحلة تُختَم بقرار تبني عليه المرحلة التالية.", p1_label: "المرحلة", p1_title: "التدقيق والمواءمة", p1_body: "أجريتُ استكشافًا مع الأطراف المعنية لفهم النشاط، ثم كتبتُ الرؤية ومعايير النجاح. دقّقتُ تطبيق المهام على الموبايل فوجدتُه يعمل بنظام مستقلّ تمامًا وبقيم مكتوبة يدويًا — منفصلًا عن أي أساس مشترك.", p1_call: "<b>قراري:</b> إعادة النظر في مئات شاشات الموبايل المُثبَتة باعتبارها المخطّط المرجعي لطبقة الموبايل في النظام، بدلًا من التعامل معها كمشكلة يجب تنظيفها.", p2_label: "المرحلة", p2_title: "الأساسات", p2_body: "حدّدتُ بنية الـtokens — نظام تسمية صارم (فئة · خاصية · مفهوم · حالة) قائم على سلسلة من ثلاث طبقات: primitives ثم semantics ثم components — حتى لا يكتب المطوّرون قيمة يدويًا مرة أخرى أبدًا. وإلى جانب ذلك، وضعتُ البنية ثلاثية اللغة/RTL (الخصائص المنطقية، الطباعة ثنائية النص، قواعد عكس الأيقونات) وإطار إمكانية وصول مُعبَّرًا عنه مباشرة على شكل tokens.", p2_call: "<b>القرار الحاسم:</b> جعل الوضعين الفاتح/الداكن واتجاهي LTR/RTL خصائص للـtokens نفسها، لكي يتكيّف مصدر الحقيقة الواحد تلقائيًا بدلًا من صيانته مرتين.", p3_label: "المرحلة", p3_title: "المكوّنات وطبقة الموبايل والتوثيق", p3_body: "مع اتساع المكتبة إلى 24 مكوّنًا و5 أنماط، صمّمتُ كامل طبقة الموبايل — قواعد المنصّة والمكوّنات المخصّصة للموبايل (bottom sheets، أشرطة التبويب، لوحة الأرقام، طبقة الماسح، بطاقات المهام) — في Figma وعلى موقع التوثيق معًا. ثم هيكلتُ المشروع وأطلقتُ V1.", p3_call: "<b>المبدأ الذي تمسّكتُ به:</b> التعامل مع التوثيق كمنتج قائم بذاته — المرجع الوحيد الذي يعمل منه المصمّمون والمطوّرون معًا.", loop: "<b>ليس خطًّا مستقيمًا —</b> الطبقة المخصّصة للموبايل هي المثال الأوضح. ما رصدته المرحلة 1 كتطبيق مهام منفصل ومكتوب يدويًا أصبح في المرحلة 3 مكتبة مكوّنات الموبايل في النظام — عبر عدّة تكرارات، لا مرّة واحدة. صمّمتُ الطبقة، وراجعها شريكي المصمّم في كل جولة ودفعها أبعد، وكل دورة شدّت المكوّنات حتى صمدت كنظام." },
        system: { eyebrow: "النظام", title: "ثلاث طبقات، مصدر واحد للحقيقة", lead: "كل طبقة لا تستهلك إلا التي تحتها مباشرة. تجاوَز طبقة واحدة وتكسر ضمان المصدر الواحد للحقيقة — لذا لا تلمس المكوّنات القيم الخام أبدًا.", delivers: "<b>ما الذي يمنحه ذلك —</b> غيّر قرارًا مرة واحدة فيرثه كل منتج: مصدر حقيقة واحد عبر منصّتَي تطوير، والوضعان الفاتح/الداكن واتجاه RTL يُحلّان تلقائيًا، ومعيار WCAG AA مطبّق على مستوى الـtokens.", l1_tag: "الطبقة 01 · Primitives", l1_title: "قيم خام، مُسمّاة بقيمتها", l1_body: "أكواد hex وأحجام بالبكسل ومدد زمنية. المكان الوحيد الذي تُكتب فيه قيمة صريحة.", l2_tag: "الطبقة 02 · الـtokens السيمانتيكية", l2_title: "مُسمّاة بالنيّة — الطبقة الوحيدة التي تستخدمها المكوّنات", l2_body: "تربط الـprimitives بالمعنى، وتحمل تلقائيًا قيم الوضعين الفاتح/الداكن واتجاهي LTR/RTL.", l3_tag: "الطبقة 03 · المكوّنات والأنماط", l3_title: "لا تستهلك إلا السيمانتيكي", l3_body: "كل مكوّن مبني من tokens سيمانتيكية — لا قيمة مكتوبة يدويًا أبدًا — لذا يتكيّف مع أي وضع أو لغة بلا تكلفة.", cap1: "<b>منصّة التوثيق</b> — نظرة عامة وإحصاءات حيّة والبنية ذات الطبقات الثلاث.", cap2: "<b>ستة مبادئ</b> — القيود التي تقف خلف كل token ومكوّن ونمط." },
        found: { eyebrow: "الأساسات", title: "اللون والطباعة والمسافات — كلها في tokens", lead: "191 token لونيًا موزّعة على مجموعات: العلامة، المحتوى، الخلفية، الحدود، والحالة، لكل منها قيمة فاتحة وأخرى داكنة. وتقرن الطباعة عائلة لاتينية بعائلة عربية بوزن بصري متكافئ.", cap_colour: "<b>اللون</b> — 191 token سيمانتيكيًا موزّعة على خمس مجموعات، لكل منها قيمة فاتحة وداكنة.", cap_type: "<b>الطباعة</b> — 9 أدوار في نصّين: لاتيني (Montserrat + Inter) وعربي (Alexandria + Inter)، مع زيادة +2&nbsp;px للعربية.", tip: "نصيحة: انقر أي عيّنة لنسخ كود الـhex — نفس الـtokens التي تقرأها المنتجات.", underneath: "وتحت ذلك: مقياس تباعد من 22 خطوة على شبكة 4pt، و8 أسماء مستعارة سيمانتيكية لنصف القطر، و4 مستويات ارتفاع، و86 أيقونة Lucide بسُمك 1.5px في ثلاثة أحجام — كل منها بقواعد عكسها في RTL." },
        lib: { eyebrow: "المكتبة", title: "24 مكوّنًا — كل حالة موثّقة", lead: "من الزر — 450 نسخة لأن كل تسلسل × حجم × موضع أيقونة × حالة محسوب، لا حشوًا لذاته — إلى القطع المخصّصة للموبايل التي صمّمتُها لتطبيق المهام. كل واحدة مبنية وموثّقة، جاهزة للاستخدام.", core_label: "المكوّنات الأساسية", cap_button: "<b>الزر</b> — 450 نسخة", cap_input: "<b>حقل الإدخال</b> — 336 نسخة", cap_card: "<b>البطاقة</b> — 12 نسخة", cap_modal: "<b>النافذة المنبثقة</b> — أيقونة × حجم", mobile_label: "المخصّصة للموبايل — الطبقة التي صمّمتُها", cap_task: "<b>بطاقة المهمة</b> — 17 نسخة حسب الأولوية والحالة والمهام الفرعية", cap_tabnav: "<b>شريط التبويب السفلي</b> — مؤشّر نشط + شارات", cap_sheet: "<b>Bottom sheet</b> — مطوية / نصفية / كاملة", patterns_label: "الأنماط", cap_charts: "<b>الرسوم البيانية</b> — خطية، أعمدة، دونات، مساحية، sparkline؛ مصمّمة للموبايل أولًا", cap_charttokens: "<b>tokens الرسوم</b> — لوحة مشتقّة من الـprimitives + قواعد الاستخدام", note: "<b>ملاحظة حول ما يُعرَض:</b> Iksir عمل حيّ لعميل تحت اتفاقية سرية (NDA)، لذا أعرض جزءًا مختارًا فقط من نظام التصميم — عيّنة من الـtokens والمكوّنات والأنماط، لا المكتبة الكاملة — ولا أي شاشات إنتاج لدى العميل أو بيانات حقيقية. ما ترونه هنا نموذج منتقى آمن للمشاركة؛ أما النظام الكامل والمنتجات التي يشغّلها فتبقى خاصة." },
        a11y: { eyebrow: "إمكانية الوصول", title: "WCAG 2.1 AA، مدمجة في الأساس", lead: "كانت إمكانية الوصول من المجالات التي أتولّاها. لم أكتفِ بتوثيق WCAG 2.1 AA — بل حوّلتُه إلى tokens، وإلى فحوص قابلة لإعادة الاستخدام في Figma (مصفوفة تباين ومكوّن هدف لمسي 44×44)، وإلى تدفّق اختبار يصمّم ويبني عليه الفريق كله.", i1_t: "التباين كعقد", i1_p: "4.5:1 للنص، و3:1 للنص الكبير وعناصر الواجهة — مُتحقَّق منها في الوضعين الفاتح والداكن، مع تصحيح التركيبات غير الآمنة على مستوى الـtokens.", i2_t: "لا اعتماد على اللون وحده", i2_p: "تقرن حالات ERP اللونَ دائمًا بأيقونة ونص، لكي يبقى المعنى قائمًا مع عمى الألوان والتدرّج الرمادي.", i3_t: "tokens للهدف اللمسي والتركيز", i3_p: "هدف لمسي أدنى 44×44 pt وحلقة تركيز مُزاحة 2 px، كلاهما في tokens — مستخدمو لوحة المفاتيح والموبايل مشمولون افتراضيًا.", i4_t: "قارئات الشاشة ثلاثية اللغة", i4_p: "سمتا <code>lang</code>/<code>dir</code> ديناميكيتان، وترتيب قراءة منطقي، وتسميات مُترجَمة، لكي تقرأ التقنيات المساعِدة الفرنسية والإنجليزية والعربية بشكل صحيح.", i5_t: "قابلة للاختبار، لا مجرّد موثّقة", i5_p: "أنشأتُ تدفّق فحص على كل سطح — إضافات التباين في Figma، وaxe وLighthouse على الويب، وVoiceOver وTalkBack على الموبايل — لتُتحقَّق إمكانية الوصول عند كل تسليم، لا أن تُفترَض.", i6_t: "أحجام النصّين", i6_p: "يُزاد نص المتن العربي بمقدار 1–2 px عن خط الأساس اللاتيني، مع ضبط tokens ارتفاع السطر بحيث لا تُقتَص الروابط المعقّدة أبدًا في الجداول الكثيفة." },
        status: { eyebrow: "أين وصل المشروع", title: "مُطلَق، ولا يزال يتطوّر", s1_label: "منجز", s1_t: "إطلاق V1", s1_p: "الأساسات، و24 مكوّنًا، و5 أنماط، ومنصّة التوثيق — كلها متاحة كنسخة V1 رسمية.", s2_label: "متاح وقيد التطوير", s2_t: "التبنّي والصقل", s2_p: "المكتبة قيد الاستخدام، وصار الفريق يصمّم ويبني استنادًا إليها. قاد شريكي المصمّم نسخة عامة مصقولة من الموقع فوق V1 المشتركة.", s3_label: "قيد التنفيذ", s3_t: "استراتيجية الدمج", s3_p: "أحدّد كيفية دمج النظام في المنتجات الفعلية، وأُبقي الحَوكمة مفتوحة حتى يستقرّ تمامًا." },
        gov: { eyebrow: "الحَوكمة", title: "قواعد تُبقيه متماسكًا مع نموّه", r1_t: "استخدم دائمًا الـtokens السيمانتيكية", r1_p: "تشير المكوّنات إلى النيّة (brand/primary)، لا إلى القيم الخام — وهذا ما يجعل النظام قابلًا للصيانة وتبديل الأوضاع.", r2_t: "احترم سلسلة الطبقات الثلاث", r2_p: "primitives ثم semantics ثم components. لا تتجاوز طبقة أبدًا؛ فذلك يكسر المصدر الواحد للحقيقة.", r3_t: "فاتح + داكن، RTL + LTR، مدمجة", r3_p: "كل token سيمانتيكي يحمل الوضعين — دون مجموعات ألوان موازية، ودون عكس يدوي.", r4_t: "التوثيق هو المواصفة", r4_p: "مراجع الـtokens والحالات وإرشادات الصواب/الخطأ متطلّبات — مع تدفّق يتيح لغير المبرمج نشر التحديثات بأمان." },
        reflect: { eyebrow: "خلاصة", quote: "قيادة نظام تعني تصميم <span>القرارات</span>، لا الشاشات فحسب.", p1: "الجزء الأصعب — والأكثر إرضاءً — لم يكن رسم المكوّنات. بل اتخاذ خيارات تصمد عبر منصّتين تقنيتين، وثلاث لغات، ووضعين للألوان، وبين يدَي مصمّم ثانٍ. إرساء البنية وإمكانية الوصول مبكرًا هو ما سمح للمكتبة بالنمو دون أن تنهار إلى استثناءات.", p2: "كما أعاد ذلك تشكيل طريقة عملي: التعامل مع التوثيق كمنتج، وكتابة قواعد يستطيع الآخرون اتّباعها دون وجودي في الغرفة، والبقاء مسؤولًا عن نظام بعد إصداره الأول بوقت طويل." },
        closing: { eyebrow: "لنتحدّث", title: "هل لديك نظام مثل هذا في ذهنك؟", lead: "أصمّم أنظمة ومنتجات والأساسات التي تحتها. أخبرني بما تبنيه — ولنجعله متسقًا وسهل الوصول وسريع الإطلاق." },
        pager: { all: "العودة إلى كل دراسات الحالة", contact: "تواصل معي" },
        form: { ptype_label: "بماذا يمكنني المساعدة؟", pt_ds: "نظام تصميم", pt_web: "تطبيق ويب / SaaS", pt_mobile: "تطبيق موبايل", pt_erp: "ERP / أداة داخلية", pt_other: "شيء آخر" }
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
