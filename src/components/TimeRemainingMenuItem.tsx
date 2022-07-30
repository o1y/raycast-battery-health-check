import { MenuBarExtra } from "@raycast/api";

const TimeRemainingMenuItem = (props: { timeRemaining: number; externalConnected: boolean | undefined }) => {
  const hoursRemaining = () => {
    const hours = Math.floor(props.timeRemaining / 60);
    return hours !== 0 ? `${hours}hr ` : "";
  };

  const minutesRemaining = () => {
    const minutesRemaining = props.timeRemaining % 60;
    return minutesRemaining !== 0 ? `${minutesRemaining}min` : "";
  };

  const getTitle = () => {
    let label = props.externalConnected ? ` until charged` : " remaining";
    label = props.timeRemaining === 0 ? `Battery fully charged` : label;

    return `${hoursRemaining()}${minutesRemaining()}${label}`;
  };

  return (
    (props.timeRemaining !== undefined && props.timeRemaining < 1500 && <MenuBarExtra.Item title={getTitle()} />) || (
      <></>
    )
  );
};

export default TimeRemainingMenuItem;
