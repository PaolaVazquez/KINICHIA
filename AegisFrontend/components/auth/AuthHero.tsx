import { Image, StyleSheet, Text, View } from "react-native";

import { Fonts } from "@/constants";

type Props = {
  title: string;
  subtitle: string;
};

export default function AuthHero({ title, subtitle }: Props) {
  return (
    <View style={styles.container}>
      <View style={styles.textContainer}>
        <Text style={styles.title}>{title}</Text>

        <Text style={styles.subtitle}>{subtitle}</Text>
      </View>
      <Image
        source={require("../../assets/images/aegi-cat-cuadrado.png")}
        resizeMode="contain"
        style={styles.image}
      />
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flexDirection: "row",

    alignItems: "center",

    justifyContent: "center",
    paddingHorizontal: 30,
  },

  image: {
    width: 250,
    height: 250,
    marginBottom: -30,
  },

  textContainer: {
    width: "60%",
    marginLeft: 80,
    marginRight: -30,
  },

  title: {
    color: "white",

    fontSize: 18,

    fontFamily: Fonts.heavy,
  },

  subtitle: {
    color: "white",

    fontSize: 12,

    fontFamily: Fonts.regular,

    marginTop: 8,
  },
});
