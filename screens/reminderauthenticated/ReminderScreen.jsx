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

  // fetch the data from database, display only by certain user
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

        // flatten and ensure proper date parsing. make sure all in reminder the time in each object is in ascending.
        const flattenedReminders = response.data.reminder
          .flatMap((reminder) =>
            reminder.times.map((time) => ({
              time: new Date(time), // ensure `time` is converted to a Date object
              medicineName: reminder.medicineName,
              dosage: reminder.dosage,
            }))
          )
          .sort((a, b) => a.time - b.time); // sort by time ascending

        setDisplayReminder(flattenedReminders);
      }
    } catch (error) {
      console.log(error);
      setError("An unexpected error occurred. Please try again later.", error);
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
            // keyExtractor={(item) => item._id.toString()}
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
