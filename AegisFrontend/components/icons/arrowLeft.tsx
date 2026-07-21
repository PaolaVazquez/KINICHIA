import Svg, { Path } from "react-native-svg";

type Props = {
  size?: number;
  color?: string;
};

export default function ArrowLeft({ size = 24, color = "white" }: Props) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Path
        d="M19 12H5"
        stroke={color}
        strokeWidth={2.5}
        strokeLinecap="round"
      />

      <Path
        d="M11 18L5 12L11 6"
        stroke={color}
        strokeWidth={2.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}
