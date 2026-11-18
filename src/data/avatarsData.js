// 8 Maskot Hewan & Boba Lucu untuk Na Cha (Tanpa Muka Orang)
const svgToDataUri = (svgStr) => `data:image/svg+xml;utf8,${encodeURIComponent(svgStr.trim())}`;

// 1. Cha-Cha Boba (Maskot Utama Na Cha)
const chaChaSvg = `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width="100" height="100">
  <circle cx="50" cy="50" r="48" fill="#fef3c7" stroke="#ebdccb" stroke-width="2"/>
  <!-- Straw -->
  <rect x="52" y="12" width="7" height="30" rx="3.5" transform="rotate(15 52 12)" fill="#ea580c"/>
  <path d="M57 14 L62 17" stroke="#ffffff" stroke-width="2" stroke-linecap="round"/>
  <!-- Cup Body -->
  <path d="M28 36 L34 82 C34 86 38 88 44 88 L56 88 C62 88 66 86 66 82 L72 36 Z" fill="#dcc1a4" stroke="#784e2a" stroke-width="3" stroke-linejoin="round"/>
  <!-- Tea Liquid -->
  <path d="M30 44 L34 81 C34 84 38 86 44 86 L56 86 C62 86 66 84 66 81 L70 44 Z" fill="#c49a6c"/>
  <!-- Lid -->
  <path d="M24 36 C24 33 28 31 32 31 L68 31 C72 31 76 33 76 36 Z" fill="#ffffff" stroke="#784e2a" stroke-width="3"/>
  <!-- Boba Pearls -->
  <circle cx="42" cy="78" r="4" fill="#3d2411"/>
  <circle cx="50" cy="80" r="4" fill="#3d2411"/>
  <circle cx="58" cy="78" r="4" fill="#3d2411"/>
  <circle cx="46" cy="72" r="3.5" fill="#3d2411"/>
  <circle cx="54" cy="72" r="3.5" fill="#3d2411"/>
  <!-- Face: Smiling Eyes & Mouth -->
  <path d="M40 52 Q44 48 48 52" stroke="#3d2411" stroke-width="2.5" stroke-linecap="round" fill="none"/>
  <path d="M52 52 Q56 48 60 52" stroke="#3d2411" stroke-width="2.5" stroke-linecap="round" fill="none"/>
  <circle cx="38" cy="57" r="3" fill="#f87171" opacity="0.7"/>
  <circle cx="62" cy="57" r="3" fill="#f87171" opacity="0.7"/>
  <path d="M47 57 Q50 61 53 57" stroke="#3d2411" stroke-width="2.2" stroke-linecap="round" fill="none"/>
  <text x="50" y="96" font-size="8" font-family="sans-serif" font-weight="bold" fill="#784e2a" text-anchor="middle">Cha-Cha</text>
</svg>
`;

// 2. Panda Boba (Panda Lucu)
const pandaSvg = `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width="100" height="100">
  <circle cx="50" cy="50" r="48" fill="#e6f4ea" stroke="#bbf7d0" stroke-width="2"/>
  <!-- Panda Ears -->
  <circle cx="28" cy="28" r="13" fill="#1f2937"/>
  <circle cx="72" cy="28" r="13" fill="#1f2937"/>
  <circle cx="28" cy="28" r="6" fill="#374151"/>
  <circle cx="72" cy="28" r="6" fill="#374151"/>
  <!-- Head -->
  <circle cx="50" cy="52" r="34" fill="#ffffff" stroke="#1f2937" stroke-width="2.5"/>
  <!-- Eye Patches -->
  <ellipse cx="38" cy="48" rx="8" ry="10" transform="rotate(-15 38 48)" fill="#1f2937"/>
  <ellipse cx="62" cy="48" rx="8" ry="10" transform="rotate(15 62 48)" fill="#1f2937"/>
  <!-- Sparkling Eyes -->
  <circle cx="39" cy="47" r="3.5" fill="#ffffff"/>
  <circle cx="40" cy="46" r="1.5" fill="#1f2937"/>
  <circle cx="61" cy="47" r="3.5" fill="#ffffff"/>
  <circle cx="60" cy="46" r="1.5" fill="#1f2937"/>
  <!-- Nose & Mouth -->
  <ellipse cx="50" cy="56" rx="4" ry="2.5" fill="#1f2937"/>
  <path d="M47 60 Q50 63 53 60" stroke="#1f2937" stroke-width="2" stroke-linecap="round" fill="none"/>
  <!-- Cheeks -->
  <circle cx="32" cy="57" r="4" fill="#fb7185" opacity="0.6"/>
  <circle cx="68" cy="57" r="4" fill="#fb7185" opacity="0.6"/>
  <!-- Mini Boba Cup -->
  <rect x="44" y="68" width="12" height="16" rx="3" fill="#dcc1a4" stroke="#784e2a" stroke-width="1.5"/>
  <rect x="49" y="62" width="2.5" height="8" rx="1" fill="#16a34a"/>
  <circle cx="48" cy="80" r="1.5" fill="#3d2411"/>
  <circle cx="52" cy="80" r="1.5" fill="#3d2411"/>
</svg>
`;

// 3. Kucing Boba (Cat Barista)
const catSvg = `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width="100" height="100">
  <circle cx="50" cy="50" r="48" fill="#fef9c3" stroke="#fde047" stroke-width="2"/>
  <!-- Cat Ears -->
  <polygon points="22,42 32,18 46,32" fill="#f97316" stroke="#c2410c" stroke-width="2"/>
  <polygon points="27,38 33,24 41,33" fill="#fecdd3"/>
  <polygon points="78,42 68,18 54,32" fill="#f97316" stroke="#c2410c" stroke-width="2"/>
  <polygon points="73,38 67,24 59,33" fill="#fecdd3"/>
  <!-- Head -->
  <ellipse cx="50" cy="54" rx="33" ry="28" fill="#fb923c" stroke="#c2410c" stroke-width="2.5"/>
  <ellipse cx="50" cy="62" rx="20" ry="16" fill="#fff7ed"/>
  <!-- Eyes (Happy Curled ^ ^) -->
  <path d="M36 48 Q40 44 44 48" stroke="#431407" stroke-width="2.8" stroke-linecap="round" fill="none"/>
  <path d="M56 48 Q60 44 64 48" stroke="#431407" stroke-width="2.8" stroke-linecap="round" fill="none"/>
  <!-- Nose & Whiskers -->
  <polygon points="48,54 52,54 50,57" fill="#f43f5e"/>
  <path d="M47 57 Q50 61 53 57" stroke="#431407" stroke-width="2" stroke-linecap="round" fill="none"/>
  <!-- Whiskers -->
  <line x1="22" y1="52" x2="33" y2="54" stroke="#431407" stroke-width="1.8" stroke-linecap="round"/>
  <line x1="22" y1="58" x2="33" y2="57" stroke="#431407" stroke-width="1.8" stroke-linecap="round"/>
  <line x1="78" y1="52" x2="67" y2="54" stroke="#431407" stroke-width="1.8" stroke-linecap="round"/>
  <line x1="78" y1="58" x2="67" y2="57" stroke="#431407" stroke-width="1.8" stroke-linecap="round"/>
  <!-- Cheeks -->
  <circle cx="34" cy="56" r="4" fill="#fb7185" opacity="0.6"/>
  <circle cx="66" cy="56" r="4" fill="#fb7185" opacity="0.6"/>
  <!-- Mini Boba Cup -->
  <rect x="44" y="68" width="12" height="15" rx="3" fill="#ead7c4" stroke="#784e2a" stroke-width="1.5"/>
  <rect x="49" y="63" width="2" height="7" rx="1" fill="#ea580c"/>
  <circle cx="48" cy="79" r="1.5" fill="#3d2411"/>
  <circle cx="52" cy="79" r="1.5" fill="#3d2411"/>
</svg>
`;

// 4. Shiba Inu Boba (Anjing Shiba Lucu)
const shibaSvg = `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width="100" height="100">
  <circle cx="50" cy="50" r="48" fill="#fed7aa" stroke="#fdba74" stroke-width="2"/>
  <!-- Shiba Ears -->
  <polygon points="22,38 32,16 46,30" fill="#d97706" stroke="#92400e" stroke-width="2"/>
  <polygon points="27,34 33,22 41,30" fill="#fff7ed"/>
  <polygon points="78,38 68,16 54,30" fill="#d97706" stroke="#92400e" stroke-width="2"/>
  <polygon points="73,34 67,22 59,30" fill="#fff7ed"/>
  <!-- Head -->
  <ellipse cx="50" cy="52" rx="32" ry="28" fill="#f59e0b" stroke="#92400e" stroke-width="2.5"/>
  <!-- White Cheeks & Muzzle -->
  <ellipse cx="36" cy="58" rx="12" ry="14" fill="#ffffff"/>
  <ellipse cx="64" cy="58" rx="12" ry="14" fill="#ffffff"/>
  <ellipse cx="50" cy="60" rx="14" ry="12" fill="#ffffff"/>
  <!-- Eyebrow Dots -->
  <circle cx="38" cy="40" r="3" fill="#ffffff"/>
  <circle cx="62" cy="40" r="3" fill="#ffffff"/>
  <!-- Smiling Eyes -->
  <path d="M36 46 Q40 42 44 46" stroke="#451a03" stroke-width="2.8" stroke-linecap="round" fill="none"/>
  <path d="M56 46 Q60 42 64 46" stroke="#451a03" stroke-width="2.8" stroke-linecap="round" fill="none"/>
  <!-- Nose & Cute Tongue -->
  <ellipse cx="50" cy="54" rx="4" ry="3" fill="#451a03"/>
  <path d="M47 57 Q50 61 53 57" stroke="#451a03" stroke-width="2" stroke-linecap="round" fill="none"/>
  <path d="M49 60 C49 64 53 64 53 60 Z" fill="#f43f5e"/>
  <!-- Cheeks -->
  <circle cx="32" cy="54" r="3.5" fill="#fb7185" opacity="0.6"/>
  <circle cx="68" cy="54" r="3.5" fill="#fb7185" opacity="0.6"/>
  <!-- Mini Boba Cup -->
  <rect x="44" y="68" width="12" height="15" rx="3" fill="#ebdccb" stroke="#784e2a" stroke-width="1.5"/>
  <rect x="49" y="63" width="2" height="7" rx="1" fill="#ea580c"/>
  <circle cx="48" cy="79" r="1.5" fill="#3d2411"/>
  <circle cx="52" cy="79" r="1.5" fill="#3d2411"/>
</svg>
`;

// 5. Kelinci Taro (Bunny Taro Boba)
const bunnySvg = `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width="100" height="100">
  <circle cx="50" cy="50" r="48" fill="#f3e8ff" stroke="#d8b4fe" stroke-width="2"/>
  <!-- Long Bunny Ears -->
  <ellipse cx="36" cy="22" rx="7" ry="18" fill="#ffffff" stroke="#9333ea" stroke-width="2"/>
  <ellipse cx="36" cy="22" rx="4" ry="13" fill="#f5d0fe"/>
  <ellipse cx="64" cy="22" rx="7" ry="18" fill="#ffffff" stroke="#9333ea" stroke-width="2"/>
  <ellipse cx="64" cy="22" rx="4" ry="13" fill="#f5d0fe"/>
  <!-- Head -->
  <ellipse cx="50" cy="54" rx="30" ry="26" fill="#ffffff" stroke="#9333ea" stroke-width="2"/>
  <!-- Big Shiny Eyes -->
  <circle cx="40" cy="50" r="4.5" fill="#581c87"/>
  <circle cx="41.5" cy="48.5" r="1.8" fill="#ffffff"/>
  <circle cx="60" cy="50" r="4.5" fill="#581c87"/>
  <circle cx="58.5" cy="48.5" r="1.8" fill="#ffffff"/>
  <!-- Nose & Mouth -->
  <polygon points="48,56 52,56 50,58" fill="#f43f5e"/>
  <path d="M47 59 Q50 62 53 59" stroke="#581c87" stroke-width="1.8" stroke-linecap="round" fill="none"/>
  <!-- Rosy Cheeks -->
  <circle cx="33" cy="56" r="4" fill="#f472b6" opacity="0.6"/>
  <circle cx="67" cy="56" r="4" fill="#f472b6" opacity="0.6"/>
  <!-- Taro Milk Tea Cup -->
  <rect x="44" y="68" width="12" height="15" rx="3" fill="#c084fc" stroke="#6b21a8" stroke-width="1.5"/>
  <rect x="49" y="63" width="2" height="7" rx="1" fill="#7e22ce"/>
  <circle cx="48" cy="79" r="1.5" fill="#3b0764"/>
  <circle cx="52" cy="79" r="1.5" fill="#3b0764"/>
</svg>
`;

// 6. Rubah Boba (Fox Scholar)
const foxSvg = `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width="100" height="100">
  <circle cx="50" cy="50" r="48" fill="#ffedd5" stroke="#fed7aa" stroke-width="2"/>
  <!-- Fox Ears -->
  <polygon points="20,40 30,14 46,30" fill="#ea580c" stroke="#9a3412" stroke-width="2"/>
  <polygon points="28,20 30,14 34,20" fill="#1f2937"/>
  <polygon points="26,34 31,22 41,30" fill="#ffffff"/>
  <polygon points="80,40 70,14 54,30" fill="#ea580c" stroke="#9a3412" stroke-width="2"/>
  <polygon points="72,20 70,14 66,20" fill="#1f2937"/>
  <polygon points="74,34 69,22 59,30" fill="#ffffff"/>
  <!-- Head -->
  <polygon points="24,42 50,74 76,42" fill="#ea580c"/>
  <ellipse cx="50" cy="50" rx="28" ry="22" fill="#ea580c"/>
  <!-- White Cheeks -->
  <path d="M26 48 C28 62 44 70 50 74 C56 70 72 62 74 48 C72 58 60 62 50 62 C40 62 28 58 26 48 Z" fill="#ffffff"/>
  <!-- Eyes -->
  <path d="M36 46 Q40 42 45 46" stroke="#431407" stroke-width="2.8" stroke-linecap="round" fill="none"/>
  <path d="M55 46 Q60 42 64 46" stroke="#431407" stroke-width="2.8" stroke-linecap="round" fill="none"/>
  <!-- Nose -->
  <circle cx="50" cy="62" r="3.5" fill="#1f2937"/>
  <!-- Cheeks -->
  <circle cx="34" cy="54" r="3.5" fill="#f87171" opacity="0.6"/>
  <circle cx="66" cy="54" r="3.5" fill="#f87171" opacity="0.6"/>
  <!-- Mini Boba Cup -->
  <rect x="44" y="68" width="12" height="15" rx="3" fill="#fed7aa" stroke="#9a3412" stroke-width="1.5"/>
  <rect x="49" y="63" width="2" height="7" rx="1" fill="#ea580c"/>
  <circle cx="48" cy="79" r="1.5" fill="#431407"/>
  <circle cx="52" cy="79" r="1.5" fill="#431407"/>
</svg>
`;

// 7. Beruang Madu (Honey Bear Boba)
const bearSvg = `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width="100" height="100">
  <circle cx="50" cy="50" r="48" fill="#fef08a" stroke="#fde047" stroke-width="2"/>
  <!-- Bear Round Ears -->
  <circle cx="28" cy="28" r="12" fill="#854d0e" stroke="#543109" stroke-width="2"/>
  <circle cx="28" cy="28" r="6" fill="#fef08a"/>
  <circle cx="72" cy="28" r="12" fill="#854d0e" stroke="#543109" stroke-width="2"/>
  <circle cx="72" cy="28" r="6" fill="#fef08a"/>
  <!-- Head -->
  <circle cx="50" cy="54" rx="32" ry="28" fill="#a16207" stroke="#543109" stroke-width="2.5"/>
  <!-- Snout -->
  <ellipse cx="50" cy="60" rx="14" ry="11" fill="#fef08a"/>
  <ellipse cx="50" cy="56" rx="4.5" ry="3" fill="#422006"/>
  <path d="M47 59 Q50 63 53 59" stroke="#422006" stroke-width="2" stroke-linecap="round" fill="none"/>
  <!-- Eyes -->
  <circle cx="38" cy="46" r="3.5" fill="#422006"/>
  <circle cx="39" cy="45" r="1.2" fill="#ffffff"/>
  <circle cx="62" cy="46" r="3.5" fill="#422006"/>
  <circle cx="61" cy="45" r="1.2" fill="#ffffff"/>
  <!-- Cheeks -->
  <circle cx="32" cy="56" r="4" fill="#f87171" opacity="0.6"/>
  <circle cx="68" cy="56" r="4" fill="#f87171" opacity="0.6"/>
  <!-- Mini Boba Cup -->
  <rect x="44" y="68" width="12" height="15" rx="3" fill="#fef08a" stroke="#784e2a" stroke-width="1.5"/>
  <rect x="49" y="63" width="2" height="7" rx="1" fill="#ea580c"/>
  <circle cx="48" cy="79" r="1.5" fill="#3d2411"/>
  <circle cx="52" cy="79" r="1.5" fill="#3d2411"/>
</svg>
`;

// 8. Penguin Matcha (Penguin Matcha Boba)
const penguinSvg = `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width="100" height="100">
  <circle cx="50" cy="50" r="48" fill="#dcfce7" stroke="#86efac" stroke-width="2"/>
  <!-- Head & Body (Dark Navy) -->
  <ellipse cx="50" cy="52" rx="31" ry="32" fill="#1e293b" stroke="#0f172a" stroke-width="2.5"/>
  <!-- White Face Heart -->
  <path d="M28 50 C28 36 42 36 50 44 C58 36 72 36 72 50 C72 68 62 76 50 78 C38 76 28 68 28 50 Z" fill="#ffffff"/>
  <!-- Round Sparkling Eyes -->
  <circle cx="40" cy="47" r="4" fill="#0f172a"/>
  <circle cx="41.5" cy="45.5" r="1.5" fill="#ffffff"/>
  <circle cx="60" cy="47" r="4" fill="#0f172a"/>
  <circle cx="58.5" cy="45.5" r="1.5" fill="#ffffff"/>
  <!-- Orange Beak -->
  <polygon points="46,52 54,52 50,59" fill="#f97316"/>
  <!-- Cheeks -->
  <circle cx="34" cy="53" r="3.5" fill="#fb7185" opacity="0.6"/>
  <circle cx="66" cy="53" r="3.5" fill="#fb7185" opacity="0.6"/>
  <!-- Matcha Latte Cup -->
  <rect x="44" y="68" width="12" height="15" rx="3" fill="#86efac" stroke="#15803d" stroke-width="1.5"/>
  <rect x="49" y="63" width="2" height="7" rx="1" fill="#16a34a"/>
  <circle cx="48" cy="79" r="1.5" fill="#14532d"/>
  <circle cx="52" cy="79" r="1.5" fill="#14532d"/>
</svg>
`;

export const CUTE_ANIMAL_MASCOTS = [
  {
    id: 'chacha-boba',
    name: 'Cha-Cha Boba',
    category: 'Maskot Utama',
    url: svgToDataUri(chaChaSvg)
  },
  {
    id: 'panda-boba',
    name: 'Panda Boba',
    category: 'Panda',
    url: svgToDataUri(pandaSvg)
  },
  {
    id: 'cat-boba',
    name: 'Kucing Boba',
    category: 'Kucing',
    url: svgToDataUri(catSvg)
  },
  {
    id: 'shiba-boba',
    name: 'Shiba Boba',
    category: 'Anjing',
    url: svgToDataUri(shibaSvg)
  },
  {
    id: 'bunny-taro',
    name: 'Kelinci Taro',
    category: 'Kelinci',
    url: svgToDataUri(bunnySvg)
  },
  {
    id: 'fox-boba',
    name: 'Rubah Boba',
    category: 'Rubah',
    url: svgToDataUri(foxSvg)
  },
  {
    id: 'bear-honey',
    name: 'Beruang Madu',
    category: 'Beruang',
    url: svgToDataUri(bearSvg)
  },
  {
    id: 'penguin-matcha',
    name: 'Penguin Matcha',
    category: 'Penguin',
    url: svgToDataUri(penguinSvg)
  }
];

export const DEFAULT_MASCOT_AVATAR = CUTE_ANIMAL_MASCOTS[0].url;
