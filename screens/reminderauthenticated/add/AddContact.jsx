import { View, StyleSheet } from "react-native";
import { useState } from "react";

import { Color } from "../../../constants/Color";
import { Fonts } from "../../../constants/Font";

import UploadImage from "../../../components/buttons/UploadImage";
import MainButton from "../../../components/buttons/MainButton";
import TextInputs from "../../../components/Inputs/TextInputs";
import TextScreen from "../../../components/header/TextScreen";
import InputText from "../../../components/header/InputText";
import Button from "../../../components/buttons/Button";

export default function AddContact({ navigation }) {
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

  // loading state for main button
  const [isLoading, setIsLoading] = useState(false);
  const handleAddContact = () => {
    setIsLoading(true); // Set loading state to true when the button is pressed
    setTimeout(() => {
      setIsLoading(false); // Reset loading state after delay
      navigation.navigate("Contact"); // Navigate to the next screen
    }, 2000); // Delay for 2 seconds (2000 milliseconds)
  };

  return (
    <View style={styles.root}>
      <View style={styles.textContainer}>
        <TextScreen>Add Contact</TextScreen>
      </View>

      <View style={styles.inputContainer}>
        <InputText>Name:</InputText>
        <TextInputs style={styles.textInput} placeholder={"Enter Name"} />

        <InputText>Number:</InputText>
        <TextInputs
          inputMode="numeric"
          keyboardType="phone-pad"
          style={styles.textInput}
          placeholder={"Enter Number"}
          maxLength={12}
          value={phoneNumber}
          onChangeText={phoneNumberHandler}
        />

        <InputText>Image:</InputText>
        <UploadImage />
      </View>
      {!isLoading ? (
        <MainButton onPress={handleAddContact} style={styles.button}>
          Add Contact
        </MainButton>
      ) : (
        <Button style={styles.button}>Adding Contact...</Button>
      )}
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
    marginTop: 60,
  },
});
