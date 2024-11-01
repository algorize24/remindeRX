import { View, Text, StyleSheet, Pressable } from "react-native";
import { useState } from "react";

// constants
import { Fonts } from "../../constants/Font";
import { Color } from "../../constants/Color";

// components
import MainButton from "../../components/buttons/MainButton";
import TextInputs from "../../components/Inputs/TextInputs";
import AuthText from "../../components/header/AuthText";
import Button from "../../components/buttons/Button";

// icon
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import Fontisto from "@expo/vector-icons/Fontisto";
import Feather from "@expo/vector-icons/Feather";
import Entypo from "@expo/vector-icons/Entypo";
import UploadImage from "../../components/buttons/UploadImage";

export default function AuthSignUp({ navigation }) {
  // show password icon...
  const [showPassword, setShowPassword] = useState(false);

  // loading state for btn
  const [isLoading, setIsLoading] = useState(false);

  // fn for show password
  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleSignUp = () => {
    setIsLoading(true); // Set loading state to true when the button is pressed
    setTimeout(() => {
      setIsLoading(false); // Reset loading state after delay
      navigation.navigate("CreatingAccount");
    }, 2000);
  };

  // go to sign in screen
  const handleSignIn = () => {
    navigation.navigate("Signin");
  };
  return (
    <View style={styles.root}>
      <View style={styles.textContainer}>
        <AuthText style={styles.authText}>Create an Account</AuthText>
        <Text style={styles.text}>
          We will send you an email to this address for verification.
        </Text>
      </View>

      <View style={styles.inputView}>
        <MaterialIcons name="person" size={24} color="#B3B3B3" />
        <View style={styles.input}>
          <TextInputs placeholder={"Name"} />
        </View>
      </View>

      <View style={styles.inputView}>
        <Fontisto name="email" size={20} color="#B3B3B3" />
        <View style={styles.input}>
          <TextInputs
            keyboardType={"email-address"}
            placeholder={"Email Address"}
          />
        </View>
      </View>

      <View style={styles.inputView}>
        <Feather name="lock" size={20} color="#B3B3B3" />

        <View style={styles.input}>
          <TextInputs
            placeholder={"Password"}
            secure={showPassword ? false : true}
          />
        </View>

        <Pressable onPress={handleShowPassword}>
          <Entypo
            name={showPassword ? "eye" : "eye-with-line"}
            size={20}
            color="#B3B3B3"
          />
        </Pressable>
      </View>

      <View style={styles.inputView}>
        <FontAwesome6 name="location-dot" size={20} color="#B3B3B3" />
        <View style={styles.input}>
          <TextInputs placeholder={"Address"} />
        </View>
      </View>

      <UploadImage style={styles.uploadImage} />

      <View style={styles.viewKey}>
        {!isLoading ? (
          <MainButton onPress={handleSignUp}>Sign Up</MainButton>
        ) : (
          <Button isEnable={false}>Signing Up...</Button>
        )}
        <Text style={styles.subText}>
          I have an account?{" "}
          <Text onPress={handleSignIn} style={styles.signInText}>
            Sign In
          </Text>
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 5,
  },

  textContainer: {
    marginBottom: 32,
  },

  text: {
    fontFamily: Fonts.sub,
    color: Color.tagLine,
    marginTop: 14,
    maxWidth: 320,
  },

  authText: {
    textTransform: "none",
  },

  inputView: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: Color.container,
    borderRadius: 12,
    paddingHorizontal: 12,
    marginTop: 22,
  },

  input: {
    flex: 1,
  },

  viewKey: {
    marginTop: 50,
    marginBottom: 20,
  },

  subText: {
    fontFamily: Fonts.sub,
    color: "white",
    textAlign: "center",
    marginTop: 18,
  },
  signInText: {
    color: Color.purpleColor,
    textDecorationLine: "underline",
  },

  uploadImage: {
    marginTop: 22,
  },
});
