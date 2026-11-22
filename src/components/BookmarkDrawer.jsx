import React, { useState } from 'react';
import { X, Bookmark, Volume2, ArrowRight, Sparkles, Filter, RotateCw } from 'lucide-react';
import { getVocabulariesByLevel } from '../data/learningData';
import { audioService } from '../services/speechService';

export default function BookmarkDrawer({ 
  isOpen, 
  onClose, 
  currentLevel = "HSK 1", 
  onStartFlashcards 
}) {
  const [selectedFilter, setSelectedFilter] = useState('ALL');
  const [bookmarkedMap, setBookmarkedMap] = useState(() => {
    try {
      const saved = localStorage.getItem('nacha_bookmarked_ids');
      if (saved) return JSON.parse(saved);
    } catch (e) {}
    const initial = {};
    ['HSK 1', 'HSK 2', 'HSK 3'].forEach(lvl => {
      getVocabulariesByLevel(lvl).forEach(v => {
        if (v.isBookmarked) initial[v.id] = true;
      });
    });
    return initial;
  });

  // Resync whenever drawer opens
  React.useEffect(() => {
    if (isOpen) {
      try {
        const saved = localStorage.getItem('nacha_bookmarked_ids');
        if (saved) setBookmarkedMap(JSON.parse(saved));
      } catch (e) {}
    }
  }, [isOpen]);

  if (!isOpen) return null;

  // Gather bookmarked vocabs across all levels
  const vocabsHsk1 = getVocabulariesByLevel("HSK 1").filter(v => bookmarkedMap[v.id]);
  const vocabsHsk2 = getVocabulariesByLevel("HSK 2").filter(v => bookmarkedMap[v.id]);
  const vocabsHsk3 = getVocabulariesByLevel("HSK 3").filter(v => bookmarkedMap[v.id]);

  const allBookmarked = [...vocabsHsk1, ...vocabsHsk2, ...vocabsHsk3];

  const filteredList = selectedFilter === 'ALL'
    ? allBookmarked
    : allBookmarked.filter(v => v.hskLevel === selectedFilter);

  const handlePlay = (e, text) => {
    e.stopPropagation();
    audioService.playMandarin(text);
  };

  const handleRemoveBookmark = (e, item) => {
    e.stopPropagation();
    item.isBookmarked = false;
    setBookmarkedMap(prev => {
      const next = { ...prev };
      delete next[item.id];
      try {
        localStorage.setItem('nacha_bookmarked_ids', JSON.stringify(next));
      } catch (err) {}
      return next;
    });
    audioService.playTapSound();
  };

  const handleLaunchFlashcards = () => {
    onClose();
    if (onStartFlashcards) {
      onStartFlashcards();
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-[#3d2411]/50 backdrop-blur-xs transition-opacity animate-fadeIn"
        onClick={onClose}
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-0 sm:pl-10">
        <div className="w-screen max-w-md bg-[#fffdfa] border-l border-[#ebdccb] shadow-2xl flex flex-col animate-slideLeft">
          
          {/* Header */}
          <div className="p-5 border-b border-[#ebdccb] bg-[#faf6f0] flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-2xl bg-[#fef3c7] border border-[#fde68a] flex items-center justify-center text-[#d97706] shadow-2xs">
                <Bookmark className="w-5 h-5 fill-[#d97706]" />
              </div>
              <div>
                <h3 className="text-base font-extrabold text-[#3d2411]">
                  Kosakata Tersimpan
                </h3>
                <p className="text-xs text-[#8c6849]">
                  {allBookmarked.length} kata ditandai untuk diulas kembali
                </p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-2 rounded-xl text-[#8c6849] hover:text-[#3d2411] hover:bg-[#ebdccb]/60 transition"
              title="Tutup"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Quick Filter Bar */}
          <div className="px-5 py-3 border-b border-[#f5ece1] bg-[#fffdfa] flex items-center justify-between gap-2 overflow-x-auto">
            <div className="flex items-center space-x-1.5 text-xs font-bold">
              {[
                { id: 'ALL', label: `Semua (${allBookmarked.length})` },
                { id: 'HSK 1', label: `HSK 1 (${vocabsHsk1.length})` },
                { id: 'HSK 2', label: `HSK 2 (${vocabsHsk2.length})` },
                { id: 'HSK 3', label: `HSK 3 (${vocabsHsk3.length})` },
              ].map(tab => (
                <button
                  key={tab.id}
                  onClick={() => setSelectedFilter(tab.id)}
                  className={`px-2.5 py-1 rounded-xl transition whitespace-nowrap text-[11px] ${
                    selectedFilter === tab.id
                      ? 'bg-[#784e2a] text-white shadow-2xs font-extrabold'
                      : 'bg-[#faf6f0] text-[#784e2a] hover:bg-[#f5ece1]'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          {/* Word List */}
          <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-3">
            {filteredList.length === 0 ? (
              <div className="text-center py-16 text-[#8c6849]">
                <Bookmark className="w-12 h-12 mx-auto text-[#ebdccb] stroke-1 mb-2" />
                <p className="text-sm font-bold text-[#5c391d]">
                  Tidak ada kata di kategori ini
                </p>
                <p className="text-xs text-[#8c6849] mt-1 max-w-xs mx-auto">
                  Tandai kosakata dengan tombol Bookmark di kartu belajar untuk menyimpannya di sini.
                </p>
              </div>
            ) : (
              filteredList.map((item) => (
                <div
                  key={item.id}
                  className="bg-white rounded-2xl p-4 border border-[#ebdccb] hover:border-[#94663b] shadow-2xs hover:shadow-xs transition group"
                >
                  {/* Top row: Hanzi Badge + Pinyin + Audio */}
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-start space-x-3 min-w-0">
                      {/* Generous Hanzi Badge (horizontal width auto, never wraps vertically) */}
                      <div className="min-w-[64px] px-3 py-2 rounded-2xl bg-[#f5ece1] border border-[#dcc1a4] flex items-center justify-center text-xl font-black font-chinese text-[#3d2411] shrink-0 shadow-2xs whitespace-nowrap leading-none">
                        {item.hanzi}
                      </div>

                      {/* Word Info */}
                      <div className="min-w-0">
                        <div className="flex items-center space-x-2 flex-wrap gap-y-1">
                          <span className="text-sm font-bold text-[#784e2a] font-mono">
                            {item.pinyin}
                          </span>
                          <span className="text-[10px] font-bold px-1.5 py-0.5 rounded-md bg-[#f5ece1] text-[#5c391d] border border-[#ebdccb]">
                            {item.hskLevel}
                          </span>
                          {item.pos && (
                            <span className="text-[10px] font-medium px-1.5 py-0.5 rounded-md bg-[#faf6f0] text-[#8c6849]">
                              {item.pos}
                            </span>
                          )}
                        </div>

                        {/* Meaning (using correct indonesian field) */}
                        <p className="text-xs sm:text-sm font-bold text-[#3d2411] mt-1">
                          {item.indonesian || item.meaningId || item.meaning}
                        </p>
                      </div>
                    </div>

                    {/* Audio & Bookmark Actions */}
                    <div className="flex items-center space-x-1.5 shrink-0">
                      <button
                        onClick={(e) => handlePlay(e, item.hanzi)}
                        className="p-2.5 rounded-xl bg-[#faf6f0] text-[#784e2a] hover:bg-[#784e2a] hover:text-white transition shadow-2xs"
                        title="Dengarkan Pelafalan Mandarin"
                      >
                        <Volume2 className="w-4 h-4" />
                      </button>
                      <button
                        onClick={(e) => handleRemoveBookmark(e, item)}
                        className="p-2.5 rounded-xl bg-[#fef3c7] text-[#d97706] hover:bg-[#fee2e2] hover:text-[#991b1b] transition shadow-2xs"
                        title="Hapus dari Bookmark"
                      >
                        <Bookmark className="w-4 h-4 fill-[#d97706]" />
                      </button>
                    </div>
                  </div>

                  {/* Example Sentence with Indonesian Translation */}
                  {item.example && (
                    <div className="mt-3 pt-2.5 border-t border-[#f5ece1] text-xs space-y-0.5">
                      <p className="text-[#3d2411] font-chinese font-semibold">
                        {item.example.hanzi}
                      </p>
                      <p className="text-[11px] text-[#784e2a] italic">
                        "{item.example.indonesian}"
                      </p>
                    </div>
                  )}
                </div>
              ))
            )}
          </div>

          {/* Action Footer: Launch Flashcards from Bookmarks */}
          <div className="p-4 bg-[#faf6f0] border-t border-[#ebdccb] space-y-2">
            <button
              onClick={handleLaunchFlashcards}
              className="w-full py-2.5 px-4 rounded-2xl bg-[#784e2a] hover:bg-[#5c391d] text-white text-xs font-bold transition flex items-center justify-center space-x-2 shadow-xs group"
            >
              <RotateCw className="w-3.5 h-3.5 group-hover:rotate-180 transition-transform duration-500" />
              <span>Latihan Flashcards ({currentLevel})</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
            </button>
            <p className="text-[10px] text-center text-[#8c6849]">
              💡 Kosakata yang di-bookmark tersinkronisasi otomatis untuk materi ulasan SRS.
            </p>
          </div>

        </div>
      </div>
    </div>
  );
}
