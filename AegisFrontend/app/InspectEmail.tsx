import AuthHero from "@/components/auth/AuthHero";
import AnalysisGrid from "@/components/inspectEmail/AnalysisGrid";
import EmailInspectionForm from "@/components/inspectEmail/EmailInspectionForm";
import AppLayout from "@/components/layout/AppLayout";
import SideMenu from "@/components/menu/SideMenu";
import AppHeader from "@/components/navigation/AppHeader";
import { useState } from "react";
import { StyleSheet, View } from "react-native";

export default function InspectEmail() {
  const [menuOpen, setMenuOpen] = useState(false);
  return (
    <AppLayout>
      <AppHeader onMenuPress={() => setMenuOpen(true)} />
      {menuOpen && <SideMenu onClose={() => setMenuOpen(false)} />}

      <AuthHero
        title="¡Hola, Paola! 👋"
        subtitle="Protege tu entorno digital. Analiza correos y detecta amenazas antes de que sea tarde."
      />

      <EmailInspectionForm />
      <AnalysisGrid />
      <View></View>
    </AppLayout>
  );
}
const styles = StyleSheet.create({});
