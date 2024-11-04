import { View, Text, Image, StyleSheet } from "react-native";
import { useEffect, useState } from "react";

// constant
import { Fonts } from "../../constants/Font";
import { Color } from "../../constants/Color";

// auth context
import { useAuth } from "../../context/authContext";

// axios
import axios from "axios";

export default function Userprofile() {
  // state for fetching user
  const { user } = useAuth();
  const [userInfo, setUserInfo] = useState(null);
  const [loading, setLoading] = useState(null);

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
          setLoading(false);
        }
      } else {
        setLoading(false);
      }
    };

    fetchUser();
  }, [user]);

  // get the email and password and set a fall back
  const displayName = userInfo ? userInfo.name : "null";
  const address = userInfo ? userInfo.address : "null";

  // loading state for user info...
  if (loading) {
    return <ActivityIndicator color={Color.purpleColor} />;
  }

  return (
    <View style={styles.userInfo}>
      {userInfo && userInfo.image && (
        <Image
          style={styles.img}
          source={{
            uri:
              userInfo.image || require("../../assets/others/user-avatar.png"),
          }}
        />
      )}
      <View style={styles.user}>
        <Text style={styles.email}>Hi! {displayName}</Text>
        <Text style={styles.address}>{address}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  userInfo: {
    marginTop: 24,
    flexDirection: "row",
    alignItems: "center",
  },

  img: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },

  user: {
    marginLeft: 10,
  },

  email: {
    fontFamily: Fonts.main,
    color: "#fff",
    fontSize: 18,
    textTransform: "capitalize",
  },

  address: {
    fontFamily: Fonts.main,
    color: Color.tagLine,
    fontSize: 13,
  },
});
