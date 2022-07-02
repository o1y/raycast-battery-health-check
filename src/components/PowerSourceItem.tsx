import StatsListItem from "./StatsListItem";

const PowerSourceItem = (props: { isCharging: boolean; adapter?: any }) => {
  const adapterName = props.adapter ? props.adapter["Name"] : "";
  const adapterSerial = props.adapter ? props.adapter["SerialString"] : "";
  const adapterLabel = adapterName && adapterSerial ? `${adapterName} (${adapterSerial})` : "Power Adapter";
  const powerSource = props.isCharging === true ? adapterLabel : "Battery";

  const formatted = props.isCharging !== undefined ? `${powerSource}` : "--";
  return <StatsListItem label="Power Source" value={formatted} />;
};

export default PowerSourceItem;
