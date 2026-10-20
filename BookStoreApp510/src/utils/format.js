export function formatPrice(n) {
  const value = Math.round(Number(n) || 0);
  return String(value).replace(/\B(?=(\d{3})+(?!\d))/g, '.') + 'đ';
}

export function formatDate(iso) {
  const d = new Date(iso);
  if (isNaN(d.getTime())) return '';
  const dd = String(d.getDate()).padStart(2, '0');
  const mm = String(d.getMonth() + 1).padStart(2, '0');
  return `${dd}/${mm}/${d.getFullYear()}`;
}

// Điểm trung bình từ mảng review (làm tròn 1 chữ số thập phân)
export function averageRating(reviews = []) {
  if (!reviews.length) return 0;
  const sum = reviews.reduce((s, r) => s + Number(r.rating || 0), 0);
  return Math.round((sum / reviews.length) * 10) / 10;
}

// Bỏ dấu tiếng Việt để tìm kiếm không phân biệt dấu
export function normalizeText(s) {
  return String(s || '')
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/đ/g, 'd');
}
