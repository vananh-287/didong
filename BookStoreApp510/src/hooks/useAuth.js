import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loginSuccess, logout as logoutAction, setInitializing } from '../store/authSlice';
import * as authService from '../services/authService';
import { setAuthToken } from '../api/axiosClient';
import { saveAuth, loadAuth, clearAuth } from '../utils/storage';

// ADAPTER cho state đăng nhập
export default function useAuth() {
  const dispatch = useDispatch();
  const { user, token, isLoggedIn, initializing } = useSelector((s) => s.auth);

  // session = { token, user, expiresAt }
  const applySession = useCallback(
    async (session) => {
      setAuthToken(session.token);
      await saveAuth(session);
      dispatch(loginSuccess({ user: session.user, token: session.token }));
    },
    [dispatch]
  );

  const login = useCallback(
    async (email, password) => applySession(await authService.login(email, password)),
    [applySession]
  );

  const register = useCallback(
    async (form) => applySession(await authService.register(form)),
    [applySession]
  );

  const logout = useCallback(async () => {
    setAuthToken(null);
    await clearAuth();
    dispatch(logoutAction());
  }, [dispatch]);

  // Auto-login có xác minh token: gọi 1 lần khi mở app
  const restoreSession = useCallback(async () => {
    try {
      const saved = await loadAuth();
      const valid = !!saved?.token && !!saved?.user?.id && saved.expiresAt > Date.now();
      if (!valid) {
        if (saved) await clearAuth(); // token hết hạn / dữ liệu thiếu → xoá phiên
        return;
      }

      setAuthToken(saved.token);
      try {
        // Xác minh với server: GET /users/:id (route 600, cần token hợp lệ)
        const freshUser = await authService.getMe(saved.user.id);
        await saveAuth({ ...saved, user: freshUser });
        dispatch(loginSuccess({ user: freshUser, token: saved.token }));
      } catch (e) {
        // 401: token sai/hết hạn · 403: không phải chủ tài khoản · 404: user đã bị xoá
        if ([401, 403, 404].includes(e.status)) {
          setAuthToken(null);
          await clearAuth();
        } else {
          // Mất mạng: vẫn cho vào bằng dữ liệu đã lưu
          dispatch(loginSuccess({ user: saved.user, token: saved.token }));
        }
      }
    } finally {
      dispatch(setInitializing(false));
    }
  }, [dispatch]);

  return { user, token, isLoggedIn, initializing, login, register, logout, restoreSession };
}
