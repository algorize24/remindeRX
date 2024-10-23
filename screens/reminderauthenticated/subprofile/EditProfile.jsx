import { View, StyleSheet } from "react-native";
import { useState } from "react";

import { Color } from "../../../constants/Color";

import UploadImage from "../../../components/buttons/UploadImage";
import MainButton from "../../../components/buttons/MainButton";
import TextInputs from "../../../components/Inputs/TextInputs";
import InputText from "../../../components/header/InputText";
import AuthText from "../../../components/header/AuthText";
import Button from "../../../components/buttons/Button";

export default function EditProfile({ navigation }) {
  const [isLoading, setIsLoading] = useState(false);

  const handleEditProfile = () => {
    setIsLoading(true); // Set loading state to true when the button is pressed
    setTimeout(() => {
      setIsLoading(false); // Reset loading state after delay
      navigation.navigate("Profile"); // Navigate to the next screen
    }, 2000); // Delay for 2 seconds (2000 milliseconds)
  };
  return (
    <View style={styles.root}>
      <View style={styles.container}>
        <AuthText>Edit Profile</AuthText>

        <View style={styles.inputContainer}>
          <InputText>Email Address:</InputText>
          <TextInputs
            style={styles.inputs}
            keyboardType={"email-address"}
            placeholder={"Email Address"}
          />

          <InputText>Name:</InputText>
          <TextInputs style={styles.inputs} placeholder={"Name"} />
          <InputText>Address:</InputText>

          <TextInputs style={styles.inputs} placeholder={"Address"} />

          <InputText>Profile Image:</InputText>

          <UploadImage />
        </View>
        {!isLoading ? (
          <MainButton onPress={handleEditProfile}>Edit Profile</MainButton>
        ) : (
          <Button>Editing Profile</Button>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    paddingHorizontal: 18,
  },

  container: {
    marginTop: 20,
  },

  inputContainer: {
    marginTop: 20,
    marginBottom: 40,
  },

  inputs: {
    backgroundColor: Color.container,
    borderRadius: 8,
    paddingHorizontal: 15,
    marginBottom: 20,
  },
});
