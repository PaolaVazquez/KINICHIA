import { router } from "expo-router";
import { useEffect, useState } from "react";
import { ActivityIndicator, StyleSheet, Text, View } from "react-native";

import ChatItem from "@/components/chats/ChatItem";
import AppLayout from "@/components/layout/AppLayout";
import SideMenu from "@/components/menu/SideMenu";
import AppHeader from "@/components/navigation/AppHeader";

import Input from "@/components/ui/Input";
import SegmentedControl from "@/components/ui/SegmentedControl";
import { Colors, Dimensions, Fonts, Spacing } from "@/constants";
import { Feather } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";

import { Conversation, getConversations } from "@/services/conversations";

export default function Chat() {
  const [menuOpen, setMenuOpen] = useState(false);

  const [filter, setFilter] = useState("all");

  const [search, setSearch] = useState("");

  const [conversations, setConversations] = useState<Conversation[]>([]);

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState("");
  useEffect(() => {
    const timeout = setTimeout(async () => {
      try {
        setLoading(true);
        setError("");

        const data = await getConversations(search);

        console.log("💬 Conversaciones recuperadas:", data);

        setConversations(data);
      } catch (error) {
        console.error("❌ Error recuperando conversaciones:", error);

        setError(
          error instanceof Error
            ? error.message
            : "No se pudieron cargar las conversaciones.",
        );
      } finally {
        setLoading(false);
      }
    }, 400);

    return () => clearTimeout(timeout);
  }, [search]);

  const formatTime = (date: string | null) => {
    if (!date) {
      return "";
    }

    return new Date(date).toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const formatSearchTime = (date: string) => {
    return new Date(date).toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });
  };
  const filteredConversations = conversations.filter((conversation) => {
    if (filter === "active") {
      return conversation.status === "PENDING";
    }

    if (filter === "resolved") {
      return conversation.status === "RESOLVED";
    }

    return true;
  });

  return (
    <AppLayout
      overlay={menuOpen && <SideMenu onClose={() => setMenuOpen(false)} />}
    >
      <SafeAreaView style={styles.safeArea} edges={["top"]}>
        <AppHeader onMenuPress={() => setMenuOpen(true)} />

        <Input
          placeholder="Buscar conversaciones..."
          leftIcon="search"
          value={search}
          onChangeText={setSearch}
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
              count: conversations.length,
            },
            {
              label: "Activos",
              value: "active",
              count: conversations.filter(
                (conversation) => conversation.status === "PENDING",
              ).length,
            },
            {
              label: "Amenazas",
              value: "threats",
              count: 0,
            },
            {
              label: "Resueltos",
              value: "resolved",
              count: conversations.filter(
                (conversation) => conversation.status === "RESOLVED",
              ).length,
            },
          ]}
        />

        {loading && (
          <View style={styles.stateContainer}>
            <ActivityIndicator size="small" color={Colors.aqua} />

            <Text style={styles.stateText}>Cargando conversaciones...</Text>
          </View>
        )}

        {!loading && error !== "" && (
          <View style={styles.stateContainer}>
            <Feather name="alert-circle" size={30} color="#FF6B6B" />

            <Text style={styles.stateText}>{error}</Text>
          </View>
        )}

        {!loading && error === "" && filteredConversations.length === 0 && (
          <View style={styles.stateContainer}>
            <Feather name="message-circle" size={32} color={Colors.aqua} />

            <Text style={styles.stateText}>
              No hay conversaciones para mostrar.
            </Text>
          </View>
        )}

        {!loading &&
          error === "" &&
          search.trim() === "" &&
          filteredConversations.map((conversation) => (
            <ChatItem
              key={conversation.id}
              avatar={require("../assets/images/icono-profile.png")}
              name={conversation.contactName || "Contacto desconocido"}
              message={conversation.lastMessage || "Sin mensajes"}
              category="Clientes"
              categoryColor="#5B2AAE"
              time={formatTime(conversation.lastMessageAt)}
              unread={undefined}
              onPress={() => router.push(`/conversation/${conversation.id}`)}
            />
          ))}

        {!loading && error === "" && search.trim() !== "" && (
          <View style={styles.searchResultsContainer}>
            <Text style={styles.searchResultsTitle}>
              Resultados para: {search.trim()}
            </Text>

            {filteredConversations.flatMap((conversation) =>
              conversation.searchMatches.map((match) => (
                <View
                  key={`${conversation.id}-${match.id}`}
                  style={styles.searchResult}
                >
                  <View style={styles.searchResultHeader}>
                    <Text style={styles.searchResultName}>
                      {conversation.contactName || "Contacto desconocido"}
                    </Text>

                    <Text style={styles.searchResultTime}>
                      {formatSearchTime(match.sentAt)}
                    </Text>
                  </View>

                  <Text style={styles.searchResultMessage}>
                    {match.content}
                  </Text>
                </View>
              )),
            )}
          </View>
        )}
      </SafeAreaView>
    </AppLayout>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },

  stateContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 30,
    gap: 12,
  },

  stateText: {
    color: "#A9B7C6",
    fontFamily: Fonts.regular,
    fontSize: 13,
    textAlign: "center",
  },

  searchResultsContainer: {
    paddingHorizontal: 16,
    paddingBottom: 20,
  },

  searchResultsTitle: {
    color: "white",
    fontFamily: Fonts.bold,
    fontSize: 14,
    marginBottom: 12,
  },

  searchResult: {
    paddingVertical: 14,
    paddingHorizontal: 14,
    marginBottom: 10,
    borderRadius: 14,
    backgroundColor: "#1C242D",
    borderWidth: 1,
    borderColor: Colors.bordersInput,
  },

  searchResultHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 6,
  },

  searchResultName: {
    color: Colors.aqua,
    fontFamily: Fonts.bold,
    fontSize: 13,
  },

  searchResultTime: {
    color: "#A9B7C6",
    fontFamily: Fonts.regular,
    fontSize: 9,
  },

  searchResultMessage: {
    color: "white",
    fontFamily: Fonts.regular,
    fontSize: 13,
    lineHeight: 19,
  },
});
