import StatsListItem from "./StatsListItem";

const PercentageItem = (props: { value: number }) => {
  const percentageRemaining = `${props.value} %`;

  return <StatsListItem label="Percentage" value={percentageRemaining} />;
};

export default PercentageItem;
