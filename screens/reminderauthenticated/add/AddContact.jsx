import { View, StyleSheet, Alert, Text, ActivityIndicator } from "react-native";
import { useState } from "react";

import { Color } from "../../../constants/Color";
import { Fonts } from "../../../constants/Font";

// navigation.navigate("Contact");

// components
import MainButton from "../../../components/buttons/MainButton";
import TextInputs from "../../../components/Inputs/TextInputs";
import TextScreen from "../../../components/header/TextScreen";
import InputText from "../../../components/header/InputText";
import Button from "../../../components/buttons/Button";

// axios
import axios from "axios";

// firebase
import { auth } from "../../../firebase/firebase";

export default function AddContact({ navigation }) {
  // state to add a contact
  const [name, setName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");

  const [isLoading, setIsLoading] = useState(false); // loading state for main button
  const [error, setError] = useState(""); // error state

  // function to create a contact
  const handleAddContact = async () => {
    // set the loading to true
    setIsLoading(true);

    try {
      // get the currentUser
      const currentUser = auth.currentUser;

      // if currentUser
      if (currentUser) {
        // get the token to pass in the backend
        const token = await currentUser.getIdToken();

        if (!name || !phoneNumber) {
          setError("Please complete all fields. Thank you!");
          return;
        }

        // contactData structure this is what we send in backend
        const contactData = {
          name,
          phone_number: phoneNumber,
        };

        // post request to this api
        const response = await axios.post(
          "http://10.0.2.2:5000/api/contact/createcontact",
          contactData,
          {
            headers: {
              Authorization: `Bearer ${token}`, // header authorization to create a contact
            },
          }
        );

        // handle successful response
        if (response.status === 201) {
          Alert.alert("Contact Created", "New contact created successfully!");

          // reset the form
          setName("");
          setPhoneNumber("");

          // go to...
          navigation.navigate("Contact");
        }
      }
    } catch (error) {
      setError("An error occurred. Please try again later.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <View style={styles.root}>
      <View style={styles.inputContainer}>
        <View style={styles.textContainer}>
          <TextScreen>Add Contact</TextScreen>
        </View>
        <InputText style={styles.input}>Name:</InputText>
        <TextInputs
          style={styles.textInput}
          placeholder={"Enter Name"}
          value={name}
          onChangeText={setName}
          placeholderTextColor={"#fff"}
        />
        <InputText style={styles.input}>Number:</InputText>
        <TextInputs
          style={styles.textInput}
          placeholder="Enter Number"
          value={phoneNumber}
          onChangeText={setPhoneNumber}
          keyboardType="numeric"
          maxLength={11}
          placeholderTextColor={"#fff"}
        />
        {error ? <Text style={styles.errorText}>{error}</Text> : null}
      </View>

      <View>
        {!isLoading ? (
          <MainButton onPress={handleAddContact} style={styles.button}>
            Add Contact
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
    marginBottom: 20,
    alignItems: "flex-start",
  },

  inputContainer: {
    marginTop: 49,
  },

  input: {
    color: Color.tagLine,
  },

  textInput: {
    backgroundColor: Color.container,
    borderRadius: 8,
    paddingHorizontal: 15,
    marginBottom: 10,
    color: "#fff",
  },

  button: {
    marginBottom: 20,
  },

  errorText: {
    color: Color.redColor,
    fontFamily: Fonts.main,
    fontSize: 13,
    marginVertical: 10,
  },
});
