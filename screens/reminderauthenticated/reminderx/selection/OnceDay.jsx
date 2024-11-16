import TimeSelector from "./TimeSelector";

import { useEffect } from "react";

import { useReminder } from "../../../../context/reminderContext";

export default function OnceDay({ navigation }) {
  const { setFrequency } = useReminder();

  const handleNext = () => {
    // Set frequency to "once" when selecting one dose
    setFrequency("Once a day");
    navigation.navigate("SetReminder");
  };

  return (
    <TimeSelector
      navigation={navigation}
      header="When do you need to take your medicine?"
      onNext={handleNext}
    />
  );
}
