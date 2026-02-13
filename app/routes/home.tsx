import type { Route } from "./+types/home";
import { Link } from "react-router";
import { ArrowRight, Mail, Linkedin, Github, Code, Palette, Zap } from "lucide-react";
import { Button } from "~/components/ui/button/button";
// import { Input } from "~/components/ui/input/input";
// import { Textarea } from "~/components/ui/textarea/textarea";
// import { Label } from "~/components/ui/label/label";
import { projects } from "~/data/projects";
import styles from "./home.module.css";
import Profil from "~/images/IMG_4745.webp";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Dohar Siregar - Full-Stack Web Developer & Designer" },
    {
      name: "description",
      content:
        "Portfolio of Dohar Siregar, a passionate full-stack web developer and designer creating elegant digital experiences.",
    },
  ];
}

export default function Home() {
  return (
    <div className={styles.container}>
      {/* Hero Section */}
      <section className={styles.hero}>
        <div className={styles.heroContent}>
          <img src={Profil} alt="Dohar Siregar" className={styles.profileImage} />
          <h1 className={styles.heroTitle}>Dohar Siregar</h1>
          <p className={styles.heroTagline}>Full-Stack Web Developer</p>
          <p className={styles.heroDescription}>
            Crafting elegant digital experiences through clean code and thoughtful design. Specializing in modern web
            applications that blend functionality with beautiful user interfaces.
          </p>
          <div className={styles.heroCta}>
            <Button asChild size="lg">
              <a href="#projects">
                View My Work
                <ArrowRight className={styles.projectLinkIcon} />
              </a>
            </Button>
            <Button asChild variant="outline" size="lg">
              <a href="#contact">Get In Touch</a>
            </Button>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className={styles.section} id="about">
        <h2 className={styles.sectionTitle}>About Me</h2>
        <p className={styles.sectionSubtitle}>Passionate about building products that make a difference</p>
        <div className={styles.aboutContent}>
          <p className={styles.aboutText}>
            With over 2 years of experience in web development, I've had the privilege of working with startups,
            agencies, and established companies to bring their digital visions to life. My approach combines technical
            expertise with a keen eye for design, ensuring that every project not only functions flawlessly but also
            delivers an exceptional user experience.
          </p>
          <p className={styles.aboutText}>
            I believe in writing clean, maintainable code and staying current with the latest technologies and best
            practices. When I'm not coding, you'll find me exploring new design trends, contributing to open-source
            projects, or sharing knowledge with the developer community.
          </p>

          <div className={styles.skillsGrid}>
            <div className={styles.skillCard}>
              <Code className={styles.skillIcon} />
              <h3 className={styles.skillTitle}>Full-Stack Development</h3>
              <p className={styles.skillDescription}>
                Building scalable web applications with React, Node.js, and modern frameworks. Expert in both frontend
                and backend technologies.
              </p>
            </div>
            <div className={styles.skillCard}>
              <Palette className={styles.skillIcon} />
              <h3 className={styles.skillTitle}>UI/UX Design</h3>
              <p className={styles.skillDescription}>
                Creating intuitive and visually appealing interfaces that prioritize user experience and accessibility.
              </p>
            </div>
            <div className={styles.skillCard}>
              <Zap className={styles.skillIcon} />
              <h3 className={styles.skillTitle}>Performance Optimization</h3>
              <p className={styles.skillDescription}>
                Ensuring applications are fast, efficient, and provide seamless experiences across all devices and
                platforms.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section className={`${styles.section} ${styles.sectionAlt}`} id="projects">
        <h2 className={styles.sectionTitle}>Featured Projects</h2>
        <p className={styles.sectionSubtitle}>A selection of recent work showcasing my skills and expertise</p>
        <div className={styles.projectsGrid}>
          {projects.map((project) => (
            <article key={project.id} className={styles.projectCard}>
              <img src={project.images.thumbnail} alt={project.title} className={styles.projectImage} />
              <div className={styles.projectContent}>
                <span className={styles.projectCategory}>{project.category}</span>
                <h3 className={styles.projectTitle}>{project.title}</h3>
                <p className={styles.projectSummary}>{project.summary}</p>
                <div className={styles.projectFooter}>
                  <span className={styles.projectYear}>{project.year}</span>
                  <Link to={`/projects/${project.slug}`} className={styles.projectLink}>
                    View Details
                    <ArrowRight className={styles.projectLinkIcon} />
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* Contact Section */}
      <section className={styles.section} id="contact">
        <h2 className={styles.sectionTitle}>Get In Touch</h2>
        <p className={styles.sectionSubtitle}>
          I'm always open to discussing new projects, creative ideas, or opportunities to be part of your vision.
        </p>
        <div className={styles.contactContent}>
          <div className={styles.contactMethods}>
            <div className={styles.contactMethod}>
              <Mail className={styles.contactIcon} />
              <a href="mailto:doharsiregar10@gmail.com" className={styles.contactLink}>
                doharsiregar10@gmail.com
              </a>
            </div>
            <div className={styles.contactMethod}>
              <Linkedin className={styles.contactIcon} />
              <a
                href="https://www.linkedin.com/in/dohar-siregar/"
                target="_blank"
                rel="noopener noreferrer"
                className={styles.contactLink}
              >
                linkedin.com/in/dohar-siregar
              </a>
            </div>
            <div className={styles.contactMethod}>
              <Github className={styles.contactIcon} />
              <a
                href="https://github.com/DoharDNR"
                target="_blank"
                rel="noopener noreferrer"
                className={styles.contactLink}
              >
                github.com/DoharDNR
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
