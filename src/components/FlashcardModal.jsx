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
        <div className="p-4 sm:p-6 flex-1 flex flex-col items-center justify-center perspective-1000 overflow-y-auto">
          <div
            onClick={handleFlip}
            className={`w-full aspect-[4/3] max-w-sm relative cursor-pointer select-none transition-transform duration-500 transform-style-preserve-3d ${
              isFlipped ? 'rotate-y-180' : ''
            }`}
          >
            {/* FRONT FACE */}
            <div className="absolute inset-0 rounded-3xl border-2 border-[#dcc1a4] bg-gradient-to-b from-white to-[#faf6f0] shadow-md hover:shadow-lg p-5 sm:p-6 flex flex-col justify-between items-center text-center backface-hidden transition-shadow">
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
                <div className="text-6xl sm:text-7xl font-black font-chinese text-[#3d2411] tracking-wider">
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
            <div className="absolute inset-0 rounded-3xl border-2 border-[#784e2a] bg-gradient-to-b from-[#fffdfa] to-[#f5ece1] shadow-md hover:shadow-lg p-5 sm:p-6 flex flex-col justify-between items-center text-center rotate-y-180 backface-hidden transition-shadow">
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
              <div className="my-auto space-y-2">
                <div className="text-3xl sm:text-4xl font-black font-chinese text-[#3d2411]">
                  {currentItem.hanzi}
                </div>
                <div>
                  <span className="text-lg sm:text-xl font-bold text-[#784e2a] font-chinese">
                    {currentItem.pinyin}
                  </span>
                  <span className="text-xs text-[#8c6849] ml-2 font-mono">({currentItem.tones})</span>
                </div>
                <p className="text-sm sm:text-base font-bold text-[#3d2411]">
                  {currentItem.indonesian}
                </p>
                {currentItem.example && (
                  <p className="text-xs text-[#784e2a] italic max-w-xs mx-auto line-clamp-2">
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

        {/* Modal Navigation Footer */}
        <div className="p-3 sm:p-4 bg-[#faf6f0] border-t border-[#f5ece1] flex items-center justify-between gap-2">
          <button
            onClick={() => {
              if (currentIndex > 0) {
                setCurrentIndex(prev => prev - 1);
                setIsFlipped(false);
                audioService.playTapSound();
              }
            }}
            disabled={currentIndex === 0}
            className="flex-1 py-2 sm:py-2.5 rounded-xl border border-[#ebdccb] bg-white text-xs font-bold text-[#784e2a] hover:bg-[#f5ece1] transition flex items-center justify-center space-x-1 disabled:opacity-40 disabled:cursor-not-allowed"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Sebelumnya</span>
          </button>

          <button
            onClick={handleFlip}
            className="px-3 py-2 sm:py-2.5 rounded-xl border border-[#dcc1a4] bg-[#f5ece1] text-xs font-bold text-[#5c391d] hover:bg-[#ead7c4] transition flex items-center justify-center space-x-1"
          >
            <RotateCw className="w-3.5 h-3.5" />
            <span className="hidden xs:inline">Balik</span>
          </button>

          <button
            onClick={() => {
              if (currentIndex < vocabList.length - 1) {
                setCurrentIndex(prev => prev + 1);
                setIsFlipped(false);
                audioService.playTapSound();
              }
            }}
            disabled={currentIndex === vocabList.length - 1}
            className="flex-1 py-2 sm:py-2.5 rounded-xl bg-[#784e2a] hover:bg-[#5c391d] text-white text-xs font-bold transition flex items-center justify-center space-x-1 disabled:opacity-40"
          >
            <span>Berikutnya</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

      </div>
    </div>
  );
}
