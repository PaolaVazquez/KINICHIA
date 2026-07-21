import Svg, { Path } from "react-native-svg";

type Props = {
  size?: number;
  color?: string;
};

export default function ChevronRight({ size = 24, color = "white" }: Props) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Path
        d="M9 6L15 12L9 18"
        stroke={color}
        strokeWidth={3}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}
