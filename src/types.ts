interface BatteryStats {
  fullyCharged: string;
  currentCapacity: string;
  currentCapacityPercent: string;
  designCapacity: string;
  cycleCount: string;
  maxCapacity: string;
  isCharging: string;
  temperature: string;
  watts: string;
  adapterName: string;
}

export type { BatteryStats };
