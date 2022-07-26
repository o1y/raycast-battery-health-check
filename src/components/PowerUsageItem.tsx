import StatsListItem from "./StatsListItem";

const PowerUsageItem = (props: { voltage: number; amperage: number }) => {
  const power = +((props.voltage / 1000) * (props.amperage / 1000)).toFixed(2);
  const powerUsage = props.amperage && props.voltage ? `${power} W (${props.amperage} mA)` : "--";

  return <StatsListItem label="Power Usage" value={powerUsage} />;
};

export default PowerUsageItem;
