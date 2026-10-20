import React, { useState } from 'react';
import { View, Text, ScrollView, Pressable, KeyboardAvoidingView, Platform, StyleSheet } from 'react-native';
import TextField from '../components/TextField';
import Button from '../components/Button';
import useAuth from '../hooks/useAuth';
import { validateLogin } from '../utils/validators';
import { finishAuth } from '../navigation/finishAuth';
import { colors } from '../theme';

export default function LoginScreen({ navigation, route }) {
  const { login } = useAuth();
  const [values, setValues] = useState({ email: '', password: '' });
  const [touched, setTouched] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [serverError, setServerError] = useState('');

  const errors = validateLogin(values);
  const showError = (f) => (touched[f] || submitted ? errors[f] : undefined);
  const setField = (f) => (text) => setValues((v) => ({ ...v, [f]: text }));
  const blur = (f) => () => setTouched((t) => ({ ...t, [f]: true }));

  const handleSubmit = async () => {
    setSubmitted(true);
    setServerError('');
    if (Object.keys(errors).length > 0) return;
    setLoading(true);
    try {
      await login(values.email, values.password);
      finishAuth(navigation, route.params);
    } catch (e) {
      setServerError(e.message);
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
      <ScrollView contentContainerStyle={styles.content} keyboardShouldPersistTaps="handled">
        <Text style={styles.heading}>Chào mừng trở lại 👋</Text>
        <Text style={styles.sub}>Đăng nhập để thanh toán và đánh giá sách.</Text>

        {serverError ? <Text style={styles.serverError}>{serverError}</Text> : null}

        <TextField
          label="Email"
          value={values.email}
          onChangeText={setField('email')}
          onBlur={blur('email')}
          error={showError('email')}
          placeholder="ban@email.com"
          keyboardType="email-address"
        />
        <TextField
          label="Mật khẩu"
          value={values.password}
          onChangeText={setField('password')}
          onBlur={blur('password')}
          error={showError('password')}
          placeholder="Tối thiểu 6 ký tự"
          secureTextEntry
        />

        <Button title="Đăng nhập" onPress={handleSubmit} loading={loading} style={{ marginTop: 6 }} />

        <Pressable onPress={() => navigation.replace('Register', route.params)} style={styles.switch}>
          <Text style={styles.switchText}>
            Chưa có tài khoản? <Text style={styles.link}>Đăng ký</Text>
          </Text>
        </Pressable>

        <Text style={styles.hint}>Tài khoản demo: test@gmail.com / 123456</Text>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  content: { padding: 20, paddingTop: 28 },
  heading: { fontSize: 24, fontWeight: '800', color: colors.navy },
  sub: { fontSize: 14, color: colors.muted, marginTop: 4, marginBottom: 22 },
  serverError: {
    backgroundColor: '#FEE2E2',
    color: colors.danger,
    padding: 12,
    borderRadius: 10,
    marginBottom: 14,
    fontSize: 13,
  },
  switch: { alignItems: 'center', marginTop: 18 },
  switchText: { color: colors.muted, fontSize: 14 },
  link: { color: colors.indigo, fontWeight: '700' },
  hint: { textAlign: 'center', color: colors.muted, fontSize: 12, marginTop: 24 },
});
