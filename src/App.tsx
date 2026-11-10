import React, { useState, useEffect, useCallback } from 'react';
import { PedagogicalSequence, ViewFormat, RessourceLien } from './types/sequence';
import { sampleSequenceMedia, initialEmptySequence } from './data/exemplarSequences';
import { generateQrCodeDataUrl } from './utils/qrCode';
import { exportToMarkdown } from './utils/markdownExporter';
import { generateWordExportHtml } from './utils/wordHtmlExporter';
import { Header } from './components/Header';
import { StandardSequenceView } from './components/StandardSequenceView';
import { DiaporamaView } from './components/DiaporamaView';
import { WordTableView } from './components/WordTableView';
import { AiGenerateModal } from './components/AiGenerateModal';
import { EditSequenceModal } from './components/EditSequenceModal';
import { Check, Sparkles, AlertCircle, FileText, Download, RotateCcw } from 'lucide-react';

export default function App() {
  // Tout est vide et décoché à l'ouverture, selon les consignes
  const [sequence, setSequence] = useState<PedagogicalSequence>(initialEmptySequence);
  const [currentFormat, setCurrentFormat] = useState<ViewFormat>('standard');
  const [isAiModalOpen, setIsAiModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isCopiedWord, setIsCopiedWord] = useState(false);
  const [isCopiedMd, setIsCopiedMd] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3500);
  };

  // Compute QR codes for all resources when sequence resources change
  useEffect(() => {
    let isCancelled = false;

    async function loadQrCodes() {
      const updatedRessources = await Promise.all(
        sequence.ressources.map(async (res) => {
          if (res.qrCodeDataUrl) return res;
          const qrDataUrl = await generateQrCodeDataUrl(res.url);
          return { ...res, qrCodeDataUrl: qrDataUrl };
        })
      );

      if (!isCancelled) {
        // Only update if there are newly generated QR codes
        const hasNewQrs = updatedRessources.some(
          (r, idx) => r.qrCodeDataUrl !== sequence.ressources[idx]?.qrCodeDataUrl
        );
        if (hasNewQrs) {
          setSequence((prev) => ({
            ...prev,
            ressources: updatedRessources,
          }));
        }
      }
    }

    loadQrCodes();

    return () => {
      isCancelled = true;
    };
  }, [sequence.ressources]);

  // Toggle Objective Checkbox
  const handleToggleObjective = (id: string) => {
    setSequence((prev) => ({
      ...prev,
      enTete: {
        ...prev.enTete,
        objectifs: prev.enTete.objectifs.map((obj) =>
          obj.id === id ? { ...obj, checked: !obj.checked } : obj
        ),
      },
    }));
  };

  // Toggle Capacite Checkbox
  const handleToggleCapacite = (id: string) => {
    setSequence((prev) => ({
      ...prev,
      cadrePedagogique: {
        ...prev.cadrePedagogique,
        capacitesTransversales: prev.cadrePedagogique.capacitesTransversales.map((cap) =>
          cap.id === id ? { ...cap, checked: !cap.checked } : cap
        ),
      },
    }));
  };

  // Toggle Phase Mode (Tableau vs Narratif)
  const handleTogglePhaseMode = (mode: 'tableau' | 'narratif') => {
    setSequence((prev) => ({
      ...prev,
      planification: {
        ...prev.planification,
        mode,
      },
    }));
  };

  // Add Resource with QR Code
  const handleAddResource = async (newRes: Omit<RessourceLien, 'id'>) => {
    const qrDataUrl = await generateQrCodeDataUrl(newRes.url);
    const resourceWithQr: RessourceLien = {
      ...newRes,
      id: `res-${Date.now()}`,
      qrCodeDataUrl: qrDataUrl,
    };

    setSequence((prev) => ({
      ...prev,
      ressources: [...prev.ressources, resourceWithQr],
    }));

    showToast(`Ressource "${newRes.titre}" ajoutée avec QR code !`);
  };

  // Remove Resource
  const handleRemoveResource = (id: string) => {
    setSequence((prev) => ({
      ...prev,
      ressources: prev.ressources.filter((r) => r.id !== id),
    }));
    showToast('Ressource supprimée.');
  };

  // Copy rich Word-compatible HTML to clipboard
  const handleCopyWordHtml = async () => {
    try {
      const html = generateWordExportHtml(sequence, currentFormat);
      const markdown = exportToMarkdown(sequence, currentFormat);

      if (navigator.clipboard && window.ClipboardItem) {
        const htmlBlob = new Blob([html], { type: 'text/html' });
        const textBlob = new Blob([markdown], { type: 'text/plain' });

        await navigator.clipboard.write([
          new ClipboardItem({
            'text/html': htmlBlob,
            'text/plain': textBlob,
          }),
        ]);
      } else {
        await navigator.clipboard.writeText(markdown);
      }

      setIsCopiedWord(true);
      showToast('Copié ! Vous pouvez maintenant coller directement dans Word ou Google Docs.');
      setTimeout(() => setIsCopiedWord(false), 3000);
    } catch (err) {
      console.error('Erreur lors de la copie presse-papier:', err);
      // Fallback
      const markdown = exportToMarkdown(sequence, currentFormat);
      await navigator.clipboard.writeText(markdown);
      setIsCopiedWord(true);
      showToast('Format Markdown copié dans le presse-papier.');
      setTimeout(() => setIsCopiedWord(false), 3000);
    }
  };

  // Copy pure Markdown
  const handleCopyMarkdown = async () => {
    try {
      const markdown = exportToMarkdown(sequence, currentFormat);
      await navigator.clipboard.writeText(markdown);
      setIsCopiedMd(true);
      showToast('Markdown copié dans le presse-papier !');
      setTimeout(() => setIsCopiedMd(false), 3000);
    } catch (err) {
      console.error('Erreur copie Markdown:', err);
    }
  };

  // Download .doc file (Word format)
  const handleDownloadWordHtml = () => {
    const html = generateWordExportHtml(sequence, currentFormat);
    const blob = new Blob([html], { type: 'application/msword;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    const sanitizedTitle = sequence.enTete.titre.toLowerCase().replace(/[^a-z0-9]/g, '-') || 'sequence-pedagogique';
    a.download = `sequence-moser-${sanitizedTitle}.doc`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    showToast('Fichier .doc téléchargé.');
  };

  // Download .md file
  const handleDownloadMarkdown = () => {
    const markdown = exportToMarkdown(sequence, currentFormat);
    const blob = new Blob([markdown], { type: 'text/markdown;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    const sanitizedTitle = sequence.enTete.titre.toLowerCase().replace(/[^a-z0-9]/g, '-') || 'sequence-pedagogique';
    a.download = `sequence-moser-${sanitizedTitle}.md`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    showToast('Fichier .md téléchargé.');
  };

  // Print A4 / Export PDF
  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#F8FAFC] text-slate-800">
      {/* Header with 3 zones, format switcher and quick exports */}
      <Header
        currentFormat={currentFormat}
        onFormatChange={setCurrentFormat}
        onOpenAiModal={() => setIsAiModalOpen(true)}
        onCopyWordHtml={handleCopyWordHtml}
        onCopyMarkdown={handleCopyMarkdown}
        onDownloadMarkdown={handleDownloadMarkdown}
        onDownloadWordHtml={handleDownloadWordHtml}
        onPrint={handlePrint}
        isCopiedWord={isCopiedWord}
        isCopiedMd={isCopiedMd}
      />

      {/* Main Workspace Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Subtle Breadcrumb / Sequence Status Banner */}
        <div className="mb-6 flex flex-wrap items-center justify-between gap-3 text-xs text-slate-600 no-print">
          <div className="flex items-center gap-2">
            <span className="font-bold text-[#002C50]">École Moser</span>
            <span>/</span>
            <span className="font-semibold text-slate-700">
              {sequence.enTete.discipline || '[Discipline à définir]'}
            </span>
            <span>/</span>
            <span className="text-slate-500">
              {sequence.enTete.niveau || '[Niveau scolaire]'}
            </span>
            <span className="ml-2 px-2 py-0.5 rounded bg-[#95EA31]/25 text-[#002C50] font-bold border border-[#95EA31]/50">
              Saisie directe & interactive
            </span>
          </div>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => {
                setSequence(initialEmptySequence);
                showToast('Champs vidés et cases décochées.');
              }}
              className="text-slate-500 hover:text-[#002C50] flex items-center gap-1 cursor-pointer"
              title="Vider tous les champs et décocher toutes les cases"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Tout effacer / Vider</span>
            </button>
            <span>·</span>
            <button
              type="button"
              onClick={() => {
                setSequence(sampleSequenceMedia);
                showToast('Exemple complet de séquence (Médias 10e) chargé.');
              }}
              className="text-[#002C50] font-semibold hover:underline cursor-pointer"
            >
              Charger un exemple complet
            </button>
          </div>
        </div>

        {/* Dynamic Views according to currentFormat */}
        {currentFormat === 'standard' && (
          <StandardSequenceView
            sequence={sequence}
            onUpdateSequence={setSequence}
            onToggleObjective={handleToggleObjective}
            onToggleCapacite={handleToggleCapacite}
            onTogglePhaseMode={handleTogglePhaseMode}
            onAddResource={handleAddResource}
            onRemoveResource={handleRemoveResource}
          />
        )}

        {currentFormat === 'diaporama' && (
          <DiaporamaView sequence={sequence} />
        )}

        {currentFormat === 'tableau_word' && (
          <WordTableView
            sequence={sequence}
            onCopyWordHtml={handleCopyWordHtml}
            isCopiedWord={isCopiedWord}
            onAddResource={handleAddResource}
            onPrint={handlePrint}
          />
        )}
      </main>

      {/* Discreet institutional footer */}
      <footer className="bg-white border-t border-slate-200 py-6 px-4 no-print mt-auto">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <div className="flex items-center gap-3">
            <img
              src="/assets/aistudio/logo_Moser_ac2383db.jpg"
              alt="École Moser"
              className="h-6 w-auto grayscale opacity-80"
            />
            <span>Ingénierie Pédagogique — Genève · Nyon · Berlin</span>
          </div>

          <div className="flex items-center gap-4 text-[11px]">
            <span>Référentiel Plan d'Études Romand (PER)</span>
            <span>·</span>
            <span>Cadre d'Évaluation Romand (CER)</span>
            <span>·</span>
            <span>Baccalauréat International (IB)</span>
          </div>
        </div>
      </footer>

      {/* AI Generate / Template Modal */}
      <AiGenerateModal
        isOpen={isAiModalOpen}
        onClose={() => setIsAiModalOpen(false)}
        onSequenceGenerated={(newSeq) => {
          setSequence(newSeq);
          showToast(`Séquence "${newSeq.enTete.titre}" chargée avec succès !`);
        }}
      />

      {/* Edit Sequence Modal */}
      <EditSequenceModal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        sequence={sequence}
        onSave={(updated) => {
          setSequence(updated);
          showToast('Modifications enregistrées.');
        }}
      />

      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#002C50] text-white px-4 py-3 rounded-xl shadow-xl flex items-center gap-3 text-xs font-semibold animate-in fade-in slide-in-from-bottom-2 duration-200 border border-[#95EA31]/40">
          <div className="w-2 h-2 rounded-full bg-[#95EA31]" />
          <span>{toastMessage}</span>
        </div>
      )}
    </div>
  );
}
