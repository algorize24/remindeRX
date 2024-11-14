import { View, Text, StyleSheet, Alert } from "react-native";
import { useState } from "react";

// constants
import { Color } from "../../../constants/Color";
import { Fonts } from "../../../constants/Font";

// components
import InputText from "../../../components/header/InputText";
import TextInputs from "../../../components/Inputs/TextInputs";
import MainButton from "../../../components/buttons/MainButton";
import Button from "../../../components/buttons/Button";

// firebase
import { auth } from "../../../firebase/firebase";

// axios
import axios from "axios";

export default function AddDoctor({ navigation }) {
  // state to add a doctor
  const [name, setName] = useState("");
  const [specialty, setSpecialty] = useState("");
  const [email, setEmail] = useState("");
  const [number, setNumber] = useState("");
  const [address, setAddress] = useState("");

  const [isLoading, setIsLoading] = useState(false); // loading state
  const [error, setError] = useState(""); // error state

  // fn to add doctor
  const handleAddDoctor = async () => {
    setIsLoading(true);

    try {
      // get the currentUser
      const currentUser = auth.currentUser;

      // if there's a currentUser
      if (currentUser) {
        // get the token
        const token = await currentUser.getIdToken();

        // check if inputs are empty
        if (!name || !specialty || !email || !number || !address) {
          setError("Please complete all fields. Thank you!");
          return;
        }

        // create an object to send to database
        const doctorData = {
          doctor_name: name,
          specialty,
          email,
          mobile_number: number,
          address,
        };

        // request to the backend together with object we created
        const response = await axios.post(
          "http://10.0.2.2:5000/api/doctor/createdoctor",
          doctorData,
          {
            headers: {
              // send the token to backend for verification
              Authorization: `Bearer ${token}`,
            },
          }
        );

        // if successfully created
        if (response.status === 201) {
          Alert.alert("Doctor Created", "New Doctor created successfully");

          // clear the input fields
          setName("");
          setSpecialty("");
          setEmail("");
          setNumber("");
          setAddress("");

          // after that, go to this screen.
          navigation.navigate("Doctor");
        }
      }
    } catch (error) {
      setError("Failed to create a Doctor.", error);
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <View style={styles.root}>
      <View style={styles.inputContainer}>
        <InputText>Name:</InputText>
        <TextInputs
          style={styles.inputText}
          placeholder={"Doctor's Name"}
          value={name}
          onChangeText={setName}
        />

        <InputText>Specialty:</InputText>
        <TextInputs
          style={styles.inputText}
          placeholder={"e.g., neurologist "}
          value={specialty}
          onChangeText={setSpecialty}
        />

        <InputText>Email Address:</InputText>
        <TextInputs
          style={styles.inputText}
          placeholder={"Doctor's email"}
          value={email}
          onChangeText={setEmail}
          keyboardType={"email-address"}
        />

        <InputText>Phone Number:</InputText>
        <TextInputs
          style={styles.inputText}
          placeholder={"Doctor's number"}
          value={number}
          onChangeText={setNumber}
          keyboardType={"numeric"}
          maxLength={11}
        />

        <InputText>Address:</InputText>
        <TextInputs
          style={styles.inputText}
          placeholder={"Hospital address "}
          value={address}
          onChangeText={setAddress}
        />

        {error ? <Text style={styles.errorText}>{error}</Text> : null}
      </View>

      <View style={styles.buttonView}>
        {!isLoading ? (
          <MainButton onPress={handleAddDoctor} style={styles.button}>
            Add Doctor
          </MainButton>
        ) : (
          <Button style={styles.button}>Adding Doctor...</Button>
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

  inputContainer: {
    marginTop: 50,
  },

  inputText: {
    backgroundColor: Color.container,
    borderRadius: 8,
    paddingHorizontal: 15,
    marginBottom: 10,
  },

  buttonView: {
    marginBottom: 50,
  },

  errorText: {
    color: Color.redColor,
    fontFamily: Fonts.main,
    fontSize: 13,
    marginVertical: 10,
  },
});
