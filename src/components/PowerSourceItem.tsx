import StatsListItem from "./StatsListItem";

const PowerSourceItem = (props: { isCharging: boolean; adapter?: any }) => {
  const adapterName = props.adapter ? props.adapter["Name"] : "";
  const adapterSerial = props.adapter ? props.adapter["SerialString"] : "";
  const formatted = props.isCharging === true ? `${adapterName} (${adapterSerial})` : "Battery";
  return <StatsListItem label="Power Source" value={formatted} />;
};

export default PowerSourceItem;
