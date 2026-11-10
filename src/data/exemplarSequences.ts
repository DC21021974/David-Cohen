import { PedagogicalSequence } from '../types/sequence';

/**
 * Initial empty template at application launch.
 * All fields are empty ("") and all checkboxes are unchecked (false).
 * Detailed greyed-out placeholders provide methodological guidance.
 */
export const initialEmptySequence: PedagogicalSequence = {
  id: 'sequence-nouvelle',
  isViergeTemplate: true,
  enTete: {
    titre: '',
    discipline: '',
    niveau: '',
    duree: '',
    cadreReferentiel: 'PER',
    auteur: '',
    objectifs: [
      { id: 'obj-1', text: '', checked: false },
      { id: 'obj-2', text: '', checked: false },
      { id: 'obj-3', text: '', checked: false },
    ],
  },
  cadrePedagogique: {
    capacitesTransversales: [
      { id: 'cap-1', nom: 'Démarche réflexive', description: '', checked: false },
      { id: 'cap-2', nom: 'Collaboration', description: '', checked: false },
      { id: 'cap-3', nom: 'Communication', description: '', checked: false },
      { id: 'cap-4', nom: 'Stratégies d\'apprentissage', description: '', checked: false },
      { id: 'cap-5', nom: 'Pensée créatrice', description: '', checked: false },
    ],
    formationGenerale: '',
    conceptsIB: {
      conceptCle: '',
      conceptsConnexes: '',
      contexteMondial: '',
    },
  },
  planification: {
    mode: 'tableau',
    phases: [
      {
        id: 'phase-1',
        phaseDuree: '',
        objectifsActivites: '',
        roleProf: '',
        outilsSAMR: '',
        cuaDifferenciation: '',
        checked: false,
      },
      {
        id: 'phase-2',
        phaseDuree: '',
        objectifsActivites: '',
        roleProf: '',
        outilsSAMR: '',
        cuaDifferenciation: '',
        checked: false,
      },
      {
        id: 'phase-3',
        phaseDuree: '',
        objectifsActivites: '',
        roleProf: '',
        outilsSAMR: '',
        cuaDifferenciation: '',
        checked: false,
      },
    ],
  },
  evaluation: {
    dispositifsFormatifs: '',
    tacheSommative: '',
    grilleCriteriee: [
      {
        id: 'crit-1',
        critere: '',
        indicateurs: '',
        insuffisant: '',
        partiel: '',
        atteint: '',
        depasse: '',
      },
      {
        id: 'crit-2',
        critere: '',
        indicateurs: '',
        insuffisant: '',
        partiel: '',
        atteint: '',
        depasse: '',
      },
    ],
  },
  differenciation: {
    mesuresAdaptation: '',
    remédiation: '',
  },
  enrichissement: {
    pistesApprofondissement: '',
  },
  ressources: [],
};

export const sampleSequenceMedia: PedagogicalSequence = {
  id: 'seq-media-10e',
  isViergeTemplate: false,
  enTete: {
    titre: 'La Fabrique de l\'Information : Esprit Critique et Décodage des Médias Numériques',
    discipline: 'Français & Éducation aux Médias (MITIC)',
    niveau: '10e Harmos / PEI 4',
    duree: '4 périodes (2 x 90 minutes)',
    cadreReferentiel: 'MIXTE',
    auteur: 'Département des Lettres — École Moser',
    objectifs: [
      { id: 'm-obj-1', text: 'PER L1 31 : Lire et analyser des textes d\'opinion et des articles de presse en identifiant la visée argumentative.', checked: false },
      { id: 'm-obj-2', text: 'PER FG 31 : Analyser de manière critique les sources d\'information, détecter les biais et repérer les fake news.', checked: false },
      { id: 'm-obj-3', text: 'CER Évaluation : Rédiger une argumentation étayée fondée sur des faits vérifiés et des sources contradictoires.', checked: false },
      { id: 'm-obj-4', text: 'IB PEI Langue & Littérature (Critères A & B) : Compréhension des contextes, intention de l\'auteur et analyse stylistique.', checked: false },
    ],
  },
  cadrePedagogique: {
    capacitesTransversales: [
      { id: 'm-cap-1', nom: 'Démarche réflexive', description: 'Identifier ses propres biais de confirmation face aux titres sensationnalistes sur les réseaux sociaux.', checked: false },
      { id: 'm-cap-2', nom: 'Collaboration', description: 'Conduire une enquête journalistique en trinôme avec répartition stricte des rôles (Vérificateur, Rédacteur, Documentaliste).', checked: false },
      { id: 'm-cap-3', nom: 'Communication', description: 'Restituer synthétiquement les résultats du fact-checking sous la forme d\'un bulletin d\'information oral ou écrit.', checked: false },
      { id: 'm-cap-4', nom: 'Stratégies d\'apprentissage', description: 'Mettre en place une grille systématique d\'évaluation de la crédibilité (auteur, date, hébergeur, sources croisées).', checked: false },
      { id: 'm-cap-5', nom: 'Pensée créatrice', description: 'Produire un visuel synthétique "Arrêt sur Infox" prêt à être diffusé sur le canal d\'information de l\'école.', checked: false },
    ],
    formationGenerale: 'Médias, images et technologies de l\'information et de la communication (MITIC) — Citoyenneté numérique, éthique informationnelle et lutte contre la désinformation.',
    conceptsIB: {
      conceptCle: 'Communication & Perspectives',
      conceptsConnexes: 'Biais éditorial, Intention, Validité de la source, Contexte de publication',
      contexteMondial: 'Équité et développement — Démocratie, accès équitable au savoir et pluralisme de la presse',
    },
  },
  planification: {
    mode: 'tableau',
    phases: [
      {
        id: 'p-1',
        phaseDuree: 'Phase 1 : Accroche & Diagnostic "Le Piège de l\'Infox" (30 min)',
        objectifsActivites: 'Confrontation immédiate à 3 posts viraux récents (1 vrai, 1 faux généré par IA, 1 décontextualisé). Vote individuel à main levée puis confrontation d\'arguments par binômes.',
        roleProf: 'Posture de déstabilisation pédagogique : laisse émerger les certitudes spontanées sans révéler la supercherie, puis projette la révélation des sources.',
        outilsSAMR: 'Augmentation : Utilisation d\'un mur Padlet interactif pour catégoriser les indices visuels et textuels relevés par les élèves.',
        cuaDifferenciation: 'CUA : Documents textuels enrichis de versions audio pour les élèves DYS ; affichage en police haute lisibilité.',
        checked: false,
      },
      {
        id: 'p-2',
        phaseDuree: 'Phase 2 : Atelier d\'Investigation & Méthode de Recoupement (50 min)',
        objectifsActivites: 'Chaque brigade journalistique reçoit un dossier d\'actualité polémique. Application de la check-list "OSINT Junior" : recherche inversée d\'images, consultation de bases de données officielles et comparaison de 3 quotidiens romands.',
        roleProf: 'Conseiller méthodologique : circule dans les groupes, pose des questions de relance ("Qui finance ce site ?", "Où est la dépêche originale ?").',
        outilsSAMR: 'Modification : Recours aux outils professionnels de vérification (Google Lens, TinEye, Wayback Machine) sur iPad/ordinateurs Moser.',
        cuaDifferenciation: 'Différenciation : Dossiers documentaires gradués en 3 niveaux de complexité ; grille méthodologique pas-à-pas avec phrases amorces pour les élèves plus lents.',
        checked: false,
      },
      {
        id: 'p-3',
        phaseDuree: 'Phase 3 : Rédaction du Bilan & Institutionnalisation (40 min)',
        objectifsActivites: 'Rédaction d\'une note de synthèse de 250 mots "Démystification et Vérité des Faits". Présentation flash de 2 minutes par groupe devant la classe.',
        roleProf: 'Garant institutionnel : formalisation au tableau des 5 critères d\'or du journaliste responsable ; ancrage des notions du PER.',
        outilsSAMR: 'Redéfinition : Enregistrement d\'un micro-podcast audio de 90 secondes téléversé sur l\'espace podcast de la classe.',
        cuaDifferenciation: 'CUA : Choix offert entre compte-rendu textuel rédigé ou enregistrement vocal avec fiche mémo préparatoire.',
        checked: false,
      },
      {
        id: 'p-4',
        phaseDuree: 'Phase 4 : Bilan réflexif & Évaluation formative (20 min)',
        objectifsActivites: 'Remplissage individuel du billet de sortie (Exit Ticket) : "Une chose que j\'ai apprise, une question qui reste ouverte, un réflexe que j\'adopte dès ce soir sur mon smartphone".',
        roleProf: 'Évaluateur bienveillant : collecte les billets de sortie pour réguler la séance suivante.',
        outilsSAMR: 'Augmentation : Formulaire numérique rapide avec synthèse visuelle instantanée des ressentis de la classe.',
        cuaDifferenciation: 'Différenciation : Possibilité de dictée vocale intégrée pour les élèves présentant des troubles graphomoteurs.',
        checked: false,
      },
    ],
  },
  evaluation: {
    dispositifsFormatifs: 'Évaluation formative continue : observation en cours d\'atelier avec fiche d\'invariants méthodologiques, bilan intermédiaire à mi-parcours et billet de sortie réflexif à la fin de chaque séance.',
    tacheSommative: 'Tâche sommative authentique : Rédaction d\'un article de presse d\'investigation (400 à 500 mots) analysant un cas réel de fausse nouvelle scientifique ou sociétale, avec démontage rigoureux des mécanismes de manipulation et citation des sources primaires vérifiées.',
    grilleCriteriee: [
      {
        id: 'c-1',
        critere: 'Critère 1 : Démarche d\'investigation & Vérification des sources',
        indicateurs: 'Identification de l\'auteur, date, contexte, corroboration par au moins deux sources indépendantes reconnues.',
        insuffisant: 'Sources acceptées sans aucun questionnement critique ; absence de liens probants.',
        partiel: 'Vérification superficielle (mention d\'une source sans recherche d\'indépendance ou d\'autorité).',
        atteint: 'Double vérification systématique avec identification claire de la nature des sources mobilisées.',
        depasse: 'Recoupement poussé identifiant les biais d\'intérêts, la chaîne de transmission et les algorithmes de viralité.',
      },
      {
        id: 'c-2',
        critere: 'Critère 2 : Qualité de l\'argumentation & Logique démonstrative',
        indicateurs: 'Cohérence du raisonnement, emploi judicieux des connecteurs logiques, formulation de nuances.',
        insuffisant: 'Propos confus, jugements de valeur sans preuves, structure désordonnée.',
        partiel: 'Arguments présents mais juxtaposés sans articulation logique solide ; justifications partielles.',
        atteint: 'Raisonnement structuré (thèse, arguments étayés d\'exemples concrets, conclusion logique).',
        depasse: 'Démonstration magistrale, anticipation des contre-arguments et recul épistémologique remarquable.',
      },
      {
        id: 'c-3',
        critere: 'Critère 3 : Respect des codes journalistiques & Éthique citoyenne',
        indicateurs: 'Ton mesuré et objectif, respect de la déontologie, clarté rédactionnelle et précision lexicale.',
        insuffisant: 'Langage familier ou agressif, plagiat partiel, non-respect des règles de citation.',
        partiel: 'Effort de neutralité mais vocabulaire approximatif ; citations incomplètes.',
        atteint: 'Langue soignée et académique, neutralité journalistique respectée, citations conformes.',
        depasse: 'Plume percutante et captivante, respect exemplaire du code de déontologie de la presse suisse.',
      },
    ],
  },
  differenciation: {
    mesuresAdaptation: 'Aménagements CUA : Fourniture préalable du lexique spécialisé des médias ; fiches d\'aide à la décomposition de la tâche ; mise à disposition de logiciels de lecture vocale et de synthèse vocale pour les élèves DYS.',
    remédiation: 'Atelier en sous-groupe guidé (3 à 4 élèves) avec l\'enseignant pour revoir spécifiquement la technique de la recherche d\'image inversée et la distinction entre fait et opinion.',
  },
  enrichissement: {
    pistesApprofondissement: 'Rencontre et interview d\'un journaliste de la rédaction du Temps ou de la RTS ; projet transdisciplinaire avec le cours d\'Informatique sur la détection algorithmique des deepfakes et l\'intelligence artificielle générative.',
  },
  ressources: [
    {
      id: 'res-m-1',
      titre: 'RTS Découverte — Éducation aux Médias et Faits Divers',
      url: 'https://www.rts.ch/decouverte',
      description: 'Dossiers vidéos et fiches pédagogiques de la Radio Télévision Suisse sur le traitement de l\'information et le recul critique.',
      type: 'Média Public Suisse',
    },
    {
      id: 'res-m-2',
      titre: 'Conseil Suisse de la Presse (Presserat)',
      url: 'https://presserat.ch/fr',
      description: 'Déclaration des devoirs et des droits du/de la journaliste et décisions déontologiques faisant jurisprudence en Suisse.',
      type: 'Cadre Déontologique',
    },
    {
      id: 'res-m-3',
      titre: 'CLEMI — Centre pour l\'Éducation aux Médias et à l\'Information',
      url: 'https://www.clemi.fr',
      description: 'Guides méthodologiques, fiches d\'investigation et ateliers pratiques de vérification pour les classes du secondaire.',
      type: 'Ressource Méthodologique',
    },
  ],
};
