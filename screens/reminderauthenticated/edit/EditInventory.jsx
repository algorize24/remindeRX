import { View, StyleSheet, ScrollView, Text } from "react-native";
import { useState } from "react";

import { Color } from "../../../constants/Color";

import UploadImage from "../../../components/buttons/UploadImage";
import MainButton from "../../../components/buttons/MainButton";
import TextScreen from "../../../components/header/TextScreen";
import TextInputs from "../../../components/Inputs/TextInputs";
import InputText from "../../../components/header/InputText";
import Button from "../../../components/buttons/Button";

export default function EditInventory({ navigation, route }) {
  const id = route.params.id;
  const medicine = route.params.medicine;
  const dosage = route.params.dosage;
  const expDate = route.params.expDate;
  const stock = route.params.stock;

  // loading state for main button edit
  const [isInventoryLoading, setIsInventoryLoading] = useState(false);
  const handleEditInventory = () => {
    setIsInventoryLoading(true); // Set loading state to true when the button is pressed
    setTimeout(() => {
      setIsInventoryLoading(false); // Reset loading state after delay
      navigation.navigate("Inventory"); // Navigate to the next screen
    }, 2000); // Delay for 2 seconds (2000 milliseconds)
  };

  // loading state for main button delete
  const [isDeletingLoading, setIsDeletingLoading] = useState(false);
  const handleDeleteInventory = () => {
    setIsDeletingLoading(true); // Set loading state to true when the button is pressed
    setTimeout(() => {
      setIsDeletingLoading(false); // Reset loading state after delay
      navigation.navigate("Inventory"); // Navigate to the next screen
    }, 2000); // Delay for 2 seconds (2000 milliseconds)
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
          <TextScreen style={styles.textScreen}>
            # <Text style={styles.name}>{medicine}</Text>
          </TextScreen>
        </View>

        <View style={styles.inputContainer}>
          <InputText>Medicine Name:</InputText>
          <TextInputs style={styles.textInput} placeholder={medicine} />

          <InputText>Dosage:</InputText>
          <TextInputs
            secure={true}
            inputMode={"numeric"}
            keyboardType={"numeric"}
            style={styles.textInput}
            placeholder={`${dosage}mg`}
            maxLength={3}
          />

          <InputText>Quantity:</InputText>
          <TextInputs
            inputMode={"numeric"}
            keyboardType={"numeric"}
            style={styles.textInput}
            placeholder={stock}
            maxLength={3}
          />

          <InputText>Expiration Date:</InputText>
          <TextInputs
            inputMode={"numeric"}
            keyboardType={"numeric"}
            style={styles.textInput}
            placeholder={expDate}
            maxLength={10}
            onChangeText={expirationDateHandler}
            value={expirationDate}
          />

          <InputText>Image:</InputText>
          <UploadImage />
        </View>
      </ScrollView>

      <View style={styles.buttonContainer}>
        {!isDeletingLoading ? (
          <MainButton onPress={handleDeleteInventory} style={styles.button}>
            Delete
          </MainButton>
        ) : (
          <Button style={styles.button}>Deleting...</Button>
        )}

        {!isInventoryLoading ? (
          <MainButton onPress={handleEditInventory} style={styles.editButton}>
            Edit Medicine
          </MainButton>
        ) : (
          <Button style={styles.editButton}>Editing Medicine...</Button>
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

  buttonContainer: {
    marginTop: 0,
  },

  button: {
    marginBottom: 10,
    backgroundColor: Color.redColor,
  },

  editButton: {
    marginBottom: 20,
  },

  name: {
    color: Color.greenColor,
  },

  textScreen: {
    color: Color.tagLine,
  },
});
