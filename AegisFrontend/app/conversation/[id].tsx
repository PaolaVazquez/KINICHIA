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
  const latestAnalysis =
    conversation.analysis.length > 0
      ? [...conversation.analysis].sort(
          (a, b) =>
            new Date(b.analyzedAt).getTime() - new Date(a.analyzedAt).getTime(),
        )[0]
      : null;
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
      {latestAnalysis && (
        <View style={styles.analysisBanner}>
          <View style={styles.analysisHeader}>
            <View>
              <Text style={styles.analysisLabel}>🛡️ ANÁLISIS DE SEGURIDAD</Text>

              <Text style={styles.analysisSummary}>
                {latestAnalysis.summary}
              </Text>
            </View>

            <View style={styles.scoreContainer}>
              <Text style={styles.score}>{latestAnalysis.score}</Text>

              <Text style={styles.scoreLabel}>/100</Text>
            </View>
          </View>

          <View style={styles.riskRow}>
            <View
              style={[
                styles.riskBadge,
                latestAnalysis.riskLevel === "HIGH" && styles.highRisk,
                latestAnalysis.riskLevel === "MEDIUM" && styles.mediumRisk,
                latestAnalysis.riskLevel === "LOW" && styles.lowRisk,
              ]}
            >
              <Text style={styles.riskText}>
                RIESGO {latestAnalysis.riskLevel}
              </Text>
            </View>

            <Text style={styles.signalCount}>
              {latestAnalysis.reasons.length} señales detectadas
            </Text>
          </View>
        </View>
      )}

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
  analysisBanner: {
    marginHorizontal: 16,
    marginTop: 12,
    marginBottom: 4,
    padding: 15,
    borderRadius: 16,
    backgroundColor: "#1C242D",
    borderWidth: 1,
    borderColor: Colors.bordersInput,
  },

  analysisHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  analysisLabel: {
    color: Colors.aqua,
    fontFamily: Fonts.heavy,
    fontSize: 11,
  },

  analysisSummary: {
    color: "#A9B7C6",
    fontFamily: Fonts.regular,
    fontSize: 10,
    marginTop: 5,
  },

  scoreContainer: {
    flexDirection: "row",
    alignItems: "baseline",
  },

  score: {
    color: "white",
    fontFamily: Fonts.heavy,
    fontSize: 24,
  },

  scoreLabel: {
    color: "#A9B7C6",
    fontFamily: Fonts.regular,
    fontSize: 10,
  },

  riskRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 12,
    gap: 10,
  },

  riskBadge: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 8,
  },

  highRisk: {
    backgroundColor: "#8B2635",
  },

  mediumRisk: {
    backgroundColor: "#8B6B26",
  },

  lowRisk: {
    backgroundColor: "#26735B",
  },

  riskText: {
    color: "white",
    fontFamily: Fonts.heavy,
    fontSize: 9,
  },

  signalCount: {
    color: "#A9B7C6",
    fontFamily: Fonts.regular,
    fontSize: 10,
  },
});
