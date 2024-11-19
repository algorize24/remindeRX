import { View, StyleSheet, FlatList, ActivityIndicator } from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import { useState, useCallback } from "react";

// constants
import { Color } from "../../constants/Color";
import { Fonts } from "../../constants/Font";

// component
import CalendarList from "../../components/dashboard/CalendarList";
import MainButton from "../../components/buttons/MainButton";
import ReminderContainer from "../../components/dashboard/ReminderContainer";
import IsEmpty from "../../components/dashboard/isEmpty";

// axios
import axios from "axios";

// auth context
import { useAuth } from "../../context/authContext";

// firebase
import { auth } from "../../firebase/firebase";

export default function ReminderScreen({ navigation }) {
  // context
  const { user } = useAuth();

  // state for displaying reminder
  const [displayReminder, setDisplayReminder] = useState([]);

  // loading and error state
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchReminder = async () => {
    setIsLoading(true);

    try {
      // check if the currentUser
      const currentUser = auth.currentUser;

      // if there's a currentUser
      if (currentUser) {
        // get the token
        const token = await currentUser.getIdToken();

        // request to backend
        const response = await axios.get("http://10.0.2.2:5000/api/reminder", {
          // send the token to backend for verification
          headers: { Authorization: `Bearer ${token}` },
        });

        // Flatten the reminders and ensure the correct mapping of time and dosage
        const flattenedReminders = response.data.reminder
          .flatMap((reminder) => {
            // Check if dosage is a nested array and flatten it
            const dosageArray = Array.isArray(reminder.dosage)
              ? reminder.dosage.flat() // Flatten the nested array if needed
              : []; // If not an array, use an empty array

            return dosageArray.map((dose, index) => ({
              time: new Date(reminder.times[index]), // Correctly map time to dosage
              medicineName: reminder.medicineName,
              dosage: dose.dosage, // Access the correct dosage value
            }));
          })
          .sort((a, b) => a.time - b.time); // Sort by time ascending

        setDisplayReminder(flattenedReminders);
      }
    } catch (error) {
      console.log(error);
      setError("An unexpected error occurred. Please try again later.");
    } finally {
      setIsLoading(false);
    }
  };

  // auto re-fetch
  useFocusEffect(
    useCallback(() => {
      fetchReminder();
    }, [user])
  );

  return (
    <View style={styles.root}>
      <View style={styles.container}>
        <CalendarList />

        {error ? (
          <Text style={styles.errorText}>{error}</Text>
        ) : isLoading ? (
          <ActivityIndicator size={"large"} color={Color.purpleColor} />
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
          />
        ) : (
          <View style={styles.empty}>
            <IsEmpty />
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

  textLength: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    fontFamily: Fonts.main,
    textAlign: "center",
    color: Color.tagLine,
  },

  empty: {
    flex: 1,
    justifyContent: "center",
  },
});
