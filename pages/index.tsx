import { useState } from "react";

const fetchFromApi = async (id: string) => {
  const response = await fetch(`/api/latest?id=${id}`).catch((err) => {
    throw new Error(`could not fetch from API: ${err}`);
  });
  if (!response.ok) {
    throw new Error(
      `API returned failure status code: ${response.status} ${response.statusText}`
    );
  }
  const json = await response.json().catch((err) => {
    throw new Error(`could not resolve response json: ${err}`);
  });
  return json;
};

export default function Home() {
  const [agentId, setAgentId] = useState("");
  const [data, setData] = useState(`
Example response: 
    {
      "year": 148,
      "month":1,
      "day":1
    }
`
  );

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <h1 className="text-4xl font-semibold">FF Agent Stats</h1>
      <div className="flex flex-col gap-5">
        <div className="flex gap-5 items-center">
          <label htmlFor="agentId" className="text-xl font-semibold">
            AgentId:</label>
            <input
              name="agentId"
              className="text-black ml-1 w-64 px-2 py-3"
              type="text"
              value={agentId}
              onChange={(e) => {
                setAgentId(e.target.value);
              }}
            />
          
          <button
            type="button"
            className="group rounded-lg border border-gray-800 px-2 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30"
            onClick={async () => {
              try {
                const data = await fetchFromApi(agentId);
                setData(JSON.stringify(data, undefined, 4));
              } catch (err: any) {
                setData(err.message ?? "unknown error");
              }
            }}
          >
            Fetch Stats
          </button>
        </div>

        <hr />

        <pre className="w-64 break-words">
          <code>{data}</code>
        </pre>
      </div>

      <a
        href="https://github.com/adriankast/ff-agent-stats"
        target="_blank"
        className="hover:underline"
      >
        Learn How to Use This Proxy API (GitHub ↗)
      </a>
    </main>
  );
}
