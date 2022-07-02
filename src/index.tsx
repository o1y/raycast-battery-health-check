import { List } from "@raycast/api";
import { useEffect, useState } from "react";
import { runAppleScript } from "run-applescript";
import { SectionItem, StatsItem } from "./types";
import collect from "collect.js";
import StatsListSection from "./components/StatsListSection";
import StatsListItem from "./components/StatsListItem";

type State = {
  rawStats: string;
  groupedStats: SectionItem[];
  isLoading: boolean;
};

const sections: SectionItem[] = [
  {
    id: 1,
    title: "Summary",
  },
  {
    id: 2,
    title: "Health",
  },
  {
    id: 3,
    title: "Health Management",
  },
  {
    id: 4,
    title: "Power Adapter",
  },
];

const runScript = async (command: string) => {
  return await runAppleScript(`do shell script "${command}"`);
};

const setBatteryStats = (raw: string) => {
  const lines = raw.split("\r");

  let result = [];
  const stats: StatsItem[] = [];

  lines.forEach((line: string) => {
    if ((result = /"(FullyCharged)"\s+=\s+(\w+)/.exec(line)!) !== null) {
      stats.push({
        id: result[1],
        title: "Fully Charged",
        value: result[2],
        section: 1,
      });
    }

    if ((result = /"(AppleRawCurrentCapacity)"\s+=\s+(\d+)/.exec(line)!) !== null) {
      stats.push({
        id: result[1],
        title: "Apple Raw Current Capacity",
        value: parseInt(result[2]),
        unit: "mAh",
        section: 3,
      });
    }

    if ((result = /"(CurrentCapacity)"\s+=\s+(\d+)/.exec(line)!) !== null) {
      stats.push({
        id: result[1],
        title: "Current Capacity",
        value: parseInt(result[2]),
        unit: "%",
        section: 1,
      });
    }

    if ((result = /"(DesignCapacity)"\s+=\s+(\d+)/.exec(line)!) !== null) {
      stats.push({
        id: result[1],
        title: "Design Capacity",
        value: parseInt(result[2]),
        unit: "mAh",
        section: 3,
      });
    }

    if ((result = /"(NominalChargeCapacity)"\s+=\s+(\d+)/.exec(line)!) !== null) {
      stats.push({
        id: result[1],
        title: "Nominal Charge Capacity",
        value: parseInt(result[2]),
        unit: "mAh",
        section: 3,
      });
    }

    if ((result = /"(CycleCount)"\s+=\s+(\d+)/.exec(line)!) !== null) {
      stats.push({
        id: result[1],
        title: "Cycle Count",
        value: parseInt(result[2]),
        section: 2,
      });
    }

    if ((result = /"(AppleRawMaxCapacity)"\s+=\s+(\d+)/.exec(line)!) !== null) {
      stats.push({
        id: result[1],
        title: "Apple Raw Max Capacity",
        value: parseInt(result[2]),
        unit: "mAh",
        section: 3,
      });
    }

    if ((result = /"(IsCharging)"\s+=\s+(\w+)/.exec(line)!) !== null) {
      stats.push({
        id: result[1],
        title: "Is Charging",
        value: result[2],
        section: 1,
      });
    }

    if ((result = /"(VirtualTemperature)"\s+=\s+(\d+)/.exec(line)!) !== null) {
      stats.push({
        id: result[1],
        title: "Temperature",
        value: parseInt(result[2]) / 100,
        unit: "° C",
        section: 2,
      });
    }

    if ((result = /AppleRawAdapterDetails.*?"(Watts)"=(\d+)/.exec(line)!) !== null) {
      stats.push({
        id: "AppleRawAdapterDetailsWatts",
        title: "Watts",
        value: parseInt(result[2]),
        unit: "W",
        section: 4,
      });
    }

    if ((result = /AppleRawAdapterDetails.*?"(Name)"="(.*?)"/.exec(line)!) !== null) {
      stats.push({
        id: "AppleRawAdapterDetailsName",
        title: "Adapter Name",
        value: result[2],
        section: 4,
      });
    }
  });

  return stats;
};

export default function Command() {
  const [state, setState] = useState<State>({
    rawStats: "",
    groupedStats: [],
    isLoading: true,
  });

  useEffect(() => {
    (async () => {
      let raw = "";

      try {
        raw = await runScript("/usr/sbin/ioreg -l -n AppleSmartBattery -r");
      } catch (e) {
        setState((previous) => ({ ...previous, isLoading: false }));
        return false;
      }

      if (raw !== "") {
        const stats = setBatteryStats(raw);
        const statsBySections = collect(stats).groupBy("section");
  
        const groupedStats: SectionItem[] = statsBySections
          .map((sectionCollection: any, index) => {
            const section = sections[index - 1];
            return { id: section.id, title: section.title, items: sectionCollection.all() };
          })
          .toArray();
  
        setState((previous) => ({ ...previous, rawStats: raw, groupedStats: groupedStats, isLoading: false }));
      }
    })();
  });

  return (
    <List isLoading={state.isLoading} isShowingDetail>
    {state.groupedStats.map((section) => (
      <StatsListItem key={section.id} title={section.title} entries={section.items} />
    ))}
  </List>  
  );
}
