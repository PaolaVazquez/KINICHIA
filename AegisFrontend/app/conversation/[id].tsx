import { Feather } from "@expo/vector-icons";
import { router, useLocalSearchParams } from "expo-router";
import { useEffect, useRef, useState } from "react";
import {
  ActivityIndicator,
  Animated,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";

import { Colors, Fonts } from "@/constants";
import { ConversationDetail, getConversation } from "@/services/conversations";

import { SafeAreaView } from "react-native-safe-area-context";

export default function ConversationScreen() {
  const [expandedUrl, setExpandedUrl] = useState<string | null>(null);
  const { id, messageId } = useLocalSearchParams<{
    id: string;
    messageId?: string;
  }>();

  const [conversation, setConversation] = useState<ConversationDetail | null>(
    null,
  );

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState("");

  const scrollViewRef = useRef<ScrollView>(null);

  const hasScrolledToMessage = useRef(false);

  const [analysisExpanded, setAnalysisExpanded] = useState(false);

  const [analysisAnimation] = useState(() => new Animated.Value(0));

  useEffect(() => {
    Animated.timing(analysisAnimation, {
      toValue: analysisExpanded ? 1 : 0,
      duration: 250,
      useNativeDriver: true,
    }).start();
  }, [analysisExpanded, analysisAnimation]);

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
      <SafeAreaView edges={["top"]}>
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
            <Pressable
              style={styles.analysisHeader}
              onPress={() => setAnalysisExpanded((prev) => !prev)}
            >
              <View style={styles.analysisHeaderInfo}>
                <View style={styles.analysisTitleRow}>
                  <Text style={styles.analysisLabel}>
                    🛡️ ANÁLISIS DE SEGURIDAD
                  </Text>

                  <Feather
                    name={analysisExpanded ? "chevron-up" : "chevron-down"}
                    size={20}
                    color={Colors.aqua}
                  />
                </View>

                <Text style={styles.analysisSummary}>
                  {latestAnalysis.summary}
                </Text>
              </View>

              <View style={styles.scoreContainer}>
                <Text style={styles.score}>{latestAnalysis.score}</Text>

                <Text style={styles.scoreLabel}>/100</Text>
              </View>
            </Pressable>

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
                  RIESGO{" "}
                  {latestAnalysis.riskLevel === "HIGH"
                    ? "ALTO"
                    : latestAnalysis.riskLevel === "MEDIUM"
                      ? "MEDIO"
                      : "BAJO"}
                </Text>
              </View>

              <Text style={styles.signalCount}>
                {latestAnalysis.reasons.length} señales detectadas
              </Text>
            </View>

            {analysisExpanded && (
              <Animated.View
                style={[
                  styles.expandedAnalysis,
                  {
                    opacity: analysisAnimation,
                    transform: [
                      {
                        translateY: analysisAnimation.interpolate({
                          inputRange: [0, 1],
                          outputRange: [-8, 0],
                        }),
                      },
                    ],
                  },
                ]}
              >
                <ScrollView
                  style={styles.analysisScroll}
                  contentContainerStyle={styles.analysisScrollContent}
                  showsVerticalScrollIndicator={true}
                  nestedScrollEnabled={true}
                >
                  <Text style={styles.sectionTitle}>🚨 Señales detectadas</Text>

                  {latestAnalysis.reasons.map((reason, index) => (
                    <View key={`${reason}-${index}`} style={styles.reasonCard}>
                      <Feather
                        name="alert-triangle"
                        size={16}
                        color="#FFB84D"
                      />

                      <Text style={styles.reasonText}>{reason}</Text>
                    </View>
                  ))}

                  {latestAnalysis.recommendations.length > 0 && (
                    <View style={styles.recommendationsSection}>
                      <Text style={styles.sectionTitle}>
                        💡 Recomendaciones
                      </Text>

                      {latestAnalysis.recommendations.map(
                        (recommendation, index) => (
                          <View
                            key={`${recommendation}-${index}`}
                            style={styles.recommendationCard}
                          >
                            <Feather
                              name="check-circle"
                              size={16}
                              color={Colors.aqua}
                            />

                            <Text style={styles.recommendationText}>
                              {recommendation}
                            </Text>
                          </View>
                        ),
                      )}
                    </View>
                  )}
                </ScrollView>
              </Animated.View>
            )}
          </View>
        )}
      </SafeAreaView>
      {/* MENSAJES */}
      <ScrollView
        ref={scrollViewRef}
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
                onLayout={(event) => {
                  if (
                    messageId === message.id &&
                    !hasScrolledToMessage.current
                  ) {
                    const { y } = event.nativeEvent.layout;

                    hasScrolledToMessage.current = true;

                    setTimeout(() => {
                      scrollViewRef.current?.scrollTo({
                        y: Math.max(0, y - 100),
                        animated: true,
                      });
                    }, 150);
                  }
                }}
                style={[
                  styles.messageBubble,
                  isClient ? styles.clientMessage : styles.companyMessage,
                  messageId === message.id && styles.highlightedMessage,
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

                {message.urlAnalysis?.map((analysis) => {
                  const isExpanded = expandedUrl === analysis.url;

                  return (
                    <View
                      key={analysis.url}
                      style={styles.urlAnalysisContainer}
                    >
                      <View style={styles.urlHeader}>
                        <Feather name="link" size={14} color={Colors.aqua} />

                        <Text
                          style={[
                            styles.urlText,
                            !isClient && styles.companyUrlText,
                          ]}
                          numberOfLines={2}
                        >
                          {analysis.url}
                        </Text>
                      </View>

                      <Pressable
                        style={styles.urlToggle}
                        onPress={() =>
                          setExpandedUrl(isExpanded ? null : analysis.url)
                        }
                      >
                        <Text style={styles.urlToggleText}>
                          {isExpanded ? "Ocultar análisis" : "Ver análisis"}
                        </Text>

                        <Feather
                          name={isExpanded ? "chevron-up" : "chevron-down"}
                          size={14}
                          color={Colors.aqua}
                        />
                      </Pressable>

                      {isExpanded && (
                        <View style={styles.urlDetails}>
                          <View
                            style={[
                              styles.urlRiskBadge,
                              analysis.riskLevel === "HIGH" &&
                                styles.urlHighRisk,
                              analysis.riskLevel === "MEDIUM" &&
                                styles.urlMediumRisk,
                              analysis.riskLevel === "LOW" && styles.urlLowRisk,
                            ]}
                          >
                            <Text style={styles.urlRiskText}>
                              {analysis.riskLevel === "HIGH"
                                ? "RIESGO ALTO"
                                : analysis.riskLevel === "MEDIUM"
                                  ? "RIESGO MEDIO"
                                  : "RIESGO BAJO "}
                            </Text>
                          </View>

                          <Text style={styles.urlScore}>
                            Score {analysis.score}/100
                          </Text>

                          {analysis.signals.length > 0 && (
                            <View style={styles.urlSection}>
                              <Text style={styles.urlSectionTitle}>
                                Señales detectadas
                              </Text>

                              {analysis.signals.map((signal, index) => (
                                <Text
                                  key={`${analysis.url}-signal-${index}`}
                                  style={styles.urlItem}
                                >
                                  • {signal}
                                </Text>
                              ))}
                            </View>
                          )}

                          {analysis.recommendations.length > 0 && (
                            <View style={styles.urlSection}>
                              <Text style={styles.urlSectionTitle}>
                                Recomendaciones
                              </Text>

                              {analysis.recommendations.map(
                                (recommendation, index) => (
                                  <Text
                                    key={`${analysis.url}-recommendation-${index}`}
                                    style={styles.urlItem}
                                  >
                                    • {recommendation}
                                  </Text>
                                ),
                              )}
                            </View>
                          )}
                        </View>
                      )}
                    </View>
                  );
                })}
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
    backgroundColor: Colors.aquaTransparent,
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
  analysisHeaderInfo: {
    flex: 1,
    marginRight: 10,
  },

  analysisTitleRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  expandedAnalysis: {
    marginTop: 15,
    paddingTop: 15,
    borderTopWidth: 1,
    borderTopColor: Colors.bordersInput,
  },

  sectionTitle: {
    color: "white",
    fontFamily: Fonts.heavy,
    fontSize: 13,
    marginBottom: 10,
  },

  reasonCard: {
    flexDirection: "row",
    alignItems: "flex-start",
    gap: 10,
    padding: 12,
    marginBottom: 8,
    borderRadius: 12,
    backgroundColor: "#252C35",
  },

  reasonText: {
    flex: 1,
    color: "#D7DEE6",
    fontFamily: Fonts.regular,
    fontSize: 11,
    lineHeight: 17,
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

  reasonsContainer: {
    marginHorizontal: 16,
    marginTop: 10,
  },

  recommendationsSection: {
    marginTop: 10,
  },

  recommendationCard: {
    flexDirection: "row",
    alignItems: "flex-start",
    gap: 10,
    padding: 12,
    marginBottom: 8,
    borderRadius: 12,
    backgroundColor: "#202A32",
  },

  recommendationText: {
    flex: 1,
    color: "#D7DEE6",
    fontFamily: Fonts.regular,
    fontSize: 11,
    lineHeight: 17,
  },

  highlightedMessage: {
    borderWidth: 2,
    borderColor: Colors.blue,
    shadowColor: Colors.blue,
    shadowOpacity: 0.9,
    shadowRadius: 8,
    elevation: 6,
  },

  urlAnalysisContainer: {
    marginTop: 10,
    paddingTop: 10,
    borderTopWidth: 1,
    borderTopColor: "rgba(255,255,255,0.12)",
  },

  urlHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },

  urlText: {
    flex: 1,
    color: Colors.aqua,
    fontFamily: Fonts.medium,
    fontSize: 11,
  },

  companyUrlText: {
    color: Colors.fondo,
  },

  urlToggle: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-end",
    gap: 5,
    marginTop: 8,
  },

  urlToggleText: {
    color: Colors.aqua,
    fontFamily: Fonts.medium,
    fontSize: 10,
  },

  urlDetails: {
    marginTop: 10,
    padding: 10,
    borderRadius: 10,
    backgroundColor: "rgba(0,0,0,0.12)",
  },

  urlRiskBadge: {
    alignSelf: "flex-start",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 7,
  },

  urlLowRisk: {
    backgroundColor: "#26735B",
  },

  urlMediumRisk: {
    backgroundColor: "#8B6B26",
  },

  urlHighRisk: {
    backgroundColor: "#8B2635",
  },

  urlRiskText: {
    color: "white",
    fontFamily: Fonts.heavy,
    fontSize: 8,
  },

  urlScore: {
    color: "#A9B7C6",
    fontFamily: Fonts.regular,
    fontSize: 10,
    marginTop: 6,
  },

  urlSection: {
    marginTop: 10,
  },

  urlSectionTitle: {
    color: "white",
    fontFamily: Fonts.bold,
    fontSize: 10,
    marginBottom: 4,
  },

  urlItem: {
    color: "#A9B7C6",
    fontFamily: Fonts.regular,
    fontSize: 9,
    lineHeight: 15,
  },

  analysisScroll: {
    maxHeight: 500,
  },

  analysisScrollContent: {
    paddingBottom: 5,
  },
});
