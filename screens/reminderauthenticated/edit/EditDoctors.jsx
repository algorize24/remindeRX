import {
  View,
  Text,
  StyleSheet,
  Image,
  Alert,
  ActivityIndicator,
} from "react-native";
import { useState } from "react";

// constants
import { Color } from "../../../constants/Color";
import { Fonts } from "../../../constants/Font";

// components
import InputText from "../../../components/header/InputText";
import TextInputs from "../../../components/Inputs/TextInputs";
import MainButton from "../../../components/buttons/MainButton";
import Button from "../../../components/buttons/Button";

// axios
import axios from "axios";

export default function EditDoctors({ navigation, route }) {
  // this data is from ListDoctor.jsx
  const id = route.params.doctorId;
  const initialName = route.params.name;
  const initialSpecialty = route.params.specialty;
  const initialEmail = route.params.email;
  const initialNumber = route.params.number;
  const initialAddress = route.params.address;

  // state to add a doctor
  const [name, setName] = useState(initialName);
  const [specialty, setSpecialty] = useState(initialSpecialty);
  const [email, setEmail] = useState(initialEmail);
  const [number, setNumber] = useState(initialNumber.toString());
  const [address, setAddress] = useState(initialAddress);

  // loading state
  const [isLoading, setIsLoading] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(false);

  // error state
  const [error, setError] = useState("");

  // edit fn
  const handleEditDoctor = async () => {
    setIsLoading(true);

    try {
      // request to the backend
      await axios.patch(`http://10.0.2.2:5000/api/doctor/${id}`, {
        // these are the data i want to edit
        doctor_name: name,
        specialty,
        email,
        mobile_number: number,
        address,
      });

      // show alert message
      Alert.alert(
        "Doctor's Updated",
        `Dr.${name} details were updated successfully.`
      );

      // after go to..
      navigation.navigate("Doctor");
    } catch (error) {
      // if there's an error
      setError(
        `Failed to update Dr.${name} details. Please try again later.`,
        error
      );
    } finally {
      setIsLoading(false);
    }
  };

  // delete fn
  const handleDeleteDoctor = async () => {
    // show confirmation dialog
    Alert.alert(
      `Delete Dr.${name}`,
      "Are you sure you want to delete this doctor details? This action cannot be undone.",
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
            setDeleteLoading(true);

            try {
              // request to the backend
              await axios.delete(`http://10.0.2.2:5000/api/doctor/${id}`);

              // show an alert message after deleting
              Alert.alert(
                "Doctor's Deleted",
                `Dr.${name} details was deleted successfully`
              );

              // go to this screen
              navigation.navigate("Doctor");
            } catch (error) {
              // if there's an error
              setError(
                `Failed to delete the Dr.${name} details. Please try again later.`,
                error
              );
            } finally {
              setDeleteLoading(false);
            }
          },
        },
      ],
      { cancelable: true }
    );
  };

  return (
    <View style={styles.root}>
      <View style={styles.inputContainer}>
        <View style={styles.doctorView}>
          <View>
            <Image
              style={styles.img}
              source={require("../../../assets/others/user-avatar.png")}
            />
          </View>

          <View style={styles.dataView}>
            <Text style={styles.name}>{name}</Text>
            <Text style={styles.specialty}>{specialty}</Text>
          </View>
        </View>
        <InputText style={styles.input}>Name:</InputText>
        <TextInputs
          style={styles.inputText}
          placeholder={"Doctor's Name"}
          value={name}
          onChangeText={setName}
          placeholderTextColor={"#fff"}
        />

        <InputText style={styles.input}>Specialty:</InputText>
        <TextInputs
          style={styles.inputText}
          placeholder={"e.g., neurologist "}
          value={specialty}
          onChangeText={setSpecialty}
          placeholderTextColor={"#fff"}
        />

        <InputText style={styles.input}>Email Address:</InputText>
        <TextInputs
          style={styles.inputText}
          placeholder={"Doctor's email"}
          value={email}
          onChangeText={setEmail}
          keyboardType={"email-address"}
          placeholderTextColor={"#fff"}
        />

        <InputText style={styles.input}>Phone Number:</InputText>
        <TextInputs
          style={styles.inputText}
          placeholder={"Doctor's number"}
          value={number}
          onChangeText={setNumber}
          keyboardType={"numeric"}
          maxLength={11}
          placeholderTextColor={"#fff"}
        />

        <InputText style={styles.input}>Address:</InputText>
        <TextInputs
          style={styles.inputText}
          placeholder={"Hospital address "}
          value={address}
          onChangeText={setAddress}
          placeholderTextColor={"#fff"}
        />
        {error ? <Text style={styles.errorText}>{error}</Text> : null}
      </View>

      <View style={styles.buttonView}>
        {!isLoading ? (
          <MainButton onPress={handleEditDoctor} style={styles.editButton}>
            Edit Doctor
          </MainButton>
        ) : (
          <Button style={styles.editButton}>
            <ActivityIndicator color={"#fff"} />
          </Button>
        )}

        {!deleteLoading ? (
          <MainButton onPress={handleDeleteDoctor} style={styles.deleteButton}>
            Delete Doctor
          </MainButton>
        ) : (
          <Button style={styles.deleteButton}>
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

  inputText: {
    backgroundColor: Color.container,
    borderRadius: 8,
    paddingHorizontal: 15,
    marginBottom: 10,
    color: "#fff",
  },

  input: {
    color: Color.tagLine,
  },

  errorText: {
    color: Color.redColor,
    fontFamily: Fonts.main,
    fontSize: 13,
    marginVertical: 10,
  },

  buttonView: {
    marginBottom: 50,
  },

  deleteButton: {
    marginBottom: 10,
    backgroundColor: Color.redColor,
  },

  editButton: {
    marginBottom: 20,
    backgroundColor: Color.greenColor,
  },

  doctorView: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 30,
  },

  dataView: {
    marginLeft: 10,
  },

  img: {
    width: 50,
    height: 50,
    borderRadius: 50,
    borderWidth: 2,
    borderColor: "#fff",
    alignItems: "center",
  },

  name: {
    fontFamily: Fonts.main,
    color: "#fff",
    textTransform: "capitalize",
  },

  specialty: {
    fontFamily: Fonts.main,
    color: Color.tagLine,
    textTransform: "capitalize",
  },
});
