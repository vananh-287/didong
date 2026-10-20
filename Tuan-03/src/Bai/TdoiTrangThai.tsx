import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  Switch,
  StyleSheet,
} from 'react-native';

export default function BaiTrangThaiKetNoi() {
  // Trạng thái kết nối
  const [isConnected, setIsConnected] = useState(false);

  // Thông báo
  const [message, setMessage] = useState('Chưa kết nối');

  // Theo dõi trạng thái isConnected
  useEffect(() => {
    if (isConnected) {
      setMessage('Thiết bị đã kết nối');
    } else {
      setMessage('Thiết bị đã ngắt kết nối');
    }
  }, [isConnected]);

  return (
    <View style={styles.container}>

      <Text style={styles.title}>
        Theo dõi trạng thái kết nối
      </Text>

      {/* Công tắc */}
      <View style={styles.switchContainer}>
        <Text style={styles.label}>
          Kết nối
        </Text>

        <Switch
          value={isConnected}
          onValueChange={setIsConnected}
        />
      </View>

      {/* Thông báo */}
      <Text
        style={[
          styles.message,
          isConnected
            ? styles.connected
            : styles.disconnected,
        ]}
      >
        {message}
      </Text>

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
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#000000',
    marginBottom: 40,
  },

  switchContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 15,
    marginBottom: 30,
  },

  label: {
    fontSize: 20,
    color: '#000000',
  },

  message: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
  },

  connected: {
    color: 'green',
  },

  disconnected: {
    color: 'red',
  },
});