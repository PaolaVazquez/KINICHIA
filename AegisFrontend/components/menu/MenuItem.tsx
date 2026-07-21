import { Pressable, StyleSheet, Text, View } from "react-native";

import { Colors } from "@/constants/colors";
import { Fonts } from "@/constants/fonts";

type Props = {
  icon: React.ReactNode;
  label: string;
  active?: boolean;
  onPress?: () => void;
};

export default function MenuItem({
  icon,
  label,
  active = false,
  onPress,
}: Props) {
  return (
    <Pressable
      style={[styles.container, active && styles.activeContainer]}
      onPress={onPress}
    >
      <View style={styles.icon}>{icon}</View>

      <Text style={styles.label}>{label}</Text>
    </Pressable>
  );
}
const styles = StyleSheet.create({
  container: {
    flexDirection: "row",

    alignItems: "center",

    paddingVertical: 14,

    paddingHorizontal: 20,

    borderRadius: 18,

    marginBottom: 8,
  },

  activeContainer: {
    borderWidth: 1.5,

    borderColor: Colors.aqua,
  },

  icon: {
    width: 40,

    justifyContent: "center",

    alignItems: "center",
  },

  label: {
    color: "white",

    marginLeft: 16,

    fontSize: 15,

    fontFamily: Fonts.medium,
  },
});
