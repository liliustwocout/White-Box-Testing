
import React, { useState } from 'react';
import { Language, QuizResult } from '../types';
import { QUIZ_QUESTIONS } from '../constants';
import { database } from '../services/database';

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
  const [isSaving, setIsSaving] = useState(false);

  const questions = QUIZ_QUESTIONS[lang];

  const handleStart = () => {
    if (userName.trim()) {
      setIsStarted(true);
    }
  };

  const handleAnswer = async (selectedIndex: number) => {
    const isCorrect = selectedIndex === questions[currentIndex].correctAnswer;
    const newScore = isCorrect ? score + 1 : score;
    
    if (isCorrect) {
      setScore(newScore);
    }

    if (currentIndex + 1 < questions.length) {
      setCurrentIndex(prev => prev + 1);
    } else {
      setIsFinished(true);
      setIsSaving(true);
      await database.saveResult({
        name: userName,
        score: newScore,
        date: new Date().toLocaleString()
      });
      setIsSaving(false);
    }
  };

  if (!isStarted) {
    return (
      <div className="max-w-md mx-auto bg-white p-10 rounded-[2rem] shadow-2xl border border-gray-100 animate-fadeIn text-center space-y-8 mt-10">
        <div className="w-24 h-24 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center mx-auto text-4xl shadow-inner">
          🚀
        </div>
        <div className="space-y-2">
          <h2 className="text-3xl font-black text-gray-900 tracking-tight">
            {lang === 'ja' ? "クイズを開始" : "Bắt đầu Quiz"}
          </h2>
          <p className="text-gray-500 font-medium">
            {lang === 'ja' ? "知識を試してみましょう！" : "Hãy kiểm tra kiến thức của bạn!"}
          </p>
        </div>
        
        <div className="space-y-4">
          <label className="block text-left text-xs font-bold text-gray-400 uppercase tracking-widest ml-1">
            {lang === 'ja' ? "あなたの名前" : "Tên của bạn"}
          </label>
          <input
            type="text"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleStart()}
            placeholder={lang === 'ja' ? "例：田中" : "Ví dụ: Nguyễn Văn A"}
            className="w-full px-5 py-4 rounded-2xl border-2 border-gray-100 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 outline-none transition-all font-bold text-lg"
          />
        </div>

        <button
          onClick={handleStart}
          disabled={!userName.trim()}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-black py-5 rounded-2xl shadow-xl shadow-blue-200 disabled:opacity-50 disabled:shadow-none transition-all active:scale-95 text-lg"
        >
          {lang === 'ja' ? "スタート！" : "BẮT ĐẦU NGAY"}
        </button>
      </div>
    );
  }

  if (isFinished) {
    return (
      <div className="max-w-md mx-auto bg-white p-12 rounded-[3rem] shadow-2xl border border-gray-100 animate-bounceIn text-center space-y-8 mt-10">
        <div className="relative">
          <div className="text-7xl mb-4 animate-bounce">🏆</div>
          <div className="absolute top-0 left-0 w-full h-full animate-ping opacity-20 bg-yellow-400 rounded-full"></div>
        </div>
        
        <div className="space-y-2">
          <h2 className="text-3xl font-black text-gray-900">
            {lang === 'ja' ? "素晴らしい！" : "Hoàn thành!"}
          </h2>
          <p className="text-lg text-gray-500 font-medium">
            {userName}, {lang === 'ja' ? "あなたの結果は:" : "Kết quả của bạn là:"}
          </p>
        </div>
        
        <div className="py-8 bg-blue-50 rounded-3xl border-2 border-blue-100 border-dashed">
          <div className="text-7xl font-black text-blue-600">
            {score} <span className="text-2xl text-blue-400">/ {questions.length}</span>
          </div>
        </div>

        <button
          onClick={onComplete}
          disabled={isSaving}
          className="w-full bg-green-500 hover:bg-green-600 text-white font-black py-5 rounded-2xl shadow-xl shadow-green-100 transition-all active:scale-95 text-lg"
        >
          {isSaving ? "Saving..." : (lang === 'ja' ? "ランキングを見る" : "XEM BẢNG XẾP HẠNG")}
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto space-y-8 animate-fadeIn mt-6">
      <div className="flex items-center justify-between px-4">
        <div className="flex items-center space-x-3">
          <span className="bg-blue-600 text-white text-xs font-black px-3 py-1 rounded-full uppercase tracking-tighter">
            Question {currentIndex + 1}
          </span>
          <span className="text-gray-400 font-bold text-sm">of {questions.length}</span>
        </div>
        <div className="h-3 w-40 bg-gray-100 rounded-full overflow-hidden border border-gray-50">
          <div 
            className="h-full bg-gradient-to-r from-blue-400 to-blue-600 transition-all duration-500 ease-out shadow-inner" 
            style={{ width: `${((currentIndex + 1) / questions.length) * 100}%` }}
          />
        </div>
      </div>

      <div className="bg-white p-10 md:p-14 rounded-[3rem] shadow-2xl border border-gray-50 space-y-10 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-2 h-full bg-blue-600"></div>
        <h3 className="text-2xl md:text-3xl font-black text-gray-900 leading-tight">
          {questions[currentIndex].question}
        </h3>

        <div className="grid gap-4">
          {questions[currentIndex].options.map((opt, i) => (
            <button
              key={i}
              onClick={() => handleAnswer(i)}
              className="w-full text-left p-6 rounded-2xl border-2 border-gray-100 hover:border-blue-500 hover:bg-blue-50/50 transition-all group flex items-center shadow-sm hover:shadow-md"
            >
              <div className="w-10 h-10 rounded-xl border-2 border-gray-100 mr-5 flex items-center justify-center font-black text-gray-400 group-hover:bg-blue-600 group-hover:text-white group-hover:border-blue-600 transition-all shadow-inner">
                {String.fromCharCode(65 + i)}
              </div>
              <span className="text-gray-700 font-bold text-lg group-hover:text-blue-900">{opt}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Quiz;
