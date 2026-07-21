import { Image, StyleSheet, Text, View } from "react-native";

import { Colors } from "@/constants/colors";
import { Fonts } from "@/constants/fonts";

type Props = {
  name: string;
  email: string;
};

export default function UserProfile({ name, email }: Props) {
  return (
    <View style={styles.container}>
      <View style={styles.avatarContainer}>
        <Image
          source={require("../../assets/images/icono-profile.png")}
          style={styles.avatar}
          resizeMode="contain"
        />
      </View>

      <Text style={styles.name}>{name}</Text>

      <Text style={styles.email}>{email}</Text>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    alignItems: "center",

    marginTop: 10,

    marginBottom: 20,
  },

  avatarContainer: {
    width: 180,
    height: 180,

    borderRadius: 999,

    borderWidth: 2,

    borderColor: Colors.aqua,

    justifyContent: "center",

    alignItems: "center",
  },

  avatar: {
    width: 140,
    height: 140,
  },

  name: {
    color: "white",

    marginTop: 20,

    fontSize: 24,

    fontFamily: Fonts.heavy,
  },

  email: {
    color: "#B4C0CF",

    marginTop: 8,

    fontSize: 14,

    fontFamily: Fonts.regular,
  },
});
