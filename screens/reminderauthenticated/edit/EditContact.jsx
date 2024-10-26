import { View, StyleSheet, Text } from "react-native";
import { useState } from "react";

import { Color } from "../../../constants/Color";
import { Fonts } from "../../../constants/Font";

import UploadImage from "../../../components/buttons/UploadImage";
import MainButton from "../../../components/buttons/MainButton";
import TextInputs from "../../../components/Inputs/TextInputs";
import TextScreen from "../../../components/header/TextScreen";
import InputText from "../../../components/header/InputText";
import Button from "../../../components/buttons/Button";

export default function EditContact({ navigation, route }) {
  const id = route.params.contactId;
  const name = route.params.name;
  const number = route.params.number;

  // loading state for main button edit
  const [isContactLoading, setIsContactLoading] = useState(false);
  const handleEditingContact = () => {
    setIsContactLoading(true); // Set loading state to true when the button is pressed
    setTimeout(() => {
      setIsContactLoading(false); // Reset loading state after delay
      navigation.navigate("Contact"); // Navigate to the next screen
    }, 2000); // Delay for 2 seconds (2000 milliseconds)
  };

  // loading state for main button delete
  const [isDeletingLoading, setIsDeletingLoading] = useState(false);
  const handleDeletingContact = () => {
    setIsDeletingLoading(true); // Set loading state to true when the button is pressed
    setTimeout(() => {
      setIsDeletingLoading(false); // Reset loading state after delay
      navigation.navigate("Contact"); // Navigate to the next screen
    }, 2000); // Delay for 2 seconds (2000 milliseconds)
  };

  // state for number
  const [phoneNumber, setPhoneNumber] = useState("");

  // formatter
  const formatPhoneNumber = (input) => {
    // Remove all non-numeric characters
    const cleaned = input.replace(/\D/g, "");

    // Format to "123 456 7890" pattern
    const formatted = cleaned.replace(/(\d{3})(\d{3})(\d{4})/, "$1 $2 $3");

    return formatted.trim();
  };

  // number handler
  const phoneNumberHandler = (input) => {
    const formattedInput = formatPhoneNumber(input);
    setPhoneNumber(formattedInput);
  };

  return (
    <View style={styles.root}>
      <View style={styles.textContainer}>
        <TextScreen style={styles.textScreen}>
          # <Text style={styles.name}>{name}</Text>
        </TextScreen>
      </View>

      <View style={styles.inputContainer}>
        <InputText>Name:</InputText>
        <TextInputs style={styles.textInput} placeholder={name} />

        <InputText>Number:</InputText>
        <TextInputs
          inputMode="numeric"
          keyboardType="phone-pad"
          style={styles.textInput}
          placeholder={number}
          maxLength={12}
          value={phoneNumber}
          onChangeText={phoneNumberHandler}
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

  name: {
    color: Color.greenColor,
  },

  textScreen: {
    color: Color.tagLine,
  },
});
