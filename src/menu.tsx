import { MenuBarExtra } from "@raycast/api";
import { getBatteryIcon } from "./battery-icon";

export default function Command() {
  return (
    <MenuBarExtra icon={getBatteryIcon(100)} title="100 %" tooltip="Battery Health">
      <MenuBarExtra.Item title="Power Source: Battery" />
      <MenuBarExtra.Item title="4:34 until charged " />
      <MenuBarExtra.Item title="3912 / 5122 mAh (-12 mA)" />
      <MenuBarExtra.Separator />
    </MenuBarExtra>
  );
}
