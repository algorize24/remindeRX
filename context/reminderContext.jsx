import { createContext, useContext, useEffect, useState } from "react";

// -- context section --

// create a context
const ReminderContext = createContext();

export const useReminder = () => useContext(ReminderContext);

// main component
export default function ReminderContextProvider({ children }) {
  const [medicationName, setMedicationName] = useState("");

  value = {
    medicationName,
    setMedicationName,
  };
  return (
    <ReminderContext.Provider value={value}>
      {children}
    </ReminderContext.Provider>
  );
}
