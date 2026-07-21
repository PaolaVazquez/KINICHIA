import { Colors } from "@/constants/colors";
import { FontAwesome } from "@expo/vector-icons";
import { Image, ImageSourcePropType, StyleSheet, View } from "react-native";

type Props = {
  source: ImageSourcePropType;

  size?: number;

  platform?: "whatsapp" | "messenger" | "instagram";

  online?: boolean;
};

export default function Avatar({ source, size = 58, platform, online }: Props) {
  return (
    <View style={styles.container}>
      <Image
        source={source}
        style={[
          styles.avatar,
          {
            width: size,
            height: size,
            borderRadius: size / 2,
          },
        ]}
      />
      {platform === "whatsapp" && (
        <View style={styles.platformBadge}>
          <FontAwesome name="whatsapp" size={14} color="#25D366" />
        </View>
      )}

      {online && <View style={styles.onlineBadge} />}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: "relative",

    alignSelf: "flex-start",
  },
  platformBadge: {
    position: "absolute",

    right: -2,

    bottom: -2,

    width: 22,

    height: 22,

    borderRadius: 11,

    justifyContent: "center",

    alignItems: "center",

    backgroundColor: Colors.fondo,

    borderWidth: 2,

    borderColor: Colors.fondo,
  },
  onlineBadge: {
    position: "absolute",

    top: 0,

    right: 0,

    width: 12,

    height: 12,

    borderRadius: 6,

    backgroundColor: "#39FF88",

    borderWidth: 2,

    borderColor: Colors.fondo,
  },
  avatar: {
    resizeMode: "cover",
  },
});
