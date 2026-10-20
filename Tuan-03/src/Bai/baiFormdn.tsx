import React, { useReducer } from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
} from 'react-native';

// Trạng thái ban đầu
const initialState = {
  email: '',
  password: '',
  error: '',
  isSubmitting: false,
};

// Reducer
function formReducer(state: any, action: any) {
  switch (action.type) {
    case 'SET_EMAIL':
      return {
        ...state,
        email: action.payload,
        error: '',
      };

    case 'SET_PASSWORD':
      return {
        ...state,
        password: action.payload,
        error: '',
      };

    case 'SET_ERROR':
      return {
        ...state,
        error: action.payload,
      };

    case 'SET_SUBMITTING':
      return {
        ...state,
        isSubmitting: action.payload,
      };

    case 'RESET':
      return initialState;

    default:
      return state;
  }
}

export default function BaiFormDangNhap() {
  const [state, dispatch] = useReducer(
    formReducer,
    initialState
  );

  // Xử lý đăng nhập
  const handleLogin = () => {
    // Kiểm tra bỏ trống
    if (!state.email || !state.password) {
      dispatch({
        type: 'SET_ERROR',
        payload: 'Vui lòng nhập đầy đủ thông tin',
      });
      return;
    }

    // Kiểm tra email có @
    if (!state.email.includes('@')) {
      dispatch({
        type: 'SET_ERROR',
        payload: 'Email phải chứa ký tự @',
      });
      return;
    }

    // Kiểm tra mật khẩu ít nhất 6 ký tự
    if (state.password.length < 6) {
      dispatch({
        type: 'SET_ERROR',
        payload: 'Mật khẩu phải có ít nhất 6 ký tự',
      });
      return;
    }

    // Bắt đầu đăng nhập
    dispatch({
      type: 'SET_SUBMITTING',
      payload: true,
    });

    // Giả lập quá trình đăng nhập
    setTimeout(() => {
      dispatch({
        type: 'SET_SUBMITTING',
        payload: false,
      });

      dispatch({
        type: 'SET_ERROR',
        payload: '',
      });
    }, 1000);
  };

  return (
    <View style={styles.container}>

      <Text style={styles.title}>
        Đăng nhập
      </Text>

      {/* Email */}
      <TextInput
        style={styles.input}
        value={state.email}
        onChangeText={text =>
          dispatch({
            type: 'SET_EMAIL',
            payload: text,
          })
        }
        placeholder="Email"
        placeholderTextColor="#888"
        keyboardType="email-address"
        autoCapitalize="none"
      />

      {/* Mật khẩu */}
      <TextInput
        style={styles.input}
        value={state.password}
        onChangeText={text =>
          dispatch({
            type: 'SET_PASSWORD',
            payload: text,
          })
        }
        placeholder="Mật khẩu"
        placeholderTextColor="#888"
        secureTextEntry
      />

      {/* Hiển thị lỗi */}
      {state.error ? (
        <Text style={styles.error}>
          {state.error}
        </Text>
      ) : null}

      {/* Nút đăng nhập */}
      <Button
        title={
          state.isSubmitting
            ? 'Đang đăng nhập...'
            : 'Đăng nhập'
        }
        onPress={handleLogin}
        disabled={state.isSubmitting}
      />

      <View style={styles.space} />

      {/* Nút đặt lại */}
      <Button
        title="Đặt lại"
        onPress={() =>
          dispatch({ type: 'RESET' })
        }
      />

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 24,
    backgroundColor: '#FFFFFF',
  },

  title: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#000000',
    marginBottom: 30,
  },

  input: {
    borderWidth: 1,
    borderColor: '#999999',
    borderRadius: 5,
    padding: 12,
    marginBottom: 15,
    color: '#000000',
    backgroundColor: '#FFFFFF',
  },

  error: {
    color: 'red',
    fontSize: 16,
    marginBottom: 15,
    textAlign: 'center',
  },

  space: {
    height: 12,
  },
});