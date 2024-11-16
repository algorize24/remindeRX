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
    pillCount,
    reminderTime,
    frequency,
    specificDays,
    setMedicationName,
    setPillCount,
    setReminderTime,
    setFrequency,
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
    setPillCount(1);
    setReminderTime([]);
    setFrequency("");
    setSpecificDays([]);
  };

  const handleAddReminder = async () => {
    setIsLoading(true);

    try {
      // get the currentUser
      const currentUser = auth.currentUser;

      // if there's a currentUser
      if (currentUser) {
        // get the token
        const token = await currentUser.getIdToken();

        // Validate reminderTime before proceeding
        if (!Array.isArray(reminderTime) || reminderTime.length === 0) {
          Alert.alert("Error", "Please set at least one reminder time.");
          return;
        }

        // create an object to send to database
        const reminderData = {
          medicineName: medicationName, // Matches schema field
          frequency, // Matches enum values in schema
          specificDays, // Array of valid days or an empty array
          dosage: pillCount, // Numeric value >= 1
          times: (reminderTime || []).map((time) => time.toISOString()), // Convert to ISO format
        };

        console.log("Reminder Data:", reminderData);

        // request to the backend together with object we created
        const response = await axios.post(
          "http://10.0.2.2:5000/api/reminder/createreminder",
          reminderData,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        // if successfully created
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
      <AuthText style={styles.text}>
        Your medication <Text style={styles.rx}>reminder</Text> is ready to go.
      </AuthText>

      <Image
        style={styles.img}
        source={require("../../../../assets/others/successful.png")}
      />

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
  },

  title: {
    fontFamily: Fonts.main,
    textTransform: "capitalize",
    color: "#fff",
    fontSize: 19,
  },

  testText: {
    fontFamily: Fonts.main,
    color: "#fff",
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
