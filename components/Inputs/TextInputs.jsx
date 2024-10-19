import { View, TextInput, StyleSheet } from "react-native";
import { Color } from "../../constants/Color";
import { Fonts } from "../../constants/Font";

export default function TextInputs({ placeholder, secure, style }) {
  return (
    <View>
      <TextInput
        autoCorrect={false}
        autoCapitalize="none"
        placeholderTextColor={Color.tagLine}
        style={[styles.text, style]}
        placeholder={placeholder}
        secureTextEntry={secure}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  text: {
    color: Color.tagLine,
    fontFamily: Fonts.sub,
    padding: 10,
  },
});
