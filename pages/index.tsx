import { useState } from "react";

const fetchFromApi = async (id: string) => {
  const response = await fetch(`/api/latest?id=${id}`).catch(err => {
    throw new Error(`could not fetch from API: ${err}`)
  })
  if (!response.ok) {
    throw new Error(`API returned failure status code: ${response.status} ${response.statusText}`)
  }
  const text = await response.text().catch(err => {
    throw new Error(`could not resolve response text: ${err}`)
  })
  return text;
};

export default function Home() {
  const [agentId, setAgentId] = useState("");
  const [data, setData] = useState(`Example response: {"year":148,"month":1,"day":1}`);

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="z-10 w-full max-w-5xl items-center justify-between font-mono text-sm lg:flex">
        <h1>FF Agent Stats</h1>
        <label>
          AgentId:
          <input
            className="text-black ml-1"
            type="text"
            value={agentId}
            onChange={(e) => {
              setAgentId(e.target.value);
            }}
          />
        </label>
        <button
          type="button"
          className="hover:underline"
          onClick={async () => {
            try {
              const data = await fetchFromApi(agentId);
              setData(data);
            } catch (err: any) {
              setData(err.message ?? "unknown error");
            }
          }}
        >
          Fetch Stats
        </button>
        <pre><code>{data}</code></pre>

        <a href="https://github.com/adriankast/ff-agent-stats">Learn How to Use This Proxy API (GitHub)</a>
      </div>
    </main>
  );
}
