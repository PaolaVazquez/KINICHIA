import { Feather } from "@expo/vector-icons";
import { StyleSheet, Text, View } from "react-native";

import AnalysisItem from "./AnalysisItem";

import { Colors } from "@/constants/colors";
import { Fonts } from "@/constants/fonts";

export default function AnalysisGrid() {
  const items = [
    {
      icon: <Feather name="link" size={24} color="#24C3DC" />,
      title: "Enlaces",
      description: "Detecta URLs maliciosas y sitios de phishing.",
    },

    {
      icon: <Feather name="paperclip" size={24} color="#5AF0C8" />,
      title: "Adjuntos",
      description: "Analiza archivos adjuntos en busca de malware.",
    },

    {
      icon: <Feather name="user" size={24} color="#8B5CF6" />,
      title: "Remitente",
      description: "Verifica la autenticidad del remitente.",
    },

    {
      icon: <Feather name="alert-triangle" size={24} color="#F97316" />,
      title: "Contenido",
      description: "Identifica patrones y lenguaje sospechoso.",
    },

    {
      icon: <Feather name="shield" size={24} color="#06B6D4" />,
      title: "Reputación",
      description: "Evalúa la reputación del dominio y la IP.",
    },

    {
      icon: <Feather name="flag" size={24} color="#EC4899" />,
      title: "Indicadores",
      description: "Busca indicadores de compromiso conocidos.",
    },
  ];
  return (
    <>
      <Text style={styles.sectionTitle}>¿Qué analizamos?</Text>
      <View style={styles.card}>
        <View style={styles.grid}>
          {items.map((item) => (
            <AnalysisItem
              key={item.title}
              icon={item.icon}
              title={item.title}
              description={item.description}
            />
          ))}
        </View>
      </View>
    </>
  );
}
const styles = StyleSheet.create({
  card: {
    width: "90%",

    alignSelf: "center",

    marginTop: 25,

    padding: 25,

    borderRadius: 25,

    borderWidth: 1,

    borderColor: Colors.bordersCard,

    backgroundColor: "rgba(2,18,50,0.55)",
  },

  sectionTitle: {
    color: "white",

    fontSize: 16,
    paddingHorizontal: 20,

    fontFamily: Fonts.bold,
    marginTop: 25,
  },

  grid: {
    flexDirection: "row",

    flexWrap: "wrap",

    justifyContent: "space-between",
  },
});
