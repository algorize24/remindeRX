import { View, Text, StyleSheet, Pressable } from "react-native";
import { useLayoutEffect, useState } from "react";

// constants
import { Color } from "../../../../constants/Color";
import { Fonts } from "../../../../constants/Font";

// component
import AuthText from "../../../../components/header/AuthText";

// context
import { useReminder } from "../../../../context/reminderContext";

// date & time picker expo
import DateTimePicker from "@react-native-community/datetimepicker";

// icon
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import MainButton from "../../../../components/buttons/MainButton";

export default function Week({ navigation }) {
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

  const [time, setTime] = useState(new Date());
  const [show, setShow] = useState(false);

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || time;
    setShow(false);
    setTime(currentDate); // This date object includes both date and time
  };

  return (
    <View style={styles.root}>
      <AuthText style={styles.text}>
        When do you need to take the dose?
      </AuthText>

      <View style={styles.container}>
        <View style={styles.subContainer}>
          <View style={styles.containerHeader}>
            <Text style={styles.textContainer}>Take</Text>
            <Text style={styles.textContainer}>1 Pill(s)</Text>
            <Pressable
              onPress={() => {
                navigation.navigate("EditPills");
              }}
            >
              <MaterialIcons name="edit" size={18} color={Color.tagLine} />
            </Pressable>
          </View>

          <View style={styles.timeContainer}>
            <Pressable onPress={() => setShow(true)}>
              <Text style={styles.selectTime}>
                Tap to set the reminder time
              </Text>
            </Pressable>
            <Text style={styles.selectedTime}>
              Selected Time: {time.toLocaleTimeString()}
            </Text>
            <Text style={styles.selectedTime}>Date: {time.toDateString()}</Text>

            {show && (
              <DateTimePicker
                value={time}
                mode="time"
                is24Hour={false}
                display="default"
                onChange={onChange}
              />
            )}
          </View>
        </View>

        <View style={styles.buttonView}>
          <MainButton
            onPress={() => {
              navigation.navigate("SetReminder");
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

  press: {
    opacity: 0.7,
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
    flex: 1,
    marginTop: 30,
    marginHorizontal: 30,
  },

  containerHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  textContainer: {
    fontFamily: Fonts.main,
    color: Color.tagLine,
    fontSize: 16,
  },

  selectTime: {
    fontSize: 16,
    color: "#fff",
    fontFamily: Fonts.main,
    backgroundColor: Color.textInput,
    padding: 10,
    borderRadius: 6,
    marginBottom: 25,
  },

  selectedTime: {
    fontFamily: Fonts.main,
    color: "#fff",
  },

  timeContainer: {
    alignItems: "center",
    marginVertical: "auto",
    padding: 20,
  },

  buttonView: {
    alignItems: "center",
  },

  button: {
    width: "90%",
  },
});
