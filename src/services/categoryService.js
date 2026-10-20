import client from '../api/axiosClient';

const ICONS = { 'Văn học': '📖', 'Kinh tế': '💼', 'Kỹ năng': '🌱', 'Thiếu nhi': '🧸' };

// API chỉ có users/books/reviews → thể loại được lấy từ trường `category` của sách.
// id của mỗi thể loại chính là tên (vì API lọc theo ?category=<tên>).
export async function getCategories() {
  const { data } = await client.get('/books');
  const names = [...new Set(data.map((b) => b.category))];
  return names.map((name) => ({ id: name, name, icon: ICONS[name] ?? '📚' }));
}
