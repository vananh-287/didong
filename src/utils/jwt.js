// Đọc payload JWT (không cần thư viện). Payload chỉ được mã hoá base64url, KHÔNG phải bí mật.
const CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/';

function base64Decode(input) {
  const str = input.replace(/-/g, '+').replace(/_/g, '/');
  let out = '';
  let buffer = 0;
  let bits = 0;
  for (const ch of str) {
    const v = CHARS.indexOf(ch);
    if (v < 0) continue; // bỏ qua '=' và ký tự lạ
    buffer = (buffer << 6) | v;
    bits += 6;
    if (bits >= 8) {
      bits -= 8;
      out += String.fromCharCode((buffer >> bits) & 0xff);
      buffer &= (1 << bits) - 1;
    }
  }
  return out;
}

// Trả về thời điểm hết hạn (ms). Không đọc được → coi như 1 giờ kể từ bây giờ.
export function getJwtExpiry(token) {
  try {
    const payload = JSON.parse(base64Decode(token.split('.')[1]));
    return payload.exp * 1000;
  } catch (e) {
    return Date.now() + 60 * 60 * 1000;
  }
}
