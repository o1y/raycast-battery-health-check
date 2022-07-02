import StatsListItem from "./StatsListItem";

const PowerSourceItem = (props: { isCharging: boolean; adapter?: any }) => {
  const adapterName = props.adapter ? props.adapter["Name"] : "";
  const adapterSerial = props.adapter ? props.adapter["SerialString"] : "";
  const adapterLabel = adapterName && adapterSerial ? `${adapterName} (${adapterSerial})` : "Power Adapter";

  const formatted = props.isCharging === true ? `${adapterLabel}` : "Battery";
  return <StatsListItem label="Power Source" value={formatted} />;
};

export default PowerSourceItem;
