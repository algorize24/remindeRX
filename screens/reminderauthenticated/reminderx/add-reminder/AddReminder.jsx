import { View, Text, StyleSheet } from "react-native";
import { useState } from "react";

// component
import MainButton from "../../../../components/buttons/MainButton";
import TextInputs from "../../../../components/Inputs/TextInputs";
import AuthText from "../../../../components/header/AuthText";

// constants
import { Color } from "../../../../constants/Color";
import { Fonts } from "../../../../constants/Font";

// context
import { useReminder } from "../../../../context/reminderContext";

export default function AddReminder({ navigation }) {
  // from ReminderContext
  const { medicationName, setMedicationName } = useReminder();

  // state for inputs
  const [medName, setMedName] = useState(medicationName);

  // error state
  const [error, setError] = useState("");

  // fn for MainButton
  const handleMedicationName = () => {
    // reset the error
    setError("");

    // check if medName is not empty or whitespace
    if (medName.trim()) {
      setMedicationName(medName);
      navigation.navigate("OftenTake");

      // reset the field
      setMedName("");
    } else {
      setError("Medication name cannot be empty.");
    }
  };

  return (
    <View style={styles.root}>
      <AuthText style={styles.text}>
        What medicine would you like to add?
      </AuthText>

      <View style={styles.container}>
        <View style={styles.subContainer}>
          <Text style={styles.medText}>Type your medication name</Text>

          <TextInputs
            style={styles.inputs}
            placeholder={"e.g., Paracetamol"}
            placeholderTextColor={"#fff"}
            value={medName}
            onChangeText={(text) => setMedName(text)}
          />

          {error ? <Text style={styles.errorText}>{error}</Text> : null}
        </View>

        <View style={styles.buttonView}>
          <MainButton onPress={handleMedicationName} style={styles.button}>
            Next
          </MainButton>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
  text: {
    textTransform: "none",
    marginHorizontal: 18,
    marginBottom: 20,
    marginTop: 50,
    fontSize: 20,
    width: 320,
  },

  container: {
    flex: 1,
    backgroundColor: Color.container,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    justifyContent: "space-between",
    paddingBottom: 20,
  },

  subContainer: {
    marginTop: 30,
    marginHorizontal: 30,
  },

  medText: {
    fontFamily: Fonts.main,
    color: "#fff",
  },

  inputs: {
    backgroundColor: Color.bgColor,
    borderRadius: 8,
    marginTop: 10,
    color: "#fff",
  },

  buttonView: {
    alignItems: "center",
  },

  button: {
    width: "90%",
  },

  errorText: {
    color: Color.redColor,
    fontFamily: Fonts.main,
    fontSize: 13,
    marginVertical: 10,
  },
});
