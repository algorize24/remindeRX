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
import TextPolicy from "../../components/header/TextPolicy";
import MainButton from "../../components/buttons/MainButton";

// constants
import { Fonts } from "../../constants/Font";
import { Color } from "../../constants/Color";

export default function ReminderMedScreen({ navigation }) {
  // track image loading
  const [imageLoading, setImageLoading] = useState(true);

  // invoke in mainbutton
  const handleNext = () => {
    navigation.navigate("");
  };
  return (
    <SafeAreaView style={styles.root}>
      <FeatureText style={styles.featureText} />
      <View>
        {imageLoading && <ActivityIndicator color={Color.purpleColor} />}

        <Image
          style={styles.img}
          source={require("../../assets/feature/reminder.png")}
          onLoadStart={() => setImageLoading(true)}
          onLoadEnd={() => setImageLoading(false)}
        />

        <TextPolicy style={styles.textPolicy}>
          Smart Medication Reminder System
        </TextPolicy>

        <Text style={styles.mainText}>
          Stay on track with timely <Text style={styles.rxText}>reminders</Text>{" "}
          for your medications, ensuring you never miss a dose and manage your
          health with ease.
        </Text>

        <MainButton onPress={handleNext} style={styles.mainButton}>
          Get Started
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
