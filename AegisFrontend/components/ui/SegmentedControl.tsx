import {
  Pressable,
  ScrollView,
  StyleProp,
  StyleSheet,
  Text,
  ViewStyle,
} from "react-native";

import { Colors, Radius, Spacing } from "@/constants";
import { Fonts } from "@/constants/fonts";

type Item = {
  label: string;
  value: string;
  count?: number;
};

type Props = {
  items: Item[];
  selected: string;
  onChange: (value: string) => void;
  style?: StyleProp<ViewStyle>;
   showCount?: boolean;
};

export default function SegmentedControl({
  items,
  selected,
  onChange,
  style,
  showCount
}: Props) {
  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={[styles.container, style]}
    >
      {items.map((item) => (
        <Pressable
          key={item.value}
          onPress={() => onChange(item.value)}
          style={[styles.tab, selected === item.value && styles.activeTab]}
        >
          <Text
            style={[
              styles.label,

              selected === item.value && styles.activeLabel,
            ]}
          >
            {item.label}
          </Text>

        { showCount &&
          item.count !== undefined && (
            <Text
              style={[
                styles.count,

                selected === item.value && styles.activeLabel,
              ]}
            >
              {item.count}
            </Text>
          )}
        </Pressable>
      ))}
    </ScrollView>
  );
}
const styles = StyleSheet.create({
  container: {
    flexDirection: "row",

    marginTop: Spacing.lg,

    paddingHorizontal: Spacing.lg,
  },

  tab: {
    flexDirection: "row",

    alignItems: "center",

    paddingHorizontal: Spacing.lg,

    paddingVertical: Spacing.sm,

    borderRadius: Radius.full,
  },

  activeTab: {
    backgroundColor: Colors.lightblue,

    borderColor: Colors.aqua,

    borderWidth: 1,
  },

  label: {
    color: "#9CA3AF",

    fontFamily: Fonts.medium,

    fontSize: 12,
  },

  count: {
    marginLeft: Spacing.xs,

    color: "#9CA3AF",

    fontFamily: Fonts.heavy,

    marginTop: 2,

    fontSize: 13,
  },

  activeLabel: {
    color: "white",
  },
});
