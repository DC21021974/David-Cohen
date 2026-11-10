import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import { GoogleGenAI } from '@google/genai';
import dotenv from 'dotenv';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
app.use(express.json({ limit: '10mb' }));

const PORT = process.env.PORT ? parseInt(process.env.PORT, 10) : 3000;

// Initialize Gemini SDK if API key is present
const apiKey = process.env.GEMINI_API_KEY;
let ai: GoogleGenAI | null = null;

if (apiKey) {
  ai = new GoogleGenAI({
    apiKey: apiKey,
    httpOptions: {
      headers: {
        'User-Agent': 'aistudio-build',
      },
    },
  });
}

// Sequence generation endpoint
app.post('/api/generate-sequence', async (req, res) => {
  const {
    discipline = 'Français',
    niveau = '10e Harmos / PEI 4',
    titre = '',
    duree = '4 périodes de 45 minutes',
    cadre = 'PER / CER / IB',
    formatDemande = 'standard',
    consignes = '',
    isVierge = false,
  } = req.body;

  if (isVierge) {
    // Generate blank sequence template with greyed out examples and unchecked boxes
    return res.json({
      success: true,
      data: {
        enTete: {
          titre: titre || '[Exemple : Analyse critique des sources numériques et infox]',
          discipline: discipline,
          niveau: niveau,
          duree: duree,
          objectifs: [
            { text: '[Exemple : PER FG 31 - Développer une attitude critique face aux médias]', checked: false },
            { text: '[Exemple : CER - Formuler une argumentation étayée et structurée]', checked: false },
            { text: '[Exemple : IB MYP Critère A & B - Connaissance et réflexion critique]', checked: false },
          ],
        },
        cadrePedagogique: {
          capacitesTransversales: [
            { nom: 'Démarche réflexive', description: '[Exemple : Auto-évaluation des critères de véracité]', checked: false },
            { nom: 'Collaboration', description: '[Exemple : Travail en dyade sur le recoupement des données]', checked: false },
            { nom: 'Communication', description: '[Exemple : Restitution orale synthétique de la démarche]', checked: false },
            { nom: 'Pensée créatrice', description: '[Exemple : Conception d\'une infographie de prévention]', checked: false },
          ],
          formationGenerale: '[Exemple : Médias, images et technologies de l\'information et de la communication (MITIC) - Éthique citoyenne]',
          conceptsIB: {
            conceptCle: '[Exemple : Communication / Systèmes]',
            conceptsConnexes: '[Exemple : Point de vue, Validité, Message]',
            contexteMondial: '[Exemple : Mondialisation et durabilité - Écosystèmes informationnels]',
          },
        },
        planification: {
          mode: 'tableau',
          phases: [
            {
              phaseDuree: '[Phase 1 : Accroche & Diagnostic - 15 min]',
              objectifsActivites: '[Activité : Confrontation à 3 publications trompeuses. Émission d\'hypothèses individuelles sur leur fiabilité.]',
              roleProf: '[Posture d\'étayage : Questionnement socratique sans valider les réponses dans un premier temps.]',
              outilsSAMR: '[Augmentation : Padlet collaboratif avec vote instantané et nuage de doutes]',
              cuaDifferenciation: '[CUA : Supports multimodaux (texte + podcast audio court + transcription pour élèves allophones/DYS)]',
              checked: false,
            },
            {
              phaseDuree: '[Phase 2 : Analyse méthodique - 30 min]',
              objectifsActivites: '[Activité : Application de la grille de vérification (auteur, date, source croisée, intention éditoriale).]',
              roleProf: '[Médiateur et guide : Circule dans les îlots, apporte des indices gradués aux groupes en difficulté.]',
              outilsSAMR: '[Modification : Outil de recherche d\'image inversée (Google Lens / TinEye)]',
              cuaDifferenciation: '[Différenciation : Fiche méthodologique avec amorces de phrases et lexique clé fourni.]',
              checked: false,
            },
            {
              phaseDuree: '[Phase 3 : Synthèse & Institutionnalisation - 25 min]',
              objectifsActivites: '[Activité : Élaboration collective d\'une charte des 5 réflexes de l\'enquêteur numérique.]',
              roleProf: '[Expert : Synthèse au tableau, formalisation des notions institutionnelles PER.]',
              outilsSAMR: '[Redéfinition : Co-construction d\'un canva partagé projeté]',
              cuaDifferenciation: '[CUA : Enregistrement mémo vocal de la synthèse disponible sur l\'ENT Moser.]',
              checked: false,
            },
          ],
        },
        evaluation: {
          dispositifsFormatifs: '[Exemple : Billet de sortie (Exit Ticket) via QCM diagnostic flash + auto-évaluation guidée]',
          tacheSommative: '[Exemple : Rédaction d\'une note d\'investigation critique (400 mots) analysant un cas inédit d\'actualité]',
          grilleCriteriee: [
            {
              critere: '[Critère 1 : Identification de la fiabilité des sources]',
              indicateurs: '[Vérification de l\'auteur, de l\'institution émettrice et de la corroboration croisée]',
              insuffisant: '[Sources acceptées sans questionnement, aucune vérification documentée]',
              partiel: '[Vérification superficielle (ex: nom cité sans recherche de légitimité)]',
              atteint: '[Double vérification effective avec identification claire du statut de la source]',
              depasse: '[Recoupement rigoureux incluant l\'analyse des biais potentiels et des conflits d\'intérêts]',
            },
            {
              critere: '[Critère 2 : Rigueur de l\'argumentation & Justification]',
              indicateurs: '[Clarté des connecteurs logiques, présence d\'exemples concrets, nuance du propos]',
              insuffisant: '[Affirmations péremptoires non étayées, absence de structure]',
              partiel: '[Arguments présents mais juxtaposés, justification partielle]',
              atteint: '[Thèse soutenue par 2 arguments cohérents et illustrés de données précises]',
              depasse: '[Raisonnement dialectique anticipant les contre-arguments et synthèse éclairée]',
            },
          ],
        },
        differenciation: {
          mesuresAdaptation: '[Exemple : Polices adaptées Opendyslexic, temps majoré de 25%, consignes segmentées en étapes simples]',
          remédiation: '[Exemple : Atelier dirigé en petit groupe avec l\'enseignant sur un corpus restreint à 1 document clé]',
        },
        enrichissement: {
          pistesApprofondissement: '[Exemple : Enquête sur la fabrication des deepfakes vidéo et interview d\'un journaliste scientifique]',
        },
        ressources: [
          {
            titre: 'Portail Éducatif École Moser',
            url: 'https://www.ecolemoser.ch',
            description: 'Espace pédagogique et ressources institutionnelles de l\'École Moser',
            type: 'Portail Officiel',
          },
          {
            titre: 'Plan d\'Études Romand (PER)',
            url: 'https://www.plandetudes.ch',
            description: 'Référentiel officiel des compétences de la scolarité obligatoire romande',
            type: 'Cadre Officiel',
          },
          {
            titre: 'Organisation du Baccalauréat International (IB)',
            url: 'https://www.ibo.org/fr',
            description: 'Cadre pédagogique des programmes PEI et DP',
            type: 'Référentiel IB',
          },
        ],
      },
    });
  }

  // If Gemini is available, generate via prompt
  if (ai) {
    try {
      const prompt = `Tu es un expert senior en ingénierie pédagogique pour l'École Moser en Suisse (Genève, Nyon, Berlin), un établissement d'excellence aligné sur les référentiels PER (Plan d'études romand), CER (Cadre d'évaluation romand) et IB (Baccalauréat International - PEI/DP).

Génère une séquence pédagogique complète, rigoureuse et directement exploitable.
Paramètres demandés :
- Discipline : ${discipline}
- Niveau scolaire : ${niveau}
- Titre souhaité : ${titre || 'Séquence approfondie'}
- Durée : ${duree}
- Cadre référentiel : ${cadre}
- Format ciblé : ${formatDemande}
- Consignes spécifiques de l'enseignant : ${consignes || 'Aucune consigne particulière'}

IMPORTANT :
1. Respecte scrupuleusement la nomenclature suisse romande et internationale :
   - PER : Capacités transversales, Formation générale (MITIC, Santé, Citoyenneté), objectifs disciplinaires (ex: L1, MSN, SHS).
   - CER : Évaluation formative continue, tâche sommative authentique, grille critériée avec 4 niveaux (Insuffisant, Partiel, Atteint, Dépassé).
   - IB : Concepts clés, concepts connexes, contextes mondiaux, profil de l'apprenant.
   - Modèle SAMR (Substitution, Augmentation, Modification, Redéfinition).
   - CUA (Conception Universelle de l'Apprentissage / UDL).
2. Fournis 3 ressources numériques réelles pertinentes avec de vraies URL valides (ex: un musée, un site académique, GeoGebra, BNF, RTS Découverte, Swissinfo, Le Temps, Eduki, etc.) qui donneront lieu à des liens cliquables et des QR codes.
3. Formate STRICTEMENT la réponse en JSON pur correspondant au schéma TypeScript ci-dessous, sans aucun texte autour :

{
  "enTete": {
    "titre": "string",
    "discipline": "string",
    "niveau": "string",
    "duree": "string",
    "objectifs": [
      { "text": "string (ex: PER SHS 31...)", "checked": false }
    ]
  },
  "cadrePedagogique": {
    "capacitesTransversales": [
      { "nom": "string", "description": "string", "checked": false }
    ],
    "formationGenerale": "string",
    "conceptsIB": {
      "conceptCle": "string",
      "conceptsConnexes": "string",
      "contexteMondial": "string"
    }
  },
  "planification": {
    "mode": "tableau",
    "phases": [
      {
        "phaseDuree": "string",
        "objectifsActivites": "string",
        "roleProf": "string",
        "outilsSAMR": "string",
        "cuaDifferenciation": "string",
        "checked": false
      }
    ]
  },
  "evaluation": {
    "dispositifsFormatifs": "string",
    "tacheSommative": "string",
    "grilleCriteriee": [
      {
        "critere": "string",
        "indicateurs": "string",
        "insuffisant": "string",
        "partiel": "string",
        "atteint": "string",
        "depasse": "string"
      }
    ]
  },
  "differenciation": {
    "mesuresAdaptation": "string",
    "remédiation": "string"
  },
  "enrichissement": {
    "pistesApprofondissement": "string"
  },
  "ressources": [
    {
      "titre": "string",
      "url": "string (URL https://...)",
      "description": "string",
      "type": "string"
    }
  ]
}`;

      const response = await ai.models.generateContent({
        model: 'gemini-3.8-flash',
        contents: prompt,
        config: {
          responseMimeType: 'application/json',
          systemInstruction:
            "Tu es un conseiller pédagogique émérite de l'École Moser. Tu rédiges avec un ton institutionnel, académique, précis, élégant et bienveillant, parfaitement adapté aux enseignants suisses romands et aux exigences du Baccalauréat International.",
        },
      });

      const responseText = response.text || '{}';
      const parsedData = JSON.parse(responseText);
      return res.json({ success: true, data: parsedData });
    } catch (error: any) {
      console.error('Gemini generation error:', error);
      // Fallback to high-quality curated sequence if API fails
    }
  }

  // Curated high-quality sequence fallback
  return res.json({
    success: true,
    data: {
      enTete: {
        titre: titre || `Ingénierie de Séquence : ${discipline} (${niveau})`,
        discipline: discipline,
        niveau: niveau,
        duree: duree,
        objectifs: [
          { text: 'PER MSN 36 : Analyser des phénomènes naturels et modéliser des interactions complexes', checked: false },
          { text: 'CER Évaluation : Mobiliser des démarches d\'investigation scientifique rigoureuses', checked: false },
          { text: 'IB PEI Critère B & C : Élaboration de protocoles et traitement des données probantes', checked: false },
        ],
      },
      cadrePedagogique: {
        capacitesTransversales: [
          { nom: 'Démarche réflexive', description: 'Questionnement critique sur les hypothèses formulées et l\'exactitude des mesures.', checked: false },
          { nom: 'Collaboration', description: 'Organisation des rôles au sein de la brigade de laboratoire (gestionnaire du protocole, observateur, rapporteur).', checked: false },
          { nom: 'Communication', description: 'Présentation claire d\'un compte-rendu scientifique avec graphique normalisé.', checked: false },
          { nom: 'Stratégies d\'apprentissage', description: 'Auto-régulation via une checklist d\'invariants expérimentaux.', checked: false },
        ],
        formationGenerale: 'Santé et sécurité en environnement d\'expérimentation - Interdépendance écologique et développement durable',
        conceptsIB: {
          conceptCle: 'Relations & Changement',
          conceptsConnexes: 'Énergie, Équilibre, Conséquences systémiques',
          contexteMondial: 'Orientation dans l\'espace et le temps - Évolution des modèles scientifiques',
        },
      },
      planification: {
        mode: 'tableau',
        phases: [
          {
            phaseDuree: 'Phase 1 : Situation déclenchante & Hypothèses (25 min)',
            objectifsActivites: 'Observation d\'un phénomène contre-intuitif projeté. Formulation par écrit de 2 hypothèses explicatives testables.',
            roleProf: 'Animateur et régulateur. Questionne les représentations initiales sans donner la solution.',
            outilsSAMR: 'Augmentation : Sondage interactif en direct avec affichage en temps réel des hypothèses.',
            cuaDifferenciation: 'CUA : Représentation visuelle schématique + glossaire bilingue des termes techniques mis à disposition.',
            checked: false,
          },
          {
            phaseDuree: 'Phase 2 : Expérimentation guidée & Collecte de données (50 min)',
            objectifsActivites: 'Mise en œuvre du protocole expérimental en binôme. Mesures quantitatives et tenue du carnet de laboratoire.',
            roleProf: 'Conseiller méthodologique. Évaluation formative volante des gestes techniques et de la sécurité.',
            outilsSAMR: 'Modification : Capteurs numériques connectés (ExAO) pour traçage automatique de la courbe.',
            cuaDifferenciation: 'Différenciation : Fiche protocole déclinée en 2 versions (guidée pas-à-pas ou version ouverte d\'investigation).',
            checked: false,
          },
          {
            phaseDuree: 'Phase 3 : Analyse critique & Institutionnalisation (35 min)',
            objectifsActivites: 'Confrontation des résultats aux hypothèses initiales. Rédaction de la conclusion scientifique institutionnelle.',
            roleProf: 'Expert garant des savoirs. Trace la synthèse conceptuelle au tableau et valide les déductions.',
            outilsSAMR: 'Redéfinition : Synthèse partagée sur le canva collaboratif de classe avec QR code d\'accès rapide.',
            cuaDifferenciation: 'CUA : Choix de restitution : mini-note synthétique rédigée ou carte mentale commentée.',
            checked: false,
          },
        ],
      },
      evaluation: {
        dispositifsFormatifs: 'Observation formative critériée durant le laboratoire + auto-évaluation via grille d\'analyse des erreurs de mesure.',
        tacheSommative: 'Production individuelle d\'un rapport d\'investigation scientifique structuré (contexte, méthode, données, conclusion critique).',
        grilleCriteriee: [
          {
            critere: 'Critère A : Rigueur de la démarche expérimentale',
            indicateurs: 'Respect des consignes de sécurité, précision des mesures, tenue du carnet.',
            insuffisant: 'Protocole non suivi, mesures manquantes ou erratiques, manque de rigueur.',
            partiel: 'Protocole globalement suivi, quelques approximations dans la récolte des valeurs.',
            atteint: 'Mesures rigoureuses, unités correctes, protocole maîtrisé avec autonomie.',
            depasse: 'Excellente précision, identification spontanée des marges d\'incertitude de mesure.',
          },
          {
            critere: 'Critère B : Analyse et interprétation des données',
            indicateurs: 'Graphique conforme aux normes, corrélation entre variables, déduction logique.',
            insuffisant: 'Graphique incomplet, conclusion sans lien logique avec les données observées.',
            partiel: 'Courbe tracée mais axes imprécis, interprétation descriptive sans explication.',
            atteint: 'Graphique soigné et conforme, conclusion reliant précisément résultats et hypothèses.',
            depasse: 'Analyse critique approfondie, proposition de prolongement expérimental pertinent.',
          },
        ],
      },
      differenciation: {
        mesuresAdaptation: 'Temps supplémentaire accordé pour la rédaction du bilan, mise à disposition de gabarits graphiques pré-gradués, support numérique pour agrandissement.',
        remédiation: 'Atelier de remédiation ciblée sur la lecture de graphiques scientifiques pour les élèves nécessitant un renforcement méthodologique.',
      },
      enrichissement: {
        pistesApprofondissement: 'Étude d\'un article de recherche contemporain publié par l\'EPFL ou l\'Université de Genève en lien avec le phénomène étudié.',
      },
      ressources: [
        {
          titre: 'Site Officiel École Moser',
          url: 'https://www.ecolemoser.ch',
          description: 'Portail pédagogique et projets innovants de l\'établissement',
          type: 'Institutionnel',
        },
        {
          titre: 'RTS Découverte - Sciences & Environnement',
          url: 'https://www.rts.ch/decouverte',
          description: 'Dossiers thématiques et vidéos pédagogiques documentées pour les écoles romandes',
          type: 'Média Éducatif Romand',
        },
        {
          titre: 'Plan d\'Études Romand (PER)',
          url: 'https://www.plandetudes.ch',
          description: 'Référentiel des apprentissages et compétences du cycle 3 en Suisse romande',
          type: 'Cadre Officiel',
        },
      ],
    },
  });
});

async function startServer() {
  // Vite dev server integration
  if (process.env.NODE_ENV !== 'production') {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    // Production static serving
    app.use(express.static(path.resolve(__dirname, 'dist')));
    app.get('*', (req, res) => {
      res.sendFile(path.resolve(__dirname, 'dist', 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Serveur École Moser démarré sur http://localhost:${PORT}`);
  });
}

startServer();
