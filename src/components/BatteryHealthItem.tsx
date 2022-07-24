import StatsListItem from "./StatsListItem";

const BatteryHealthItem = (props: { health: number }) => {
  const health = props.health ? `${props.health}` : "--";

  return <StatsListItem label="Battery Health" value={health} />;
};

export default BatteryHealthItem;
