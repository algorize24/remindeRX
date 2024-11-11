import { View, Text, StyleSheet } from "react-native";
import { useLayoutEffect } from "react";

// constant
import { Color } from "../../../constants/Color";
import { Fonts } from "../../../constants/Font";

// components
import MainButton from "../../../components/buttons/MainButton";
import TextInputs from "../../../components/Inputs/TextInputs";
import AuthText from "../../../components/header/AuthText";

// context
import { useReminder } from "../../../context/reminderContext";

export default function EditPills({ navigation }) {
  // reminderContext
  const { medicationName } = useReminder();

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: () => (
        <Text style={styles.title}>{medicationName && medicationName}</Text>
      ),
    });
  }, [navigation, medicationName]);
  return (
    <View style={styles.root}>
      <AuthText style={styles.text}>How many pill(s) do you take?</AuthText>

      <View style={styles.container}>
        <View style={styles.subContainer}>
          <Text style={styles.note}>
            Set the default dose. You can adjust it later for each reminder
            time.
          </Text>

          <View style={styles.inputView}>
            <TextInputs
              style={styles.input}
              maxLength={2}
              keyboardType="numeric"
            />
            <Text style={styles.pills}>Pill(s)</Text>
          </View>
        </View>
        <View style={styles.buttonView}>
          <MainButton
            onPress={() => {
              navigation.goBack();
            }}
            style={styles.button}
          >
            Set
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

  title: {
    fontFamily: Fonts.main,
    textTransform: "capitalize",
    color: "#fff",
    fontSize: 19,
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

  note: {
    fontFamily: Fonts.main,
    color: "#fff",
  },

  inputView: {
    margin: "auto",
    width: "30%",
    marginTop: 50,
  },

  input: {
    backgroundColor: Color.bgColor,
    borderRadius: 8,
    color: "#fff",
    width: "screen",
    textAlign: "center",
  },

  pills: {
    textAlign: "center",
    marginTop: 5,
    fontFamily: Fonts.main,
    fontSize: 15,
    color: "#fff",
  },

  buttonView: {
    alignItems: "center",
  },

  button: {
    width: "90%",
  },
});
