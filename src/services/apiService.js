// API Service untuk menghubungkan Na Cha ke Web Service REST API
// Memenuhi Ketentuan Modul 1: Web Service (REST API)
// Dilengkapi auto-fallback ke data lokal jika server offline/terputus.

import { 
  getVocabulariesByLevel, 
  getGrammarByLevel, 
  getReadingStoryByLevel, 
  getQuizByLevel 
} from '../data/learningData';
import { DAILY_CONVERSATIONS } from '../data/conversationsData';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001/api';

class ApiService {
  constructor() {
    this.isServerOnline = null;
  }

  // 1. Health check to determine if the local Web Service is active
  async checkHealth() {
    try {
      const res = await fetch(`${API_BASE_URL}/health`, { method: 'GET', signal: AbortSignal.timeout(1500) });
      if (res.ok) {
        const json = await res.json();
        this.isServerOnline = true;
        return { online: true, data: json };
      }
    } catch (e) {
      this.isServerOnline = false;
    }
    return { online: false, message: 'Menggunakan data lokal terintegrasi' };
  }

  // 2. GET /api/vocabularies?level=...
  async getVocabularies(level = 'HSK 1', search = '') {
    try {
      const queryParams = new URLSearchParams({ level });
      if (search) queryParams.append('search', search);

      const res = await fetch(`${API_BASE_URL}/vocabularies?${queryParams.toString()}`, {
        method: 'GET',
        signal: AbortSignal.timeout(2000)
      });
      if (res.ok) {
        const json = await res.json();
        this.isServerOnline = true;
        return json.data;
      }
    } catch (err) {
      this.isServerOnline = false;
    }

    // Fallback: Data lokal
    let list = getVocabulariesByLevel(level);
    if (search) {
      const q = search.toLowerCase();
      list = list.filter(item => 
        item.hanzi.includes(q) || 
        item.pinyin.toLowerCase().includes(q) || 
        (item.indonesian && item.indonesian.toLowerCase().includes(q))
      );
    }
    return list;
  }

  // 3. GET /api/vocabularies/:id
  async getVocabularyDetail(id) {
    try {
      const res = await fetch(`${API_BASE_URL}/vocabularies/${id}`, {
        method: 'GET',
        signal: AbortSignal.timeout(2000)
      });
      if (res.ok) {
        const json = await res.json();
        return json.data;
      }
    } catch (e) {
      // ignore
    }

    const all = [
      ...getVocabulariesByLevel('HSK 1'),
      ...getVocabulariesByLevel('HSK 2'),
      ...getVocabulariesByLevel('HSK 3')
    ];
    return all.find(v => String(v.id) === String(id)) || null;
  }

  // 4. GET /api/grammar?level=...
  async getGrammar(level = 'HSK 1') {
    try {
      const res = await fetch(`${API_BASE_URL}/grammar?level=${encodeURIComponent(level)}`, {
        method: 'GET',
        signal: AbortSignal.timeout(2000)
      });
      if (res.ok) {
        const json = await res.json();
        return json.data;
      }
    } catch (e) {
      // ignore
    }
    return getGrammarByLevel(level);
  }

  // 5. GET /api/stories?level=...
  async getStory(level = 'HSK 1') {
    try {
      const res = await fetch(`${API_BASE_URL}/stories?level=${encodeURIComponent(level)}`, {
        method: 'GET',
        signal: AbortSignal.timeout(2000)
      });
      if (res.ok) {
        const json = await res.json();
        return json.data;
      }
    } catch (e) {
      // ignore
    }
    return getReadingStoryByLevel(level);
  }

  // 6. GET /api/conversations
  async getConversations() {
    try {
      const res = await fetch(`${API_BASE_URL}/conversations`, {
        method: 'GET',
        signal: AbortSignal.timeout(2000)
      });
      if (res.ok) {
        const json = await res.json();
        return json.data;
      }
    } catch (e) {
      // ignore
    }
    return DAILY_CONVERSATIONS;
  }

  // 7. GET /api/conversations/:category
  async getConversationDetail(category) {
    try {
      const res = await fetch(`${API_BASE_URL}/conversations/${encodeURIComponent(category)}`, {
        method: 'GET',
        signal: AbortSignal.timeout(2000)
      });
      if (res.ok) {
        const json = await res.json();
        return json.data;
      }
    } catch (e) {
      // ignore
    }
    return DAILY_CONVERSATIONS.find(c => c.category.toLowerCase() === category.toLowerCase()) || DAILY_CONVERSATIONS[0];
  }

  // 8. GET /api/quizzes?level=...
  async getQuiz(level = 'HSK 1') {
    try {
      const res = await fetch(`${API_BASE_URL}/quizzes?level=${encodeURIComponent(level)}`, {
        method: 'GET',
        signal: AbortSignal.timeout(2000)
      });
      if (res.ok) {
        const json = await res.json();
        return json.data;
      }
    } catch (e) {
      // ignore
    }
    return getQuizByLevel(level);
  }

  // 9. GET /api/about
  async getAbout() {
    try {
      const res = await fetch(`${API_BASE_URL}/about`, {
        method: 'GET',
        signal: AbortSignal.timeout(2000)
      });
      if (res.ok) {
        const json = await res.json();
        return json;
      }
    } catch (e) {
      // ignore
    }
    return {
      status: 'success',
      app: {
        name: 'Na Cha (奶茶)',
        title: 'Aplikasi Pembelajaran Bahasa Mandarin HSK 1–3',
        platform: 'Progressive Web Apps (PWA)',
        version: '1.0.0'
      }
    };
  }
}

export const apiService = new ApiService();
