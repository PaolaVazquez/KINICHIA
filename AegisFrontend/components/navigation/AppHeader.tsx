import { Pressable, StyleSheet, Text, View } from "react-native";

import { Feather } from "@expo/vector-icons";

import { Colors } from "@/constants/colors";
import { Fonts } from "@/constants/fonts";
type Props = {
  onMenuPress: () => void;
};

export default function AppHeader({ onMenuPress }: Props) {
  return (
    <View style={styles.container}>
      {/* Logo */}

      <View>
        <Text style={styles.logo}>
          KINICH<Text style={styles.logoHighlight}>IA</Text>
        </Text>

        <Text style={styles.slogan}>DETECTA. PROTEGE. PREVIENE.</Text>
      </View>

      {/* Acciones */}

      <View style={styles.actions}>
        <Pressable style={styles.iconButton}>
          <Feather name="bell" size={22} color="white" />
        </Pressable>

        <Pressable style={styles.iconButton} onPress={onMenuPress}>
          <Feather name="menu" size={28} color={Colors.aqua} />
        </Pressable>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flexDirection: "row",

    justifyContent: "space-between",

    alignItems: "center",

    paddingHorizontal: 25,

    paddingTop: 20,
  },

  logo: {
    color: "white",

    fontSize: 32,

    fontFamily: Fonts.heavy,
  },

  logoHighlight: {
    color: Colors.aqua,
  },

  slogan: {
    color: Colors.aqua,

    fontSize: 5,

    marginTop: 2,

    fontFamily: Fonts.heavy,

    letterSpacing: 1.5,
  },

  actions: {
    flexDirection: "row",

    alignItems: "center",

    gap: 15,
  },

  iconButton: {
    justifyContent: "center",

    alignItems: "center",
  },
});
