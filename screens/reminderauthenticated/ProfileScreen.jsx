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
        <Text
          onPress={() => {
            navigation.navigate("TermOfUse");
          }}
          style={styles.text}
        >
          Terms of Use
        </Text>

        <Text
          onPress={() => {
            navigation.navigate("PrivacyPolicy");
          }}
          style={styles.text}
        >
          Privacy & Policy
        </Text>

        <Text
          onPress={() => {
            navigation.navigate("HelpnSupport");
          }}
          style={styles.text}
        >
          Help & Support
        </Text>

        <Text
          onPress={() => {
            navigation.navigate("AboutReminderx");
          }}
          style={styles.text}
        >
          About RemindeRX
        </Text>

        <Text
          onPress={() => {
            navigation.navigate("AboutUs");
          }}
          style={styles.text}
        >
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
    borderWidth: 2,
  },

  userInfo: {
    justifyContent: "center",
    alignItems: "center",
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
    marginTop: 12,
  },

  address: {
    fontFamily: Fonts.sub,
    color: Color.tagLine,
  },

  links: {
    marginTop: 50,
    paddingHorizontal: 25,
  },

  text: {
    color: "#fff",
    fontFamily: Fonts.main,
    fontSize: 16,
    marginBottom: 30,
  },

  signOut: {
    color: "#fff",
    fontFamily: Fonts.main,
    fontSize: 16,
    marginTop: 40,
    paddingHorizontal: 25,
  },
});
