import {
  View,
  StyleSheet,
  TextInput,
  FlatList,
  ActivityIndicator,
} from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import { useState, useCallback } from "react";

// image
import EmptyImage from "../../assets/others/contactempty.png";

// constant
import { Color } from "../../constants/Color";

// components
import ErrorComponent from "../../components/dashboard/ErrorComponent";
import ListContact from "../../components/desc/ListContact";
import Label from "../../components/dashboard/Label";
import IsEmpty from "../../components/dashboard/isEmpty";

// axios
import axios from "axios";

// auth context
import { useAuth } from "../../context/authContext";

// firebase
import { auth } from "../../firebase/firebase";

export default function ContactScreen({ navigation }) {
  // context
  const { user } = useAuth();

  // state for displaying contact
  const [displayContact, setDisplayContact] = useState(null);
  const [isLoading, setIsLoading] = useState(false); // loading state

  // search state
  const [searchContact, setSearchContact] = useState([]);
  const [search, setSearch] = useState("");

  // error state
  const [error, setError] = useState("");

  // display contact by certain user
  const fetchContact = async () => {
    setIsLoading(true);

    // get the currentUser
    try {
      const currentUser = auth.currentUser;

      if (currentUser) {
        const token = await currentUser.getIdToken(); // get the token

        // send a request to the backend
        const response = await axios.get("http://10.0.2.2:5000/api/contact", {
          headers: {
            Authorization: `Bearer ${token}`, // pass the firebase token to verify.
          },
        });

        setDisplayContact(response.data.contacts);
        setSearchContact(response.data.contacts);
      }
    } catch (error) {
      setError("An unexpected error occurred. Please try again later.", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSearch = (query) => {
    setSearch(query); // update the search query state
    if (query === "") {
      setSearchContact(displayContact); // if the search is empty, show all contacts
    } else {
      const filtered = displayContact.filter(
        (contact) => contact.name.toLowerCase().includes(query.toLowerCase()) // case-insensitive filter
      );
      setSearchContact(filtered);
    }
  };

  useFocusEffect(
    useCallback(() => {
      fetchContact(); // Refetch contact list when the screen is focused
    }, [user])
  );

  return (
    <View style={styles.root}>
      <TextInput
        style={styles.textInput}
        placeholder="Search Contact..."
        placeholderTextColor={Color.tagLine}
        value={search}
        onChangeText={handleSearch}
      />

      <View style={styles.dataContainer}>
        <Label
          onPress={() => {
            navigation.navigate("AddContact");
          }}
        >
          All Contact
        </Label>

        {error ? (
          <View style={styles.error}>
            <ErrorComponent message={error} />
          </View>
        ) : isLoading ? (
          <ActivityIndicator size={"large"} color={Color.purpleColor} />
        ) : searchContact.length > 0 ? (
          <FlatList
            overScrollMode="never"
            bounces={false}
            data={searchContact} // display filtered contacts
            keyExtractor={(item) => item._id.toString()}
            renderItem={({ item }) => <ListContact itemData={item} />}
          />
        ) : (
          <View style={styles.isEmpty}>
            <IsEmpty
              image={EmptyImage}
              message={"You haven’t added any contact yet"}
            />
          </View>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: Color.bgColor,
    paddingHorizontal: 18,
  },

  textInput: {
    backgroundColor: Color.container,
    borderColor: Color.tagLine,
    marginTop: 54,
    borderRadius: 12,
    paddingHorizontal: 20,
    paddingVertical: 10,
    color: Color.tagLine,
  },

  dataContainer: {
    marginTop: 40,
    flex: 1,
    marginBottom: 20,
  },

  isEmpty: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },

  error: {
    flex: 1,
    justifyContent: "center",
  },
});
