import { Text, StyleSheet } from "react-native";
import { Fonts } from "../../constants/Font";

export default function TextScreen({ children }) {
  return <Text style={styles.text}>{children}</Text>;
}

const styles = StyleSheet.create({
  text: {
    fontFamily: Fonts.main,
    color: "#fff",
    fontSize: 20,
    textAlign: "center",
  },
});
