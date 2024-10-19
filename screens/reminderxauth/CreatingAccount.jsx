import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  Platform,
  StatusBar,
} from "react-native";

// constants
import { Fonts } from "../../constants/Font";
import { Color } from "../../constants/Color";

// components
import AuthText from "../../components/header/AuthText";
import MainButton from "../../components/buttons/MainButton";

export default function CreatingAccount({ navigation }) {
  const handleButton = () => {
    navigation.reset({
      // to not go back to previous screen, focus only on one route.
      index: 0,
      routes: [{ name: "Signin" }],
    });
  };
  return (
    <SafeAreaView style={styles.root}>
      <AuthText style={styles.authText}>Creating an Account</AuthText>
      <Text style={styles.text}>
        Email sent successfully. Please check your email for verification.
      </Text>

      <MainButton onPress={handleButton}>Get Started</MainButton>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
    paddingHorizontal: 16,
    marginTop: 30,
  },

  authText: {
    textTransform: "none",
  },

  text: {
    fontFamily: Fonts.sub,
    color: Color.tagLine,
    textAlign: "center",
    marginTop: 89,
    marginBottom: 225,
  },
});
