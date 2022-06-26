import { List } from "@raycast/api";
import { StatsItem } from "../types";

const StatsListItem = (props: { stats: StatsItem }) => {
  const value = `${props.stats.value} ${props.stats.unit ? props.stats.unit : ""}`;
  return props.stats ? <List.Item title={props.stats.title} subtitle={value} /> : null;
};

export default StatsListItem;
