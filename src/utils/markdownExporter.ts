import { PedagogicalSequence, ViewFormat } from '../types/sequence';

/**
 * Generates pristine Markdown according to the requested format.
 */
export function exportToMarkdown(sequence: PedagogicalSequence, format: ViewFormat): string {
  switch (format) {
    case 'diaporama':
      return generateDiaporamaMarkdown(sequence);
    case 'tableau_word':
      return generateTableauWordMarkdown(sequence);
    case 'standard':
    default:
      return generateStandardMarkdown(sequence);
  }
}

/**
 * Format 1 : Format Standard (Rapport / Guide de séquence)
 */
function generateStandardMarkdown(seq: PedagogicalSequence): string {
  const isVierge = seq.isViergeTemplate;

  let md = `# ÉCOLE MOSER — GUIDE DE SÉQUENCE PÉDAGOGIQUE
**Cadre Référentiel :** ${seq.enTete.cadreReferentiel} | **Discipline :** ${seq.enTete.discipline} | **Niveau :** ${seq.enTete.niveau}

---

## 1. En-tête de la Séquence
- **Titre de la séquence :** ${seq.enTete.titre}
- **Discipline :** ${seq.enTete.discipline}
- **Niveau / Degré :** ${seq.enTete.niveau}
- **Durée estimée :** ${seq.enTete.duree}
- **Objectifs d'apprentissage (PER / CER / IB) :**
${seq.enTete.objectifs
  .map((obj) => `  - [${obj.checked ? 'x' : ' '}] ${obj.text}`)
  .join('\n')}

---

## 2. Cadre Pédagogique & Transversalité
### 2.1 Capacités Transversales (PER)
${seq.cadrePedagogique.capacitesTransversales
  .map((cap) => `- [${cap.checked ? 'x' : ' '}] **${cap.nom}** : ${cap.description}`)
  .join('\n')}

### 2.2 Formation Générale & Thématiques Interdisciplinaires
${seq.cadrePedagogique.formationGenerale}

### 2.3 Concepts & Contextes IB (PEI / DP)
- **Concept Clé :** ${seq.cadrePedagogique.conceptsIB.conceptCle}
- **Concepts Connexes :** ${seq.cadrePedagogique.conceptsIB.conceptsConnexes}
- **Contexte Mondial :** ${seq.cadrePedagogique.conceptsIB.contexteMondial}

---

## 3. Planification Détaillée de la Séquence
`;

  if (seq.planification.mode === 'tableau') {
    md += `| Phase / Durée | Objectifs & Activités | Rôle prof | Outils [SAMR] | CUA & Différenciation |
| :--- | :--- | :--- | :--- | :--- |
${seq.planification.phases
  .map(
    (p) =>
      `| **${cleanTableCell(p.phaseDuree)}** | ${cleanTableCell(p.objectifsActivites)} | ${cleanTableCell(p.roleProf)} | ${cleanTableCell(p.outilsSAMR)} | ${cleanTableCell(p.cuaDifferenciation)} |`
  )
  .join('\n')}
`;
  } else {
    // Blocs narratifs
    seq.planification.phases.forEach((p, idx) => {
      md += `### Phase ${idx + 1} : ${p.phaseDuree}
- **Objectifs & Activités des élèves :** ${p.objectifsActivites}
- **Posture & Rôle de l'enseignant :** ${p.roleProf}
- **Intégration Numérique [SAMR] :** ${p.outilsSAMR}
- **Accessibilité & Différenciation [CUA] :** ${p.cuaDifferenciation}

`;
    });
  }

  md += `---

## 4. Stratégie d'Évaluation (Alignée CER)
### 4.1 Dispositifs d'Évaluation Formative
${seq.evaluation.dispositifsFormatifs}

### 4.2 Tâche Sommative Authentique
${seq.evaluation.tacheSommative}

### 4.3 Grille d'Évaluation Critériée
| Critère d'évaluation | Indicateurs observables | Insuffisant (1) | Partiel (2) | Atteint (3) | Dépassé (4) |
| :--- | :--- | :--- | :--- | :--- | :--- |
${seq.evaluation.grilleCriteriee
  .map(
    (g) =>
      `| **${cleanTableCell(g.critere)}** | ${cleanTableCell(g.indicateurs)} | ${cleanTableCell(g.insuffisant)} | ${cleanTableCell(g.partiel)} | ${cleanTableCell(g.atteint)} | ${cleanTableCell(g.depasse)} |`
  )
  .join('\n')}

---

## 5. Différenciation & Remédiation
- **Mesures d'adaptation (Besoins Éducatifs Particuliers / CUA) :**
  ${seq.differenciation.mesuresAdaptation}
- **Dispositifs de remédiation ciblée :**
  ${seq.differenciation.remédiation}

---

## 6. Suggestions d'Enrichissement
- **Pistes d'approfondissement & interdisciplinarité :**
  ${seq.enrichissement.pistesApprofondissement}

---

## 7. Ressources Pédagogiques Numériques (Liens & QR Codes)
${seq.ressources
  .map(
    (r, i) => `### Ressource ${i + 1} : [${r.titre}](${r.url})
- **Type :** ${r.type || 'Source en ligne'}
- **Lien direct :** [${r.url}](${r.url})
- **Description :** ${r.description}
*(Pour les supports papier ou tableau, un QR Code d'accès instantané est fourni ci-dessous)*`
  )
  .join('\n\n')}
`;

  return md;
}

/**
 * Format 2 : Format Présentation / Diaporama
 * Strictement découpé en [DIAPOSITIVE X], avec séparation nette :
 * - À l'écran
 * - Notes de l'orateur
 */
function generateDiaporamaMarkdown(seq: PedagogicalSequence): string {
  let md = `# DIAPORAMA PÉDAGOGIQUE — ÉCOLE MOSER
**Séquence :** ${seq.enTete.titre}
**Discipline :** ${seq.enTete.discipline} | **Niveau :** ${seq.enTete.niveau} | **Durée :** ${seq.enTete.duree}

============================================================

`;

  // Diapositive 1 : Titre & En-tête
  md += `[DIAPOSITIVE 1] : Titre & Enjeux de la Séquence
------------------------------------------------------------
**À L'ÉCRAN :**
# ${seq.enTete.titre}
### ${seq.enTete.discipline} — ${seq.enTete.niveau}
*Durée : ${seq.enTete.duree}*

**Objectifs clés d'apprentissage :**
${seq.enTete.objectifs.map((o) => `• ${o.text}`).join('\n')}

---
**NOTES DE L'ORATEUR :**
- Accueillir la classe et contextualiser la séquence dans la progression annuelle.
- Annoncer explicitement le contrat d'apprentissage et le lien avec le cadre ${seq.enTete.cadreReferentiel}.
- Vérifier la compréhension des termes clés figurant dans les objectifs.

============================================================

`;

  // Diapositive 2 : Cadre Pédagogique & Transversalité
  md += `[DIAPOSITIVE 2] : Cadre Méthodologique & Compétences Transversales
------------------------------------------------------------
**À L'ÉCRAN :**
## Compétences & Démarche d'Apprentissage
- **Capacités transversales (PER) :**
${seq.cadrePedagogique.capacitesTransversales.map((c) => `  • **${c.nom}** : ${c.description}`).join('\n')}
- **Formation générale :** ${seq.cadrePedagogique.formationGenerale}
- **Ancrage IB :** Concept Clé : *${seq.cadrePedagogique.conceptsIB.conceptCle}* | Contexte Mondial : *${seq.cadrePedagogique.conceptsIB.contexteMondial}*

---
**NOTES DE L'ORATEUR :**
- Expliciter aux élèves pourquoi ces compétences transversales sont travaillées ici.
- Montrer que l'outil numérique n'est pas une fin en soi mais un levier d'émancipation cognitive.
- Établir le lien avec le profil de l'apprenant (chercheur, réfléchi, communicatif).

============================================================

`;

  // Diapositives des phases de déroulement
  seq.planification.phases.forEach((phase, index) => {
    const diapoNum = index + 3;
    md += `[DIAPOSITIVE ${diapoNum}] : ${phase.phaseDuree}
------------------------------------------------------------
**À L'ÉCRAN :**
## ${phase.phaseDuree}
### Consigne & Activités Élèves :
${phase.objectifsActivites}

**Environnement de travail :**
- Outils mobilisés [SAMR] : ${phase.outilsSAMR}
- Modalités d'accessibilité [CUA] : ${phase.cuaDifferenciation}

---
**NOTES DE L'ORATEUR :**
- **Posture enseignante :** ${phase.roleProf}
- Réguler le temps avec un chronomètre visible au tableau.
- Circuler prioritairement auprès des îlots nécessitant un étayage méthodologique.
- Noter les régularités et les blocages pour le bilan intermédiaire.

============================================================

`;
  });

  // Diapositive Évaluation
  const diapoEvalNum = seq.planification.phases.length + 3;
  md += `[DIAPOSITIVE ${diapoEvalNum}] : Modalités d'Évaluation & Critères de Réussite
------------------------------------------------------------
**À L'ÉCRAN :**
## Évaluation & Critères de Maîtrise
- **Évaluation formative :** ${seq.evaluation.dispositifsFormatifs}
- **Production sommative attendue :** ${seq.evaluation.tacheSommative}

### Grille des critères observables :
${seq.evaluation.grilleCriteriee
  .map(
    (g) =>
      `• **${g.critere}** :
   - Atteint : ${g.atteint}
   - Dépassé : ${g.depasse}`
  )
  .join('\n')}

---
**NOTES DE L'ORATEUR :**
- Partager la grille critériée avant même le démarrage de la production finale.
- Pratiquer une co-évaluation ou auto-évaluation guidée à mi-parcours.
- Rappeler la possibilité d'adapter le rendu pour les élèves à besoins éducatifs particuliers.

============================================================

`;

  // Diapositive Ressources & QR Codes
  const diapoRessourcesNum = diapoEvalNum + 1;
  md += `[DIAPOSITIVE ${diapoRessourcesNum}] : Ressources Documentaires & Liens Flash
------------------------------------------------------------
**À L'ÉCRAN :**
## Ressources & Sources en Ligne
${seq.ressources
  .map(
    (r, i) => `### ${i + 1}. ${r.titre}
- Lien : [${r.url}](${r.url})
- *${r.description}*
*(Scannez le QR Code projeté à l'écran)*`
  )
  .join('\n\n')}

---
**NOTES DE L'ORATEUR :**
- Projeter les QR codes au tableau pour que les élèves munis de leurs tablettes puissent accéder directement aux sources fiables.
- Rappeler les règles de citation des sources numériques et de droit d'auteur.

============================================================
`;

  return md;
}

/**
 * Format 3 : Format Tableau Word / Google Docs
 * Tableaux Markdown propres et complets, prêts à être sélectionnés et collés directement dans Word sans perte de mise en page.
 * Cases décochées et parties textes avec exemples grisés/indicatifs.
 */
function generateTableauWordMarkdown(seq: PedagogicalSequence): string {
  let md = `# TABLEAU DE SÉQUENCE PÉDAGOGIQUE — ÉCOLE MOSER
*(Format tabulaire optimisé pour copier-coller direct dans Word ou Google Docs)*

---

### TABLEAU 1 : EN-TÊTE & CADRE INSTITUTIONNEL
| Paramètre | Description & Choix |
| :--- | :--- |
| **Titre de la séquence** | ${seq.enTete.titre} |
| **Discipline** | ${seq.enTete.discipline} |
| **Niveau / Degré** | ${seq.enTete.niveau} |
| **Durée globale** | ${seq.enTete.duree} |
| **Référentiel principal** | [ ] PER &nbsp;&nbsp;&nbsp; [ ] CER &nbsp;&nbsp;&nbsp; [ ] IB (PEI/DP) &nbsp;&nbsp;&nbsp; [x] ${seq.enTete.cadreReferentiel} |
| **Objectifs prioritaires** | ${seq.enTete.objectifs.map((o) => `[ ] ${o.text}`).join('<br>')} |
| **Formation Générale** | ${seq.cadrePedagogique.formationGenerale} |
| **Concepts IB** | **Clé :** ${seq.cadrePedagogique.conceptsIB.conceptCle} \| **Connexes :** ${seq.cadrePedagogique.conceptsIB.conceptsConnexes} \| **Contexte mondial :** ${seq.cadrePedagogique.conceptsIB.contexteMondial} |

---

### TABLEAU 2 : CAPACITÉS TRANSVERSALES (PER)
| Capacité transversale | Activité / Dispositif de mobilisation | Statut |
| :--- | :--- | :---: |
${seq.cadrePedagogique.capacitesTransversales
  .map(
    (c) =>
      `| **${cleanTableCell(c.nom)}** | ${cleanTableCell(c.description)} | [ ] Activée |`
  )
  .join('\n')}

---

### TABLEAU 3 : PLANIFICATION SYNOPTIQUE DES PHASES D'APPRENTISSAGE
| Phase & Durée | Objectifs & Activités des élèves | Posture & Rôle prof | Intégration Numérique [SAMR] | Différenciation & CUA | Statut |
| :--- | :--- | :--- | :--- | :--- | :---: |
${seq.planification.phases
  .map(
    (p) =>
      `| **${cleanTableCell(p.phaseDuree)}** | ${cleanTableCell(p.objectifsActivites)} | ${cleanTableCell(p.roleProf)} | ${cleanTableCell(p.outilsSAMR)} | ${cleanTableCell(p.cuaDifferenciation)} | [ ] Validé |`
  )
  .join('\n')}

---

### TABLEAU 4 : STRATÉGIE D'ÉVALUATION ET GRILLE CRITÉRIÉE (CER)
| Modalité | Descriptif du dispositif |
| :--- | :--- |
| **Évaluation Formative** | ${cleanTableCell(seq.evaluation.dispositifsFormatifs)} |
| **Tâche Sommative Authentique** | ${cleanTableCell(seq.evaluation.tacheSommative)} |

| Critère d'évaluation | Indicateurs observables | Niveau 1 : Insuffisant | Niveau 2 : Partiel | Niveau 3 : Atteint | Niveau 4 : Dépassé |
| :--- | :--- | :--- | :--- | :--- | :--- |
${seq.evaluation.grilleCriteriee
  .map(
    (g) =>
      `| **${cleanTableCell(g.critere)}** | ${cleanTableCell(g.indicateurs)} | ${cleanTableCell(g.insuffisant)} | ${cleanTableCell(g.partiel)} | ${cleanTableCell(g.atteint)} | ${cleanTableCell(g.depasse)} |`
  )
  .join('\n')}

---

### TABLEAU 5 : DIFFÉRENCIATION, REMÉDIATION & ENRICHISSEMENT
| Dimension pédagogique | Mesures concrètes prévues |
| :--- | :--- |
| **Besoins particuliers & CUA** | ${cleanTableCell(seq.differenciation.mesuresAdaptation)} |
| **Dispositifs de remédiation** | ${cleanTableCell(seq.differenciation.remédiation)} |
| **Pistes d'enrichissement** | ${cleanTableCell(seq.enrichissement.pistesApprofondissement)} |

---

### TABLEAU 6 : RESSOURCES EN LIGNE, LIENS & QR CODES
| N° | Ressource & Titre | Type | URL & Lien cliquable | Description pédagogique |
| :---: | :--- | :--- | :--- | :--- |
${seq.ressources.length === 0 ? '| — | *[Espace libre pour coller des liens sources]* | — | — | *[Les QR codes et liens apparaîtront ici]* |' : seq.ressources
  .map(
    (r, i) =>
      `| ${i + 1} | **${cleanTableCell(r.titre, 'Ressource')}** | ${cleanTableCell(r.type || 'Lien Web')} | [${r.url}](${r.url}) | ${cleanTableCell(r.description, 'Lien et QR code')} |`
  )
  .join('\n')}
`;

  return md;
}

function cleanTableCell(text: string, placeholder?: string): string {
  const content = text && text.trim() ? text : placeholder ? `*${placeholder}*` : '—';
  return content.replace(/\|/g, '\\|').replace(/\n+/g, ' ');
}
