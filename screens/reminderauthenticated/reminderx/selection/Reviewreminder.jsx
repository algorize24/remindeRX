import { View, Text, StyleSheet, Pressable, ScrollView } from "react-native";
import { useLayoutEffect, useState } from "react";

// constants
import { Color } from "../../../../constants/Color";
import { Fonts } from "../../../../constants/Font";

// component
import MainButton from "../../../../components/buttons/MainButton";
import AuthText from "../../../../components/header/AuthText";

// context
import { useReminder } from "../../../../context/reminderContext";

// icon
import MaterialIcons from "@expo/vector-icons/MaterialIcons";

// date & time picker expo
import DateTimePicker from "@react-native-community/datetimepicker";

export default function Reviewreminder({ navigation }) {
  // reminderContext
  const { medicationName } = useReminder();

  // time state
  const [time, setTime] = useState(new Date());
  const [show, setShow] = useState(false);

  // time fn
  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || time;
    setShow(false);
    setTime(currentDate); // This date object includes both date and time
  };

  // avoid flickering the headerTitle
  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: () => (
        <Text style={styles.title}>{medicationName && medicationName}</Text>
      ),
    });
  }, [navigation, medicationName]);

  return (
    <View style={styles.root}>
      <AuthText style={styles.text}>Review your planned reminders</AuthText>

      <View style={styles.container}>
        <ScrollView
          overScrollMode="never"
          bounces={false}
          style={styles.subContainer}
          showsVerticalScrollIndicator={false}
        >
          <Text style={styles.textDose}>1st dose</Text>
          <View style={styles.dataContainer}>
            <View style={styles.infoContainer}>
              <Text style={styles.infoText}>Take</Text>
              <Text style={styles.infoText}>1 Pill(s)</Text>
              <Pressable
                onPress={() => {
                  navigation.navigate("EditPills");
                }}
              >
                <MaterialIcons name="edit" size={18} color={Color.tagLine} />
              </Pressable>
            </View>

            <View style={styles.timeSelection}>
              <Text style={styles.selectedTime}>
                Selected Time: {time.toLocaleTimeString()}
              </Text>

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

          <Text style={styles.textDose}>2nd dose</Text>
          <View style={styles.dataContainer}>
            <View style={styles.infoContainer}>
              <Text style={styles.infoText}>Take</Text>
              <Text style={styles.infoText}>1 Pill(s)</Text>
              <Pressable
                onPress={() => {
                  navigation.navigate("EditPills");
                }}
              >
                <MaterialIcons name="edit" size={18} color={Color.tagLine} />
              </Pressable>
            </View>

            <View style={styles.timeSelection}>
              <Pressable onPress={() => setShow(true)}>
                <Text style={styles.selectTime}>
                  Tap to set the reminder time
                </Text>
              </Pressable>
              <Text style={styles.selectedTime}>
                Selected Time: {time.toLocaleTimeString()}
              </Text>

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

          <Text style={styles.textDose}>3rd dose</Text>
          <View style={styles.dataContainer}>
            <View style={styles.infoContainer}>
              <Text style={styles.infoText}>Take</Text>
              <Text style={styles.infoText}>1 Pill(s)</Text>
              <Pressable
                onPress={() => {
                  navigation.navigate("EditPills");
                }}
              >
                <MaterialIcons name="edit" size={18} color={Color.tagLine} />
              </Pressable>
            </View>

            <View style={styles.timeSelection}>
              <Pressable onPress={() => setShow(true)}>
                <Text style={styles.selectTime}>
                  Tap to set the reminder time
                </Text>
              </Pressable>
              <Text style={styles.selectedTime}>
                Selected Time: {time.toLocaleTimeString()}
              </Text>

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
        </ScrollView>

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

  dataContainer: {
    backgroundColor: Color.textInput,
    marginTop: 10,
    marginBottom: 20,
    borderRadius: 8,
  },

  infoContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: Color.purpleColor,
    padding: 10,
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
  },

  infoText: {
    fontFamily: Fonts.main,
    color: "#fff",
  },

  textDose: {
    fontFamily: Fonts.main,
    color: Color.tagLine,
    fontSize: 16,
  },

  selectTime: {
    backgroundColor: Color.container,
    fontFamily: Fonts.main,
    textAlign: "center",
    width: "80%",
    padding: 10,
    margin: "auto",
    marginTop: 20,
    color: "#fff",
    borderRadius: 4,
  },

  selectedTime: {
    fontFamily: Fonts.main,
    color: "#fff",
    marginVertical: 25,
    textAlign: "center",
  },

  buttonView: {
    alignItems: "center",
  },

  button: {
    width: "90%",
  },
});
