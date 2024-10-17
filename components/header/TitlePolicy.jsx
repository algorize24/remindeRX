// this component will rendered in TermOfUse.jsx
import { View, Text, StyleSheet } from "react-native";
import { Fonts } from "../../constants/Font";
import { Color } from "../../constants/Color";

export default function TitlePolicy({ text, date }) {
  return (
    <View>
      <Text style={styles.text}>
        Reminde<Text style={styles.rx}>RX</Text> <Text>{text}</Text>
      </Text>
      <Text style={styles.textDate}>Effective Date: {date} </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  text: {
    fontFamily: Fonts.main,
    fontWeight: "bold",
    fontSize: 18,
    color: "white",
  },

  textDate: {
    fontFamily: Fonts.main,
    fontWeight: "bold",
    color: Color.tagLine,
  },

  rx: {
    color: Color.purpleColor,
  },
});
