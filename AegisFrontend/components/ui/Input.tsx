import { Colors, Dimensions, Fonts, Spacing } from "@/constants";
import { Feather } from "@expo/vector-icons";
import {
  KeyboardTypeOptions,
  Pressable,
  ReturnKeyTypeOptions,
  StyleProp,
  StyleSheet,
  Text,
  TextInput,
  TextStyle,
  View,
  ViewStyle,
} from "react-native";

type Props = {
  label?: string;

  placeholder: string;

  value?: string;

  onChangeText?: (text: string) => void;

  leftIcon?: keyof typeof Feather.glyphMap;

  rightIcon?: React.ReactNode;

  clearable?: boolean;

  onClear?: () => void;

  onRightPress?: () => void;

  secureTextEntry?: boolean;

  keyboardType?: KeyboardTypeOptions;

  autoCapitalize?: "none" | "sentences" | "words" | "characters";

  multiline?: boolean;

  editable?: boolean;

  maxLength?: number;

  returnKeyType?: ReturnKeyTypeOptions;

  helperText?: string;

  status?: "default" | "error" | "success";

  style?: StyleProp<ViewStyle>;

  inputStyle?: StyleProp<TextStyle>;
};

export default function Input({
  label,
  placeholder,
  value,
  onChangeText,
  leftIcon,
  rightIcon,
  onRightPress,
  clearable = false,
  onClear,
  secureTextEntry = false,
  keyboardType,
  autoCapitalize,
  multiline,
  editable,
  maxLength,
  style,
  inputStyle,
  returnKeyType,
  helperText,
  status = "default",
}: Props) {
  return (
    <View style={[styles.container, style]}>
      {label && <Text style={styles.label}>{label}</Text>}

      <View style={styles.inputContainer}>
        {leftIcon && (
          <Feather
            name={leftIcon}
            size={Dimensions.icon.md}
            color={Colors.aqua}
          />
        )}

        {helperText && (
          <Text
            style={[
              styles.helperText,

              status === "error" && styles.errorText,

              status === "success" && styles.successText,
            ]}
          >
            {helperText}
          </Text>
        )}

        <TextInput
          value={value}
          onChangeText={onChangeText}
          placeholder={placeholder}
          placeholderTextColor="#999"
          secureTextEntry={secureTextEntry}
          keyboardType={keyboardType}
          autoCapitalize={autoCapitalize}
          editable={editable}
          multiline={multiline}
          maxLength={maxLength}
          style={[styles.input, inputStyle]}
          returnKeyType={returnKeyType}
        />

        {clearable && value && value.length > 0 && (
          <Pressable onPress={onClear} hitSlop={10}>
            <Feather name="x-circle" size={20} color={Colors.aqua} />
          </Pressable>
        )}

        {rightIcon && (
          <Pressable onPress={onRightPress} hitSlop={10}>
            {rightIcon}
          </Pressable>
        )}
        {rightIcon && (
          <Pressable onPress={onRightPress} hitSlop={10}>
            {rightIcon}
          </Pressable>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {},

  label: {
    marginBottom: 5,
    color: Colors.fondo,
    fontFamily: Fonts.heavy,
    fontSize: 14,
  },

  input: {
    flex: 1,
    marginLeft: 10,
    height: 50,

    borderWidth: 1,
    borderRadius: 12,

    paddingHorizontal: 15,

    fontFamily: Fonts.medium,
    color: Colors.aqua,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",

    borderWidth: 1,
    borderColor: Colors.bordersInput,

    borderRadius: 12,

    paddingHorizontal: 15,

    height: 55,
  },
  helperText: {
    marginTop: Spacing.sm,

    fontSize: 10,

    marginLeft: Spacing.sm,

    fontFamily: Fonts.medium,

    color: Colors.black,
  },
  errorText: {
    color: "#FF6B6B",
  },
  successText: {
    color: "#5AF0C8",
  },
});
