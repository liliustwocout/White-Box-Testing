
import React, { useState } from 'react';
import { Language } from '../types';

interface LearningContentProps {
  lang: Language;
}

const LearningContent: React.FC<LearningContentProps> = ({ lang }) => {
  const [activeSlide, setActiveSlide] = useState(0);

  const slides = [
    {
      title: lang === 'ja' ? "ホワイトボックステストとは" : "Kiểm thử hộp trắng là gì?",
      content: lang === 'ja' ? [
        "プログラムの内部構造やロジックに注目してテストする方法です。",
        "目的は、プログラムの内部構造を網羅的に確認することです。",
        "プログラミングの知識があるエンジニアが行い、主に単体テスト（ユニットテスト）で使われます。"
      ] : [
        "Là phương pháp kiểm thử tập trung vào cấu trúc bên trong và logic của chương trình.",
        "Mục đích là để kiểm tra một cách toàn diện cấu trúc nội bộ của chương trình.",
        "Được thực hiện bởi các kỹ sư có kiến thức lập trình, chủ yếu trong giai đoạn kiểm thử đơn vị (Unit Test)."
      ],
      icon: "🔍"
    },
    {
      title: lang === 'ja' ? "カバレッジとは" : "Độ bao phủ (Coverage) là gì?",
      content: lang === 'ja' ? [
        "カバレッジは、「どのくらいコードをテストしたか」という意味です。",
        "いろいろなレベル（種類）のカバレッジがあります。",
        "一般的に、カバレッジが高いほど、テストの品質も高くなります。"
      ] : [
        "Bao phủ có nghĩa là 'chúng ta đã kiểm tra bao nhiêu mã nguồn'.",
        "Có nhiều mức độ (loại) bao phủ khác nhau.",
        "Thông thường, độ bao phủ càng cao thì chất lượng kiểm thử càng tốt."
      ],
      icon: "📊"
    },
    {
      title: lang === 'ja' ? "文カバレッジ (Statement Coverage)" : "Bao phủ câu lệnh (Statement Coverage)",
      content: lang === 'ja' ? [
        "目的：すべての文を1回以上実行すること。",
        "特徴：簡単で分かりやすいが、条件の中までは詳しく分かりません。",
        "例：if文の中の行が1回でも実行されればOKです。"
      ] : [
        "Mục đích: Thực thi mọi câu lệnh ít nhất một lần.",
        "Đặc điểm: Đơn giản và dễ hiểu, nhưng không đi sâu vào chi tiết các điều kiện.",
        "Ví dụ: Chỉ cần các dòng mã bên trong câu lệnh 'if' được chạy một lần là đạt."
      ],
      icon: "📝"
    },
    {
      title: lang === 'ja' ? "分岐カバレッジ (Branch Coverage)" : "Bao phủ nhánh (Branch Coverage)",
      content: lang === 'ja' ? [
        "目的：条件のTrueとFalseの両方をテストすること。",
        "特徴：if文の2つの「道」を確認します。文カバレッジより品質が高いです。",
        "例：条件が成り立つ時と成り立たない時の両方をテストします。"
      ] : [
        "Mục đích: Kiểm tra cả hai trường hợp True và False của điều kiện.",
        "Đặc điểm: Kiểm tra hai 'nhánh' của câu lệnh 'if'. Chất lượng cao hơn bao phủ câu lệnh.",
        "Ví dụ: Kiểm tra cả khi điều kiện thỏa mãn và khi nó không thỏa mãn."
      ],
      icon: "🌿"
    },
    {
      title: lang === 'ja' ? "条件カバレッジ (Condition Coverage)" : "Bao phủ điều kiện (Condition Coverage)",
      content: lang === 'ja' ? [
        "目的：条件の中のそれぞれの要素をテストすること。",
        "特徴：複合的な条件(A and Bなど)を個別に確認します。バグを見つけやすくなります。",
        "例：A=True, B=Falseなどをテストします。"
      ] : [
        "Mục đích: Kiểm thử từng thành phần riêng lẻ trong một điều kiện.",
        "Đặc điểm: Kiểm tra riêng biệt các yếu tố (ví dụ A và B). Giúp dễ dàng tìm thấy lỗi hơn.",
        "Ví dụ: Thử nghiệm với các tổ hợp như A=True, B=False."
      ],
      icon: "⚙️"
    },
    {
      title: lang === 'ja' ? "複数条件カバレッジ (Multiple Condition)" : "Bao phủ đa điều kiện (Multiple Condition)",
      content: lang === 'ja' ? [
        "目的：すべての条件の組み合わせをテストすること。",
        "特徴：すべてのパターンを確認するため、最もテスト品質が高いです。",
        "例：AとBの全4パターンをすべてテストします。"
      ] : [
        "Mục đích: Kiểm thử tất cả các tổ hợp kết hợp của mọi điều kiện.",
        "Đặc điểm: Kiểm tra tất cả các mẫu, đây là phương pháp có chất lượng kiểm thử cao nhất.",
        "Ví dụ: Kiểm tra toàn bộ 4 trường hợp có thể xảy ra của A và B."
      ],
      icon: "💎"
    }
  ];

  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-fadeIn">
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-3xl font-bold text-gray-900">
          {lang === 'ja' ? "学習コンテンツ" : "Nội dung học tập"}
        </h2>
        <div className="text-sm font-medium text-gray-500">
          {activeSlide + 1} / {slides.length}
        </div>
      </div>

      <div className="bg-white rounded-3xl shadow-xl overflow-hidden border border-gray-100 flex flex-col md:flex-row min-h-[400px]">
        {/* Left Indicator */}
        <div className="bg-blue-600 md:w-24 flex items-center justify-center py-6 md:py-0 text-white text-5xl">
          {slides[activeSlide].icon}
        </div>

        {/* Content Area */}
        <div className="p-8 md:p-12 flex-1 space-y-6">
          <div className="space-y-2">
            <h3 className="text-2xl font-bold text-gray-900">{slides[activeSlide].title}</h3>
          </div>
          
          <ul className="space-y-4">
            {slides[activeSlide].content.map((text, i) => (
              <li key={i} className="flex items-start space-x-3 text-gray-700 leading-relaxed">
                <span className="mt-1.5 w-2 h-2 rounded-full bg-blue-500 flex-shrink-0" />
                <span>{text}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="flex justify-between items-center">
        <button
          onClick={() => setActiveSlide(prev => Math.max(0, prev - 1))}
          disabled={activeSlide === 0}
          className="px-6 py-2 rounded-lg font-bold border border-gray-300 disabled:opacity-30 hover:bg-gray-50 transition-colors"
        >
          {lang === 'ja' ? "戻る" : "Quay lại"}
        </button>
        <div className="flex space-x-2">
          {slides.map((_, i) => (
            <div 
              key={i} 
              className={`h-2 rounded-full transition-all duration-300 ${activeSlide === i ? 'w-8 bg-blue-600' : 'w-2 bg-gray-300 cursor-pointer'}`}
              onClick={() => setActiveSlide(i)}
            />
          ))}
        </div>
        <button
          onClick={() => setActiveSlide(prev => Math.min(slides.length - 1, prev + 1))}
          disabled={activeSlide === slides.length - 1}
          className="px-6 py-2 rounded-lg font-bold bg-blue-600 text-white disabled:opacity-30 hover:bg-blue-700 transition-colors"
        >
          {lang === 'ja' ? "次へ" : "Tiếp theo"}
        </button>
      </div>
    </div>
  );
};

export default LearningContent;
