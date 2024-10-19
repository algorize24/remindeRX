import { View, StyleSheet } from "react-native";

// constants
import { Color } from "../../constants/Color";

// components
import Title from "../../components/header/Title";
import MainButton from "../../components/buttons/MainButton";

export default function AuthSelect({ navigation }) {
  const handleLogIn = () => {
    navigation.navigate("Signin");
  };

  const handleCreateAccount = () => {
    navigation.navigate("Signup");
  };

  return (
    <View style={styles.root}>
      <Title />

      <View style={styles.buttonView}>
        <MainButton onPress={handleLogIn} style={styles.login}>
          Log In
        </MainButton>
        <MainButton
          onPress={handleCreateAccount}
          pressedStyle={styles.buttonStyle}
          textStyle={styles.text}
        >
          Create Account
        </MainButton>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    justifyContent: "flex-end",
    paddingHorizontal: 20,
    marginBottom: 98,
  },

  buttonStyle: {
    backgroundColor: Color.container,
  },

  text: {
    color: Color.purpleColor,
  },

  buttonView: {
    marginTop: 183,
  },

  login: {
    marginBottom: 20,
  },
});
