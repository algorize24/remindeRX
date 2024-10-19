import { View, Text, StyleSheet, Image } from "react-native";
import { Color } from "../../constants/Color";
import { Fonts } from "../../constants/Font";
export default function ProfileScreen({ navigation }) {
  const handleSignOut = () => {
    navigation.navigate("");
  };
  return (
    <View style={styles.root}>
      <View style={styles.userInfo}>
        <Image style={styles.img} source={require("../../assets/user.png")} />
        <Text style={styles.email}>reminderx@gmail.com</Text>
        <Text style={styles.address}>
          Mandaluyong, Metro Manila, Philippines
        </Text>
      </View>

      <View style={styles.links}>
        <Text onPress={() => {}} style={styles.text}>
          Terms of Use
        </Text>

        <Text onPress={() => {}} style={styles.text}>
          Privacy & Policy
        </Text>

        <Text onPress={() => {}} style={styles.text}>
          Help & Support
        </Text>

        <Text onPress={() => {}} style={styles.text}>
          About RemindeRX
        </Text>

        <Text onPress={() => {}} style={styles.text}>
          About Us
        </Text>
      </View>

      <Text onPress={handleSignOut} style={styles.signOut}>
        Sign Out
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: Color.bgColor,
    justifyContent: "center",
  },

  userInfo: {
    justifyContent: "center",
    alignItems: "center",
    // marginTop: 100,
  },

  img: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },

  email: {
    fontFamily: Fonts.main,
    fontSize: 16,
    color: "white",
    fontWeight: "bold",
    marginTop: 12,
  },

  address: {
    fontFamily: Fonts.sub,
    color: Color.tagLine,
  },

  links: {
    marginTop: 99,
    paddingHorizontal: 25,
  },

  text: {
    color: "#fff",
    fontFamily: Fonts.main,
    fontWeight: "bold",
    fontSize: 16,
    marginBottom: 30,
  },

  signOut: {
    color: "#fff",
    fontFamily: Fonts.main,
    fontWeight: "bold",
    fontSize: 16,
    marginTop: 40,
    paddingHorizontal: 25,
  },
});
