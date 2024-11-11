import { View, Text, StyleSheet, Image } from "react-native";
import { useLayoutEffect } from "react";

// context
import { useReminder } from "../../../../context/reminderContext";

// constants
import { Fonts } from "../../../../constants/Font";
import { Color } from "../../../../constants/Color";

// components
import AuthText from "../../../../components/header/AuthText";
import MainButton from "../../../../components/buttons/MainButton";

export default function SetReminder({ navigation }) {
  // reminderContext
  const { medicationName } = useReminder();

  // avoid flickering the headerTitle
  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: () => (
        <Text style={styles.title}>{medicationName && medicationName}</Text>
      ),
    });
  }, [navigation, medicationName]);

  // fn for mainbutton
  const handleAddReminder = async () => {
    navigation.navigate("EventSchedule");
  };
  return (
    <View style={styles.root}>
      <AuthText style={styles.text}>
        Your medication <Text style={styles.rx}>reminder</Text> is ready to go.
      </AuthText>

      <Image
        style={styles.img}
        source={require("../../../../assets/others/successful.png")}
      />

      <View style={styles.buttonView}>
        <MainButton onPress={handleAddReminder} style={styles.button}>
          Add Reminder
        </MainButton>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },

  title: {
    fontFamily: Fonts.main,
    textTransform: "capitalize",
    color: "#fff",
    fontSize: 19,
  },

  text: {
    textTransform: "none",
    marginHorizontal: 18,
    marginTop: 50,
    fontSize: 20,
    width: 320,
  },

  img: {
    width: 380,
    height: 320,
    borderWidth: 2,
    marginVertical: 50,
    margin: "auto",
  },

  rx: {
    color: Color.purpleColor,
  },
  buttonView: {
    alignItems: "center",
  },
  button: {
    width: "90%",
  },
});
