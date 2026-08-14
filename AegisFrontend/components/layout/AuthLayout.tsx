import { Colors, Fonts } from "@/constants";
import { ReactNode } from "react";
import {
  Image,
  ImageBackground,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";

type AuthLayoutProps = {
  children: ReactNode;
  contentTop?: number;
  scrollable?: boolean;
  logoTop?: number;
};

export default function AuthLayout({
  children,
  contentTop = 100,
  scrollable = true,
  logoTop = 30,
}: AuthLayoutProps) {
  const content = (
    <View style={styles.container}>
      {/* Wave Superior */}
      <ImageBackground
        source={require("../../assets/images/onda.png")}
        resizeMode="cover"
        imageStyle={{
          opacity: 0.43,
          transform: [{ scaleY: -1 }],
        }}
        style={styles.header}
      />

      {/* Wave Inferior */}
      <View style={styles.footer}>
        <Image
          source={require("../../assets/images/onda.png")}
          style={styles.footerImage}
          resizeMode="cover"
        />
      </View>

      {/* Logo */}
      <View
        style={[
          styles.brandContainer,
          {
            top: logoTop,
          },
        ]}
      >
        <Text style={styles.brand}>
          KINCH<Text style={styles.brandHighlight}>IA</Text>
        </Text>

        <Text style={styles.slogan}>DETECTA. PROTEGE. PREVIENE.</Text>
      </View>

      {/* Contenido */}
      <View
        style={[
          styles.contentContainer,
          {
            paddingTop: contentTop,
          },
        ]}
      >
        {children}
      </View>
    </View>
  );
  if (scrollable) {
    return (
      <ScrollView
        contentContainerStyle={{
          flexGrow: 1,
        }}
        showsVerticalScrollIndicator={false}
      >
        {content}
      </ScrollView>
    );
  }

  return content;
}

const styles = StyleSheet.create({
  waveOverlayTop: {
    backgroundColor: "rgba(10,28,46,0.25)",
  },

  waveOverlayBottom: {
    backgroundColor: "rgba(10,28,46,0.65)",
  },
  container: {
    flex: 1,
    backgroundColor: Colors.fondo,
  },
  contentContainer: {
    flex: 1,
  },

  header: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    height: 220,
    zIndex: 1,
  },

  footer: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    height: 200,
    zIndex: 1,
  },

  footerImage: {
    width: "100%",
    height: "100%",
    opacity: 0.35,
  },
  brandContainer: {
    position: "absolute",

    width: "100%",

    alignItems: "center",

    zIndex: 3,
  },

  brand: {
    color: "white",

    fontFamily: Fonts.heavy,

    fontSize: 42,

    textAlign: "center",
  },

  brandHighlight: {
    color: Colors.aqua,
  },
  slogan: {
    color: Colors.aqua,
    textAlign: "center",
    marginTop: 10,
    fontSize: 8,
    fontFamily: Fonts.heavy,
    letterSpacing: 2,
  },
});
