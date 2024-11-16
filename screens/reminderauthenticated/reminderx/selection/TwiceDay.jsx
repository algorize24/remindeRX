import { useState } from "react";
import TimeSelector from "./TimeSelector";
import { useReminder } from "../../../../context/reminderContext";

export default function TwiceDay({ navigation }) {
  const [doseStep, setDoseStep] = useState(1);
  const { setFrequency } = useReminder();

  const handleNextDose = () => {
    if (doseStep === 1) {
      setDoseStep(2);
    } else {
      // Set frequency to "twice" when selecting two doses
      setFrequency("Twice a day");
      navigation.navigate("SetReminder");
    }
  };

  return (
    <TimeSelector
      navigation={navigation}
      header={`When do you need to take the ${
        doseStep === 1 ? "first" : "second"
      } dose?`}
      onNext={handleNextDose}
    />
  );
}
