import AuthHero from "@/components/auth/AuthHero";
import InspectCard from "@/components/home/InspectCard";
import QuickActionCard from "@/components/home/QuickActionCard";
import RecentActivityItem from "@/components/home/RecentActivityItem";
import AppLayout from "@/components/layout/AppLayout";
import SideMenu from "@/components/menu/SideMenu";
import AppHeader from "@/components/navigation/AppHeader";
import { Fonts } from "@/constants/fonts";
import { Feather, FontAwesome } from "@expo/vector-icons";
import { router } from "expo-router";
import { useState } from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const goToInspectEmail = () => {
    router.push("/InspectEmail");
  };
  const goToChats = () => {
    router.push("/Chats");
  };
  return (
    <AppLayout>
      <AppHeader onMenuPress={() => setMenuOpen(true)} />
      {menuOpen && <SideMenu onClose={() => setMenuOpen(false)} />}

      <AuthHero
        title="¡Hola, Paola! 👋"
        subtitle="Protege tu entorno digital. Analiza correos y detecta amenazas antes de que sea tarde."
      />

      <InspectCard
        icon={<FontAwesome name="whatsapp" size={28} color="#25D366" />}
        title="Analizar WhatsApp "
        description="Analiza las conversaciones en WhatsApp Business."
        onPress={goToChats}
      />
      <View>
        <Text style={styles.titleAcciones}>Acciones rápidas</Text>

        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.quickActions}
        >
          <QuickActionCard
            icon={<Feather name="mail" size={30} color="#24C3DC" />}
            title="Analizar correo "
            description="Verifica si un correo electrónico es seguro."
            onPress={goToInspectEmail}
          />
          <QuickActionCard
            icon={<Feather name="link" size={30} color="#24C3DC" />}
            title="Analizar enlace"
            description="Verifica si una URL es segura."
          />

          <QuickActionCard
            icon={<Feather name="paperclip" size={30} color="#5AF0C8" />}
            title="Analizar archivo"
            description="Escanea archivos en busca de amenazas."
          />

          <QuickActionCard
            icon={<Feather name="user" size={30} color="#B14CFF" />}
            title="Mensaje texto"
            description="Verifica la reputación de un remitente."
          />
        </ScrollView>
        <View style={styles.activitySection}>
          <Text style={styles.sectionTitle}>Actividad reciente</Text>

          <RecentActivityItem
            email="reporte@empresa.com"
            date="Analizado el 24 May 2026, 09:41 AM"
            status="Seguro"
          />

          <RecentActivityItem
            email="ventas@empresa.com"
            date="Analizado el 25 May 2026, 08:15 PM"
            status="Seguro"
          />
        </View>
      </View>
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
  titleAcciones: {
    color: "white",

    fontFamily: Fonts.bold,
    marginTop: 20,
    paddingHorizontal: 20,
  },
  activitySection: {
    marginTop: 30,

    paddingHorizontal: 20,
  },

  sectionTitle: {
    color: "white",

    fontSize: 20,

    fontFamily: Fonts.heavy,

    marginBottom: 15,
  },
});
