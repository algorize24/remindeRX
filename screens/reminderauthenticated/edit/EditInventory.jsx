import {
  View,
  StyleSheet,
  ScrollView,
  Text,
  Alert,
  Pressable,
  ActivityIndicator,
} from "react-native";
import { useState } from "react";

// constants
import { Color } from "../../../constants/Color";
import { Fonts } from "../../../constants/Font";

// components
import MainButton from "../../../components/buttons/MainButton";
import TextScreen from "../../../components/header/TextScreen";
import TextInputs from "../../../components/Inputs/TextInputs";
import InputText from "../../../components/header/InputText";
import Button from "../../../components/buttons/Button";

// date & time picker expo
import DateTimePicker from "@react-native-community/datetimepicker";

// axios
import axios from "axios";

export default function EditInventory({ navigation, route }) {
  // this data is from ListInventory.jsx
  const _id = route.params.medicineId;
  const initialMedicineName = route.params.medicine;
  const initialDosage = route.params.dosage;
  const initialExpirationDate = route.params.expiration_date;
  const initialStock = route.params.stock;

  // state to edit
  const [medicineName, setMedicineName] = useState(initialMedicineName);
  const [dosage, setDosage] = useState(initialDosage.toString());
  const [expirationDate, setExpirationDate] = useState(
    initialExpirationDate ? new Date(initialExpirationDate) : null
  );
  const [stock, setStock] = useState(initialStock.toString());

  // loading state
  const [isInventoryLoading, setIsInventoryLoading] = useState(false);
  const [isDeletingLoading, setIsDeletingLoading] = useState(false);

  const [error, setError] = useState(""); // error state
  const [showDatePicker, setShowDatePicker] = useState(false); // showDatePicker state

  // edit inventory fn
  const handleEditInventory = async () => {
    setIsInventoryLoading(true);

    try {
      // request to the backend
      await axios.patch(`http://10.0.2.2:5000/api/inventory/${_id}`, {
        // these are the data i want to edit
        medicine_name: medicineName,
        dosage,
        expiration_date: expirationDate.toISOString(),
        stock,
      });

      // show alert message
      Alert.alert(
        "Inventory Updated",
        `The ${medicineName} inventory details were updated successfully`
      );
      // after, go to..
      navigation.navigate("Inventory");
    } catch (error) {
      // if there's an error
      setError(
        `Failed to update ${medicineName} inventory. Please try again later.`,
        error
      );
    } finally {
      setIsInventoryLoading(false);
    }
  };

  // delete inventory fn
  const handleDeleteInventory = () => {
    // show confirmation dialog
    Alert.alert(
      `Delete ${medicineName}`,
      "Are you sure you want to delete this medicine? This action cannot be undone.",
      [
        {
          // cancel
          text: "Cancel",
          style: "cancel",
        },
        {
          // yes
          text: "Yes",
          onPress: async () => {
            setIsDeletingLoading(true);

            try {
              // request to the backend
              await axios.delete(`http://10.0.2.2:5000/api/inventory/${_id}`);

              // show an alert message after deleting
              Alert.alert(
                "Inventory Deleted",
                `The ${medicineName} inventory was deleted successfully`
              );

              // go to this screen
              navigation.navigate("Inventory");
            } catch (error) {
              // if there's an error
              setError(
                `Failed to delete the ${medicineName} inventory. Please try again later.`,
                error
              );
            } finally {
              setIsDeletingLoading(false);
            }
          },
        },
      ],
      { cancelable: true }
    );
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
        <View>
          <View style={styles.textContainer}>
            <TextScreen style={styles.textScreen}>
              # <Text style={styles.name}>{medicineName || ""}</Text>
            </TextScreen>
          </View>

          <View style={styles.inputContainer}>
            <InputText style={styles.input}>Medicine Name:</InputText>
            <TextInputs
              style={styles.textInput}
              placeholder={"Medicine Name"}
              value={medicineName}
              onChangeText={setMedicineName}
            />

            <InputText style={styles.input}>Dosage:</InputText>
            <TextInputs
              inputMode={"numeric"}
              keyboardType={"numeric"}
              style={styles.textInput}
              placeholder={"Dosage"}
              maxLength={3}
              value={dosage}
              onChangeText={setDosage}
            />

            <InputText style={styles.input}>Quantity:</InputText>
            <TextInputs
              inputMode={"numeric"}
              keyboardType={"numeric"}
              style={styles.textInput}
              placeholder={"Stock"}
              maxLength={3}
              value={stock}
              onChangeText={setStock}
            />

            <InputText style={styles.input}>Expiration Date:</InputText>
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
                placeholderTextColor={Color.tagLine}
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
          </View>

          {error ? <Text style={styles.errorText}>{error}</Text> : null}
        </View>
      </ScrollView>

      <View>
        {!isInventoryLoading ? (
          <MainButton onPress={handleEditInventory} style={styles.editButton}>
            Edit Medicine
          </MainButton>
        ) : (
          <Button style={styles.editButton}>
            <ActivityIndicator color={"#fff"} />
          </Button>
        )}

        {!isDeletingLoading ? (
          <MainButton onPress={handleDeleteInventory} style={styles.button}>
            Delete Medicine
          </MainButton>
        ) : (
          <Button style={styles.button}>
            <ActivityIndicator color={"#fff"} />
          </Button>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    paddingHorizontal: 18,
    justifyContent: "space-between",
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
    color: "#fff",
  },

  input: {
    color: Color.tagLine,
  },

  button: {
    marginBottom: 20,
    backgroundColor: Color.redColor,
  },

  editButton: {
    marginBottom: 10,
    backgroundColor: Color.greenColor,
  },

  name: {
    color: Color.greenColor,
  },

  textScreen: {
    color: Color.tagLine,
  },

  selectedDate: {
    opacity: 0.7,
  },

  textSelect: {
    fontFamily: Fonts.main,
    color: "#fff",
  },

  selectExpirationDate: {
    padding: 10,
  },

  errorText: {
    color: Color.redColor,
    fontFamily: Fonts.main,
    fontSize: 13,
    marginVertical: 10,
  },
});
