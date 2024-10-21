import { View, StyleSheet } from "react-native";
import { Color } from "../../../constants/Color";
import TextScreen from "../../../components/header/TextScreen";
import TextInputs from "../../../components/Inputs/TextInputs";
import InputText from "../../../components/header/InputText";
import UploadImage from "../../../components/buttons/UploadImage";
import MainButton from "../../../components/buttons/MainButton";

export default function AddContact() {
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

      <MainButton style={styles.button}>Add Contact</MainButton>
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
