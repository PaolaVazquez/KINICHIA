import Svg, { Path } from "react-native-svg";

type Props = {
  size?: number;
  color?: string;
};

export default function LogoutIcon({ size = 28, color = "#FF0000" }: Props) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Path
        d="M10 17L5 12L10 7"
        stroke={color}
        strokeWidth={2.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      <Path
        d="M5 12H16"
        stroke={color}
        strokeWidth={2.5}
        strokeLinecap="round"
      />

      <Path
        d="M16 5V19"
        stroke={color}
        strokeWidth={2.5}
        strokeLinecap="round"
      />
    </Svg>
  );
}
