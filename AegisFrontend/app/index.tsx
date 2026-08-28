import { router } from "expo-router";
import { useVideoPlayer, VideoView } from "expo-video";
import { useEffect } from "react";
import { StyleSheet, View } from "react-native";

import AuthLayout from "@/components/layout/AuthLayout";

export default function LoaderScreen() {
  const player = useVideoPlayer(
    require("../assets/videos/loader.mp4"),
    (player) => {
      player.loop = false;
      player.muted = true;
      player.play();
    },
  );

  useEffect(() => {
    const timer = setTimeout(() => {
      router.replace("/Login");
    }, 2800); // duración de video

    return () => clearTimeout(timer);
  }, []);

  return (
    <AuthLayout contentTop={150} logoTop={65} scrollable={false}>
      <View style={styles.content}>
        <VideoView
          player={player}
          style={styles.video}
          contentFit="cover"
          nativeControls={false}
        />
      </View>
    </AuthLayout>
  );
}

const styles = StyleSheet.create({
  content: {
    flex: 1,
    zIndex: 3,
  },

  video: {
    flex: 1,
    width: "100%",
  },
});
