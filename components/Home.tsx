
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
    <div className="space-y-16 animate-fadeIn">
      {/* Hero */}
      <section className="text-center space-y-6 max-w-3xl mx-auto py-12">
        <h1 className="text-4xl md:text-6xl font-extrabold text-gray-900 leading-tight">
          {t.heroTitle}
        </h1>
        <p className="text-xl text-gray-600">
          {t.heroSub}
        </p>
        <div className="pt-6">
          <button 
            onClick={onStart}
            className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 px-8 rounded-full shadow-lg transition-all transform hover:scale-105"
          >
            {t.startLearning}
          </button>
        </div>
      </section>

      {/* Intro Quote */}
      <section className="bg-blue-50 p-8 rounded-2xl border border-blue-100 italic text-gray-700 text-lg leading-relaxed text-center">
        {lang === 'ja' ? (
          <p>
            「みなさん、銀行のアプリを使っているとき、画面が止まったり、エラーが出たことはありませんか。
            その時、スマホには問題がなくても、アプリの中のプログラムにバグがあるかもしれません。」
          </p>
        ) : (
          <p>
            "Các bạn có bao giờ gặp trường hợp ứng dụng ngân hàng bị đứng hay báo lỗi chưa? 
            Khi đó, dù điện thoại không có vấn đề gì, nhưng có thể có lỗi trong mã nguồn của ứng dụng."
          </p>
        )}
      </section>

      {/* Presentation Goal Section */}
      <section className="max-w-2xl mx-auto bg-white p-10 rounded-3xl border border-gray-100 shadow-sm text-center">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          {lang === 'ja' ? '発表の目的' : 'Mục tiêu bài thuyết trình'}
        </h2>
        <p className="text-gray-600 leading-relaxed">
          {lang === 'ja' 
            ? 'このサイトでは、プログラムのロジックミスを見つけるための「ホワイトボックステスト」の基本を学びます。カバレッジの重要性や、ブラックボックステストとの違いを理解しましょう。' 
            : 'Trong trang web này, chúng ta sẽ học các kiến thức cơ bản về "Kiểm thử hộp trắng" để tìm lỗi logic trong chương trình. Hãy cùng tìm hiểu tầm quan trọng của độ bao phủ và sự khác biệt với kiểm thử hộp đen.'}
        </p>
      </section>
    </div>
  );
};

export default Home;
