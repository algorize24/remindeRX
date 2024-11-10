import { View, Text, Image, StyleSheet, Pressable, Modal } from "react-native";
import { useState } from "react";

// constants
import { Color } from "../../constants/Color";
import { Fonts } from "../../constants/Font";

import { Ionicons } from "@expo/vector-icons"; // Install if needed for icons
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";

export default function ReminderContainer({ itemData }) {
  // this data is from ReminderScreen.jsx
  const { image, medicine_name, pills, time } = itemData;

  // state for modal visibility
  const [modalVisible, setModalVisible] = useState(false);
  return (
    <View style={styles.root}>
      <Text style={styles.time}>{time}</Text>

      {/* container section */}
      <Pressable
        onPress={() => setModalVisible(true)}
        style={styles.mainContainer}
      >
        <View style={styles.container}>
          <View>
            <Image style={styles.img} source={image} />
          </View>
          <View style={styles.textContainer}>
            <Text style={styles.medName}>{medicine_name}</Text>
            <Text style={styles.description}>
              Take {pills} Pill(s) of {medicine_name}.
            </Text>
          </View>
        </View>
      </Pressable>

      {/* modal section */}
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
              <Image style={styles.img} source={image} />
              <Text style={styles.modalTitle}>{medicine_name}</Text>
            </View>

            <View style={styles.infoContainer}>
              <MaterialIcons name="schedule" size={24} color="#fff" />
              <Text style={styles.modalTime}>Scheduled for {time}, today</Text>
            </View>

            <View style={styles.infoContainer}>
              <MaterialCommunityIcons name="pill" size={24} color="#fff" />
              <Text style={styles.modalDescription}>Take {pills} pill(s)</Text>
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
    marginBottom: 5,
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
  },

  description: {
    fontFamily: Fonts.main,
    color: Color.tagLine,
    fontSize: 12,
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
