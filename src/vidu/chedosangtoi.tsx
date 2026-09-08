import React, { createContext, useContext, useState } from 'react';
import {
  View,
  Text,
  Button,
  StyleSheet,
} from 'react-native';

const ThemeContext = createContext(null);

function HomeScreen() {
  const { isDarkMode, toggleTheme } = useContext(ThemeContext);

  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: isDarkMode
            ? '#222222'
            : '#ffffff',
        },
      ]}
    >
      <Text
        style={[
          styles.text,
          {
            color: isDarkMode
              ? '#ffffff'
              : '#222222',
          },
        ]}
      >
        {isDarkMode ? 'Chế độ tối' : 'Chế độ sáng'}
      </Text>

      <Button
        title="Đổi giao diện"
        onPress={toggleTheme}
      />
    </View>
  );
}

export default function BaiDoiGiaoDien() {
  const [isDarkMode, setIsDarkMode] = useState(false);

  const toggleTheme = () => {
    setIsDarkMode(previousMode => !previousMode);
  };

  return (
    <ThemeContext.Provider
      value={{ isDarkMode, toggleTheme }}
    >
      <HomeScreen />
    </ThemeContext.Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    gap: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },

  text: {
    fontSize: 24,
    fontWeight: 'bold',
  },
});