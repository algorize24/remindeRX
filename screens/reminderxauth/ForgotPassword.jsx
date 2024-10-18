import { View, Text, StyleSheet, KeyboardAvoidingView } from "react-native";
import AuthText from "../../components/header/AuthText";
import { Fonts } from "../../constants/Font";
import { Color } from "../../constants/Color";
import TextInputs from "../../components/Inputs/TextInputs";
import MainButton from "../../components/buttons/MainButton";
import Fontisto from "@expo/vector-icons/Fontisto";

export default function ForgotPassword({ navigation }) {
  const handlePasswordReset = () => {
    navigation.navigate("ResetPassword");
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
          <TextInputs placeholder={"Email"} />
        </View>
      </View>

      <KeyboardAvoidingView style={styles.keyboard}>
        <View style={styles.viewKey}>
          <MainButton onPress={handlePasswordReset}>Send</MainButton>
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
