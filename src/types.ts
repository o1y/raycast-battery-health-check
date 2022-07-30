interface StatsItem {
  id: string;
  title: string;
  value: string | number;
  unit?: string;
  section: number;
}

interface SectionItem {
  id: number;
  title: string;
  items?: StatsItem[];
}

interface BatteryData {
  timeRemaining: number;
  percentage: number;
  voltage: number;
  amperage: number;
  pfStatus: number;
  currentCapacity: number;
  maxCapacity: number;
  cycleCount: number;
  healthMaxCapacity: string;
  externalConnected: boolean;
  adapterDetails: string;
  temperature: number;
}

export type { BatteryData, StatsItem, SectionItem };
