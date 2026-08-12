import {
  ImageSourcePropType,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";

import { Colors, Fonts } from "@/constants";
import Avatar from "../ui/Avatar";

type Props = {
  avatar: ImageSourcePropType;

  name: string;

  message: string;

  category: string;

  categoryColor: string;

  time: string;

  unread?: number;

  onPress?: () => void;
};

export default function ChatItem({
  avatar,
  name,
  message,
  category,
  categoryColor,
  time,
  unread,
  onPress,
}: Props) {
  return (
    <Pressable style={styles.card} onPress={onPress}>
      {/* Avatar */}

      <View style={styles.avatarContainer}>
        <Avatar source={avatar} size={58} platform="whatsapp" />
      </View>

      {/* Información */}

      <View style={styles.infoContainer}>
        <Text style={styles.name}>{name}</Text>

        <Text style={styles.message} numberOfLines={1}>
          {message}
        </Text>

        <View
          style={[
            styles.categoryBadge,
            {
              backgroundColor: categoryColor,
            },
          ]}
        >
          <Text style={styles.categoryText}>{category}</Text>
        </View>
      </View>

      {/* Hora */}

      <View style={styles.statusContainer}>
        <Text style={styles.time}>{time}</Text>

        {unread && (
          <View style={styles.unreadBadge}>
            <Text style={styles.unreadText}>{unread}</Text>
          </View>
        )}
      </View>
    </Pressable>
  );
}
const styles = StyleSheet.create({
  card: {
    flexDirection: "row",

    alignItems: "center",

    width: "100%",

    alignSelf: "center",

    marginBottom: 15,

    padding: 18,

    borderWidth: 0.3,
    borderBottomColor: Colors.aqua,

    backgroundColor: "rgba(2,18,50,0.55)",
  },

  avatarContainer: {
    width: 50,

    justifyContent: "center",

    alignItems: "center",
  },

  avatar: {
    width: 70,

    height: 70,

    borderRadius: 999,
  },

  infoContainer: {
    flex: 1,
    marginHorizontal: 12,
  },

  name: {
    color: "white",

    fontSize: 18,

    fontFamily: Fonts.heavy,
  },

  message: {
    color: "#A9B7C6",

    marginTop: 5,

    fontSize: 12,

    fontFamily: Fonts.regular,
  },

  categoryBadge: {
    alignSelf: "flex-start",

    marginTop: 10,

    paddingHorizontal: 12,

    paddingVertical: 4,

    borderRadius: 999,
  },

  categoryText: {
    color: "white",

    fontSize: 10,

    fontFamily: Fonts.medium,
  },

  statusContainer: {
    width: 55,
    alignItems: "flex-end",

    justifyContent: "space-between",

    alignSelf: "stretch",

    marginLeft: 12,
  },
  unreadBadge: {
    minWidth: 24,

    height: 24,

    borderRadius: 12,

    backgroundColor: Colors.aqua,

    justifyContent: "center",

    alignItems: "center",

    paddingHorizontal: 6,
  },
  unreadText: {
    color: Colors.fondo,

    fontFamily: Fonts.heavy,

    fontSize: 12,
  },
  time: {
    color: "#A9B7C6",

    fontSize: 12,

    fontFamily: Fonts.regular,
  },
});
