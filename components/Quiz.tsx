import React, { useState } from 'react';
import { Language, QuizResult } from '../types';
import { QUIZ_QUESTIONS } from '../constants';

interface QuizProps {
  lang: Language;
  onComplete: () => void;
}

const Quiz: React.FC<QuizProps> = ({ lang, onComplete }) => {
  const [userName, setUserName] = useState('');
  const [isStarted, setIsStarted] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [isFinished, setIsFinished] = useState(false);

  const questions = QUIZ_QUESTIONS[lang];

  const handleStart = () => {
    if (userName.trim()) {
      setIsStarted(true);
    }
  };

  const handleAnswer = (selectedIndex: number) => {
    const isCorrect = selectedIndex === questions[currentIndex].correctAnswer;
    const newScore = isCorrect ? score + 1 : score;
    
    if (isCorrect) {
      setScore(newScore);
    }

    if (currentIndex + 1 < questions.length) {
      setCurrentIndex(prev => prev + 1);
    } else {
      setIsFinished(true);
      saveResult(userName, newScore);
    }
  };

  const saveResult = (name: string, finalScore: number) => {
    // Note: In a production app with a backend, we'd use SQLite/Postgres here.
    // For this educational prototype, we persist to localStorage.
    const existing: QuizResult[] = JSON.parse(localStorage.getItem('whitebox_results') || '[]');
    const newResult: QuizResult = {
      name: name,
      score: finalScore,
      date: new Date().toLocaleString()
    };
    localStorage.setItem('whitebox_results', JSON.stringify([...existing, newResult]));
  };

  if (!isStarted) {
    return (
      <div className="max-w-md mx-auto bg-white p-8 rounded-3xl shadow-xl border border-gray-100 animate-fadeIn text-center space-y-6 mt-10">
        <div className="w-20 h-20 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mx-auto text-3xl">
          ✏️
        </div>
        <h2 className="text-2xl font-bold text-gray-900">
          {lang === 'ja' ? "クイズを始める" : "Bắt đầu kiểm tra"}
        </h2>
        <p className="text-gray-600">
          {lang === 'ja' ? "あなたの名前を入力してください。" : "Vui lòng nhập tên của bạn."}
        </p>
        <input
          type="text"
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleStart()}
          placeholder={lang === 'ja' ? "名前..." : "Tên..."}
          className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-500 outline-none transition-all"
        />
        <button
          onClick={handleStart}
          disabled={!userName.trim()}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-xl shadow-lg disabled:opacity-50 transition-all active:scale-95"
        >
          {lang === 'ja' ? "スタート！" : "Bắt đầu!"}
        </button>
      </div>
    );
  }

  if (isFinished) {
    return (
      <div className="max-w-md mx-auto bg-white p-12 rounded-3xl shadow-xl border border-gray-100 animate-bounceIn text-center space-y-8 mt-10">
        <div className="space-y-2">
          <div className="text-6xl mb-4">🎉</div>
          <h2 className="text-3xl font-extrabold text-gray-900">
            {lang === 'ja' ? "お疲れ様でした！" : "Hoàn thành!"}
          </h2>
          <p className="text-xl text-gray-600">
            {userName}, {lang === 'ja' ? "あなたのスコアは:" : "Điểm của bạn là:"}
          </p>
        </div>
        
        <div className="text-7xl font-black text-blue-600">
          {score} / {questions.length}
        </div>

        <button
          onClick={onComplete}
          className="w-full bg-green-500 hover:bg-green-600 text-white font-bold py-4 rounded-2xl shadow-lg transition-all active:scale-95"
        >
          {lang === 'ja' ? "ランキングを見る" : "Xem bảng xếp hạng"}
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto space-y-8 animate-fadeIn mt-6">
      <div className="flex items-center justify-between px-2">
        <div className="text-gray-500 font-medium">
          Question {currentIndex + 1} of {questions.length}
        </div>
        <div className="h-2 w-32 bg-gray-200 rounded-full overflow-hidden">
          <div 
            className="h-full bg-blue-500 transition-all duration-300" 
            style={{ width: `${((currentIndex + 1) / questions.length) * 100}%` }}
          />
        </div>
      </div>

      <div className="bg-white p-8 md:p-12 rounded-3xl shadow-xl border border-gray-100 space-y-8">
        <h3 className="text-2xl font-bold text-gray-900 leading-tight">
          {questions[currentIndex].question}
        </h3>

        <div className="grid gap-4">
          {questions[currentIndex].options.map((opt, i) => (
            <button
              key={i}
              onClick={() => handleAnswer(i)}
              className="w-full text-left p-5 rounded-2xl border-2 border-gray-100 hover:border-blue-500 hover:bg-blue-50 transition-all group flex items-center"
            >
              <div className="w-8 h-8 rounded-full border-2 border-gray-200 mr-4 flex items-center justify-center font-bold text-sm group-hover:bg-blue-500 group-hover:text-white group-hover:border-blue-500 transition-all">
                {String.fromCharCode(65 + i)}
              </div>
              <span className="text-gray-700 font-medium group-hover:text-blue-700">{opt}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Quiz;