// Điều hướng sau khi đăng nhập/đăng ký thành công:
//  - có redirectTo  → thay màn Login bằng màn đích (vd: quay lại đúng Checkout)
//  - có returnBack  → quay lại màn trước (vd: trang chi tiết sách đang xem)
//  - mặc định       → về Home
export function finishAuth(navigation, params) {
  if (params?.redirectTo) {
    navigation.replace(params.redirectTo.name, params.redirectTo.params);
  } else if (params?.returnBack) {
    navigation.goBack();
  } else {
    navigation.reset({ index: 0, routes: [{ name: 'Main', params: { screen: 'Home' } }] });
  }
}
