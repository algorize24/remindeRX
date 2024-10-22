import { View, Text, StyleSheet, KeyboardAvoidingView } from "react-native";
import { useState } from "react";

// constants
import { Fonts } from "../../constants/Font";
import { Color } from "../../constants/Color";

// components
import AuthText from "../../components/header/AuthText";
import TextInputs from "../../components/Inputs/TextInputs";
import MainButton from "../../components/buttons/MainButton";

// icons
import Fontisto from "@expo/vector-icons/Fontisto";
import Button from "../../components/buttons/Button";

export default function ForgotPassword({ navigation }) {
  // loading state for handlePasswordReset
  const [isLoading, setIsLoading] = useState(false);

  const handlePasswordReset = () => {
    setIsLoading(true); // Set loading state to true when the button is pressed
    setTimeout(() => {
      setIsLoading(false); // Reset loading state after delay
      navigation.navigate("ResetPassword");
    }, 2000);
  };
  return (
    <View style={styles.root}>
      <AuthText>password reset</AuthText>
      <Text style={styles.text}>
        We will send an email to help you reset your password.
      </Text>

      <View style={styles.inputView}>
        <Fontisto name="email" size={20} color="#B3B3B3" />
        <View style={styles.input}>
          <TextInputs
            keyboardType={"email-address"}
            placeholder={"Email Address"}
          />
        </View>
      </View>

      <KeyboardAvoidingView style={styles.keyboard}>
        <View style={styles.viewKey}>
          {!isLoading ? (
            <MainButton onPress={handlePasswordReset}>Send</MainButton>
          ) : (
            <Button isEnable={false}>Sending...</Button>
          )}
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

  keyboard: {
    flex: 2,
    justifyContent: "flex-end",
  },

  viewKey: {
    marginBottom: 50,
  },

  inputView: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: Color.textInput,
    borderRadius: 12,
    paddingHorizontal: 12,
    marginTop: 17,
  },
  input: {
    flex: 1,
  },

  text: {
    fontFamily: Fonts.sub,
    color: Color.tagLine,
    marginTop: 14,
    marginBottom: 17,
    maxWidth: 320,
  },
});
