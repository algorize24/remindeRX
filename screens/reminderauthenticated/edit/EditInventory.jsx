import { View, StyleSheet, ScrollView } from "react-native";
import { Color } from "../../../constants/Color";
import TextScreen from "../../../components/header/TextScreen";
import TextInputs from "../../../components/Inputs/TextInputs";
import InputText from "../../../components/header/InputText";
import UploadImage from "../../../components/buttons/UploadImage";
import MainButton from "../../../components/buttons/MainButton";

export default function EditInventory() {
  return (
    <View style={styles.root}>
      <ScrollView overScrollMode="never" bounces={false}>
        <View style={styles.textContainer}>
          <TextScreen>Edit Medicine</TextScreen>
        </View>

        <View style={styles.inputContainer}>
          <InputText>Medicine Name:</InputText>
          <TextInputs style={styles.textInput} placeholder={""} />

          <InputText>Dosage:</InputText>
          <TextInputs
            secure={true}
            inputMode={"numeric"}
            keyboardType={"numeric"}
            style={styles.textInput}
            placeholder={""}
          />

          <InputText>Quantity:</InputText>
          <TextInputs
            inputMode={"numeric"}
            keyboardType={"numeric"}
            style={styles.textInput}
            placeholder={" "}
          />

          <InputText>Expiration Date:</InputText>
          <TextInputs
            inputMode={"numeric"}
            keyboardType={"numeric"}
            style={styles.textInput}
            placeholder={" "}
          />

          <InputText>Image:</InputText>
          <UploadImage />
        </View>
      </ScrollView>

      <View style={styles.buttonContainer}>
        <MainButton style={styles.button}>Delete</MainButton>
        <MainButton style={styles.editButton}>Edit Contact</MainButton>
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
});
