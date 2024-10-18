import { View, Text, StyleSheet, KeyboardAvoidingView } from "react-native";
import { Fonts } from "../../constants/Font";
import { Color } from "../../constants/Color";
import AuthText from "../../components/header/AuthText";
import Fontisto from "@expo/vector-icons/Fontisto";
import TextInputs from "../../components/Inputs/TextInputs";
import MainButton from "../../components/buttons/MainButton";

export default function AuthSignUp({ navigation }) {
  const handleSignUp = () => {
    navigation.navigate("SetPassword");
  };
  const handleSignIn = () => {
    navigation.navigate("Signin");
  };
  return (
    <View style={styles.root}>
      <AuthText style={styles.authText}>Create an Account</AuthText>
      <Text style={styles.text}>
        We will send an email to help you reset your password.
      </Text>

      <View style={styles.inputView}>
        <Fontisto name="email" size={20} color="#B3B3B3" />
        <View style={styles.input}>
          <TextInputs placeholder={"Email"} />
        </View>
      </View>

      <KeyboardAvoidingView style={styles.keyboard}>
        <View style={styles.viewKey}>
          <MainButton onPress={handleSignUp}>Next</MainButton>
          <Text style={styles.subText}>
            I have an account?{" "}
            <Text onPress={handleSignIn} style={styles.signInText}>
              Sign In
            </Text>
          </Text>
        </View>
      </KeyboardAvoidingView>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 5,
  },
  text: {
    fontFamily: Fonts.sub,
    color: Color.tagLine,
    marginTop: 14,
    marginBottom: 17,
    maxWidth: 320,
  },

  authText: {
    textTransform: "none",
  },

  inputView: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: Color.textInput,
    borderRadius: 12,
    paddingHorizontal: 12,
    marginTop: 32,
  },

  input: {
    flex: 1,
  },

  keyboard: {
    flex: 2,
    justifyContent: "flex-end",
  },

  viewKey: {
    marginBottom: 50,
  },

  subText: {
    fontFamily: Fonts.sub,
    color: "white",
    textAlign: "center",
    marginTop: 18,
  },
  signInText: {
    color: Color.purpleColor,
  },
});
