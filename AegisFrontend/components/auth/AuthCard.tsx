import { Colors } from "@/constants";
import { ReactNode } from "react";
import { StyleSheet, View } from "react-native";

type Props = {
  children: ReactNode;
};

export default function AuthCard({ children }: Props) {
  return <View style={styles.card}>{children}</View>;
}

const styles = StyleSheet.create({
  card: {
    width: "90%",
    maxWidth: 520,

    alignSelf: "center",

    backgroundColor: "transparent",

    borderWidth: 2,
    borderColor: Colors.blue,

    borderRadius: 30,

    padding: 25,
  },
});
