import {
  Text,
  SafeAreaView,
  StyleSheet,
  Image,
  StatusBar,
  Platform,
  View,
  ActivityIndicator,
} from "react-native";

import { useState } from "react";

// components
import FeatureText from "../../components/header/FeatureText";
import MainButton from "../../components/buttons/MainButton";
import TextPolicy from "../../components/header/TextPolicy";

// constants
import { Fonts } from "../../constants/Font";
import { Color } from "../../constants/Color";

export default function ReminderFallDetectScreen({ navigation }) {
  // track image loading
  const [imageLoading, setImageLoading] = useState(true);

  const handleNext = () => {
    navigation.navigate("MedicineReminder");
  };

  return (
    <SafeAreaView style={styles.root}>
      <FeatureText style={styles.featureText} />

      <View>
        {imageLoading && <ActivityIndicator color={Color.purpleColor} />}

        <Image
          style={styles.img}
          source={require("../../assets/feature/falldetection.png")}
          onLoadStart={() => setImageLoading(true)}
          onLoadEnd={() => setImageLoading(false)}
        />

        <TextPolicy style={styles.textPolicy}>
          Fall Detection System for Enhanced Safety
        </TextPolicy>

        <Text style={styles.mainText}>
          Our <Text style={styles.rxText}>fall detection system</Text>{" "}
          continuosly monitors for suddent movements or impacts, alerting user
          in case of a fall. Designed to ensure timely assistance, it offers
          peace of mind for the elderly and individuals at risk.
        </Text>

        <MainButton onPress={handleNext} style={styles.mainButton}>
          Next
        </MainButton>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
    paddingHorizontal: 10,
    justifyContent: "center",
  },

  featureText: {
    marginBottom: 10,
  },

  img: {
    width: "screen",
    height: 220,
  },

  textPolicy: {
    fontSize: 28,
    marginTop: 10,
    paddingHorizontal: 10,
  },

  mainText: {
    paddingHorizontal: 10,
    fontFamily: Fonts.sub,
    fontSize: 16,
    color: Color.tagLine,
  },
  rxText: {
    color: Color.purpleColor,
    fontWeight: "bold",
  },

  mainButton: {
    paddingHorizontal: 10,
    justifyContent: "flex-end",
    marginTop: 88,
  },
});
