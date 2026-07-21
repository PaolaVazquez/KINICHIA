import { Fonts } from "@/constants/fonts";
import { LinearGradient } from "expo-linear-gradient";
import { Pressable, StyleSheet, Text } from "react-native";

type Props = {
  title: string;
  onPress: () => void;
};

export default function Button({ title, onPress }: Props) {
  return (
    <Pressable style={styles.button} onPress={onPress}>
      <LinearGradient
        colors={["#0054F8", "#24C3DC"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        style={styles.button}
      >
        <Text style={styles.text}>{title}</Text>
      </LinearGradient>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    width: "100%",
    height: 55,

    borderRadius: 12,

    justifyContent: "center",
    alignItems: "center",

    marginTop: 20,
  },

  text: {
    color: "white",

    fontFamily: Fonts.bold,

    fontSize: 16,
  },
});
