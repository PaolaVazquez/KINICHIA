import { StyleSheet, Text, View } from "react-native";

import { Colors } from "@/constants/colors";
import { Fonts } from "@/constants/fonts";

type Props = {
  icon: React.ReactNode;
  title: string;
  description: string;
};

export default function AnalysisItem({ icon, title, description }: Props) {
  return (
    <View style={styles.container}>
      <View style={styles.iconContainer}>{icon}</View>

      <View style={styles.content}>
        <Text style={styles.title}>{title}</Text>

        <Text style={styles.description}>{description}</Text>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  iconContainer: {
    width: 46,
    height: 46,

    borderRadius: 999,

    justifyContent: "center",
    alignItems: "center",

    backgroundColor: Colors.backgroundIcon,
  },
  container: {
    flexDirection: "row",

    alignItems: "flex-start",

    width: "100%",

    marginBottom: 25,
  },

  content: {
    flex: 1,

    marginLeft: 12,
  },
  title: {
    color: "white",

    fontFamily: Fonts.heavy,

    fontSize: 15,
  },

  description: {
    color: "#8E99AE",

    marginTop: 5,

    fontSize: 11,

    lineHeight: 15,
  },
});
