import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";
dotenv.config();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const app = express();
app.use(express.json({ limit: "10mb" }));
const PORT = process.env.PORT ? parseInt(process.env.PORT, 10) : 3e3;
const apiKey = process.env.GEMINI_API_KEY;
let ai = null;
if (apiKey) {
  ai = new GoogleGenAI({
    apiKey,
    httpOptions: {
      headers: {
        "User-Agent": "aistudio-build"
      }
    }
  });
}
app.post("/api/generate-sequence", async (req, res) => {
  const {
    discipline = "Fran\xE7ais",
    niveau = "10e Harmos / PEI 4",
    titre = "",
    duree = "4 p\xE9riodes de 45 minutes",
    cadre = "PER / CER / IB",
    formatDemande = "standard",
    consignes = "",
    isVierge = false
  } = req.body;
  if (isVierge) {
    return res.json({
      success: true,
      data: {
        enTete: {
          titre: titre || "[Exemple : Analyse critique des sources num\xE9riques et infox]",
          discipline,
          niveau,
          duree,
          objectifs: [
            { text: "[Exemple : PER FG 31 - D\xE9velopper une attitude critique face aux m\xE9dias]", checked: false },
            { text: "[Exemple : CER - Formuler une argumentation \xE9tay\xE9e et structur\xE9e]", checked: false },
            { text: "[Exemple : IB MYP Crit\xE8re A & B - Connaissance et r\xE9flexion critique]", checked: false }
          ]
        },
        cadrePedagogique: {
          capacitesTransversales: [
            { nom: "D\xE9marche r\xE9flexive", description: "[Exemple : Auto-\xE9valuation des crit\xE8res de v\xE9racit\xE9]", checked: false },
            { nom: "Collaboration", description: "[Exemple : Travail en dyade sur le recoupement des donn\xE9es]", checked: false },
            { nom: "Communication", description: "[Exemple : Restitution orale synth\xE9tique de la d\xE9marche]", checked: false },
            { nom: "Pens\xE9e cr\xE9atrice", description: "[Exemple : Conception d'une infographie de pr\xE9vention]", checked: false }
          ],
          formationGenerale: "[Exemple : M\xE9dias, images et technologies de l'information et de la communication (MITIC) - \xC9thique citoyenne]",
          conceptsIB: {
            conceptCle: "[Exemple : Communication / Syst\xE8mes]",
            conceptsConnexes: "[Exemple : Point de vue, Validit\xE9, Message]",
            contexteMondial: "[Exemple : Mondialisation et durabilit\xE9 - \xC9cosyst\xE8mes informationnels]"
          }
        },
        planification: {
          mode: "tableau",
          phases: [
            {
              phaseDuree: "[Phase 1 : Accroche & Diagnostic - 15 min]",
              objectifsActivites: "[Activit\xE9 : Confrontation \xE0 3 publications trompeuses. \xC9mission d'hypoth\xE8ses individuelles sur leur fiabilit\xE9.]",
              roleProf: "[Posture d'\xE9tayage : Questionnement socratique sans valider les r\xE9ponses dans un premier temps.]",
              outilsSAMR: "[Augmentation : Padlet collaboratif avec vote instantan\xE9 et nuage de doutes]",
              cuaDifferenciation: "[CUA : Supports multimodaux (texte + podcast audio court + transcription pour \xE9l\xE8ves allophones/DYS)]",
              checked: false
            },
            {
              phaseDuree: "[Phase 2 : Analyse m\xE9thodique - 30 min]",
              objectifsActivites: "[Activit\xE9 : Application de la grille de v\xE9rification (auteur, date, source crois\xE9e, intention \xE9ditoriale).]",
              roleProf: "[M\xE9diateur et guide : Circule dans les \xEElots, apporte des indices gradu\xE9s aux groupes en difficult\xE9.]",
              outilsSAMR: "[Modification : Outil de recherche d'image invers\xE9e (Google Lens / TinEye)]",
              cuaDifferenciation: "[Diff\xE9renciation : Fiche m\xE9thodologique avec amorces de phrases et lexique cl\xE9 fourni.]",
              checked: false
            },
            {
              phaseDuree: "[Phase 3 : Synth\xE8se & Institutionnalisation - 25 min]",
              objectifsActivites: "[Activit\xE9 : \xC9laboration collective d'une charte des 5 r\xE9flexes de l'enqu\xEAteur num\xE9rique.]",
              roleProf: "[Expert : Synth\xE8se au tableau, formalisation des notions institutionnelles PER.]",
              outilsSAMR: "[Red\xE9finition : Co-construction d'un canva partag\xE9 projet\xE9]",
              cuaDifferenciation: "[CUA : Enregistrement m\xE9mo vocal de la synth\xE8se disponible sur l'ENT Moser.]",
              checked: false
            }
          ]
        },
        evaluation: {
          dispositifsFormatifs: "[Exemple : Billet de sortie (Exit Ticket) via QCM diagnostic flash + auto-\xE9valuation guid\xE9e]",
          tacheSommative: "[Exemple : R\xE9daction d'une note d'investigation critique (400 mots) analysant un cas in\xE9dit d'actualit\xE9]",
          grilleCriteriee: [
            {
              critere: "[Crit\xE8re 1 : Identification de la fiabilit\xE9 des sources]",
              indicateurs: "[V\xE9rification de l'auteur, de l'institution \xE9mettrice et de la corroboration crois\xE9e]",
              insuffisant: "[Sources accept\xE9es sans questionnement, aucune v\xE9rification document\xE9e]",
              partiel: "[V\xE9rification superficielle (ex: nom cit\xE9 sans recherche de l\xE9gitimit\xE9)]",
              atteint: "[Double v\xE9rification effective avec identification claire du statut de la source]",
              depasse: "[Recoupement rigoureux incluant l'analyse des biais potentiels et des conflits d'int\xE9r\xEAts]"
            },
            {
              critere: "[Crit\xE8re 2 : Rigueur de l'argumentation & Justification]",
              indicateurs: "[Clart\xE9 des connecteurs logiques, pr\xE9sence d'exemples concrets, nuance du propos]",
              insuffisant: "[Affirmations p\xE9remptoires non \xE9tay\xE9es, absence de structure]",
              partiel: "[Arguments pr\xE9sents mais juxtapos\xE9s, justification partielle]",
              atteint: "[Th\xE8se soutenue par 2 arguments coh\xE9rents et illustr\xE9s de donn\xE9es pr\xE9cises]",
              depasse: "[Raisonnement dialectique anticipant les contre-arguments et synth\xE8se \xE9clair\xE9e]"
            }
          ]
        },
        differenciation: {
          mesuresAdaptation: "[Exemple : Polices adapt\xE9es Opendyslexic, temps major\xE9 de 25%, consignes segment\xE9es en \xE9tapes simples]",
          rem\u00E9diation: "[Exemple : Atelier dirig\xE9 en petit groupe avec l'enseignant sur un corpus restreint \xE0 1 document cl\xE9]"
        },
        enrichissement: {
          pistesApprofondissement: "[Exemple : Enqu\xEAte sur la fabrication des deepfakes vid\xE9o et interview d'un journaliste scientifique]"
        },
        ressources: [
          {
            titre: "Portail \xC9ducatif \xC9cole Moser",
            url: "https://www.ecolemoser.ch",
            description: "Espace p\xE9dagogique et ressources institutionnelles de l'\xC9cole Moser",
            type: "Portail Officiel"
          },
          {
            titre: "Plan d'\xC9tudes Romand (PER)",
            url: "https://www.plandetudes.ch",
            description: "R\xE9f\xE9rentiel officiel des comp\xE9tences de la scolarit\xE9 obligatoire romande",
            type: "Cadre Officiel"
          },
          {
            titre: "Organisation du Baccalaur\xE9at International (IB)",
            url: "https://www.ibo.org/fr",
            description: "Cadre p\xE9dagogique des programmes PEI et DP",
            type: "R\xE9f\xE9rentiel IB"
          }
        ]
      }
    });
  }
  if (ai) {
    try {
      const prompt = `Tu es un expert senior en ing\xE9nierie p\xE9dagogique pour l'\xC9cole Moser en Suisse (Gen\xE8ve, Nyon, Berlin), un \xE9tablissement d'excellence align\xE9 sur les r\xE9f\xE9rentiels PER (Plan d'\xE9tudes romand), CER (Cadre d'\xE9valuation romand) et IB (Baccalaur\xE9at International - PEI/DP).

G\xE9n\xE8re une s\xE9quence p\xE9dagogique compl\xE8te, rigoureuse et directement exploitable.
Param\xE8tres demand\xE9s :
- Discipline : ${discipline}
- Niveau scolaire : ${niveau}
- Titre souhait\xE9 : ${titre || "S\xE9quence approfondie"}
- Dur\xE9e : ${duree}
- Cadre r\xE9f\xE9rentiel : ${cadre}
- Format cibl\xE9 : ${formatDemande}
- Consignes sp\xE9cifiques de l'enseignant : ${consignes || "Aucune consigne particuli\xE8re"}

IMPORTANT :
1. Respecte scrupuleusement la nomenclature suisse romande et internationale :
   - PER : Capacit\xE9s transversales, Formation g\xE9n\xE9rale (MITIC, Sant\xE9, Citoyennet\xE9), objectifs disciplinaires (ex: L1, MSN, SHS).
   - CER : \xC9valuation formative continue, t\xE2che sommative authentique, grille crit\xE9ri\xE9e avec 4 niveaux (Insuffisant, Partiel, Atteint, D\xE9pass\xE9).
   - IB : Concepts cl\xE9s, concepts connexes, contextes mondiaux, profil de l'apprenant.
   - Mod\xE8le SAMR (Substitution, Augmentation, Modification, Red\xE9finition).
   - CUA (Conception Universelle de l'Apprentissage / UDL).
2. Fournis 3 ressources num\xE9riques r\xE9elles pertinentes avec de vraies URL valides (ex: un mus\xE9e, un site acad\xE9mique, GeoGebra, BNF, RTS D\xE9couverte, Swissinfo, Le Temps, Eduki, etc.) qui donneront lieu \xE0 des liens cliquables et des QR codes.
3. Formate STRICTEMENT la r\xE9ponse en JSON pur correspondant au sch\xE9ma TypeScript ci-dessous, sans aucun texte autour :

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
    "rem\xE9diation": "string"
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
        model: "gemini-3.8-flash",
        contents: prompt,
        config: {
          responseMimeType: "application/json",
          systemInstruction: "Tu es un conseiller p\xE9dagogique \xE9m\xE9rite de l'\xC9cole Moser. Tu r\xE9diges avec un ton institutionnel, acad\xE9mique, pr\xE9cis, \xE9l\xE9gant et bienveillant, parfaitement adapt\xE9 aux enseignants suisses romands et aux exigences du Baccalaur\xE9at International."
        }
      });
      const responseText = response.text || "{}";
      const parsedData = JSON.parse(responseText);
      return res.json({ success: true, data: parsedData });
    } catch (error) {
      console.error("Gemini generation error:", error);
    }
  }
  return res.json({
    success: true,
    data: {
      enTete: {
        titre: titre || `Ing\xE9nierie de S\xE9quence : ${discipline} (${niveau})`,
        discipline,
        niveau,
        duree,
        objectifs: [
          { text: "PER MSN 36 : Analyser des ph\xE9nom\xE8nes naturels et mod\xE9liser des interactions complexes", checked: false },
          { text: "CER \xC9valuation : Mobiliser des d\xE9marches d'investigation scientifique rigoureuses", checked: false },
          { text: "IB PEI Crit\xE8re B & C : \xC9laboration de protocoles et traitement des donn\xE9es probantes", checked: false }
        ]
      },
      cadrePedagogique: {
        capacitesTransversales: [
          { nom: "D\xE9marche r\xE9flexive", description: "Questionnement critique sur les hypoth\xE8ses formul\xE9es et l'exactitude des mesures.", checked: false },
          { nom: "Collaboration", description: "Organisation des r\xF4les au sein de la brigade de laboratoire (gestionnaire du protocole, observateur, rapporteur).", checked: false },
          { nom: "Communication", description: "Pr\xE9sentation claire d'un compte-rendu scientifique avec graphique normalis\xE9.", checked: false },
          { nom: "Strat\xE9gies d'apprentissage", description: "Auto-r\xE9gulation via une checklist d'invariants exp\xE9rimentaux.", checked: false }
        ],
        formationGenerale: "Sant\xE9 et s\xE9curit\xE9 en environnement d'exp\xE9rimentation - Interd\xE9pendance \xE9cologique et d\xE9veloppement durable",
        conceptsIB: {
          conceptCle: "Relations & Changement",
          conceptsConnexes: "\xC9nergie, \xC9quilibre, Cons\xE9quences syst\xE9miques",
          contexteMondial: "Orientation dans l'espace et le temps - \xC9volution des mod\xE8les scientifiques"
        }
      },
      planification: {
        mode: "tableau",
        phases: [
          {
            phaseDuree: "Phase 1 : Situation d\xE9clenchante & Hypoth\xE8ses (25 min)",
            objectifsActivites: "Observation d'un ph\xE9nom\xE8ne contre-intuitif projet\xE9. Formulation par \xE9crit de 2 hypoth\xE8ses explicatives testables.",
            roleProf: "Animateur et r\xE9gulateur. Questionne les repr\xE9sentations initiales sans donner la solution.",
            outilsSAMR: "Augmentation : Sondage interactif en direct avec affichage en temps r\xE9el des hypoth\xE8ses.",
            cuaDifferenciation: "CUA : Repr\xE9sentation visuelle sch\xE9matique + glossaire bilingue des termes techniques mis \xE0 disposition.",
            checked: false
          },
          {
            phaseDuree: "Phase 2 : Exp\xE9rimentation guid\xE9e & Collecte de donn\xE9es (50 min)",
            objectifsActivites: "Mise en \u0153uvre du protocole exp\xE9rimental en bin\xF4me. Mesures quantitatives et tenue du carnet de laboratoire.",
            roleProf: "Conseiller m\xE9thodologique. \xC9valuation formative volante des gestes techniques et de la s\xE9curit\xE9.",
            outilsSAMR: "Modification : Capteurs num\xE9riques connect\xE9s (ExAO) pour tra\xE7age automatique de la courbe.",
            cuaDifferenciation: "Diff\xE9renciation : Fiche protocole d\xE9clin\xE9e en 2 versions (guid\xE9e pas-\xE0-pas ou version ouverte d'investigation).",
            checked: false
          },
          {
            phaseDuree: "Phase 3 : Analyse critique & Institutionnalisation (35 min)",
            objectifsActivites: "Confrontation des r\xE9sultats aux hypoth\xE8ses initiales. R\xE9daction de la conclusion scientifique institutionnelle.",
            roleProf: "Expert garant des savoirs. Trace la synth\xE8se conceptuelle au tableau et valide les d\xE9ductions.",
            outilsSAMR: "Red\xE9finition : Synth\xE8se partag\xE9e sur le canva collaboratif de classe avec QR code d'acc\xE8s rapide.",
            cuaDifferenciation: "CUA : Choix de restitution : mini-note synth\xE9tique r\xE9dig\xE9e ou carte mentale comment\xE9e.",
            checked: false
          }
        ]
      },
      evaluation: {
        dispositifsFormatifs: "Observation formative crit\xE9ri\xE9e durant le laboratoire + auto-\xE9valuation via grille d'analyse des erreurs de mesure.",
        tacheSommative: "Production individuelle d'un rapport d'investigation scientifique structur\xE9 (contexte, m\xE9thode, donn\xE9es, conclusion critique).",
        grilleCriteriee: [
          {
            critere: "Crit\xE8re A : Rigueur de la d\xE9marche exp\xE9rimentale",
            indicateurs: "Respect des consignes de s\xE9curit\xE9, pr\xE9cision des mesures, tenue du carnet.",
            insuffisant: "Protocole non suivi, mesures manquantes ou erratiques, manque de rigueur.",
            partiel: "Protocole globalement suivi, quelques approximations dans la r\xE9colte des valeurs.",
            atteint: "Mesures rigoureuses, unit\xE9s correctes, protocole ma\xEEtris\xE9 avec autonomie.",
            depasse: "Excellente pr\xE9cision, identification spontan\xE9e des marges d'incertitude de mesure."
          },
          {
            critere: "Crit\xE8re B : Analyse et interpr\xE9tation des donn\xE9es",
            indicateurs: "Graphique conforme aux normes, corr\xE9lation entre variables, d\xE9duction logique.",
            insuffisant: "Graphique incomplet, conclusion sans lien logique avec les donn\xE9es observ\xE9es.",
            partiel: "Courbe trac\xE9e mais axes impr\xE9cis, interpr\xE9tation descriptive sans explication.",
            atteint: "Graphique soign\xE9 et conforme, conclusion reliant pr\xE9cis\xE9ment r\xE9sultats et hypoth\xE8ses.",
            depasse: "Analyse critique approfondie, proposition de prolongement exp\xE9rimental pertinent."
          }
        ]
      },
      differenciation: {
        mesuresAdaptation: "Temps suppl\xE9mentaire accord\xE9 pour la r\xE9daction du bilan, mise \xE0 disposition de gabarits graphiques pr\xE9-gradu\xE9s, support num\xE9rique pour agrandissement.",
        rem\u00E9diation: "Atelier de rem\xE9diation cibl\xE9e sur la lecture de graphiques scientifiques pour les \xE9l\xE8ves n\xE9cessitant un renforcement m\xE9thodologique."
      },
      enrichissement: {
        pistesApprofondissement: "\xC9tude d'un article de recherche contemporain publi\xE9 par l'EPFL ou l'Universit\xE9 de Gen\xE8ve en lien avec le ph\xE9nom\xE8ne \xE9tudi\xE9."
      },
      ressources: [
        {
          titre: "Site Officiel \xC9cole Moser",
          url: "https://www.ecolemoser.ch",
          description: "Portail p\xE9dagogique et projets innovants de l'\xE9tablissement",
          type: "Institutionnel"
        },
        {
          titre: "RTS D\xE9couverte - Sciences & Environnement",
          url: "https://www.rts.ch/decouverte",
          description: "Dossiers th\xE9matiques et vid\xE9os p\xE9dagogiques document\xE9es pour les \xE9coles romandes",
          type: "M\xE9dia \xC9ducatif Romand"
        },
        {
          titre: "Plan d'\xC9tudes Romand (PER)",
          url: "https://www.plandetudes.ch",
          description: "R\xE9f\xE9rentiel des apprentissages et comp\xE9tences du cycle 3 en Suisse romande",
          type: "Cadre Officiel"
        }
      ]
    }
  });
});
async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    const { createServer: createViteServer } = await import("vite");
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa"
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(path.resolve(__dirname, "dist")));
    app.get("*", (req, res) => {
      res.sendFile(path.resolve(__dirname, "dist", "index.html"));
    });
  }
  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Serveur \xC9cole Moser d\xE9marr\xE9 sur http://localhost:${PORT}`);
  });
}
startServer();
