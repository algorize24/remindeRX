import { View, StyleSheet } from "react-native";
import { Color } from "../../../constants/Color";
import TextScreen from "../../../components/header/TextScreen";
import TextInputs from "../../../components/Inputs/TextInputs";
import InputText from "../../../components/header/InputText";
import UploadImage from "../../../components/buttons/UploadImage";
import MainButton from "../../../components/buttons/MainButton";

export default function EditContact() {
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
        <MainButton style={styles.button}>Delete</MainButton>
        <MainButton>Edit Contact</MainButton>
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
