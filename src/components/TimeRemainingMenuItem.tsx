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
    const label = props.externalConnected ? `until charged` : "remaining";

    return `${hoursRemaining()}${minutesRemaining()} ${label}`;
  };

  return (
    (props.timeRemaining !== undefined && props.timeRemaining < 1500 && props.timeRemaining !== 0 && (
      <MenuBarExtra.Item title={getTitle()} />
    )) || <></>
  );
};

export default TimeRemainingMenuItem;
