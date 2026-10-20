import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';
import RatingStars from './RatingStars';
import Button from './Button';
import { colors } from '../theme';

// onSubmit({ rating, comment }) phải trả về Promise; ném lỗi nếu thất bại
export default function ReviewForm({ onSubmit }) {
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');
  const [touched, setTouched] = useState(false);
  const [loading, setLoading] = useState(false);
  const [serverError, setServerError] = useState('');

  const ratingError = touched && rating === 0 ? 'Vui lòng chọn số sao' : '';
  const commentError = touched && comment.trim().length < 3 ? 'Bình luận tối thiểu 3 ký tự' : '';

  const handleSubmit = async () => {
    setTouched(true);
    if (rating === 0 || comment.trim().length < 3) return;
    setLoading(true);
    setServerError('');
    try {
      await onSubmit({ rating, comment: comment.trim() });
      setRating(0);
      setComment('');
      setTouched(false);
    } catch (e) {
      setServerError(e.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.box}>
      <Text style={styles.heading}>Viết đánh giá của bạn</Text>
      <RatingStars value={rating} size={30} onChange={setRating} style={{ marginVertical: 8 }} />
      {ratingError ? <Text style={styles.error}>{ratingError}</Text> : null}

      <TextInput
        style={[styles.input, !!commentError && { borderColor: colors.danger }]}
        value={comment}
        onChangeText={setComment}
        placeholder="Chia sẻ cảm nhận của bạn về cuốn sách..."
        placeholderTextColor={colors.muted}
        multiline
        textAlignVertical="top"
      />
      {commentError ? <Text style={styles.error}>{commentError}</Text> : null}
      {serverError ? <Text style={styles.error}>{serverError}</Text> : null}

      <Button title="Gửi đánh giá" onPress={handleSubmit} loading={loading} style={{ marginTop: 12 }} />
    </View>
  );
}

const styles = StyleSheet.create({
  box: { backgroundColor: '#fff', borderRadius: 14, padding: 14, borderWidth: 1, borderColor: colors.border },
  heading: { fontSize: 15, fontWeight: '700', color: colors.text },
  input: {
    minHeight: 90,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: colors.border,
    padding: 12,
    fontSize: 14,
    color: colors.text,
    backgroundColor: colors.bg,
  },
  error: { color: colors.danger, fontSize: 12, marginTop: 4 },
});
