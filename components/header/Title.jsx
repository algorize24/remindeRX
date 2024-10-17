// this component invoke in PolicyScreen.jsx
import { View, Text, StyleSheet } from "react-native";

// constants
import { Color } from "../../constants/Color";
import { Fonts } from "../../constants/Font";

export default function Title({}) {
  return (
    <View style={styles.root}>
      <Text style={styles.mainText}>
        Reminde<Text style={styles.subText}>RX</Text>
      </Text>
      <Text style={styles.tagline}>Safe.Smart.Connected</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    alignItems: "center",
  },
  mainText: {
    fontFamily: Fonts.main,
    fontWeight: "bold",
    fontSize: 32,
    color: "white",
  },

  subText: {
    color: Color.purpleColor,
  },

  tagline: {
    fontFamily: Fonts.sub,
    color: Color.tagLine,
    fontSize: 14,
  },
});
