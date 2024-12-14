interface Props {
  value: number;
  label: string;
}

export default function EmojiedNumber({ value, label }: Props) {
  let rv = "0";
  if (value > 0) {
    rv = "";
    for (let i = 0; i < value && i < 1000; i++) {
        rv += "🚒";
      
    }
  }
  return (
    <div>
      <div>{label}</div>
      <div id="ffEmojiedNumber">{rv}</div>
    </div>
  );
}
