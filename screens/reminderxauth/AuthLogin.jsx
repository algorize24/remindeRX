import {
  View,
  Text,
  StyleSheet,
  KeyboardAvoidingView,
  Alert,
} from "react-native";
import { useState } from "react";

// components
import MainButton from "../../components/buttons/MainButton";
import AuthInputs from "../../components/Inputs/AuthInputs";
import Button from "../../components/buttons/Button";

// constants
import { Color } from "../../constants/Color";
import { Fonts } from "../../constants/Font";

// context
import { useAuth } from "../../context/authContext";

// firebase
import { auth } from "../../firebase/firebase";

// axios
import axios from "axios";

export default function AuthLogin({ navigation }) {
  // auth states
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(""); // error handling
  const [isLoading, setIsLoading] = useState(false); // loading handling

  const { signIn } = useAuth(); // signIn function in useAuth context

  const handleSignUp = () => {
    // navigation.navigate("Signup");
    navigation.reset({
      index: 0,
      routes: [{ name: "Signup" }],
    });
  };

  const handleSignIn = async () => {
    // reset the error message before trying to sign in
    setError("");

    // check if email and password is empty
    if (!email || !password) {
      setError(
        "Please enter your login details. The input fields cannot be empty."
      );
      return;
    }

    setIsLoading(true);

    try {
      // firebase sign-in
      await signIn(email, password);
      const currentUser = auth.currentUser;

      // get the token
      if (currentUser) {
        const token = await currentUser.getIdToken();

        // send request to backend
        const response = await axios.post(
          "http://10.0.2.2:5000/api/user/signin", // Correct address for Android emulator
          { email, password, token },
          { headers: { Authorization: `Bearer ${token}` } }
        );

        // if success, go to this screen.
        if (response.data.user) {
          navigation.navigate("RealTime");
        } else {
          setError(
            response.data.message || "Error signing in. Please try again."
          );
        }
      } else {
        setError("User not found, please check your credentials.");
      }
    } catch (error) {
      switch (error.code) {
        case "auth/invalid-credential":
          setError("No account found with this email. Please sign up.");
          break;
        case "auth/invalid-credential":
          setError("Incorrect password. Please try again.");
          break;
        case "auth/invalid-email":
          setError("Invalid email format. Please check and try again.");
          break;
        case "auth/invalid-credential":
          setError("Invalid credentials. Please try again or re-authenticate.");
          break;
        default:
          setError("Sign in failed. Please check your details and try again.");
          break;
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <View style={styles.root}>
      <View style={styles.textContainer}>
        <Text style={styles.welcometext}>Welcome To</Text>
        <Text style={styles.text}>
          Reminde<Text style={styles.rx}>RX</Text>
        </Text>
      </View>

      <AuthInputs setEmail={setEmail} setPassword={setPassword} error={error} />

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
