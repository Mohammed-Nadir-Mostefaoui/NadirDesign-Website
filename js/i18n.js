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
        back_to_top: 'Back to top'
      },
      hero: {
        greeting:      "Hi, I'm Nadir Mostefaoui",
        title:         'Digital Products \nDesigner',
        bio:           'I design product interfaces for B2B SaaS, ERP modules, sales dashboards, mobile-first apps, and multi-role enterprise platforms.',
        cta_primary:   "Let's Talk",
        cta_secondary: 'View My Work',
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
          title:        'DataMaster Design System',
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
          role:      'Product Design Lead',
          city:      'Tlemcen',
          country:   'Algeria',
          work_type: 'Remote',
          dates:     'Jan 2026 - Present',
          duration:  '5 mos',
          desc_0:    '- Nawat Studio manage Data Master Analytics Product design.',
          desc_1:    '- Leading product design for B2B SaaS and enterprise software clients',
          desc_2:    '- Managing and mentoring a product designer, reviewing deliverables, and ensuring design quality.',
          desc_3:    '- Delivering ERP interfaces, design systems, and IA restructuring across client engagements.'
        },
        dma: {
          company:   'Data Master Analytics',
          city:      'Bezons, Île-de-France',
          country:   'France',
          work_type: 'Remote',
          dates:     'Sep 2024 - Present',
          duration:  '1 yr 9 mos',
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
          company:   'Five Angels',
          role:      'UI/UX Designer',
          country:   'Dubai',
          city:      'United Arab Emirates',
          work_type: 'Remote',
          dates:     'Mar 2024 - Dec 2024',
          duration:  '10 mos',
          desc_0a:   'Worked with a ',
          desc_0b:   'Dubai-based agency',
          desc_0c:   ' on a range of client projects across multiple industries.',
          desc_1:    '- Designed the teacher-facing interface of an e-learning platform — course management, content creation flows, and student progress tracking.',
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
          duration:  '3 yrs',
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
        copy_done:        'Copied!',
        copyright:        'Nadir Mostefaoui. All rights reserved.'
      }
    },
    fr: {
      nav: {
        projects:   'Projets',
        experience: 'Expérience',
        skills:     'Compétences',
        insights:   'Articles',
        contact:    'Me Contacter',
        back_to_top: 'Retour en haut'
      },
      hero: {
        greeting:      'Bonjour, je suis Nadir Mostefaoui',
        title:         'Designer de\nProduits Digitaux',
        bio:           'Je conçois des interfaces pour des solutions B2B SaaS, des modules ERP, des tableaux de bord, des applications mobiles et des plateformes multi-rôles.',
        cta_primary:   'Discutons',
        cta_secondary: 'Voir mon travail',
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
          title:        'Système de Design DataMaster',
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
          role:      'Lead Design Produit',
          city:      'Tlemcen',
          country:   'Algérie',
          work_type: 'À distance',
          dates:     'Janv. 2026 - Présent',
          duration:  '5 mois',
          desc_0:    '- Nawat Studio gère le design produit de Data Master Analytics.',
          desc_1:    '- Direction du design produit pour des clients B2B SaaS et logiciels d\'entreprise',
          desc_2:    '- Encadrement d\'un designer produit, révision des livrables et garantie de la qualité du design.',
          desc_3:    '- Livraison d\'interfaces ERP, de systèmes de design et de restructuration de l\'architecture de l\'information.'
        },
        dma: {
          company:   'Data Master Analytics',
          city:      'Bezons, Île-de-France',
          country:   'France',
          work_type: 'À distance',
          dates:     'Sept. 2024 - Présent',
          duration:  '1 an 9 mois',
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
          company:   'Five Angels',
          role:      'Designer UI/UX',
          country:   'Dubaï',
          city:      'Émirats Arabes Unis',
          work_type: 'À distance',
          dates:     'Mars 2024 - Déc. 2024',
          duration:  '10 mois',
          desc_0a:   'Travail avec une ',
          desc_0b:   'agence basée à Dubaï',
          desc_0c:   ' sur des projets clients dans plusieurs secteurs.',
          desc_1:    '- Conception de l\'interface enseignant d\'une plateforme e-learning — gestion des cours, flux de création de contenu et suivi de la progression des élèves.',
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
          duration:  '3 ans',
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
        copy_done:        'Copié !',
        copyright:        'Nadir Mostefaoui. Tous droits réservés.'
      }
    },
    ar: {
      nav: {
        projects:   'المشاريع',
        experience: 'الخبرة',
        skills:     'المهارات',
        insights:   'المقالات',
        contact:    'تواصل معي',
        back_to_top: 'العودة إلى الأعلى'
      },
      hero: {
        greeting:      'مرحباً، أنا نَذِير مصطفاوي',
        title:         'مُصَمِّم المُنتَجَات\nالرَّقمِيَّة',
        bio:           'أصمم واجهات المنتجات لحلول B2B SaaS ووحدات ERP ولوحات المبيعات والتطبيقات ذات الأولوية للجوال ومنصات المؤسسات متعددة الأدوار.',
        cta_primary:   'لنتحدث',
        cta_secondary: 'شاهد أعمالي',
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
          title:        'نظام تصميم DataMaster',
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
          role:      'قائد تصميم المنتج',
          city:      'تلمسان',
          country:   'الجزائر',
          work_type: 'عن بُعد',
          dates:     'يناير 2026 - حتى الآن',
          duration:  '5 أشهر',
          desc_0:    '- تتولى أستديو نواة إدارة تصميم منتج Data Master Analytics.',
          desc_1:    '- قيادة تصميم المنتج لعملاء B2B SaaS وبرامج المؤسسات',
          desc_2:    '- الإشراف على مصمم منتج وتوجيهه، ومراجعة التسليمات وضمان جودة التصميم.',
          desc_3:    '- تسليم واجهات ERP وأنظمة التصميم وإعادة هيكلة معمارية المعلومات عبر مشاريع العملاء.'
        },
        dma: {
          company:   'Data Master Analytics',
          city:      'بيزون، إيل-دو-فرانس',
          country:   'فرنسا',
          work_type: 'عن بُعد',
          dates:     'سبتمبر 2024 - حتى الآن',
          duration:  'سنة و9 أشهر',
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
          company:   'Five Angels',
          role:      'مصمم UI/UX',
          country:   'دبي',
          city:      'الإمارات العربية المتحدة',
          work_type: 'عن بُعد',
          dates:     'مارس 2024 - ديسمبر 2024',
          duration:  '10 أشهر',
          desc_0a:   'عمل مع ',
          desc_0b:   'وكالة مقرّها دبي',
          desc_0c:   ' على مشاريع عملاء في قطاعات متعددة.',
          desc_1:    '- تصميم واجهة المعلم لمنصة تعليم إلكتروني — إدارة الدورات وتدفقات إنشاء المحتوى وتتبع تقدم الطلاب.',
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
          duration:  '3 سنوات',
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
        copy_done:        'تم النسخ!',
        copyright:        'نذير مصطفاوي. جميع الحقوق محفوظة.'
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
