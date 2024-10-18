import { StyleSheet, ScrollView } from "react-native";

// components
import TitlePolicy from "../../components/header/TitlePolicy";
import WelcomePolicy from "../../components/header/WelcomePolicy";
import ListTermOfUse from "../../components/desc/ListTermOfUse";

export default function TermOfUse() {
  return (
    <ScrollView
      alwaysBounceVertical={false}
      overScrollMode="never"
      style={styles.root}
    >
      <TitlePolicy text={"Term of Use"} date={"October 2024"} bounce={false} />

      <WelcomePolicy
        welcome={
          'Welcome to RemindeRx: A Smart Medicine Storage and Wearable Fall Detection System with Mobile App Integration for Enhanced Health Management. Please read these Terms of Use ("Terms") carefully before using our services. By using the RemindeRx mobile app, website, or any related products or services, you agree to comply with and be bound by the following Terms. If you do not agree with these Terms, please do not use our Service.'
        }
      />

      <ListTermOfUse />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  root: {
    marginVertical: 50,
    paddingHorizontal: 14,
  },
});
