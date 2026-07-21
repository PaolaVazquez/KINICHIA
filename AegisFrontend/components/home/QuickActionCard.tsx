import { Pressable, StyleSheet, Text, View } from "react-native";

import { Fonts } from "@/constants";
import ArrowRight from "../icons/arrowRight";

type Props = {
  icon: React.ReactNode;
  title: string;
  description: string;
  onPress?: () => void;
};

export default function QuickActionCard({
  icon,
  title,
  description,
  onPress,
}: Props) {
  return (
    <Pressable onPress={onPress}>
      <View style={styles.card}>
        {icon}

        <Text style={styles.title}>{title}</Text>

        <Text style={styles.description}>{description}</Text>

        <View style={styles.arrowContainer}>
          <ArrowRight size={18} color="white" />
        </View>
      </View>
    </Pressable>
  );
}
const styles = StyleSheet.create({
  card: {
    width: 150,

    backgroundColor: "rgba(2,18,50,0.55)",

    borderRadius: 20,

    padding: 16,

    minHeight: 170,
  },

  title: {
    color: "white",

    marginTop: 15,

    fontSize: 16,

    fontFamily: Fonts.heavy,
  },

  description: {
    color: "#C9D4E3",

    marginTop: 10,

    fontSize: 12,

    lineHeight: 18,

    fontFamily: Fonts.regular,
  },

  arrowContainer: {
    marginTop: "auto",

    alignItems: "flex-end",
  },
});
