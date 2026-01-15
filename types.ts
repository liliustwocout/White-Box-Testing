
export type Language = 'ja' | 'vi';

export interface TranslationSet {
  navHome: string;
  navLearn: string;
  navCompare: string;
  navGlossary: string;
  navQuiz: string;
  heroTitle: string;
  heroSub: string;
  startLearning: string;
  quizTitle: string;
  leaderboard: string;
}

export interface QuizQuestion {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number;
}

export interface QuizResult {
  name: string;
  score: number;
  date: string;
}

export interface GlossaryItem {
  ja: string;
  vi: string;
  descJa: string;
  descVi: string;
}
