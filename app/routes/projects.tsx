// ===== Projects Route: Featured projects grid with links to detail pages =====
import type { Route } from "./+types/projects";
import { projects } from "~/data/projects";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Projects - Dohar Siregar" },
    {
      name: "description",
      content: "A selection of recent work showcasing my skills and expertise.",
    },
  ];
}

export default function Projects() {
  return (
    <main className="pt-24 pb-20">
      <div className="max-w-360 mx-auto px-6 md:px-12.5">
        <h1 className="font-heading text-neutral-12 text-4xl font-bold text-center mb-4">
          Featured Projects
        </h1>
        <p className="text-neutral-11 text-center mb-12 max-w-150 mx-auto">
          A selection of recent work showcasing my skills and expertise
        </p>

        <div className="grid grid-cols-[repeat(auto-fill,minmax(300px,1fr))] gap-8">
          {projects.map((project) => (
            <article
              key={project.id}
              className="bg-neutral-2 rounded-[6px] overflow-hidden border border-neutral-5 transition-all 300ms ease flex flex-col h-full group"
            >
              <a href={`/projects/${project.slug}`}>
                <img
                  src={project.images.thumbnail}
                  alt={project.title}
                  className="w-full h-60 object-cover transition-transform 300ms ease group-hover:scale-105"
                />
              </a>
              <div className="p-6 flex-1 flex flex-col">
                <span className="text-[11px] text-accent-11 uppercase tracking-wider font-semibold mb-2">
                  {project.category}
                </span>
                <h3 className="font-subheading text-neutral-12 text-[18px] font-semibold mb-3">
                  <a href={`/projects/${project.slug}`} className="hover:text-accent-9 transition-colors">
                    {project.title}
                  </a>
                </h3>
                <p className="text-neutral-11 text-[13px] leading-normal mb-4 flex-1">
                  {project.summary}
                </p>
                <div className="flex items-center justify-between pt-4 border-t border-neutral-5 mt-auto">
                  <span className="text-[13px] text-neutral-10">{project.year}</span>
                  <a
                    href={`/projects/${project.slug}`}
                    className="inline-flex items-center gap-2 text-accent-11 text-[13px] font-semibold transition-colors 200ms ease hover:text-accent-9"
                  >
                    View Details
                  </a>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </main>
  );
}
