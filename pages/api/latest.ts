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

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<LatestStatsT | ErrorT>
) {
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

  const today = new Date();
  const year = today.getFullYear();
  const missions = await fetchMissions(id, year);

  const missionDates = missions.map(mission => new Date(mission.alarmDate));
  const monthMissionDates = missionDates.filter((missionDate) => missionDate.getMonth() === today.getMonth())
  const dayMissionDates = monthMissionDates.filter(missionDate => missionDate.getDate() === today.getDate())
  
  res.status(200).json({ year: missions.length, month: monthMissionDates.length, day: dayMissionDates.length });
}
