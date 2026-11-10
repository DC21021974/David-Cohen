import React, { useState, useEffect } from 'react';
import { PedagogicalSequence, RessourceLien } from '../types/sequence';
import {
  ChevronLeft,
  ChevronRight,
  Maximize2,
  Copy,
  Check,
  Tv,
  MessageSquare,
  Clock,
  Layers,
  Sparkles,
} from 'lucide-react';

interface DiaporamaViewProps {
  sequence: PedagogicalSequence;
}

interface SlideItem {
  id: string;
  diapoIndex: number;
  titreDiapo: string;
  ecranTitre: string;
  ecranSousTitre?: string;
  ecranContenu: React.ReactNode;
  notesOrateur: React.ReactNode;
  tempsEstime?: string;
}

export const DiaporamaView: React.FC<DiaporamaViewProps> = ({ sequence }) => {
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const [isCopied, setIsCopied] = useState(false);
  const [viewMode, setViewMode] = useState<'interactive' | 'grid'>('interactive');
  const [isFullscreen, setIsFullscreen] = useState(false);

  // Generate slides array strictly adhering to [DIAPOSITIVE X]
  const slides: SlideItem[] = [];

  // Slide 1 : Titre & En-tête
  slides.push({
    id: 'slide-1',
    diapoIndex: 1,
    titreDiapo: 'Titre & Enjeux de la Séquence',
    ecranTitre: sequence.enTete.titre || '[Titre de la Séquence]',
    ecranSousTitre: `${sequence.enTete.discipline || '[Discipline]'} · ${sequence.enTete.niveau || '[Niveau scolaire]'}`,
    tempsEstime: sequence.enTete.duree || 'Durée prévisionnelle',
    ecranContenu: (
      <div className="space-y-4">
        <div className="p-3 bg-[#002C50]/5 rounded-xl border border-[#002C50]/15 inline-block">
          <span className="text-xs font-semibold text-[#002C50]">
            Cadre Référentiel : {sequence.enTete.cadreReferentiel} · Durée : {sequence.enTete.duree || '[Exemple : 4 périodes]'}
          </span>
        </div>
        <div>
          <h4 className="text-xs font-bold uppercase tracking-wider text-[#002C50] mb-2">
            Objectifs prioritaires d'apprentissage :
          </h4>
          <ul className="space-y-2 text-sm text-slate-800">
            {sequence.enTete.objectifs.map((obj, i) => (
              <li key={obj.id} className="flex items-start gap-2">
                <span className="text-[#95EA31] font-bold text-base">•</span>
                <span className={!obj.text ? 'text-slate-400 italic' : ''}>
                  {obj.text || `[Exemple : Objectif d'apprentissage ${i + 1}]`}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    ),
    notesOrateur: (
      <div className="space-y-2 text-xs text-amber-950">
        <p><strong>Accueil et contractualisation :</strong> Expliciter les objectifs de la séance et le lien avec le cadre officiel ({sequence.enTete.cadreReferentiel}).</p>
        <p><strong>Vérification des prérequis :</strong> Sonder la classe sur les termes clés avant d'engager le travail.</p>
        <p><strong>Consigne :</strong> Inviter les élèves à ouvrir leur carnet de bord ou environnement numérique Moser.</p>
      </div>
    ),
  });

  // Slide 2 : Cadre Pédagogique & Transversalité
  slides.push({
    id: 'slide-2',
    diapoIndex: 2,
    titreDiapo: 'Cadre Pédagogique & Compétences Transversales',
    ecranTitre: 'Compétences & Démarche d\'Apprentissage',
    ecranSousTitre: 'Capacités Transversales (PER) & Concepts IB',
    tempsEstime: '10 min',
    ecranContenu: (
      <div className="space-y-4">
        <div>
          <h4 className="text-xs font-bold uppercase tracking-wider text-[#002C50] mb-2">
            Capacités transversales ciblées :
          </h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
            {sequence.cadrePedagogique.capacitesTransversales.map((c) => (
              <div key={c.id} className="p-2.5 rounded-lg border border-slate-200 bg-white">
                <span className="text-xs font-bold text-[#002C50] block">{c.nom}</span>
                <p className="text-[11px] text-slate-600 mt-0.5">{c.description}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="p-3 rounded-lg bg-[#F0F6FA] border border-[#002C50]/15 text-xs text-slate-700">
          <strong>Formation Générale :</strong> {sequence.cadrePedagogique.formationGenerale}
        </div>
      </div>
    ),
    notesOrateur: (
      <div className="space-y-2 text-xs text-amber-950">
        <p><strong>Sensibilisation méthodologique :</strong> Expliquer aux élèves la plus-value de la collaboration et de la démarche réflexive.</p>
        <p><strong>Profil de l'apprenant IB :</strong> Valoriser les attitudes de chercheur, de penseur critique et d'ouverture d'esprit.</p>
      </div>
    ),
  });

  // Slides 3...N : Phases de planification
  sequence.planification.phases.forEach((phase, idx) => {
    slides.push({
      id: `slide-phase-${phase.id}`,
      diapoIndex: idx + 3,
      titreDiapo: phase.phaseDuree || `Phase ${idx + 1}`,
      ecranTitre: phase.phaseDuree || `[Phase ${idx + 1} : Déroulement]`,
      ecranSousTitre: `Étape ${idx + 1} du déroulement pédagogique`,
      tempsEstime: 'Temps dédié',
      ecranContenu: (
        <div className="space-y-4">
          <div className="p-4 rounded-xl bg-[#002C50]/5 border border-[#002C50]/20">
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#002C50] mb-1.5">
              Activités & Consignes Élèves :
            </h4>
            <p className={`text-sm font-medium leading-relaxed ${!phase.objectifsActivites ? 'text-slate-400 italic' : 'text-slate-800'}`}>
              {phase.objectifsActivites || '[Exemple : Démarche d\'investigation, manipulation des sources en binôme...]'}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
            <div className="p-3 rounded-lg border border-slate-200 bg-white">
              <span className="font-bold text-[#002C50] block mb-1">Outils Mobilisés [SAMR]</span>
              <p className={!phase.outilsSAMR ? 'text-slate-400 italic' : 'text-slate-600'}>
                {phase.outilsSAMR || '[Exemple : Augmentation / Modification : Outil numérique...]'}
              </p>
            </div>

            <div className="p-3 rounded-lg border border-[#95EA31]/40 bg-[#EBF8DC]/30">
              <span className="font-bold text-[#002C50] block mb-1">Accessibilité Universelle [CUA]</span>
              <p className={!phase.cuaDifferenciation ? 'text-slate-400 italic' : 'text-slate-700'}>
                {phase.cuaDifferenciation || '[Exemple : Consignes audio/visuelles doublées...]'}
              </p>
            </div>
          </div>
        </div>
      ),
      notesOrateur: (
        <div className="space-y-2 text-xs text-amber-950">
          <p><strong>Rôle de l'enseignant :</strong> {phase.roleProf || '[Exemple : Posture d\'étayage, relances méthodologiques, régulation...]'}</p>
          <p><strong>Gestion du temps :</strong> Garder un chronomètre projeté ou audible pour maintenir la dynamique.</p>
          <p><strong>Différenciation en action :</strong> Fournir les aides méthodologiques aux élèves allophones ou DYS.</p>
        </div>
      ),
    });
  });

  // Slide Évaluation
  const evalIndex = sequence.planification.phases.length + 3;
  slides.push({
    id: 'slide-eval',
    diapoIndex: evalIndex,
    titreDiapo: 'Évaluation & Grille Critériée (CER)',
    ecranTitre: 'Critères de Réussite & Tâche Sommative',
    ecranSousTitre: 'Alignement sur le Cadre d\'Évaluation Romand (CER)',
    tempsEstime: '15 min',
    ecranContenu: (
      <div className="space-y-4">
        <div className="p-3 rounded-xl bg-white border border-[#95EA31]/50 shadow-xs">
          <span className="text-xs font-bold text-[#002C50] uppercase tracking-wider block mb-1">
            Tâche Sommative Attendue :
          </span>
          <p className="text-xs font-semibold text-slate-800">
            {sequence.evaluation.tacheSommative}
          </p>
        </div>

        <div>
          <h4 className="text-xs font-bold uppercase tracking-wider text-[#002C50] mb-2">
            Niveaux de maîtrise des critères :
          </h4>
          <div className="space-y-2">
            {sequence.evaluation.grilleCriteriee.map((g) => (
              <div key={g.id} className="p-2.5 rounded-lg border border-slate-200 bg-white text-xs">
                <span className="font-bold text-[#002C50]">{g.critere} :</span>{' '}
                <span className="text-slate-700">Atteint : {g.atteint} · Dépassé : {g.depasse}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    ),
    notesOrateur: (
      <div className="space-y-2 text-xs text-amber-950">
        <p><strong>Transparence de l'évaluation :</strong> Partager et expliciter la grille dès le lancement de la production.</p>
        <p><strong>Évaluation formative :</strong> {sequence.evaluation.dispositifsFormatifs}</p>
      </div>
    ),
  });

  // Slide Ressources & QR Codes
  const resIndex = evalIndex + 1;
  slides.push({
    id: 'slide-ressources',
    diapoIndex: resIndex,
    titreDiapo: 'Ressources Documentaires & QR Codes',
    ecranTitre: 'Sources en Ligne & Liens d\'Accès Rapide',
    ecranSousTitre: 'Scannez directement avec votre tablette ou smartphone',
    tempsEstime: 'Permanent',
    ecranContenu: (
      <div className="space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
          {sequence.ressources.map((r) => (
            <div key={r.id} className="p-3 rounded-xl border border-slate-200 bg-white flex flex-col items-center text-center">
              {r.qrCodeDataUrl ? (
                <div className="p-1.5 bg-white border border-[#002C50]/20 rounded-lg shadow-xs mb-2">
                  <img src={r.qrCodeDataUrl} alt={`QR Code ${r.titre}`} className="w-24 h-24 object-contain" />
                </div>
              ) : null}
              <span className="text-xs font-bold text-[#002C50] line-clamp-1">{r.titre}</span>
              <a
                href={r.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[10px] text-blue-700 hover:underline truncate max-w-full mt-1"
              >
                {r.url.replace(/^https?:\/\//, '')}
              </a>
            </div>
          ))}
        </div>
      </div>
    ),
    notesOrateur: (
      <div className="space-y-2 text-xs text-amber-950">
        <p><strong>Projection du QR code :</strong> Permettre à tous les élèves de scanner la ressource sur leur iPad/ordinateur.</p>
        <p><strong>Déontologie :</strong> Rappeler la nécessité de citer les sources et d'éviter le plagiat.</p>
      </div>
    ),
  });

  const currentSlide = slides[currentSlideIndex] || slides[0];

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight' || e.key === 'PageDown') {
        setCurrentSlideIndex((prev) => Math.min(prev + 1, slides.length - 1));
      } else if (e.key === 'ArrowLeft' || e.key === 'PageUp') {
        setCurrentSlideIndex((prev) => Math.max(prev - 1, 0));
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [slides.length]);

  return (
    <div className="space-y-6">
      {/* Diaporama Control Toolbar */}
      <div className="bg-white rounded-xl border border-slate-200 p-4 flex flex-wrap items-center justify-between gap-4 no-print shadow-xs">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-[#002C50] text-[#95EA31] rounded-lg">
            <Tv className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-sm font-bold text-[#002C50]">
              Format Présentation / Diaporama Découpé [DIAPOSITIVE X]
            </h2>
            <p className="text-xs text-slate-500">
              Séparation stricte entre le texte affiché (À l'écran) et les explications didactiques (Notes de l'orateur).
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {/* View Mode Toggle */}
          <div className="flex items-center p-1 bg-slate-100 rounded-lg text-xs font-medium">
            <button
              type="button"
              onClick={() => setViewMode('interactive')}
              className={`px-3 py-1 rounded transition-colors cursor-pointer ${
                viewMode === 'interactive' ? 'bg-white text-[#002C50] font-bold shadow-xs' : 'text-slate-600'
              }`}
            >
              Diapo par Diapo
            </button>
            <button
              type="button"
              onClick={() => setViewMode('grid')}
              className={`px-3 py-1 rounded transition-colors cursor-pointer ${
                viewMode === 'grid' ? 'bg-white text-[#002C50] font-bold shadow-xs' : 'text-slate-600'
              }`}
            >
              Vue Panoramique ({slides.length})
            </button>
          </div>
        </div>
      </div>

      {viewMode === 'interactive' ? (
        /* Single Slide View with Screen & Speaker Notes */
        <div className="space-y-4">
          {/* The Slide Container */}
          <div className="bg-white rounded-2xl border-2 border-[#002C50] shadow-md overflow-hidden">
            {/* Slide Header Banner */}
            <div className="bg-[#002C50] text-white px-6 py-3 flex items-center justify-between border-b border-[#002C50]">
              <div className="flex items-center gap-2 font-mono text-xs font-bold text-[#95EA31]">
                <span>[DIAPOSITIVE {currentSlide.diapoIndex} / {slides.length}]</span>
                <span className="text-white/40">·</span>
                <span className="text-white font-sans">{currentSlide.titreDiapo}</span>
              </div>
              <div className="flex items-center gap-2 text-xs text-slate-300">
                <Clock className="w-3.5 h-3.5 text-[#95EA31]" />
                <span>{currentSlide.tempsEstime || '15 min'}</span>
              </div>
            </div>

            {/* Split: Screen Content (Left/Top) vs Speaker Notes (Right/Bottom) */}
            <div className="grid grid-cols-1 lg:grid-cols-12 min-h-[460px]">
              {/* ZONE 1 : À L'ÉCRAN (Ce que les élèves voient projeté) */}
              <div className="lg:col-span-8 p-8 bg-gradient-to-br from-white to-[#F8FAFC] flex flex-col justify-between border-b lg:border-b-0 lg:border-r border-slate-200">
                <div>
                  <div className="flex items-center gap-2 text-xs font-bold text-[#002C50] uppercase tracking-wider mb-2">
                    <span className="px-2 py-0.5 rounded bg-[#95EA31]/25 text-[#002C50]">
                      À L'ÉCRAN
                    </span>
                    <span className="text-slate-400">·</span>
                    <span>Projection de cours</span>
                  </div>

                  <h3 className="text-2xl font-extrabold text-[#002C50] tracking-tight">
                    {currentSlide.ecranTitre}
                  </h3>
                  {currentSlide.ecranSousTitre && (
                    <p className="text-xs text-slate-500 font-medium mt-1">
                      {currentSlide.ecranSousTitre}
                    </p>
                  )}

                  <div className="mt-6">
                    {currentSlide.ecranContenu}
                  </div>
                </div>

                <div className="mt-8 pt-4 border-t border-slate-200/70 flex items-center justify-between text-[11px] text-slate-400">
                  <div className="flex items-center gap-2">
                    <img src="/assets/aistudio/logo_Moser_ac2383db.jpg" alt="Moser" className="h-4 w-auto grayscale opacity-70" />
                    <span>École Moser · Didactique</span>
                  </div>
                  <span>Diapositive {currentSlide.diapoIndex}</span>
                </div>
              </div>

              {/* ZONE 2 : NOTES DE L'ORATEUR (Indications didactiques et posture prof) */}
              <div className="lg:col-span-4 p-6 bg-[#FFFDF7] flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-2 text-xs font-bold text-amber-900 uppercase tracking-wider mb-3">
                    <MessageSquare className="w-4 h-4 text-amber-600" />
                    <span>NOTES DE L'ORATEUR</span>
                  </div>

                  <div className="p-4 rounded-xl bg-amber-50/80 border border-amber-200/80 shadow-inner">
                    {currentSlide.notesOrateur}
                  </div>
                </div>

                <div className="mt-6 text-[11px] text-amber-800/80 bg-amber-100/50 p-2.5 rounded-lg border border-amber-200/50">
                  💡 <em>Conseil : Ajustez le rythme selon le niveau d'engagement de la classe.</em>
                </div>
              </div>
            </div>
          </div>

          {/* Slide Navigation Bar */}
          <div className="flex items-center justify-between px-2">
            <button
              type="button"
              disabled={currentSlideIndex === 0}
              onClick={() => setCurrentSlideIndex((prev) => Math.max(prev - 1, 0))}
              className="flex items-center gap-1.5 px-4 py-2 text-xs font-semibold rounded-lg border border-slate-300 bg-white text-slate-700 hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed transition-colors cursor-pointer"
            >
              <ChevronLeft className="w-4 h-4" />
              <span>Diapositive précédente</span>
            </button>

            {/* Quick Slide Pills */}
            <div className="flex items-center gap-1.5 overflow-x-auto max-w-md py-1">
              {slides.map((s, idx) => (
                <button
                  key={s.id}
                  type="button"
                  onClick={() => setCurrentSlideIndex(idx)}
                  className={`w-7 h-7 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                    idx === currentSlideIndex
                      ? 'bg-[#002C50] text-[#95EA31] shadow-xs scale-105'
                      : 'bg-white border border-slate-200 text-slate-600 hover:border-[#002C50]'
                  }`}
                >
                  {idx + 1}
                </button>
              ))}
            </div>

            <button
              type="button"
              disabled={currentSlideIndex === slides.length - 1}
              onClick={() => setCurrentSlideIndex((prev) => Math.min(prev + 1, slides.length - 1))}
              className="flex items-center gap-1.5 px-4 py-2 text-xs font-semibold rounded-lg bg-[#002C50] hover:bg-[#001e38] text-white disabled:opacity-40 disabled:cursor-not-allowed transition-colors cursor-pointer"
            >
              <span>Diapositive suivante</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      ) : (
        /* Panoramic Grid View of All Slides */
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {slides.map((slide) => (
              <div
                key={slide.id}
                className="bg-white rounded-xl border border-slate-200 shadow-xs overflow-hidden flex flex-col justify-between"
              >
                <div>
                  <div className="bg-[#002C50] text-white px-4 py-2.5 flex items-center justify-between text-xs font-bold">
                    <span className="text-[#95EA31] font-mono">[DIAPOSITIVE {slide.diapoIndex}]</span>
                    <span>{slide.titreDiapo}</span>
                  </div>

                  <div className="p-4 border-b border-slate-100">
                    <span className="text-[10px] font-bold text-[#002C50] uppercase tracking-wider block mb-1">
                      À L'ÉCRAN
                    </span>
                    <h4 className="text-base font-bold text-slate-900 mb-2">{slide.ecranTitre}</h4>
                    <div className="text-xs text-slate-700">{slide.ecranContenu}</div>
                  </div>
                </div>

                <div className="p-4 bg-amber-50/50">
                  <span className="text-[10px] font-bold text-amber-900 uppercase tracking-wider block mb-1">
                    NOTES DE L'ORATEUR
                  </span>
                  <div className="text-xs text-amber-950">{slide.notesOrateur}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
