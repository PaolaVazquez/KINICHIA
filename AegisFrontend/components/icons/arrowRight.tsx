import Svg, { Path } from "react-native-svg";

type Props = {
  size?: number;
  color?: string;
};

export default function ArrowRight({ size = 24, color = "white" }: Props) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Path
        d="M5 12H19"
        stroke={color}
        strokeWidth={2.5}
        strokeLinecap="round"
      />

      <Path
        d="M13 6L19 12L13 18"
        stroke={color}
        strokeWidth={2.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}
