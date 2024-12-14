import DataDisplay from "@/components/dataDisplay";
import MultiButton from "@/components/multiButton";
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

const exampleResponse = `
{
  "year": 148,
  "month":1,
  "day":1
}
`;

const examples = [
  {
    id: process.env.NEXT_PUBLIC_EXAMPLE_HECHENDORF,
    label: "FW Hechendorf",
  },
  {
    id: process.env.NEXT_PUBLIC_EXAMPLE_HERRSCHING,
    label: "FW Herrsching",
  },
  {
    id: process.env.NEXT_PUBLIC_EXAMPLE_TAUFKIRCHEN,
    label: "FW Taufkirchen",
  },
];

type DisplayModesT = "visual" | "json";

export default function Home() {
  const [agentId, setAgentId] = useState("");
  const [data, setData] = useState(exampleResponse);
  const [dataHint, setDataHint] = useState("Showing example data:")
  const [displayMode, setDisplayMode] = useState<DisplayModesT>("visual");

  return (
    <main className="flex min-h-screen flex-col items-center justify-between gap-10 p-24">
      <h1 className="text-4xl font-semibold">FF Agent Stats</h1>
      <div className="flex flex-col gap-10">
        <div className="flex flex-col sm:flex-row gap-5 items-center">
          <span className="text-xl font-semibold">Insert example:</span>

          {examples.map((example) => (
            <button
              className="hover:underline"
              key={example.id}
              onClick={() => setAgentId(example.id ?? "")}
            >
              {example.label}
            </button>
          ))}
        </div>

        <hr />

        <div className="flex flex-col sm:flex-row gap-5 items-center">
          <label htmlFor="agentId" className="text-xl font-semibold">
            AgentId:
          </label>
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
              setDataHint("fetching...");
              setData("");
              try {
                const data = await fetchFromApi(agentId);
                setData(JSON.stringify(data, undefined, 2));
                setDataHint("")
              } catch (err: any) {
                setDataHint(err.message ?? "unknown error");
                setData("")
              }
            }}
          >
            Fetch Stats
          </button>
        </div>

        <hr />

        <MultiButton
          options={["visual", "json"]}
          selectOption={(input: string) =>
            setDisplayMode(input as DisplayModesT)
          }
          selected={displayMode}
        />

          {dataHint}
        {displayMode === "visual" ? (
          <DataDisplay data={data} />
        ) : (
          <pre className="w-64 break-words h-40">
            <code>{data}</code>
          </pre>
        )}
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
