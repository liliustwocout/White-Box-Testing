
import { TranslationSet, QuizQuestion, GlossaryItem } from './types';

export const TRANSLATIONS: Record<'ja' | 'vi', TranslationSet> = {
  ja: {
    navHome: "ホーム",
    navLearn: "学習",
    navCompare: "比較",
    navGlossary: "用語集",
    navQuiz: "クイズ",
    heroTitle: "ホワイトボックステスト",
    heroSub: "プログラムの内部構造を理解し、網羅率を高める手法",
    startLearning: "学習を始める",
    quizTitle: "知識チェッククイズ",
    leaderboard: "ランキング"
  },
  vi: {
    navHome: "Trang chủ",
    navLearn: "Học tập",
    navCompare: "So sánh",
    navGlossary: "Từ điển",
    navQuiz: "Kiểm tra",
    heroTitle: "Kiểm thử hộp trắng",
    heroSub: "Phương pháp hiểu cấu trúc bên trong chương trình để nâng cao chất lượng",
    startLearning: "Bắt đầu học",
    quizTitle: "Bài kiểm tra kiến thức",
    leaderboard: "Bảng xếp hạng"
  }
};

export const QUIZ_QUESTIONS: Record<'ja' | 'vi', QuizQuestion[]> = {
  ja: [
    {
      id: 1,
      question: "ホワイトボックステストの主な目的は何ですか？",
      options: ["外部インターフェースの確認", "プログラムの内部構造やロジックの確認", "ユーザーの使いやすさのテスト", "セキュリティ脆弱性のスキャン"],
      correctAnswer: 1
    },
    {
      id: 2,
      question: "網羅率（カバレッジ）が高いほど、どうなりますか？",
      options: ["プログラムが遅くなる", "テストの品質が低くなる", "テストの品質が高くなる", "バグが増える"],
      correctAnswer: 2
    },
    {
      id: 3,
      question: "すべての命令を少なくとも1回実行する網羅手法は何ですか？",
      options: ["判定条件網羅", "条件網羅", "複数条件網羅", "命令網羅"],
      correctAnswer: 3
    },
    {
      id: 4,
      question: "判定条件の真(True)と偽(False)の両方の道をテストするのはどの網羅手法ですか？",
      options: ["判定条件網羅", "命令網羅", "単体テスト", "結合テスト"],
      correctAnswer: 0
    },
    {
      id: 5,
      question: "ホワイトボックステストは主にどの段階で行われますか？",
      options: ["要件定義", "単体テスト（ユニットテスト）", "システムテスト", "運用保守"],
      correctAnswer: 1
    }
  ],
  vi: [
    {
      id: 1,
      question: "Mục đích chính của kiểm thử hộp trắng là gì?",
      options: ["Kiểm tra giao diện bên ngoài", "Kiểm tra cấu trúc và logic bên trong chương trình", "Kiểm tra tính dễ sử dụng của người dùng", "Quét lỗ hổng bảo mật"],
      correctAnswer: 1
    },
    {
      id: 2,
      question: "Độ bao phủ (Coverage) càng cao thì điều gì xảy ra?",
      options: ["Chương trình chạy chậm hơn", "Chất lượng kiểm thử thấp hơn", "Chất lượng kiểm thử cao hơn", "Phát sinh nhiều lỗi hơn"],
      correctAnswer: 2
    },
    {
      id: 3,
      question: "Loại bao phủ nào thực thi mọi câu lệnh ít nhất một lần?",
      options: ["Bao phủ nhánh", "Bao phủ điều kiện", "Bao phủ đa điều kiện", "Bao phủ câu lệnh"],
      correctAnswer: 3
    },
    {
      id: 4,
      question: "Loại bao phủ nào kiểm tra cả hai đường dẫn True và False?",
      options: ["Bao phủ nhánh", "Bao phủ câu lệnh", "Kiểm thử đơn vị", "Kiểm thử tích hợp"],
      correctAnswer: 0
    },
    {
      id: 5,
      question: "Kiểm thử hộp trắng chủ yếu được thực hiện ở giai đoạn nào?",
      options: ["Định nghĩa yêu cầu", "Kiểm thử đơn vị (Unit Test)", "Kiểm thử hệ thống", "Vận hành và bảo trì"],
      correctAnswer: 1
    }
  ]
};

export const GLOSSARY: GlossaryItem[] = [
  { ja: "ホワイトボックステスト", vi: "Kiểm thử hộp trắng", descJa: "プログラムの内部構造やロジックに注目してテストする方法。", descVi: "Phương pháp kiểm thử tập trung vào cấu trúc bên trong và logic của chương trình." },
  { ja: "ブラックボックステスト", vi: "Kiểm thử hộp đen", descJa: "システムの内部構造は考慮せず、入力に対して期待される出力が得られるかを確認するテスト。", descVi: "Kiểm thử xác nhận đầu ra mong muốn cho đầu vào mà không xem xét cấu trúc bên trong của hệ thống." },
  { ja: "ロジック", vi: "Logic", descJa: "プログラムが動くための論理的な流れや計算の手順。", descVi: "Luồng logic hoặc các bước tính toán để chương trình hoạt động." },
  { ja: "内部構造", vi: "Cấu trúc bên trong", descJa: "プログラムのソースコードや設計の仕組みのこと。", descVi: "Hệ thống mã nguồn và thiết kế bên trong của chương trình." },
  { ja: "網羅率", vi: "Độ bao phủ (Coverage)", descJa: "どのくらいコードをテストしたかを示す割合。一般にカバレッジとも呼ばれる。", descVi: "Tỷ lệ cho biết bao nhiêu phần của mã nguồn đã được kiểm thử." },
  { ja: "命令網羅", vi: "Bao phủ câu lệnh (Statement Coverage)", descJa: "すべての命令文を1回以上実行すること。C0網羅とも呼ばれる。", descVi: "Thực thi mọi câu lệnh hướng dẫn ít nhất một lần." },
  { ja: "判定条件網羅", vi: "Bao phủ nhánh (Branch Coverage)", descJa: "判定条件の真(True)と偽(False)をテストすること。C1網羅とも呼ばれる。", descVi: "Kiểm thử cả hai trường hợp đúng (True) và sai (False) của điều kiện quyết định." },
  { ja: "条件網羅", vi: "Bao phủ điều kiện (Condition Coverage)", descJa: "条件の中の個々の要素をテストすること。C2網羅とも呼ばれる。", descVi: "Kiểm thử từng yếu tố riêng lẻ trong một điều kiện phức hợp." },
  { ja: "複数条件網羅", vi: "Bao phủ đa điều kiện (Multiple Condition Coverage)", descJa: "すべての条件の組み合わせを網羅すること。", descVi: "Bao phủ tất cả các tổ hợp có thể có của các điều kiện." },
  { ja: "単体テスト", vi: "Kiểm thử đơn vị (Unit Test)", descJa: "個々の関数やメソッドが正しく動くかを確認するテスト。", descVi: "Kiểm thử để xác nhận từng hàm hoặc phương thức hoạt động chính xác." }
];
