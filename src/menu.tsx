import { MenuBarExtra, showToast, ToastStyle } from "@raycast/api";
import { getBatteryIcon } from "./battery-icon";
import { getBatteryData } from "./battery-data";
import { BatteryData } from "./types";
import { useEffect, useState } from "react";
import { Cache } from "@raycast/api";
import PowerSourceMenuItem from "./components/PowerSourceMenuItem";
import TimeRemainingMenuItem from "./components/TimeRemainingMenuItem";
import PowerUsageMenuItem from "./components/PowerUsageMenuItem";

type UseBatteryDataResponse = {
  isLoading: boolean;
  data: {
    batteryData: BatteryData;
  };
};

const cache = new Cache();

export function useBatteryData() {
  const [isLoading, setIsLoading] = useState(true);
  const [batteryData, setBatteryData] = useState<UseBatteryDataResponse["data"]>();

  useEffect(() => {
    const fetchBatteryData = async () => {
      const batteryData = await getBatteryData();

      return {
        batteryData,
      };
    };

    fetchBatteryData()
      .then((data) => {
        setBatteryData(data);
        cache.set("data", JSON.stringify(data));
      })
      .catch((err) => showToast(ToastStyle.Failure, `There was an error fetching the battery stats.`, err.message))
      .finally(() => setIsLoading(false));
  }, []);

  return {
    isLoading,
    data: batteryData,
  };
}

export default function Command() {
  const { isLoading, data } = useBatteryData();
  const cachedData = cache.get("data") ? JSON.parse(cache.get("data") || "") : undefined;
  const percentage = data?.batteryData.percentage || cachedData?.batteryData?.percentage || 0;

  return (
    <MenuBarExtra title={`${percentage} %`} icon={getBatteryIcon(percentage)} isLoading={isLoading}>
      <PowerSourceMenuItem
        externalConnected={data?.batteryData.externalConnected || cachedData?.batteryData.externalConnected}
      />
      <TimeRemainingMenuItem
        timeRemaining={data?.batteryData.timeRemaining || cachedData?.batteryData.timeRemaining}
        externalConnected={data?.batteryData.externalConnected || cachedData?.batteryData.externalConnected}
      />
      <PowerUsageMenuItem
        amperage={data?.batteryData.amperage || cachedData?.batteryData.amperage}
        currentCapacity={data?.batteryData.currentCapacity || cachedData?.batteryData.currentCapacity}
        maxCapacity={data?.batteryData.maxCapacity || cachedData?.batteryData.maxCapacity}
      />
      <MenuBarExtra.Separator />
    </MenuBarExtra>
  );
}
