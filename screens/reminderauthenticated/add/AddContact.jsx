import { View, StyleSheet } from "react-native";
import { useState } from "react";

import { Color } from "../../../constants/Color";

import UploadImage from "../../../components/buttons/UploadImage";
import MainButton from "../../../components/buttons/MainButton";
import TextInputs from "../../../components/Inputs/TextInputs";
import TextScreen from "../../../components/header/TextScreen";
import InputText from "../../../components/header/InputText";
import Button from "../../../components/buttons/Button";

export default function AddContact({ navigation }) {
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
        <TextInputs style={styles.textInput} placeholder={"Name"} />

        <InputText>Number:</InputText>
        <TextInputs
          secure={true}
          inputMode="numeric"
          keyboardType="phone-pad"
          style={styles.textInput}
          placeholder={"Cellphone Number"}
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
