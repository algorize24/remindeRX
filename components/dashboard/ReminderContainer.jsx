import { View, Text, Image, StyleSheet, Pressable, Modal } from "react-native";
import { useState } from "react";

// constants
import { Color } from "../../constants/Color";
import { Fonts } from "../../constants/Font";

import { Ionicons } from "@expo/vector-icons"; // Install if needed for icons
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";

export default function ReminderContainer({ itemData }) {
  const { time, dosage, medicineName } = itemData;

  // Format the time for display
  const formattedTime = new Date(time).toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true, // 12-hour format with AM/PM
  });

  const [modalVisible, setModalVisible] = useState(false);

  // If dosage is a single number, convert it into an array
  const safeDosage = Array.isArray(dosage) ? dosage : [{ dosage }];

  return (
    <View style={styles.root}>
      <View style={styles.mapContainer}>
        <Text style={styles.time}>{formattedTime}</Text>
        <Pressable
          onPress={() => setModalVisible(true)}
          style={styles.mainContainer}
        >
          {/* Display medicine details */}
          <View style={styles.container}>
            <Image
              style={styles.img}
              source={require("../../assets/others/pill.png")}
            />
            <View style={styles.textContainer}>
              <Text style={styles.medName}>{medicineName}</Text>
              {safeDosage.map((item, index) => (
                <Text key={index} style={styles.description}>
                  Take {item.dosage} Pill(s) of {medicineName}.
                </Text>
              ))}
            </View>
          </View>
        </Pressable>
      </View>

      {/* Modal Section */}
      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Pressable
              style={styles.closeButton}
              onPress={() => setModalVisible(false)}
            >
              <Ionicons name="close" size={24} color="white" />
            </Pressable>

            <View style={styles.modalHeader}>
              <Image
                style={styles.img}
                source={require("../../assets/others/pill.png")}
              />
              <Text style={styles.modalTitle}>{medicineName}</Text>
            </View>

            <View style={styles.infoContainer}>
              <MaterialIcons name="schedule" size={24} color="#fff" />
              <Text style={styles.modalTime}>
                Scheduled for {formattedTime}, today
              </Text>
            </View>

            <View style={styles.infoContainer}>
              <MaterialCommunityIcons name="pill" size={24} color="#fff" />
              {safeDosage.map((item, index) => (
                <Text key={index} style={styles.modalDescription}>
                  Take {item.dosage} pill(s)
                </Text>
              ))}
            </View>

            <View style={styles.actionButtons}>
              <Text style={[styles.skipButton, styles.actionText]}>Skip</Text>
              <Text style={[styles.takeButton, styles.actionText]}>Take</Text>
              <Text style={[styles.deleteButton, styles.actionText]}>
                Delete
              </Text>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  mapContainer: {
    marginBottom: 13,
  },

  root: {
    flex: 1,
    marginVertical: 10,
  },

  mainContainer: {
    backgroundColor: Color.container,
    paddingVertical: 15,
    alignItems: "flex-start",
    borderRadius: 10,
  },

  time: {
    fontFamily: Fonts.main,
    fontSize: 18,
    color: "#fff",
    marginBottom: 10,
  },

  container: {
    flexDirection: "row",
    alignItems: "center",
    marginLeft: 20,
  },

  img: {
    width: 30,
    height: 30,
    borderRadius: 40,
  },

  textContainer: {
    marginLeft: 10,
  },

  medName: {
    fontFamily: Fonts.main,
    fontSize: 16,
    color: "#fff",
    textTransform: "capitalize",
  },

  description: {
    fontFamily: Fonts.main,
    color: Color.tagLine,
    fontSize: 12,
  },

  textDesc: {
    textTransform: "capitalize",
  },

  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    width: "90%",
    backgroundColor: Color.bgColor,
    borderRadius: 12,
    padding: 20,
    alignItems: "center",
  },
  closeButton: {
    alignSelf: "flex-start",
    marginBottom: 10,
  },
  modalHeader: {
    alignItems: "center",
  },
  modalTitle: {
    fontFamily: Fonts.main,
    fontSize: 20,
    color: "#fff",
    textAlign: "center",
    marginBottom: 30,
    textTransform: "capitalize",
  },

  infoContainer: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    marginVertical: 10,
  },

  modalTime: {
    color: Color.tagLine,
    fontFamily: Fonts.main,
    marginLeft: 10,
  },
  modalDescription: {
    color: Color.tagLine,
    fontFamily: Fonts.main,
    marginLeft: 10,
  },
  actionButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 30,
  },
  skipButton: {
    flex: 1,
    backgroundColor: Color.purpleColor,
    textAlign: "center",
    padding: 5,
    marginHorizontal: 3,
    borderRadius: 4,
  },

  takeButton: {
    flex: 1,
    backgroundColor: Color.greenColor,
    textAlign: "center",
    padding: 5,
    marginHorizontal: 3,
    borderRadius: 4,
  },

  deleteButton: {
    flex: 1,
    backgroundColor: Color.redColor,
    textAlign: "center",
    padding: 5,
    marginHorizontal: 3,
    borderRadius: 4,
  },

  actionText: {
    fontFamily: Fonts.main,
    color: "#fff",
  },
});
