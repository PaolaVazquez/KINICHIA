import { Feather } from "@expo/vector-icons";
import { router, useLocalSearchParams } from "expo-router";
import {
  ActivityIndicator,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";

import { Colors, Fonts } from "@/constants";

export default function ConversationScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Pressable style={styles.backButton} onPress={() => router.back()}>
          <Feather name="arrow-left" size={24} color={Colors.aqua} />
        </Pressable>

        <View style={styles.headerInfo}>
          <Text style={styles.name}>Conversación</Text>

          <Text style={styles.subtitle}>ID: {id}</Text>
        </View>
      </View>

      <View style={styles.divider} />

      <View style={styles.emptyContainer}>
        <Text style={styles.emptyTitle}>Cargando conversación...</Text>

        <ActivityIndicator size="small" color={Colors.aqua} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.fondo,
  },

  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingTop: 25,
    paddingBottom: 15,
  },

  backButton: {
    width: 42,
    height: 42,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 10,
  },

  headerInfo: {
    flex: 1,
  },

  name: {
    color: "white",
    fontSize: 18,
    fontFamily: Fonts.heavy,
  },

  subtitle: {
    color: "#A9B7C6",
    fontSize: 10,
    marginTop: 3,
    fontFamily: Fonts.regular,
  },

  divider: {
    height: 1,
    backgroundColor: Colors.bordersInput,
  },

  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    gap: 15,
  },

  emptyTitle: {
    color: "white",
    fontFamily: Fonts.medium,
  },
});
