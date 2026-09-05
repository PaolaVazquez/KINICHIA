import { StyleSheet, Text, View } from "react-native";

import Button from "@/components/ui/Button";

import { Colors } from "@/constants/colors";
import { Fonts } from "@/constants/fonts";

import { Feather } from "@expo/vector-icons";
import Input from "../ui/Input";

export default function EmailInspectionForm() {
  return (
    <View style={styles.card}>
      {/* Paso 1 */}

      <Text style={styles.stepTitle}>1. Ingresa el correo a inspeccionar</Text>

      <Input label="" placeholder="correo@ejemplo.com" leftIcon="mail" />

      {/* Paso 2 */}

      <Text style={[styles.stepTitle, styles.secondTitle]}>
        2. Pega el contenido completo del correo
      </Text>

      <View style={styles.textAreaContainer}>
        <Feather name="file-text" size={40} color="#8E99AE" />

        <Text style={styles.dropText}>
          Arrastra y suelta el archivo{" "}
          <Text style={styles.emititle}>.emi</Text>{" "}
        </Text>

        <Text style={styles.secondaryText}>
          toca para seleccionar o pega el contenido
        </Text>
      </View>

      {/* Paso 3 */}

      <Text style={[styles.stepTitle, styles.thirdTitle]}>
        3. Iniciar análisis
      </Text>

      <Button title="Analizar correo" onPress={() => {}} />

      <Text style={styles.securityText}>
        <Feather
          name="lock"
          size={12}
          color="#8E99AE"
          style={styles.icondatos}
        />{" "}
        Tus datos están protegidos y nunca se almacenan.
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

    marginBottom: 0,

    marginTop: 0,
  },

  secondTitle: {
    marginTop: 20,
    marginBottom: 25,
  },
  thirdTitle: {
    marginTop: 25,
  },
  textAreaContainer: {
    height: 160,

    borderWidth: 2,

    borderStyle: "dashed",

    borderColor: Colors.bordersCard,

    borderRadius: 20,

    justifyContent: "center",

    alignItems: "center",

    paddingHorizontal: 20,
  },

  emititle: {
    color: Colors.aqua,
  },
  dropText: {
    color: "white",

    marginTop: 15,

    fontSize: 12,

    fontFamily: Fonts.regular,

    textAlign: "center",
    opacity: 0.52,
  },

  secondaryText: {
    color: "#FFFFFF",

    marginTop: 5,

    textAlign: "center",
    fontFamily: Fonts.regular,

    fontSize: 12,
    opacity: 0.52,
  },

  securityText: {
    color: "#8E99AE",

    textAlign: "center",

    marginTop: 15,

    fontSize: 9,

    fontFamily: Fonts.medium,
  },
  icondatos: {
    marginRight: 25,
  },
});
