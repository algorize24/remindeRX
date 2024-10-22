import { View, Text, StyleSheet, Image } from "react-native";

import { Color } from "../../constants/Color";
import { Fonts } from "../../constants/Font";
import { useState } from "react";
import LoadingRoots from "../../components/loading/LoadingRoots";

export default function ProfileScreen({ navigation }) {
  const [isLoading, setIsLoading] = useState(false);
  const handleSignOut = () => {
    setIsLoading(true); // Set loading state to true when the button is pressed
    setTimeout(() => {
      setIsLoading(false); // Reset loading state after delay
      navigation.navigate("Signin");
    }, 2000); // Delay for 2 seconds (2000 milliseconds)
  };

  let content = (
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

      {!isLoading ? (
        <Text onPress={handleSignOut} style={styles.signOut}>
          Sign Out
        </Text>
      ) : (
        <LoadingRoots />
      )}
    </View>
  );

  if (!isLoading) {
    return content;
  } else {
    content = <LoadingRoots />;
  }

  return <View style={styles.root}>{content}</View>;
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
    fontSize: 12,
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
    marginTop: 20,
    paddingHorizontal: 25,
  },
});
