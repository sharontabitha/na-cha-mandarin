// Web Service REST API untuk Na Cha (奶茶) Mandarin Learning
// Sesuai Ketentuan Modul 1 Praktikum: Web Service / REST API
import http from 'http';
import url from 'url';
import { 
  getVocabulariesByLevel, 
  getGrammarByLevel, 
  getReadingStoryByLevel, 
  getQuizByLevel,
  HSK_LEVELS_META,
  USER_PROFILE 
} from '../src/data/learningData.js';
import { DAILY_CONVERSATIONS } from '../src/data/conversationsData.js';
import { CUTE_ANIMAL_MASCOTS } from '../src/data/avatarsData.js';

const PORT = process.env.PORT || 3001;

// CORS & JSON Helper
const setHeaders = (res, statusCode = 200) => {
  res.writeHead(statusCode, {
    'Content-Type': 'application/json; charset=utf-8',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization'
  });
};

const server = http.createServer((req, res) => {
  const parsedUrl = url.parse(req.url, true);
  const pathname = parsedUrl.pathname;
  const query = parsedUrl.query;

  // Handle CORS Preflight
  if (req.method === 'OPTIONS') {
    setHeaders(res, 204);
    res.end();
    return;
  }

  // 1. Health Check
  if (pathname === '/api/health') {
    setHeaders(res, 200);
    res.end(JSON.stringify({
      status: 'success',
      message: 'Na Cha Mandarin REST API is active',
      platform: 'Progressive Web Apps (PWA)',
      version: '1.0.0',
      timestamp: new Date().toISOString()
    }));
    return;
  }

  // 2. GET /api/vocabularies?level=HSK 1&search=...
  if (pathname === '/api/vocabularies') {
    const level = query.level || 'HSK 1';
    let data = getVocabulariesByLevel(level);

    if (query.search) {
      const q = query.search.toLowerCase();
      data = data.filter(item => 
        item.hanzi.includes(q) || 
        item.pinyin.toLowerCase().includes(q) || 
        (item.indonesian && item.indonesian.toLowerCase().includes(q))
      );
    }

    setHeaders(res, 200);
    res.end(JSON.stringify({
      status: 'success',
      level,
      total: data.length,
      data
    }));
    return;
  }

  // 3. GET /api/vocabularies/:id
  if (pathname.startsWith('/api/vocabularies/')) {
    const id = pathname.replace('/api/vocabularies/', '');
    const allVocabs = [
      ...getVocabulariesByLevel('HSK 1'),
      ...getVocabulariesByLevel('HSK 2'),
      ...getVocabulariesByLevel('HSK 3')
    ];
    const found = allVocabs.find(v => String(v.id) === id);

    if (found) {
      setHeaders(res, 200);
      res.end(JSON.stringify({ status: 'success', data: found }));
    } else {
      setHeaders(res, 404);
      res.end(JSON.stringify({ status: 'error', message: 'Kosakata tidak ditemukan' }));
    }
    return;
  }

  // 4. GET /api/grammar?level=HSK 1
  if (pathname === '/api/grammar') {
    const level = query.level || 'HSK 1';
    const data = getGrammarByLevel(level);
    setHeaders(res, 200);
    res.end(JSON.stringify({
      status: 'success',
      level,
      data
    }));
    return;
  }

  // 5. GET /api/stories?level=HSK 1
  if (pathname === '/api/stories') {
    const level = query.level || 'HSK 1';
    const data = getReadingStoryByLevel(level);
    setHeaders(res, 200);
    res.end(JSON.stringify({
      status: 'success',
      level,
      data
    }));
    return;
  }

  // 6. GET /api/conversations
  if (pathname === '/api/conversations') {
    setHeaders(res, 200);
    res.end(JSON.stringify({
      status: 'success',
      total: DAILY_CONVERSATIONS.length,
      data: DAILY_CONVERSATIONS
    }));
    return;
  }

  // 7. GET /api/conversations/:category
  if (pathname.startsWith('/api/conversations/')) {
    const category = decodeURIComponent(pathname.replace('/api/conversations/', ''));
    const found = DAILY_CONVERSATIONS.find(c => c.category.toLowerCase() === category.toLowerCase());

    if (found) {
      setHeaders(res, 200);
      res.end(JSON.stringify({ status: 'success', data: found }));
    } else {
      setHeaders(res, 404);
      res.end(JSON.stringify({ status: 'error', message: 'Kategori percakapan tidak ditemukan' }));
    }
    return;
  }

  // 8. GET /api/quizzes?level=HSK 1
  if (pathname === '/api/quizzes') {
    const level = query.level || 'HSK 1';
    const data = getQuizByLevel(level);
    setHeaders(res, 200);
    res.end(JSON.stringify({
      status: 'success',
      level,
      data
    }));
    return;
  }

  // 9. GET /api/about
  if (pathname === '/api/about') {
    setHeaders(res, 200);
    res.end(JSON.stringify({
      status: 'success',
      app: {
        name: 'Na Cha (奶茶)',
        title: 'Aplikasi Pembelajaran Bahasa Mandarin HSK 1–3',
        platform: 'Progressive Web Apps (PWA)',
        version: '1.0.0',
        description: 'Aplikasi pembelajaran Mandarin interaktif dengan Spaced Repetition System (SRS), audio native sintetis, evaluasi kuis mock exam, dan Progressive Web Apps offline capabilities.'
      },
      practicum: {
        course: 'Praktikum Pemrograman Mobile / Web Service',
        task: 'Tugas Akhir Praktikum',
        moduleRef: 'Modul 1 (RESTful Web Service API)',
        year: '2026'
      },
      endpoints: [
        'GET /api/health',
        'GET /api/vocabularies?level=HSK 1',
        'GET /api/vocabularies/:id',
        'GET /api/grammar?level=HSK 1',
        'GET /api/stories?level=HSK 1',
        'GET /api/conversations',
        'GET /api/conversations/:category',
        'GET /api/quizzes?level=HSK 1',
        'GET /api/about'
      ]
    }));
    return;
  }

  // 404 Not Found
  setHeaders(res, 404);
  res.end(JSON.stringify({
    status: 'error',
    message: 'Endpoint tidak ditemukan',
    availableEndpoints: ['/api/health', '/api/vocabularies', '/api/grammar', '/api/stories', '/api/conversations', '/api/quizzes', '/api/about']
  }));
});

server.listen(PORT, () => {
  console.log(`🍵 Na Cha REST API Server running at http://localhost:${PORT}`);
  console.log(`📡 Endpoints available: /api/health, /api/vocabularies, /api/grammar, /api/stories, /api/conversations, /api/quizzes, /api/about`);
});
