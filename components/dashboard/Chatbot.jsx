import { View, Text, Pressable, StyleSheet } from "react-native";
import { Color } from "../../constants/Color";
import { Fonts } from "../../constants/Font";

import FontAwesome6 from "@expo/vector-icons/FontAwesome6";

export default function Chatbot({ onPress }) {
  return (
    <Pressable onPress={onPress} style={styles.pressContainer}>
      <View style={styles.chatbot}>
        <Text style={styles.robotText}>Hi! What can I do for you?</Text>
        <FontAwesome6 name="robot" size={28} color={Color.purpleColor} />
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  pressContainer: {
    alignItems: "flex-end",
    justifyContent: "flex-end",
    alignContent: "flex-end",
    marginBottom: 70,
  },

  chatbot: {
    flexDirection: "row",
    alignItems: "center",
  },

  robotText: {
    color: "#fff",
    fontSize: 13,
    marginRight: 10,
    backgroundColor: Color.container,
    padding: 10,
    borderRadius: 15,
    fontFamily: Fonts.main,
  },
});
