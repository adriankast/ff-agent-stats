// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { runCorsMiddleware } from "./_corsMiddleware";
import { fetchMissions } from "./_fetchMissions";

type LatestStatsT = {
  year: number;
  month: number;
  day: number
};

type ErrorT = {
  message: string;
};

type CustomDateT = {
  date: number,
  month: number,
  year: number
}

// ff-agent seems to be only active in germany at the moment, would have to pass timezone if necessary
function toGermanTimezoneDate(date: Date): CustomDateT {
  const [strDay, strMonth, strYear]  = date.toLocaleDateString("de-DE", {timeZone: "Europe/Berlin"}).split(".")
  return ({
    date: Number.parseInt(strDay),
    month: Number.parseInt(strMonth)-1,
    year: Number.parseInt(strYear)
  })
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<LatestStatsT | ErrorT>
) {
  // set caching to 1minute
  res.setHeader(
    'Cache-Control',
    'public, s-maxage=60'
  )
  await runCorsMiddleware(req, res);
  
  const { id } = req.query;
  if (!id || typeof id === "object") {
    res
      .status(422)
      .json({
        message: "Id has to be in the query params and must not be an array",
      });
    return;
  }

  const nowUTC = new Date()
  const today = toGermanTimezoneDate(nowUTC)

  const missions = await fetchMissions(id, today.year);

  const missionDates = missions.map(mission => toGermanTimezoneDate(new Date(mission.alarmDate)));
  const monthMissionDates = missionDates.filter((missionDate) => missionDate.month === today.month)
  const dayMissionDates = monthMissionDates.filter(missionDate => missionDate.date === today.date)
  
  res.status(200).json({ year: missions.length, month: monthMissionDates.length, day: dayMissionDates.length });
}
