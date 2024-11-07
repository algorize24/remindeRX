import {
  View,
  Text,
  StyleSheet,
  TextInput,
  FlatList,
  ActivityIndicator,
} from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import { useState, useCallback } from "react";

// constant
import { Color } from "../../constants/Color";
import { Fonts } from "../../constants/Font";

// components
import TextScreen from "../../components/header/TextScreen";
import ListContact from "../../components/desc/ListContact";
import Label from "../../components/dashboard/Label";

// axios
import axios from "axios";

// auth context
import { useAuth } from "../../context/authContext";

export default function ContactScreen({ navigation }) {
  // context
  const { user } = useAuth();

  // state for displaying contact
  const [displayContact, setDisplayContact] = useState(null);
  const [isLoading, setIsLoading] = useState(false); // loading state

  // search state
  const [searchContact, setSearchContact] = useState([]);
  const [search, setSearch] = useState("");

  // display contact
  const fetchContact = async () => {
    if (user) {
      try {
        setIsLoading(true);
        const response = await axios.get("http://10.0.2.2:5000/api/contact");
        setDisplayContact(response.data.contacts);
        setSearchContact(response.data.contacts);
      } catch (error) {
        console.log("Error fetching contact list", error);
      } finally {
        setIsLoading(false);
      }
    } else {
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
      <View style={styles.textContainer}>
        <TextScreen>Contact Information</TextScreen>
      </View>

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
        {isLoading ? (
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
          <Text style={styles.noContactsMessage}>No contacts found</Text> // Show message if no results found
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

  textContainer: {
    marginTop: 20,
  },

  textInput: {
    backgroundColor: Color.container,
    borderColor: Color.tagLine,
    marginTop: 30,
    borderRadius: 12,
    paddingHorizontal: 20,
    paddingVertical: 10,
    color: Color.tagLine,
  },

  dataContainer: {
    marginTop: 54,
    flex: 1,
    marginBottom: 20,
  },

  noContactsMessage: {
    textAlign: "center",
    color: Color.tagLine,
    fontFamily: Fonts.main,
    fontSize: 14,
  },
});
