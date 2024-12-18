import DataDisplay from "@/components/dataDisplay";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

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

export default function Page() {
  const [data, setData] = useState("");
  const [dataHint, setDataHint] = useState("loading...");
  const router = useRouter();
  const { id } = router.query ?? {};
  const lang = (router.query ?? {}).lang ?? "de"; // ff-agent probably only available in germany at the moment

  useEffect(() => {
    setDataHint("loading...");
    setData("");

    if (!id || typeof id !== "string") {
      setDataHint("⚠ FF-Agent ID required");
      return;
    }

    fetchFromApi(id).then(
      (data) => {
        setData(JSON.stringify(data));
        setDataHint("");
      },
      (err) => {
        setDataHint(`⚠ ${err}`);
      }
    );
  }, [id]);

  if (typeof lang !== "string" || !["de", "en"].includes(lang)) {
    setDataHint("⚠ lang can only be 'de' or 'en'");
    return <div>{dataHint}</div>;
  }

  return (
    <main className="min-h-screen bg-white">
      {dataHint}
      <div className="flex justify-center">
        <DataDisplay data={data} lang={lang as "de" | "en"}>
          <div className="w-10 flex flex-col-reverse items-end">
            <a
              href="https://github.com/adriankast/ff-agent-stats"
              target="_blank"
            >
              <button
                type="button"
                className="hover:underline text-lg font-extrabold"
                id="ffLink"
                title="More information about this dashboard"
              >
                ?
              </button>
            </a>
          </div>
        </DataDisplay>
      </div>
    </main>
  );
}
