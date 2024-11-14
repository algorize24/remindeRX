import TimeSelector from "./TimeSelector";

export default function TwiceDay({ navigation }) {
  return (
    <TimeSelector
      navigation={navigation}
      header={"When do you need to take the first dose?"}
    />
  );
}
