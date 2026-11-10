import React, { useState } from 'react';
import { CadreReferentiel, PedagogicalSequence } from '../types/sequence';
import { initialEmptySequence, sampleSequenceMedia } from '../data/exemplarSequences';
import { Sparkles, FileSpreadsheet, BookOpen, Loader2, Check } from 'lucide-react';

interface AiGenerateModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSequenceGenerated: (seq: PedagogicalSequence) => void;
}

export const AiGenerateModal: React.FC<AiGenerateModalProps> = ({
  isOpen,
  onClose,
  onSequenceGenerated,
}) => {
  const [discipline, setDiscipline] = useState('Sciences de la Nature');
  const [niveau, setNiveau] = useState('10e Harmos / PEI 4');
  const [titre, setTitre] = useState('La biodiversité lacustre du Léman et les microplastiques');
  const [duree, setDuree] = useState('4 périodes (2 x 90 minutes)');
  const [cadre, setCadre] = useState<CadreReferentiel>('MIXTE');
  const [consignes, setConsignes] = useState(
    'Mettre l\'accent sur une démarche d\'investigation scientifique rigoureuse en laboratoire avec intégration du modèle SAMR et différenciation CUA.'
  );
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  if (!isOpen) return null;

  const handleGenerate = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMsg('');

    try {
      const response = await fetch('/api/generate-sequence', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          discipline,
          niveau,
          titre,
          duree,
          cadre,
          consignes,
          isVierge: false,
        }),
      });

      const resData = await response.json();
      if (resData.success && resData.data) {
        const generated = resData.data;
        const newSeq: PedagogicalSequence = {
          id: `seq-${Date.now()}`,
          isViergeTemplate: false,
          enTete: {
            titre: generated.enTete?.titre || titre,
            discipline: generated.enTete?.discipline || discipline,
            niveau: generated.enTete?.niveau || niveau,
            duree: generated.enTete?.duree || duree,
            cadreReferentiel: cadre,
            objectifs: (generated.enTete?.objectifs || []).map((o: any, idx: number) => ({
              id: `obj-${idx}`,
              text: typeof o === 'string' ? o : o.text || '',
              checked: false,
            })),
          },
          cadrePedagogique: {
            capacitesTransversales: (generated.cadrePedagogique?.capacitesTransversales || []).map(
              (c: any, idx: number) => ({
                id: `cap-${idx}`,
                nom: c.nom || `Capacité ${idx + 1}`,
                description: c.description || '',
                checked: false,
              })
            ),
            formationGenerale: generated.cadrePedagogique?.formationGenerale || '',
            conceptsIB: {
              conceptCle: generated.cadrePedagogique?.conceptsIB?.conceptCle || 'Systèmes',
              conceptsConnexes: generated.cadrePedagogique?.conceptsIB?.conceptsConnexes || 'Interactions',
              contexteMondial: generated.cadrePedagogique?.conceptsIB?.contexteMondial || 'Mondialisation et durabilité',
            },
          },
          planification: {
            mode: 'tableau',
            phases: (generated.planification?.phases || []).map((p: any, idx: number) => ({
              id: `p-${idx}`,
              phaseDuree: p.phaseDuree || `Phase ${idx + 1}`,
              objectifsActivites: p.objectifsActivites || '',
              roleProf: p.roleProf || '',
              outilsSAMR: p.outilsSAMR || '',
              cuaDifferenciation: p.cuaDifferenciation || '',
              checked: false,
            })),
          },
          evaluation: {
            dispositifsFormatifs: generated.evaluation?.dispositifsFormatifs || '',
            tacheSommative: generated.evaluation?.tacheSommative || '',
            grilleCriteriee: (generated.evaluation?.grilleCriteriee || []).map((g: any, idx: number) => ({
              id: `crit-${idx}`,
              critere: g.critere || `Critère ${idx + 1}`,
              indicateurs: g.indicateurs || '',
              insuffisant: g.insuffisant || '',
              partiel: g.partiel || '',
              atteint: g.atteint || '',
              depasse: g.depasse || '',
            })),
          },
          differenciation: {
            mesuresAdaptation: generated.differenciation?.mesuresAdaptation || '',
            remédiation: generated.differenciation?.remédiation || '',
          },
          enrichissement: {
            pistesApprofondissement: generated.enrichissement?.pistesApprofondissement || '',
          },
          ressources: (generated.ressources || []).map((r: any, idx: number) => ({
            id: `res-${idx}`,
            titre: r.titre || 'Ressource',
            url: r.url || 'https://www.ecolemoser.ch',
            description: r.description || '',
            type: r.type || 'Source en ligne',
          })),
        };

        onSequenceGenerated(newSeq);
        onClose();
      } else {
        setErrorMsg('Impossible de générer la séquence. Veuillez réessayer.');
      }
    } catch (err: any) {
      console.error(err);
      setErrorMsg('Erreur de communication avec le serveur.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSelectBlankTemplate = () => {
    onSequenceGenerated(initialEmptySequence);
    onClose();
  };

  const handleSelectSampleMedia = () => {
    onSequenceGenerated(sampleSequenceMedia);
    onClose();
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4 overflow-y-auto"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-2xl p-6 sm:p-8 max-w-2xl w-full border border-[#002C50]/20 shadow-2xl my-8 space-y-6"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-start justify-between border-b border-slate-100 pb-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="p-1.5 bg-[#002C50] text-[#95EA31] rounded-lg">
                <Sparkles className="w-4 h-4" />
              </span>
              <h2 className="text-base font-bold text-[#002C50]">
                Créer ou Générer une Séquence Pédagogique
              </h2>
            </div>
            <p className="text-xs text-slate-500 mt-1">
              Choisissez un modèle clé en main conforme à l'École Moser ou générez une séquence sur mesure avec l'IA.
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="text-slate-400 hover:text-slate-700 text-sm font-bold p-1 cursor-pointer"
          >
            ✕
          </button>
        </div>

        {/* Quick Presets / Modèles Rapides */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <button
            type="button"
            onClick={handleSelectBlankTemplate}
            className="p-4 rounded-xl border border-slate-200 hover:border-[#002C50] bg-[#F8FAFC] hover:bg-white text-left transition-all cursor-pointer group"
          >
            <div className="flex items-center gap-2 text-xs font-bold text-[#002C50] mb-1">
              <FileSpreadsheet className="w-4 h-4 text-[#95EA31]" />
              <span>Modèle Vierge à Remplir</span>
            </div>
            <p className="text-[11px] text-slate-500">
              Cases décochées, parties textes vides avec exemples grisés indicatifs, prêt pour une nouvelle conception.
            </p>
          </button>

          <button
            type="button"
            onClick={handleSelectSampleMedia}
            className="p-4 rounded-xl border border-slate-200 hover:border-[#002C50] bg-[#F8FAFC] hover:bg-white text-left transition-all cursor-pointer group"
          >
            <div className="flex items-center gap-2 text-xs font-bold text-[#002C50] mb-1">
              <BookOpen className="w-4 h-4 text-[#002C50]" />
              <span>Séquence Modèle : Éducation Médias 10e</span>
            </div>
            <p className="text-[11px] text-slate-500">
              Séquence complète sur les fake news et MITIC, alignée PER L1 31 / FG 31 et IB PEI Critères A/B.
            </p>
          </button>
        </div>

        <div className="relative">
          <div className="absolute inset-0 flex items-center" aria-hidden="true">
            <div className="w-full border-t border-slate-200" />
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-white px-3 text-slate-400 font-semibold tracking-wider">
              Ou générer avec l'IA (Gemini 3.8 Flash)
            </span>
          </div>
        </div>

        {/* AI Form */}
        <form onSubmit={handleGenerate} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Discipline</label>
              <input
                type="text"
                required
                value={discipline}
                onChange={(e) => setDiscipline(e.target.value)}
                className="w-full text-xs px-3 py-2 bg-white border border-slate-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#002C50] focus:border-[#002C50]"
                placeholder="Ex : Français, Histoire, Sciences..."
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Niveau scolaire</label>
              <input
                type="text"
                required
                value={niveau}
                onChange={(e) => setNiveau(e.target.value)}
                className="w-full text-xs px-3 py-2 bg-white border border-slate-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#002C50] focus:border-[#002C50]"
                placeholder="Ex : 9e Harmos, 10e, PEI 4, IB DP1..."
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Titre de la séquence</label>
              <input
                type="text"
                required
                value={titre}
                onChange={(e) => setTitre(e.target.value)}
                className="w-full text-xs px-3 py-2 bg-white border border-slate-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#002C50] focus:border-[#002C50]"
                placeholder="Ex : L'impact des microplastiques dans le Léman"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Durée prévisionnelle</label>
              <input
                type="text"
                required
                value={duree}
                onChange={(e) => setDuree(e.target.value)}
                className="w-full text-xs px-3 py-2 bg-white border border-slate-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#002C50] focus:border-[#002C50]"
                placeholder="Ex : 4 périodes (4 x 45 min)"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">Cadre Référentiel institutionnel</label>
            <div className="grid grid-cols-4 gap-2">
              {(['PER', 'CER', 'IB', 'MIXTE'] as CadreReferentiel[]).map((c) => (
                <button
                  key={c}
                  type="button"
                  onClick={() => setCadre(c)}
                  className={`py-1.5 text-xs font-semibold rounded-lg border transition-all cursor-pointer ${
                    cadre === c
                      ? 'bg-[#002C50] text-[#95EA31] border-[#002C50]'
                      : 'bg-white border-slate-200 text-slate-700 hover:border-slate-300'
                  }`}
                >
                  {c}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Consignes spécifiques ou intentions didactiques (optionnel)
            </label>
            <textarea
              rows={2}
              value={consignes}
              onChange={(e) => setConsignes(e.target.value)}
              className="w-full text-xs px-3 py-2 bg-white border border-slate-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#002C50] focus:border-[#002C50]"
              placeholder="Ex : Insister sur le travail collaboratif en îlots, tâche sommative sous forme de débat filmé..."
            />
          </div>

          {errorMsg && (
            <div className="p-3 rounded-lg bg-rose-50 border border-rose-200 text-xs text-rose-700">
              {errorMsg}
            </div>
          )}

          <div className="flex items-center justify-end gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              disabled={isLoading}
              className="px-4 py-2 text-xs font-medium text-slate-600 hover:text-slate-800 cursor-pointer"
            >
              Annuler
            </button>

            <button
              type="submit"
              disabled={isLoading}
              className="flex items-center gap-2 px-5 py-2 text-xs font-bold text-white bg-[#002C50] hover:bg-[#001e38] rounded-xl transition-all cursor-pointer shadow-md disabled:opacity-50"
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin text-[#95EA31]" />
                  <span>Génération en cours...</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4 text-[#95EA31]" />
                  <span>Générer la séquence complète</span>
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
