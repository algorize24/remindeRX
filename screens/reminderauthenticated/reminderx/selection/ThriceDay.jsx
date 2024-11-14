import TimeSelector from "./TimeSelector";

export default function ThriceDay({ navigation, routeReview }) {
  return (
    <TimeSelector
      navigation={navigation}
      header={"When do you need to take the first dose?"}
      routeReview={true}
    />
  );
}
