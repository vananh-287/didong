import React, { useCallback, useEffect, useRef, useState } from 'react';
import { View, Text, Pressable, Alert, ActivityIndicator, StyleSheet } from 'react-native';
import Header from '../components/Header';
import SearchBar from '../components/SearchBar';
import CategoryChips from '../components/CategoryChips';
import BookGrid from '../components/BookGrid';
import EmptyState from '../components/EmptyState';
import ErrorView from '../components/ErrorView';
import Loading from '../components/Loading';
import FloatingCartButton from '../components/FloatingCartButton';
import useCart from '../hooks/useCart';
import useDebounce from '../hooks/useDebounce';
import * as bookService from '../services/bookService';
import * as categoryService from '../services/categoryService';
import { colors } from '../theme';

export default function HomeScreen({ navigation, route }) {
  const { addToCart } = useCart();

  const [books, setBooks] = useState([]);
  const [categories, setCategories] = useState([]);
  const [status, setStatus] = useState('loading'); // loading | error | success
  const [error, setError] = useState('');
  const [fetching, setFetching] = useState(false); // đang tải lại danh sách khi lọc/tìm
  const [ready, setReady] = useState(false);

  const [searchOpen, setSearchOpen] = useState(false);
  const [query, setQuery] = useState('');
  const debouncedQuery = useDebounce(query, 400);
  const [category, setCategory] = useState(null);

  const readyRef = useRef(false);
  const reqId = useRef(0);

  // Lần vào Home đầu tiên: gọi song song books + categories
  const loadInitial = useCallback(async () => {
    const id = ++reqId.current;
    setStatus('loading');
    setError('');
    try {
      const [bookList, categoryList] = await Promise.all([
        bookService.getBooks({ category, q: debouncedQuery }),
        categoryService.getCategories(),
      ]);
      if (id !== reqId.current) return;
      setBooks(bookList);
      setCategories(categoryList);
      readyRef.current = true;
      setReady(true);
      setStatus('success');
    } catch (e) {
      if (id !== reqId.current) return;
      setError(e.message);
      setStatus('error');
    }
  }, [category, debouncedQuery]);

  // Chỉ tải lại danh sách sách khi đổi bộ lọc
  const fetchBooks = useCallback(async () => {
    const id = ++reqId.current;
    setFetching(true);
    setError('');
    try {
      const list = await bookService.getBooks({ category, q: debouncedQuery });
      if (id !== reqId.current) return; // bỏ kết quả của request cũ
      setBooks(list);
      setStatus('success');
    } catch (e) {
      if (id !== reqId.current) return;
      setError(e.message);
      setStatus('error');
    } finally {
      if (id === reqId.current) setFetching(false);
    }
  }, [category, debouncedQuery]);

  useEffect(() => {
    loadInitial();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (readyRef.current) fetchBooks();
  }, [fetchBooks]);

  // Nhận bộ lọc danh mục từ tab "Danh mục"
  useEffect(() => {
    if (route.params?.ts) {
      setCategory(route.params.category ?? null);
      setQuery('');
      setSearchOpen(false);
    }
  }, [route.params?.ts]);

  const hasFilter = category !== null || query.trim() !== '';

  const clearFilters = () => {
    setCategory(null);
    setQuery('');
    setSearchOpen(false);
  };

  const toggleSearch = () => {
    if (searchOpen) setQuery('');
    setSearchOpen((v) => !v);
  };

  const handleAdd = (book) => {
    const res = addToCart(book, 1);
    if (!res.ok) {
      Alert.alert(
        'Không thể thêm',
        res.reason === 'out_of_stock' ? 'Sách này đã hết hàng.' : 'Bạn đã thêm tối đa số lượng còn trong kho.'
      );
    }
  };

  const openDetail = (book) => navigation.navigate('BookDetail', { bookId: book.id });

  const renderBody = () => {
    if (status === 'loading') return <Loading />;
    if (status === 'error') {
      return <ErrorView message={error} onRetry={ready ? fetchBooks : loadInitial} />;
    }
    return (
      <BookGrid
        books={books}
        onPressBook={openDetail}
        onAddToCart={handleAdd}
        ListEmptyComponent={
          <EmptyState
            title="Không tìm thấy sách phù hợp"
            message="Hãy thử từ khóa khác hoặc xóa bộ lọc."
            actionLabel={hasFilter ? 'Xóa bộ lọc' : undefined}
            onAction={clearFilters}
          />
        }
      />
    );
  };

  return (
    <View style={styles.container}>
      <Header
        onSearchPress={toggleSearch}
        searchActive={searchOpen}
        searchDisabled={!ready}
      />
      {searchOpen ? <SearchBar value={query} onChangeText={setQuery} /> : null}

      {categories.length > 0 ? (
        <CategoryChips categories={categories} selectedId={category} onSelect={setCategory} />
      ) : null}

      {hasFilter && ready ? (
        <View style={styles.filterRow}>
          <Text style={styles.filterText}>
            {fetching ? 'Đang lọc...' : `${books.length} kết quả`}
          </Text>
          <Pressable onPress={clearFilters} hitSlop={8}>
            <Text style={styles.clear}>Xóa bộ lọc</Text>
          </Pressable>
        </View>
      ) : null}

      {fetching && status === 'success' ? (
        <ActivityIndicator size="small" color={colors.indigo} style={{ marginBottom: 6 }} />
      ) : null}

      <View style={{ flex: 1 }}>{renderBody()}</View>

      <FloatingCartButton onPress={() => navigation.navigate('Cart')} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.bg },
  filterRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingBottom: 8,
  },
  filterText: { fontSize: 13, color: colors.muted },
  clear: { fontSize: 13, fontWeight: '700', color: colors.indigo },
});
