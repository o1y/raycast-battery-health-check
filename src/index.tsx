import { List } from "@raycast/api";
import { useEffect, useState } from "react";
import { runAppleScript } from "run-applescript";
import { BatteryStats } from "./types";

type State = {
  rawStats: string;
  batteryStats: BatteryStats;
};

const runScript = async (command: string) => {
  return await runAppleScript(`do shell script "${command}"`);
};

const parseBatteryStats = (raw: string) => {
  let [
    fullyCharged,
    currentCapacity,
    designCapacity,
    cycleCount,
    maxCapacity,
    isCharging,
    temperature,
    watts,
    adapterName,
  ] = "";

  const fullyChargedMatch = /FullyCharged.*?(\w+)$/gm.exec(raw);
  if (fullyChargedMatch !== null && fullyChargedMatch.length === 2) {
    fullyCharged = fullyChargedMatch[1];
  }

  const currentCapacityMatch = /CurrentCapacity.*?(\d{4})$/gm.exec(raw);
  if (currentCapacityMatch !== null && currentCapacityMatch.length === 2) {
    currentCapacity = currentCapacityMatch[1];
  }

  const designCapacityMatch = /DesignCapacity.*?(\d+)$/gm.exec(raw);
  if (designCapacityMatch !== null && designCapacityMatch.length === 2) {
    designCapacity = designCapacityMatch[1];
  }

  const cycleCountMatch = /CycleCount".*?(\d+)$/gm.exec(raw);
  if (cycleCountMatch !== null && cycleCountMatch.length === 2) {
    cycleCount = cycleCountMatch[1];
  }

  const maxCapacityMatch = /MaxCapacity.*?(\d{4})$/gm.exec(raw);
  if (maxCapacityMatch !== null && maxCapacityMatch.length === 2) {
    maxCapacity = maxCapacityMatch[1];
  }

  const isChargingMatch = /IsCharging.*?(\w+)$/gm.exec(raw);
  if (isChargingMatch !== null && isChargingMatch.length === 2) {
    isCharging = isChargingMatch[1];
  }

  const temperatureMatch = /VirtualTemperature.*?(\w+)$/gm.exec(raw);
  if (temperatureMatch !== null && temperatureMatch.length === 2) {
    temperature = temperatureMatch[1];
  }

  const wattsMatch = /Watts.*?(\w+),/gm.exec(raw);
  if (wattsMatch !== null && wattsMatch.length === 2) {
    watts = wattsMatch[1];
  }

  const adapterNameMatch = /AdapterDetails.*Name.*?="(.*?)"/gm.exec(raw);
  if (adapterNameMatch !== null && adapterNameMatch.length === 2) {
    adapterName = adapterNameMatch[1];
  }

  return {
    fullyCharged: fullyCharged ? fullyCharged : "Unavailable",
    currentCapacity: currentCapacity ? `${currentCapacity} mAh` : "Unavailable",
    currentCapacityPercent: `(${Math.round((parseInt(currentCapacity) / parseInt(maxCapacity)) * 100)} %)`,
    designCapacity: designCapacity ? `${designCapacity} mAh` : "Unavailable",
    cycleCount: cycleCount ? cycleCount : "Unavailable",
    maxCapacity: maxCapacity ? `${maxCapacity} mAh` : "Unavailable",
    isCharging: isCharging ? isCharging : "Unavailable",
    temperature: `${parseInt(temperature) / 100}° C`,
    watts: watts ? `${watts} W` : "Not connected",
    adapterName: adapterName ? adapterName : "Not connected",
  };
};

export default function Command() {
  const [state, setState] = useState<State>({
    rawStats: "",
    batteryStats: {
      fullyCharged: "",
      currentCapacity: "",
      currentCapacityPercent: "",
      designCapacity: "",
      cycleCount: "",
      maxCapacity: "",
      isCharging: "",
      temperature: "",
      watts: "",
      adapterName: "",
    },
  });

  useEffect(() => {
    (async () => {
      const raw = await runScript("/usr/sbin/ioreg -l -n AppleSmartBattery -r");
      const batteryStats = parseBatteryStats(raw);

      setState((previous) => ({ ...previous, rawStats: raw, batteryStats: batteryStats }));
    })();
  });

  return (
    <List>
      <List.Section title="Charge Information">
        <List.Item title="Is charging" subtitle={state.batteryStats.isCharging} />
        <List.Item title="Fully charged" subtitle={state.batteryStats.fullyCharged} />
        <List.Item
          title="Current Charge"
          subtitle={`${state.batteryStats.currentCapacity} ${state.batteryStats.currentCapacityPercent}`}
        />
      </List.Section>
      <List.Section title="Health">
        <List.Item title="Temperature" subtitle={state.batteryStats.temperature} />
        <List.Item title="Design Capacity" subtitle={state.batteryStats.designCapacity} />
        <List.Item title="Full Charge Capacity" subtitle={state.batteryStats.maxCapacity} />
        <List.Item title="Cycle Count" subtitle={state.batteryStats.cycleCount} />
      </List.Section>
      <List.Section title="Power Adapter">
        <List.Item title="Adapter Name" subtitle={state.batteryStats.adapterName} />
        <List.Item title="Watts" subtitle={state.batteryStats.watts} />
      </List.Section>
    </List>
  );
}
