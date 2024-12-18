import { ReactNode } from "react"
import CircledNumber from "./circledNumber"
import EmojiedNumber from "./emojiedNumber"

interface Props {
  data: string;
  lang?: "de" | "en"
  children?: ReactNode
}

const labels = {
  de: {
    year: "Jahr",
    month: "Monat",
    day: "Tag"
  },
  en: {
    year: "Year",
    month: "Month",
    day: "Day"
  }
}

export default function DataDisplay({ data, lang, children }: Props) {
  const language = lang ?? "de";
  if (!data) {
    return null
  }
  const { year, month, day } = JSON.parse(data);

  return (
    <div style={{display: "flex"}}>
      <CircledNumber value={year} label={labels[language].year} animationDuration={3100} />
      <CircledNumber value={month} label={labels[language].month} animationDuration={1500} />
      <EmojiedNumber value={day} label={labels[language].day} />
      {children && children}
    </div>
  );
}
