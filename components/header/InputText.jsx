import { Text, StyleSheet } from "react-native";
import { Fonts } from "../../constants/Font";

export default function InputText({ children }) {
  return <Text style={styles.label}>{children}</Text>;
}

const styles = StyleSheet.create({
  label: {
    marginBottom: 7,
    fontFamily: Fonts.main,
    color: "#fff",
    fontSize: 16,
  },
});
