import React from 'react';
import { Language } from '../types';
import { TRANSLATIONS } from '../constants';

interface HomeProps {
  lang: Language;
  onStart: () => void;
}

const Home: React.FC<HomeProps> = ({ lang, onStart }) => {
  const t = TRANSLATIONS[lang];

  return (
    <div className="space-y-16 animate-fadeIn pb-10">
      {/* Hero Section */}
      <section className="text-center space-y-6 max-w-4xl mx-auto py-12">
        <div className="inline-block px-4 py-1.5 mb-4 text-sm font-semibold tracking-wide text-blue-600 uppercase bg-blue-100 rounded-full">
          White Box Testing Portal
        </div>
        <h1 className="text-5xl md:text-7xl font-extrabold text-gray-900 leading-tight tracking-tight">
          {t.heroTitle}
        </h1>
        <p className="text-xl md:text-2xl text-gray-600 max-w-2xl mx-auto">
          {t.heroSub}
        </p>
        <div className="pt-8">
          <button 
            onClick={onStart}
            className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 px-10 rounded-full shadow-xl transition-all transform hover:scale-105 active:scale-95"
          >
            {t.startLearning}
          </button>
        </div>
      </section>

      {/* Intro Quote */}
      <section className="relative max-w-4xl mx-auto">
        <div className="absolute -top-4 -left-4 text-6xl text-blue-200 opacity-50 font-serif leading-none">“</div>
        <div className="bg-white p-10 rounded-3xl border border-blue-100 shadow-sm italic text-gray-700 text-lg md:text-xl leading-relaxed text-center relative z-10">
          {lang === 'ja' ? (
            <p>
              「みなさん、銀行のアプリを使っているとき、画面が止まったり、エラーが出たことはありませんか。<br/>
              その時、スマホには問題がなくても、アプリの中のプログラムにバグがあるかもしれません。」
            </p>
          ) : (
            <p>
              "Các bạn có bao giờ gặp trường hợp ứng dụng ngân hàng bị đứng hay báo lỗi chưa?<br/>
              Khi đó, dù điện thoại không có vấn đề gì, nhưng có thể có lỗi trong mã nguồn của ứng dụng."
            </p>
          )}
        </div>
        <div className="absolute -bottom-10 -right-4 text-6xl text-blue-200 opacity-50 font-serif leading-none">”</div>
      </section>

      {/* Presentation Goal */}
      <section className="max-w-3xl mx-auto bg-gray-900 p-12 rounded-[2.5rem] text-center text-white shadow-2xl">
        <h2 className="text-2xl font-bold mb-6">
          {lang === 'ja' ? '発表の目的' : 'Mục tiêu bài thuyết trình'}
        </h2>
        <p className="text-gray-300 text-lg leading-relaxed">
          {lang === 'ja' 
            ? 'このサイトでは、プログラムのロジックミスを見つけるための「ホワイトボックステスト」の基本を学びます。カバレッジの重要性や、ブラックボックステストとの違いを理解しましょう。' 
            : 'Trong trang web này, chúng ta sẽ học các kiến thức cơ bản về "Kiểm thử hộp trắng" để tìm lỗi logic trong chương trình. Hãy cùng tìm hiểu tầm quan trọng của độ bao phủ và sự khác biệt với kiểm thử hộp đen.'}
        </p>
      </section>
    </div>
  );
};

export default Home;