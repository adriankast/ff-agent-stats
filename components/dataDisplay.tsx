interface Props {
  data: string;
}

export default function DataDisplay({ data }: Props) {
  const { year, month, day } = JSON.parse(data);
  return (
    <div>
      visualizing Data:<br/>
      <b>year</b> {year}<br/>
      <b>month</b> {month}<br/>
      <b>day</b> {day}<br/>
    </div>
  );
}
