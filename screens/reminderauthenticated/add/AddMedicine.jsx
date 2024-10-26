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
  // state for button
  const [isLoading, setIsLoading] = useState(false);

  const handleAddMedicine = () => {
    setIsLoading(true); // Set loading state to true when the button is pressed
    setTimeout(() => {
      setIsLoading(false); // Reset loading state after delay
      navigation.navigate("Inventory"); // Navigate to the next screen
    }, 2000);
  };

  // state for expiration date text input
  const [expirationDate, setExpirationDate] = useState("");

  // date format
  const formatDate = (input) => {
    // Remove all non-numeric characters
    const cleaned = input.replace(/\D/g, "");

    // Format to "MM/DD/YYYY"
    let formattedDate = cleaned;
    if (cleaned.length > 2 && cleaned.length <= 4) {
      formattedDate = `${cleaned.slice(0, 2)}/${cleaned.slice(2)}`;
    } else if (cleaned.length > 4) {
      formattedDate = `${cleaned.slice(0, 2)}/${cleaned.slice(
        2,
        4
      )}/${cleaned.slice(4, 8)}`;
    }

    return formattedDate;
  };

  const expirationDateHandler = (input) => {
    const formattedInput = formatDate(input);
    setExpirationDate(formattedInput);
  };

  return (
    <View style={styles.root}>
      <ScrollView overScrollMode="never" bounces={false}>
        <View style={styles.textContainer}>
          <TextScreen>Add Medicine</TextScreen>
        </View>

        <View style={styles.inputContainer}>
          <InputText>Medicine Name:</InputText>
          <TextInputs
            style={styles.textInput}
            placeholder={"Enter Medicine Name"}
          />

          <InputText>Dosage:</InputText>
          <TextInputs
            inputMode={"numeric"}
            keyboardType={"numeric"}
            style={styles.textInput}
            placeholder={"Enter Dosage"}
            maxLength={3}
          />

          <InputText>Quantity:</InputText>
          <TextInputs
            inputMode={"numeric"}
            keyboardType={"numeric"}
            style={styles.textInput}
            placeholder={"Enter Quantity "}
            maxLength={3}
          />

          <InputText>Expiration Date:</InputText>
          <TextInputs
            inputMode={"numeric"}
            keyboardType={"numeric"}
            style={styles.textInput}
            placeholder={"Expiration Date "}
            maxLength={10}
            onChangeText={expirationDateHandler}
            value={expirationDate}
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
