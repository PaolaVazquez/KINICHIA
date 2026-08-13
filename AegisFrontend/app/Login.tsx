import AuthHero from "@/components/auth/AuthHero";
import LoginForm from "@/components/auth/LoginForm";
import RegisterForm from "@/components/auth/RegisterForm";
import SocialLogin from "@/components/auth/SocialLogin";
import { Colors } from "@/constants/colors";
import { Fonts } from "@/constants/fonts";
import { useState } from "react";

import { Pressable, StyleSheet, Text, View } from "react-native";

import AuthCard from "@/components/auth/AuthCard";
import AuthTabs from "@/components/auth/AuthTabs";
import AuthLayout from "@/components/layout/AuthLayout";

import { SafeAreaView } from "react-native-safe-area-context";

export default function Login() {
  const [activeTab, setActiveTab] = useState<"login" | "register">("login");
  const [rememberMe, setRememberMe] = useState(false);

  return (
    <SafeAreaView edges={["top", "bottom"]}>
      <AuthLayout contentTop={150} scrollable={true}>
        <View
          style={{
            zIndex: 3,
          }}
        >
          <AuthHero
            title="Bienvenido de nuevo"
            subtitle="Inicia sesión para seguir protegiendo tu entorno digital"
          />
          <AuthCard>
            <AuthTabs activeTab={activeTab} onChange={setActiveTab} />

            {activeTab === "login" ? <LoginForm /> : <RegisterForm />}
            <SocialLogin />
          </AuthCard>
          <View style={styles.bottomContainer}>
            <Text style={styles.bottomText}>
              {activeTab === "login"
                ? "¿No tienes cuenta?"
                : "¿Ya tienes una cuenta?"}
            </Text>

            <Pressable
              onPress={() =>
                setActiveTab(activeTab === "login" ? "register" : "login")
              }
            >
              <Text style={styles.bottomLink}>
                {activeTab === "login" ? "Crear cuenta" : "Inicia sesión"}
              </Text>
            </Pressable>
          </View>
        </View>
      </AuthLayout>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  content: {
    flex: 1,
  },
  bottomContainer: {
    flexDirection: "row",

    justifyContent: "center",

    alignItems: "center",

    marginTop: 20,

    paddingBottom: 20,
  },
  bottomText: {
    color: "white",
  },
  bottomLink: {
    color: Colors.aqua,

    marginLeft: 6,

    fontFamily: Fonts.heavy,
  },
});
