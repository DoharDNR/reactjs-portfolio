import type { Route } from "./+types/projects.$slug";
import { Link, useParams } from "react-router";
import { ArrowLeft } from "lucide-react";
import { Button } from "~/components/ui/button/button";
import { getProjectBySlug } from "~/data/projects";
import styles from "./projects.$slug.module.css";

export function meta({ params }: Route.MetaArgs) {
  const project = getProjectBySlug(params.slug);

  if (!project) {
    return [{ title: "Project Not Found" }];
  }

  return [
    { title: `${project.title} - Alex Morgan Portfolio` },
    {
      name: "description",
      content: project.summary,
    },
  ];
}

export default function ProjectDetail() {
  const params = useParams();
  const project = getProjectBySlug(params.slug!);

  if (!project) {
    return (
      <div className={styles.container}>
        <div className={styles.header}>
          <div className={styles.headerContent}>
            <Link to="/#projects" className={styles.backLink}>
              <ArrowLeft className={styles.backIcon} />
              Back to Projects
            </Link>
            <h1 className={styles.title}>Project Not Found</h1>
            <p className={styles.summary}>The project you're looking for doesn't exist or has been removed.</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      {/* Header */}
      <header className={styles.header}>
        <div className={styles.headerContent}>
          <Link to="/#projects" className={styles.backLink}>
            <ArrowLeft className={styles.backIcon} />
            Back to Projects
          </Link>
          <span className={styles.category}>{project.category}</span>
          <h1 className={styles.title}>{project.title}</h1>
          <p className={styles.summary}>{project.summary}</p>
          <div className={styles.meta}>
            <div className={styles.metaItem}>
              <span className={styles.metaLabel}>Year</span>
              <span className={styles.metaValue}>{project.year}</span>
            </div>
            <div className={styles.metaItem}>
              <span className={styles.metaLabel}>Role</span>
              <span className={styles.metaValue}>{project.role}</span>
            </div>
            <div className={styles.metaItem}>
              <span className={styles.metaLabel}>Technologies</span>
              <div className={styles.technologies}>
                {project.technologies.map((tech) => (
                  <span key={tech} className={styles.techBadge}>
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className={styles.main}>
        {/* Gallery */}
        <section className={styles.gallery}>
          <div className={styles.galleryGrid}>
            {project.images.gallery.map((image, index) => (
              <img
                key={index}
                src={image}
                alt={`${project.title} screenshot ${index + 1}`}
                className={styles.galleryImage}
              />
            ))}
          </div>
        </section>

        {/* Description */}
        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>Project Overview</h2>
          <div className={styles.sectionContent}>
            <p>{project.description}</p>
          </div>
        </section>

        {/* Challenges */}
        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>Challenges & Solutions</h2>
          <div className={styles.sectionContent}>
            <p>{project.challenges}</p>
          </div>
        </section>

        {/* Live Demo */}
        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>Live Demo</h2>
          <div className={styles.sectionContent}>
            {project.liveDemo ? (
              <Button asChild size="lg">
                <a href={project.liveDemo} target="_blank" rel="noopener noreferrer">
                  Live Demo
                </a>
              </Button>
            ) : (
              <Button size="lg" variant="secondary" disabled>
                Live Demo
              </Button>
            )}
          </div>
        </section>

        {/* Navigation */}
        <nav className={styles.navigation}>
          <Button asChild size="lg">
            <Link to="/#projects">
              <ArrowLeft className={styles.backIcon} />
              View All Projects
            </Link>
          </Button>
        </nav>
      </main>
    </div>
  );
}
