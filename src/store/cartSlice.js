import { createSlice } from '@reduxjs/toolkit';

// item: { bookId, quantity, title, author, price, image, stock }
const cartSlice = createSlice({
  name: 'cart',
  initialState: { items: [] },
  reducers: {
    addItem(state, { payload }) {
      const { book, quantity = 1 } = payload;
      const stock = book.stock ?? 999;
      const existing = state.items.find((i) => i.bookId === book.id);
      if (existing) {
        existing.quantity = Math.min(existing.quantity + quantity, existing.stock);
      } else {
        state.items.push({
          bookId: book.id,
          quantity: Math.min(quantity, stock),
          title: book.title,
          author: book.author,
          price: book.price,
          image: book.image,
          stock,
        });
      }
    },
    removeItem(state, { payload: bookId }) {
      state.items = state.items.filter((i) => i.bookId !== bookId);
    },
    updateQuantity(state, { payload }) {
      const { bookId, quantity } = payload;
      const item = state.items.find((i) => i.bookId === bookId);
      if (!item) return;
      item.quantity = Math.max(1, Math.min(quantity, item.stock)); // 1..tồn kho
    },
    clearCart(state) {
      state.items = [];
    },
  },
});

export const { addItem, removeItem, updateQuantity, clearCart } = cartSlice.actions;

// Selectors
export const selectCartItems = (state) => state.cart.items;
export const selectCartCount = (state) =>
  state.cart.items.reduce((sum, i) => sum + i.quantity, 0);
export const selectCartTotal = (state) =>
  state.cart.items.reduce((sum, i) => sum + i.quantity * i.price, 0);

export default cartSlice.reducer;
