import { useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";

import { Feather } from "@expo/vector-icons";

import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import { router } from "expo-router";

import { Colors, Fonts } from "@/constants";

import { login } from "@/services/auth";
import AlertMessage from "../ui/AlertMessage";

export default function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async () => {
    try {
      setLoading(true);
      setError("");

      await login(email, password);

      router.replace("/Home");
    } catch (error) {
      setError(
        error instanceof Error ? error.message : "No se pudo iniciar sesión.",
      );
    } finally {
      setLoading(false);
    }
  };
  return (
    <View style={styles.container}>
      {/*<AlertMessage type="error" message="Correo o contraseña incorrectos." />*/}
      {error ? <AlertMessage type="error" message={error} /> : null}
      <Input
        label="Correo"
        placeholder="correo@email.com"
        leftIcon="mail"
        value={email}
        onChangeText={setEmail}
      />

      <Input
        label="Contraseña"
        placeholder="********"
        leftIcon="lock"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />

      <View style={styles.optionsRow}>
        <Pressable
          style={styles.rememberContainer}
          onPress={() => setRememberMe(!rememberMe)}
        >
          <View style={[styles.checkbox, rememberMe && styles.checkboxActive]}>
            {rememberMe && <Feather name="check" size={12} color="white" />}
          </View>

          <Text style={styles.rememberText}>Recordarme</Text>
        </Pressable>

        <Pressable>
          <Text style={styles.forgotPassword}>¿Olvidaste tu contraseña?</Text>
        </Pressable>
      </View>

      <Button
        title={loading ? "Iniciando sesión..." : "Iniciar sesión"}
        onPress={handleLogin}
      />
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    marginTop: 15,
  },
  optionsRow: {
    flexDirection: "row",

    justifyContent: "space-between",

    alignItems: "center",

    marginTop: 20,
  },
  rememberContainer: {
    flexDirection: "row",

    alignItems: "center",
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

  rememberText: {
    color: "white",
    fontSize: 12,
    marginLeft: 8,

    fontFamily: Fonts.medium,
  },

  forgotPassword: {
    color: Colors.aqua,
    fontSize: 12,
    fontFamily: Fonts.medium,
  },
});
