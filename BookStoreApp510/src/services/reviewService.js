import client from '../api/axiosClient';

// GET /reviews?bookId=3&_sort=createdAt&_order=desc
export async function getReviewsByBook(bookId) {
  const { data } = await client.get('/reviews', {
    params: { bookId, _sort: 'createdAt', _order: 'desc' },
  });
  return data;
}

// POST /reviews — route 644: cần token VÀ userId trong body phải trùng chủ token (nếu không: 403)
export async function createReview({ bookId, userId, userName, rating, comment }) {
  const { data } = await client.post('/reviews', {
    bookId: Number(bookId),
    userId,
    userName,
    rating,
    comment,
    createdAt: new Date().toISOString(),
  });
  return data; // bản ghi vừa tạo (có id mới)
}

// DELETE /reviews/:id — server tự chặn review của người khác bằng 403
export async function deleteReview(id) {
  await client.delete(`/reviews/${id}`);
}
