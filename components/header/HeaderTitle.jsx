import { Text, StyleSheet, View } from "react-native";
import { Fonts } from "../../constants/Font";
import { Color } from "../../constants/Color";

export default function HeaderTitle({ style }) {
  return (
    <Text style={[styles.text, style]}>
      Reminde<Text style={styles.rxText}>RX</Text>
    </Text>
  );
}

const styles = StyleSheet.create({
  text: {
    fontFamily: Fonts.main,
    color: "white",
    fontSize: 15,
  },

  rxText: {
    color: Color.purpleColor,
  },
});
