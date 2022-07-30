import { MenuBarExtra } from "@raycast/api";

const PowerSourceMenuItem = (props: { externalConnected: boolean | undefined }) => {
  const powerSource = props.externalConnected === true ? "Power Adapter" : "Battery";
  const formatted = props.externalConnected !== undefined ? `${powerSource}` : "--";

  return <MenuBarExtra.Item title={`Power Source: ${formatted}`} />;
};

export default PowerSourceMenuItem;
