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
      const currentUser = auth.currentUser;

      if (currentUser) {
        const token = await currentUser.getIdToken();

        // Ensure dosage values are numbers and time is standardized
        const correctedDosages = dosages.map((dosage) => ({
          time: new Date(dosage.time).toISOString(),
          dosage: Number(dosage.dosage), // Convert string to number
        }));

        // Ensure specificDays is properly formatted
        const correctedSpecificDays = Array.isArray(specificDays)
          ? specificDays
          : [specificDays];

        // Use the `time` from the `dosage` array for `times`
        const reminderData = {
          medicineName: medicationName,
          frequency: frequency || "Once a day",
          specificDays: correctedSpecificDays, // Pass as an array
          dosage: correctedDosages,
          times: correctedDosages.map((d) => d.time), // Derive `times` from `dosage`
        };

        console.log("Reminder Data:", reminderData);

        const response = await axios.post(
          "http://10.0.2.2:5000/api/reminder/createreminder",
          reminderData,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (response.status === 201) {
          Alert.alert("Reminder Created", "New reminder created successfully");
          clearFields();
          navigation.navigate("EventSchedule");
        }
      }
    } catch (error) {
      console.log("Error creating reminder:", error);
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
