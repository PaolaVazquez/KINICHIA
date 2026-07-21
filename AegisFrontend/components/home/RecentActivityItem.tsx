import { Feather } from "@expo/vector-icons";
import { StyleSheet, Text, View } from "react-native";

import { Colors, Fonts } from "@/constants";
import ChevronRight from "../icons/chevronRight";

type Props = {
  email: string;
  date: string;
  status: string;
  onPress?: () => void;
};

export default function RecentActivityItem({ email, date, status }: Props) {
  return (
    <View style={styles.card}>
      {/* Icono */}

      <View style={styles.iconContainer}>
        <Feather name="mail" size={22} color={Colors.aqua} />
      </View>

      {/* Información */}

      <View style={styles.infoContainer}>
        <Text style={styles.email}>{email}</Text>

        <Text style={styles.date}>{date}</Text>
      </View>

      {/* Estado */}

      <View style={styles.statusContainer}>
        <View style={styles.statusBadge}>
          <Text style={styles.statusText}>{status}</Text>
        </View>

        <ChevronRight size={18} color="#A9B7C6" />
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  card: {
    flexDirection: "row",

    alignItems: "center",

    backgroundColor: "rgba(2,18,50,0.55)",

    borderWidth: 1,

    borderColor: Colors.bordersCard,

    borderRadius: 22,

    padding: 18,

    marginTop: 15,
  },

  iconContainer: {
    width: 44,
    height: 44,

    borderRadius: 999,

    backgroundColor: Colors.backgroundIcon,

    justifyContent: "center",
    alignItems: "center",
  },

  infoContainer: {
    flex: 1,

    marginLeft: 15,
  },

  email: {
    color: "white",

    fontSize: 13,

    fontFamily: Fonts.heavy,
  },

  date: {
    color: "#B4C0CF",

    marginTop: 6,

    fontSize: 9,

    fontFamily: Fonts.regular,
  },

  statusContainer: {
    flexDirection: "row",

    alignItems: "center",

    gap: 15,
  },

  statusBadge: {
    backgroundColor: "#003D37",

    paddingHorizontal: 12,

    paddingVertical: 3,

    borderRadius: 999,
  },

  statusText: {
    color: "#25FFD5",

    fontFamily: Fonts.medium,

    fontSize: 10,
  },
});
