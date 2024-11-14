import { Text, StyleSheet, Pressable } from "react-native";
import { useState } from "react";

// constants
import { Fonts } from "../../constants/Font";
import { Color } from "../../constants/Color";

// date & time picker expo
import DateTimePicker from "@react-native-community/datetimepicker";

// context
import { useReminder } from "../../context/reminderContext";

export default function TimePicker() {
  // time state
  const [time, setTime] = useState(new Date());
  const [show, setShow] = useState(false);

  // reminder context
  const { setReminderTime } = useReminder();

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || time;
    setShow(false);
    setTime(currentDate); // This date object includes both date and time
    setReminderTime(currentDate);
  };

  return (
    <>
      <Pressable onPress={() => setShow(true)}>
        <Text style={styles.selectTime}>Tap to set the reminder time</Text>
      </Pressable>
      <Text style={styles.selectedTime}>
        Selected Time: {time.toLocaleTimeString()}
      </Text>
      {/* <Text style={styles.selectedTime}>Date: {time.toDateString()}</Text> */}

      {show && (
        <DateTimePicker
          value={time}
          mode="time"
          is24Hour={false}
          display="default"
          onChange={onChange}
        />
      )}
    </>
  );
}

const styles = StyleSheet.create({
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
});
