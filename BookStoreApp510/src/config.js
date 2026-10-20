import Constants from 'expo-constants';
import { Platform } from 'react-native';

const PORT = 3000;

// Nếu muốn ép địa chỉ API thủ công (vd: 'http://192.168.1.10:3000') thì điền vào đây.
const API_URL_OVERRIDE = '';

// Khi chạy Expo Go trên điện thoại thật, "localhost" là chính điện thoại.
// Expo cho biết IP máy tính (hostUri) nên ta tự suy ra địa chỉ json-server.
function getHost() {
  const hostUri = Constants.expoConfig?.hostUri;
  if (hostUri) return hostUri.split(':')[0];
  return Platform.OS === 'android' ? '10.0.2.2' : 'localhost';
}

export const API_URL = API_URL_OVERRIDE || `http://${getHost()}:${PORT}`;
