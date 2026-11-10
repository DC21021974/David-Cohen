import React, { useState } from 'react';
import {
  niveauxRomands,
  perCatalogByDiscipline,
  PerCompetence,
} from '../data/perMerCatalog';
import { BookOpen, Check, CheckSquare, Square, ChevronRight, X, Sparkles } from 'lucide-react';

interface PerProgramPickerProps {
  currentDiscipline: string;
  currentNiveau: string;
  selectedObjectiveTexts: string[];
  onSelectCompetence: (comp: PerCompetence) => void;
  onDeselectCompetence: (compCode: string) => void;
  onUpdateDisciplineAndNiveau: (discipline: string, niveau: string) => void;
  onClose?: () => void;
}

export const PerProgramPicker: React.FC<PerProgramPickerProps> = ({
  currentDiscipline,
  currentNiveau,
  selectedObjectiveTexts,
  onSelectCompetence,
  onDeselectCompetence,
  onUpdateDisciplineAndNiveau,
  onClose,
}) => {
  // Find initial discipline key
  const disciplineKeys = Object.keys(perCatalogByDiscipline);
  const matchedDiscipline =
    disciplineKeys.find((d) => currentDiscipline && currentDiscipline.toLowerCase().includes(d.toLowerCase().split(' ')[0])) ||
    disciplineKeys[0];

  const [selectedDiscipline, setSelectedDiscipline] = useState<string>(matchedDiscipline);
  const [selectedNiveau, setSelectedNiveau] = useState<string>(
    currentNiveau || niveauxRomands[1].nom // default 10e Harmos
  );

  const competences = perCatalogByDiscipline[selectedDiscipline] || [];

  const handleDisciplineChange = (disc: string) => {
    setSelectedDiscipline(disc);
    onUpdateDisciplineAndNiveau(disc.replace(/ \(.*\)/, ''), selectedNiveau);
  };

  const handleNiveauChange = (niv: string) => {
    setSelectedNiveau(niv);
    onUpdateDisciplineAndNiveau(selectedDiscipline.replace(/ \(.*\)/, ''), niv);
  };

  const isCompetenceSelected = (comp: PerCompetence) => {
    return selectedObjectiveTexts.some(
      (txt) => txt.includes(comp.code) || txt.toLowerCase().includes(comp.intitule.toLowerCase().slice(0, 25))
    );
  };

  const handleToggle = (comp: PerCompetence) => {
    if (isCompetenceSelected(comp)) {
      onDeselectCompetence(comp.code);
    } else {
      onSelectCompetence(comp);
    }
  };

  return (
    <div className="bg-white rounded-2xl border-2 border-[#002C50] shadow-xl overflow-hidden animate-in fade-in duration-200">
      {/* Header with Prominent Close Button */}
      <div className="bg-[#002C50] text-white px-6 py-4 flex items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-white/10 rounded-xl text-[#95EA31]">
            <BookOpen className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-base font-bold text-white tracking-tight">
              Référentiel PER & MER Romand — Volet de Choix
            </h3>
            <p className="text-xs text-slate-300">
              Sélectionnez le niveau et la discipline, puis cochez les compétences officielles à intégrer
            </p>
          </div>
        </div>

        {onClose && (
          <button
            type="button"
            onClick={onClose}
            className="flex items-center gap-2 px-4 py-2 bg-rose-600 hover:bg-rose-700 active:bg-rose-800 text-white text-xs sm:text-sm font-extrabold rounded-xl transition-all cursor-pointer shadow-sm active:scale-95"
            title="Fermer ce volet"
          >
            <X className="w-4 h-4" />
            <span>Fermer le volet</span>
          </button>
        )}
      </div>

      <div className="p-6 space-y-6">
        {/* Step 1: Choix du Niveau et de la Matière (Bigger, more ergonomic buttons) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 p-5 rounded-2xl bg-[#F0F6FA] border border-[#002C50]/20">
          {/* Niveau */}
          <div>
            <label className="text-xs font-bold text-[#002C50] uppercase tracking-wider block mb-2 flex items-center gap-1.5">
              <span>1. Degré / Niveau scolaire</span>
            </label>
            <div className="flex flex-wrap gap-2">
              {niveauxRomands.map((niv) => (
                <button
                  key={niv.nom}
                  type="button"
                  onClick={() => handleNiveauChange(niv.nom)}
                  className={`px-3.5 py-2 text-xs sm:text-sm font-bold rounded-xl transition-all cursor-pointer ${
                    selectedNiveau === niv.nom
                      ? 'bg-[#002C50] text-[#95EA31] shadow-md scale-102 ring-2 ring-[#95EA31]'
                      : 'bg-white border border-slate-300 text-slate-700 hover:border-[#002C50] hover:bg-slate-50'
                  }`}
                >
                  {niv.nom}
                </button>
              ))}
            </div>
          </div>

          {/* Matière */}
          <div>
            <label className="text-xs font-bold text-[#002C50] uppercase tracking-wider block mb-2 flex items-center gap-1.5">
              <span>2. Discipline / Matière</span>
            </label>
            <div className="flex flex-wrap gap-2">
              {disciplineKeys.map((disc) => (
                <button
                  key={disc}
                  type="button"
                  onClick={() => handleDisciplineChange(disc)}
                  className={`px-3.5 py-2 text-xs sm:text-sm font-bold rounded-xl transition-all cursor-pointer ${
                    selectedDiscipline === disc
                      ? 'bg-[#002C50] text-[#95EA31] shadow-md scale-102 ring-2 ring-[#95EA31]'
                      : 'bg-white border border-slate-300 text-slate-700 hover:border-[#002C50] hover:bg-slate-50'
                  }`}
                >
                  {disc}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Step 2: Compétences du PER & MER à cocher */}
        <div>
          <div className="flex items-center justify-between mb-3">
            <label className="text-xs font-bold text-[#002C50] uppercase tracking-wider">
              3. Cochez les compétences du PER & MER romand à insérer dans vos objectifs :
            </label>
            <span className="text-xs text-slate-500 font-medium hidden sm:inline">
              Cocher insère automatiquement l'objectif dans votre Partie 1
            </span>
          </div>

          <div className="space-y-3 max-h-[380px] overflow-y-auto pr-2">
            {competences.map((comp) => {
              const selected = isCompetenceSelected(comp);
              return (
                <div
                  key={comp.code}
                  onClick={() => handleToggle(comp)}
                  className={`p-4 rounded-xl border-2 transition-all cursor-pointer flex items-start gap-4 ${
                    selected
                      ? 'bg-[#EBF8DC] border-[#95EA31] text-[#002C50] shadow-xs'
                      : 'bg-[#F8FAFC] border-slate-200 hover:border-[#002C50]/50 text-slate-800 hover:bg-white'
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
                      <span className="text-xs font-extrabold text-[#002C50] bg-white px-2.5 py-1 rounded-lg border border-[#002C50]/20 font-mono">
                        {comp.code}
                      </span>
                      <span className="text-sm font-bold text-slate-900">
                        {comp.intitule}
                      </span>
                    </div>

                    <p className="text-xs text-slate-600 mt-1.5 leading-relaxed">
                      {comp.description}
                    </p>

                    {comp.merRef && (
                      <div className="mt-2 text-xs text-slate-500 font-mono bg-white/60 px-2 py-0.5 rounded inline-block">
                        📖 <em>{comp.merRef}</em>
                      </div>
                    )}
                  </div>

                  <div className="shrink-0 self-center">
                    <span
                      className={`text-xs font-extrabold px-3 py-1.5 rounded-lg ${
                        selected
                          ? 'bg-[#95EA31] text-[#002C50] shadow-2xs'
                          : 'bg-slate-200 text-slate-700'
                      }`}
                    >
                      {selected ? '✓ Sélectionné' : 'Cliquer pour insérer'}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Footer with Close Button */}
        {onClose && (
          <div className="pt-3 border-t border-slate-200 flex items-center justify-between">
            <span className="text-xs text-slate-500">
              Les compétences cochées apparaissent immédiatement dans la liste de la Partie 1.
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
