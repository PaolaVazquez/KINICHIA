import { useVideoPlayer, VideoView } from "expo-video";
import { StyleSheet, View } from "react-native";
import { router } from "expo-router";
import { useEffect } from "react";

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
  }, 2800); // duración de tu video

  return () => clearTimeout(timer);
}, []);

  return (
    <AuthLayout contentTop={150} scrollable={false}>
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
