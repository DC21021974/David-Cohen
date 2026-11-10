import React, { useState } from 'react';
import { PedagogicalSequence, PhasePlanification, CritereEvaluation, ObjectifItem } from '../types/sequence';
import { Plus, Trash2, Save, X } from 'lucide-react';

interface EditSequenceModalProps {
  isOpen: boolean;
  onClose: () => void;
  sequence: PedagogicalSequence;
  onSave: (updated: PedagogicalSequence) => void;
}

export const EditSequenceModal: React.FC<EditSequenceModalProps> = ({
  isOpen,
  onClose,
  sequence,
  onSave,
}) => {
  const [formData, setFormData] = useState<PedagogicalSequence>({ ...sequence });

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({
      ...formData,
      isViergeTemplate: false, // Once edited, it's a personalized sequence
    });
    onClose();
  };

  const updateEnTete = (field: string, value: any) => {
    setFormData((prev) => ({
      ...prev,
      enTete: {
        ...prev.enTete,
        [field]: value,
      },
    }));
  };

  const addObjective = () => {
    const newObj: ObjectifItem = {
      id: `obj-${Date.now()}`,
      text: 'Nouvel objectif d\'apprentissage',
      checked: false,
    };
    setFormData((prev) => ({
      ...prev,
      enTete: {
        ...prev.enTete,
        objectifs: [...prev.enTete.objectifs, newObj],
      },
    }));
  };

  const removeObjective = (id: string) => {
    setFormData((prev) => ({
      ...prev,
      enTete: {
        ...prev.enTete,
        objectifs: prev.enTete.objectifs.filter((o) => o.id !== id),
      },
    }));
  };

  const updateObjectiveText = (id: string, text: string) => {
    setFormData((prev) => ({
      ...prev,
      enTete: {
        ...prev.enTete,
        objectifs: prev.enTete.objectifs.map((o) => (o.id === id ? { ...o, text } : o)),
      },
    }));
  };

  const addPhase = () => {
    const newPhase: PhasePlanification = {
      id: `phase-${Date.now()}`,
      phaseDuree: `Phase ${formData.planification.phases.length + 1} (20 min)`,
      objectifsActivites: 'Nouvelle activité élève',
      roleProf: 'Accompagnement et relance',
      outilsSAMR: 'Augmentation',
      cuaDifferenciation: 'Consignes multimodales',
      checked: false,
    };
    setFormData((prev) => ({
      ...prev,
      planification: {
        ...prev.planification,
        phases: [...prev.planification.phases, newPhase],
      },
    }));
  };

  const removePhase = (id: string) => {
    setFormData((prev) => ({
      ...prev,
      planification: {
        ...prev.planification,
        phases: prev.planification.phases.filter((p) => p.id !== id),
      },
    }));
  };

  const updatePhase = (id: string, field: keyof PhasePlanification, value: any) => {
    setFormData((prev) => ({
      ...prev,
      planification: {
        ...prev.planification,
        phases: prev.planification.phases.map((p) =>
          p.id === id ? { ...p, [field]: value } : p
        ),
      },
    }));
  };

  const addCritere = () => {
    const newCrit: CritereEvaluation = {
      id: `crit-${Date.now()}`,
      critere: `Critère ${formData.evaluation.grilleCriteriee.length + 1}`,
      indicateurs: 'Indicateurs observables',
      insuffisant: 'Non maîtrisé',
      partiel: 'Partiellement acquis',
      atteint: 'Objectif atteint',
      depasse: 'Maîtrise approfondie',
    };
    setFormData((prev) => ({
      ...prev,
      evaluation: {
        ...prev.evaluation,
        grilleCriteriee: [...prev.evaluation.grilleCriteriee, newCrit],
      },
    }));
  };

  const removeCritere = (id: string) => {
    setFormData((prev) => ({
      ...prev,
      evaluation: {
        ...prev.evaluation,
        grilleCriteriee: prev.evaluation.grilleCriteriee.filter((c) => c.id !== id),
      },
    }));
  };

  const updateCritere = (id: string, field: keyof CritereEvaluation, value: string) => {
    setFormData((prev) => ({
      ...prev,
      evaluation: {
        ...prev.evaluation,
        grilleCriteriee: prev.evaluation.grilleCriteriee.map((c) =>
          c.id === id ? { ...c, [field]: value } : c
        ),
      },
    }));
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4 overflow-y-auto"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-2xl p-6 sm:p-8 max-w-4xl w-full border border-[#002C50]/20 shadow-2xl my-8 space-y-6 max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between border-b border-slate-100 pb-4 sticky top-0 bg-white z-10">
          <div>
            <h2 className="text-base font-bold text-[#002C50]">
              Édition de la Séquence Pédagogique
            </h2>
            <p className="text-xs text-slate-500">
              Modifiez directement les textes, ajoutez des phases de travail ou personnalisez la grille d'évaluation.
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="text-slate-400 hover:text-slate-700 text-sm font-bold p-1 cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* 1. En-tête */}
          <div className="p-4 rounded-xl border border-slate-200 bg-[#F8FAFC] space-y-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-[#002C50]">
              1. Paramètres de l'En-tête
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-medium text-slate-700 mb-1">Titre de la séquence</label>
                <input
                  type="text"
                  required
                  value={formData.enTete.titre}
                  onChange={(e) => updateEnTete('titre', e.target.value)}
                  className="w-full text-xs px-3 py-2 bg-white border border-slate-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#002C50]"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-700 mb-1">Discipline</label>
                <input
                  type="text"
                  required
                  value={formData.enTete.discipline}
                  onChange={(e) => updateEnTete('discipline', e.target.value)}
                  className="w-full text-xs px-3 py-2 bg-white border border-slate-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#002C50]"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-700 mb-1">Niveau / Degré</label>
                <input
                  type="text"
                  required
                  value={formData.enTete.niveau}
                  onChange={(e) => updateEnTete('niveau', e.target.value)}
                  className="w-full text-xs px-3 py-2 bg-white border border-slate-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#002C50]"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-700 mb-1">Durée</label>
                <input
                  type="text"
                  required
                  value={formData.enTete.duree}
                  onChange={(e) => updateEnTete('duree', e.target.value)}
                  className="w-full text-xs px-3 py-2 bg-white border border-slate-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#002C50]"
                />
              </div>
            </div>

            {/* Objectifs */}
            <div className="pt-2">
              <div className="flex items-center justify-between mb-2">
                <label className="text-xs font-semibold text-slate-700">Objectifs d'apprentissage</label>
                <button
                  type="button"
                  onClick={addObjective}
                  className="text-xs text-[#002C50] font-semibold hover:underline flex items-center gap-1"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Ajouter un objectif</span>
                </button>
              </div>

              <div className="space-y-2">
                {formData.enTete.objectifs.map((obj) => (
                  <div key={obj.id} className="flex items-center gap-2">
                    <input
                      type="text"
                      value={obj.text}
                      onChange={(e) => updateObjectiveText(obj.id, e.target.value)}
                      className="flex-1 text-xs px-3 py-1.5 bg-white border border-slate-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#002C50]"
                    />
                    <button
                      type="button"
                      onClick={() => removeObjective(obj.id)}
                      className="text-slate-400 hover:text-rose-600 p-1"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* 2. Planification des phases */}
          <div className="p-4 rounded-xl border border-slate-200 bg-[#F8FAFC] space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="text-xs font-bold uppercase tracking-wider text-[#002C50]">
                2. Planification Détaillée des Phases
              </h3>
              <button
                type="button"
                onClick={addPhase}
                className="text-xs text-[#002C50] font-semibold hover:underline flex items-center gap-1"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Ajouter une phase</span>
              </button>
            </div>

            <div className="space-y-3">
              {formData.planification.phases.map((p, idx) => (
                <div key={p.id} className="p-3 bg-white border border-slate-200 rounded-lg space-y-2">
                  <div className="flex items-center justify-between">
                    <input
                      type="text"
                      value={p.phaseDuree}
                      onChange={(e) => updatePhase(p.id, 'phaseDuree', e.target.value)}
                      placeholder="Nom de la phase et durée"
                      className="text-xs font-bold text-[#002C50] px-2 py-1 border border-slate-200 rounded w-2/3"
                    />
                    <button
                      type="button"
                      onClick={() => removePhase(p.id)}
                      className="text-slate-400 hover:text-rose-600 p-1"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-xs">
                    <div>
                      <label className="block text-[11px] text-slate-500 mb-0.5">Objectifs & Activités</label>
                      <textarea
                        rows={2}
                        value={p.objectifsActivites}
                        onChange={(e) => updatePhase(p.id, 'objectifsActivites', e.target.value)}
                        className="w-full text-xs p-2 border border-slate-200 rounded"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] text-slate-500 mb-0.5">Rôle enseignant</label>
                      <textarea
                        rows={2}
                        value={p.roleProf}
                        onChange={(e) => updatePhase(p.id, 'roleProf', e.target.value)}
                        className="w-full text-xs p-2 border border-slate-200 rounded"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] text-slate-500 mb-0.5">Outils [SAMR]</label>
                      <input
                        type="text"
                        value={p.outilsSAMR}
                        onChange={(e) => updatePhase(p.id, 'outilsSAMR', e.target.value)}
                        className="w-full text-xs p-1.5 border border-slate-200 rounded"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] text-slate-500 mb-0.5">CUA & Différenciation</label>
                      <input
                        type="text"
                        value={p.cuaDifferenciation}
                        onChange={(e) => updatePhase(p.id, 'cuaDifferenciation', e.target.value)}
                        className="w-full text-xs p-1.5 border border-slate-200 rounded"
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* 3. Évaluation */}
          <div className="p-4 rounded-xl border border-slate-200 bg-[#F8FAFC] space-y-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-[#002C50]">
              3. Stratégie d'Évaluation & Grille Critériée
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-medium text-slate-700 mb-1">Dispositifs formatifs</label>
                <textarea
                  rows={2}
                  value={formData.evaluation.dispositifsFormatifs}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      evaluation: { ...prev.evaluation, dispositifsFormatifs: e.target.value },
                    }))
                  }
                  className="w-full text-xs p-2 bg-white border border-slate-300 rounded-lg"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-slate-700 mb-1">Tâche sommative authentique</label>
                <textarea
                  rows={2}
                  value={formData.evaluation.tacheSommative}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      evaluation: { ...prev.evaluation, tacheSommative: e.target.value },
                    }))
                  }
                  className="w-full text-xs p-2 bg-white border border-slate-300 rounded-lg"
                />
              </div>
            </div>

            {/* Criteria Grid */}
            <div className="pt-2">
              <div className="flex items-center justify-between mb-2">
                <label className="text-xs font-semibold text-slate-700">Critères d'évaluation (Grille CER)</label>
                <button
                  type="button"
                  onClick={addCritere}
                  className="text-xs text-[#002C50] font-semibold hover:underline flex items-center gap-1"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Ajouter un critère</span>
                </button>
              </div>

              <div className="space-y-3">
                {formData.evaluation.grilleCriteriee.map((g) => (
                  <div key={g.id} className="p-3 bg-white border border-slate-200 rounded-lg space-y-2">
                    <div className="flex items-center justify-between">
                      <input
                        type="text"
                        value={g.critere}
                        onChange={(e) => updateCritere(g.id, 'critere', e.target.value)}
                        placeholder="Intitulé du critère"
                        className="text-xs font-bold text-[#002C50] px-2 py-1 border border-slate-200 rounded w-1/2"
                      />
                      <button
                        type="button"
                        onClick={() => removeCritere(g.id)}
                        className="text-slate-400 hover:text-rose-600 p-1"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>

                    <input
                      type="text"
                      value={g.indicateurs}
                      onChange={(e) => updateCritere(g.id, 'indicateurs', e.target.value)}
                      placeholder="Indicateurs observables"
                      className="w-full text-xs p-1.5 border border-slate-200 rounded"
                    />

                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-[11px]">
                      <div>
                        <span className="text-slate-500 block">Insuffisant (1)</span>
                        <input
                          type="text"
                          value={g.insuffisant}
                          onChange={(e) => updateCritere(g.id, 'insuffisant', e.target.value)}
                          className="w-full p-1 border border-slate-200 rounded text-xs"
                        />
                      </div>
                      <div>
                        <span className="text-slate-500 block">Partiel (2)</span>
                        <input
                          type="text"
                          value={g.partiel}
                          onChange={(e) => updateCritere(g.id, 'partiel', e.target.value)}
                          className="w-full p-1 border border-slate-200 rounded text-xs"
                        />
                      </div>
                      <div>
                        <span className="text-slate-500 block">Atteint (3)</span>
                        <input
                          type="text"
                          value={g.atteint}
                          onChange={(e) => updateCritere(g.id, 'atteint', e.target.value)}
                          className="w-full p-1 border border-slate-200 rounded text-xs font-medium"
                        />
                      </div>
                      <div>
                        <span className="text-[#002C50] font-semibold block">Dépassé (4)</span>
                        <input
                          type="text"
                          value={g.depasse}
                          onChange={(e) => updateCritere(g.id, 'depasse', e.target.value)}
                          className="w-full p-1 border border-slate-200 rounded text-xs font-semibold text-[#002C50]"
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* 4. Différenciation & Enrichissement */}
          <div className="p-4 rounded-xl border border-slate-200 bg-[#F8FAFC] space-y-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-[#002C50]">
              4. Différenciation, Remédiation & Enrichissement
            </h3>
            <div className="space-y-3">
              <div>
                <label className="block text-xs font-medium text-slate-700 mb-1">
                  Mesures d'adaptation (CUA & Besoins Particuliers)
                </label>
                <textarea
                  rows={2}
                  value={formData.differenciation.mesuresAdaptation}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      differenciation: { ...prev.differenciation, mesuresAdaptation: e.target.value },
                    }))
                  }
                  className="w-full text-xs p-2 bg-white border border-slate-300 rounded-lg"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-700 mb-1">
                  Dispositifs de remédiation ciblée
                </label>
                <textarea
                  rows={2}
                  value={formData.differenciation.remédiation}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      differenciation: { ...prev.differenciation, remédiation: e.target.value },
                    }))
                  }
                  className="w-full text-xs p-2 bg-white border border-slate-300 rounded-lg"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-700 mb-1">
                  Pistes d'enrichissement & Interdisciplinarité
                </label>
                <textarea
                  rows={2}
                  value={formData.enrichissement.pistesApprofondissement}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      enrichissement: { pistesApprofondissement: e.target.value },
                    }))
                  }
                  className="w-full text-xs p-2 bg-white border border-slate-300 rounded-lg"
                />
              </div>
            </div>
          </div>

          <div className="flex items-center justify-end gap-3 pt-3 sticky bottom-0 bg-white border-t border-slate-100 py-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-xs font-medium text-slate-600 hover:text-slate-800 cursor-pointer"
            >
              Annuler
            </button>
            <button
              type="submit"
              className="flex items-center gap-2 px-5 py-2 text-xs font-bold text-white bg-[#002C50] hover:bg-[#001e38] rounded-xl transition-all cursor-pointer shadow-md"
            >
              <Save className="w-4 h-4 text-[#95EA31]" />
              <span>Enregistrer les modifications</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
