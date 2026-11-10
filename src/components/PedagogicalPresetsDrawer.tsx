import React, { useState } from 'react';
import {
  criteresPresetsCER,
  CriterePreset,
  differenciationPresets,
  DifferenciationPreset,
  enrichissementPresets,
  EnrichissementPreset,
} from '../data/perMerCatalog';
import { CritereEvaluation } from '../types/sequence';
import { CheckSquare, Square, Check, X, Sparkles, Plus, AlertCircle, ArrowUpRight } from 'lucide-react';

// --- CRITERIA PRESET PICKER ---
interface CriteriaPickerProps {
  onAddCritere: (critere: CritereEvaluation) => void;
  existingCriteriaTitles: string[];
  onClose?: () => void;
}

export const CriteriaPicker: React.FC<CriteriaPickerProps> = ({
  onAddCritere,
  existingCriteriaTitles,
  onClose,
}) => {
  const isSelected = (preset: CriterePreset) => {
    return existingCriteriaTitles.some(
      (t) => t.toLowerCase().includes(preset.titre.toLowerCase().slice(0, 15))
    );
  };

  const handleSelect = (preset: CriterePreset) => {
    const newCrit: CritereEvaluation = {
      id: `crit-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`,
      critere: preset.titre,
      indicateurs: preset.indicateurs,
      insuffisant: preset.insuffisant,
      partiel: preset.partiel,
      atteint: preset.atteint,
      depasse: preset.depasse,
    };
    onAddCritere(newCrit);
  };

  return (
    <div className="bg-white rounded-2xl border-2 border-[#002C50] shadow-xl overflow-hidden animate-in fade-in duration-200">
      <div className="bg-[#002C50] text-white px-6 py-4 flex items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-white/10 rounded-xl text-[#95EA31]">
            <Sparkles className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-base font-bold text-white tracking-tight">
              Banque de Critères d'Évaluation (Alignée CER & IB)
            </h3>
            <p className="text-xs text-slate-300">
              Insérez les critères officiels avec indicateurs et 4 paliers de maîtrise
            </p>
          </div>
        </div>

        {onClose && (
          <button
            type="button"
            onClick={onClose}
            className="flex items-center gap-2 px-4 py-2 bg-rose-600 hover:bg-rose-700 active:bg-rose-800 text-white text-xs sm:text-sm font-extrabold rounded-xl transition-all cursor-pointer shadow-sm active:scale-95 shrink-0"
            title="Fermer ce volet"
          >
            <X className="w-4 h-4" />
            <span>Fermer le volet</span>
          </button>
        )}
      </div>

      <div className="p-6 space-y-4">
        <p className="text-xs font-medium text-slate-600">
          Cliquez sur <strong>+ Insérer ce critère</strong> pour intégrer directement la ligne complète dans votre grille critériée :
        </p>

        <div className="space-y-3.5 max-h-[380px] overflow-y-auto pr-2">
          {criteresPresetsCER.map((preset) => {
            const selected = isSelected(preset);
            return (
              <div
                key={preset.titre}
                onClick={() => !selected && handleSelect(preset)}
                className={`p-4 rounded-xl border-2 transition-all flex items-start gap-4 ${
                  selected
                    ? 'bg-[#EBF8DC] border-[#95EA31] opacity-80 cursor-default'
                    : 'bg-[#F8FAFC] border-slate-200 hover:border-[#002C50] hover:bg-white cursor-pointer shadow-2xs'
                }`}
              >
                <div className="mt-1 shrink-0 text-[#002C50]">
                  {selected ? (
                    <CheckSquare className="w-6 h-6 text-[#002C50]" />
                  ) : (
                    <Square className="w-6 h-6 text-slate-400" />
                  )}
                </div>

                <div className="flex-1">
                  <div className="flex items-center gap-2.5 flex-wrap">
                    <span className="text-sm font-bold text-[#002C50]">
                      {preset.titre}
                    </span>
                    <span className="text-xs font-semibold text-slate-600 bg-white px-2.5 py-0.5 rounded-lg border border-slate-200">
                      {preset.categorie}
                    </span>
                  </div>

                  <p className="text-xs text-slate-700 mt-1.5 leading-relaxed">
                    <strong>Indicateurs observables :</strong> {preset.indicateurs}
                  </p>

                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mt-2.5 text-[11px]">
                    <span className="p-1.5 rounded-lg bg-rose-50 text-rose-800 border border-rose-200/50">
                      <strong>1. Insuffisant :</strong> {preset.insuffisant.slice(0, 36)}...
                    </span>
                    <span className="p-1.5 rounded-lg bg-amber-50 text-amber-800 border border-amber-200/50">
                      <strong>2. Partiel :</strong> {preset.partiel.slice(0, 36)}...
                    </span>
                    <span className="p-1.5 rounded-lg bg-emerald-50 text-emerald-800 border border-emerald-200/50 font-medium">
                      <strong>3. Atteint :</strong> {preset.atteint.slice(0, 36)}...
                    </span>
                    <span className="p-1.5 rounded-lg bg-blue-50 text-[#002C50] border border-blue-200/50 font-semibold">
                      <strong>4. Dépassé :</strong> {preset.depasse.slice(0, 36)}...
                    </span>
                  </div>
                </div>

                <div className="shrink-0 self-center">
                  <button
                    type="button"
                    disabled={selected}
                    className={`text-xs sm:text-sm font-extrabold px-3.5 py-2 rounded-xl transition-all shadow-xs ${
                      selected
                        ? 'bg-[#95EA31] text-[#002C50]'
                        : 'bg-[#002C50] text-white hover:bg-[#001e38] cursor-pointer'
                    }`}
                  >
                    {selected ? '✓ Déjà inséré' : '+ Insérer ce critère'}
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {onClose && (
          <div className="pt-3 border-t border-slate-200 flex items-center justify-between">
            <span className="text-xs text-slate-500">
              Les critères ajoutés s'affichent immédiatement dans le tableau de la Partie 4.
            </span>
            <button
              type="button"
              onClick={onClose}
              className="flex items-center gap-1.5 px-4 py-2 bg-[#002C50] hover:bg-[#001e38] text-white text-xs sm:text-sm font-bold rounded-xl transition-all cursor-pointer shadow-xs"
            >
              <Check className="w-4 h-4 text-[#95EA31]" />
              <span>Valider & Fermer la banque</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

// --- SECTION 5 : DIFFERENCIATION PRESETS PICKER ---
interface DifferenciationPickerProps {
  onAppendAdaptation: (texte: string) => void;
  onAppendRemediation: (texte: string) => void;
  onClose?: () => void;
}

export const DifferenciationPicker: React.FC<DifferenciationPickerProps> = ({
  onAppendAdaptation,
  onAppendRemediation,
  onClose,
}) => {
  const [activeTab, setActiveTab] = useState<'adaptation' | 'remediation'>('adaptation');

  const filtered = differenciationPresets.filter((p) => p.type === activeTab);

  return (
    <div className="bg-white rounded-2xl border-2 border-[#002C50] shadow-xl overflow-hidden animate-in fade-in duration-200">
      <div className="bg-[#002C50] text-white px-6 py-4 flex items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-white/10 rounded-xl text-[#95EA31]">
            <Sparkles className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-base font-bold text-white tracking-tight">
              Banque CUA & Remédiation (Partie 5)
            </h3>
            <p className="text-xs text-slate-300">
              Insérez des adaptations universelles ou des protocoles de remédiation ciblée
            </p>
          </div>
        </div>

        {onClose && (
          <button
            type="button"
            onClick={onClose}
            className="flex items-center gap-2 px-4 py-2 bg-rose-600 hover:bg-rose-700 active:bg-rose-800 text-white text-xs sm:text-sm font-extrabold rounded-xl transition-all cursor-pointer shadow-sm active:scale-95 shrink-0"
            title="Fermer ce volet"
          >
            <X className="w-4 h-4" />
            <span>Fermer le volet</span>
          </button>
        )}
      </div>

      <div className="p-6 space-y-5">
        {/* Large Ergonomic Tabs */}
        <div className="flex items-center p-1.5 bg-slate-100 rounded-2xl max-w-lg border border-slate-200">
          <button
            type="button"
            onClick={() => setActiveTab('adaptation')}
            className={`flex-1 py-2 px-3 text-xs sm:text-sm font-bold rounded-xl transition-all cursor-pointer text-center ${
              activeTab === 'adaptation'
                ? 'bg-[#002C50] text-[#95EA31] shadow-md'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Mesures d'adaptation (CUA & DYS)
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('remediation')}
            className={`flex-1 py-2 px-3 text-xs sm:text-sm font-bold rounded-xl transition-all cursor-pointer text-center ${
              activeTab === 'remediation'
                ? 'bg-[#002C50] text-[#95EA31] shadow-md'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Dispositifs de remédiation ciblée
          </button>
        </div>

        <div className="space-y-3 max-h-[320px] overflow-y-auto pr-2">
          {filtered.map((preset) => (
            <div
              key={preset.titre}
              onClick={() => {
                if (preset.type === 'adaptation') {
                  onAppendAdaptation(preset.texte);
                } else {
                  onAppendRemediation(preset.texte);
                }
              }}
              className="p-4 rounded-xl border-2 border-slate-200 bg-[#F8FAFC] hover:border-[#002C50] hover:bg-white transition-all cursor-pointer flex items-start justify-between gap-4 group shadow-2xs"
            >
              <div className="flex-1">
                <span className="text-sm font-bold text-[#002C50] block group-hover:underline">
                  {preset.titre}
                </span>
                <p className="text-xs text-slate-600 mt-1.5 leading-relaxed">
                  {preset.texte}
                </p>
              </div>

              <div className="shrink-0 self-center">
                <span className="text-xs sm:text-sm font-bold text-white bg-[#002C50] group-hover:bg-[#001e38] px-3.5 py-2 rounded-xl flex items-center gap-1.5 shadow-xs">
                  <Plus className="w-4 h-4 text-[#95EA31]" />
                  <span>Insérer</span>
                </span>
              </div>
            </div>
          ))}
        </div>

        {onClose && (
          <div className="pt-3 border-t border-slate-200 flex items-center justify-between">
            <span className="text-xs text-slate-500">
              Le texte sélectionné est inséré directement dans le champ de la Partie 5.
            </span>
            <button
              type="button"
              onClick={onClose}
              className="flex items-center gap-1.5 px-4 py-2 bg-[#002C50] hover:bg-[#001e38] text-white text-xs sm:text-sm font-bold rounded-xl transition-all cursor-pointer shadow-xs"
            >
              <Check className="w-4 h-4 text-[#95EA31]" />
              <span>Valider & Fermer le volet</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

// --- SECTION 6 : ENRICHISSEMENT & MANQUES PICKER ---
interface EnrichissementPickerProps {
  onAppendProposal: (texte: string) => void;
  onClose?: () => void;
}

export const EnrichissementPicker: React.FC<EnrichissementPickerProps> = ({
  onAppendProposal,
  onClose,
}) => {
  const [activeTab, setActiveTab] = useState<'elargissement' | 'manque'>('elargissement');

  const filtered = enrichissementPresets.filter((p) => p.categorie === activeTab);

  return (
    <div className="bg-white rounded-2xl border-2 border-[#002C50] shadow-xl overflow-hidden animate-in fade-in duration-200">
      <div className="bg-[#002C50] text-white px-6 py-4 flex items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-white/10 rounded-xl text-[#95EA31]">
            <Sparkles className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-base font-bold text-white tracking-tight">
              Banque : Élargissements Pédagogiques ou Traitement des Manques (Partie 6)
            </h3>
            <p className="text-xs text-slate-300">
              Pistes d'approfondissement ou consolidation préalable des prérequis fragiles
            </p>
          </div>
        </div>

        {onClose && (
          <button
            type="button"
            onClick={onClose}
            className="flex items-center gap-2 px-4 py-2 bg-rose-600 hover:bg-rose-700 active:bg-rose-800 text-white text-xs sm:text-sm font-extrabold rounded-xl transition-all cursor-pointer shadow-sm active:scale-95 shrink-0"
            title="Fermer ce volet"
          >
            <X className="w-4 h-4" />
            <span>Fermer le volet</span>
          </button>
        )}
      </div>

      <div className="p-6 space-y-5">
        {/* Large Ergonomic Tabs for Élargissement vs Manques */}
        <div className="flex items-center p-1.5 bg-slate-100 rounded-2xl max-w-xl border border-slate-200">
          <button
            type="button"
            onClick={() => setActiveTab('elargissement')}
            className={`flex-1 py-2 px-3 text-xs sm:text-sm font-bold rounded-xl transition-all cursor-pointer text-center ${
              activeTab === 'elargissement'
                ? 'bg-[#002C50] text-[#95EA31] shadow-md'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            🚀 Élargissements & Recherche
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('manque')}
            className={`flex-1 py-2 px-3 text-xs sm:text-sm font-bold rounded-xl transition-all cursor-pointer text-center ${
              activeTab === 'manque'
                ? 'bg-[#002C50] text-[#95EA31] shadow-md'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            🛡️ Traitement des manques
          </button>
        </div>

        <p className="text-xs text-slate-600 font-medium">
          {activeTab === 'elargissement'
            ? 'Propositions pour stimuler les élèves avancés ou développer des partenariats scientifiques/culturels :'
            : 'Dispositifs pour identifier et sécuriser les notions préalables non acquises avant la séquence :'}
        </p>

        <div className="space-y-3 max-h-[320px] overflow-y-auto pr-2">
          {filtered.map((preset) => (
            <div
              key={preset.titre}
              onClick={() => onAppendProposal(preset.texte)}
              className="p-4 rounded-xl border-2 border-slate-200 bg-[#F8FAFC] hover:border-[#002C50] hover:bg-white transition-all cursor-pointer flex items-start justify-between gap-4 group shadow-2xs"
            >
              <div className="flex-1">
                <span className="text-sm font-bold text-[#002C50] block group-hover:underline">
                  {preset.titre}
                </span>
                <p className="text-xs text-slate-600 mt-1.5 leading-relaxed">
                  {preset.texte}
                </p>
              </div>

              <div className="shrink-0 self-center">
                <span className="text-xs sm:text-sm font-bold text-white bg-[#002C50] group-hover:bg-[#001e38] px-3.5 py-2 rounded-xl flex items-center gap-1.5 shadow-xs">
                  <Plus className="w-4 h-4 text-[#95EA31]" />
                  <span>Insérer</span>
                </span>
              </div>
            </div>
          ))}
        </div>

        {onClose && (
          <div className="pt-3 border-t border-slate-200 flex items-center justify-between">
            <span className="text-xs text-slate-500">
              La proposition est insérée directement dans le champ de la Partie 6.
            </span>
            <button
              type="button"
              onClick={onClose}
              className="flex items-center gap-1.5 px-4 py-2 bg-[#002C50] hover:bg-[#001e38] text-white text-xs sm:text-sm font-bold rounded-xl transition-all cursor-pointer shadow-xs"
            >
              <Check className="w-4 h-4 text-[#95EA31]" />
              <span>Valider & Fermer le volet</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
