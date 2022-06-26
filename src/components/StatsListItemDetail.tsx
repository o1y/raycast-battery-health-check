import { List } from "@raycast/api";
import React from "react";
import { StatsItem } from "../types";

const StatsListItemDetail = (props: { description?: string; entries?: StatsItem[] }) => {
  return (
    <List.Item.Detail
      metadata={
        <List.Item.Detail.Metadata>
          {props.entries?.map((entry) => (
            <React.Fragment key={entry.id}>
              <List.Item.Detail.Metadata.Label
                title={entry.title}
                text={`${entry.value} ${entry.unit ? entry.unit : ""}`}
              />
              <List.Item.Detail.Metadata.Separator />
            </React.Fragment >
          ))}
        </List.Item.Detail.Metadata>
      }
    />
  );
};

export default StatsListItemDetail;
