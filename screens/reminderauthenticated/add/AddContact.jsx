import { View, StyleSheet, Alert } from "react-native";
import { useState } from "react";

import { Color } from "../../../constants/Color";
import { Fonts } from "../../../constants/Font";

// navigation.navigate("Contact");

// components
import UploadImage from "../../../components/buttons/UploadImage";
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
  const [image, setImage] = useState("");

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

        // contactData structure this is what we send in backend
        const contactData = {
          name,
          phone_number: phoneNumber,
          image: image || "",
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
          Alert.alert("Success", "Contact created successfully!");

          // reset the form
          setName("");
          setPhoneNumber("");
          setImage("");

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
      <View style={styles.textContainer}>
        <TextScreen>Add Contact</TextScreen>
      </View>

      <View style={styles.inputContainer}>
        <InputText>Name:</InputText>
        <TextInputs
          style={styles.textInput}
          placeholder={"Enter Name"}
          value={name}
          onChangeText={setName}
        />
        <InputText>Number:</InputText>
        <TextInputs
          style={styles.textInput}
          placeholder="Enter Number"
          value={phoneNumber}
          onChangeText={setPhoneNumber}
          keyboardType="numeric"
          maxLength={11}
        />
        <InputText>Image:</InputText>
        <UploadImage />
      </View>
      {error ? <Text style={styles.errorText}>{error}</Text> : null}

      {!isLoading ? (
        <MainButton onPress={handleAddContact} style={styles.button}>
          Add Contact
        </MainButton>
      ) : (
        <Button style={styles.button}>Adding Contact...</Button>
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
    marginTop: 60,
  },

  errorText: {
    color: Color.redColor,
    fontFamily: Fonts.main,
    fontSize: 13,
    marginVertical: 10,
  },
});
