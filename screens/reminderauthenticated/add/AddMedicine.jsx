import {
  View,
  StyleSheet,
  ScrollView,
  Alert,
  Pressable,
  Text,
} from "react-native";
import { useState } from "react";

// constants
import { Color } from "../../../constants/Color";
import { Fonts } from "../../../constants/Font";

// components
import UploadImage from "../../../components/buttons/UploadImage";
import MainButton from "../../../components/buttons/MainButton";
import TextScreen from "../../../components/header/TextScreen";
import TextInputs from "../../../components/Inputs/TextInputs";
import InputText from "../../../components/header/InputText";
import Button from "../../../components/buttons/Button";

// date & time picker expo
import DateTimePicker from "@react-native-community/datetimepicker";

// axios
import axios from "axios";

// firebase
import { auth } from "../../../firebase/firebase";

export default function AddMedicine({ navigation }) {
  // states to add a inventory
  const [medicineName, setMedicineName] = useState("");
  const [dosage, setDosage] = useState("");
  const [expirationDate, setExpirationDate] = useState("");
  const [stock, setStock] = useState("");
  const [image, setImage] = useState("");

  const [showDatePicker, setShowDatePicker] = useState(false); // showDatePicker state
  const [isLoading, setIsLoading] = useState(false); // loading state
  const [error, setError] = useState(""); // error state

  const handleAddMedicine = async () => {
    setIsLoading(true);

    try {
      // get the currentUser
      const currentUser = auth.currentUser;

      // if there's a currentUser
      if (currentUser) {
        // get the token
        const token = await currentUser.getIdToken();

        // check if inputs are empty
        if (!medicineName || !dosage || !expirationDate || !stock) {
          setError("Please complete all fields. Thank you!");
          return;
        }

        // create an object to send to database
        const inventoryData = {
          medicine_name: medicineName,
          dosage,
          expiration_date: expirationDate.toISOString(),
          stock,
          image: image || "",
        };

        // request to the backend together with object we created
        const response = await axios.post(
          "http://10.0.2.2:5000/api/inventory/createinventory",
          inventoryData,
          {
            headers: {
              // send the token to backend for verification
              Authorization: `Bearer ${token}`,
            },
          }
        );

        // if successfully created
        if (response.status === 201) {
          Alert.alert(
            "Inventory Created",
            "New inventory created successfully"
          );

          // clear the input fields
          setMedicineName("");
          setDosage("");
          setExpirationDate("");
          setStock("");
          setImage("");

          // after that, go to this screen.
          navigation.navigate("Inventory");
        }
      }
    } catch (error) {
      setError("Failed to create an inventory.", error);
    } finally {
      setIsLoading(false);
    }
  };

  // show and update the date
  const handleDateChange = (event, selectedDate) => {
    setShowDatePicker(false); // Hide the picker once a date is selected
    if (selectedDate) {
      setExpirationDate(selectedDate); // Update the expiration date
    }
  };

  return (
    <View style={styles.root}>
      <ScrollView overScrollMode="never" bounces={false}>
        <View style={styles.textContainer}>
          <TextScreen>Add Medicine</TextScreen>
        </View>

        <View style={styles.inputContainer}>
          <InputText>Medicine Name:</InputText>
          <TextInputs
            style={styles.textInput}
            placeholder={"Enter Medicine Name"}
            value={medicineName}
            onChangeText={setMedicineName}
          />

          <InputText>Dosage:</InputText>
          <TextInputs
            inputMode={"numeric"}
            keyboardType={"numeric"}
            style={styles.textInput}
            placeholder={"Enter Dosage"}
            maxLength={3}
            value={dosage}
            onChangeText={setDosage}
          />

          <InputText>Quantity:</InputText>
          <TextInputs
            inputMode={"numeric"}
            keyboardType={"numeric"}
            style={styles.textInput}
            placeholder={"Enter Quantity "}
            maxLength={3}
            value={stock}
            onChangeText={setStock}
          />

          <InputText>Expiration Date:</InputText>
          <Pressable
            style={[styles.textInput, styles.selectExpirationDate]}
            onPress={() => setShowDatePicker(true)}
          >
            <Text style={styles.textSelect}>Tap to Select a Date</Text>
          </Pressable>
          {expirationDate && (
            <TextInputs
              style={[styles.selectedDate, styles.textInput]}
              editable={false}
              placeholder={`Selected Date: ${expirationDate.toDateString()}`}
              placeholderTextColor={Color.purpleColor}
            />
          )}

          {showDatePicker && (
            <DateTimePicker
              value={expirationDate || new Date()} // Default to current date if none selected
              mode="date"
              display="default"
              onChange={handleDateChange}
            />
          )}

          <InputText>Image:</InputText>

          <UploadImage />

          {error ? <Text style={styles.errorText}>{error}</Text> : null}
        </View>
      </ScrollView>

      {!isLoading ? (
        <MainButton onPress={handleAddMedicine} style={styles.button}>
          Add Medicine
        </MainButton>
      ) : (
        <Button style={styles.button}>Adding Medicine...</Button>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    paddingHorizontal: 18,
  },

  textContainer: {
    marginTop: 49,
    alignItems: "flex-start",
  },

  inputContainer: {
    marginTop: 20,
  },

  textInput: {
    backgroundColor: Color.container,
    borderRadius: 8,
    paddingHorizontal: 15,
    marginBottom: 10,
  },

  button: {
    position: "absolute",
    marginBottom: 10,
    bottom: 10,
    left: 10,
    right: 10,
  },

  selectExpirationDate: {
    padding: 10,
  },

  textSelect: {
    fontFamily: Fonts.main,
    color: Color.tagLine,
  },

  selectedDate: {
    opacity: 0.7,
  },

  textDate: {
    color: Color.purpleColor,
  },

  errorText: {
    color: Color.redColor,
    fontFamily: Fonts.main,
    fontSize: 13,
    marginVertical: 10,
  },
});
