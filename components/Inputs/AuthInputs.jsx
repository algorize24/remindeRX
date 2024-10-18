import { View, Text, StyleSheet, Pressable } from "react-native";
import { useState } from "react";
import TextInputs from "./TextInputs";
import { Color } from "../../constants/Color";

// icons
import Fontisto from "@expo/vector-icons/Fontisto";
import Feather from "@expo/vector-icons/Feather";
import Entypo from "@expo/vector-icons/Entypo";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { Fonts } from "../../constants/Font";

import { useNavigation } from "@react-navigation/native";

export default function AuthInputs() {
  const [showPassword, setShowPassword] = useState(false); // show pass
  const [rememberMe, setRememberMe] = useState(false); // checked box
  const navigation = useNavigation();

  // invoke in pressable forgot password
  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleForgotPassword = () => {
    navigation.navigate("ForgotPassword");
  };

  return (
    <View>
      <View style={styles.inputsContainer}>
        <View style={styles.inputView}>
          <Fontisto name="email" size={20} color="#B3B3B3" />
          <View style={styles.input}>
            <TextInputs placeholder={"Email"} />
          </View>
        </View>

        <View style={styles.inputView}>
          <Feather name="lock" size={20} color="#B3B3B3" />
          <View style={styles.input}>
            <TextInputs
              style={styles.borderStyle}
              secure={showPassword ? false : true}
              placeholder={"Password"}
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
      </View>

      <View style={styles.container}>
        <View style={styles.subContainer}>
          <Pressable
            style={styles.press}
            onPress={() => setRememberMe(!rememberMe)}
          >
            <MaterialCommunityIcons
              name={
                rememberMe
                  ? "checkbox-marked-circle"
                  : "checkbox-blank-circle-outline"
              }
              size={24}
              color="white"
            />
          </Pressable>
          <Text style={styles.text}>Remember Me</Text>
        </View>

        <View>
          <Text onPress={handleForgotPassword} style={styles.forgotText}>
            Forgot Password?
          </Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  inputsContainer: {
    backgroundColor: Color.textInput,
    borderRadius: 8,
    padding: 10,
  },

  inputView: {
    flexDirection: "row",
    alignItems: "center",
  },

  input: {
    flex: 1,
  },

  borderStyle: {
    borderTopWidth: 1,
    borderTopColor: Color.tagLine,
  },

  container: {
    marginTop: 22,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  subContainer: {
    flexDirection: "row",
    alignItems: "center",
  },

  press: {
    marginRight: 5,
  },
  text: {
    color: "white",
    fontFamily: Fonts.sub,
  },

  forgotText: {
    color: Color.purpleColor,
    fontFamily: Fonts.sub,
  },
});
