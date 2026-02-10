export interface VocabWord {
  id: string;
  rank: number;
  english: string;
  hanzi: string;
  pinyin: string;
  pos?: string;
  tags?: string[];
  example?: {
    zh: string;
    pinyin?: string;
    en?: string;
  };
}

export interface GameSettings {
  userName: string;
  showPinyin: boolean;
  showHanzi: boolean;
  includeMeasureWords: boolean;
}

export interface WordResult {
  word: VocabWord;
  correct: boolean;
}

export interface RoundData {
  roundNumber: number;
  words: VocabWord[];
  results: WordResult[];
  startTime: number;
  endTime?: number;
}

export type GamePhase = 'landing' | 'playing' | 'summary';
