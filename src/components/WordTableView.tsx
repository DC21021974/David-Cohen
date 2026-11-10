import React, { useRef, useState } from 'react';
import { PedagogicalSequence, RessourceLien } from '../types/sequence';
import { Copy, Check, ExternalLink, QrCode, Link2, FileDown } from 'lucide-react';

interface WordTableViewProps {
  sequence: PedagogicalSequence;
  onCopyWordHtml: () => void;
  isCopiedWord: boolean;
  onAddResource?: (newRes: Omit<RessourceLien, 'id'>) => void;
  onPrint?: () => void;
}

export const WordTableView: React.FC<WordTableViewProps> = ({
  sequence,
  onCopyWordHtml,
  isCopiedWord,
  onAddResource,
  onPrint,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [quickUrl, setQuickUrl] = useState('');

  const handleQuickAdd = (e: React.FormEvent) => {
    e.preventDefault();
    if (!quickUrl.trim() || !onAddResource) return;

    let url = quickUrl.trim();
    if (!url.startsWith('http://') && !url.startsWith('https://')) {
      url = 'https://' + url;
    }

    let title = 'Ressource Web';
    try {
      const parsed = new URL(url);
      title = parsed.hostname.replace('www.', '');
    } catch {
      title = 'Ressource en ligne';
    }

    onAddResource({
      titre: title,
      url: url,
      description: 'Lien direct et QR code d\'accès pour les élèves.',
      type: 'Source en ligne',
    });

    setQuickUrl('');
  };

  return (
    <div className="space-y-6">
      {/* Informative Header Banner */}
      <div className="bg-white rounded-2xl border-2 border-slate-200 p-5 flex flex-wrap items-center justify-between gap-4 no-print shadow-xs">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-black uppercase tracking-wider text-[#002C50]">
              Format 3 : Tableaux Structurés Word & Google Docs
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Tableaux complets prêts à être sélectionnés et collés sans perte de mise en page. Cases décochées (☐) et exemples grisés en italique.
          </p>
        </div>

        <div className="flex items-center gap-3">
          {onPrint && (
            <button
              type="button"
              onClick={onPrint}
              className="flex items-center gap-2 px-4 py-2.5 bg-rose-700 hover:bg-rose-800 active:bg-rose-900 text-white text-xs sm:text-sm font-extrabold rounded-xl transition-all cursor-pointer shadow-xs active:scale-95"
            >
              <FileDown className="w-4 h-4 text-white" />
              <span>Exporter en PDF</span>
            </button>
          )}

          <button
            type="button"
            onClick={onCopyWordHtml}
            className="flex items-center gap-2 px-5 py-2.5 bg-[#002C50] hover:bg-[#001e38] text-white text-xs sm:text-sm font-extrabold rounded-xl transition-all cursor-pointer shadow-xs active:scale-95"
          >
            {isCopiedWord ? (
              <>
                <Check className="w-4 h-4 text-[#95EA31]" />
                <span className="text-[#95EA31]">Tableaux copiés pour Word !</span>
              </>
            ) : (
              <>
                <Copy className="w-4 h-4 text-[#95EA31]" />
                <span>Copier les tableaux pour Word</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Free Paste Box for Resource (as requested) */}
      {onAddResource && (
        <div className="p-4 rounded-xl bg-white border border-[#002C50]/20 flex flex-col sm:flex-row items-center gap-3 no-print">
          <div className="flex items-center gap-2 text-xs font-bold text-[#002C50] shrink-0">
            <Link2 className="w-4 h-4 text-[#002C50]" />
            <span>Coller un lien ressource :</span>
          </div>
          <form onSubmit={handleQuickAdd} className="flex-1 flex items-center gap-2 w-full">
            <input
              type="text"
              value={quickUrl}
              onChange={(e) => setQuickUrl(e.target.value)}
              placeholder="https://www.rts.ch/decouverte..."
              className="flex-1 text-xs px-3 py-1.5 border border-slate-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#002C50] font-mono"
            />
            <button
              type="submit"
              disabled={!quickUrl.trim()}
              className="px-3.5 py-1.5 bg-[#002C50] text-white text-xs font-bold rounded-lg hover:bg-[#001e38] disabled:opacity-40 cursor-pointer shrink-0"
            >
              Générer QR & Ajouter
            </button>
          </form>
        </div>
      )}

      {/* Main Container styled for Word copy-paste */}
      <div
        ref={containerRef}
        className="bg-white p-6 sm:p-10 rounded-2xl border-2 border-[#002C50] shadow-sm space-y-8 select-text"
      >
        {/* En-tête Institutionnel École Moser */}
        <div className="flex items-center justify-between border-b-2 border-[#002C50] pb-4">
          <div className="flex items-center gap-4">
            <img
              src="/assets/aistudio/logo_Moser_ac2383db.jpg"
              alt="École Moser"
              className="h-12 w-auto object-contain"
            />
          </div>
          <div className="text-right">
            <div className="text-sm font-bold text-[#002C50] uppercase tracking-wider">
              FICHE SYNTHÉTIQUE DE SÉQUENCE PÉDAGOGIQUE
            </div>
            <div className="text-xs text-slate-500">
              Alignement : PER · CER · IB MYP/DP · Modèle SAMR & CUA
            </div>
          </div>
        </div>

        {/* TABLEAU 1 : EN-TÊTE & PARAMÈTRES INSTITUTIONNELS */}
        <div>
          <div className="flex items-center gap-2 mb-2">
            <div className="w-2.5 h-2.5 bg-[#95EA31] rounded-xs" />
            <h3 className="text-xs font-bold text-[#002C50] uppercase tracking-wider">
              Tableau 1 : En-tête & Paramètres Institutionnels
            </h3>
          </div>

          <table className="w-full text-xs border-collapse border border-[#002C50]">
            <tbody>
              <tr>
                <td className="w-1/4 p-2.5 font-bold text-[#002C50] bg-[#F0F6FA] border border-slate-300">
                  Titre de la séquence
                </td>
                <td className="p-2.5 font-semibold text-slate-900 border border-slate-300">
                  {sequence.enTete.titre ? (
                    sequence.enTete.titre
                  ) : (
                    <span className="text-slate-400 italic">[Exemple : L'impact des microplastiques dans les écosystèmes lacustres lémaniques]</span>
                  )}
                </td>
              </tr>
              <tr>
                <td className="p-2.5 font-bold text-[#002C50] bg-[#F0F6FA] border border-slate-300">
                  Discipline & Niveau
                </td>
                <td className="p-2.5 text-slate-800 border border-slate-300">
                  {sequence.enTete.discipline ? (
                    <strong>{sequence.enTete.discipline}</strong>
                  ) : (
                    <span className="text-slate-400 italic">[Exemple : Sciences de la Nature / Français]</span>
                  )}
                  {' — '}
                  {sequence.enTete.niveau ? (
                    sequence.enTete.niveau
                  ) : (
                    <span className="text-slate-400 italic">[Exemple : 9e Harmos / 10e / PEI 4]</span>
                  )}
                </td>
              </tr>
              <tr>
                <td className="p-2.5 font-bold text-[#002C50] bg-[#F0F6FA] border border-slate-300">
                  Durée estimée
                </td>
                <td className="p-2.5 text-slate-800 border border-slate-300">
                  {sequence.enTete.duree || (
                    <span className="text-slate-400 italic">[Exemple : 4 périodes de 45 minutes]</span>
                  )}
                </td>
              </tr>
              <tr>
                <td className="p-2.5 font-bold text-[#002C50] bg-[#F0F6FA] border border-slate-300">
                  Cadre Référentiel
                </td>
                <td className="p-2.5 text-slate-800 border border-slate-300">
                  <span className="inline-flex items-center gap-4">
                    <span>{sequence.enTete.cadreReferentiel === 'PER' ? '☒' : '☐'} PER</span>
                    <span>{sequence.enTete.cadreReferentiel === 'CER' ? '☒' : '☐'} CER</span>
                    <span>{sequence.enTete.cadreReferentiel === 'IB' ? '☒' : '☐'} Baccalauréat International (IB)</span>
                    <span>{sequence.enTete.cadreReferentiel === 'MIXTE' ? '☒' : '☐'} Mixte (PER/CER/IB)</span>
                  </span>
                </td>
              </tr>
              <tr>
                <td className="p-2.5 font-bold text-[#002C50] bg-[#F0F6FA] border border-slate-300 align-top">
                  Objectifs d'apprentissage visés
                </td>
                <td className="p-2.5 text-slate-800 border border-slate-300">
                  <ul className="space-y-1.5">
                    {sequence.enTete.objectifs.map((obj, i) => (
                      <li key={obj.id} className="flex items-start gap-2">
                        <span className="font-mono text-slate-600 font-bold">{obj.checked ? '☒' : '☐'}</span>
                        {obj.text ? (
                          <span>{obj.text}</span>
                        ) : (
                          <span className="text-slate-400 italic">
                            [Exemple : PER MSN 36 / L1 31 - Objectif prioritaire {i + 1}]
                          </span>
                        )}
                      </li>
                    ))}
                  </ul>
                </td>
              </tr>
              <tr>
                <td className="p-2.5 font-bold text-[#002C50] bg-[#F0F6FA] border border-slate-300">
                  Formation Générale
                </td>
                <td className="p-2.5 text-slate-700 border border-slate-300">
                  {sequence.cadrePedagogique.formationGenerale || (
                    <span className="text-slate-400 italic">
                      [Exemple : Médias, images et technologies de l'information (MITIC) - Éthique citoyenne]
                    </span>
                  )}
                </td>
              </tr>
              <tr>
                <td className="p-2.5 font-bold text-[#002C50] bg-[#F0F6FA] border border-slate-300">
                  Concepts & Contextes IB
                </td>
                <td className="p-2.5 text-slate-700 border border-slate-300">
                  <strong>Concept Clé :</strong>{' '}
                  {sequence.cadrePedagogique.conceptsIB.conceptCle || (
                    <span className="text-slate-400 italic">[Exemple : Systèmes]</span>
                  )}{' '}
                  &nbsp;|&nbsp; <strong>Concepts Connexes :</strong>{' '}
                  {sequence.cadrePedagogique.conceptsIB.conceptsConnexes || (
                    <span className="text-slate-400 italic">[Exemple : Fonction, Équilibre]</span>
                  )}{' '}
                  &nbsp;|&nbsp; <strong>Contexte Mondial :</strong>{' '}
                  {sequence.cadrePedagogique.conceptsIB.contexteMondial || (
                    <span className="text-slate-400 italic">[Exemple : Mondialisation et durabilité]</span>
                  )}
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* TABLEAU 2 : CAPACITÉS TRANSVERSALES (PER) */}
        <div>
          <div className="flex items-center gap-2 mb-2">
            <div className="w-2.5 h-2.5 bg-[#95EA31] rounded-xs" />
            <h3 className="text-xs font-bold text-[#002C50] uppercase tracking-wider">
              Tableau 2 : Capacités Transversales (Plan d'Études Romand)
            </h3>
          </div>

          <table className="w-full text-xs border-collapse border border-slate-300">
            <thead>
              <tr className="bg-[#002C50] text-white">
                <th className="p-2.5 text-left border border-[#002C50] font-semibold w-1/4">
                  Capacité transversale
                </th>
                <th className="p-2.5 text-left border border-[#002C50] font-semibold w-2/3">
                  Activité concrète / Dispositif de mobilisation
                </th>
                <th className="p-2.5 text-center border border-[#002C50] font-semibold w-[10%]">
                  Statut
                </th>
              </tr>
            </thead>
            <tbody>
              {sequence.cadrePedagogique.capacitesTransversales.map((c, idx) => (
                <tr key={c.id} className={idx % 2 === 0 ? 'bg-white' : 'bg-[#F8FAFC]'}>
                  <td className="p-2.5 font-bold text-[#002C50] border border-slate-300">
                    {c.nom}
                  </td>
                  <td className="p-2.5 text-slate-700 border border-slate-300">
                    {c.description || (
                      <span className="text-slate-400 italic">
                        [Exemple indicatif : Dispositif de mobilisation pour {c.nom.toLowerCase()}...]
                      </span>
                    )}
                  </td>
                  <td className="p-2.5 text-center font-mono text-slate-700 border border-slate-300 font-bold">
                    {c.checked ? '☒' : '☐'}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* TABLEAU 3 : PLANIFICATION SYNOPTIQUE DES PHASES */}
        <div>
          <div className="flex items-center gap-2 mb-2">
            <div className="w-2.5 h-2.5 bg-[#95EA31] rounded-xs" />
            <h3 className="text-xs font-bold text-[#002C50] uppercase tracking-wider">
              Tableau 3 : Planification Synoptique des Phases d'Apprentissage
            </h3>
          </div>

          <table className="w-full text-xs border-collapse border border-slate-300">
            <thead>
              <tr className="bg-[#002C50] text-white">
                <th className="p-2.5 text-left border border-[#002C50] font-semibold w-[18%]">
                  Phase & Durée
                </th>
                <th className="p-2.5 text-left border border-[#002C50] font-semibold w-[28%]">
                  Objectifs & Activités élèves
                </th>
                <th className="p-2.5 text-left border border-[#002C50] font-semibold w-[18%]">
                  Rôle prof
                </th>
                <th className="p-2.5 text-left border border-[#002C50] font-semibold w-[18%]">
                  Outils [SAMR]
                </th>
                <th className="p-2.5 text-left border border-[#002C50] font-semibold w-[18%]">
                  CUA & Différenciation
                </th>
              </tr>
            </thead>
            <tbody>
              {sequence.planification.phases.map((p, idx) => (
                <tr key={p.id} className={idx % 2 === 0 ? 'bg-white' : 'bg-[#F8FAFC]'}>
                  <td className="p-2.5 font-bold text-[#002C50] border border-slate-300 align-top">
                    {p.phaseDuree || (
                      <span className="text-slate-400 italic">[Exemple : Phase {idx + 1} (20 min)]</span>
                    )}
                  </td>
                  <td className="p-2.5 text-slate-700 border border-slate-300 align-top">
                    {p.objectifsActivites || (
                      <span className="text-slate-400 italic">[Exemple : Consigne élève, travail d'équipe...]</span>
                    )}
                  </td>
                  <td className="p-2.5 text-slate-700 border border-slate-300 align-top">
                    {p.roleProf || (
                      <span className="text-slate-400 italic">[Exemple : Questionnement ouvert, étayage...]</span>
                    )}
                  </td>
                  <td className="p-2.5 text-slate-700 border border-slate-300 align-top">
                    {p.outilsSAMR || (
                      <span className="text-slate-400 italic">[Exemple : Augmentation / Modification...]</span>
                    )}
                  </td>
                  <td className="p-2.5 text-slate-700 border border-slate-300 align-top">
                    {p.cuaDifferenciation || (
                      <span className="text-slate-400 italic">[Exemple : Accessibilité CUA, guidage par paliers...]</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* TABLEAU 4 : STRATÉGIE D'ÉVALUATION ET GRILLE CRITÉRIÉE */}
        <div>
          <div className="flex items-center gap-2 mb-2">
            <div className="w-2.5 h-2.5 bg-[#95EA31] rounded-xs" />
            <h3 className="text-xs font-bold text-[#002C50] uppercase tracking-wider">
              Tableau 4 : Stratégie d'Évaluation & Grille Critériée (CER)
            </h3>
          </div>

          <div className="mb-3">
            <table className="w-full text-xs border-collapse border border-slate-300 mb-3">
              <tbody>
                <tr>
                  <td className="w-1/4 p-2.5 font-bold text-[#002C50] bg-[#F0F6FA] border border-slate-300">
                    Évaluation Formative
                  </td>
                  <td className="p-2.5 text-slate-700 border border-slate-300">
                    {sequence.evaluation.dispositifsFormatifs || (
                      <span className="text-slate-400 italic">[Exemple : Billet de sortie flash, auto-évaluation guidée...]</span>
                    )}
                  </td>
                </tr>
                <tr>
                  <td className="p-2.5 font-bold text-[#002C50] bg-[#F0F6FA] border border-slate-300">
                    Tâche Sommative Authentique
                  </td>
                  <td className="p-2.5 text-slate-700 border border-slate-300">
                    {sequence.evaluation.tacheSommative || (
                      <span className="text-slate-400 italic">[Exemple : Rédaction d'un rapport critique étayé de sources...]</span>
                    )}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <table className="w-full text-xs border-collapse border border-slate-300">
            <thead>
              <tr className="bg-[#002C50] text-white">
                <th className="p-2.5 text-left border border-[#002C50] font-semibold w-[20%]">
                  Critère
                </th>
                <th className="p-2.5 text-left border border-[#002C50] font-semibold w-[20%]">
                  Indicateurs
                </th>
                <th className="p-2.5 text-left border border-[#002C50] font-semibold w-[15%]">
                  Insuffisant (1)
                </th>
                <th className="p-2.5 text-left border border-[#002C50] font-semibold w-[15%]">
                  Partiel (2)
                </th>
                <th className="p-2.5 text-left border border-[#002C50] font-semibold w-[15%]">
                  Atteint (3)
                </th>
                <th className="p-2.5 text-left border border-[#002C50] font-semibold w-[15%]">
                  Dépassé (4)
                </th>
              </tr>
            </thead>
            <tbody>
              {sequence.evaluation.grilleCriteriee.map((g, idx) => (
                <tr key={g.id} className={idx % 2 === 0 ? 'bg-white' : 'bg-[#F8FAFC]'}>
                  <td className="p-2.5 font-bold text-[#002C50] border border-slate-300 align-top">
                    {g.critere || (
                      <span className="text-slate-400 italic">[Critère {idx + 1}]</span>
                    )}
                  </td>
                  <td className="p-2.5 text-slate-700 border border-slate-300 align-top">
                    {g.indicateurs || (
                      <span className="text-slate-400 italic">[Indicateurs observables...]</span>
                    )}
                  </td>
                  <td className="p-2.5 text-slate-700 border border-slate-300 align-top">
                    {g.insuffisant || (
                      <span className="text-slate-400 italic">[Niveau 1 : Non atteint]</span>
                    )}
                  </td>
                  <td className="p-2.5 text-slate-700 border border-slate-300 align-top">
                    {g.partiel || (
                      <span className="text-slate-400 italic">[Niveau 2 : Partiel]</span>
                    )}
                  </td>
                  <td className="p-2.5 text-slate-700 border border-slate-300 align-top font-medium">
                    {g.atteint || (
                      <span className="text-slate-400 italic">[Niveau 3 : Atteint]</span>
                    )}
                  </td>
                  <td className="p-2.5 text-[#002C50] border border-slate-300 align-top font-semibold">
                    {g.depasse || (
                      <span className="text-slate-400 italic">[Niveau 4 : Dépassé]</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* TABLEAU 5 : DIFFÉRENCIATION, REMÉDIATION & ENRICHISSEMENT */}
        <div>
          <div className="flex items-center gap-2 mb-2">
            <div className="w-2.5 h-2.5 bg-[#95EA31] rounded-xs" />
            <h3 className="text-xs font-bold text-[#002C50] uppercase tracking-wider">
              Tableau 5 : Différenciation, Remédiation & Suggestions d'Enrichissement
            </h3>
          </div>

          <table className="w-full text-xs border-collapse border border-slate-300">
            <tbody>
              <tr>
                <td className="w-1/4 p-2.5 font-bold text-[#002C50] bg-[#F0F6FA] border border-slate-300">
                  Mesures d'adaptation (CUA & Besoins Particuliers)
                </td>
                <td className="p-2.5 text-slate-700 border border-slate-300">
                  {sequence.differenciation.mesuresAdaptation || (
                    <span className="text-slate-400 italic">
                      [Exemple : Polices haute lisibilité, temps majoré de 25%, fiches étapes...]
                    </span>
                  )}
                </td>
              </tr>
              <tr>
                <td className="p-2.5 font-bold text-[#002C50] bg-[#F0F6FA] border border-slate-300">
                  Dispositifs de remédiation
                </td>
                <td className="p-2.5 text-slate-700 border border-slate-300">
                  {sequence.differenciation.remédiation || (
                    <span className="text-slate-400 italic">
                      [Exemple : Atelier dirigé en petit groupe avec l'enseignant sur la compétence clé...]
                    </span>
                  )}
                </td>
              </tr>
              <tr>
                <td className="p-2.5 font-bold text-[#002C50] bg-[#F0F6FA] border border-slate-300">
                  Pistes d'enrichissement & Interdisciplinarité
                </td>
                <td className="p-2.5 text-slate-700 border border-slate-300">
                  {sequence.enrichissement.pistesApprofondissement || (
                    <span className="text-slate-400 italic">
                      [Exemple : Étude d'un article de recherche ou projet transdisciplinaire...]
                    </span>
                  )}
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* TABLEAU 6 : RESSOURCES EN LIGNE, LIENS & QR CODES */}
        <div>
          <div className="flex items-center gap-2 mb-2">
            <div className="w-2.5 h-2.5 bg-[#95EA31] rounded-xs" />
            <h3 className="text-xs font-bold text-[#002C50] uppercase tracking-wider">
              Tableau 6 : Ressources en Ligne, Liens Cliquables & QR Codes
            </h3>
          </div>

          {sequence.ressources.length === 0 ? (
            <div className="p-6 border border-dashed border-slate-300 rounded-xl text-center bg-[#F8FAFC]">
              <QrCode className="w-8 h-8 text-[#002C50]/30 mx-auto mb-2" />
              <p className="text-xs text-slate-500 italic">
                [Espace libre pour coller des liens vers les sources en ligne. Les liens cliquables et QR codes s'afficheront automatiquement ici.]
              </p>
            </div>
          ) : (
            <table className="w-full text-xs border-collapse border border-slate-300">
              <thead>
                <tr className="bg-[#002C50] text-white">
                  <th className="p-2.5 text-left border border-[#002C50] font-semibold w-[25%]">
                    Ressource & Titre
                  </th>
                  <th className="p-2.5 text-left border border-[#002C50] font-semibold w-[50%]">
                    Description pédagogique & Lien direct
                  </th>
                  <th className="p-2.5 text-center border border-[#002C50] font-semibold w-[25%]">
                    QR Code d'accès
                  </th>
                </tr>
              </thead>
              <tbody>
                {sequence.ressources.map((r, idx) => (
                  <tr key={r.id} className={idx % 2 === 0 ? 'bg-white' : 'bg-[#F8FAFC]'}>
                    <td className="p-2.5 font-bold text-[#002C50] border border-slate-300 align-top">
                      {r.titre}
                      <div className="text-[10px] font-normal text-slate-500 mt-0.5">
                        Type : {r.type || 'Lien Web'}
                      </div>
                    </td>
                    <td className="p-2.5 text-slate-700 border border-slate-300 align-top">
                      <p className="mb-2">{r.description}</p>
                      <a
                        href={r.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[#002C50] font-semibold hover:underline inline-flex items-center gap-1"
                      >
                        <span>{r.url}</span>
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    </td>
                    <td className="p-2.5 text-center border border-slate-300 align-middle">
                      {r.qrCodeDataUrl ? (
                        <div className="inline-block p-1 bg-white border border-slate-300 rounded shadow-xs">
                          <img
                            src={r.qrCodeDataUrl}
                            alt={`QR Code ${r.titre}`}
                            className="w-20 h-20 mx-auto object-contain"
                          />
                        </div>
                      ) : (
                        <span className="text-[10px] text-slate-400">QR Code</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>

        {/* Footer Note */}
        <div className="text-center pt-4 border-t border-slate-200 text-[11px] text-slate-400">
          Document pédagogique conforme aux exigences de l'École Moser · PER / CER / IB
        </div>
      </div>
    </div>
  );
};
