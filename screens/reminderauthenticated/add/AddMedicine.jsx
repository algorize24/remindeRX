import { View, StyleSheet, ScrollView } from "react-native";
import { useState } from "react";

import { Color } from "../../../constants/Color";

import UploadImage from "../../../components/buttons/UploadImage";
import MainButton from "../../../components/buttons/MainButton";
import TextScreen from "../../../components/header/TextScreen";
import TextInputs from "../../../components/Inputs/TextInputs";
import InputText from "../../../components/header/InputText";
import Button from "../../../components/buttons/Button";

export default function AddMedicine({ navigation }) {
  const [isLoading, setIsLoading] = useState(false);

  const handleAddMedicine = () => {
    setIsLoading(true); // Set loading state to true when the button is pressed
    setTimeout(() => {
      setIsLoading(false); // Reset loading state after delay
      navigation.navigate("Inventory"); // Navigate to the next screen
    }, 2000); // Delay for 2 seconds (2000 milliseconds)
  };
  return (
    <View style={styles.root}>
      <ScrollView overScrollMode="never" bounces={false}>
        <View style={styles.textContainer}>
          <TextScreen>Add Medicine</TextScreen>
        </View>

        <View style={styles.inputContainer}>
          <InputText>Medicine Name:</InputText>
          <TextInputs style={styles.textInput} placeholder={"Medicine Name"} />

          <InputText>Dosage:</InputText>
          <TextInputs
            secure={true}
            inputMode={"numeric"}
            keyboardType={"numeric"}
            style={styles.textInput}
            placeholder={"Dosage"}
          />

          <InputText>Quantity:</InputText>
          <TextInputs
            inputMode={"numeric"}
            keyboardType={"numeric"}
            style={styles.textInput}
            placeholder={"Quantity "}
          />

          <InputText>Expiration Date:</InputText>
          <TextInputs
            inputMode={"numeric"}
            keyboardType={"numeric"}
            style={styles.textInput}
            placeholder={"Expiration Date "}
          />

          <InputText>Image:</InputText>

          <UploadImage />
        </View>
      </ScrollView>

      {!isLoading ? (
        <MainButton onPress={handleAddMedicine} style={styles.button}>
          Add Medicine
        </MainButton>
      ) : (
        <Button style={styles.button}>Adding Medicine...</Button>
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
    position: "absolute",
    marginBottom: 10,
    bottom: 10,
    left: 10,
    right: 10,
  },
});
