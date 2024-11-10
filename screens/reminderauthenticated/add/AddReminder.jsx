import { View, Text, StyleSheet } from "react-native";

// component
import AuthText from "../../../components/header/AuthText";
import TextInputs from "../../../components/Inputs/TextInputs";

// constants
import { Color } from "../../../constants/Color";
import { Fonts } from "../../../constants/Font";
import MainButton from "../../../components/buttons/MainButton";
export default function AddReminder() {
  return (
    <View style={styles.root}>
      <AuthText style={styles.text}>
        What medicine would you like to add?
      </AuthText>

      <View style={styles.container}>
        <View style={styles.subContainer}>
          <Text style={styles.medText}>Type your medication name</Text>

          <TextInputs style={styles.inputs} placeholder={"e.g., Paracetamol"} />
        </View>

        <View style={styles.buttonView}>
          <MainButton style={styles.button}>Next</MainButton>
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
  },

  buttonView: {
    alignItems: "center",
  },

  button: {
    width: "90%",
  },
});
