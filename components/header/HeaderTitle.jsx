import { Text, StyleSheet, View } from "react-native";
import { Fonts } from "../../constants/Font";
import { Color } from "../../constants/Color";

export default function HeaderTitle({ style }) {
  return (
    <View style={style}>
      <Text style={styles.text}>
        Reminde<Text style={styles.rxText}>RX</Text>
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  text: {
    fontFamily: Fonts.main,
    color: "white",
    fontSize: 22,
  },

  rxText: {
    color: Color.purpleColor,
  },
});
