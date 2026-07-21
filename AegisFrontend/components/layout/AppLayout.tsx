import { Colors } from "@/constants";
import { ReactNode } from "react";
import { Dimensions, Image, ScrollView, StyleSheet, View } from "react-native";

const { height } = Dimensions.get("window");

type AppLayoutProps = {
  children: ReactNode;

  overlay?: ReactNode;
};

export default function AppLayout({ children, overlay }: AppLayoutProps) {
  return (
    <View style={styles.container}>
      <View style={styles.middleWave}>
        <Image
          source={require("../../assets/images/onda.png")}
          resizeMode="cover"
          style={styles.middleWaveImage}
        />
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.content}
      >
        {children}
      </ScrollView>

      {overlay}
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,

    backgroundColor: Colors.fondo,
  },

  content: {
    paddingBottom: 40,
  },

  headerWave: {
    position: "absolute",

    top: 0,
    left: 0,
    right: 0,

    height: 220,
  },

  middleWave: {
    position: "absolute",

    top: height * 0.18,

    left: 0,
    right: 0,

    height: 180,
  },

  middleWaveImage: {
    width: "100%",
    height: "100%",

    opacity: 0.25,
  },
});
