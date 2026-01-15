
import React from 'react';
import { Language } from '../types';

interface ComparisonProps {
  lang: Language;
}

const Comparison: React.FC<ComparisonProps> = ({ lang }) => {
  const data = [
    {
      label: lang === 'ja' ? "視点" : "Góc nhìn",
      white: lang === 'ja' ? "内部構造・ロジック" : "Cấu trúc nội bộ / Logic",
      black: lang === 'ja' ? "機能・ユーザー視点" : "Chức năng / Góc nhìn người dùng"
    },
    {
      label: lang === 'ja' ? "実行者" : "Người thực hiện",
      white: lang === 'ja' ? "開発者（エンジニア）" : "Lập trình viên (Engineer)",
      black: lang === 'ja' ? "テスター・第三者" : "Người kiểm thử (Tester)"
    },
    {
      label: lang === 'ja' ? "必要な知識" : "Kiến thức cần thiết",
      white: lang === 'ja' ? "プログラミング・詳細設計" : "Lập trình / Thiết kế chi tiết",
      black: lang === 'ja' ? "要件定義・機能仕様" : "Yêu cầu / Đặc tả chức năng"
    },
    {
      label: lang === 'ja' ? "テスト時期" : "Thời điểm kiểm thử",
      white: lang === 'ja' ? "単体テスト段階" : "Giai đoạn Unit Test",
      black: lang === 'ja' ? "システムテスト・受け入れ段階" : "Giai đoạn System Test / UAT"
    }
  ];

  return (
    <div className="max-w-4xl mx-auto space-y-12 animate-fadeIn">
      <div className="text-center space-y-4">
        <h2 className="text-3xl font-bold text-gray-900">
          {lang === 'ja' ? "ホワイトボックス vs ブラックボックス" : "So sánh Hộp trắng và Hộp đen"}
        </h2>
        <p className="text-gray-600 max-w-2xl mx-auto">
          {lang === 'ja' 
            ? "どちらも品質向上には欠かせないテスト手法ですが、そのアプローチは正反対です。" 
            : "Cả hai đều là những phương pháp kiểm thử không thể thiếu để nâng cao chất lượng, nhưng phương pháp tiếp cận thì hoàn toàn trái ngược nhau."}
        </p>
      </div>

      <div className="overflow-hidden rounded-2xl border border-gray-200 shadow-lg bg-white">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase tracking-wider"></th>
              <th className="px-6 py-4 text-center text-sm font-bold text-blue-700 bg-blue-50">
                {lang === 'ja' ? "ホワイトボックステスト" : "Kiểm thử hộp trắng"}
              </th>
              <th className="px-6 py-4 text-center text-sm font-bold text-gray-700">
                {lang === 'ja' ? "ブラックボックステスト" : "Kiểm thử hộp đen"}
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {data.map((row, i) => (
              <tr key={i} className="hover:bg-gray-50 transition-colors">
                <td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-gray-900 bg-gray-50">
                  {row.label}
                </td>
                <td className="px-6 py-4 text-sm text-gray-700 text-center bg-blue-50/30">
                  {row.white}
                </td>
                <td className="px-6 py-4 text-sm text-gray-700 text-center">
                  {row.black}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        <div className="bg-blue-100/50 p-6 rounded-2xl">
          <h4 className="font-bold text-blue-900 mb-2 flex items-center">
            <span className="mr-2">💡</span>
            {lang === 'ja' ? "ホワイトボックスの強み" : "Ưu điểm của Hộp trắng"}
          </h4>
          <p className="text-sm text-blue-800">
            {lang === 'ja' 
              ? "無駄なコードの発見や、複雑なロジックの漏れを防ぐのに非常に強力です。開発中の早い段階でバグを見つけることができます。" 
              : "Rất mạnh mẽ trong việc phát hiện mã nguồn dư thừa và ngăn chặn thiếu sót trong các logic phức tạp. Có thể tìm lỗi từ giai đoạn sớm của phát triển."}
          </p>
        </div>
        <div className="bg-gray-100 p-6 rounded-2xl">
          <h4 className="font-bold text-gray-900 mb-2 flex items-center">
            <span className="mr-2">🎯</span>
            {lang === 'ja' ? "ブラックボックスの強み" : "Ưu điểm của Hộp đen"}
          </h4>
          <p className="text-sm text-gray-800">
            {lang === 'ja' 
              ? "プログラムの中身を知らなくてもテストができ、ユーザーが実際にどう使うかに焦点を当てることができます。" 
              : "Có thể kiểm thử mà không cần biết nội dung bên trong, tập trung vào cách người dùng thực sự sử dụng sản phẩm."}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Comparison;
