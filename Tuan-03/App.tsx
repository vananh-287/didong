import React, { useState } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import Vidu1 from "./src/vidu/vidu1";
import BaiDienForm from "./src/Bai/baiDienFormten";
import BoDemso from "./src/vidu/Bodemsl";
import BaiTrangThaiKetNoi from "./src/Bai/TdoiTrangThai";
import BaiDoiGiaoDien from './src/vidu/chedosangtoi';
import BaiThongTinNguoiDung from './src/Bai/chiasett';
import BaiGioHang from './src/vidu/quanligiohang';
import BaiFormDangNhap from './src/Bai/baiFormdn';
import LocDSSP from './src/vidu/locdssp';
import BaiTimKiemSanPham from './src/Bai/tkvatinhtongsp';
import BaiQuanLyCongViec from './src/Bai/baiQuanLyCongViec';

export default function CounterScreen() {
 //return <Vidu1 />;
 // return <BaiDienForm />;
  // return <BoDemso />;
  // return <BaiTrangThaiKetNoi />;
   //return <BaiDoiGiaoDien />;
 //  return <BaiThongTinNguoiDung />;
 //return <BaiGioHang />;
//return <BaiFormDangNhap />;
//return <LocDSSP />;
//return <BaiTimKiemSanPham />;
return <BaiQuanLyCongViec />;
}
