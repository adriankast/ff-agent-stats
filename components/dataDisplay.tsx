interface Props {
  data: string;
}

export default function DataDisplay({ data }: Props) {
  return <div>visualizing Data: {data}</div>;
}
