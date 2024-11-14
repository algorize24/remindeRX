import { View, Text, StyleSheet, Pressable, ScrollView } from "react-native";
import { useLayoutEffect, useState } from "react";

// constants
import { Color } from "../../../../constants/Color";
import { Fonts } from "../../../../constants/Font";

// component
import MainButton from "../../../../components/buttons/MainButton";
import AuthText from "../../../../components/header/AuthText";
import TextInputs from "../../../../components/Inputs/TextInputs";

// context
import { useReminder } from "../../../../context/reminderContext";

// icon
import MaterialIcons from "@expo/vector-icons/MaterialIcons";

// date & time picker expo
import DateTimePicker from "@react-native-community/datetimepicker";

export default function SetInterval({ navigation }) {
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
      <AuthText style={styles.text}>Set hours interval</AuthText>
      <View style={styles.container}>
        <View style={styles.subContainer}>
          <Text style={styles.header}>Every</Text>
          <View style={styles.inputView}>
            <TextInputs
              style={styles.input}
              maxLength={2}
              keyboardType="numeric"
            />
          </View>
          <Text style={styles.header}>Hours</Text>
        </View>

        <View style={styles.buttonView}>
          <MainButton
            onPress={() => {
              navigation.navigate("EveryX");
            }}
            style={styles.button}
          >
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

  title: {
    fontFamily: Fonts.main,
    textTransform: "capitalize",
    color: "#fff",
    fontSize: 19,
  },

  header: {
    fontFamily: Fonts.main,
    color: "#fff",
    fontSize: 18,
    textAlign: "center",
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

  input: {
    backgroundColor: Color.bgColor,
    borderRadius: 8,
    color: "#fff",
    width: "screen",
    textAlign: "center",
  },

  inputView: {
    margin: "auto",
    width: "30%",
    marginVertical: 10,
  },

  buttonView: {
    alignItems: "center",
  },

  button: {
    width: "90%",
  },
});
