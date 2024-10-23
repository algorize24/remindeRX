import { View, Text, StyleSheet, Image } from "react-native";
import { useState, useEffect } from "react";

import { Color } from "../../constants/Color";
import { Fonts } from "../../constants/Font";

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

  // Manage drawer behavior when loading
  useEffect(() => {
    if (isLoading) {
      // Disable drawer gestures and close the drawer when loading starts
      navigation.setOptions({
        headerShown: false,
        gestureEnabled: false,
        swipeEnabled: false,
      });
      navigation.closeDrawer();
    } else {
      // Re-enable gestures once loading is done
      navigation.setOptions({
        gestureEnabled: true,
        swipeEnabled: true,
      });
    }
  }, [isLoading, navigation]);

  let content = (
    <View style={styles.root}>
      <View style={styles.userInfo}>
        <Image
          style={styles.img}
          source={require("../../assets/others/user.png")}
        />
        <Text style={styles.email}>reminderx@gmail.com</Text>
        <Text style={styles.address}>
          Mandaluyong, Metro Manila, Philippines
        </Text>
      </View>

      <View style={styles.links}>
        <Text
          onPress={() => navigation.navigate("EditProfile")}
          style={styles.text}
        >
          Edit Profile
        </Text>
        <Text
          onPress={() => navigation.navigate("TermOfUse")}
          style={styles.text}
        >
          Terms of Use
        </Text>
        <Text
          onPress={() => navigation.navigate("PrivacyPolicy")}
          style={styles.text}
        >
          Privacy & Policy
        </Text>
        <Text
          onPress={() => navigation.navigate("HelpnSupport")}
          style={styles.text}
        >
          Help & Support
        </Text>
        <Text
          onPress={() => navigation.navigate("AboutReminderx")}
          style={styles.text}
        >
          About RemindeRX
        </Text>
        <Text
          onPress={() => navigation.navigate("AboutUs")}
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

      <Text style={styles.version}>reminderx version 1.0.0</Text>
    </View>
  );

  // Keep your original conditional rendering structure
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
    fontSize: 15,
    color: "white",
    marginTop: 5,
  },

  address: {
    fontFamily: Fonts.sub,
    color: Color.tagLine,
    fontSize: 12,
  },

  links: {
    marginTop: 45,
    paddingHorizontal: 25,
  },

  text: {
    color: "#fff",
    fontFamily: Fonts.main,
    fontSize: 16,
    marginBottom: 25,
  },

  signOut: {
    color: "#fff",
    fontFamily: Fonts.main,
    fontSize: 16,
    marginTop: 50,
    paddingHorizontal: 25,
  },

  version: {
    textAlign: "center",
    fontFamily: Fonts.main,
    color: Color.tagLine,
    marginTop: 100,
  },
});
