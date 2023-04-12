type MissionT = {
  location: string;
  id: string;
  detailUrl: string;
  type: string;
  title: string;
  alarmDate: number;
};

export async function fetchMissions(id: string, year: number) {
  const data = await fetch(
    `https://pd.service.ff-agent.com/hpWidget/${id}/${year}`
  );
  const missions: MissionT[] = await data.json();
  return missions;
}
