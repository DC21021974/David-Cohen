import React from 'react';
import { ViewFormat } from '../types/sequence';
import {
  Sparkles,
  FileText,
  Printer,
  FileDown,
  Presentation,
  Table,
  Copy,
  Check,
  GraduationCap,
  Compass,
  CalendarRange,
  Scale,
  Users,
  Rocket,
  QrCode,
} from 'lucide-react';

interface HeaderProps {
  currentFormat: ViewFormat;
  onFormatChange: (format: ViewFormat) => void;
  onOpenAiModal: () => void;
  onCopyWordHtml: () => void;
  onCopyMarkdown: () => void;
  onDownloadMarkdown: () => void;
  onDownloadWordHtml: () => void;
  onPrint: () => void;
  isCopiedWord: boolean;
  isCopiedMd: boolean;
}

export const Header: React.FC<HeaderProps> = ({
  currentFormat,
  onFormatChange,
  onOpenAiModal,
  onCopyWordHtml,
  onCopyMarkdown,
  onDownloadMarkdown,
  onDownloadWordHtml,
  onPrint,
  isCopiedWord,
  isCopiedMd,
}) => {
  const scrollToPart = (id: string) => {
    if (currentFormat !== 'standard') {
      onFormatChange('standard');
      setTimeout(() => {
        const el = document.getElementById(id);
        if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 100);
    } else {
      const el = document.getElementById(id);
      if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b-2 border-[#002C50]/20 no-print transition-all shadow-xs">
      {/* Top Bar: Brand Logo — Format Selector — Primary Actions */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-4">
        {/* Zone 1: Logo & Titre Institutionnel */}
        <div className="flex items-center gap-4 shrink-0">
          <img
            src="/assets/aistudio/logo_Moser_ac2383db.jpg"
            alt="École Moser"
            className="h-11 sm:h-12 w-auto object-contain"
          />
          <div className="hidden lg:block h-8 w-px bg-slate-200" />
          <div className="hidden lg:flex flex-col">
            <span className="text-xs font-black uppercase tracking-wider text-[#002C50]">
              Ingénierie Pédagogique
            </span>
            <span className="text-[11px] text-slate-500 font-medium">
              Genève · Nyon · Berlin — PER / CER / IB
            </span>
          </div>
        </div>

        {/* Zone 2: View Format Selector with Larger, Highly Visible Tabs */}
        <div className="flex items-center p-1.5 bg-slate-100/90 rounded-2xl border border-slate-200">
          <button
            type="button"
            onClick={() => onFormatChange('standard')}
            className={`flex items-center gap-2 px-3.5 py-2 text-xs sm:text-sm font-bold rounded-xl transition-all whitespace-nowrap shrink-0 cursor-pointer ${
              currentFormat === 'standard'
                ? 'bg-[#002C50] text-[#95EA31] shadow-sm'
                : 'text-slate-700 hover:text-[#002C50] hover:bg-white/60'
            }`}
          >
            <FileText className="w-4 h-4" />
            <span>Format Standard</span>
          </button>

          <button
            type="button"
            onClick={() => onFormatChange('diaporama')}
            className={`flex items-center gap-2 px-3.5 py-2 text-xs sm:text-sm font-bold rounded-xl transition-all whitespace-nowrap shrink-0 cursor-pointer ${
              currentFormat === 'diaporama'
                ? 'bg-[#002C50] text-[#95EA31] shadow-sm'
                : 'text-slate-700 hover:text-[#002C50] hover:bg-white/60'
            }`}
          >
            <Presentation className="w-4 h-4" />
            <span>Format Diaporama</span>
          </button>

          <button
            type="button"
            onClick={() => onFormatChange('tableau_word')}
            className={`flex items-center gap-2 px-3.5 py-2 text-xs sm:text-sm font-bold rounded-xl transition-all whitespace-nowrap shrink-0 cursor-pointer ${
              currentFormat === 'tableau_word'
                ? 'bg-[#002C50] text-[#95EA31] shadow-sm'
                : 'text-slate-700 hover:text-[#002C50] hover:bg-white/60'
            }`}
          >
            <Table className="w-4 h-4" />
            <span>Tableau Word</span>
          </button>
        </div>

        {/* Zone 3: Direct Export Actions & AI Generator (Bigger, High Visibility) */}
        <div className="flex items-center gap-2.5 shrink-0">
          {/* DEDICATED PDF EXPORT BUTTON */}
          <button
            type="button"
            onClick={onPrint}
            title="Exporter la séquence complète au format PDF A4 officiel École Moser"
            className="flex items-center gap-2 px-4 py-2.5 text-xs sm:text-sm font-extrabold text-white bg-rose-700 hover:bg-rose-800 rounded-xl transition-all cursor-pointer shadow-xs active:scale-95"
          >
            <FileDown className="w-4 h-4 text-white" />
            <span>Exporter en PDF</span>
          </button>

          {/* Quick Copy Word with HTML/CSS */}
          <button
            type="button"
            onClick={onCopyWordHtml}
            title="Copier avec mise en forme pour coller directement dans Word ou Google Docs"
            className="flex items-center gap-2 px-4 py-2.5 text-xs sm:text-sm font-extrabold text-[#002C50] bg-[#95EA31] hover:bg-[#85da25] rounded-xl transition-all cursor-pointer shadow-xs active:scale-95"
          >
            {isCopiedWord ? (
              <>
                <Check className="w-4 h-4 text-[#002C50]" />
                <span>Copié pour Word !</span>
              </>
            ) : (
              <>
                <Copy className="w-4 h-4 text-[#002C50]" />
                <span className="hidden md:inline">Copier pour Word</span>
                <span className="md:hidden">Word</span>
              </>
            )}
          </button>

          {/* AI Generator CTA */}
          <button
            type="button"
            onClick={onOpenAiModal}
            className="flex items-center gap-2 px-3.5 py-2.5 text-xs sm:text-sm font-bold text-white bg-[#002C50] hover:bg-[#001e38] rounded-xl transition-all cursor-pointer shadow-xs active:scale-95"
          >
            <Sparkles className="w-4 h-4 text-[#95EA31]" />
            <span className="hidden sm:inline">Modèle / IA</span>
          </button>
        </div>
      </div>

      {/* Secondary Ergonomic Navigation & Export Bar with Pictograms for each part */}
      <div className="bg-[#F0F6FA] border-t border-slate-200/80 px-4 sm:px-6 lg:px-8 py-2.5 flex items-center justify-between text-xs text-slate-700 overflow-x-auto gap-4">
        {/* 7 Parts Navigation Jump Bar with Pictograms */}
        <div className="flex items-center gap-1 sm:gap-2 shrink-0">
          <span className="font-bold text-[#002C50] mr-1 hidden lg:inline">Accès direct :</span>

          <button
            type="button"
            onClick={() => scrollToPart('section-partie-1')}
            className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-white hover:bg-[#002C50] hover:text-[#95EA31] text-slate-700 font-bold border border-slate-200 shadow-2xs transition-colors cursor-pointer"
          >
            <GraduationCap className="w-3.5 h-3.5 text-[#002C50] group-hover:text-[#95EA31]" />
            <span>1. En-tête</span>
          </button>

          <button
            type="button"
            onClick={() => scrollToPart('section-partie-2')}
            className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-white hover:bg-[#002C50] hover:text-[#95EA31] text-slate-700 font-bold border border-slate-200 shadow-2xs transition-colors cursor-pointer"
          >
            <Compass className="w-3.5 h-3.5 text-[#002C50]" />
            <span>2. Cadre</span>
          </button>

          <button
            type="button"
            onClick={() => scrollToPart('section-partie-3')}
            className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-white hover:bg-[#002C50] hover:text-[#95EA31] text-slate-700 font-bold border border-slate-200 shadow-2xs transition-colors cursor-pointer"
          >
            <CalendarRange className="w-3.5 h-3.5 text-[#002C50]" />
            <span>3. Planification</span>
          </button>

          <button
            type="button"
            onClick={() => scrollToPart('section-partie-4')}
            className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-white hover:bg-[#002C50] hover:text-[#95EA31] text-slate-700 font-bold border border-slate-200 shadow-2xs transition-colors cursor-pointer"
          >
            <Scale className="w-3.5 h-3.5 text-[#002C50]" />
            <span>4. Évaluation</span>
          </button>

          <button
            type="button"
            onClick={() => scrollToPart('section-partie-5')}
            className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-white hover:bg-[#002C50] hover:text-[#95EA31] text-slate-700 font-bold border border-slate-200 shadow-2xs transition-colors cursor-pointer"
          >
            <Users className="w-3.5 h-3.5 text-[#002C50]" />
            <span>5. Différenciation</span>
          </button>

          <button
            type="button"
            onClick={() => scrollToPart('section-partie-6')}
            className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-white hover:bg-[#002C50] hover:text-[#95EA31] text-slate-700 font-bold border border-slate-200 shadow-2xs transition-colors cursor-pointer"
          >
            <Rocket className="w-3.5 h-3.5 text-[#002C50]" />
            <span>6. Enrichissement</span>
          </button>

          <button
            type="button"
            onClick={() => scrollToPart('section-partie-7')}
            className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-white hover:bg-[#002C50] hover:text-[#95EA31] text-slate-700 font-bold border border-slate-200 shadow-2xs transition-colors cursor-pointer"
          >
            <QrCode className="w-3.5 h-3.5 text-[#002C50]" />
            <span>7. Ressources & QR</span>
          </button>
        </div>

        {/* Other Exports (Markdown & .doc) */}
        <div className="flex items-center gap-2 shrink-0">
          <button
            type="button"
            onClick={onDownloadWordHtml}
            className="flex items-center gap-1.5 px-3 py-1 rounded-lg bg-white border border-slate-300 hover:border-[#002C50] text-[#002C50] font-bold transition-colors cursor-pointer shadow-2xs"
          >
            <FileDown className="w-3.5 h-3.5 text-[#002C50]" />
            <span>Fichier .doc</span>
          </button>

          <button
            type="button"
            onClick={onCopyMarkdown}
            className="flex items-center gap-1.5 px-3 py-1 rounded-lg bg-white border border-slate-300 hover:border-[#002C50] text-slate-700 font-semibold transition-colors cursor-pointer shadow-2xs"
          >
            {isCopiedMd ? (
              <span className="text-emerald-700 font-bold">Markdown copié !</span>
            ) : (
              <span>Copier .md</span>
            )}
          </button>
        </div>
      </div>
    </header>
  );
};
