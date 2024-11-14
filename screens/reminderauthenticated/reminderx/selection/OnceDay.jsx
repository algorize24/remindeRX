import TimeSelector from "./TimeSelector";

import { useEffect } from "react";

import { useReminder } from "../../../../context/reminderContext";

export default function OnceDay({ navigation }) {
  const { frequency, specificDays } = useReminder();

  useEffect(() => {
    if (frequency) {
      console.log("Reminder frequency is set to: ", frequency);
    } else if (specificDays.length) {
      console.log("Reminder is set for specific days: ", specificDays);
    }
  }, [frequency, specificDays]);
  return (
    <TimeSelector
      navigation={navigation}
      header={"When do you need to take the dose?"}
    />
  );
}
