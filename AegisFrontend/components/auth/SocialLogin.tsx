import { AntDesign } from "@expo/vector-icons";
import { Pressable, StyleSheet, Text, View } from "react-native";

export default function SocialLogin() {
  return (
    <View style={styles.container}>
      <View style={styles.dividerContainer}>
        <View style={styles.line} />

        <Text style={styles.text}>o continúa con</Text>

        <View style={styles.line} />
      </View>
      <View style={styles.socialContainer}>
        <Pressable style={styles.socialButton}>
          <AntDesign name="google" size={24} color="white" />
        </Pressable>

        <Pressable style={styles.socialButton}>
          <AntDesign name="apple" size={24} color="white" />
        </Pressable>

        <Pressable style={styles.socialButton}>
          <Text>M</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 25,
  },

  dividerContainer: {
    flexDirection: "row",
    alignItems: "center",
  },

  line: {
    flex: 1,
    height: 1,
    backgroundColor: "#FFFFFF40",
  },

  text: {
    color: "white",

    marginHorizontal: 12,

    fontSize: 12,
    opacity: 0.52,
  },
  socialContainer: {
    flexDirection: "row",
    justifyContent: "center",

    gap: 15,

    marginTop: 20,
  },
  socialButton: {
    width: 55,
    height: 55,

    borderRadius: 15,

    borderWidth: 1,
    borderColor: "#FFFFFF30",

    justifyContent: "center",
    alignItems: "center",

    backgroundColor: "rgba(255,255,255,0.03)",
  },
});
