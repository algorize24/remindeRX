import { Pressable, Text, StyleSheet, View } from "react-native";
import { Fonts } from "../../constants/Font";
import { Color } from "../../constants/Color";

export default function MainButton({
  children,
  onPress,
  style,
  textStyle,
  pressedStyle,
}) {
  return (
    <View style={style}>
      <Pressable
        onPress={onPress}
        style={({ pressed }) => [
          styles.root,
          pressed && styles.pressed,
          pressedStyle,
        ]}
      >
        <Text style={[styles.text, textStyle]}>{children}</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    padding: 12,
    borderRadius: 33.5,
    alignItems: "center",
    backgroundColor: Color.purpleColor,
  },
  pressed: {
    opacity: 0.8,
  },
  text: {
    color: "white",
    fontFamily: Fonts.main,
    fontWeight: "bold",
    fontSize: 16,
    textAlign: "center",
  },
});
