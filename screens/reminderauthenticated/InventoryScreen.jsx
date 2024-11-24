import {
  View,
  StyleSheet,
  FlatList,
  ActivityIndicator,
  Text,
  ScrollView,
} from "react-native";
import { useState, useCallback } from "react";
import { useFocusEffect } from "@react-navigation/native";

// empty image
import EmptyImage from "../../assets/others/inventoryempty.png";

// constant
import { Color } from "../../constants/Color";
import { Fonts } from "../../constants/Font";

// components
import ListInventory from "../../components/desc/ListInventory";
import Label from "../../components/dashboard/Label";
import ErrorComponent from "../../components/dashboard/ErrorComponent";
import IsEmpty from "../../components/dashboard/isEmpty";
import SortingContainer from "../../components/inventory/SortingContainer";
import LoadingInventory from "../../components/loading/LoadingInventory";

// axios
import axios from "axios";

// auth context
import { useAuth } from "../../context/authContext";

// firebase
import { auth } from "../../firebase/firebase";

export default function InventoryScreen({ navigation }) {
  // context
  const { user } = useAuth();

  // state for displaying inventory
  const [displayInventory, setDisplayInventory] = useState([]);

  // loading state
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(""); // error state

  // track the current sort
  const [sortCriteria, setSortCriteria] = useState("default");

  // handle sort change
  const handleSortChange = (newCriteria) => {
    setSortCriteria(newCriteria); // Update the state for future reference
    fetchInventory(newCriteria); // Pass the new criteria directly
  };

  // display inventory by certain user
  const fetchInventory = async (criteria = sortCriteria) => {
    setIsLoading(true);

    try {
      const currentUser = auth.currentUser;

      if (currentUser) {
        const token = await currentUser.getIdToken();

        const response = await axios.get("http://10.0.2.2:5000/api/inventory", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        let inventoryData = response.data.inventory;

        // Apply sorting based on the provided criteria
        if (criteria === "ascend") {
          inventoryData.sort((a, b) =>
            a.medicine_name.localeCompare(b.medicine_name)
          );
        } else if (criteria === "descend") {
          inventoryData.sort((a, b) =>
            b.medicine_name.localeCompare(a.medicine_name)
          );
        } else if (criteria === "expDate") {
          inventoryData.sort(
            (a, b) => new Date(a.expiration_date) - new Date(b.expiration_date)
          );
        }

        setDisplayInventory(inventoryData);
      }
    } catch (error) {
      setError("An unexpected error occurred. Please try again later.");
    } finally {
      setIsLoading(false);
    }
  };

  // auto re-fetch
  useFocusEffect(
    useCallback(() => {
      fetchInventory();
    }, [user])
  );

  return (
    <View style={styles.root}>
      <View style={styles.dataContainer}>
        <Label
          onPress={() => {
            navigation.navigate("AddMedicine");
          }}
        >
          Medicine Inventory
        </Label>

        <SortingContainer onSortChange={handleSortChange} />

        {error ? (
          <View style={styles.error}>
            <ErrorComponent message={error} />
          </View>
        ) : isLoading ? (
          <LoadingInventory />
        ) : displayInventory && displayInventory.length > 0 ? (
          <FlatList
            overScrollMode="never"
            bounces={false}
            data={displayInventory}
            keyExtractor={(item) => item._id.toString()}
            renderItem={({ item }) => <ListInventory itemData={item} />}
            numColumns={1}
            key={1}
          />
        ) : (
          <View style={styles.isEmpty}>
            <IsEmpty
              image={EmptyImage}
              message={"You haven’t added any medicine yet"}
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

  dataContainer: {
    marginTop: 54,
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
