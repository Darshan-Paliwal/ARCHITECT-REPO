import { baseUrl } from "../lib/fetch";

async function getData() {
  const res = await fetch(`${baseUrl()}/api/settings`, {
    cache: "no-store",
  });

  if (!res.ok) return { heroText: "Error loading" };
  return res.json();
}

export default async function Home() {
  const data = await getData();

  return (
    <div className="p-10">
      <h1 className="text-4xl">{data.heroText}</h1>
    </div>
  );
}
