import {
  View,
  Text,
  StyleSheet,
  Image,
  ActivityIndicator,
  Alert,
} from "react-native";
import { useLayoutEffect, useState } from "react";

// context
import { useReminder } from "../../../../context/reminderContext";

// constants
import { Fonts } from "../../../../constants/Font";
import { Color } from "../../../../constants/Color";

// components
import AuthText from "../../../../components/header/AuthText";
import MainButton from "../../../../components/buttons/MainButton";
import Button from "../../../../components/buttons/Button";

// firebase
import { auth } from "../../../../firebase/firebase";

// axios
import axios from "axios";

export default function SetReminder({ navigation }) {
  // reminderContext
  const {
    medicationName,
    setMedicationName,
    dosages,
    setDosages,
    reminderTime,
    setReminderTime,
    frequency,
    setFrequency,
    specificDays,
    setSpecificDays,
  } = useReminder();

  const [isLoading, setIsLoading] = useState(false); // loading state

  // avoid flickering the headerTitle
  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: () => (
        <Text style={styles.title}>{medicationName && medicationName}</Text>
      ),
    });
  }, [navigation, medicationName]);

  // helper fn to clear fields
  const clearFields = () => {
    setMedicationName("");
    setDosages([]);
    setReminderTime([]);
    setFrequency("");
    setSpecificDays([]);
  };

  const handleAddReminder = async () => {
    if (reminderTime.length === 0) {
      Alert.alert("Error", "Please set a reminder time.");
      return;
    }

    setIsLoading(true);

    try {
      // Get the currentUser
      const currentUser = auth.currentUser;

      // If there's a currentUser
      if (currentUser) {
        // Get the token
        const token = await currentUser.getIdToken();

        // Ensure dosage values are numbers
        const correctedDosages = dosages.map((dosage) => ({
          time: dosage.time,
          dosage: Number(dosage.dosage), // Convert string to number
        }));

        // Create an object to send to the database
        const reminderData = {
          medicineName: medicationName,
          frequency,
          specificDays,
          dosage: correctedDosages, // Use the corrected dosages
          times: Array.isArray(reminderTime)
            ? reminderTime.map((time) => time.toISOString())
            : [], // Fallback to an empty array if reminderTime is not an array
        };

        console.log("Reminder Data:", reminderData);

        // Request to the backend with the created object
        const response = await axios.post(
          "http://10.0.2.2:5000/api/reminder/createreminder",
          reminderData,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        // If successfully created
        if (response.status === 201) {
          Alert.alert("Reminder Created", "New reminder created successfully");
          clearFields(); // Reset the fields
          navigation.navigate("EventSchedule");
        }
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <View style={styles.root}>
      <View style={styles.container}>
        <AuthText style={styles.text}>
          Your medication <Text style={styles.rx}>reminder</Text> is ready to
          go.
        </AuthText>

        <Image
          style={styles.img}
          source={require("../../../../assets/others/successful.png")}
        />
      </View>

      <View style={styles.buttonView}>
        {!isLoading ? (
          <MainButton onPress={handleAddReminder} style={styles.button}>
            Add Reminder
          </MainButton>
        ) : (
          <Button style={styles.button} isEnable={false}>
            <View style={styles.loadingView}>
              <Text style={styles.loadingText}> Adding Reminder</Text>
              <ActivityIndicator size={"small"} color={Color.purpleColor} />
            </View>
          </Button>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    justifyContent: "space-between",
  },

  container: {
    flex: 1,
    justifyContent: "center",
    // borderWidth: 2,
    marginVertical: 50,
  },

  title: {
    fontFamily: Fonts.main,
    textTransform: "capitalize",
    color: "#fff",
    fontSize: 14,
  },

  testText: {
    fontFamily: Fonts.main,
    color: "#fff",
  },

  text: {
    textTransform: "none",
    marginHorizontal: 18,
    // marginTop: 50,
    fontSize: 20,
    width: 320,
  },

  img: {
    width: 380,
    height: 320,
    borderWidth: 2,
    // marginVertical: 50,
    margin: "auto",
  },

  rx: {
    color: Color.purpleColor,
  },

  buttonView: {
    alignItems: "center",
    marginBottom: 20,
  },

  button: {
    width: "90%",
  },

  loadingView: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },

  loadingText: {
    marginRight: 5,
    color: "white",
    fontFamily: Fonts.main,
    fontSize: 16,
  },
});
