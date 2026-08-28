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
import { useEffect, useState } from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";

import {
  Conversation,
  ConversationStats,
  getConversationStats,
  getConversations,
} from "@/services/conversations";

import { SafeAreaView } from "react-native-safe-area-context";

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);

  const [stats, setStats] = useState<ConversationStats>({
    all: 0,
    active: 0,
    threats: 0,
    resolved: 0,
  });

  const [recentConversations, setRecentConversations] = useState<
    Conversation[]
  >([]);

  useEffect(() => {
    const loadStats = async () => {
      try {
        const data = await getConversationStats();

        console.log("📊 Estadísticas del Home:", data);

        setStats(data);

        const conversations = await getConversations();

        const recent = conversations
          .filter((conversation) => conversation.lastAnalyzedAt)
          .sort(
            (a, b) =>
              new Date(b.lastAnalyzedAt!).getTime() -
              new Date(a.lastAnalyzedAt!).getTime(),
          )
          .slice(0, 2);

        setRecentConversations(recent);
      } catch (error) {
        console.error("❌ Error cargando estadísticas:", error);
      }
    };

    loadStats();
  }, []);

  const goToInspectEmail = () => {
    router.push("/InspectEmail");
  };
  const goToChats = () => {
    router.push("/Chats");
  };
  return (
    <AppLayout>
      <SafeAreaView style={{ flex: 1 }} edges={["top"]}>
        <AppHeader onMenuPress={() => setMenuOpen(true)} />
        {menuOpen && <SideMenu onClose={() => setMenuOpen(false)} />}

        <AuthHero
          title="¡Hola, Paola! 👋"
          subtitle="Protege tu entorno digital. Analiza correos y detecta amenazas antes de que sea tarde."
        />

        <View style={styles.statsSection}>
          <Text style={styles.statsTitle}>Estado de conversaciones</Text>

          <View style={styles.statsRow}>
            <View style={styles.statCard}>
              <Text style={styles.statValue}>{stats.all}</Text>
              <Text style={styles.statLabel}>Total</Text>
            </View>

            <View style={styles.statCard}>
              <Text style={styles.statValue}>{stats.active}</Text>
              <Text style={styles.statLabel}>Activas</Text>
            </View>

            <View style={styles.statCard}>
              <Text style={styles.statValue}>{stats.threats}</Text>
              <Text style={styles.statLabel}>Amenazas</Text>
            </View>

            <View style={styles.statCard}>
              <Text style={styles.statValue}>{stats.resolved}</Text>
              <Text style={styles.statLabel}>Resueltas</Text>
            </View>
          </View>
        </View>

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
              description="Próximamente: detecta amenazas en correos electrónicos."
              onPress={goToInspectEmail}
            />
            <QuickActionCard
              icon={<Feather name="link" size={30} color="#24C3DC" />}
              title="Analizar enlace"
              description="Próximamente: analiza enlaces y detecta sitios sospechosos."
            />

            <QuickActionCard
              icon={<Feather name="paperclip" size={30} color="#5AF0C8" />}
              title="Analizar archivo"
              description="Próximamente: analiza archivos en busca de amenazas."
            />

            <QuickActionCard
              icon={<Feather name="user" size={30} color="#B14CFF" />}
              title="Mensaje texto"
              description="Próximamente: analiza mensajes y remitentes sospechosos."
            />
          </ScrollView>
          <View style={styles.activitySection}>
            <Text style={styles.sectionTitle}>Actividad reciente</Text>

            {recentConversations.map((conversation) => (
              <RecentActivityItem
                key={conversation.id}
                title={conversation.contactName || "Contacto desconocido"}
                date={`Analizado el ${new Date(
                  conversation.lastAnalyzedAt!,
                ).toLocaleString("es-MX", {
                  day: "2-digit",
                  month: "short",
                  year: "numeric",
                  hour: "2-digit",
                  minute: "2-digit",
                })}`}
                status="Analizado"
                icon="message-circle"
                onPress={() => router.push(`/conversation/${conversation.id}`)}
              />
            ))}
          </View>
        </View>
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
  statsSection: {
    marginTop: 10,
    paddingHorizontal: 20,
  },

  statsTitle: {
    color: "white",
    fontFamily: Fonts.bold,
    fontSize: 14,
    marginBottom: 12,
  },

  statsRow: {
    flexDirection: "row",
    gap: 8,
  },

  statCard: {
    flex: 1,
    backgroundColor: "rgba(2,18,50,0.55)",

    borderRadius: 12,
    paddingVertical: 12,
    alignItems: "center",
  },

  statValue: {
    color: "white",
    fontFamily: Fonts.heavy,
    fontSize: 20,
  },

  statLabel: {
    color: "#A9B7C6",
    fontFamily: Fonts.regular,
    fontSize: 9,
    marginTop: 4,
  },
});
