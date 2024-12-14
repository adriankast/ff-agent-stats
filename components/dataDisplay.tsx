import { useEffect } from "react";
import CircledNumber from "./circledNumber"
import EmojiedNumber from "./emojiedNumber"

interface Props {
  data: string;
}

export default function DataDisplay({ data }: Props) {
  if (!data) {
    return null
  }
  
  const { year, month, day } = JSON.parse(data);

  return (
    <div style={{display: "flex", }}>
      <CircledNumber value={year} label="Year" animationDuration={3100} />
      <CircledNumber value={month} label="Month" animationDuration={1500} />
      <EmojiedNumber value={day} label="Day" />
    </div>
  );
}
