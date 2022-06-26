import { List } from "@raycast/api";
import { StatsItem } from "../types";
import StatsListItemDetail from "./StatsListItemDetail";

const StatsListItem = (props: { title: string; entries?: StatsItem[] }) => {
  const description = `
  # ${props.title}

  Here comes a description ...
  `;
  return props.entries ? (
    <List.Item
      title={props.title}
      detail={<StatsListItemDetail description={description} entries={props.entries}></StatsListItemDetail>}
    />
  ) : null;
};

export default StatsListItem;
