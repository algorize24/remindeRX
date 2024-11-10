import { View, Text, StyleSheet, Image } from "react-native";
import { Color } from "../../constants/Color";
import { Fonts } from "../../constants/Font";

export default function IsEmpty() {
  return (
    <View style={styles.root}>
      <Image
        style={styles.img}
        source={require("../../assets/others/reminder.png")}
      />
      <Text style={styles.textLength}>No upcoming reminders for today.</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  textLength: {
    justifyContent: "center",
    alignItems: "center",
    fontFamily: Fonts.main,
    textAlign: "center",
    color: Color.tagLine,
  },

  img: {
    width: 150,
    height: 150,
  },
});
