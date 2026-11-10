export interface PerCompetence {
  code: string;
  intitule: string;
  description: string;
  merRef?: string;
}

export interface DisciplinePerCatalog {
  nom: string;
  code: string;
  competences: PerCompetence[];
}

export interface NiveauCatalog {
  nom: string;
  cycle: string;
}

export const niveauxRomands: NiveauCatalog[] = [
  { nom: '9e Harmos (Cycle 3)', cycle: 'Cycle 3 - Secondaire 1' },
  { nom: '10e Harmos (Cycle 3)', cycle: 'Cycle 3 - Secondaire 1' },
  { nom: '11e Harmos (Cycle 3)', cycle: 'Cycle 3 - Secondaire 1' },
  { nom: 'PEI 4 / MYP 4 (École Moser)', cycle: 'Baccalauréat International' },
  { nom: 'PEI 5 / MYP 5 (École Moser)', cycle: 'Baccalauréat International' },
  { nom: 'IB DP 1 (Gymnase / Collège)', cycle: 'Diplôme IB' },
  { nom: 'IB DP 2 (Gymnase / Collège)', cycle: 'Diplôme IB' },
];

export const perCatalogByDiscipline: Record<string, PerCompetence[]> = {
  'Français (L1)': [
    {
      code: 'PER L1 31',
      intitule: 'Lire des textes variés en adoptant une posture critique',
      description: 'Analyser des textes d\'opinion, éditoriaux, articles de presse et textes littéraires en identifiant l\'intention et les arguments.',
      merRef: 'MER Français 9-11e : Textes argumentatifs et rhétorique',
    },
    {
      code: 'PER L1 32',
      intitule: 'Écrire des textes argumentatifs et réflexifs',
      description: 'Structurer une prise de position, étayer ses arguments à l\'aide d\'exemples précis et organiser les connecteurs logiques.',
      merRef: 'MER Écriture : La dissertation et l\'essai d\'idées',
    },
    {
      code: 'PER L1 33',
      intitule: 'S\'exprimer à l\'oral et débattre de manière constructive',
      description: 'Participer à un débat réglé, écouter les arguments opposés, reformuler et contre-argumenter avec courtoisie.',
      merRef: 'MER Oral : Prise de parole et argumentation',
    },
    {
      code: 'PER L1 34',
      intitule: 'Analyser le fonctionnement de la langue et le lexique',
      description: 'Mobiliser les notions grammaticales, syntaxiques et lexicales adaptées au registre académique et journalistique.',
      merRef: 'MER Grammaire & Vocabulaire romand',
    },
    {
      code: 'IB PEI Langue A',
      intitule: 'Analyse littéraire et contextes stylistiques',
      description: 'Évaluer les effets stylistiques, le choix des figures de style et l\'impact des contextes historiques et culturels.',
      merRef: 'Guide pédagogique IB Langue & Littérature',
    },
  ],
  'Sciences de la Nature': [
    {
      code: 'PER MSN 35',
      intitule: 'Modéliser les interactions entre les êtres vivants et leur milieu',
      description: 'Analyser les écosystèmes (ex: lac Léman, forêts suisses), les chaînes trophiques et l\'impact anthropique sur la biodiversité.',
      merRef: 'MER Sciences 9-11e : Écosystèmes et équilibres écologiques',
    },
    {
      code: 'PER MSN 36',
      intitule: 'Conduire une démarche d\'investigation scientifique rigoureuse',
      description: 'Formuler une question testable, émettre des hypothèses réfutables, concevoir un protocole expérimental et analyser les incertitudes.',
      merRef: 'MER Sciences : Démarche expérimentale de laboratoire',
    },
    {
      code: 'PER MSN 37',
      intitule: 'Comprendre la structure de la matière et les transformations chimiques',
      description: 'Caractériser les réactions chimiques, les mélanges, les séparations et les pollutions moléculaires (ex: microplastiques).',
      merRef: 'MER Chimie : Matière et réactions',
    },
    {
      code: 'PER MSN 38',
      intitule: 'Expliquer les lois physiques, l\'énergie et ses transferts',
      description: 'Mesurer des grandeurs physiques, interpréter des bilans énergétiques et comprendre les principes thermodynamiques.',
      merRef: 'MER Physique : Énergie et mouvements',
    },
    {
      code: 'IB PEI Sciences',
      intitule: 'Traitement des données et réflexion sur l\'impact sociétal',
      description: 'Communiquer des résultats à l\'aide de graphiques normalisés et évaluer l\'impact des applications scientifiques sur l\'environnement.',
      merRef: 'Guide pédagogique IB Sciences expérimentales',
    },
  ],
  'Histoire & Citoyenneté': [
    {
      code: 'PER SHS 31',
      intitule: 'Analyser l\'évolution des sociétés et la démocratie suisse',
      description: 'Comprendre la construction de l\'État fédéral suisse (1848), la démocratie directe et le rôle de Genève dans la diplomatie internationale.',
      merRef: 'MER Histoire : La Suisse dans le monde contemporain',
    },
    {
      code: 'PER SHS 32',
      intitule: 'Mettre en œuvre la démarche d\'enquête historienne critique',
      description: 'Interroger des sources primaires (archives, affiches de vote, discours), croiser les points de vue et identifier les silences d\'une source.',
      merRef: 'MER Histoire : Méthode d\'analyse de documents d\'archives',
    },
    {
      code: 'PER SHS 33',
      intitule: 'Comprendre les relations internationales et les droits humains',
      description: 'Étudier les institutions internationales basées à Genève (ONU, CICR, OMS) et les enjeux globaux de justice et de paix.',
      merRef: 'MER Citoyenneté : Droits fondamentaux et relations internationales',
    },
    {
      code: 'IB PEI Individus & Sociétés',
      intitule: 'Enquête historique et analyse critique des perspectives',
      description: 'Comparer des historiographies divergentes et formuler des conclusions nuancées et contextualisées.',
      merRef: 'Guide pédagogique IB Individus et Sociétés',
    },
  ],
  'Géographie': [
    {
      code: 'PER SHS 31 G',
      intitule: 'Analyser l\'organisation de l\'espace et les dynamiques territoriales',
      description: 'Étudier l\'aménagement du territoire en Suisse romande, l\'agglomération du Grand Genève et les réseaux de transport transfrontaliers.',
      merRef: 'MER Géographie : Espace suisse et dynamiques urbaines',
    },
    {
      code: 'PER SHS 32 G',
      intitule: 'Comprendre les enjeux de durabilité et les ressources planétaires',
      description: 'Évaluer la gestion de l\'eau (le Rhône, les nappes genevoises), la transition énergétique et les risques naturels alpins.',
      merRef: 'MER Géographie : Climat, ressources et développement durable',
    },
    {
      code: 'IB PEI Géographie',
      intitule: 'Systèmes spatiaux et cartographie SIG',
      description: 'Mobiliser les outils géomatiques numériques (Swisstopo, SIG) pour spatialiser les données et dégager des tendances.',
      merRef: 'Guide pédagogique IB',
    },
  ],
  'Mathématiques': [
    {
      code: 'PER MSN 31',
      intitule: 'Résoudre des problèmes complexes par la modélisation mathématique',
      description: 'Développer des démarches algébriques, poser des équations et modéliser des situations concrètes du quotidien ou des sciences.',
      merRef: 'MER Mathématiques 9-11e : Algèbre et fonctions',
    },
    {
      code: 'PER MSN 32',
      intitule: 'Analyser des grandeurs et traiter des données statistiques',
      description: 'Interpréter des diagrammes, calculer des moyennes, médianes et fréquences, et exercer un esprit critique face aux graphiques trompeurs.',
      merRef: 'MER Mathématiques : Statistiques et probabilités',
    },
    {
      code: 'PER MSN 33',
      intitule: 'Mobiliser le raisonnement géométrique et la démonstration',
      description: 'Appliquer les théorèmes de Pythagore, Thalès, la trigonométrie et justifier les étapes par des propriétés fondamentales.',
      merRef: 'MER Mathématiques : Géométrie et transformations',
    },
  ],
  'Éducation aux Médias & MITIC': [
    {
      code: 'PER FG 31',
      intitule: 'Exercer un regard critique face aux médias et aux flux numériques',
      description: 'Déconstruire les infox, analyser les algorithmes de recommandation et repérer les techniques d\'influence et de persuasion.',
      merRef: 'Cadre romand MITIC : Éducation aux médias et citoyenneté numérique',
    },
    {
      code: 'PER FG 32',
      intitule: 'Produire des contenus numériques éthiques et responsables',
      description: 'Respecter le droit d\'auteur, la protection des données personnelles (LPD) et adopter une communication respectueuse en ligne.',
      merRef: 'Cadre romand MITIC : Production et droit à l\'image',
    },
  ],
  'Langues Modernes (Allemand / Anglais)': [
    {
      code: 'PER L2/L3 31',
      intitule: 'Comprendre des documents oraux et audiovisuels authentiques',
      description: 'Extraire des informations ciblées d\'un enregistrement radio, podcast ou extrait d\'actualité en langue cible (niveaux A2/B1/B2).',
      merRef: 'MER Allemand / Anglais : Compréhension de l\'oral',
    },
    {
      code: 'PER L2/L3 32',
      intitule: 'Interagir à l\'oral et exprimer une opinion personnelle',
      description: 'Soutenir une conversation, justifier un point de vue et négocier une décision commune en langue cible.',
      merRef: 'MER Langues : Production et interaction orales',
    },
  ],
};

// CER Evaluation Criteria Presets
export interface CriterePreset {
  titre: string;
  categorie: string;
  indicateurs: string;
  insuffisant: string;
  partiel: string;
  atteint: string;
  depasse: string;
}

export const criteresPresetsCER: CriterePreset[] = [
  {
    titre: 'Démarche d\'investigation & Rigueur méthodologique',
    categorie: 'Méthodologie & Sciences',
    indicateurs: 'Conformité du protocole, exactitude des mesures, recueil des données probantes et gestion des incertitudes.',
    insuffisant: 'Protocole non suivi, absence de rigueur dans les mesures, données incohérentes.',
    partiel: 'Protocole globalement suivi, quelques approximations ou oublis dans la récolte des données.',
    atteint: 'Protocole scrupuleusement respecté, mesures précises, unités normalisées et données fiables.',
    depasse: 'Excellente précision, démarche proactive avec analyse spontanée des marges d\'incertitude.',
  },
  {
    titre: 'Argumentation, Justification & Esprit critique',
    categorie: 'Argumentation & Écrit',
    indicateurs: 'Structure logique du raisonnement, présence de connecteurs logiques, pertinence des exemples et réfutation des contre-arguments.',
    insuffisant: 'Affirmations sans justification, absence d\'arguments ou arguments erronés.',
    partiel: 'Arguments présents mais juxtaposés sans articulation logique ; justification incomplète.',
    atteint: 'Thèse solidement étayée par 2 arguments cohérents et illustrée d\'exemples concrets vérifiés.',
    depasse: 'Raisonnement dialectique remarquable, prise en compte des nuances et contre-arguments anticipés.',
  },
  {
    titre: 'Fiabilité et Analyse Critique des Sources',
    categorie: 'Médias & Documents',
    indicateurs: 'Vérification de l\'auteur, date, éditeur, recoupement croisé par au moins deux sources indépendantes reconnues.',
    insuffisant: 'Sources acceptées sans aucun questionnement ni vérification de la légitimité.',
    partiel: 'Vérification superficielle (mention d\'un lien sans recherche d\'indépendance ou d\'autorité).',
    atteint: 'Double vérification effective avec identification claire de la nature et de la fiabilité des sources.',
    depasse: 'Recoupement approfondi identifiant les conflits d\'intérêts, les biais éditoriaux et la chaîne de viralité.',
  },
  {
    titre: 'Clarté de la Communication & Précision Lexicale',
    categorie: 'Communication & Langue',
    indicateurs: 'Emploi du vocabulaire technique disciplinaire, syntaxe académique soignée, structuration du propos.',
    insuffisant: 'Langue approximative ou familière, confusions lexicales majeures, propos difficilement compréhensible.',
    partiel: 'Vocabulaire disciplinaire partiellement maîtrisé, syntaxe correcte mais répétitive.',
    atteint: 'Vocabulaire disciplinaire exact, syntaxe maîtrisée, propos structuré et agréable à lire.',
    depasse: 'Aisance remarquable, maîtrise parfaite du lexique académique, élégance de style et clarté exemplaire.',
  },
  {
    titre: 'Collaboration & Engagement au sein du groupe',
    categorie: 'Capacités transversales',
    indicateurs: 'Écoute active, respect de la répartition des rôles, contribution équitable à la production collective.',
    insuffisant: 'Désengagement du travail d\'équipe ou attitude perturbatrice pour la progression du binôme.',
    partiel: 'Participation passive ou inégale, dépendance forte vis-à-vis des autres membres du groupe.',
    atteint: 'Rôle assumé avec sérieux, écoute mutuelle et contribution active à la tâche commune.',
    depasse: 'Leadership positif, régulation bienveillante du groupe et facilitation de la coopération.',
  },
];

// Presets for Section 5 (Différenciation CUA & Remédiation)
export interface DifferenciationPreset {
  titre: string;
  type: 'adaptation' | 'remediation';
  texte: string;
}

export const differenciationPresets: DifferenciationPreset[] = [
  {
    titre: 'Supports multimodaux & Lecture vocale (DYS / Allophones)',
    type: 'adaptation',
    texte: 'Mise à disposition de textes en police adaptée (OpenDyslexic / Lexie), interligne majoré, synthèse vocale intégrée et versions audio des consignes.',
  },
  {
    titre: 'Tiers-temps et aménagement chronologique',
    type: 'adaptation',
    texte: 'Majoration de 25% du temps imparti pour la tâche écrite ou fractionnement de l\'épreuve en deux temps distincts.',
  },
  {
    titre: 'Guidage par paliers & Fiches repères (Scaffolding)',
    type: 'adaptation',
    texte: 'Fiche méthodologique à 3 niveaux de guidage (version pas-à-pas avec amorces de phrases, version standard, version d\'investigation autonome).',
  },
  {
    titre: 'Atelier de remédiation en sous-groupe restreint',
    type: 'remediation',
    texte: 'Prise en charge de 3 à 4 élèves par l\'enseignant durant 20 minutes sur un corpus simplifié pour consolider la technique d\'analyse des sources.',
  },
  {
    titre: 'Fiche d\'auto-régulation avec indices gradués',
    type: 'remediation',
    texte: 'Mise à disposition d\'un livret de remédiation autonome contenant 3 indices progressifs pour surmonter les blocages fréquents sans donner la solution.',
  },
  {
    titre: 'Parcours d\'entraînement complémentaire ciblé',
    type: 'remediation',
    texte: 'Exercices courts d\'application directe sur l\'ENT Moser avec correction immédiate pour ancrer les automatismes notionnels.',
  },
];

// Presets for Section 6 (Suggestions d'Enrichissement / Élargissement & Manques)
export interface EnrichissementPreset {
  titre: string;
  categorie: 'elargissement' | 'manque';
  texte: string;
}

export const enrichissementPresets: EnrichissementPreset[] = [
  {
    titre: 'Projet transdisciplinaire Sciences, Éthique & Philosophie',
    categorie: 'elargissement',
    texte: 'Mettre en place un débat contradictoire formalisé entre cours de sciences et cours d\'éthique citoyenne sur la responsabilité des chercheurs face aux crises écologiques.',
  },
  {
    titre: 'Immersion académique : Recherche suisse contemporaine (EPFL / UNIGE)',
    categorie: 'elargissement',
    texte: 'Étude d\'extraits vulgarisés d\'une publication récente des laboratoires de l\'EPFL ou de l\'Université de Genève, avec mise en perspective des méthodes universitaires.',
  },
  {
    titre: 'Production audiovisuelle ou micro-podcast radiophonique',
    categorie: 'elargissement',
    texte: 'Conception par les élèves les plus avancés d\'un mini-reportage audio de 3 minutes format "RTS Découverte" destiné à être diffusé sur la radio interne de l\'école.',
  },
  {
    titre: 'Simulation de commission d\'enquête parlementaire ou diplomatique',
    categorie: 'elargissement',
    texte: 'Jeu de rôle en salle de classe simulant une séance plénière de l\'ONU à Genève ou du Grand Conseil avec rédaction d\'une résolution officielle.',
  },
  {
    titre: 'Comblement des manques : Diagnostic préalable des prérequis',
    categorie: 'manque',
    texte: 'Proposer en amont un quiz diagnostique flash de 5 questions sur les notions fondamentales du cycle précédent pour identifier et combler les lacunes avant le démarrage.',
  },
  {
    titre: 'Comblement des manques : Capsule vidéo de réactivation notionnelle',
    categorie: 'manque',
    texte: 'Pour les élèves présentant des manques sur la méthodologie de base, mise à disposition d\'une capsule vidéo explicative de 3 minutes à visionner avant la séance.',
  },
  {
    titre: 'Comblement des manques : Glossaire bilingue des termes essentiels',
    categorie: 'manque',
    texte: 'Distribuer en début de séquence un glossaire bilingue illustré des mots-clés scientifiques ou historiques pour sécuriser le lexique des élèves en difficulté.',
  },
];
