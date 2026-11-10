import React, { useState } from 'react';
import {
  PedagogicalSequence,
  RessourceLien,
  CadreReferentiel,
  PhasePlanification,
  CritereEvaluation,
  ObjectifItem,
} from '../types/sequence';
import { ResourceSection } from './ResourceSection';
import { PerProgramPicker } from './PerProgramPicker';
import {
  CriteriaPicker,
  DifferenciationPicker,
  EnrichissementPicker,
} from './PedagogicalPresetsDrawer';
import { PerCompetence } from '../data/perMerCatalog';
import {
  CheckSquare,
  Square,
  Clock,
  Plus,
  Trash2,
  Table as TableIcon,
  LayoutList,
  Sparkles,
  BookOpen,
  Scale,
  Compass,
  Lightbulb,
  GraduationCap,
  CalendarRange,
  Users,
  Rocket,
} from 'lucide-react';

interface StandardSequenceViewProps {
  sequence: PedagogicalSequence;
  onUpdateSequence: (updater: (prev: PedagogicalSequence) => PedagogicalSequence) => void;
  onToggleObjective: (id: string) => void;
  onToggleCapacite: (id: string) => void;
  onTogglePhaseMode: (mode: 'tableau' | 'narratif') => void;
  onAddResource: (newRes: Omit<RessourceLien, 'id'>) => void;
  onRemoveResource: (id: string) => void;
}

export const StandardSequenceView: React.FC<StandardSequenceViewProps> = ({
  sequence,
  onUpdateSequence,
  onToggleObjective,
  onToggleCapacite,
  onTogglePhaseMode,
  onAddResource,
  onRemoveResource,
}) => {
  // Drawer states
  const [showPerDrawer, setShowPerDrawer] = useState(false);
  const [showCriteriaDrawer, setShowCriteriaDrawer] = useState(false);
  const [showDiffDrawer, setShowDiffDrawer] = useState(false);
  const [showEnrichDrawer, setShowEnrichDrawer] = useState(false);

  // En-tête helpers
  const handleEnTeteChange = (field: string, value: any) => {
    onUpdateSequence((prev) => ({
      ...prev,
      enTete: {
        ...prev.enTete,
        [field]: value,
      },
    }));
  };

  const handleObjectiveTextChange = (id: string, text: string) => {
    onUpdateSequence((prev) => ({
      ...prev,
      enTete: {
        ...prev.enTete,
        objectifs: prev.enTete.objectifs.map((obj) =>
          obj.id === id ? { ...obj, text } : obj
        ),
      },
    }));
  };

  const handleAddObjective = () => {
    const newObj: ObjectifItem = {
      id: `obj-${Date.now()}`,
      text: '',
      checked: false,
    };
    onUpdateSequence((prev) => ({
      ...prev,
      enTete: {
        ...prev.enTete,
        objectifs: [...prev.enTete.objectifs, newObj],
      },
    }));
  };

  const handleRemoveObjective = (id: string) => {
    onUpdateSequence((prev) => ({
      ...prev,
      enTete: {
        ...prev.enTete,
        objectifs: prev.enTete.objectifs.filter((o) => o.id !== id),
      },
    }));
  };

  // PER Competences Selector handlers
  const handleSelectPerCompetence = (comp: PerCompetence) => {
    const newText = `${comp.code} : ${comp.intitule}`;
    onUpdateSequence((prev) => {
      // Check if there's an empty first objective to replace
      const hasOnlyEmptyObj =
        prev.enTete.objectifs.length === 1 && !prev.enTete.objectifs[0].text.trim();
      if (hasOnlyEmptyObj) {
        return {
          ...prev,
          enTete: {
            ...prev.enTete,
            objectifs: [{ id: `obj-${Date.now()}`, text: newText, checked: false }],
          },
        };
      }
      return {
        ...prev,
        enTete: {
          ...prev.enTete,
          objectifs: [
            ...prev.enTete.objectifs,
            { id: `obj-${Date.now()}`, text: newText, checked: false },
          ],
        },
      };
    });
  };

  const handleDeselectPerCompetence = (compCode: string) => {
    onUpdateSequence((prev) => ({
      ...prev,
      enTete: {
        ...prev.enTete,
        objectifs: prev.enTete.objectifs.filter((o) => !o.text.includes(compCode)),
      },
    }));
  };

  const handleUpdateDisciplineAndNiveau = (discipline: string, niveau: string) => {
    onUpdateSequence((prev) => ({
      ...prev,
      enTete: {
        ...prev.enTete,
        discipline: discipline || prev.enTete.discipline,
        niveau: niveau || prev.enTete.niveau,
      },
    }));
  };

  // Cadre helpers
  const handleCapaciteDescChange = (id: string, description: string) => {
    onUpdateSequence((prev) => ({
      ...prev,
      cadrePedagogique: {
        ...prev.cadrePedagogique,
        capacitesTransversales: prev.cadrePedagogique.capacitesTransversales.map((c) =>
          c.id === id ? { ...c, description } : c
        ),
      },
    }));
  };

  const handleFormationGeneraleChange = (val: string) => {
    onUpdateSequence((prev) => ({
      ...prev,
      cadrePedagogique: {
        ...prev.cadrePedagogique,
        formationGenerale: val,
      },
    }));
  };

  const handleConceptIBChange = (field: string, val: string) => {
    onUpdateSequence((prev) => ({
      ...prev,
      cadrePedagogique: {
        ...prev.cadrePedagogique,
        conceptsIB: {
          ...prev.cadrePedagogique.conceptsIB,
          [field]: val,
        },
      },
    }));
  };

  // Phase helpers
  const handlePhaseChange = (id: string, field: keyof PhasePlanification, val: any) => {
    onUpdateSequence((prev) => ({
      ...prev,
      planification: {
        ...prev.planification,
        phases: prev.planification.phases.map((p) =>
          p.id === id ? { ...p, [field]: val } : p
        ),
      },
    }));
  };

  const handleAddPhase = () => {
    const newPhase: PhasePlanification = {
      id: `phase-${Date.now()}`,
      phaseDuree: '',
      objectifsActivites: '',
      roleProf: '',
      outilsSAMR: '',
      cuaDifferenciation: '',
      checked: false,
    };
    onUpdateSequence((prev) => ({
      ...prev,
      planification: {
        ...prev.planification,
        phases: [...prev.planification.phases, newPhase],
      },
    }));
  };

  const handleRemovePhase = (id: string) => {
    onUpdateSequence((prev) => ({
      ...prev,
      planification: {
        ...prev.planification,
        phases: prev.planification.phases.filter((p) => p.id !== id),
      },
    }));
  };

  // Evaluation helpers
  const handleEvalFieldChange = (field: 'dispositifsFormatifs' | 'tacheSommative', val: string) => {
    onUpdateSequence((prev) => ({
      ...prev,
      evaluation: {
        ...prev.evaluation,
        [field]: val,
      },
    }));
  };

  const handleCritereChange = (id: string, field: keyof CritereEvaluation, val: string) => {
    onUpdateSequence((prev) => ({
      ...prev,
      evaluation: {
        ...prev.evaluation,
        grilleCriteriee: prev.evaluation.grilleCriteriee.map((c) =>
          c.id === id ? { ...c, [field]: val } : c
        ),
      },
    }));
  };

  const handleAddCritere = () => {
    const newCrit: CritereEvaluation = {
      id: `crit-${Date.now()}`,
      critere: '',
      indicateurs: '',
      insuffisant: '',
      partiel: '',
      atteint: '',
      depasse: '',
    };
    onUpdateSequence((prev) => ({
      ...prev,
      evaluation: {
        ...prev.evaluation,
        grilleCriteriee: [...prev.evaluation.grilleCriteriee, newCrit],
      },
    }));
  };

  const handleAddCriteriaPreset = (newCrit: CritereEvaluation) => {
    onUpdateSequence((prev) => {
      const hasOnlyEmptyCrit =
        prev.evaluation.grilleCriteriee.length === 1 &&
        !prev.evaluation.grilleCriteriee[0].critere.trim();
      if (hasOnlyEmptyCrit) {
        return {
          ...prev,
          evaluation: {
            ...prev.evaluation,
            grilleCriteriee: [newCrit],
          },
        };
      }
      return {
        ...prev,
        evaluation: {
          ...prev.evaluation,
          grilleCriteriee: [...prev.evaluation.grilleCriteriee, newCrit],
        },
      };
    });
  };

  const handleRemoveCritere = (id: string) => {
    onUpdateSequence((prev) => ({
      ...prev,
      evaluation: {
        ...prev.evaluation,
        grilleCriteriee: prev.evaluation.grilleCriteriee.filter((c) => c.id !== id),
      },
    }));
  };

  // Differenciation & Enrichissement helpers
  const handleDiffChange = (field: 'mesuresAdaptation' | 'remédiation', val: string) => {
    onUpdateSequence((prev) => ({
      ...prev,
      differenciation: {
        ...prev.differenciation,
        [field]: val,
      },
    }));
  };

  const handleAppendAdaptation = (texte: string) => {
    onUpdateSequence((prev) => ({
      ...prev,
      differenciation: {
        ...prev.differenciation,
        mesuresAdaptation: prev.differenciation.mesuresAdaptation
          ? `${prev.differenciation.mesuresAdaptation}\n• ${texte}`
          : `• ${texte}`,
      },
    }));
  };

  const handleAppendRemediation = (texte: string) => {
    onUpdateSequence((prev) => ({
      ...prev,
      differenciation: {
        ...prev.differenciation,
        remédiation: prev.differenciation.remédiation
          ? `${prev.differenciation.remédiation}\n• ${texte}`
          : `• ${texte}`,
      },
    }));
  };

  const handleEnrichissementChange = (val: string) => {
    onUpdateSequence((prev) => ({
      ...prev,
      enrichissement: {
        pistesApprofondissement: val,
      },
    }));
  };

  const handleAppendEnrichissementProposal = (texte: string) => {
    onUpdateSequence((prev) => ({
      ...prev,
      enrichissement: {
        pistesApprofondissement: prev.enrichissement.pistesApprofondissement
          ? `${prev.enrichissement.pistesApprofondissement}\n• ${texte}`
          : `• ${texte}`,
      },
    }));
  };

  return (
    <div className="space-y-8 print:space-y-6">
      {/* Print-only institution header */}
      <div className="print-header-logo print-only">
        <div>
          <img
            src="/assets/aistudio/logo_Moser_ac2383db.jpg"
            alt="École Moser"
            className="h-12 w-auto"
          />
        </div>
        <div className="text-right">
          <div className="text-xs font-bold text-[#002C50] uppercase tracking-wider">
            Guide de Séquence Pédagogique
          </div>
          <div className="text-[10px] text-slate-500">
            Conforme PER · CER · Baccalauréat International (IB)
          </div>
        </div>
      </div>

      {/* SECTION 1 : EN-TÊTE DE LA SÉQUENCE */}
      <section id="section-partie-1" className="bg-white rounded-2xl border-2 border-[#002C50] shadow-sm overflow-hidden print-avoid-break scroll-mt-24">
        <div className="bg-[#002C50] text-white px-6 py-5 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-white/10 rounded-xl text-[#95EA31]">
              <GraduationCap className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-black uppercase tracking-wider text-[#95EA31]">Partie 1</span>
                <span className="text-white/40">·</span>
                <h1 className="text-lg sm:text-xl font-bold text-white tracking-tight">
                  En-tête de la Séquence Pédagogique
                </h1>
              </div>
              <p className="text-xs text-slate-300 mt-0.5">
                Identification institutionnelle, objectifs d'apprentissage visés (PER / CER / IB)
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 no-print">
            {/* Volet de Choix PER / MER Romand Button (Bigger, High Visibility) */}
            <button
              type="button"
              onClick={() => setShowPerDrawer(!showPerDrawer)}
              className="flex items-center gap-2 px-4 py-2.5 text-xs sm:text-sm font-extrabold bg-[#95EA31] text-[#002C50] hover:bg-[#85da25] active:bg-[#78c91f] rounded-xl transition-all cursor-pointer shadow-xs active:scale-95"
            >
              <BookOpen className="w-4 h-4" />
              <span>{showPerDrawer ? 'Fermer le volet PER' : 'Volet de Choix PER / MER Romand'}</span>
            </button>

            {/* Cadre Référentiel Selector */}
            <div className="flex items-center gap-1 p-1 bg-white/10 rounded-xl">
              {(['PER', 'CER', 'IB', 'MIXTE'] as CadreReferentiel[]).map((c) => (
                <button
                  key={c}
                  type="button"
                  onClick={() => handleEnTeteChange('cadreReferentiel', c)}
                  className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-all cursor-pointer ${
                    sequence.enTete.cadreReferentiel === c
                      ? 'bg-white text-[#002C50] shadow-xs'
                      : 'text-white/80 hover:text-white'
                  }`}
                >
                  {c}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="p-6 space-y-6">
          {/* PER/MER Selection Drawer */}
          {showPerDrawer && (
            <div className="no-print">
              <PerProgramPicker
                currentDiscipline={sequence.enTete.discipline}
                currentNiveau={sequence.enTete.niveau}
                selectedObjectiveTexts={sequence.enTete.objectifs.map((o) => o.text)}
                onSelectCompetence={handleSelectPerCompetence}
                onDeselectCompetence={handleDeselectPerCompetence}
                onUpdateDisciplineAndNiveau={handleUpdateDisciplineAndNiveau}
                onClose={() => setShowPerDrawer(false)}
              />
            </div>
          )}

          {/* Metadata Grid (Editable in-place) */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 p-4 rounded-xl bg-[#F0F6FA] border border-[#002C50]/15">
            <div>
              <label className="text-[11px] font-bold text-[#002C50] uppercase tracking-wider block mb-1">
                Titre de la séquence *
              </label>
              <input
                type="text"
                value={sequence.enTete.titre}
                onChange={(e) => handleEnTeteChange('titre', e.target.value)}
                placeholder="[Exemple : L'impact des microplastiques dans le Léman]"
                className="w-full text-xs font-bold text-[#002C50] bg-white px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#002C50] focus:border-[#002C50] placeholder:text-slate-400 placeholder:italic"
              />
            </div>

            <div>
              <label className="text-[11px] font-bold text-[#002C50] uppercase tracking-wider block mb-1">
                Discipline *
              </label>
              <input
                type="text"
                value={sequence.enTete.discipline}
                onChange={(e) => handleEnTeteChange('discipline', e.target.value)}
                placeholder="[Exemple : Français, Sciences, Histoire...]"
                className="w-full text-xs font-semibold text-slate-800 bg-white px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#002C50] focus:border-[#002C50] placeholder:text-slate-400 placeholder:italic"
              />
            </div>

            <div>
              <label className="text-[11px] font-bold text-[#002C50] uppercase tracking-wider block mb-1">
                Niveau & Degré *
              </label>
              <input
                type="text"
                value={sequence.enTete.niveau}
                onChange={(e) => handleEnTeteChange('niveau', e.target.value)}
                placeholder="[Exemple : 9e Harmos, 10e, PEI 4, IB DP1...]"
                className="w-full text-xs font-semibold text-slate-800 bg-white px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#002C50] focus:border-[#002C50] placeholder:text-slate-400 placeholder:italic"
              />
            </div>

            <div>
              <label className="text-[11px] font-bold text-[#002C50] uppercase tracking-wider block mb-1">
                Durée estimée *
              </label>
              <input
                type="text"
                value={sequence.enTete.duree}
                onChange={(e) => handleEnTeteChange('duree', e.target.value)}
                placeholder="[Exemple : 4 périodes (4 x 45 min)]"
                className="w-full text-xs font-semibold text-slate-800 bg-white px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#002C50] focus:border-[#002C50] placeholder:text-slate-400 placeholder:italic"
              />
            </div>
          </div>

          {/* Objectives Checkable & Editable List */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <h2 className="text-xs font-bold text-[#002C50] uppercase tracking-wider">
                Objectifs d'apprentissage visés (PER / CER / IB)
              </h2>
              <div className="flex items-center gap-2 no-print">
                <button
                  type="button"
                  onClick={() => setShowPerDrawer(!showPerDrawer)}
                  className="text-xs text-[#002C50] font-bold bg-[#95EA31]/25 hover:bg-[#95EA31]/40 border border-[#95EA31] px-2.5 py-1 rounded-md flex items-center gap-1 cursor-pointer transition-colors"
                >
                  <BookOpen className="w-3.5 h-3.5 text-[#002C50]" />
                  <span>Choisir dans le PER/MER</span>
                </button>
                <button
                  type="button"
                  onClick={handleAddObjective}
                  className="text-xs text-[#002C50] font-semibold hover:underline flex items-center gap-1"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>+ Objectif libre</span>
                </button>
              </div>
            </div>

            <div className="space-y-2">
              {sequence.enTete.objectifs.map((obj, idx) => (
                <div
                  key={obj.id}
                  className={`flex items-start gap-3 p-3 rounded-xl border transition-all ${
                    obj.checked
                      ? 'bg-[#EBF8DC] border-[#95EA31]'
                      : 'bg-white border-slate-200 hover:border-[#002C50]/30'
                  }`}
                >
                  <button
                    type="button"
                    onClick={() => onToggleObjective(obj.id)}
                    className="mt-0.5 shrink-0 text-[#002C50] cursor-pointer"
                    title={obj.checked ? 'Coché' : 'Décoché'}
                  >
                    {obj.checked ? (
                      <CheckSquare className="w-4 h-4 text-[#002C50]" />
                    ) : (
                      <Square className="w-4 h-4 text-slate-400" />
                    )}
                  </button>

                  <input
                    type="text"
                    value={obj.text}
                    onChange={(e) => handleObjectiveTextChange(obj.id, e.target.value)}
                    placeholder={`[Exemple : PER L1 31 / MSN 36 - Objectif ${idx + 1}]`}
                    className="flex-1 text-xs font-medium text-slate-800 bg-transparent border-0 focus:outline-none focus:ring-0 placeholder:text-slate-400 placeholder:italic"
                  />

                  {sequence.enTete.objectifs.length > 1 && (
                    <button
                      type="button"
                      onClick={() => handleRemoveObjective(obj.id)}
                      className="text-slate-300 hover:text-rose-600 p-1 no-print"
                      title="Supprimer cet objectif"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 2 : CADRE PÉDAGOGIQUE & TRANSVERSALITÉ */}
      <section id="section-partie-2" className="bg-white rounded-2xl border-2 border-[#002C50] shadow-sm overflow-hidden print-avoid-break scroll-mt-24">
        <div className="bg-[#002C50] text-white px-6 py-5 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-white/10 rounded-xl text-[#95EA31]">
              <Compass className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-black uppercase tracking-wider text-[#95EA31]">Partie 2</span>
                <span className="text-white/40">·</span>
                <h2 className="text-lg sm:text-xl font-bold text-white tracking-tight">
                  Cadre Pédagogique & Transversalité
                </h2>
              </div>
              <p className="text-xs text-slate-300 mt-0.5">
                Capacités transversales (PER), formation générale & ancrage Baccalauréat International (IB)
              </p>
            </div>
          </div>
        </div>

        <div className="p-6 space-y-6">
          {/* Capacités transversales */}
          <div>
            <h3 className="text-xs font-bold text-[#002C50] uppercase tracking-wider mb-3">
              2.1 Capacités Transversales mobilisées (Plan d'études romand - PER)
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {sequence.cadrePedagogique.capacitesTransversales.map((cap) => (
                <div
                  key={cap.id}
                  className={`p-3.5 rounded-xl border transition-all flex items-start gap-3 ${
                    cap.checked
                      ? 'bg-[#EBF8DC] border-[#95EA31]'
                      : 'bg-[#F8FAFC] border-slate-200 hover:border-[#002C50]/30'
                  }`}
                >
                  <button
                    type="button"
                    onClick={() => onToggleCapacite(cap.id)}
                    className="mt-0.5 shrink-0 text-[#002C50] cursor-pointer"
                    title={cap.checked ? 'Coché' : 'Décoché'}
                  >
                    {cap.checked ? (
                      <CheckSquare className="w-4 h-4 text-[#002C50]" />
                    ) : (
                      <Square className="w-4 h-4 text-slate-400" />
                    )}
                  </button>
                  <div className="flex-1">
                    <span className="text-xs font-bold text-[#002C50] block">
                      {cap.nom}
                    </span>
                    <input
                      type="text"
                      value={cap.description}
                      onChange={(e) => handleCapaciteDescChange(cap.id, e.target.value)}
                      placeholder="[Exemple indicatif : Dispositif de mobilisation de cette capacité...]"
                      className="w-full text-xs text-slate-700 bg-transparent border-b border-transparent hover:border-slate-300 focus:border-[#002C50] focus:outline-none placeholder:text-slate-400 placeholder:italic mt-1"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Formation Générale */}
          <div className="p-4 rounded-xl border border-slate-200 bg-white">
            <h3 className="text-xs font-bold text-[#002C50] uppercase tracking-wider mb-2">
              2.2 Formation Générale & Citoyenneté (PER)
            </h3>
            <textarea
              rows={2}
              value={sequence.cadrePedagogique.formationGenerale}
              onChange={(e) => handleFormationGeneraleChange(e.target.value)}
              placeholder="[Exemple : Médias, images et technologies de l'information (MITIC) - Éthique citoyenne et pluralisme]"
              className="w-full text-xs text-slate-700 p-2.5 rounded-lg border border-slate-200 focus:border-[#002C50] focus:outline-none placeholder:text-slate-400 placeholder:italic resize-none"
            />
          </div>

          {/* Concepts IB */}
          <div className="p-4 rounded-xl border border-[#002C50]/15 bg-[#F0F6FA]">
            <h3 className="text-xs font-bold text-[#002C50] uppercase tracking-wider mb-3">
              2.3 Ancrage au Baccalauréat International (IB MYP / DP)
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              <div className="bg-white p-3 rounded-xl border border-slate-200">
                <label className="text-[10px] font-bold text-[#002C50] uppercase tracking-wider block mb-1">
                  Concept Clé
                </label>
                <input
                  type="text"
                  value={sequence.cadrePedagogique.conceptsIB.conceptCle}
                  onChange={(e) => handleConceptIBChange('conceptCle', e.target.value)}
                  placeholder="[Exemple : Systèmes / Changement]"
                  className="w-full text-xs font-semibold text-slate-800 bg-transparent border-0 focus:outline-none placeholder:text-slate-400 placeholder:italic"
                />
              </div>

              <div className="bg-white p-3 rounded-xl border border-slate-200">
                <label className="text-[10px] font-bold text-[#002C50] uppercase tracking-wider block mb-1">
                  Concepts Connexes
                </label>
                <input
                  type="text"
                  value={sequence.cadrePedagogique.conceptsIB.conceptsConnexes}
                  onChange={(e) => handleConceptIBChange('conceptsConnexes', e.target.value)}
                  placeholder="[Exemple : Équilibre, Fonction, Modèle]"
                  className="w-full text-xs font-semibold text-slate-800 bg-transparent border-0 focus:outline-none placeholder:text-slate-400 placeholder:italic"
                />
              </div>

              <div className="bg-white p-3 rounded-xl border border-slate-200">
                <label className="text-[10px] font-bold text-[#002C50] uppercase tracking-wider block mb-1">
                  Contexte Mondial
                </label>
                <input
                  type="text"
                  value={sequence.cadrePedagogique.conceptsIB.contexteMondial}
                  onChange={(e) => handleConceptIBChange('contexteMondial', e.target.value)}
                  placeholder="[Exemple : Mondialisation et durabilité]"
                  className="w-full text-xs font-semibold text-slate-800 bg-transparent border-0 focus:outline-none placeholder:text-slate-400 placeholder:italic"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 3 : PLANIFICATION DÉTAILLÉE */}
      <section id="section-partie-3" className="bg-white rounded-2xl border-2 border-[#002C50] shadow-sm overflow-hidden print-avoid-break scroll-mt-24">
        <div className="bg-[#002C50] text-white px-6 py-5 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-white/10 rounded-xl text-[#95EA31]">
              <CalendarRange className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-black uppercase tracking-wider text-[#95EA31]">Partie 3</span>
                <span className="text-white/40">·</span>
                <h2 className="text-lg sm:text-xl font-bold text-white tracking-tight">
                  Planification Détaillée de la Séquence
                </h2>
              </div>
              <p className="text-xs text-slate-300 mt-0.5">
                Déroulement phasé, rôles de l'enseignant, modèle SAMR et accessibilité universelle CUA
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 no-print">
            <button
              type="button"
              onClick={handleAddPhase}
              className="flex items-center gap-2 px-4 py-2.5 text-xs sm:text-sm font-extrabold bg-[#95EA31] text-[#002C50] hover:bg-[#85da25] active:bg-[#78c91f] rounded-xl transition-all cursor-pointer shadow-xs active:scale-95"
            >
              <Plus className="w-4 h-4" />
              <span>+ Ajouter une phase</span>
            </button>

            {/* Toggle Mode */}
            <div className="flex items-center p-1 bg-white/10 rounded-xl">
              <button
                type="button"
                onClick={() => onTogglePhaseMode('tableau')}
                className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold rounded-lg transition-all cursor-pointer ${
                  sequence.planification.mode === 'tableau'
                    ? 'bg-white text-[#002C50] shadow-xs'
                    : 'text-white/80 hover:text-white'
                }`}
              >
                <TableIcon className="w-4 h-4" />
                <span>Tableau Synoptique</span>
              </button>

              <button
                type="button"
                onClick={() => onTogglePhaseMode('narratif')}
                className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold rounded-lg transition-all cursor-pointer ${
                  sequence.planification.mode === 'narratif'
                    ? 'bg-white text-[#002C50] shadow-xs'
                    : 'text-white/80 hover:text-white'
                }`}
              >
                <LayoutList className="w-4 h-4" />
                <span>Blocs Narratifs</span>
              </button>
            </div>
          </div>
        </div>

        <div className="p-6">
          {sequence.planification.mode === 'tableau' ? (
            /* Tableau Synoptique Editable */
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse border border-slate-300 rounded-xl overflow-hidden print-table">
                <thead>
                  <tr className="bg-[#002C50] text-white text-xs">
                    <th className="p-3 border border-[#002C50] font-semibold w-[18%]">
                      Phase / Durée
                    </th>
                    <th className="p-3 border border-[#002C50] font-semibold w-[28%]">
                      Objectifs & Activités
                    </th>
                    <th className="p-3 border border-[#002C50] font-semibold w-[18%]">
                      Rôle prof
                    </th>
                    <th className="p-3 border border-[#002C50] font-semibold w-[18%]">
                      Outils [SAMR]
                    </th>
                    <th className="p-3 border border-[#002C50] font-semibold w-[18%]">
                      CUA & Différenciation
                    </th>
                    <th className="p-2 border border-[#002C50] w-8 no-print text-center">
                      —
                    </th>
                  </tr>
                </thead>
                <tbody className="text-xs divide-y divide-slate-200">
                  {sequence.planification.phases.map((phase, idx) => (
                    <tr
                      key={phase.id}
                      className={idx % 2 === 0 ? 'bg-white' : 'bg-[#F8FAFC]'}
                    >
                      <td className="p-2.5 border border-slate-300 align-top">
                        <textarea
                          rows={2}
                          value={phase.phaseDuree}
                          onChange={(e) => handlePhaseChange(phase.id, 'phaseDuree', e.target.value)}
                          placeholder={`[Exemple : Phase ${idx + 1} (20 min)]`}
                          className="w-full font-bold text-[#002C50] p-1.5 rounded border border-transparent hover:border-slate-300 focus:border-[#002C50] focus:outline-none placeholder:text-slate-400 placeholder:italic resize-none"
                        />
                      </td>
                      <td className="p-2.5 border border-slate-300 align-top">
                        <textarea
                          rows={3}
                          value={phase.objectifsActivites}
                          onChange={(e) => handlePhaseChange(phase.id, 'objectifsActivites', e.target.value)}
                          placeholder="[Exemple : Activité élève, consigne et production attendue...]"
                          className="w-full text-slate-800 p-1.5 rounded border border-transparent hover:border-slate-300 focus:border-[#002C50] focus:outline-none placeholder:text-slate-400 placeholder:italic resize-none"
                        />
                      </td>
                      <td className="p-2.5 border border-slate-300 align-top">
                        <textarea
                          rows={3}
                          value={phase.roleProf}
                          onChange={(e) => handlePhaseChange(phase.id, 'roleProf', e.target.value)}
                          placeholder="[Exemple : Posture d'étayage, questionnement socratique...]"
                          className="w-full text-slate-800 p-1.5 rounded border border-transparent hover:border-slate-300 focus:border-[#002C50] focus:outline-none placeholder:text-slate-400 placeholder:italic resize-none"
                        />
                      </td>
                      <td className="p-2.5 border border-slate-300 align-top">
                        <textarea
                          rows={3}
                          value={phase.outilsSAMR}
                          onChange={(e) => handlePhaseChange(phase.id, 'outilsSAMR', e.target.value)}
                          placeholder="[Exemple : Augmentation / Modification : Outil numérique...]"
                          className="w-full text-slate-800 p-1.5 rounded border border-transparent hover:border-slate-300 focus:border-[#002C50] focus:outline-none placeholder:text-slate-400 placeholder:italic resize-none"
                        />
                      </td>
                      <td className="p-2.5 border border-slate-300 align-top">
                        <textarea
                          rows={3}
                          value={phase.cuaDifferenciation}
                          onChange={(e) => handlePhaseChange(phase.id, 'cuaDifferenciation', e.target.value)}
                          placeholder="[Exemple : Accessibilité universelle, consignes audio/visuelles...]"
                          className="w-full text-slate-800 p-1.5 rounded border border-transparent hover:border-slate-300 focus:border-[#002C50] focus:outline-none placeholder:text-slate-400 placeholder:italic resize-none"
                        />
                      </td>
                      <td className="p-2 border border-slate-300 text-center align-middle no-print">
                        {sequence.planification.phases.length > 1 && (
                          <button
                            type="button"
                            onClick={() => handleRemovePhase(phase.id)}
                            className="text-slate-300 hover:text-rose-600 p-1"
                            title="Supprimer cette phase"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            /* Blocs Narratifs Format Editable */
            <div className="space-y-4">
              {sequence.planification.phases.map((phase, idx) => (
                <div
                  key={phase.id}
                  className="p-5 rounded-xl border border-slate-200 bg-[#F8FAFC] space-y-3"
                >
                  <div className="flex items-center justify-between border-b border-slate-200 pb-2">
                    <input
                      type="text"
                      value={phase.phaseDuree}
                      onChange={(e) => handlePhaseChange(phase.id, 'phaseDuree', e.target.value)}
                      placeholder={`[Exemple : Phase ${idx + 1} (25 min)]`}
                      className="text-sm font-bold text-[#002C50] bg-white px-3 py-1.5 rounded-lg border border-slate-300 w-1/2 placeholder:text-slate-400 placeholder:italic"
                    />

                    <div className="flex items-center gap-2 no-print">
                      <span className="text-[11px] font-semibold px-2 py-0.5 rounded bg-[#95EA31]/25 text-[#002C50]">
                        Étape {idx + 1}
                      </span>
                      {sequence.planification.phases.length > 1 && (
                        <button
                          type="button"
                          onClick={() => handleRemovePhase(phase.id)}
                          className="text-slate-300 hover:text-rose-600 p-1"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      )}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                    <div>
                      <label className="font-bold text-slate-900 block mb-1">
                        Objectifs & Activités des élèves :
                      </label>
                      <textarea
                        rows={3}
                        value={phase.objectifsActivites}
                        onChange={(e) => handlePhaseChange(phase.id, 'objectifsActivites', e.target.value)}
                        placeholder="[Exemple : Démarche des élèves, consignes...]"
                        className="w-full p-2 bg-white rounded-lg border border-slate-200 placeholder:text-slate-400 placeholder:italic"
                      />
                    </div>

                    <div>
                      <label className="font-bold text-slate-900 block mb-1">
                        Rôle & Posture de l'enseignant :
                      </label>
                      <textarea
                        rows={3}
                        value={phase.roleProf}
                        onChange={(e) => handlePhaseChange(phase.id, 'roleProf', e.target.value)}
                        placeholder="[Exemple : Posture d'animation, de régulation ou d'expertise...]"
                        className="w-full p-2 bg-white rounded-lg border border-slate-200 placeholder:text-slate-400 placeholder:italic"
                      />
                    </div>

                    <div>
                      <label className="font-bold text-slate-900 block mb-1">
                        Outils & Intégration Numérique [SAMR] :
                      </label>
                      <input
                        type="text"
                        value={phase.outilsSAMR}
                        onChange={(e) => handlePhaseChange(phase.id, 'outilsSAMR', e.target.value)}
                        placeholder="[Exemple : Augmentation / Modification...]"
                        className="w-full p-2 bg-white rounded-lg border border-slate-200 placeholder:text-slate-400 placeholder:italic"
                      />
                    </div>

                    <div>
                      <label className="font-bold text-slate-900 block mb-1">
                        Accessibilité universelle [CUA] & Différenciation :
                      </label>
                      <input
                        type="text"
                        value={phase.cuaDifferenciation}
                        onChange={(e) => handlePhaseChange(phase.id, 'cuaDifferenciation', e.target.value)}
                        placeholder="[Exemple : Modalités d'accès pour tous les profils d'élèves...]"
                        className="w-full p-2 bg-white rounded-lg border border-slate-200 placeholder:text-slate-400 placeholder:italic"
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* SECTION 4 : STRATÉGIE D'ÉVALUATION (ALIGNÉE CER) */}
      <section id="section-partie-4" className="bg-white rounded-2xl border-2 border-[#002C50] shadow-sm overflow-hidden print-avoid-break scroll-mt-24">
        <div className="bg-[#002C50] text-white px-6 py-5 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-white/10 rounded-xl text-[#95EA31]">
              <Scale className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-black uppercase tracking-wider text-[#95EA31]">Partie 4</span>
                <span className="text-white/40">·</span>
                <h2 className="text-lg sm:text-xl font-bold text-white tracking-tight">
                  Stratégie d'Évaluation (Alignée CER)
                </h2>
              </div>
              <p className="text-xs text-slate-300 mt-0.5">
                Évaluations formatives, tâche sommative authentique et grille critériée à 4 paliers de maîtrise
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 no-print">
            <button
              type="button"
              onClick={() => setShowCriteriaDrawer(!showCriteriaDrawer)}
              className="flex items-center gap-2 px-4 py-2.5 text-xs sm:text-sm font-extrabold bg-[#95EA31] text-[#002C50] hover:bg-[#85da25] active:bg-[#78c91f] rounded-xl transition-all cursor-pointer shadow-xs active:scale-95"
            >
              <Scale className="w-4 h-4" />
              <span>{showCriteriaDrawer ? 'Fermer la banque CER' : 'Banque de critères CER à cocher'}</span>
            </button>

            <button
              type="button"
              onClick={handleAddCritere}
              className="flex items-center gap-1.5 px-3.5 py-2.5 text-xs sm:text-sm font-bold text-white bg-white/10 hover:bg-white/20 rounded-xl transition-colors cursor-pointer"
            >
              <Plus className="w-4 h-4" />
              <span>+ Critère libre</span>
            </button>
          </div>
        </div>

        <div className="p-6 space-y-6">
          {/* Criteria Picker Drawer */}
          {showCriteriaDrawer && (
            <div className="no-print">
              <CriteriaPicker
                onAddCritere={handleAddCriteriaPreset}
                existingCriteriaTitles={sequence.evaluation.grilleCriteriee.map((c) => c.critere)}
                onClose={() => setShowCriteriaDrawer(false)}
              />
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 rounded-xl border border-slate-200 bg-[#F0F6FA]">
              <label className="text-xs font-bold text-[#002C50] uppercase tracking-wider block mb-1">
                4.1 Dispositifs d'évaluation formative
              </label>
              <textarea
                rows={2}
                value={sequence.evaluation.dispositifsFormatifs}
                onChange={(e) => handleEvalFieldChange('dispositifsFormatifs', e.target.value)}
                placeholder="[Exemple : Billet de sortie flash, auto-évaluation guidée par les pairs...]"
                className="w-full text-xs text-slate-800 p-2 bg-white rounded-lg border border-slate-300 placeholder:text-slate-400 placeholder:italic resize-none focus:outline-none focus:border-[#002C50]"
              />
            </div>

            <div className="p-4 rounded-xl border border-[#95EA31]/40 bg-[#EBF8DC]/30">
              <label className="text-xs font-bold text-[#002C50] uppercase tracking-wider block mb-1">
                4.2 Tâche sommative authentique
              </label>
              <textarea
                rows={2}
                value={sequence.evaluation.tacheSommative}
                onChange={(e) => handleEvalFieldChange('tacheSommative', e.target.value)}
                placeholder="[Exemple : Rédaction d'un rapport critique de 400 mots étayé de sources vérifiées...]"
                className="w-full text-xs text-slate-800 p-2 bg-white rounded-lg border border-slate-300 placeholder:text-slate-400 placeholder:italic resize-none focus:outline-none focus:border-[#002C50]"
              />
            </div>
          </div>

          {/* Grille Critériée Editable */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-xs font-bold text-[#002C50] uppercase tracking-wider">
                4.3 Grille critériée d'évaluation avec indicateurs et 4 niveaux de maîtrise
              </h3>
              <button
                type="button"
                onClick={() => setShowCriteriaDrawer(!showCriteriaDrawer)}
                className="text-xs text-[#002C50] font-bold bg-[#95EA31]/25 hover:bg-[#95EA31]/40 border border-[#95EA31] px-2.5 py-1 rounded-md flex items-center gap-1 cursor-pointer transition-colors no-print"
              >
                <Scale className="w-3.5 h-3.5 text-[#002C50]" />
                <span>Banque de critères CER</span>
              </button>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse border border-slate-300 rounded-xl overflow-hidden print-table text-xs">
                <thead>
                  <tr className="bg-[#002C50] text-white">
                    <th className="p-3 border border-[#002C50] font-semibold w-[20%]">
                      Critère d'évaluation
                    </th>
                    <th className="p-3 border border-[#002C50] font-semibold w-[20%]">
                      Indicateurs observables
                    </th>
                    <th className="p-3 border border-[#002C50] font-semibold w-[15%] bg-rose-900/40">
                      Insuffisant (1)
                    </th>
                    <th className="p-3 border border-[#002C50] font-semibold w-[15%] bg-amber-900/40">
                      Partiel (2)
                    </th>
                    <th className="p-3 border border-[#002C50] font-semibold w-[15%] bg-emerald-900/40">
                      Atteint (3)
                    </th>
                    <th className="p-3 border border-[#002C50] font-semibold w-[15%] bg-blue-900/40">
                      Dépassé (4)
                    </th>
                    <th className="p-2 border border-[#002C50] w-8 no-print text-center">
                      —
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200">
                  {sequence.evaluation.grilleCriteriee.map((item, idx) => (
                    <tr
                      key={item.id}
                      className={idx % 2 === 0 ? 'bg-white' : 'bg-slate-50/50'}
                    >
                      <td className="p-2 border border-slate-300 align-top">
                        <textarea
                          rows={2}
                          value={item.critere}
                          onChange={(e) => handleCritereChange(item.id, 'critere', e.target.value)}
                          placeholder={`[Critère ${idx + 1}]`}
                          className="w-full font-bold text-[#002C50] p-1 rounded border border-transparent hover:border-slate-300 focus:border-[#002C50] placeholder:text-slate-400 placeholder:italic resize-none"
                        />
                      </td>
                      <td className="p-2 border border-slate-300 align-top">
                        <textarea
                          rows={2}
                          value={item.indicateurs}
                          onChange={(e) => handleCritereChange(item.id, 'indicateurs', e.target.value)}
                          placeholder="[Indicateurs observables...]"
                          className="w-full text-slate-700 p-1 rounded border border-transparent hover:border-slate-300 focus:border-[#002C50] placeholder:text-slate-400 placeholder:italic resize-none"
                        />
                      </td>
                      <td className="p-2 border border-slate-300 align-top bg-rose-50/40">
                        <textarea
                          rows={2}
                          value={item.insuffisant}
                          onChange={(e) => handleCritereChange(item.id, 'insuffisant', e.target.value)}
                          placeholder="[Niveau 1]"
                          className="w-full text-slate-700 p-1 rounded border border-transparent hover:border-slate-300 focus:border-[#002C50] placeholder:text-slate-400 placeholder:italic resize-none"
                        />
                      </td>
                      <td className="p-2 border border-slate-300 align-top bg-amber-50/40">
                        <textarea
                          rows={2}
                          value={item.partiel}
                          onChange={(e) => handleCritereChange(item.id, 'partiel', e.target.value)}
                          placeholder="[Niveau 2]"
                          className="w-full text-slate-700 p-1 rounded border border-transparent hover:border-slate-300 focus:border-[#002C50] placeholder:text-slate-400 placeholder:italic resize-none"
                        />
                      </td>
                      <td className="p-2 border border-slate-300 align-top bg-emerald-50/40">
                        <textarea
                          rows={2}
                          value={item.atteint}
                          onChange={(e) => handleCritereChange(item.id, 'atteint', e.target.value)}
                          placeholder="[Niveau 3]"
                          className="w-full text-slate-700 font-medium p-1 rounded border border-transparent hover:border-slate-300 focus:border-[#002C50] placeholder:text-slate-400 placeholder:italic resize-none"
                        />
                      </td>
                      <td className="p-2 border border-slate-300 align-top bg-blue-50/40">
                        <textarea
                          rows={2}
                          value={item.depasse}
                          onChange={(e) => handleCritereChange(item.id, 'depasse', e.target.value)}
                          placeholder="[Niveau 4]"
                          className="w-full text-[#002C50] font-semibold p-1 rounded border border-transparent hover:border-slate-300 focus:border-[#002C50] placeholder:text-slate-400 placeholder:italic resize-none"
                        />
                      </td>
                      <td className="p-1 border border-slate-300 text-center align-middle no-print">
                        {sequence.evaluation.grilleCriteriee.length > 1 && (
                          <button
                            type="button"
                            onClick={() => handleRemoveCritere(item.id)}
                            className="text-slate-300 hover:text-rose-600 p-1"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 5 & 6 : DIFFÉRENCIATION & ENRICHISSEMENT */}
      <div className="space-y-8 print-avoid-break">
        {/* Section 5 : Différenciation & Remédiation */}
        <section id="section-partie-5" className="bg-white rounded-2xl border-2 border-[#002C50] shadow-sm overflow-hidden flex flex-col scroll-mt-24">
          <div className="bg-[#002C50] text-white px-6 py-5 flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="p-2.5 bg-white/10 rounded-xl text-[#95EA31]">
                <Users className="w-6 h-6" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-black uppercase tracking-wider text-[#95EA31]">Partie 5</span>
                  <span className="text-white/40">·</span>
                  <h2 className="text-lg sm:text-xl font-bold text-white tracking-tight">
                    Différenciation & Remédiation
                  </h2>
                </div>
                <p className="text-xs text-slate-300 mt-0.5">
                  Mesures d'adaptation (CUA & Besoins Particuliers/DYS) et protocoles de remédiation ciblée
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={() => setShowDiffDrawer(!showDiffDrawer)}
              className="flex items-center gap-2 px-4 py-2.5 text-xs sm:text-sm font-extrabold bg-[#95EA31] text-[#002C50] hover:bg-[#85da25] active:bg-[#78c91f] rounded-xl transition-all cursor-pointer shadow-xs active:scale-95 no-print"
            >
              <Lightbulb className="w-4 h-4" />
              <span>{showDiffDrawer ? 'Fermer la banque CUA' : 'Banque CUA & Remédiation'}</span>
            </button>
          </div>

          <div className="p-6 space-y-5 flex-1">
            {/* The Bank appears DIRECTLY INSIDE Section 5 */}
            {showDiffDrawer && (
              <div className="no-print mb-4 animate-in fade-in duration-150">
                <DifferenciationPicker
                  onAppendAdaptation={handleAppendAdaptation}
                  onAppendRemediation={handleAppendRemediation}
                  onClose={() => setShowDiffDrawer(false)}
                />
              </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div className="p-4 rounded-xl border border-slate-200 bg-[#F8FAFC]">
                <label className="text-xs font-bold text-[#002C50] uppercase tracking-wider block mb-1.5">
                  5.1 Mesures d'adaptation (CUA & Besoins Particuliers / DYS)
                </label>
                <textarea
                  rows={4}
                  value={sequence.differenciation.mesuresAdaptation}
                  onChange={(e) => handleDiffChange('mesuresAdaptation', e.target.value)}
                  placeholder="[Exemple : Polices haute lisibilité Opendyslexic, temps majoré de 25%, fiches étapes, consignes audio-visuelles...]"
                  className="w-full text-sm text-slate-800 p-3 bg-white rounded-xl border border-slate-300 placeholder:text-slate-400 placeholder:italic focus:outline-none focus:ring-1 focus:ring-[#002C50] focus:border-[#002C50] resize-none"
                />
              </div>

              <div className="p-4 rounded-xl border border-slate-200 bg-[#F8FAFC]">
                <label className="text-xs font-bold text-[#002C50] uppercase tracking-wider block mb-1.5">
                  5.2 Dispositifs de remédiation ciblée
                </label>
                <textarea
                  rows={4}
                  value={sequence.differenciation.remédiation}
                  onChange={(e) => handleDiffChange('remédiation', e.target.value)}
                  placeholder="[Exemple : Atelier dirigé avec l'enseignant en petit groupe de 3 élèves sur la compétence charnière non maîtrisée...]"
                  className="w-full text-sm text-slate-800 p-3 bg-white rounded-xl border border-slate-300 placeholder:text-slate-400 placeholder:italic focus:outline-none focus:ring-1 focus:ring-[#002C50] focus:border-[#002C50] resize-none"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Section 6 : Suggestions d'Enrichissement & Traitement des Manques */}
        <section id="section-partie-6" className="bg-white rounded-2xl border-2 border-[#002C50] shadow-sm overflow-hidden flex flex-col scroll-mt-24">
          <div className="bg-[#002C50] text-white px-6 py-5 flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="p-2.5 bg-white/10 rounded-xl text-[#95EA31]">
                <Rocket className="w-6 h-6" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-black uppercase tracking-wider text-[#95EA31]">Partie 6</span>
                  <span className="text-white/40">·</span>
                  <h2 className="text-lg sm:text-xl font-bold text-white tracking-tight">
                    Suggestions d'Enrichissement & Traitement des Manques
                  </h2>
                </div>
                <p className="text-xs text-slate-300 mt-0.5">
                  Pistes d'élargissement, interdisciplinarité, ou identification et traitement en amont des manques préalables
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={() => setShowEnrichDrawer(!showEnrichDrawer)}
              className="flex items-center gap-2 px-4 py-2.5 text-xs sm:text-sm font-extrabold bg-[#95EA31] text-[#002C50] hover:bg-[#85da25] active:bg-[#78c91f] rounded-xl transition-all cursor-pointer shadow-xs active:scale-95 no-print"
            >
              <Compass className="w-4 h-4" />
              <span>{showEnrichDrawer ? 'Fermer la banque' : 'Banque Élargissements & Manques'}</span>
            </button>
          </div>

          <div className="p-6 space-y-5 flex-1">
            {/* The Bank appears DIRECTLY INSIDE Section 6 */}
            {showEnrichDrawer && (
              <div className="no-print mb-4 animate-in fade-in duration-150">
                <EnrichissementPicker
                  onAppendProposal={handleAppendEnrichissementProposal}
                  onClose={() => setShowEnrichDrawer(false)}
                />
              </div>
            )}

            <div className="p-4 rounded-xl border border-[#95EA31]/40 bg-[#EBF8DC]/30">
              <label className="text-xs font-bold text-[#002C50] uppercase tracking-wider block mb-1.5">
                Pistes d'élargissement pédagogique ou traitement des manques préalables
              </label>
              <textarea
                rows={5}
                value={sequence.enrichissement.pistesApprofondissement}
                onChange={(e) => handleEnrichissementChange(e.target.value)}
                placeholder="[Exemple : Projet transdisciplinaire / Immersion recherche suisse EPFL-UNIGE / Diagnostic préalable des manques notionnels pour sécuriser les fondamentaux...]"
                className="w-full text-sm text-slate-800 p-3 bg-white rounded-xl border border-slate-300 placeholder:text-slate-400 placeholder:italic focus:outline-none focus:ring-1 focus:ring-[#002C50] focus:border-[#002C50] resize-none"
              />
            </div>

            <div className="pt-2 flex items-center justify-between text-xs text-slate-500">
              <span>Aligné sur le projet éducatif École Moser</span>
              <span className="font-bold text-[#002C50]">Genève · Nyon · Berlin</span>
            </div>
          </div>
        </section>
      </div>

      {/* SECTION 7 : RESSOURCES NUMÉRIQUES, LIENS & QR CODES */}
      <ResourceSection
        ressources={sequence.ressources}
        onAddResource={onAddResource}
        onRemoveResource={onRemoveResource}
      />
    </div>
  );
};
