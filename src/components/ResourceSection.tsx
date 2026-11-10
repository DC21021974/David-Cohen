import React, { useState } from 'react';
import { RessourceLien } from '../types/sequence';
import { ExternalLink, Plus, Trash2, QrCode, Download, Copy, Check, Link2, Sparkles } from 'lucide-react';

interface ResourceSectionProps {
  ressources: RessourceLien[];
  onAddResource: (newRes: Omit<RessourceLien, 'id'>) => void;
  onRemoveResource: (id: string) => void;
  onUpdateResource?: (id: string, field: keyof RessourceLien, value: string) => void;
  readOnly?: boolean;
}

export const ResourceSection: React.FC<ResourceSectionProps> = ({
  ressources,
  onAddResource,
  onRemoveResource,
  onUpdateResource,
  readOnly = false,
}) => {
  const [pastedUrl, setPastedUrl] = useState('');
  const [pastedTitle, setPastedTitle] = useState('');
  const [pastedDesc, setPastedDesc] = useState('');
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [activeQrModal, setActiveQrModal] = useState<RessourceLien | null>(null);
  const [quickAddSuccess, setQuickAddSuccess] = useState(false);

  const handleQuickAdd = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!pastedUrl.trim()) return;

    let url = pastedUrl.trim();
    if (!url.startsWith('http://') && !url.startsWith('https://')) {
      url = 'https://' + url;
    }

    let title = pastedTitle.trim();
    if (!title) {
      try {
        const parsed = new URL(url);
        title = parsed.hostname.replace('www.', '') + (parsed.pathname.length > 1 ? parsed.pathname.slice(0, 24) : '');
      } catch {
        title = 'Ressource en ligne';
      }
    }

    onAddResource({
      titre: title,
      url: url,
      description: pastedDesc.trim() || 'Ressource pédagogique accessible via le QR code ou le lien ci-dessous.',
      type: 'Source Web',
    });

    setPastedUrl('');
    setPastedTitle('');
    setPastedDesc('');
    setQuickAddSuccess(true);
    setTimeout(() => setQuickAddSuccess(false), 2500);
  };

  const copyUrl = (id: string, linkUrl: string) => {
    navigator.clipboard.writeText(linkUrl);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const downloadQrCode = (res: RessourceLien) => {
    if (!res.qrCodeDataUrl) return;
    const a = document.createElement('a');
    a.href = res.qrCodeDataUrl;
    a.download = `qrcode-${res.titre.toLowerCase().replace(/[^a-z0-9]/g, '-')}.png`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  return (
    <div id="section-partie-7" className="bg-white rounded-2xl border-2 border-[#002C50] shadow-sm overflow-hidden print-avoid-break scroll-mt-24">
      {/* Section Header */}
      <div className="bg-[#002C50] text-white px-6 py-5 flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="p-2.5 bg-white/10 rounded-xl text-[#95EA31]">
            <QrCode className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-black uppercase tracking-wider text-[#95EA31]">Partie 7</span>
              <span className="text-white/40">·</span>
              <h2 className="text-lg sm:text-xl font-bold text-white tracking-tight">
                Ressources Pédagogiques Numériques (Liens & QR Codes)
              </h2>
            </div>
            <p className="text-xs text-slate-300 mt-1">
              Collez vos liens vers les sources en ligne. Le lien cliquable et le QR code sont instantanément générés pour vos élèves.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          {!readOnly && (
            <button
              type="button"
              onClick={() => {
                const el = document.getElementById('paste-resource-url');
                if (el) {
                  el.focus();
                  el.scrollIntoView({ behavior: 'smooth', block: 'center' });
                }
              }}
              className="flex items-center gap-2 px-4 py-2.5 text-xs sm:text-sm font-extrabold bg-[#95EA31] text-[#002C50] hover:bg-[#85da25] active:bg-[#78c91f] rounded-xl transition-all cursor-pointer shadow-sm active:scale-95 no-print"
            >
              <Plus className="w-4.5 h-4.5" />
              <span>+ Rajouter une source</span>
            </button>
          )}
          <span className="text-xs font-bold px-3 py-1.5 rounded-lg bg-white/20 text-white">
            {ressources.length} {ressources.length > 1 ? 'sources' : 'source'}
          </span>
        </div>
      </div>

      <div className="p-6 space-y-6">
        {/* FREE PASTE AREA RIGHT AT TOP (AS REQUESTED) */}
        {!readOnly && (
          <div className="p-5 rounded-xl bg-gradient-to-br from-[#F0F6FA] to-white border-2 border-dashed border-[#002C50]/30 hover:border-[#002C50] transition-colors no-print">
            <div className="flex items-center gap-2 mb-2 text-xs font-bold text-[#002C50] uppercase tracking-wider">
              <Link2 className="w-4 h-4 text-[#002C50]" />
              <span>Espace libre : Collez ici votre lien vers une source en ligne</span>
            </div>

            <form onSubmit={handleQuickAdd} className="space-y-3">
              <div className="flex flex-col sm:flex-row items-stretch gap-2">
                <div className="relative flex-1">
                  <input
                    id="paste-resource-url"
                    type="text"
                    required
                    value={pastedUrl}
                    onChange={(e) => setPastedUrl(e.target.value)}
                    placeholder="https://www.rts.ch/decouverte ou https://www.ecolemoser.ch..."
                    className="w-full text-xs font-mono px-3.5 py-2.5 bg-white border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#002C50] focus:border-[#002C50] placeholder:text-slate-400 placeholder:italic"
                  />
                </div>

                <button
                  type="submit"
                  disabled={!pastedUrl.trim()}
                  className="px-5 py-2.5 bg-[#002C50] hover:bg-[#001e38] text-white text-xs font-bold rounded-xl transition-all disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer flex items-center justify-center gap-2 shrink-0 shadow-xs"
                >
                  {quickAddSuccess ? (
                    <>
                      <Check className="w-4 h-4 text-[#95EA31]" />
                      <span className="text-[#95EA31]">Généré avec succès !</span>
                    </>
                  ) : (
                    <>
                      <QrCode className="w-4 h-4 text-[#95EA31]" />
                      <span>Générer le QR Code & Ajouter</span>
                    </>
                  )}
                </button>
              </div>

              {/* Optional Title & Instructions */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1">
                <input
                  type="text"
                  value={pastedTitle}
                  onChange={(e) => setPastedTitle(e.target.value)}
                  placeholder="Titre facultatif (ex : Dossier documentaire RTS)"
                  className="text-xs px-3 py-1.5 bg-white border border-slate-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#002C50] placeholder:text-slate-400 placeholder:italic"
                />
                <input
                  type="text"
                  value={pastedDesc}
                  onChange={(e) => setPastedDesc(e.target.value)}
                  placeholder="Consigne élève facultative (ex : Visionner la vidéo et noter 3 arguments)"
                  className="text-xs px-3 py-1.5 bg-white border border-slate-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#002C50] placeholder:text-slate-400 placeholder:italic"
                />
              </div>
            </form>
          </div>
        )}

        {/* Resources Grid */}
        {ressources.length === 0 ? (
          <div className="text-center py-12 px-4 border border-dashed border-slate-200 rounded-xl bg-slate-50/60">
            <QrCode className="w-12 h-12 text-[#002C50]/30 mx-auto mb-3" />
            <p className="text-sm font-bold text-[#002C50]">Aucune ressource en ligne enregistrée</p>
            <p className="text-xs text-slate-500 mt-1 max-w-md mx-auto">
              Collez un lien Web ci-dessus pour générer instantanément le QR code d'accès et le lien cliquable dans la fiche officielle École Moser.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {ressources.map((res, idx) => (
              <div
                key={res.id}
                className="flex flex-col justify-between p-4 rounded-xl border border-slate-200 bg-white hover:border-[#002C50] transition-all shadow-xs group"
              >
                <div>
                  <div className="flex items-start justify-between gap-2">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-[#002C50] bg-[#95EA31]/25 border border-[#95EA31]/50 px-2 py-0.5 rounded">
                      Ressource {idx + 1}
                    </span>
                    {!readOnly && (
                      <button
                        type="button"
                        onClick={() => onRemoveResource(res.id)}
                        title="Supprimer la ressource"
                        className="text-slate-300 hover:text-rose-600 p-1 rounded transition-colors no-print"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    )}
                  </div>

                  {onUpdateResource && !readOnly ? (
                    <input
                      type="text"
                      value={res.titre}
                      onChange={(e) => onUpdateResource(res.id, 'titre', e.target.value)}
                      placeholder="Titre de la ressource"
                      className="text-sm font-bold text-[#002C50] mt-2 w-full px-1.5 py-0.5 border border-transparent hover:border-slate-200 focus:border-[#002C50] rounded"
                    />
                  ) : (
                    <h3 className="text-sm font-bold text-[#002C50] mt-2 line-clamp-2">
                      {res.titre}
                    </h3>
                  )}

                  {onUpdateResource && !readOnly ? (
                    <textarea
                      rows={2}
                      value={res.description}
                      onChange={(e) => onUpdateResource(res.id, 'description', e.target.value)}
                      placeholder="Description ou consigne pour l'élève..."
                      className="text-xs text-slate-600 mt-1 w-full px-1.5 py-0.5 border border-transparent hover:border-slate-200 focus:border-[#002C50] rounded resize-none"
                    />
                  ) : (
                    <p className="text-xs text-slate-600 mt-1 line-clamp-3 leading-relaxed">
                      {res.description}
                    </p>
                  )}
                </div>

                {/* QR Code and Actions */}
                <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between gap-3">
                  {/* QR Preview Thumbnail */}
                  <div
                    onClick={() => setActiveQrModal(res)}
                    className="shrink-0 cursor-pointer p-1.5 bg-white border border-[#002C50]/20 rounded-xl hover:border-[#002C50] transition-colors shadow-xs"
                    title="Agrandir et projeter le QR Code"
                  >
                    {res.qrCodeDataUrl ? (
                      <img
                        src={res.qrCodeDataUrl}
                        alt={`QR Code ${res.titre}`}
                        className="w-18 h-18 object-contain"
                      />
                    ) : (
                      <div className="w-18 h-18 bg-slate-100 flex items-center justify-center text-slate-400">
                        <QrCode className="w-6 h-6" />
                      </div>
                    )}
                  </div>

                  {/* Actions & Link */}
                  <div className="flex-1 min-w-0 flex flex-col justify-between h-18">
                    <a
                      href={res.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-xs font-semibold text-[#002C50] hover:underline truncate"
                      title={res.url}
                    >
                      <span className="truncate">{res.url.replace(/^https?:\/\//, '')}</span>
                      <ExternalLink className="w-3 h-3 shrink-0 text-[#002C50]" />
                    </a>

                    <div className="flex items-center gap-1.5 mt-auto no-print">
                      <button
                        type="button"
                        onClick={() => copyUrl(res.id, res.url)}
                        className="text-[11px] font-medium text-slate-600 hover:text-[#002C50] flex items-center gap-1 px-2 py-1 rounded bg-slate-100 hover:bg-slate-200 transition-colors"
                      >
                        {copiedId === res.id ? (
                          <>
                            <Check className="w-3 h-3 text-emerald-600" />
                            <span className="text-emerald-700">Copié</span>
                          </>
                        ) : (
                          <>
                            <Copy className="w-3 h-3" />
                            <span>Copier</span>
                          </>
                        )}
                      </button>

                      {res.qrCodeDataUrl && (
                        <button
                          type="button"
                          onClick={() => downloadQrCode(res)}
                          title="Télécharger l'image PNG du QR Code"
                          className="text-[11px] font-medium text-slate-600 hover:text-[#002C50] p-1.5 rounded bg-slate-100 hover:bg-slate-200 transition-colors"
                        >
                          <Download className="w-3 h-3" />
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}

            {/* + Button Card to Add Other Sources */}
            {!readOnly && (
              <button
                type="button"
                onClick={() => {
                  const el = document.getElementById('paste-resource-url');
                  if (el) {
                    el.focus();
                    el.scrollIntoView({ behavior: 'smooth', block: 'center' });
                  }
                }}
                className="flex flex-col items-center justify-center p-6 rounded-xl border-2 border-dashed border-[#002C50]/30 hover:border-[#002C50] bg-[#F0F6FA]/50 hover:bg-white transition-all cursor-pointer group min-h-[190px] no-print shadow-2xs"
              >
                <div className="w-12 h-12 rounded-full bg-[#002C50]/10 group-hover:bg-[#002C50] flex items-center justify-center mb-2.5 transition-colors">
                  <Plus className="w-6 h-6 text-[#002C50] group-hover:text-[#95EA31]" />
                </div>
                <span className="text-xs font-bold text-[#002C50] group-hover:underline">
                  + Rajouter une autre source
                </span>
                <span className="text-[11px] text-slate-500 mt-1">
                  Coller un lien et générer le QR code
                </span>
              </button>
            )}
          </div>
        )}
      </div>

      {/* QR Code Enlarge Modal for Projection */}
      {activeQrModal && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4 no-print"
          onClick={() => setActiveQrModal(null)}
        >
          <div
            className="bg-white rounded-2xl p-6 max-w-sm w-full border-2 border-[#002C50] shadow-2xl text-center space-y-4"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <span className="text-xs font-bold uppercase tracking-wider text-[#002C50]">
                Projection & Flash QR Code
              </span>
              <button
                type="button"
                onClick={() => setActiveQrModal(null)}
                className="text-slate-400 hover:text-slate-700 text-sm font-bold"
              >
                ✕
              </button>
            </div>

            <div>
              <h3 className="text-base font-bold text-[#002C50]">{activeQrModal.titre}</h3>
              <p className="text-xs text-slate-500 mt-0.5">{activeQrModal.description}</p>
            </div>

            {activeQrModal.qrCodeDataUrl && (
              <div className="p-4 bg-white rounded-xl border-2 border-[#002C50] inline-block shadow-inner">
                <img
                  src={activeQrModal.qrCodeDataUrl}
                  alt={`QR Code ${activeQrModal.titre}`}
                  className="w-56 h-56 mx-auto object-contain"
                />
              </div>
            )}

            <div className="bg-[#F0F6FA] p-2.5 rounded-lg border border-[#002C50]/15 text-xs font-mono text-[#002C50] break-all">
              {activeQrModal.url}
            </div>

            <div className="flex items-center justify-center gap-3 pt-1">
              <button
                type="button"
                onClick={() => downloadQrCode(activeQrModal)}
                className="flex items-center gap-1.5 px-4 py-2 bg-[#002C50] hover:bg-[#001e38] text-white text-xs font-bold rounded-xl transition-colors cursor-pointer"
              >
                <Download className="w-3.5 h-3.5 text-[#95EA31]" />
                <span>Télécharger le QR Code PNG</span>
              </button>
              <button
                type="button"
                onClick={() => setActiveQrModal(null)}
                className="px-4 py-2 border border-slate-200 text-xs font-medium text-slate-700 rounded-xl hover:bg-slate-50 transition-colors"
              >
                Fermer
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
