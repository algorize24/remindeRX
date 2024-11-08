import { View, StyleSheet, Text } from "react-native";
import { useState, useEffect } from "react";

// constants
import { Color } from "../../../constants/Color";
import { Fonts } from "../../../constants/Font";

// components
import UploadImage from "../../../components/buttons/UploadImage";
import MainButton from "../../../components/buttons/MainButton";
import TextInputs from "../../../components/Inputs/TextInputs";
import InputText from "../../../components/header/InputText";
import AuthText from "../../../components/header/AuthText";
import Button from "../../../components/buttons/Button";

// axios
import axios from "axios";

// context
import { useAuth } from "../../../context/authContext";

export default function EditProfile({ navigation }) {
  // user state
  const [userInfo, setUserInfo] = useState(null);
  const [userLoading, setUserLoading] = useState(null);

  // editing state
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");

  const [error, setError] = useState(""); // error state

  // context
  const { user } = useAuth();

  // main loading state
  const [isLoading, setIsLoading] = useState(false);

  // fetch the user from mongo database
  useEffect(() => {
    const fetchUser = async () => {
      // identify who user is logged in.
      if (user) {
        try {
          const response = await axios.get(
            `http://10.0.2.2:5000/api/user/${user.email}`
          );
          setUserInfo(response.data);
        } catch (error) {
          console.log("Error fetching user info", error);
        } finally {
          setUserLoading(false);
        }
      } else {
        setUserLoading(false);
      }
    };

    fetchUser();
  }, [user]);

  // edit the name, address, image
  const handleEditProfile = async () => {
    setIsLoading(true);

    // Only include fields that have values to avoid overwriting
    const updatedData = {};
    if (name) updatedData.name = name;
    if (address) updatedData.address = address;

    try {
      // send the updated data to the backend
      await axios.patch(
        `http://10.0.2.2:5000/api/user/${userInfo._id}`,
        updatedData
      );

      // on success, navigate back to the profile screen
      navigation.navigate("Profile");
    } catch (error) {
      console.error("Error updating profile", error);
      setError("Error updating your profile. Please try again later.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <View style={styles.root}>
      <View style={styles.container}>
        <AuthText>Edit Profile</AuthText>
        <View style={styles.inputContainer}>
          <InputText>Email Address:</InputText>
          <TextInputs
            style={[styles.inputs, styles.email]}
            value={userInfo ? userInfo.email : "Email Address"}
            editable={false}
          />

          <InputText>Name:</InputText>
          <TextInputs
            style={styles.inputs}
            placeholder={userInfo ? userInfo.name : "Name"}
            value={name}
            onChangeText={(text) => setName(text)}
          />
          <InputText>Address:</InputText>

          <TextInputs
            style={styles.inputs}
            placeholder={userInfo ? userInfo.address : "Address"}
            value={address}
            onChangeText={(text) => setAddress(text)}
          />

          <InputText>Profile Image:</InputText>

          <UploadImage />
        </View>
        {error ? <Text style={styles.errorText}>{error}</Text> : null}

        {!isLoading ? (
          <MainButton onPress={handleEditProfile}>Edit Profile</MainButton>
        ) : (
          <Button>Editing Profile</Button>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    paddingHorizontal: 18,
  },

  container: {
    marginTop: 20,
  },

  inputContainer: {
    marginTop: 20,
    marginBottom: 15,
  },

  inputs: {
    backgroundColor: Color.container,
    borderRadius: 8,
    paddingHorizontal: 15,
    marginBottom: 20,
  },

  email: {
    opacity: 0.5,
  },

  errorText: {
    color: Color.redColor,
    fontFamily: Fonts.main,
    fontSize: 13,
    marginBottom: 40,
  },
});
