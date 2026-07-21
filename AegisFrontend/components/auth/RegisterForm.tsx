import { useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";

import { Feather } from "@expo/vector-icons";
import { router } from "expo-router";

import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import { Colors, Fonts } from "@/constants";
import AlertMessage from "../ui/AlertMessage";
import PasswordStrength from "../ui/PasswordStrength";

export default function RegisterForm() {
  const [acceptTerms, setAcceptTerms] = useState(false);
  const goToHome = () => {
    router.push("/Home");
  };

  return (
    <View style={styles.container}>
      <AlertMessage type="success" message="Cuenta creada correctamente." />
      <Input
        label="Nombre completo"
        placeholder="Nombre completo"
        leftIcon="user"
      />

      <Input
        label="Correo electrónico"
        placeholder="correo@email.com"
        leftIcon="mail"
      />

      <Input
        label="Contraseña"
        placeholder="********"
        leftIcon="lock"
        secureTextEntry
        helperText="La contraseña debe tener al menos 8 caracteres"
        status="error"
      />
      <PasswordStrength />
      <Input
        label="Confirmar contraseña"
        placeholder="********"
        leftIcon="lock"
        secureTextEntry
        helperText="Las contraseñas no coinciden"
        status="error"
      />

      <Input
        label="Número de teléfono (opcional)"
        placeholder="33 1234 5678"
        leftIcon="phone"
      />

      <Pressable
        style={styles.termsContainer}
        onPress={() => setAcceptTerms(!acceptTerms)}
      >
        <View style={[styles.checkbox, acceptTerms && styles.checkboxActive]}>
          {acceptTerms && <Feather name="check" size={12} color="white" />}
        </View>

        <Text style={styles.termsText}>
          Acepto los
          <Text style={styles.brandHighlight}> Términos y Condiciones </Text>y
          la
          <Text style={styles.brandHighlight}> Política de Privacidad </Text>
        </Text>
      </Pressable>

      <Button title="Crear cuenta" onPress={goToHome} />
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    marginTop: 25,
  },

  termsContainer: {
    flexDirection: "row",
    alignItems: "center",

    marginTop: 15,
    marginBottom: 20,
  },

  checkbox: {
    width: 18,
    height: 18,

    borderWidth: 1,
    borderColor: Colors.bordersInput,

    borderRadius: 4,

    justifyContent: "center",
    alignItems: "center",
  },

  checkboxActive: {
    backgroundColor: Colors.bordersInput,
  },

  termsText: {
    marginLeft: 10,

    color: "white",

    fontFamily: Fonts.regular,

    fontSize: 12,
  },
  brandHighlight: {
    color: Colors.aqua,
  },
});
