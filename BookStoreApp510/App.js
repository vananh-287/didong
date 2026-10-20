import React, { useEffect } from 'react';
import { Provider } from 'react-redux';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { store } from './src/store';
import RootNavigator from './src/navigation/RootNavigator';
import Loading from './src/components/Loading';
import useAuth from './src/hooks/useAuth';

function Root() {
  const { initializing, restoreSession } = useAuth();

  // Auto-login khi mở app
  useEffect(() => {
    restoreSession();
  }, [restoreSession]);

  if (initializing) return <Loading />;
  return <RootNavigator />;
}

export default function App() {
  return (
    <Provider store={store}>
      <SafeAreaProvider>
        <StatusBar style="light" />
        <Root />
      </SafeAreaProvider>
    </Provider>
  );
}
