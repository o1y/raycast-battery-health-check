import { MenuBarExtra } from "@raycast/api";

const PowerUsageMenuItem = (props: { amperage: number; currentCapacity: number; maxCapacity: number }) => {
  return (
    (props.amperage && props.currentCapacity && props.maxCapacity && (
      <MenuBarExtra.Item title={`${props.currentCapacity} mAh / ${props.maxCapacity} mAh (${props.amperage} mA)`} />
    )) || <></>
  );
};

export default PowerUsageMenuItem;
