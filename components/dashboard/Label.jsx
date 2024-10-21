import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import { View, Text, Pressable, StyleSheet } from "react-native";
import { Fonts } from "../../constants/Font";

export default function Label({ children, onPress }) {
  return (
    <View style={styles.headerText}>
      <Text style={styles.info}>{children}</Text>
      <Pressable>
        <FontAwesome6 onPress={onPress} name="add" size={24} color="white" />
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  headerText: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },

  info: {
    color: "white",
    fontFamily: Fonts.main,
    fontSize: 16,
  },
});
