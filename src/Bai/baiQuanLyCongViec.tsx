import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useReducer,
  useState,
} from 'react';

import {
  View,
  Text,
  TextInput,
  Button,
  FlatList,
  Switch,
  StyleSheet,
} from 'react-native';

/* =========================
   1. KIỂU DỮ LIỆU TODO
========================= */

type Todo = {
  id: string;
  title: string;
  completed: boolean;
};

/* =========================
   2. REDUCER
========================= */

type Action =
  | { type: 'ADD_TODO'; payload: string }
  | { type: 'TOGGLE_TODO'; payload: string }
  | { type: 'DELETE_TODO'; payload: string };

const initialTodos: Todo[] = [];

function todoReducer(state: Todo[], action: Action): Todo[] {
  switch (action.type) {
    case 'ADD_TODO':
      return [
        ...state,
        {
          id: Date.now().toString(),
          title: action.payload,
          completed: false,
        },
      ];

    case 'TOGGLE_TODO':
      return state.map(todo =>
        todo.id === action.payload
          ? { ...todo, completed: !todo.completed }
          : todo
      );

    case 'DELETE_TODO':
      return state.filter(todo => todo.id !== action.payload);

    default:
      return state;
  }
}

/* =========================
   3. CONTEXT CHỦ ĐỀ
========================= */

type ThemeContextType = {
  isDarkMode: boolean;
  toggleTheme: () => void;
};

const ThemeContext = createContext<ThemeContextType | null>(null);

/* =========================
   4. COMPONENT HIỂN THỊ TODO
========================= */

type TodoItemProps = {
  item: Todo;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
};

const TodoItem = React.memo(
  ({ item, onToggle, onDelete }: TodoItemProps) => {
    const theme = useContext(ThemeContext);

    if (!theme) {
      return null;
    }

    const { isDarkMode } = theme;

    return (
      <View
        style={[
          styles.todoItem,
          {
            backgroundColor: isDarkMode ? '#333333' : '#F5F5F5',
          },
        ]}
      >
        <View style={styles.todoContent}>
          <Text
            style={[
              styles.todoTitle,
              {
                color: isDarkMode ? '#FFFFFF' : '#000000',
                textDecorationLine: item.completed
                  ? 'line-through'
                  : 'none',
              },
            ]}
          >
            {item.title}
          </Text>

          <Text
            style={{
              color: item.completed ? 'green' : 'orange',
            }}
          >
            {item.completed ? 'Đã hoàn thành' : 'Chưa hoàn thành'}
          </Text>
        </View>

        <View style={styles.buttonContainer}>
          <Button
            title={item.completed ? 'Bỏ chọn' : 'Hoàn thành'}
            onPress={() => onToggle(item.id)}
          />

          <View style={styles.space} />

          <Button
            title="Xóa"
            onPress={() => onDelete(item.id)}
          />
        </View>
      </View>
    );
  }
);

/* =========================
   5. MÀN HÌNH CHÍNH
========================= */

function TodoScreen() {
  const theme = useContext(ThemeContext);

  if (!theme) {
    return null;
  }

  const { isDarkMode, toggleTheme } = theme;

  const [todos, dispatch] = useReducer(
    todoReducer,
    initialTodos
  );

  const [todoText, setTodoText] = useState('');
  const [keyword, setKeyword] = useState('');

  /* =========================
     6. THÊM CÔNG VIỆC
  ========================= */

  const handleAddTodo = useCallback(() => {
    const text = todoText.trim();

    if (text === '') {
      return;
    }

    dispatch({
      type: 'ADD_TODO',
      payload: text,
    });

    setTodoText('');
  }, [todoText]);

  /* =========================
     7. HOÀN THÀNH CÔNG VIỆC
  ========================= */

  const handleToggleTodo = useCallback((id: string) => {
    dispatch({
      type: 'TOGGLE_TODO',
      payload: id,
    });
  }, []);

  /* =========================
     8. XÓA CÔNG VIỆC
  ========================= */

  const handleDeleteTodo = useCallback((id: string) => {
    dispatch({
      type: 'DELETE_TODO',
      payload: id,
    });
  }, []);

  /* =========================
     9. LỌC CÔNG VIỆC
  ========================= */

  const filteredTodos = useMemo(() => {
    return todos.filter(todo =>
      todo.title
        .toLowerCase()
        .includes(keyword.toLowerCase())
    );
  }, [todos, keyword]);

  /* =========================
     10. ĐẾM VIỆC CHƯA HOÀN THÀNH
  ========================= */

  const remainingTodos = useMemo(() => {
    return todos.filter(todo => !todo.completed).length;
  }, [todos]);

  /* =========================
     11. THEO DÕI SỐ LƯỢNG TODO
  ========================= */

  useEffect(() => {
    console.log(
      `Danh sách hiện có ${todos.length} công việc`
    );
  }, [todos.length]);

  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: isDarkMode
            ? '#222222'
            : '#FFFFFF',
        },
      ]}
    >
      <Text
        style={[
          styles.title,
          {
            color: isDarkMode
              ? '#FFFFFF'
              : '#000000',
          },
        ]}
      >
        Quản lý công việc
      </Text>

      {/* Chuyển giao diện */}
      <View style={styles.themeContainer}>
        <Text
          style={{
            color: isDarkMode
              ? '#FFFFFF'
              : '#000000',
            fontSize: 16,
          }}
        >
          {isDarkMode ? 'Chế độ tối' : 'Chế độ sáng'}
        </Text>

        <Switch
          value={isDarkMode}
          onValueChange={toggleTheme}
        />
      </View>

      {/* Nhập công việc */}
      <TextInput
        style={[
          styles.input,
          {
            color: isDarkMode
              ? '#FFFFFF'
              : '#000000',
            borderColor: isDarkMode
              ? '#FFFFFF'
              : '#999999',
          },
        ]}
        value={todoText}
        onChangeText={setTodoText}
        placeholder="Nhập công việc..."
        placeholderTextColor={
          isDarkMode ? '#BBBBBB' : '#888888'
        }
      />

      <Button
        title="Thêm công việc"
        onPress={handleAddTodo}
      />

      <View style={styles.spaceLarge} />

      {/* Tìm kiếm */}
      <TextInput
        style={[
          styles.input,
          {
            color: isDarkMode
              ? '#FFFFFF'
              : '#000000',
            borderColor: isDarkMode
              ? '#FFFFFF'
              : '#999999',
          },
        ]}
        value={keyword}
        onChangeText={setKeyword}
        placeholder="Tìm kiếm công việc..."
        placeholderTextColor={
          isDarkMode ? '#BBBBBB' : '#888888'
        }
      />

      {/* Số công việc chưa hoàn thành */}
      <Text
        style={[
          styles.remaining,
          {
            color: isDarkMode
              ? '#FFFFFF'
              : '#000000',
          },
        ]}
      >
        Công việc chưa hoàn thành: {remainingTodos}
      </Text>

      {/* Danh sách */}
      <FlatList
        data={filteredTodos}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <TodoItem
            item={item}
            onToggle={handleToggleTodo}
            onDelete={handleDeleteTodo}
          />
        )}
        ListEmptyComponent={
          <Text
            style={[
              styles.empty,
              {
                color: isDarkMode
                  ? '#FFFFFF'
                  : '#000000',
              },
            ]}
          >
            Không có công việc nào
          </Text>
        }
      />
    </View>
  );
}

/* =========================
   12. COMPONENT APP
========================= */

export default function BaiQuanLyCongViec() {
  const [isDarkMode, setIsDarkMode] = useState(false);

  const toggleTheme = useCallback(() => {
    setIsDarkMode(previousMode => !previousMode);
  }, []);

  return (
    <ThemeContext.Provider
      value={{
        isDarkMode,
        toggleTheme,
      }}
    >
      <TodoScreen />
    </ThemeContext.Provider>
  );
}

/* =========================
   13. STYLE
========================= */

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },

  title: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },

  themeContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },

  input: {
    borderWidth: 1,
    borderRadius: 5,
    padding: 12,
    marginBottom: 12,
    backgroundColor: 'transparent',
  },

  remaining: {
    fontSize: 18,
    fontWeight: 'bold',
    marginVertical: 15,
  },

  todoItem: {
    padding: 15,
    borderRadius: 8,
    marginBottom: 12,
  },

  todoContent: {
    marginBottom: 10,
  },

  todoTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },

  buttonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  space: {
    width: 10,
  },

  spaceLarge: {
    height: 20,
  },

  empty: {
    textAlign: 'center',
    fontSize: 18,
    marginTop: 30,
  },
});