import { createContext, useContext, useEffect, useState } from "react";

// -- context section --

// create a context
const ReminderContext = createContext();

export const useReminder = () => useContext(ReminderContext);

// main component
export default function ReminderContextProvider({ children }) {
  // state for medication name
  const [medicationName, setMedicationName] = useState("");

  // dosage / pill count
  const [pillCount, setPillCount] = useState(1);

  // time picker
  const [reminderTime, setReminderTime] = useState([]);

  // track frequency for everyday
  const [frequency, setFrequency] = useState("");

  // track specific days for 'specificdays'
  const [specificDays, setSpecificDays] = useState([]);

  // Function to add or reset reminder time based on frequency
  const addReminderTime = (time) => {
    setReminderTime((prevTimes) => {
      if (frequency === "Once a day") {
        return [time]; // Replace with a single time for "Once a day"
      } else if (frequency === "Twice a day") {
        if (prevTimes.length === 0) {
          return [time]; // Add the first time
        } else if (prevTimes.length === 1) {
          return [...prevTimes, time]; // Add the second time
        } else {
          const updatedTimes = [...prevTimes];
          updatedTimes[1] = time; // Update the second dose time
          return updatedTimes;
        }
      }
      // Add additional frequency handling logic here if needed
      return prevTimes; // Default case, return the previous state
    });
  };

  // value pass to provider
  value = {
    medicationName,
    setMedicationName,
    pillCount,
    setPillCount,
    reminderTime,
    setReminderTime,
    frequency,
    setFrequency,
    specificDays,
    setSpecificDays,
    addReminderTime,
  };
  return (
    <ReminderContext.Provider value={value}>
      {children}
    </ReminderContext.Provider>
  );
}
