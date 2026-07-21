import { Pressable, StyleSheet, Text, View } from "react-native";

import { Colors, Fonts } from "@/constants";
import CircleButton from "../ui/CircleButton";

type Props = {
  title: string;

  description: string;

  icon: React.ReactNode;

  onPress?: () => void;
};

export default function InspectCard({
  title,
  description,
  icon,
  onPress,
}: Props) {
  return (
    <Pressable onPress={onPress}>
      <View style={styles.card}>
        <View style={styles.row}>
          <View style={styles.leftContent}>
            <View style={styles.iconCard}>{icon}</View>

            <View style={styles.textContainer}>
              <Text style={styles.title}>{title}</Text>

              <Text style={styles.descriptionText}>{description}</Text>
            </View>
          </View>

          <View style={styles.buttonContainer}>
            <CircleButton onPress={() => {}} />
          </View>
        </View>
      </View>
    </Pressable>
  );
}
const styles = StyleSheet.create({
  card: {
    width: "90%",

    alignSelf: "center",

    borderRadius: 25,

    borderWidth: 2,

    borderColor: Colors.bordersCard,

    backgroundColor: "rgba(2,18,50,0.55)",

    padding: 20,

    marginTop: 20,
  },
  row: {
    flexDirection: "row",
  },

  leftContent: {
    flex: 1,

    flexDirection: "row",

    alignItems: "flex-start",
  },

  textContainer: {
    flex: 1,

    marginLeft: 15,
  },

  buttonContainer: {
    justifyContent: "center",

    alignItems: "center",
  },
  iconCard: {
    backgroundColor: Colors.backgroundIcon,

    width: 70,
    height: 70,

    borderRadius: 15,

    color: Colors.aqua,
    justifyContent: "center",
    alignItems: "center",
  },

  title: {
    color: "white",

    fontSize: 23,

    fontFamily: Fonts.heavy,

    textAlign: "left",
    lineHeight: 25,
  },
  descriptionText: {
    color: "white",

    textAlign: "left",

    marginTop: 15,

    lineHeight: 18,

    fontSize: 12,

    fontFamily: Fonts.regular,
  },
});
