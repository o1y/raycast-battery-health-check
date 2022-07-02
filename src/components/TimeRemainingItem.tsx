import StatsListItem from "./StatsListItem";

const TimeRemainingItem = (props: { value: number }) => {
  const hoursRemaining = Math.floor(props.value / 60);
  const minutesRemaining = (props.value % 60).toLocaleString("en-US", {
    minimumIntegerDigits: 2,
  });

  const timeRemaining = `${hoursRemaining}:${minutesRemaining}`;

  return <StatsListItem label="Time Remaining" value={timeRemaining} />;
};

export default TimeRemainingItem;
