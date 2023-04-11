// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";

type LatestStatsT = {
  year: number;
  month: number;
};

type ErrorT = {
  message: string;
};

type MissionT = {
  location: string;
  id: string;
  detailUrl: string;
  type: string;
  title: string;
  alarmDate: number;
};

async function fetchMissions(id: string, year: number) {
  const data = await fetch(
    `https://pd.service.ff-agent.com/hpWidget/${id}/${year}`
  );
  const missions: MissionT[] = await data.json();
  return missions;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<LatestStatsT | ErrorT>
) {
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

  const monthMissions = missions.filter((mission: MissionT) => {
    const missionTime = new Date(mission.alarmDate);
    return missionTime.getMonth() === today.getMonth();
  });
  
  res.status(200).json({ year: missions.length, month: monthMissions.length });
}
