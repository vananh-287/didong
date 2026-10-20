import client from '../api/axiosClient';
import { getJwtExpiry } from '../utils/jwt';

// Không bao giờ giữ mật khẩu (dù đã băm) trong app
const toPublicUser = ({ password, ...user }) => user;

const toResult = (data) => ({
  token: data.accessToken,
  user: toPublicUser(data.user),
  expiresAt: getJwtExpiry(data.accessToken),
});

// Đổi thông báo tiếng Anh của server sang tiếng Việt
const MESSAGES = {
  'Cannot find user': 'Email hoặc mật khẩu không đúng',
  'Incorrect password': 'Email hoặc mật khẩu không đúng',
  'Email already exists': 'Email đã được sử dụng',
  'Email format is invalid': 'Email không đúng định dạng',
  'Password is too short': 'Mật khẩu quá ngắn',
};

const toAppError = (err) => {
  if (err.serverMessage) return new Error(MESSAGES[err.serverMessage] ?? err.serverMessage);
  return err; // lỗi mạng/timeout: message tiếng Việt đã được interceptor gắn
};

export async function login(email, password) {
  try {
    const res = await client.post('/login', { email: email.trim(), password });
    return toResult(res.data);
  } catch (err) {
    throw toAppError(err);
  }
}

export async function register({ name, email, password }) {
  try {
    const res = await client.post('/register', {
      name: name.trim(),
      email: email.trim().toLowerCase(),
      password,
    });
    return toResult(res.data);
  } catch (err) {
    throw toAppError(err);
  }
}

// Xác minh token khi auto-login: route /users là 600 → chỉ chủ tài khoản đọc được.
// Token sai/hết hạn → 401, token của người khác → 403
export async function getMe(userId) {
  const res = await client.get(`/users/${userId}`);
  return toPublicUser(res.data);
}
