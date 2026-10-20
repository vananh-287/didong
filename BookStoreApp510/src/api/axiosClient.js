import axios from 'axios';
import { API_URL } from '../config';

// Token giữ trong bộ nhớ, interceptor tự gắn vào mọi request
// (server phân quyền dựa vào header Authorization)
let authToken = null;
export const setAuthToken = (token) => {
  authToken = token;
};

const client = axios.create({
  baseURL: API_URL,
  timeout: 10000,
  headers: { 'Content-Type': 'application/json' },
});

client.interceptors.request.use((config) => {
  if (authToken) config.headers.Authorization = `Bearer ${authToken}`;
  return config;
});

// Xử lý lỗi tập trung. Luôn trả về Error có:
//   message       : thông báo tiếng Việt mặc định
//   status        : mã HTTP (undefined nếu lỗi mạng)
//   serverMessage : chuỗi gốc server trả về (server trả CHUỖI, vd "Incorrect password")
client.interceptors.response.use(
  (res) => res,
  (error) => {
    const status = error.response?.status;
    const data = error.response?.data;
    let message;
    if (error.code === 'ECONNABORTED') {
      message = 'Kết nối quá lâu. Vui lòng thử lại.';
    } else if (!error.response) {
      message = 'Không kết nối được máy chủ. Kiểm tra server, địa chỉ IP và Wi-Fi.';
    } else if (status === 401) {
      message = 'Phiên đăng nhập đã hết hạn. Vui lòng đăng nhập lại.';
    } else if (status === 403) {
      message = 'Bạn không có quyền thực hiện thao tác này.';
    } else if (status === 404) {
      message = 'Không tìm thấy dữ liệu.';
    } else {
      message = `Máy chủ gặp sự cố (mã ${status}). Vui lòng thử lại.`;
    }
    const err = new Error(message);
    err.status = status;
    err.serverMessage = typeof data === 'string' ? data : undefined;
    return Promise.reject(err);
  }
);

export default client;
