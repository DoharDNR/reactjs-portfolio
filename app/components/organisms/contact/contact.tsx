// ===== Contact Section: email, linkedin, github links =====
import { Mail, Linkedin, Github } from "lucide-react";

export function ContactSection() {
  return (
    <section className="py-20 px-6 md:px-12.5 max-w-360 mx-auto" id="contact">
      <header className="text-center mb-12">
        <h2 className="font-heading text-neutral-12 text-4xl font-bold mb-3">
          Get In Touch
        </h2>
        <p className="text-neutral-11 text-[15px] leading-[26px] text-center max-w-125 mx-auto">
          I'm always open to discussing new projects, creative ideas, or opportunities to be part of your vision.
        </p>
      </header>

      <nav className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <ContactLink
          icon={<Mail className="w-6 h-6" />}
          text="doharsiregar10@gmail.com"
          href="mailto:doharsiregar10@gmail.com"
        />
        <ContactLink
          icon={<Linkedin className="w-6 h-6" />}
          text="linkedin.com/in/dohar-siregar"
          href="https://www.linkedin.com/in/dohar-siregar/"
          external
        />
        <ContactLink
          icon={<Github className="w-6 h-6" />}
          text="github.com/DoharDNR"
          href="https://github.com/DoharDNR"
          external
        />
      </nav>
    </section>
  );
}

function ContactLink({
  icon,
  text,
  href,
  external = false,
}: {
  icon: React.ReactNode;
  text: string;
  href: string;
  external?: boolean;
}) {
  return (
    <a
      href={href}
      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      className="flex items-center justify-center gap-3 py-5 px-6 bg-neutral-2 rounded-[8px] border border-neutral-6 hover:bg-neutral-3 transition-all duration-200"
    >
      <span className="flex-shrink-0 text-accent-9">{icon}</span>
      <span className="font-subheading text-accent-11 font-medium">{text}</span>
    </a>
  );
}
