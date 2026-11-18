import React, { useState } from 'react';
import { audioService } from '../services/speechService';

const MASCOT_QUOTES = [
  { hanzi: "加油！", pinyin: "Jiāyóu!", id: "Semangat belajar!" },
  { hanzi: "慢慢来，天天向上！", pinyin: "Mànmàn lái, tiāntiān xiàngshàng!", id: "Pelan-pelan, makin maju tiap hari!" },
  { hanzi: "奶茶很甜，汉语很美！", pinyin: "Nǎichá hěn tián, Hànyǔ hěn měi!", id: "Milk tea semanis ini, Mandarin seindah itu!" },
  { hanzi: "熟能生巧！", pinyin: "Shú néng shēng qiǎo!", id: "Bisa karena terbiasa!" }
];

export default function Mascot({ 
  size = 64, 
  mood = 'happy', // happy, encouraging, cheering, thinking, sipping
  className = "",
  showQuoteOnClick = false,
  bubblePosition = "top", // 'top' | 'bottom' | 'left' | 'right'
  onClick
}) {
  const [bubbleQuote, setBubbleQuote] = useState(null);
  const [isWiggling, setIsWiggling] = useState(false);

  const handleClick = (e) => {
    if (onClick) {
      onClick(e);
      return;
    }

    if (showQuoteOnClick) {
      audioService.playTapSound();
      setIsWiggling(true);
      const randomQ = MASCOT_QUOTES[Math.floor(Math.random() * MASCOT_QUOTES.length)];
      setBubbleQuote(randomQ);
      audioService.playMandarin(randomQ.hanzi, 1.1);
      setTimeout(() => setIsWiggling(false), 500);
      setTimeout(() => setBubbleQuote(null), 3500);
    }
  };

  return (
    <div 
      onClick={handleClick}
      className={`relative inline-flex items-center justify-center select-none ${showQuoteOnClick ? 'cursor-pointer' : ''} ${className}`}
      style={{ width: size, height: size }}
      title={showQuoteOnClick ? "Klik Cha-Cha untuk pesan semangat!" : "Na Cha Maskot (Cha-Cha 奶茶)"}
    >
      {/* Interactive Speech Bubble (supports flexible positioning & no clipping) */}
      {bubbleQuote && (
        <>
          {bubblePosition === 'left' && (
            <div className="absolute right-full mr-3 top-1/2 -translate-y-1/2 z-50 pointer-events-none animate-fadeIn flex items-center">
              <div className="bg-[#3d2411] text-[#fffdfa] rounded-2xl px-3.5 py-2 shadow-2xl border border-[#5c391d] text-center min-w-[130px] max-w-[210px]">
                <span className="font-chinese font-bold text-xs text-[#fcd34d] block">
                  {bubbleQuote.hanzi}
                </span>
                <span className="text-[10px] text-[#ead7c4] block leading-tight mt-0.5">
                  {bubbleQuote.id}
                </span>
              </div>
              <div className="w-2.5 h-2.5 bg-[#3d2411] rotate-45 -ml-1.5 border-t border-r border-[#5c391d] shrink-0"></div>
            </div>
          )}

          {bubblePosition === 'right' && (
            <div className="absolute left-full ml-3 top-1/2 -translate-y-1/2 z-50 pointer-events-none animate-fadeIn flex items-center">
              <div className="w-2.5 h-2.5 bg-[#3d2411] rotate-45 -mr-1.5 border-b border-l border-[#5c391d] shrink-0"></div>
              <div className="bg-[#3d2411] text-[#fffdfa] rounded-2xl px-3.5 py-2 shadow-2xl border border-[#5c391d] text-center min-w-[130px] max-w-[210px]">
                <span className="font-chinese font-bold text-xs text-[#fcd34d] block">
                  {bubbleQuote.hanzi}
                </span>
                <span className="text-[10px] text-[#ead7c4] block leading-tight mt-0.5">
                  {bubbleQuote.id}
                </span>
              </div>
            </div>
          )}

          {bubblePosition === 'bottom' && (
            <div className="absolute top-full mt-2.5 left-1/2 -translate-x-1/2 z-50 pointer-events-none animate-fadeIn flex flex-col items-center">
              <div className="w-2.5 h-2.5 bg-[#3d2411] rotate-45 -mb-1.5 border-t border-l border-[#5c391d] z-10"></div>
              <div className="bg-[#3d2411] text-[#fffdfa] rounded-2xl px-3.5 py-2 shadow-2xl border border-[#5c391d] text-center min-w-[130px] max-w-[220px]">
                <span className="font-chinese font-bold text-xs text-[#fcd34d] block">
                  {bubbleQuote.hanzi}
                </span>
                <span className="text-[10px] text-[#ead7c4] block leading-tight mt-0.5">
                  {bubbleQuote.id}
                </span>
              </div>
            </div>
          )}

          {bubblePosition === 'top' && (
            <div className="absolute bottom-full mb-2.5 left-1/2 -translate-x-1/2 z-50 pointer-events-none animate-fadeIn flex flex-col items-center">
              <div className="bg-[#3d2411] text-[#fffdfa] rounded-2xl px-3.5 py-2 shadow-2xl border border-[#5c391d] text-center min-w-[130px] max-w-[220px]">
                <span className="font-chinese font-bold text-xs text-[#fcd34d] block">
                  {bubbleQuote.hanzi}
                </span>
                <span className="text-[10px] text-[#ead7c4] block leading-tight mt-0.5">
                  {bubbleQuote.id}
                </span>
              </div>
              <div className="w-2.5 h-2.5 bg-[#3d2411] rotate-45 -mt-1.5 border-r border-b border-[#5c391d]"></div>
            </div>
          )}
        </>
      )}

      <svg 
        viewBox="0 0 120 140" 
        width={size} 
        height={(size * 140) / 120} 
        fill="none" 
        xmlns="http://www.w3.org/2000/svg"
        className={`filter drop-shadow-sm transition-transform duration-200 ${
          isWiggling ? 'scale-110 rotate-6' : 'hover:scale-105'
        }`}
      >
        {/* Straw */}
        <path 
          d="M72 10 L84 -15 L98 -10 L84 25" 
          fill="#ef4444" 
          stroke="#b91c1c" 
          strokeWidth="2.5" 
          strokeLinejoin="round" 
        />
        {/* Straw stripes */}
        <line x1="77" y1="-3" x2="87" y2="1" stroke="white" strokeWidth="4" strokeLinecap="round" />
        <line x1="82" y1="12" x2="92" y2="16" stroke="white" strokeWidth="4" strokeLinecap="round" />

        {/* Cup Lid */}
        <ellipse cx="60" cy="28" rx="46" ry="10" fill="#fecaca" stroke="#dc2626" strokeWidth="3" />
        <ellipse cx="60" cy="25" rx="38" ry="7" fill="#fee2e2" />

        {/* Cup Body (Trapezoid-like tapered) */}
        <path 
          d="M20 28 L30 118 Q32 128 44 128 L76 128 Q88 128 90 118 L100 28 Z" 
          fill="#fef3c7" 
          stroke="#b45309" 
          strokeWidth="3" 
          strokeLinejoin="round"
        />

        {/* Milk Tea Liquid Gradient & Fill */}
        <path 
          d="M23 44 L31 117 Q33 125 43 125 L77 125 Q87 125 89 117 L97 44 Q60 52 23 44 Z" 
          fill="url(#milkTeaGradient)" 
        />

        {/* Boba Pearls inside the tea */}
        <circle cx="44" cy="112" r="7" fill="#451a03" />
        <circle cx="42" cy="110" r="2" fill="#78350f" />
        
        <circle cx="62" cy="115" r="7.5" fill="#451a03" />
        <circle cx="60" cy="113" r="2.5" fill="#78350f" />
        
        <circle cx="78" cy="110" r="7" fill="#451a03" />
        <circle cx="76" cy="108" r="2" fill="#78350f" />
        
        <circle cx="52" cy="102" r="6.5" fill="#451a03" />
        <circle cx="50" cy="100" r="2" fill="#78350f" />
        
        <circle cx="70" cy="99" r="6.5" fill="#451a03" />
        <circle cx="68" cy="97" r="2" fill="#78350f" />

        <circle cx="37" cy="98" r="6" fill="#451a03" />

        {/* Kawaii Eyes based on Mood */}
        {mood === 'happy' || mood === 'cheering' ? (
          <>
            {/* Happy curved eyes ^^ */}
            <path d="M42 66 Q48 60 54 66" stroke="#451a03" strokeWidth="3.5" strokeLinecap="round" />
            <path d="M66 66 Q72 60 78 66" stroke="#451a03" strokeWidth="3.5" strokeLinecap="round" />
          </>
        ) : mood === 'thinking' ? (
          <>
            <circle cx="48" cy="65" r="3.5" fill="#451a03" />
            <path d="M66 63 L78 65" stroke="#451a03" strokeWidth="3" strokeLinecap="round" />
          </>
        ) : mood === 'sipping' ? (
          <>
            <path d="M42 67 Q48 62 54 67" stroke="#451a03" strokeWidth="3.5" strokeLinecap="round" />
            <path d="M66 67 Q72 62 78 67" stroke="#451a03" strokeWidth="3.5" strokeLinecap="round" />
            {/* Sipping small round mouth */}
            <circle cx="60" cy="76" r="3.5" fill="#dc2626" stroke="#451a03" strokeWidth="1.5" />
          </>
        ) : (
          <>
            {/* Big sparky round eyes */}
            <circle cx="47" cy="65" r="4.5" fill="#451a03" />
            <circle cx="45.5" cy="63.5" r="1.5" fill="white" />
            <circle cx="73" cy="65" r="4.5" fill="#451a03" />
            <circle cx="71.5" cy="63.5" r="1.5" fill="white" />
          </>
        )}

        {/* Cute Blushing Cheeks */}
        <ellipse cx="36" cy="72" rx="5" ry="3" fill="#f87171" opacity="0.7" />
        <ellipse cx="84" cy="72" rx="5" ry="3" fill="#f87171" opacity="0.7" />

        {/* Kawaii Smiling Mouth (when not sipping) */}
        {mood !== 'sipping' && (
          <path 
            d="M54 74 Q60 82 66 74" 
            fill="#dc2626" 
            stroke="#451a03" 
            strokeWidth="2.5" 
            strokeLinecap="round" 
          />
        )}

        {/* Character seal 奶 on the cup */}
        <rect x="52" y="83" width="16" height="13" rx="3" fill="#ffffff" opacity="0.85" />
        <text x="60" y="93" fontSize="9" fontWeight="bold" fill="#b45309" textAnchor="middle" fontFamily="sans-serif">
          奶茶
        </text>

        {/* Gradients */}
        <defs>
          <linearGradient id="milkTeaGradient" x1="60" y1="44" x2="60" y2="128" gradientUnits="userSpaceOnUse">
            <stop stopColor="#fed7aa" />
            <stop offset="0.6" stopColor="#fcd34d" />
            <stop offset="1" stopColor="#d97706" />
          </linearGradient>
        </defs>
      </svg>
    </div>
  );
}
