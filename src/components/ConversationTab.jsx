import React, { useState } from 'react';
import { 
  Play, 
  Pause, 
  Volume2, 
  MessageSquare, 
  Compass, 
  Coffee, 
  ShoppingBag, 
  GraduationCap, 
  Users, 
  Sparkles, 
  Smile, 
  Clock, 
  RotateCcw,
  Headphones
} from 'lucide-react';
import { DAILY_CONVERSATIONS } from '../data/conversationsData';
import { audioService } from '../services/speechService';

export default function ConversationTab({ globalShowPinyin = true }) {
  const [selectedCategory, setSelectedCategory] = useState("Shopping");
  const [showPinyin, setShowPinyin] = useState(globalShowPinyin);
  const [showIndonesian, setShowIndonesian] = useState(true);
  const [audioSpeed, setAudioSpeed] = useState(1.0);
  const [activeSentenceIndex, setActiveSentenceIndex] = useState(null);
  const [isPlayingAll, setIsPlayingAll] = useState(false);

  React.useEffect(() => {
    setShowPinyin(globalShowPinyin);
  }, [globalShowPinyin]);

  const currentTopic = DAILY_CONVERSATIONS.find(c => c.category === selectedCategory) || DAILY_CONVERSATIONS[0];

  const categories = [
    { id: "Shopping", label: "Shopping (Belanja)", icon: ShoppingBag },
    { id: "Greetings", label: "Greetings (Salam)", icon: Smile },
    { id: "Self Introduction", label: "Self Intro (Perkenalan)", icon: Sparkles },
    { id: "Restaurant", label: "Restaurant (Restoran)", icon: Coffee },
    { id: "Travel", label: "Travel (Wisata)", icon: Compass },
    { id: "University", label: "University (Kampus)", icon: GraduationCap },
    { id: "Family", label: "Family (Keluarga)", icon: Users },
    { id: "Hobbies", label: "Hobbies (Hobi)", icon: MessageSquare },
    { id: "Daily Activities", label: "Daily (Aktivitas)", icon: Clock }
  ];

  const handlePlaySentence = (text, idx) => {
    setActiveSentenceIndex(idx);
    audioService.playMandarin(
      text, 
      audioSpeed,
      () => setActiveSentenceIndex(idx),
      () => setActiveSentenceIndex(null)
    );
  };

  const handlePlayAll = () => {
    if (isPlayingAll) {
      audioService.stop();
      setIsPlayingAll(false);
      setActiveSentenceIndex(null);
      return;
    }

    setIsPlayingAll(true);
    let index = 0;

    const playNext = () => {
      if (index >= currentTopic.dialogues.length) {
        setIsPlayingAll(false);
        setActiveSentenceIndex(null);
        return;
      }
      setActiveSentenceIndex(index);
      const text = currentTopic.dialogues[index].hanzi;
      index++;
      audioService.playMandarin(text, audioSpeed, null, () => {
        setTimeout(playNext, 400);
      });
    };

    playNext();
  };

  return (
    <div className="py-6 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6 animate-fadeIn">
      {/* Top Header */}
      <div className="bg-[#fffdfa] rounded-3xl p-5 sm:p-6 border border-[#ebdccb] shadow-xs flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <div className="flex items-center space-x-2 text-xs text-[#8c6849] font-medium">
            <span className="font-bold px-2.5 py-0.5 rounded-lg bg-[#f5ece1] text-[#5c391d] border border-[#dcc1a4]">
              PERCAKAPAN
            </span>
            <span>›</span>
            <span className="text-[#3d2411] font-bold">9 Kategori Harian Lengkap</span>
          </div>
          <h1 className="text-xl sm:text-2xl font-black text-[#3d2411] mt-1">
            {currentTopic.titleIndo}
          </h1>
          <p className="text-xs text-[#784e2a] mt-0.5">
            Tema: {currentTopic.scene} · Dilengkapi audio penutur asli, Hanzi, Pinyin, dan terjemahan.
          </p>
        </div>

        {/* Global Controls */}
        <div className="flex flex-wrap items-center gap-2 self-end md:self-auto">
          {/* Continuous Autoplay */}
          <button
            onClick={handlePlayAll}
            className={`px-4 py-2 rounded-2xl text-xs font-bold transition flex items-center space-x-1.5 shadow-xs ${
              isPlayingAll
                ? 'bg-[#5c391d] text-white animate-pulse'
                : 'bg-[#784e2a] hover:bg-[#5c391d] text-white'
            }`}
          >
            {isPlayingAll ? <Pause className="w-3.5 h-3.5 fill-white" /> : <Play className="w-3.5 h-3.5 fill-white" />}
            <span>{isPlayingAll ? 'Hentikan Audio' : 'Putar Seluruh Dialog'}</span>
          </button>

          {/* Pinyin Toggle */}
          <button
            onClick={() => setShowPinyin(!showPinyin)}
            className={`px-3 py-2 rounded-2xl text-xs font-bold border transition ${
              showPinyin ? 'bg-[#f5ece1] text-[#5c391d] border-[#dcc1a4]' : 'bg-[#faf6f0] text-[#8c6849] border-[#ebdccb]'
            }`}
          >
            文A Pinyin
          </button>

          {/* Indonesian Toggle */}
          <button
            onClick={() => setShowIndonesian(!showIndonesian)}
            className={`px-3 py-2 rounded-2xl text-xs font-bold border transition ${
              showIndonesian ? 'bg-[#eff6ff] text-[#1e3a8a] border-[#bfdbfe]' : 'bg-[#faf6f0] text-[#8c6849] border-[#ebdccb]'
            }`}
          >
            🇮🇩 Terjemahan
          </button>

          {/* Speed Pills */}
          <div className="flex items-center space-x-1 bg-[#faf6f0] p-1 rounded-2xl border border-[#ebdccb] text-xs font-semibold">
            {[0.75, 1.0, 1.25].map(speed => (
              <button
                key={speed}
                onClick={() => setAudioSpeed(speed)}
                className={`px-2 py-1 rounded-xl ${
                  audioSpeed === speed ? 'bg-[#3d2411] text-white font-bold' : 'text-[#784e2a]'
                }`}
              >
                {speed}x
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* 9 Category Pills */}
      <div className="flex items-center space-x-2 overflow-x-auto pb-2 scrollbar-none">
        {categories.map((cat) => {
          const Icon = cat.icon;
          const isSelected = selectedCategory === cat.id;

          return (
            <button
              key={cat.id}
              onClick={() => {
                setSelectedCategory(cat.id);
                audioService.stop();
                setIsPlayingAll(false);
                setActiveSentenceIndex(null);
                audioService.playTapSound();
              }}
              className={`px-3.5 py-2 rounded-2xl text-xs font-bold whitespace-nowrap transition flex items-center space-x-1.5 shrink-0 ${
                isSelected
                  ? 'bg-[#784e2a] text-white shadow-xs'
                  : 'bg-[#fffdfa] text-[#5c391d] border border-[#ebdccb] hover:bg-[#faf6f0]'
              }`}
            >
              <Icon className="w-3.5 h-3.5" />
              <span>{cat.label}</span>
            </button>
          );
        })}
      </div>

      {/* Dialogue Thread Card */}
      <div className="bg-[#fffdfa] rounded-3xl p-6 sm:p-8 border border-[#ebdccb] shadow-xs space-y-6">
        <div className="space-y-4">
          {currentTopic.dialogues.map((item, idx) => {
            const isSpeakerRight = idx % 2 === 1;
            const isCurrentlyPlaying = activeSentenceIndex === idx;

            return (
              <div
                key={idx}
                className={`flex items-start space-x-3 transition-all ${
                  isSpeakerRight ? 'flex-row-reverse space-x-reverse' : ''
                }`}
              >
                {/* Speaker Avatar */}
                <div className="w-10 h-10 rounded-full bg-[#f5ece1] border border-[#dcc1a4] flex items-center justify-center text-xl shrink-0 shadow-2xs">
                  {item.avatar}
                </div>

                {/* Message Bubble */}
                <div
                  className={`max-w-xl rounded-3xl p-4 transition-all ${
                    isCurrentlyPlaying
                      ? 'ring-2 ring-[#94663b] bg-[#f5ece1] border border-[#dcc1a4]'
                      : isSpeakerRight
                      ? 'bg-[#faf6f0] border border-[#ebdccb]'
                      : 'bg-white border border-[#ebdccb] shadow-2xs'
                  }`}
                >
                  <div className="flex items-center justify-between pb-1.5 border-b border-[#ebdccb]/60 mb-2">
                    <span className="text-xs font-bold text-[#5c391d]">{item.speaker}</span>
                    <button
                      onClick={() => handlePlaySentence(item.hanzi, idx)}
                      className="p-1 rounded-xl text-[#784e2a] hover:bg-[#f5ece1] transition"
                      title="Dengarkan Baris Ini"
                    >
                      <Volume2 className="w-4 h-4" />
                    </button>
                  </div>

                  {/* Hanzi */}
                  <p className="text-base sm:text-lg font-bold font-chinese text-[#3d2411] leading-snug">
                    {item.hanzi}
                  </p>

                  {/* Pinyin */}
                  {showPinyin && (
                    <p className="text-xs font-semibold text-[#784e2a] font-sans mt-1">
                      {item.pinyin}
                    </p>
                  )}

                  {/* Indonesian */}
                  {showIndonesian && (
                    <p className="text-xs text-[#8c6849] italic mt-1.5 border-t border-[#f5ece1] pt-1.5">
                      "{item.indonesian}"
                    </p>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Culture note for conversation */}
        <div className="p-4 bg-[#faf6f0] rounded-2xl border border-[#ebdccb] text-xs text-[#5c391d] flex items-start space-x-3">
          <span className="text-base">🏮</span>
          <div>
            <strong className="block font-bold">Tips Konversasi Penutur Asli:</strong>
            <p className="mt-0.5 leading-relaxed text-[#784e2a]">
              Perhatikan partikel nada seperti 吧 (ba) untuk saran ramah, dan 呢 (ne) untuk bertanya balik. Jangan ragu memutar ulang audio untuk meniru jeda intonasi penutur asli!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
