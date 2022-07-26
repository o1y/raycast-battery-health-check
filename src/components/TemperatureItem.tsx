import StatsListItem from "./StatsListItem";

const TemperatureItem = (props: { temperature: number }) => {
  const celcius = +(props.temperature / 100).toFixed(2);
  const fahrenheit = +(celcius * (9 / 5) + 32).toFixed(2);
  const temerature = props.temperature ? `${celcius} °C / ${fahrenheit} °F` : "--";

  return <StatsListItem label="Temperature" value={temerature} />;
};

export default TemperatureItem;
