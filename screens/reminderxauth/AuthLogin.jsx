import { View, Text, StyleSheet, KeyboardAvoidingView } from "react-native";
import { Color } from "../../constants/Color";
import { Fonts } from "../../constants/Font";

import TextInputs from "../../components/Inputs/TextInputs";

import Fontisto from "@expo/vector-icons/Fontisto";
import AuthInputs from "../../components/Inputs/AuthInputs";
import MainButton from "../../components/buttons/MainButton";

export default function AuthLogin({ navigation }) {
  const handleSignUp = () => {
    // navigation.navigate("Signup");
    navigation.reset({
      index: 0,
      routes: [{ name: "Signup" }],
    });
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
          <MainButton>Log In</MainButton>
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
    fontWeight: "bold",
    fontSize: 16,
  },

  text: {
    fontFamily: Fonts.main,
    color: "white",
    fontWeight: "bold",
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
  },
});
