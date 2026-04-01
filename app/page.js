
import { headers } from "next/headers";

async function getData() {
  const host = headers().get("host");
  const protocol = process.env.NODE_ENV === "development" ? "http" : "https";

  const res = await fetch(`${protocol}://${host}/api/settings`, {
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
