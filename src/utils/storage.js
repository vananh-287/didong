import AsyncStorage from '@react-native-async-storage/async-storage';

const KEY = '@bookstore/auth';

// Lưu { token, user, expiresAt } — tuyệt đối không lưu mật khẩu
export async function saveAuth(session) {
  await AsyncStorage.setItem(KEY, JSON.stringify(session));
}

export async function loadAuth() {
  try {
    const raw = await AsyncStorage.getItem(KEY);
    return raw ? JSON.parse(raw) : null;
  } catch (e) {
    return null; // dữ liệu hỏng → coi như chưa đăng nhập
  }
}

export async function clearAuth() {
  await AsyncStorage.removeItem(KEY);
}
