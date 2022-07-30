import { execa } from "execa";
import plist from "plist";
import { BatteryData } from "./types";

export async function getBatteryData(): Promise<BatteryData> {
  const { stdout } = await execa("/usr/sbin/ioreg", ["-arn", "AppleSmartBattery"]);
  const { stdout: battery } = await execa("/usr/sbin/system_profiler", ["SPPowerDataType", "-xml"]);
  const ioreg: any = plist.parse(stdout);
  const sysProfiler: any = plist.parse(battery);
  const batteryRegistry = ioreg[0];
  const batteryProfiler = sysProfiler[0];

  return {
    timeRemaining: batteryRegistry["TimeRemaining"],
    percentage: batteryRegistry["CurrentCapacity"],
    voltage: batteryRegistry["Voltage"],
    amperage: batteryRegistry["Amperage"],
    pfStatus: batteryRegistry["PermanentFailureStatus"],
    currentCapacity: batteryRegistry["AppleRawCurrentCapacity"] || batteryRegistry["CurrentCapacity"],
    maxCapacity: batteryRegistry["AppleRawMaxCapacity"] || batteryRegistry["MaxCapacity"],
    cycleCount: batteryRegistry["CycleCount"],
    healthMaxCapacity:
      batteryProfiler["_items"][0]["sppower_battery_health_info"]["sppower_battery_health_maximum_capacity"],
    externalConnected: batteryRegistry["ExternalConnected"],
    adapterDetails: batteryRegistry["AdapterDetails"],
    temperature: batteryRegistry["Temperature"],
  };
}
