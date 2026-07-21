import { useFonts } from "expo-font";
import { useVideoPlayer, VideoView } from "expo-video";
import { Text, View } from "react-native";

export default function Loader() {
  const player = useVideoPlayer(
    require("../../assets/videos/loader.mp4"),
    (player) => {
      player.loop = false;
      player.muted = true;
      player.play();
    },
  );

  const [loaded] = useFonts({
    NexaBold: require("../../assets/fonts/Nexa-Heavy.ttf"),
    NexaRegular: require("../../assets/fonts/Nexa-ExtraLight.ttf"),
  });

  if (!loaded) {
    return null;
  }
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: "#00071B",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <VideoView
        player={player}
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
        }}
        contentFit="cover"
        nativeControls={false}
      />

      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Text
          style={{
            color: "white",
            fontSize: 40,
            fontFamily: "NexaBold",
          }}
        >
          KINICHIA
        </Text>
      </View>
    </View>
  );
}
