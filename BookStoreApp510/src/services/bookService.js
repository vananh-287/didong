import client from '../api/axiosClient';
import { normalizeText } from '../utils/format';

// getBooks({ category, q }): lọc thể loại ngay trên server (so khớp chính xác),
// lọc từ khóa (tên/tác giả, không phân biệt dấu) ở service.
export async function getBooks(params = {}) {
  const { q, category } = params;
  const query = {};
  if (category) query.category = category;

  const { data } = await client.get('/books', { params: query });

  const keyword = normalizeText(q).trim();
  if (!keyword) return data;
  return data.filter(
    (b) =>
      normalizeText(b.title).includes(keyword) ||
      normalizeText(b.author).includes(keyword)
  );
}

export async function getBookById(id) {
  const { data } = await client.get(`/books/${id}`);
  return data;
}

// Sách liên quan: lọc NGAY TRÊN SERVER
//   category=... : cùng thể loại   id_ne=... : trừ sách hiện tại   _limit : tối đa N cuốn
export async function getRelated(book, limit = 10) {
  const { data } = await client.get('/books', {
    params: { category: book.category, id_ne: book.id, _limit: limit },
  });
  return data;
}
