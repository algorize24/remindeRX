import { View, StyleSheet, FlatList, ActivityIndicator } from "react-native";
import { useState, useCallback } from "react";
import { useFocusEffect } from "@react-navigation/native";

// empty image
import EmptyImage from "../../assets/others/inventoryempty.png";

// constant
import { Color } from "../../constants/Color";

// components
import ListInventory from "../../components/desc/ListInventory";
import Label from "../../components/dashboard/Label";
import ErrorComponent from "../../components/dashboard/ErrorComponent";
import IsEmpty from "../../components/dashboard/isEmpty";

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

  // display inventory by certain user
  const fetchInventory = async () => {
    setIsLoading(true);

    try {
      // check if the currentUser
      const currentUser = auth.currentUser;

      // if there's a currentUser
      if (currentUser) {
        // get the token
        const token = await currentUser.getIdToken();

        // request to backend
        const response = await axios.get("http://10.0.2.2:5000/api/inventory", {
          headers: {
            // send the token to backend for verification
            Authorization: `Bearer ${token}`,
          },
        });

        // get the response.data
        setDisplayInventory(response.data.inventory);
      }
    } catch (error) {
      setError("An unexpected error occurred. Please try again later.", error);
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
          Lists of Medicine
        </Label>

        {error ? (
          <View style={styles.error}>
            <ErrorComponent message={error} />
          </View>
        ) : isLoading ? (
          <ActivityIndicator size={"large"} color={Color.purpleColor} />
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
