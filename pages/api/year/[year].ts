import type { NextApiRequest, NextApiResponse } from 'next'
import { fetchMissions } from "../_fetchMissions"
import { runCorsMiddleware } from '../_corsMiddleware'

type YearStatsT = {
  year: number;
};

type ErrorT = {
  message: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<YearStatsT | ErrorT>
) {
  // set caching to 1minute
  res.setHeader(
    'Cache-Control',
    'public, s-maxage=60'
  )
  await runCorsMiddleware(req, res);

  const { id, year } = req.query;
  if (!id || typeof id === "object") {
    res
      .status(422)
      .json({
        message: "Id has to be in the query params and must not be an array",
      });
    return;
  }
  if (!year || typeof year === "object") {
    res
      .status(422)
      .json({
        message: "Year has to be given in the api path",
      });
    return;
  }

  const missions = await fetchMissions(id, Number.parseInt(year));
  
  res.status(200).json({ year: missions.length });
}

