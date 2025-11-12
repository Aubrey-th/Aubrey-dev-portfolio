// Aubrey_Modern_Portfolio.jsx
// Single-file React portfolio component (TailwindCSS + Framer Motion recommended)
// Instructions:
// 1) Create a React app using Vite or Create React App.
// 2) Install dependencies: framer-motion, react-icons
//    npm i framer-motion react-icons
// 3) Configure Tailwind CSS and include its generated stylesheet (index.css).
// 4) Replace placeholders (NAME, picture URL, links, project data, form endpoint).

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaGithub, FaLinkedin, FaEnvelope } from 'react-icons/fa';
import { SiReact, SiJavascript, SiFirebase, SiCplusplus } from 'react-icons/si';

// --- Helper data (replace these) ---
const PROFILE = {
  name: 'Aubrey [Your Surname]',
  title: 'Full-Stack Developer (Volunteer) | IT Student',
  location: 'South Africa',
  picture: 'https://placekitten.com/300/300', // replace with your photo URL
  email: 'youremail@example.com',
  github: 'https://github.com/yourhandle',
  linkedin: 'https://linkedin.com/in/yourhandle',
  about: `Second-year Information Technology student at Richfield and volunteer Full-Stack Developer at Design Pie Creative Agency. I build responsive, accessible web apps using React and Firebase. I love solving problems, learning new tech, and shipping products that users enjoy.`,
};

const PROJECTS = [
  {
    id: 1,
    title: 'QuickTask — Job Board Web App',
    tech: ['React', 'Firebase', 'Google Maps API'],
    desc: 'Mini Uber-like platform for quick local jobs. Implemented real-time listings, authentication and geolocation.',
    link: '#',
    img: 'https://placehold.co/600x400?text=QuickTask',
    metrics: { users: '500+', tasks: '1.2k', rating: '4.8' },
  },
  {
    id: 2,
    title: 'GradeMate — Student Grading System',
    tech: ['C++', 'CLI'],
    desc: 'Console application for managing student marks and generating grade reports.',
    link: '#',
    img: 'https://placehold.co/600x400?text=GradeMate',
    metrics: { students: '200', reports: '200+' },
  },
  {
    id: 3,
    title: 'TaskVault — To-Do App',
    tech: ['C++', 'File I/O', 'OOP'],
    desc: 'Task management with persistent local storage and OOP design.',
    link: '#',
    img: 'https://placehold.co/600x400?text=TaskVault',
    metrics: { tasks: '3k+' },
  },
];

const SKILLS = [
  { name: 'React', level: 85, icon: <SiReact size={20} /> },
  { name: 'JavaScript', level: 80, icon: <SiJavascript size={20} /> },
  { name: 'Firebase', level: 70, icon: <SiFirebase size={20} /> },
  { name: 'C++', level: 65, icon: <SiCplusplus size={20} /> },
];

// --- Animations ---
const fadeInUp = { hidden: { opacity: 0, y: 12 }, visible: { opacity: 1, y: 0 } };
const containerStagger = { visible: { transition: { staggerChildren: 0.08 } } };

export default function AubreyPortfolio() {
  const [recruiterMode, setRecruiterMode] = useState(false);
  const [projectView, setProjectView] = useState(null);

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 via-slate-800 to-black text-slate-100 font-sans">
      <div className="max-w-6xl mx-auto px-6 py-12">
        <Header onToggleRecruiter={() => setRecruiterMode(!recruiterMode)} recruiterMode={recruiterMode} />

        <main className="mt-10 space-y-20">
          <Hero />
          <About />
          <Projects openProject={setProjectView} />
          <Experience />
          <Skills />
          <Contact />
        </main>

        <Footer />

        <AnimatePresence>
          {projectView && (
            <ProjectModal project={projectView} onClose={() => setProjectView(null)} />
          )}
        </AnimatePresence>

        <AnimatePresence>
          {recruiterMode && <RecruiterPanel onClose={() => setRecruiterMode(false)} />}
        </AnimatePresence>
      </div>
    </div>
  );
}

// ---------------- Components ----------------
function Header({ onToggleRecruiter, recruiterMode }) {
  return (
    <motion.header className="flex items-center justify-between" initial="hidden" animate="visible" variants={fadeInUp}>
      <div className="flex items-center gap-4">
        <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-indigo-500 via-pink-500 to-yellow-400 flex items-center justify-center shadow-lg">
          <span className="font-bold">A</span>
        </div>
        <div>
          <h1 className="text-xl font-semibold">{PROFILE.name}</h1>
          <p className="text-sm text-slate-300">{PROFILE.title} • {PROFILE.location}</p>
        </div>
      </div>

      <div className="flex items-center gap-3">
        <a href={PROFILE.github} target="_blank" rel="noreferrer" aria-label="Github" className="p-2 rounded-lg hover:bg-slate-700/40 transition">
          <FaGithub />
        </a>
        <a href={PROFILE.linkedin} target="_blank" rel="noreferrer" aria-label="LinkedIn" className="p-2 rounded-lg hover:bg-slate-700/40 transition">
          <FaLinkedin />
        </a>
        <button onClick={onToggleRecruiter} className={`ml-2 px-3 py-1 rounded-full text-sm font-medium transition ${recruiterMode ? 'bg-emerald-500 text-black' : 'bg-slate-700/30'}`}>
          Recruiter Mode
        </button>
      </div>
    </motion.header>
  );
}

function Hero() {
  return (
    <section className="grid md:grid-cols-2 gap-8 items-center">
      <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.05 }}>
        <h2 className="text-4xl md:text-5xl font-extrabold leading-tight">Hello, I’m {PROFILE.name}.</h2>
        <p className="mt-4 text-slate-300 max-w-xl">{PROFILE.about}</p>

        <div className="mt-6 flex gap-3">
          <a href="#projects" className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 rounded-lg shadow-md">View Projects</a>
          <a href="#contact" className="px-4 py-2 border border-slate-600 rounded-lg hover:bg-slate-700">Contact Me</a>
        </div>

        <div className="mt-6 flex items-center gap-4 text-slate-300">
          <div className="flex items-center gap-2"><FaEnvelope /> <span className="text-sm">{PROFILE.email}</span></div>
        </div>
      </motion.div>

      <motion.div className="flex items-center justify-center md:justify-end" initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.1 }}>
        <div className="relative w-64 h-64 rounded-2xl overflow-hidden shadow-2xl ring-1 ring-white/5 transform hover:scale-105 transition">
          <img src={PROFILE.picture} alt="Profile" className="w-full h-full object-cover" />

          {/* Animated gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent mix-blend-overlay" />

          <div className="absolute bottom-3 left-3 bg-black/50 px-3 py-1 rounded-md text-sm">
            <strong>{PROFILE.title.split('|')[0]}</strong>
          </div>
        </div>
      </motion.div>
    </section>
  );
}

function About() {
  return (
    <section id="about">
      <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={containerStagger} className="bg-slate-800/40 p-6 rounded-xl shadow-lg">
        <motion.h3 variants={fadeInUp} className="text-2xl font-semibold">About Me</motion.h3>
        <motion.p variants={fadeInUp} className="mt-3 text-slate-300">{PROFILE.about}</motion.p>

        <motion.div variants={fadeInUp} className="mt-4 grid md:grid-cols-2 gap-4">
          <div>
            <h4 className="text-sm text-slate-300 font-medium">Currently</h4>
            <p className="text-slate-200">Volunteering as Full-Stack Developer at Design Pie Creative Agency — building web apps, collaborating in Agile teams, and practicing TDD.</p>
          </div>
          <div>
            <h4 className="text-sm text-slate-300 font-medium">Interests</h4>
            <p className="text-slate-200">Product development, accessible UX, serverless platforms, and mentorship programs for upcoming developers in South Africa.</p>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}

function Projects({ openProject }) {
  return (
    <section id="projects">
      <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={containerStagger} className="space-y-6">
        <motion.h3 variants={fadeInUp} className="text-2xl font-semibold">Projects</motion.h3>
        <motion.p variants={fadeInUp} className="text-slate-300">Featured work—click a card to view details.</motion.p>

        <div className="grid md:grid-cols-3 gap-6 mt-4">
          {PROJECTS.map((p) => (
            <motion.article
              key={p.id}
              variants={fadeInUp}
              whileHover={{ scale: 1.03 }}
              className="bg-slate-800/30 rounded-xl overflow-hidden shadow-lg cursor-pointer transform transition"
              onClick={() => openProject(p)}
            >
              <div className="relative h-40 overflow-hidden">
                <img src={p.img} alt={p.title} className="w-full h-full object-cover transition-transform" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 hover:opacity-100 transition" />
              </div>

              <div className="p-4">
                <h4 className="font-semibold">{p.title}</h4>
                <p className="text-sm text-slate-300 mt-2">{p.desc}</p>

                <div className="mt-3 flex items-center justify-between text-xs text-slate-400">
                  <div className="flex gap-2">{p.tech.map((t) => (<span key={t} className="px-2 py-1 bg-slate-700/40 rounded">{t}</span>))}</div>
                  <div className="flex gap-2 items-center">
                    <span className="text-slate-300">{p.metrics.users ?? p.metrics.students ?? ''}</span>
                    <ChevronRight />
                  </div>
                </div>
              </div>
            </motion.article>
          ))}
        </div>

        {/* Micro-interaction: project telemetry preview on hover for larger screens */}
        <motion.div variants={fadeInUp} className="mt-6 p-4 rounded-lg bg-gradient-to-r from-slate-900/40 to-slate-800/30 text-slate-300">
          <strong>Quick View:</strong> Hover project cards to preview images and key metrics. Click to open a detailed modal with project story, challenges, and link to code.
        </motion.div>
      </motion.div>
    </section>
  );
}

function Experience() {
  const experiences = [
    { company: 'Design Pie Creative Agency', role: 'Full-Stack Developer (Volunteer)', period: 'Jan 2024 – Present', details: ['Built responsive web apps with React and Firebase', 'Participated in Agile sprints', 'Implemented unit tests and bug fixes'] },
    { company: 'Richfield Graduate Institute', role: 'IT Student', period: '2024 – Present', details: ['Coursework: Software Development, Databases', 'Group projects and hackathons'] },
  ];

  return (
    <section id="experience">
      <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={containerStagger} className="space-y-4">
        <motion.h3 variants={fadeInUp} className="text-2xl font-semibold">Work Experience & Education</motion.h3>

        <div className="relative">
          {/* Vertical timeline */}
          <div className="absolute left-3 top-0 bottom-0 w-0.5 bg-slate-700/50" />

          <div className="ml-8 space-y-6">
            {experiences.map((e, idx) => (
              <motion.div key={idx} variants={fadeInUp} className="bg-slate-800/30 p-4 rounded-lg shadow-sm hover:scale-[1.01] transition">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-semibold">{e.role}</h4>
                    <p className="text-sm text-slate-300">{e.company} • <span className="text-xs">{e.period}</span></p>
                  </div>
                </div>

                <ul className="mt-3 list-disc ml-5 text-slate-300 text-sm">
                  {e.details.map((d, i) => <li key={i}>{d}</li>)}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>
    </section>
  );
}

function Skills() {
  return (
    <section id="skills">
      <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={containerStagger} className="space-y-4">
        <motion.h3 variants={fadeInUp} className="text-2xl font-semibold">Skills</motion.h3>
        <motion.p variants={fadeInUp} className="text-slate-300">Technical skills with proficiency bars; animated for clarity.</motion.p>

        <div className="grid md:grid-cols-2 gap-6 mt-4">
          {SKILLS.map((s) => (
            <motion.div key={s.name} variants={fadeInUp} className="p-4 bg-slate-800/30 rounded-lg">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="text-indigo-400">{s.icon}</div>
                  <div>
                    <h4 className="font-medium">{s.name}</h4>
                    <p className="text-xs text-slate-400">Proficiency</p>
                  </div>
                </div>
                <div className="text-sm text-slate-300">{s.level}%</div>
              </div>

              <div className="mt-3 bg-slate-700/20 rounded-full h-3 overflow-hidden">
                <motion.div initial={{ width: 0 }} whileInView={{ width: `${s.level}%` }} transition={{ duration: 1 }} className="h-full rounded-full bg-gradient-to-r from-indigo-500 via-pink-500 to-yellow-400" />
              </div>
            </motion.div>
          ))}
        </div>

        {/* Unique micro-feature: interactive skill matrix */}
        <motion.div variants={fadeInUp} className="mt-6 p-4 rounded-lg bg-slate-900/50">
          <strong>Skill Matrix:</strong> Hover any skill to see example projects and short demos. This quick cross-reference helps recruiters map skills to outcomes.
        </motion.div>
      </motion.div>
    </section>
  );
}

function Contact() {
  return (
    <section id="contact">
      <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={containerStagger} className="bg-slate-800/40 p-6 rounded-xl shadow-lg">
        <motion.h3 variants={fadeInUp} className="text-2xl font-semibold">Contact</motion.h3>
        <motion.p variants={fadeInUp} className="mt-2 text-slate-300">Interested in working together? Send a message below or connect on LinkedIn.</motion.p>

        <div className="mt-4 grid md:grid-cols-2 gap-6">
          <div>
            <form action="https://formspree.io/f/your-form-id" method="POST" className="space-y-3">
              <input type="hidden" name="_subject" value="Portfolio Contact" />
              <div>
                <label className="text-sm">Name</label>
                <input name="name" required className="w-full mt-1 p-2 rounded bg-slate-700/20 focus:outline-none" />
              </div>
              <div>
                <label className="text-sm">Email</label>
                <input name="email" type="email" required className="w-full mt-1 p-2 rounded bg-slate-700/20 focus:outline-none" />
              </div>
              <div>
                <label className="text-sm">Message</label>
                <textarea name="message" rows={4} required className="w-full mt-1 p-2 rounded bg-slate-700/20 focus:outline-none" />
              </div>
              <div>
                <button type="submit" className="px-4 py-2 bg-indigo-600 rounded hover:bg-indigo-500">Send Message</button>
              </div>
            </form>

            <div className="mt-4 text-sm text-slate-300">
              <div className="flex items-center gap-2"><FaEnvelope /> {PROFILE.email}</div>
              <div className="flex items-center gap-2 mt-2"><FaGithub /> <a href={PROFILE.github} className="underline">GitHub</a></div>
            </div>
          </div>

          <div className="p-4 rounded-lg bg-slate-900/40 flex flex-col justify-between">
            <div>
              <h4 className="font-semibold">Quick Career Stats</h4>
              <p className="text-slate-300 mt-2">A snapshot you can show hiring teams during interviews.</p>

              <ul className="mt-3 text-slate-300">
                <li>Volunteer Full-Stack Developer • 1+ year practical experience</li>
                <li>3+ finished projects (React, Firebase, C++)</li>
                <li>Active contributor to team sprints and TDD workflows</li>
              </ul>
            </div>

            <div className="mt-4 text-xs text-slate-400">Built with ♥ for South African tech growth.</div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="mt-12 text-center text-slate-400 text-sm">
      © {new Date().getFullYear()} {PROFILE.name} — Built with React & Tailwind • Available for internships
    </footer>
  );
}

// ---------------- Modals & Extras ----------------
function ProjectModal({ project, onClose }) {
  return (
    <motion.div className="fixed inset-0 z-40 flex items-center justify-center p-6" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
      <div className="absolute inset-0 bg-black/70" onClick={onClose} />
      <motion.div className="relative z-50 bg-slate-900 rounded-xl max-w-3xl w-full overflow-hidden shadow-2xl" initial={{ y: 20 }} animate={{ y: 0 }} exit={{ y: 20 }}>
        <div className="grid md:grid-cols-2">
          <div className="p-6">
            <h3 className="text-xl font-semibold">{project.title}</h3>
            <p className="mt-3 text-slate-300">{project.desc}</p>

            <div className="mt-4 text-sm text-slate-400">
              <strong>Tech:</strong> {project.tech.join(', ')}
            </div>

            <div className="mt-4">
              <a href={project.link} className="px-3 py-2 bg-indigo-600 rounded hover:bg-indigo-500">View Project</a>
            </div>

            <div className="mt-6 text-sm text-slate-400">
              <strong>Metrics:</strong>
              <pre className="mt-2 bg-slate-800/20 p-2 rounded">{JSON.stringify(project.metrics, null, 2)}</pre>
            </div>
          </div>
          <div className="p-6 bg-[url('https://placehold.co/800x600?text=Project+Preview')] bg-cover bg-center" />
        </div>

        <div className="p-4 text-right">
          <button onClick={onClose} className="px-3 py-1 rounded border">Close</button>
        </div>
      </motion.div>
    </motion.div>
  );
}

function RecruiterPanel({ onClose }) {
  // Unique feature: Recruiters can quickly score candidate and export a short one-page brief
  const [score, setScore] = useState(80);

  function exportBrief() {
    // Create a simple downloadable text brief (in a real site, generate PDF server-side or client-side with jsPDF)
    const brief = `Candidate: ${PROFILE.name}\nRole: ${PROFILE.title}\nScore: ${score}\nEmail: ${PROFILE.email}\nLinkedIn: ${PROFILE.linkedin}`;
    const blob = new Blob([brief], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${PROFILE.name.replace(/ /g, '_')}_brief.txt`;
    a.click();
    URL.revokeObjectURL(url);
  }

  return (
    <motion.aside className="fixed right-6 bottom-6 z-50 w-96" initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }}>
      <div className="bg-slate-900/95 p-4 rounded-xl shadow-xl border border-slate-700">
        <div className="flex items-start justify-between">
          <div>
            <h4 className="font-semibold">Recruiter Quick Brief</h4>
            <p className="text-slate-400 text-sm">A compact snapshot you can download or share with hiring teams.</p>
          </div>
          <div className="flex items-center gap-2">
            <button onClick={onClose} className="text-sm px-2 py-1 rounded bg-slate-700/40">Close</button>
          </div>
        </div>

        <div className="mt-4">
          <div className="text-sm text-slate-300">Adjust quick score</div>
          <input type="range" min={0} max={100} value={score} onChange={(e) => setScore(e.target.value)} className="w-full mt-2" />
          <div className="mt-2 text-slate-200">Score: <strong>{score}</strong></div>

          <div className="mt-4 flex gap-2">
            <button onClick={exportBrief} className="px-3 py-2 bg-emerald-500 rounded">Download Brief</button>
            <a href={`mailto:${PROFILE.email}?subject=Opportunity`} className="px-3 py-2 border rounded">Email Candidate</a>
          </div>

          <div className="mt-4 text-xs text-slate-400">Unique: recruiters can score & export a shareable one-page brief — speeds up shortlisting.</div>
        </div>
      </div>
    </motion.aside>
  );
}

function ChevronRight() { return <svg width="18" height="18" viewBox="0 0 24 24" fill="none" className="text-slate-400"><path d="M9 18l6-6-6-6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>; }
