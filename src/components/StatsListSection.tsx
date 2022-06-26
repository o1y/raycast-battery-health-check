import { List } from "@raycast/api";
import { StatsItem } from "../types";
import StatsListItem from "./StatsListItem";

const StatsListSection = (props: { title: string; entries?: StatsItem[] }) => {
  return props.entries ? (
    <List.Section title={props.title}>
      {props.entries.map((entry) => (
        <StatsListItem key={entry.id} stats={entry} />
      ))}
    </List.Section>
  ) : null;
};

export default StatsListSection;
