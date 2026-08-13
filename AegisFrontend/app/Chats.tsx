import { router } from "expo-router";

import ChatItem from "@/components/chats/ChatItem";
import AppLayout from "@/components/layout/AppLayout";
import SideMenu from "@/components/menu/SideMenu";
import AppHeader from "@/components/navigation/AppHeader";

import Input from "@/components/ui/Input";
import SegmentedControl from "@/components/ui/SegmentedControl";
import { Colors, Dimensions, Spacing } from "@/constants";
import { Feather } from "@expo/vector-icons";
import { useState } from "react";
import { StyleSheet } from "react-native";

import { SafeAreaView } from "react-native-safe-area-context";

export default function Chat() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [filter, setFilter] = useState("all");
  return (
    <AppLayout
      overlay={menuOpen && <SideMenu onClose={() => setMenuOpen(false)} />}
    >
      <SafeAreaView style={{ flex: 1 }} edges={["top"]}>
        <AppHeader onMenuPress={() => setMenuOpen(true)} />

        <Input
          placeholder="Buscar conversaciones..."
          leftIcon="search"
          style={{
            marginTop: Spacing.xl,
            marginBottom: Spacing.lg,
          }}
          rightIcon={
            <Feather
              name="sliders"
              size={Dimensions.icon.md}
              color={Colors.aqua}
            />
          }
          onRightPress={() => {
            console.log("Abrir filtros");
          }}
        />

        <SegmentedControl
          selected={filter}
          onChange={setFilter}
          style={{
            marginTop: Spacing.sm,
            marginBottom: Spacing.lg,
          }}
          showCount
          items={[
            {
              label: "Todos",
              value: "all",
              count: 12,
            },

            {
              label: "Activos",
              value: "active",
              count: 5,
            },

            {
              label: "Amenazas",
              value: "threats",
              count: 3,
            },

            {
              label: "Resueltos",
              value: "resolved",
              count: 4,
            },
          ]}
        />

        <ChatItem
          avatar={require("../assets/images/icono-profile.png")}
          name="María González"
          message="Hola, necesito información sobre..."
          category="Clientes"
          categoryColor="#5B2AAE"
          time="9:41 AM"
          unread={1}
          onPress={() =>
            router.push("/conversation/b3686227-b349-45ba-b4db-80ce08fb9b46")
          }
        />
      </SafeAreaView>
    </AppLayout>
  );
}
const styles = StyleSheet.create({
  quickActions: {
    flexDirection: "row",

    gap: 15,

    marginTop: 20,

    paddingHorizontal: 20,
  },
});
