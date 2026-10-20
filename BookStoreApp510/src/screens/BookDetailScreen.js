import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { View, Text, Image, ScrollView, FlatList, Pressable, Alert, StyleSheet, useWindowDimensions } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Button from '../components/Button';
import RatingStars from '../components/RatingStars';
import ReviewForm from '../components/ReviewForm';
import BookCard from '../components/BookCard';
import Loading from '../components/Loading';
import ErrorView from '../components/ErrorView';
import useCart from '../hooks/useCart';
import useAuth from '../hooks/useAuth';
import * as bookService from '../services/bookService';
import * as reviewService from '../services/reviewService';
import { averageRating, formatPrice, formatDate } from '../utils/format';
import { colors, shadow } from '../theme';

export default function BookDetailScreen({ route, navigation }) {
  const { bookId } = route.params;
  const { width } = useWindowDimensions();
  const { addToCart } = useCart();
  const { user, isLoggedIn, logout } = useAuth();

  const [book, setBook] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [related, setRelated] = useState([]);
  const [status, setStatus] = useState('loading');
  const [error, setError] = useState('');
  const [justAdded, setJustAdded] = useState(false);

  const load = useCallback(async () => {
    setStatus('loading');
    try {
      const [b, r] = await Promise.all([
        bookService.getBookById(bookId),
        reviewService.getReviewsByBook(bookId),
      ]);
      setBook(b);
      setReviews(r);
      setStatus('success');
      // Sách liên quan: không chặn màn hình nếu lỗi
      // (lọc trên server: cùng thể loại, trừ sách hiện tại, tối đa 10 cuốn)
      bookService
        .getRelated(b)
        .then((list) => setRelated(list))
        .catch(() => setRelated([]));
    } catch (e) {
      setError(e.message);
      setStatus('error');
    }
  }, [bookId]);

  useEffect(() => {
    load();
  }, [load]);

  // Điểm trung bình tính lại tự động mỗi khi mảng reviews đổi
  const avg = useMemo(() => averageRating(reviews), [reviews]);

  const handleAddToCart = () => {
    const res = addToCart(book, 1);
    if (!res.ok) {
      Alert.alert(
        'Không thể thêm',
        res.reason === 'out_of_stock' ? 'Sách này đã hết hàng.' : 'Bạn đã thêm tối đa số lượng còn trong kho.'
      );
      return;
    }
    setJustAdded(true);
    setTimeout(() => setJustAdded(false), 1200);
  };

  // POST review → thêm review mới vào đầu danh sách (không cần load lại cả trang)
  const handleSubmitReview = async ({ rating, comment }) => {
    let created;
    try {
      created = await reviewService.createReview({
        bookId: book.id,
        userId: user.id, // phải trùng chủ token, nếu không server trả 403
        userName: user.name,
        rating,
        comment,
      });
    } catch (e) {
      // Token hết hạn (1 giờ) → đăng xuất, form đổi thành nút "Đăng nhập để viết đánh giá"
      if (e.status === 401) await logout();
      throw e; // để ReviewForm hiện thông báo lỗi
    }
    setReviews((prev) => [created, ...prev]);
  };

  // Xoá review của chính mình (server chặn review người khác bằng 403)
  const handleDeleteReview = (review) => {
    Alert.alert('Xoá đánh giá', 'Bạn có chắc muốn xoá đánh giá này?', [
      { text: 'Hủy', style: 'cancel' },
      {
        text: 'Xoá',
        style: 'destructive',
        onPress: async () => {
          try {
            await reviewService.deleteReview(review.id);
            setReviews((prev) => prev.filter((r) => r.id !== review.id));
          } catch (e) {
            if (e.status === 401) await logout();
            Alert.alert('Không xoá được', e.message);
          }
        },
      },
    ]);
  };

  if (status === 'loading') return <Loading />;
  if (status === 'error') return <ErrorView message={error} onRetry={load} />;

  const soldOut = book.stock <= 0;
  const relatedWidth = Math.min(150, (width - 48) / 2.2);

  return (
    <ScrollView style={styles.container} contentContainerStyle={{ paddingBottom: 32 }} keyboardShouldPersistTaps="handled">
      <View style={styles.hero}>
        <Image source={{ uri: book.image }} style={styles.cover} />
      </View>

      <View style={styles.body}>
        <Text style={styles.title}>{book.title}</Text>
        <Text style={styles.author}>{book.author}</Text>

        <View style={styles.ratingRow}>
          <RatingStars value={avg} size={18} />
          <Text style={styles.ratingText}>
            {reviews.length > 0 ? `${avg.toFixed(1)} (${reviews.length} đánh giá)` : 'Chưa có đánh giá'}
          </Text>
        </View>

        <Text style={styles.price}>{formatPrice(book.price)}</Text>
        <Text style={[styles.stock, soldOut && { color: colors.danger }]}>
          {soldOut ? 'Hết hàng' : `Còn ${book.stock} cuốn`}
        </Text>

        <Text style={styles.sectionTitle}>Giới thiệu</Text>
        <Text style={styles.desc}>{book.description}</Text>

        <Button
          title={justAdded ? 'Đã thêm vào giỏ ✓' : 'Thêm vào giỏ hàng'}
          onPress={handleAddToCart}
          disabled={soldOut}
          style={{ marginTop: 16 }}
        />

        {/* ---------- Đánh giá ---------- */}
        <Text style={styles.sectionTitle}>Đánh giá ({reviews.length})</Text>

        {isLoggedIn ? (
          <ReviewForm onSubmit={handleSubmitReview} />
        ) : (
          <View style={styles.loginPrompt}>
            <Text style={styles.loginText}>Đăng nhập để gửi đánh giá của bạn.</Text>
            <Button
              title="Đăng nhập để viết đánh giá"
              variant="outline"
              style={{ height: 40, marginTop: 8 }}
              onPress={() => navigation.navigate('Login', { returnBack: true })}
            />
          </View>
        )}

        {reviews.length === 0 ? (
          <Text style={styles.noReview}>Hãy là người đầu tiên đánh giá cuốn sách này.</Text>
        ) : (
          reviews.map((r) => (
            <View key={r.id} style={styles.review}>
              <View style={styles.reviewHead}>
                <Text style={styles.reviewName}>{r.userName}</Text>
                <View style={styles.reviewRight}>
                  <Text style={styles.reviewDate}>{formatDate(r.createdAt)}</Text>
                  {user && r.userId === user.id ? (
                    <Pressable onPress={() => handleDeleteReview(r)} hitSlop={8}>
                      <Ionicons name="trash-outline" size={16} color={colors.danger} />
                    </Pressable>
                  ) : null}
                </View>
              </View>
              <RatingStars value={r.rating} size={14} style={{ marginVertical: 4 }} />
              <Text style={styles.reviewComment}>{r.comment}</Text>
            </View>
          ))
        )}

        {/* ---------- Sách liên quan (thử thách) ---------- */}
        {related.length > 0 ? (
          <>
            <Text style={styles.sectionTitle}>Sách liên quan</Text>
            <FlatList
              data={related}
              horizontal
              showsHorizontalScrollIndicator={false}
              keyExtractor={(b) => String(b.id)}
              contentContainerStyle={{ gap: 12, paddingVertical: 4, paddingRight: 4 }}
              renderItem={({ item }) => (
                <BookCard
                  book={item}
                  width={relatedWidth}
                  onPress={(b) => navigation.push('BookDetail', { bookId: b.id })}
                />
              )}
            />
          </>
        ) : null}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.bg },
  hero: { backgroundColor: colors.navy, alignItems: 'center', paddingVertical: 24 },
  cover: { width: 180, height: 240, borderRadius: 12, backgroundColor: colors.border, ...shadow },
  body: { padding: 16 },
  title: { fontSize: 22, fontWeight: '800', color: colors.text },
  author: { fontSize: 14, color: colors.muted, marginTop: 2 },
  ratingRow: { flexDirection: 'row', alignItems: 'center', gap: 8, marginTop: 10 },
  ratingText: { fontSize: 13, color: colors.muted },
  price: { fontSize: 24, fontWeight: '800', color: colors.indigo, marginTop: 12 },
  stock: { fontSize: 13, color: colors.success, marginTop: 2 },
  sectionTitle: { fontSize: 17, fontWeight: '800', color: colors.text, marginTop: 24, marginBottom: 8 },
  desc: { fontSize: 14, lineHeight: 21, color: colors.text },
  loginPrompt: {
    backgroundColor: '#fff',
    borderRadius: 14,
    padding: 14,
    borderWidth: 1,
    borderColor: colors.border,
  },
  loginText: { fontSize: 14, color: colors.muted },
  noReview: { color: colors.muted, fontSize: 14, marginTop: 14 },
  review: { backgroundColor: '#fff', borderRadius: 12, padding: 12, marginTop: 10, ...shadow },
  reviewHead: { flexDirection: 'row', justifyContent: 'space-between' },
  reviewName: { fontSize: 14, fontWeight: '700', color: colors.text },
  reviewRight: { flexDirection: 'row', alignItems: 'center', gap: 10 },
  reviewDate: { fontSize: 12, color: colors.muted },
  reviewComment: { fontSize: 14, color: colors.text, lineHeight: 20 },
});
