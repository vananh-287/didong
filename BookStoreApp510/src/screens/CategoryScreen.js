import React, { useCallback, useEffect, useState } from 'react';
import { View, Text, FlatList, Pressable, StyleSheet } from 'react-native';
import Header from '../components/Header';
import Loading from '../components/Loading';
import ErrorView from '../components/ErrorView';
import EmptyState from '../components/EmptyState';
import * as categoryService from '../services/categoryService';
import { colors, shadow } from '../theme';

export default function CategoryScreen({ navigation }) {
  const [categories, setCategories] = useState([]);
  const [status, setStatus] = useState('loading');
  const [error, setError] = useState('');

  const load = useCallback(async () => {
    setStatus('loading');
    try {
      setCategories(await categoryService.getCategories());
      setStatus('success');
    } catch (e) {
      setError(e.message);
      setStatus('error');
    }
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  // Chọn danh mục → sang Home và áp bộ lọc (ts để Home nhận biết lần chọn mới)
  const openCategory = (c) => navigation.navigate('Home', { category: c.id, ts: Date.now() });

  return (
    <View style={styles.container}>
      <Header title="Danh mục" />
      {status === 'loading' ? (
        <Loading />
      ) : status === 'error' ? (
        <ErrorView message={error} onRetry={load} />
      ) : (
        <FlatList
          data={categories}
          keyExtractor={(c) => String(c.id)}
          numColumns={2}
          columnWrapperStyle={{ justifyContent: 'space-between' }}
          contentContainerStyle={{ padding: 16, flexGrow: 1 }}
          ListEmptyComponent={<EmptyState icon="grid-outline" title="Chưa có danh mục nào" />}
          renderItem={({ item }) => (
            <Pressable style={styles.card} onPress={() => openCategory(item)}>
              <Text style={styles.icon}>{item.icon}</Text>
              <Text style={styles.name}>{item.name}</Text>
            </Pressable>
          )}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.bg },
  card: {
    width: '48%',
    backgroundColor: '#fff',
    borderRadius: 16,
    paddingVertical: 24,
    alignItems: 'center',
    marginBottom: 14,
    ...shadow,
  },
  icon: { fontSize: 36 },
  name: { marginTop: 8, fontSize: 15, fontWeight: '700', color: colors.text },
});
