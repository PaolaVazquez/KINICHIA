import { Feather } from "@expo/vector-icons";
import { useState } from "react";
import { StyleSheet, Text, TextInput, View } from "react-native";

import Button from "@/components/ui/Button";
import { Colors } from "@/constants/colors";
import { Fonts } from "@/constants/fonts";
import { apiFetch } from "@/services/api";

interface AnalysisResponse {
  message: string;
  conversation: {
    id: string;
  };
}

export default function EmailInspectionForm() {
  const [sender, setSender] = useState("");
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleAnalyze = async () => {
    if (!content.trim()) {
      setError("Pega el contenido que quieres analizar.");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const response = await apiFetch<AnalysisResponse>("/conversations/import", {
        method: "POST",
        body: JSON.stringify({
          source: "MANUAL",
          contactName: sender.trim() || "Contenido manual",
          contactIdentifier: sender.trim() || "manual",
          messages: [
            {
              sender: "CLIENT",
              content: content.trim(),
            },
          ],
        }),
      });

      console.log("Conversación enviada a análisis:", response.conversation.id);
    } catch (requestError) {
      setError(
        requestError instanceof Error
          ? requestError.message
          : "No fue posible iniciar el análisis.",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.card}>
      <Text style={styles.stepTitle}>1. ¿De quién recibiste el mensaje?</Text>

      <TextInput
        value={sender}
        onChangeText={setSender}
        placeholder="correo@ejemplo.com"
        placeholderTextColor="#8E99AE"
        autoCapitalize="none"
        style={styles.input}
      />

      <Text style={[styles.stepTitle, styles.secondTitle]}>
        2. Pega el contenido que quieres analizar
      </Text>

      <View style={styles.textAreaContainer}>
        <Feather name="file-text" size={32} color="#8E99AE" />
        <TextInput
          value={content}
          onChangeText={setContent}
          placeholder="Pega aquí el correo, mensaje o conversación..."
          placeholderTextColor="#8E99AE"
          multiline
          textAlignVertical="top"
          style={styles.textArea}
        />
      </View>

      <Text style={[styles.stepTitle, styles.thirdTitle]}>3. Iniciar análisis</Text>

      <Button
        title={loading ? "Analizando..." : "Analizar contenido"}
        onPress={handleAnalyze}
      />

      {error && <Text style={styles.errorText}>{error}</Text>}

      <Text style={styles.securityText}>
        <Feather name="lock" size={12} color="#8E99AE" /> {" "}
        Tus datos están protegidos y se procesan de forma segura.
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    width: "90%",
    alignSelf: "center",
    marginTop: 10,
    padding: 25,
    borderRadius: 25,
    borderWidth: 1,
    borderColor: Colors.bordersCard,
    backgroundColor: "rgba(2,18,50,0.55)",
  },
  stepTitle: {
    color: "white",
    fontSize: 14,
    fontFamily: Fonts.bold,
  },
  secondTitle: {
    marginTop: 20,
    marginBottom: 25,
  },
  thirdTitle: {
    marginTop: 25,
    marginBottom: 12,
  },
  input: {
    height: 48,
    marginTop: 10,
    paddingHorizontal: 15,
    borderWidth: 1,
    borderRadius: 14,
    borderColor: Colors.bordersCard,
    backgroundColor: "rgba(255,255,255,0.04)",
    color: "white",
    fontFamily: Fonts.regular,
    fontSize: 13,
  },
  textAreaContainer: {
    minHeight: 160,
    borderWidth: 2,
    borderStyle: "dashed",
    borderColor: Colors.bordersCard,
    borderRadius: 20,
    padding: 15,
  },
  textArea: {
    flex: 1,
    minHeight: 120,
    marginTop: 10,
    color: "white",
    fontFamily: Fonts.regular,
    fontSize: 13,
  },
  errorText: {
    color: "#FF6B6B",
    marginTop: 10,
    textAlign: "center",
    fontFamily: Fonts.regular,
    fontSize: 11,
  },
  securityText: {
    color: "#8E99AE",
    textAlign: "center",
    marginTop: 15,
    fontSize: 9,
    fontFamily: Fonts.medium,
  },
});
