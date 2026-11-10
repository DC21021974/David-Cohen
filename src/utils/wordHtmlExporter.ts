import { PedagogicalSequence, ViewFormat } from '../types/sequence';

/**
 * Builds rich HTML with inline CSS matching École Moser corporate identity (#002C50 and #95EA31).
 * When copied to clipboard as 'text/html' or downloaded as .doc, Microsoft Word and Google Docs
 * render the exact tables, borders, colors, and embedded QR code images seamlessly.
 */
export function generateWordExportHtml(sequence: PedagogicalSequence, format: ViewFormat): string {
  const blue = '#002C50';
  const green = '#95EA31';
  const lightBlue = '#F0F6FA';
  const borderGray = '#CBD5E1';

  let contentHtml = '';

  if (format === 'diaporama') {
    contentHtml = generateDiaporamaWordHtml(sequence, blue, green);
  } else if (format === 'tableau_word') {
    contentHtml = generateTableauWordHtml(sequence, blue, green, lightBlue, borderGray);
  } else {
    contentHtml = generateStandardWordHtml(sequence, blue, green, lightBlue, borderGray);
  }

  return `<!DOCTYPE html>
<html xmlns:o="urn:schemas-microsoft-com:office:office"
      xmlns:w="urn:schemas-microsoft-com:office:word"
      xmlns="http://www.w3.org/TR/REC-html40">
<head>
  <meta charset="utf-8">
  <title>${escapeXml(sequence.enTete.titre || 'Séquence Pédagogique')} — École Moser</title>
  <!--[if gte mso 9]>
  <xml>
    <w:WordDocument>
      <w:View>Print</w:View>
      <w:Zoom>100</w:Zoom>
      <w:DoNotOptimizeForBrowser/>
    </w:WordDocument>
  </xml>
  <![endif]-->
  <style>
    body {
      font-family: 'Segoe UI', Calibri, Arial, sans-serif;
      font-size: 11pt;
      line-height: 1.5;
      color: #1E293B;
      background-color: #FFFFFF;
      margin: 20mm;
    }
    h1 {
      font-size: 17pt;
      color: ${blue};
      border-bottom: 2pt solid ${blue};
      padding-bottom: 5pt;
      margin-top: 18pt;
      margin-bottom: 12pt;
    }
    h2 {
      font-size: 13pt;
      color: ${blue};
      border-left: 4pt solid ${green};
      padding-left: 8pt;
      margin-top: 14pt;
      margin-bottom: 8pt;
    }
    h3 {
      font-size: 11pt;
      color: ${blue};
      margin-top: 10pt;
      margin-bottom: 4pt;
    }
    table {
      width: 100%;
      border-collapse: collapse;
      margin-top: 8pt;
      margin-bottom: 16pt;
      font-size: 10pt;
    }
    th {
      background-color: ${blue};
      color: #FFFFFF;
      font-weight: bold;
      text-align: left;
      padding: 6pt 8pt;
      border: 1pt solid ${blue};
    }
    td {
      padding: 6pt 8pt;
      border: 1pt solid ${borderGray};
      vertical-align: top;
    }
    tr:nth-child(even) td {
      background-color: #F8FAFC;
    }
    .badge {
      display: inline-block;
      padding: 2pt 6pt;
      border-radius: 4pt;
      font-size: 9pt;
      font-weight: 600;
    }
    .badge-blue {
      background-color: #E2E8F0;
      color: ${blue};
    }
    .badge-green {
      background-color: #EBF8DC;
      color: #3B7208;
      border: 1pt solid ${green};
    }
    .header-box {
      border: 1.5pt solid ${blue};
      padding: 12pt;
      margin-bottom: 16pt;
      background-color: #FAFCFE;
    }
    .footer-note {
      font-size: 9pt;
      color: #64748B;
      text-align: center;
      margin-top: 30pt;
      border-top: 1pt solid #E2E8F0;
      padding-top: 8pt;
    }
    .example-grey {
      color: #94A3B8;
      font-style: italic;
    }
  </style>
</head>
<body>
  <!-- En-tête institutionnel avec logo École Moser -->
  <div style="text-align: center; margin-bottom: 16pt; border-bottom: 2pt solid ${blue}; padding-bottom: 12pt;">
    <div style="font-size: 22pt; font-weight: 800; color: ${blue}; letter-spacing: 1pt; font-family: 'Plus Jakarta Sans', Arial, sans-serif;">
      ÉCOLE MOSER
    </div>
    <div style="font-size: 10pt; color: #475569; margin-top: 2pt; text-transform: uppercase; letter-spacing: 2pt;">
      Ingénierie Pédagogique — Genève · Nyon · Berlin
    </div>
    <div style="height: 3pt; background-color: ${green}; width: 80px; margin: 8pt auto 0 auto;"></div>
  </div>

  ${contentHtml}

  <div class="footer-note">
    Document pédagogique officiel conforme au Plan d'études romand (PER), au Cadre d'évaluation romand (CER) et aux exigences du Baccalauréat International (IB).
    <br>École Moser © 2026 — Tous droits réservés.
  </div>
</body>
</html>`;
}

function renderFieldOrPlaceholder(val: string | undefined, placeholder: string): string {
  if (val && val.trim()) {
    return escapeXml(val);
  }
  return `<span class="example-grey">${escapeXml(placeholder)}</span>`;
}

function generateStandardWordHtml(
  seq: PedagogicalSequence,
  blue: string,
  green: string,
  lightBlue: string,
  borderGray: string
): string {
  return `
  <h1>1. EN-TÊTE DE LA SÉQUENCE PÉDAGOGIQUE</h1>
  <div class="header-box">
    <table style="border: none; margin: 0;">
      <tr>
        <td style="border: none; width: 50%;"><strong>Titre :</strong> ${renderFieldOrPlaceholder(seq.enTete.titre, "[Exemple : L'impact des microplastiques dans le Léman]")}</td>
        <td style="border: none; width: 50%;"><strong>Discipline :</strong> ${renderFieldOrPlaceholder(seq.enTete.discipline, '[Exemple : Français / Sciences]')}</td>
      </tr>
      <tr>
        <td style="border: none;"><strong>Niveau / Classe :</strong> ${renderFieldOrPlaceholder(seq.enTete.niveau, '[Exemple : 9e Harmos / 10e / PEI 4]')}</td>
        <td style="border: none;"><strong>Durée :</strong> ${renderFieldOrPlaceholder(seq.enTete.duree, '[Exemple : 4 périodes de 45 min]')}</td>
      </tr>
      <tr>
        <td style="border: none;" colspan="2"><strong>Cadre d'alignement :</strong> <span class="badge badge-green">${escapeXml(seq.enTete.cadreReferentiel)}</span></td>
      </tr>
    </table>
    <div style="margin-top: 10pt;">
      <strong>Objectifs d'apprentissage visés :</strong>
      <ul style="margin-top: 4pt; padding-left: 20pt;">
        ${seq.enTete.objectifs
          .map(
            (o, i) =>
              `<li>${o.checked ? '☒' : '☐'} ${renderFieldOrPlaceholder(o.text, `[Exemple : Objectif d'apprentissage ${i + 1}]`)}</li>`
          )
          .join('')}
      </ul>
    </div>
  </div>

  <h1>2. CADRE PÉDAGOGIQUE & TRANSVERSALITÉ</h1>
  <h2>2.1 Capacités Transversales (PER)</h2>
  <table>
    <thead>
      <tr>
        <th style="width: 25%;">Capacité transversale</th>
        <th style="width: 65%;">Dispositif de mobilisation & Activité</th>
        <th style="width: 10%; text-align: center;">Statut</th>
      </tr>
    </thead>
    <tbody>
      ${seq.cadrePedagogique.capacitesTransversales
        .map(
          (c) => `
        <tr>
          <td><strong>${escapeXml(c.nom)}</strong></td>
          <td>${renderFieldOrPlaceholder(c.description, `[Exemple indicatif : Activité pour ${c.nom.toLowerCase()}...]`)}</td>
          <td style="text-align: center;">${c.checked ? '☒' : '☐'}</td>
        </tr>`
        )
        .join('')}
    </tbody>
  </table>

  <h2>2.2 Formation Générale (PER)</h2>
  <p>${renderFieldOrPlaceholder(seq.cadrePedagogique.formationGenerale, "[Exemple : Médias, images et technologies (MITIC) - Éthique citoyenne]")}</p>

  <h2>2.3 Concepts & Contextes IB</h2>
  <table>
    <tr>
      <td style="width: 30%; background-color: ${lightBlue};"><strong>Concept Clé :</strong></td>
      <td>${renderFieldOrPlaceholder(seq.cadrePedagogique.conceptsIB.conceptCle, '[Exemple : Systèmes]')}</td>
    </tr>
    <tr>
      <td style="background-color: ${lightBlue};"><strong>Concepts Connexes :</strong></td>
      <td>${renderFieldOrPlaceholder(seq.cadrePedagogique.conceptsIB.conceptsConnexes, '[Exemple : Équilibre, Fonction]')}</td>
    </tr>
    <tr>
      <td style="background-color: ${lightBlue};"><strong>Contexte Mondial :</strong></td>
      <td>${renderFieldOrPlaceholder(seq.cadrePedagogique.conceptsIB.contexteMondial, '[Exemple : Mondialisation et durabilité]')}</td>
    </tr>
  </table>

  <h1>3. PLANIFICATION DÉTAILLÉE</h1>
  <table>
    <thead>
      <tr>
        <th style="width: 18%;">Phase / Durée</th>
        <th style="width: 28%;">Objectifs & Activités</th>
        <th style="width: 18%;">Rôle prof</th>
        <th style="width: 18%;">Outils [SAMR]</th>
        <th style="width: 18%;">CUA & Différenciation</th>
      </tr>
    </thead>
    <tbody>
      ${seq.planification.phases
        .map(
          (p, i) => `
        <tr>
          <td><strong>${renderFieldOrPlaceholder(p.phaseDuree, `[Phase ${i + 1} (20 min)]`)}</strong></td>
          <td>${renderFieldOrPlaceholder(p.objectifsActivites, "[Exemple : Consigne élève, travail d'équipe...]")}</td>
          <td>${renderFieldOrPlaceholder(p.roleProf, "[Exemple : Questionnement socratique, étayage...]")}</td>
          <td>${renderFieldOrPlaceholder(p.outilsSAMR, "[Exemple : Augmentation / Modification : Outil numérique...]")}</td>
          <td>${renderFieldOrPlaceholder(p.cuaDifferenciation, "[Exemple : Consignes audio/visuelles doublées...]")}</td>
        </tr>`
        )
        .join('')}
    </tbody>
  </table>

  <h1>4. STRATÉGIE D'ÉVALUATION (ALIGNÉE CER)</h1>
  <p><strong>Dispositifs formatifs :</strong> ${renderFieldOrPlaceholder(seq.evaluation.dispositifsFormatifs, '[Exemple : Billet de sortie flash, auto-évaluation guidée...]')}</p>
  <p><strong>Tâche sommative authentique :</strong> ${renderFieldOrPlaceholder(seq.evaluation.tacheSommative, '[Exemple : Rédaction d\'un rapport critique étayé de sources...]')}</p>

  <h2>Grille d'Évaluation Critériée</h2>
  <table>
    <thead>
      <tr>
        <th style="width: 20%;">Critère d'évaluation</th>
        <th style="width: 20%;">Indicateurs</th>
        <th style="width: 15%;">Insuffisant (1)</th>
        <th style="width: 15%;">Partiel (2)</th>
        <th style="width: 15%;">Atteint (3)</th>
        <th style="width: 15%;">Dépassé (4)</th>
      </tr>
    </thead>
    <tbody>
      ${seq.evaluation.grilleCriteriee
        .map(
          (g, i) => `
        <tr>
          <td><strong>${renderFieldOrPlaceholder(g.critere, `[Critère ${i + 1}]`)}</strong></td>
          <td>${renderFieldOrPlaceholder(g.indicateurs, '[Indicateurs observables...]')}</td>
          <td style="background-color: #FEF2F2;">${renderFieldOrPlaceholder(g.insuffisant, '[Niveau 1]')}</td>
          <td style="background-color: #FFFBEB;">${renderFieldOrPlaceholder(g.partiel, '[Niveau 2]')}</td>
          <td style="background-color: #F0FDF4;">${renderFieldOrPlaceholder(g.atteint, '[Niveau 3]')}</td>
          <td style="background-color: #EFF6FF;">${renderFieldOrPlaceholder(g.depasse, '[Niveau 4]')}</td>
        </tr>`
        )
        .join('')}
    </tbody>
  </table>

  <h1>5. DIFFÉRENCIATION & REMÉDIATION</h1>
  <p><strong>Mesures d'adaptation (CUA & Besoins particuliers) :</strong><br>${renderFieldOrPlaceholder(seq.differenciation.mesuresAdaptation, '[Exemple : Polices adaptées, temps majoré de 25%, fiches étapes...]')}</p>
  <p><strong>Dispositif de remédiation :</strong><br>${renderFieldOrPlaceholder(seq.differenciation.remédiation, '[Exemple : Atelier dirigé avec l\'enseignant en petit groupe de 3 élèves...]')}</p>

  <h1>6. SUGGESTIONS D'ENRICHISSEMENT</h1>
  <p>${renderFieldOrPlaceholder(seq.enrichissement.pistesApprofondissement, '[Exemple : Analyse d\'un article de recherche ou projet transdisciplinaire...]')}</p>

  <h1>7. RESSOURCES EN LIGNE (LIENS & QR CODES)</h1>
  <p>Les sources ci-dessous sont accessibles via les liens hypertextes et les QR codes associés à destination des élèves :</p>
  ${
    seq.ressources.length === 0
      ? `<p class="example-grey">[Aucune ressource en ligne configurée pour le moment. Collez un lien dans la section 7 pour générer automatiquement le QR code.]</p>`
      : `<table>
    <thead>
      <tr>
        <th style="width: 25%;">Ressource & Titre</th>
        <th style="width: 45%;">Description & Lien</th>
        <th style="width: 30%; text-align: center;">QR Code d'accès</th>
      </tr>
    </thead>
    <tbody>
      ${seq.ressources
        .map(
          (r) => `
        <tr>
          <td>
            <strong>${escapeXml(r.titre)}</strong>
            <br><span class="badge badge-blue">${escapeXml(r.type || 'Lien')}</span>
          </td>
          <td>
            ${escapeXml(r.description)}
            <br><br>
            <a href="${escapeXml(r.url)}" style="color: ${blue}; font-weight: bold; text-decoration: underline;" target="_blank">
              ${escapeXml(r.url)}
            </a>
          </td>
          <td style="text-align: center;">
            ${
              r.qrCodeDataUrl
                ? `<img src="${r.qrCodeDataUrl}" width="110" height="110" alt="QR Code ${escapeXml(r.titre)}" style="border: 1pt solid ${borderGray}; padding: 4pt; background: #fff;" />`
                : `<span style="font-size: 9pt; color: #64748B;">Scannez : ${escapeXml(r.url)}</span>`
            }
          </td>
        </tr>`
        )
        .join('')}
    </tbody>
  </table>`
  }
  `;
}

function generateDiaporamaWordHtml(seq: PedagogicalSequence, blue: string, green: string): string {
  let html = `<h1>DIAPORAMA DE COURS & NOTES D'ORATEUR</h1>`;

  // Diapo 1
  html += `
  <div style="border: 1.5pt solid ${blue}; margin-bottom: 20pt; padding: 12pt; page-break-after: always;">
    <div style="background-color: ${blue}; color: #fff; padding: 6pt 10pt; font-weight: bold; margin: -12pt -12pt 12pt -12pt;">
      [DIAPOSITIVE 1] : Titre & Objectifs
    </div>
    <div style="background-color: #F8FAFC; padding: 10pt; border: 1pt solid #E2E8F0; margin-bottom: 10pt;">
      <h2 style="margin: 0 0 6pt 0;">${renderFieldOrPlaceholder(seq.enTete.titre, '[Titre de la séquence]')}</h2>
      <p style="margin: 0;"><strong>${renderFieldOrPlaceholder(seq.enTete.discipline, '[Discipline]')} — ${renderFieldOrPlaceholder(seq.enTete.niveau, '[Niveau]')}</strong> (${renderFieldOrPlaceholder(seq.enTete.duree, '[Durée]')})</p>
      <h3 style="margin-top: 10pt;">À L'ÉCRAN :</h3>
      <ul>
        ${seq.enTete.objectifs.map((o, i) => `<li>${renderFieldOrPlaceholder(o.text, `[Objectif ${i + 1}]`)}</li>`).join('')}
      </ul>
    </div>
    <div style="background-color: #FFFDF0; border: 1pt solid #FDE68A; padding: 8pt;">
      <strong style="color: #92400E;">NOTES DE L'ORATEUR :</strong>
      <p style="margin: 4pt 0 0 0;">Présentation du projet pédagogique, formulation des attentes d'apprentissage et contractualisation de la démarche.</p>
    </div>
  </div>`;

  // Diapositives des phases
  seq.planification.phases.forEach((p, idx) => {
    html += `
    <div style="border: 1.5pt solid ${blue}; margin-bottom: 20pt; padding: 12pt; page-break-after: always;">
      <div style="background-color: ${blue}; color: #fff; padding: 6pt 10pt; font-weight: bold; margin: -12pt -12pt 12pt -12pt;">
        [DIAPOSITIVE ${idx + 2}] : ${renderFieldOrPlaceholder(p.phaseDuree, `[Phase ${idx + 1}]`)}
      </div>
      <div style="background-color: #F8FAFC; padding: 10pt; border: 1pt solid #E2E8F0; margin-bottom: 10pt;">
        <h3 style="margin-top: 0;">À L'ÉCRAN :</h3>
        <p><strong>Activités :</strong> ${renderFieldOrPlaceholder(p.objectifsActivites, '[Consignes et démarches des élèves]')}</p>
        <p><strong>Outils [SAMR] :</strong> ${renderFieldOrPlaceholder(p.outilsSAMR, '[Outils numériques mobilisés]')}</p>
        <p><strong>Accessibilité [CUA] :</strong> ${renderFieldOrPlaceholder(p.cuaDifferenciation, '[Mesures d\'accessibilité et différenciation]')}</p>
      </div>
      <div style="background-color: #FFFDF0; border: 1pt solid #FDE68A; padding: 8pt;">
        <strong style="color: #92400E;">NOTES DE L'ORATEUR :</strong>
        <p style="margin: 4pt 0 0 0;"><strong>Rôle enseignant :</strong> ${renderFieldOrPlaceholder(p.roleProf, '[Posture d\'étayage et relances méthodologiques]')}</p>
      </div>
    </div>`;
  });

  return html;
}

function generateTableauWordHtml(
  seq: PedagogicalSequence,
  blue: string,
  green: string,
  lightBlue: string,
  borderGray: string
): string {
  return generateStandardWordHtml(seq, blue, green, lightBlue, borderGray);
}

function escapeXml(unsafe: string = ''): string {
  return unsafe
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}
