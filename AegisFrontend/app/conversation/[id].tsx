import { Feather } from "@expo/vector-icons";
import { router, useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";

import { Colors, Fonts } from "@/constants";
import { ConversationDetail, getConversation } from "@/services/conversations";

export default function ConversationScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();

  const [conversation, setConversation] = useState<ConversationDetail | null>(
    null,
  );

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState("");

  useEffect(() => {
    if (!id) {
      return;
    }

    const loadConversation = async () => {
      try {
        setLoading(true);
        setError("");

        const data = await getConversation(id);

        console.log("💬 Conversación recuperada:", data);

        setConversation(data);
      } catch (error) {
        console.error("❌ Error recuperando conversación:", error);

        setError(
          error instanceof Error
            ? error.message
            : "No se pudo cargar la conversación.",
        );
      } finally {
        setLoading(false);
      }
    };

    loadConversation();
  }, [id]);

  if (loading) {
    return (
      <View style={styles.container}>
        <View style={styles.emptyContainer}>
          <ActivityIndicator size="small" color={Colors.aqua} />

          <Text style={styles.emptyTitle}>Cargando conversación...</Text>
        </View>
      </View>
    );
  }

  if (error || !conversation) {
    return (
      <View style={styles.container}>
        <View style={styles.emptyContainer}>
          <Feather name="alert-circle" size={32} color="#FF6B6B" />

          <Text style={styles.emptyTitle}>
            {error || "Conversación no encontrada."}
          </Text>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {/* HEADER */}
      <View style={styles.header}>
        <Pressable style={styles.backButton} onPress={() => router.back()}>
          <Feather name="arrow-left" size={24} color={Colors.aqua} />
        </Pressable>

        <View style={styles.headerInfo}>
          <Text style={styles.name}>{conversation.contactName}</Text>

          <Text style={styles.subtitle}>{conversation.source}</Text>
        </View>
      </View>

      <View style={styles.divider} />

      {/* MENSAJES */}
      <ScrollView
        style={styles.messagesContainer}
        contentContainerStyle={styles.messagesContent}
      >
        {[...conversation.messages]
          .sort(
            (a, b) =>
              new Date(a.sentAt).getTime() - new Date(b.sentAt).getTime(),
          )
          .map((message) => {
            const isClient = message.sender === "CLIENT";

            return (
              <View
                key={message.id}
                style={[
                  styles.messageBubble,
                  isClient ? styles.clientMessage : styles.companyMessage,
                ]}
              >
                <Text
                  style={[
                    styles.messageText,
                    !isClient && styles.companyMessageText,
                  ]}
                >
                  {message.content}
                </Text>

                <Text
                  style={[
                    styles.messageTime,
                    !isClient && styles.companyMessageTime,
                  ]}
                >
                  {new Date(message.sentAt).toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </Text>
              </View>
            );
          })}
      </ScrollView>
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

  messagesContainer: {
    flex: 1,
  },

  messagesContent: {
    padding: 16,
    gap: 10,
  },

  messageBubble: {
    maxWidth: "82%",
    paddingHorizontal: 15,
    paddingVertical: 11,
    borderRadius: 16,
  },

  clientMessage: {
    alignSelf: "flex-start",
    backgroundColor: "#252C35",
    borderBottomLeftRadius: 4,
  },

  companyMessage: {
    alignSelf: "flex-end",
    backgroundColor: Colors.aqua,
    borderBottomRightRadius: 4,
  },

  messageText: {
    fontFamily: Fonts.medium,
    fontSize: 14,
    color: "white",
  },

  companyMessageText: {
    color: Colors.fondo,
  },

  messageTime: {
    fontFamily: Fonts.regular,
    fontSize: 9,
    marginTop: 5,
    textAlign: "right",
    color: "#A9B7C6",
  },

  companyMessageTime: {
    color: Colors.fondo,
  },

  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    gap: 15,
    paddingHorizontal: 30,
  },

  emptyTitle: {
    color: "white",
    fontFamily: Fonts.medium,
    textAlign: "center",
  },
});
