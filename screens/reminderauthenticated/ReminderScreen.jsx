import { View, StyleSheet, FlatList, ActivityIndicator } from "react-native";

import { useFocusEffect } from "@react-navigation/native";
import { useState, useCallback } from "react";

// image empty
import EmptyImage from "../../assets/others/reminder.png";

// constants
import { Color } from "../../constants/Color";

// component
import CalendarList from "../../components/dashboard/CalendarList";
import MainButton from "../../components/buttons/MainButton";
import ReminderContainer from "../../components/dashboard/ReminderContainer";
import IsEmpty from "../../components/dashboard/isEmpty";
import ErrorComponent from "../../components/dashboard/ErrorComponent";
import LoadingReminder from "../../components/loading/LoadingReminder";

// axios
import axios from "axios";

// auth context
import { useAuth } from "../../context/authContext";

// firebase
import { auth } from "../../firebase/firebase";

// moment
import moment from "moment";

export default function ReminderScreen({ navigation }) {
  // context
  const { user } = useAuth();

  // state for displaying reminder
  const [displayReminder, setDisplayReminder] = useState([]);

  // loading and error state
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  // state to select a date in calendar
  const [selectedDate, setSelectedDate] = useState(
    moment().format("YYYY-MM-DD")
  );

  const fetchReminder = async () => {
    setIsLoading(true);

    try {
      const currentUser = auth.currentUser;

      if (currentUser) {
        const token = await currentUser.getIdToken();
        const response = await axios.get("http://10.0.2.2:5000/api/reminder", {
          headers: { Authorization: `Bearer ${token}` },
        });

        // Get the day of the week for the selected date (e.g., "Friday")
        const selectedDay = moment(selectedDate).format("dddd");

        // Filter reminders to only include those that match the selected day of the week
        const filteredReminders = response.data.reminder.filter((reminder) => {
          // If specificDays is empty, include the reminder
          if (reminder.specificDays.length === 0) {
            return true;
          }
          // Otherwise, include the reminder only if selectedDay is in specificDays
          return reminder.specificDays.includes(selectedDay);
        });

        // Map and sort filtered reminders
        const flattenedReminders = filteredReminders
          .flatMap((reminder) =>
            reminder.dosage.map((dose, index) => ({
              time: new Date(reminder.times[index]),
              medicineName: reminder.medicineName,
              dosage: dose.dosage,
            }))
          )
          .sort((a, b) => a.time - b.time); // Sort by time ascending

        setDisplayReminder(flattenedReminders);
      }
    } catch (error) {
      console.error(error);
      setError("An unexpected error occurred. Please try again later.");
    } finally {
      setIsLoading(false);
    }
  };

  // auto re-fetch
  useFocusEffect(
    useCallback(() => {
      fetchReminder();
    }, [user, selectedDate])
  );

  return (
    <View style={styles.root}>
      <View style={styles.container}>
        <CalendarList
          selectedDate={selectedDate}
          setSelectedDate={setSelectedDate}
        />

        {error ? (
          <View style={styles.error}>
            <ErrorComponent message={error} />
          </View>
        ) : isLoading ? (
          <LoadingReminder />
        ) : displayReminder && displayReminder.length > 0 ? (
          <FlatList
            alwaysBounceVertical={false}
            bounces={false}
            overScrollMode="never"
            data={displayReminder}
            keyExtractor={(item, index) =>
              `${item.time}-${item.medicineName}-${index}`
            }
            renderItem={({ item }) => <ReminderContainer itemData={item} />}
            showsVerticalScrollIndicator={false}
          />
        ) : (
          <View style={styles.empty}>
            <IsEmpty
              image={EmptyImage}
              message={"No upcoming reminders for today"}
            />
          </View>
        )}
      </View>

      <View>
        <MainButton
          onPress={() => navigation.navigate("AddReminder")}
          style={styles.button}
        >
          Add Reminder
        </MainButton>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: Color.bgColor,
    paddingHorizontal: 18,
    justifyContent: "space-between",
  },

  container: {
    flex: 1,
  },

  textContainer: {
    marginTop: 20,
  },

  dataContainer: {
    marginTop: 54,
    flex: 1,
    marginBottom: 20,
  },

  button: {
    marginVertical: 30,
  },

  empty: {
    flex: 1,
    justifyContent: "center",
  },

  error: {
    flex: 1,
    justifyContent: "center",
  },
});
