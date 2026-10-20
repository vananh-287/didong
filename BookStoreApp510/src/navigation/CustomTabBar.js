import React from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import Badge from '../components/Badge';
import useCart from '../hooks/useCart';
import { colors } from '../theme';

const ICONS = {
  Home: ['home', 'home-outline'],
  Categories: ['grid', 'grid-outline'],
  Cart: ['cart', 'cart-outline'],
  Account: ['person', 'person-outline'],
};

// Tab Bar tuần 3-4 dùng làm tabBar tùy chỉnh: nhận { state, descriptors, navigation }
export default function CustomTabBar({ state, descriptors, navigation }) {
  const insets = useSafeAreaInsets();
  const { totalQuantity } = useCart();

  return (
    <View style={[styles.bar, { paddingBottom: Math.max(insets.bottom, 8) }]}>
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];
        const label = options.title ?? route.name;
        const focused = state.index === index; // state.index => tab đang chọn
        const [active, inactive] = ICONS[route.name] || ['ellipse', 'ellipse-outline'];

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          });
          if (!focused && !event.defaultPrevented) {
            navigation.navigate({ name: route.name, merge: true });
          }
        };

        return (
          <Pressable key={route.key} onPress={onPress} style={styles.item}>
            <View>
              <Ionicons
                name={focused ? active : inactive}
                size={24}
                color={focused ? colors.indigo : colors.muted}
              />
              {route.name === 'Cart' ? <Badge count={totalQuantity} style={styles.badge} /> : null}
            </View>
            <Text style={[styles.label, focused && styles.labelActive]}>{label}</Text>
            {focused ? <View style={styles.dot} /> : null}
          </Pressable>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  bar: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: colors.border,
    paddingTop: 8,
  },
  item: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  label: { fontSize: 11, color: colors.muted, marginTop: 2, fontWeight: '600' },
  labelActive: { color: colors.indigo },
  dot: { width: 5, height: 5, borderRadius: 3, backgroundColor: colors.cyan, marginTop: 3 },
  badge: { position: 'absolute', top: -6, right: -10 },
});
