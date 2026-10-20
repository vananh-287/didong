import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  addItem,
  removeItem,
  updateQuantity as updateQuantityAction,
  clearCart as clearCartAction,
  selectCartItems,
  selectCartCount,
  selectCartTotal,
} from '../store/cartSlice';

// ADAPTER: UI chỉ gọi useCart(). Muốn đổi sang Recoil chỉ cần viết lại file này.
export default function useCart() {
  const dispatch = useDispatch();
  const items = useSelector(selectCartItems);
  const totalQuantity = useSelector(selectCartCount);
  const totalPrice = useSelector(selectCartTotal);

  // Trả về { ok, reason } để UI biết có thêm được không (hết hàng / chạm tồn kho)
  const addToCart = useCallback(
    (book, quantity = 1) => {
      const stock = book.stock ?? 999;
      if (stock <= 0) return { ok: false, reason: 'out_of_stock' };
      const existing = items.find((i) => i.bookId === book.id);
      if (existing && existing.quantity >= stock) return { ok: false, reason: 'max_stock' };
      dispatch(addItem({ book, quantity }));
      return { ok: true };
    },
    [dispatch, items]
  );

  const removeFromCart = useCallback((bookId) => dispatch(removeItem(bookId)), [dispatch]);
  const updateQuantity = useCallback(
    (bookId, quantity) => dispatch(updateQuantityAction({ bookId, quantity })),
    [dispatch]
  );
  const clearCart = useCallback(() => dispatch(clearCartAction()), [dispatch]);

  return { items, totalQuantity, totalPrice, addToCart, removeFromCart, updateQuantity, clearCart };
}
