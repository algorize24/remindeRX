import { View, Text, StyleSheet, KeyboardAvoidingView } from "react-native";
import { useState } from "react";

// components
import AuthInputs from "../../components/Inputs/AuthInputs";
import MainButton from "../../components/buttons/MainButton";

// constants
import { Color } from "../../constants/Color";
import { Fonts } from "../../constants/Font";
import Button from "../../components/buttons/Button";

export default function AuthLogin({ navigation }) {
  // loading state for handleSignIn
  const [isLoading, setIsLoading] = useState(false);
  const handleSignUp = () => {
    // navigation.navigate("Signup");
    navigation.reset({
      index: 0,
      routes: [{ name: "Signup" }],
    });
  };

  const handleSignIn = () => {
    setIsLoading(true); // Set loading state to true when the button is pressed
    setTimeout(() => {
      setIsLoading(false); // Reset loading state after delay
      navigation.navigate("RealTime"); // Navigate to the next screen
    }, 2000); // Delay for 2 seconds (2000 milliseconds)
  };

  return (
    <View style={styles.root}>
      <View style={styles.textContainer}>
        <Text style={styles.welcometext}>Welcome To</Text>
        <Text style={styles.text}>
          Reminde<Text style={styles.rx}>RX</Text>
        </Text>
      </View>

      <AuthInputs />

      <KeyboardAvoidingView style={styles.keyboard}>
        <View style={styles.viewKey}>
          {!isLoading ? (
            <MainButton onPress={handleSignIn}>Log In</MainButton>
          ) : (
            <Button isEnable={false}>Logging in...</Button>
          )}
          <Text style={styles.subText}>
            Don't have an account?{" "}
            <Text onPress={handleSignUp} style={styles.signUpText}>
              Sign Up
            </Text>
          </Text>
        </View>
      </KeyboardAvoidingView>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    paddingHorizontal: 25,
    flex: 1,
  },
  keyboard: {
    flex: 2,
    justifyContent: "flex-end",
  },

  viewKey: {
    marginBottom: 50,
  },

  textContainer: {
    alignItems: "center",
    marginTop: 18,
    marginBottom: 24,
  },

  welcometext: {
    fontFamily: Fonts.main,
    color: Color.tagLine,
    fontSize: 13,
    textTransform: "uppercase",
  },

  text: {
    fontFamily: Fonts.main,
    color: "white",
    fontSize: 32,
  },

  rx: {
    color: Color.purpleColor,
  },

  subText: {
    fontFamily: Fonts.sub,
    color: "white",
    textAlign: "center",
    marginTop: 18,
  },

  signUpText: {
    color: Color.purpleColor,
    textDecorationLine: "underline",
  },
});
