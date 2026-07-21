import { Feather } from "@expo/vector-icons";
import { StyleSheet, Text, View } from "react-native";

import { Colors, Fonts, Radius, Spacing } from "@/constants";

type Props = {
  message: string;

  type?: "error" | "success" | "warning" | "info";
};

export default function AlertMessage({ message, type = "info" }: Props) {
  return (
    <View
      style={[
        styles.container,

        type === "error" && styles.error,

        type === "success" && styles.success,

        type === "warning" && styles.warning,

        type === "info" && styles.info,
      ]}
    >
      <Feather
        name={
          type === "error"
            ? "alert-circle"
            : type === "success"
              ? "check-circle"
              : type === "warning"
                ? "alert-triangle"
                : "info"
        }
        size={18}
        color="white"
      />

      <Text style={styles.message}>{message}</Text>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flexDirection: "row",

    alignItems: "center",

    gap: Spacing.sm,

    padding: Spacing.md,

    borderRadius: Radius.md,

    marginBottom: Spacing.lg,
  },

  message: {
    flex: 1,

    color: "white",

    fontFamily: Fonts.medium,

    fontSize: 13,
  },

  error: {
    backgroundColor: Colors.error,
  },

  success: {
    backgroundColor: Colors.success,
  },

  warning: {
    backgroundColor: Colors.warning,
  },

  info: {
    backgroundColor: Colors.info,
  },
});
