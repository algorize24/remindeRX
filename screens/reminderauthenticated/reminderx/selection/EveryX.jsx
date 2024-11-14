import TimeSelector from "./TimeSelector";
export default function EveryX({ navigation, routeReview }) {
  return (
    <TimeSelector
      navigation={navigation}
      header={"When do you need to take the dose?"}
      routeReview={true}
    />
  );
}
