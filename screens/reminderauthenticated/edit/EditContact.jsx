import { View, StyleSheet } from "react-native";
import { useState } from "react";
import { Color } from "../../../constants/Color";
import TextScreen from "../../../components/header/TextScreen";
import TextInputs from "../../../components/Inputs/TextInputs";
import InputText from "../../../components/header/InputText";
import UploadImage from "../../../components/buttons/UploadImage";
import MainButton from "../../../components/buttons/MainButton";
import Button from "../../../components/buttons/Button";

export default function EditContact({ navigation }) {
  // loading state for main button edit
  const [isContactLoading, setIsContactLoading] = useState(false);

  // loading state for main button delete
  const [isDeletingLoading, setIsDeletingLoading] = useState(false);

  const handleEditingContact = () => {
    setIsContactLoading(true); // Set loading state to true when the button is pressed
    setTimeout(() => {
      setIsContactLoading(false); // Reset loading state after delay
      navigation.navigate("Contact"); // Navigate to the next screen
    }, 2000); // Delay for 2 seconds (2000 milliseconds)
  };

  const handleDeletingContact = () => {
    setIsDeletingLoading(true); // Set loading state to true when the button is pressed
    setTimeout(() => {
      setIsDeletingLoading(false); // Reset loading state after delay
      navigation.navigate("Contact"); // Navigate to the next screen
    }, 2000); // Delay for 2 seconds (2000 milliseconds)
  };
  return (
    <View style={styles.root}>
      <View style={styles.textContainer}>
        <TextScreen>Edit Contact</TextScreen>
      </View>

      <View style={styles.inputContainer}>
        <InputText>Name:</InputText>
        <TextInputs style={styles.textInput} placeholder={""} />

        <InputText>Number:</InputText>
        <TextInputs
          inputMode="numeric"
          keyboardType="phone-pad"
          style={styles.textInput}
          placeholder={""}
        />

        <InputText>Image:</InputText>
        <UploadImage />
      </View>

      <View style={styles.buttonContainer}>
        {!isDeletingLoading ? (
          <MainButton onPress={handleDeletingContact} style={styles.button}>
            Delete
          </MainButton>
        ) : (
          <Button style={styles.button}>Deleting...</Button>
        )}

        {!isContactLoading ? (
          <MainButton onPress={handleEditingContact}>Edit Contact</MainButton>
        ) : (
          <Button>Editing Contact...</Button>
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

  textContainer: {
    marginTop: 49,
    alignItems: "flex-start",
  },

  inputContainer: {
    marginTop: 20,
  },

  textInput: {
    backgroundColor: Color.container,
    borderRadius: 8,
    paddingHorizontal: 15,
    marginBottom: 10,
  },

  button: {
    marginBottom: 10,
    backgroundColor: Color.redColor,
  },

  buttonContainer: {
    marginTop: 163,
  },
});
