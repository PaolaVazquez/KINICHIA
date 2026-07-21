import { Pressable, StyleSheet, Text, View } from "react-native";

import { Colors, Fonts } from "@/constants";

type Props = {
  activeTab: "login" | "register";
  onChange: (tab: "login" | "register") => void;
};

export default function AuthTabs({ activeTab, onChange }: Props) {
  return (
    <View style={styles.container}>
      <Pressable style={styles.tab} onPress={() => onChange("login")}>
        <Text style={[styles.text, activeTab === "login" && styles.activeText]}>
          Iniciar sesión
        </Text>

        {activeTab === "login" && <View style={styles.indicator} />}
      </Pressable>

      <Pressable style={styles.tab} onPress={() => onChange("register")}>
        <Text
          style={[styles.text, activeTab === "register" && styles.activeText]}
        >
          Crear cuenta
        </Text>

        {activeTab === "register" && <View style={styles.indicator} />}
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "center",
    gap: 30,
  },

  tab: {
    alignItems: "center",
  },

  text: {
    color: "#FFFFFF80",
    fontFamily: Fonts.heavy,
    fontSize: 16,
  },

  activeText: {
    color: Colors.aqua,
  },

  indicator: {
    marginTop: 8,
    width: "100%",
    height: 2,
    backgroundColor: Colors.aqua,
  },
});
