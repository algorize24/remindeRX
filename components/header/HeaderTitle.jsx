import { Text, StyleSheet, View } from "react-native";
import { Fonts } from "../../constants/Font";
import { Color } from "../../constants/Color";

export default function HeaderTitle({ style }) {
  return (
    <View style={[styles.root, style]}>
      <Text style={styles.text}>
        Reminde<Text style={styles.rxText}>RX</Text>
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {},
  text: {
    fontFamily: Fonts.main,
    color: "white",
    fontWeight: "bold",
    fontSize: 22,
  },

  rxText: {
    color: Color.purpleColor,
  },
});
