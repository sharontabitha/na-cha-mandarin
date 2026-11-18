import React, { useState, useEffect } from 'react';
import { 
  X, 
  RotateCw, 
  Volume2, 
  Bookmark, 
  CheckCircle2, 
  ArrowRight, 
  ArrowLeft,
  Sparkles
} from 'lucide-react';
import { getVocabulariesByLevel, HSK_LEVELS_META } from '../data/learningData';
import { audioService } from '../services/speechService';
import Mascot from './Mascot';

export default function FlashcardModal({ isOpen, onClose, currentLevel = "HSK 1" }) {
  const vocabList = getVocabulariesByLevel(currentLevel);
  const activeLevelMeta = HSK_LEVELS_META[currentLevel] || HSK_LEVELS_META["HSK 1"];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [bookmarkedItems, setBookmarkedItems] = useState({});

  useEffect(() => {
    setCurrentIndex(0);
    setIsFlipped(false);
  }, [currentLevel, isOpen]);

  if (!isOpen) return null;

  const currentItem = vocabList[currentIndex] || vocabList[0];
  const isBookmarked = bookmarkedItems[currentItem.id] ?? currentItem.isBookmarked;

  const handleFlip = () => {
    setIsFlipped(!isFlipped);
    audioService.playTapSound();
  };

  const handlePlayAudio = (e) => {
    e.stopPropagation();
    audioService.playMandarin(currentItem.hanzi, 1.0);
  };

  const handleSrsAction = (days) => {
    audioService.playSuccessSound();
    setIsFlipped(false);
    if (currentIndex < vocabList.length - 1) {
      setCurrentIndex(prev => prev + 1);
    } else {
      onClose();
    }
  };

  const toggleBookmark = (e) => {
    e.stopPropagation();
    const nextVal = !isBookmarked;
    currentItem.isBookmarked = nextVal;
    setBookmarkedItems(prev => ({
      ...prev,
      [currentItem.id]: nextVal
    }));
    audioService.playTapSound();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#3d2411]/60 backdrop-blur-xs animate-fadeIn">
      <div className="bg-[#fffdfa] rounded-3xl w-full max-w-lg overflow-hidden shadow-2xl border border-[#ebdccb] flex flex-col max-h-[90vh]">
        {/* Modal Header */}
        <div className="p-4 sm:p-5 border-b border-[#f5ece1] flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Mascot size={28} mood="happy" />
            <h3 className="text-sm font-bold text-[#3d2411]">
              Na Cha SRS Flashcards · <span className="text-[#784e2a]">{currentLevel}</span>
            </h3>
            <span className="text-[11px] font-semibold text-[#8c6849] bg-[#f5ece1] px-2 py-0.5 rounded-full border border-[#dcc1a4]">
              {currentIndex + 1} / {vocabList.length}
            </span>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-xl text-[#8c6849] hover:text-[#3d2411] hover:bg-[#f5ece1] transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Progress Bar */}
        <div className="w-full bg-[#f5ece1] h-1.5">
          <div 
            className="bg-[#784e2a] h-full transition-all duration-300"
            style={{ width: `${((currentIndex + 1) / vocabList.length) * 100}%` }}
          />
        </div>

        {/* 3D Flip Card Container */}
        <div className="p-6 flex-1 flex flex-col items-center justify-center perspective-1000">
          <div
            onClick={handleFlip}
            className={`w-full aspect-[4/3] max-w-sm relative cursor-pointer select-none transition-transform duration-500 transform-style-preserve-3d ${
              isFlipped ? 'rotate-y-180' : ''
            }`}
          >
            {/* FRONT FACE */}
            <div className="absolute inset-0 rounded-3xl border-2 border-[#dcc1a4] bg-gradient-to-b from-white to-[#faf6f0] shadow-md hover:shadow-lg p-6 flex flex-col justify-between items-center text-center backface-hidden transition-shadow">
              {/* Top Controls */}
              <div className="w-full flex items-center justify-between">
                <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-[#f5ece1] text-[#5c391d] border border-[#dcc1a4]">
                  {currentItem.hskLevel} · {currentItem.pos}
                </span>

                <div className="flex items-center space-x-2">
                  <button
                    onClick={handlePlayAudio}
                    className="p-1.5 rounded-xl bg-[#f5ece1] text-[#784e2a] hover:bg-[#ead7c4] transition"
                    title="Dengarkan Audio"
                  >
                    <Volume2 className="w-4 h-4" />
                  </button>
                  <button
                    onClick={toggleBookmark}
                    className="p-1.5 rounded-xl text-[#b45309] hover:bg-[#fef3c7] transition"
                  >
                    <Bookmark className={`w-4 h-4 ${isBookmarked ? 'fill-[#d97706]' : 'text-[#dcc1a4]'}`} />
                  </button>
                </div>
              </div>

              {/* Hanzi */}
              <div className="my-auto space-y-2">
                <div className="text-7xl font-black font-chinese text-[#3d2411] tracking-wider">
                  {currentItem.hanzi}
                </div>
                <p className="text-xs text-[#8c6849] font-medium">
                  Klik kartu untuk melihat Pinyin &amp; Arti
                </p>
              </div>

              {/* Flip Cue */}
              <div className="text-[11px] text-[#8c6849] flex items-center space-x-1">
                <RotateCw className="w-3 h-3 text-[#784e2a]" />
                <span>Klik untuk membalik kartu</span>
              </div>
            </div>

            {/* BACK FACE */}
            <div className="absolute inset-0 rounded-3xl border-2 border-[#784e2a] bg-gradient-to-b from-[#fffdfa] to-[#f5ece1] shadow-md hover:shadow-lg p-6 flex flex-col justify-between items-center text-center rotate-y-180 backface-hidden transition-shadow">
              {/* Top Controls */}
              <div className="w-full flex items-center justify-between">
                <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-[#ebdccb] text-[#5c391d] border border-[#dcc1a4]">
                  {currentItem.hskLevel} · ARTI &amp; CONTOH
                </span>

                <div className="flex items-center space-x-2">
                  <button
                    onClick={handlePlayAudio}
                    className="p-1.5 rounded-xl bg-white text-[#784e2a] hover:bg-[#ebdccb] transition shadow-2xs"
                    title="Dengarkan Audio"
                  >
                    <Volume2 className="w-4 h-4" />
                  </button>
                  <button
                    onClick={toggleBookmark}
                    className="p-1.5 rounded-xl text-[#b45309] hover:bg-[#fef3c7] transition"
                  >
                    <Bookmark className={`w-4 h-4 ${isBookmarked ? 'fill-[#d97706]' : 'text-[#dcc1a4]'}`} />
                  </button>
                </div>
              </div>

              {/* Back Content */}
              <div className="my-auto space-y-2.5">
                <div className="text-4xl font-black font-chinese text-[#3d2411]">
                  {currentItem.hanzi}
                </div>
                <div>
                  <span className="text-xl font-bold text-[#784e2a] font-chinese">
                    {currentItem.pinyin}
                  </span>
                  <span className="text-xs text-[#8c6849] ml-2 font-mono">({currentItem.tones})</span>
                </div>
                <p className="text-base font-bold text-[#3d2411]">
                  {currentItem.indonesian}
                </p>
                {currentItem.example && (
                  <p className="text-xs text-[#784e2a] italic max-w-xs mx-auto">
                    "{currentItem.example.hanzi} - {currentItem.example.indonesian}"
                  </p>
                )}
              </div>

              {/* Flip Back Cue */}
              <div className="text-[11px] text-[#8c6849] flex items-center space-x-1">
                <RotateCw className="w-3 h-3 text-[#784e2a]" />
                <span>Klik untuk membalik ke depan</span>
              </div>
            </div>
          </div>
        </div>

        {/* SRS Rating Actions */}
        <div className="p-4 sm:p-5 bg-[#faf6f0] border-t border-[#f5ece1] space-y-2">
          <span className="text-[10px] font-bold uppercase tracking-wider text-[#8c6849] block text-center">
            EVALUASI MEMORI DAYA INGAT (SRS {currentLevel})
          </span>

          <div className="grid grid-cols-3 gap-2">
            <button
              onClick={() => handleSrsAction(1)}
              className="py-2.5 px-2 rounded-2xl bg-[#fee2e2] hover:bg-[#fca5a5]/50 text-[#991b1b] text-xs font-bold transition flex flex-col items-center"
            >
              <span>Belum Hafal</span>
              <span className="text-[10px] font-normal text-[#b91c1c]">1 Hari</span>
            </button>

            <button
              onClick={() => handleSrsAction(3)}
              className="py-2.5 px-2 rounded-2xl bg-[#fef3c7] hover:bg-[#fcd34d]/50 text-[#78350f] text-xs font-bold transition flex flex-col items-center"
            >
              <span>Cukup Ingat</span>
              <span className="text-[10px] font-normal text-[#b45309]">3 Hari</span>
            </button>

            <button
              onClick={() => handleSrsAction(7)}
              className="py-2.5 px-2 rounded-2xl bg-[#dcfce7] hover:bg-[#86efac]/50 text-[#14532d] text-xs font-bold transition flex flex-col items-center"
            >
              <span>Sangat Hafal</span>
              <span className="text-[10px] font-normal text-[#15803d]">7 Hari</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
