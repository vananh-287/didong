const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export const isValidEmail = (email) => EMAIL_REGEX.test(String(email || '').trim());

export function validateLogin({ email, password }) {
  const errors = {};
  if (!email.trim()) errors.email = 'Vui lòng nhập email';
  else if (!isValidEmail(email)) errors.email = 'Email không đúng định dạng';

  if (!password) errors.password = 'Vui lòng nhập mật khẩu';
  else if (password.length < 6) errors.password = 'Mật khẩu tối thiểu 6 ký tự';
  return errors;
}

export function validateRegister({ name, email, password, confirmPassword }) {
  const errors = validateLogin({ email, password });
  if (!name.trim()) errors.name = 'Vui lòng nhập họ tên';
  if (!confirmPassword) errors.confirmPassword = 'Vui lòng nhập lại mật khẩu';
  else if (confirmPassword !== password) errors.confirmPassword = 'Mật khẩu nhập lại không khớp';
  return errors;
}
