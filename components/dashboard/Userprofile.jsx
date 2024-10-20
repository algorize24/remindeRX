import { View, Text, Image, StyleSheet } from "react-native";
import { Fonts } from "../../constants/Font";
import { Color } from "../../constants/Color";

export default function Userprofile() {
  return (
    <View style={styles.userInfo}>
      <Image style={styles.img} source={require("../../assets/user.png")} />
      <View style={styles.user}>
        <Text style={styles.email}>reminderx@gmail.com</Text>
        <Text style={styles.address}>
          Mandaluyong, Metro Manila, Philippines
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  userInfo: {
    marginTop: 24,
    flexDirection: "row",
    alignItems: "center",
  },

  img: {
    width: 32,
    height: 32,
    borderRadius: 25,
  },

  user: {
    marginLeft: 10,
  },

  email: {
    fontFamily: Fonts.main,
    color: "#fff",
    fontSize: 18,
  },

  address: {
    fontFamily: Fonts.sub,
    color: Color.tagLine,
    fontSize: 12,
  },
});
