import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function BoDemso() {
  const [seconds, setSeconds] = useState(0);

  useEffect(() => {
    const timerId = setInterval(() => {
      setSeconds(previousSeconds => previousSeconds + 1);
    }, 1000);

    return () => clearInterval(timerId);
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Thời gian: {seconds} giây</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  title: {
    fontSize: 24,
  },
});
