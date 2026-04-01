import { baseUrl } from "../../lib/fetch";

async function getProjects() {
  const res = await fetch(`${baseUrl()}/api/projects`, {
    cache: "no-store",
  });

  if (!res.ok) return [];
  return res.json();
}

export default async function Projects() {
  const projects = await getProjects();

  return (
    <div className="grid grid-cols-3 gap-4 p-6">
      {projects.map((p) => (
        <div key={p._id} className="border p-4">
          <h2>{p.title}</h2>
        </div>
      ))}
    </div>
  );
        }
