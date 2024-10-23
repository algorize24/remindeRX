import { View, TextInput, StyleSheet } from "react-native";
import { Color } from "../../constants/Color";
import { Fonts } from "../../constants/Font";

export default function TextInputs({
  placeholder,
  secure,
  style,
  inputMode,
  keyboardType,
}) {
  return (
    <TextInput
      style={[styles.text, style]}
      inputMode={inputMode}
      autoCorrect={false}
      autoCapitalize="none"
      placeholderTextColor={Color.tagLine}
      placeholder={placeholder}
      secureTextEntry={secure}
      keyboardType={keyboardType}
    />
  );
}

const styles = StyleSheet.create({
  text: {
    color: Color.tagLine,
    fontFamily: Fonts.sub,
    padding: 10,
  },
});
