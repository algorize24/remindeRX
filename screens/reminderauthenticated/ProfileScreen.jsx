import { View, Text, StyleSheet, Image, Alert } from "react-native";
import { useState, useEffect, useCallback } from "react";

import { useFocusEffect } from "@react-navigation/native";

// constant
import { Color } from "../../constants/Color";
import { Fonts } from "../../constants/Font";

// components
import LoadingRoots from "../../components/loading/LoadingRoots";
import LoadingProfile from "../../components/loading/LoadingProfile";

// auth context
import { useAuth } from "../../context/authContext";

// axios
import axios from "axios";

export default function ProfileScreen({ navigation }) {
  // state for fetching user
  const { user, logOut } = useAuth();
  const [userInfo, setUserInfo] = useState(null);
  const [userLoading, setUserLoading] = useState(null);

  // main loading state
  const [isLoading, setIsLoading] = useState(false);

  // fetch the user from database
  const fetchUser = async () => {
    // identify who user is logged in.
    if (user) {
      try {
        const response = await axios.get(
          `http://10.0.2.2:5000/api/user/${user.email}`
        );
        setUserInfo(response.data);
      } catch (error) {
        console.log("Error fetching user info", error);
      } finally {
        setUserLoading(false);
      }
    } else {
      setUserLoading(false);
    }
  };

  // Fetch user data on component mount and when screen is focused
  useFocusEffect(
    useCallback(() => {
      setUserLoading(true); // Set loading before fetch
      fetchUser(); // Refetch user data when screen is focused
    }, [user])
  );

  // get the email and password and set a fall back
  const displayEmail = userInfo ? userInfo.email : "null";
  const address = userInfo ? userInfo.address : "null";

  // sign out fn
  const handleSignOut = async () => {
    setIsLoading(true);
    try {
      await logOut(); // Call the logOut function from context
      navigation.navigate("Signin");
    } catch (error) {
      Alert.alert(
        "Sign Out Failed",
        "We encountered an issue while trying to sign you out. Please try again later. If the problem persists, contact support for assistance."
      );
    } finally {
      setIsLoading(false);
    }
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
      {userLoading ? (
        <LoadingProfile />
      ) : (
        <View style={styles.userInfo}>
          {userInfo && (
            <Image
              style={styles.img}
              source={require("../../assets/others/profile.png")}
            />
          )}
          <Text style={styles.email}>{displayEmail}</Text>
          <Text style={styles.address}>{address}</Text>
        </View>
      )}

      <View style={styles.links}>
        <Text
          onPress={() => navigation.navigate("EditProfile")}
          style={styles.text}
        >
          Edit Profile
        </Text>

        <Text onPress={() => navigation.navigate("Doctor")} style={styles.text}>
          Doctor List
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
    borderWidth: 1,
    borderColor: Color.textInput,
  },

  email: {
    fontFamily: Fonts.main,
    fontSize: 15,
    color: "white",
    marginTop: 5,
  },

  address: {
    fontFamily: Fonts.main,
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
