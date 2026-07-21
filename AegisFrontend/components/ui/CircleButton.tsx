import { Pressable, StyleSheet } from "react-native";

import { Colors } from "@/constants/colors";

import ArrowRight from "../icons/arrowRight";

type Props = {
  onPress: () => void;
};

export default function CircleButton({ onPress }: Props) {
  return (
    <Pressable style={styles.button} onPress={onPress}>
      <ArrowRight color="black" />
    </Pressable>
  );
}
const styles = StyleSheet.create({
  button: {
    width: 35,
    height: 35,

    borderRadius: 999,

    backgroundColor: Colors.aqua,

    justifyContent: "center",
    alignItems: "center",
  },
});
