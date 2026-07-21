import { Colors } from "@/constants/colors";
import { Fonts } from "@/constants/fonts";
import { StyleSheet, Text, View } from "react-native";

export default function PasswordStrength() {
  return (
    <>
      <View style={styles.strengthHeader}>
        <Text style={styles.strengthLabel}>Seguridad de la contraseña:</Text>
        <Text style={styles.strengthText}>Débil</Text>
      </View>
      <View style={styles.strengthBars}>
        <View style={[styles.bar, styles.barActive]} />
        <View style={styles.bar} />
        <View style={styles.bar} />
        <View style={styles.bar} />
        <View style={styles.bar} />
      </View>
    </>
  );
}
const styles = StyleSheet.create({
  strengthHeader: {
    flexDirection: "row",

    justifyContent: "space-between",

    alignItems: "center",

    marginTop: 10,
  },
  strengthLabel: {
    color: "white",
    fontSize: 12,
    fontFamily: Fonts.medium,
    opacity: 0.5,

    marginTop: 10,
  },

  strengthBars: {
    flexDirection: "row",

    marginTop: 10,

    gap: 8,
  },

  bar: {
    flex: 1,

    height: 8,

    borderRadius: 4,

    borderWidth: 1,

    borderColor: Colors.bordersInput,
  },

  barActive: {
    backgroundColor: "#FF0000",

    borderColor: "#FF0000",
  },

  strengthText: {
    color: "#FF0000",

    textAlign: "right",
    fontSize: 11,

    marginTop: 5,

    fontFamily: Fonts.medium,
    opacity: 0.8,
  },
});
