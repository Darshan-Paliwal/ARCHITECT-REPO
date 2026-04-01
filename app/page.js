async function getData() {
  const res = await fetch(process.env.NEXT_PUBLIC_URL + "/api/settings", { cache: "no-store" });
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
