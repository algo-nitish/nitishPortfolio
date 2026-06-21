import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ReactLenis } from 'lenis/react';
import 'lenis/dist/lenis.css';
import { 
  Github, 
  Linkedin, 
  Mail, 
  ExternalLink, 
  Terminal, 
  Globe, 
  MessageSquare,
  Send,
  Menu,
  X,
  ChevronRight,
  Download,
  BookOpen,
  Award,
  Briefcase,
  Phone,
  Code,
  Layout,
  Settings,
  Star,
  Trophy,
  Heart,
  Languages,
  Gamepad2,
  Book,
  Users,
  Smile,
  Zap
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';

// --- Personal Data ---

const PERSONAL_INFO = {
  name: "Nitish Chauhan",
  role: "Third-Year B.Tech CSE (Data Science) Student",
  intro: "Third-year Computer Science student with hands-on experience in frontend and full-stack development, REST APIs, authentication systems, and responsive web applications. Strong foundation in DSA, OOPs, DBMS, Operating Systems, and software engineering. Passionate about building scalable applications and solving coding problems.",
  university: "Dr. A.P.J. Abdul Kalam Technical University (AKTU)",
  college: "ABES College of Engineering, Ghaziabad",
  duration: "2023 – 2027",
  cgpa: "7.6",
  email: "cnitish440@gmail.com",
  phone: "992-776-4287",
  location: "Ghaziabad, India",
  github: "https://github.com/AlgoNitish",
  linkedin: "https://linkedin.com/in/nitish-chauhan-dev",
};

const SKILLS = {
  languages: ["Java", "Python", "C", "C++", "JavaScript", "SQL", "HTML", "CSS"],
  frameworks: ["React.js", "Node.js", "Express.js"],
  databases: ["MongoDB", "MySQL", "PostgreSQL"],
  tools: ["Git", "GitHub", "Postman", "VS Code", "IntelliJ IDEA"],
  others: ["REST APIs", "JWT Authentication", "Responsive Web Design", "Debugging", "Testing", "Team Collaboration", "Agile Development", "Cloud Fundamentals", "AWS Basics"]
};

const PROJECTS = [
  {
    id: 1,
    title: "Full-Stack E-Commerce Platform",
    description: "A full-scale e-commerce solution with product listing, cart management, and order workflows.",
    contribution: "Developed REST APIs, managed state, and improved application efficiency by 10% through better debugging and API flow.",
    tech: ["React", "Node.js", "Express", "MongoDB"],
    image: "https://picsum.photos/seed/ecommerce/800/600",
    link: "#",
    github: "#",
    category: "Full Stack"
  },
  {
    id: 2,
    title: "Full-Stack Authentication App",
    description: "Secure authentication system with role-based access, session handling, and protected routes.",
    contribution: "Implemented JWT authentication, secure password storage, and backend validation with comprehensive error handling.",
    tech: ["React", "Node.js", "Express", "MongoDB", "JWT"],
    image: "https://picsum.photos/seed/auth/800/600",
    link: "#",
    github: "#",
    category: "Full Stack"
  },
  {
    id: 3,
    title: "Weather App",
    description: "Real-time weather information application with API integration and responsive UI.",
    contribution: "Integrated OpenWeather API, handled loading states and errors, and ensured a smooth user experience across devices.",
    tech: ["React", "OpenWeather API"],
    image: "https://picsum.photos/seed/weather/800/600",
    link: "#",
    github: "#",
    category: "Frontend"
  },
  {
    id: 4,
    title: "DSA Platform Tracker",
    description: "Java-based tool to track solved problems, difficulty levels, and topic-wise progress.",
    contribution: "Utilized Java Collections Framework and OOP concepts to implement sorting and searching features for problem tracking.",
    tech: ["Java", "Collections Framework"],
    image: "https://picsum.photos/seed/dsa/800/600",
    link: "#",
    github: "#",
    category: "Java"
  }
];

const EXPERIENCE = [
  {
    title: "Frontend Intern",
    company: "PBEL with IBM",
    period: "June 2025 – July 2025",
    description: "Worked on responsive frontend components using HTML, CSS, JavaScript, and React. Improved user workflows and frontend performance. Participated in testing, debugging, UI improvements, and feature integration.",
  },
  {
    title: "Web Development Intern",
    company: "AI Resume Builder",
    period: "November 2025 – February 2026",
    description: "Worked on an AI-powered resume builder platform. Implemented spell-check and text validation. Supported debugging, testing, API integration, and frontend-backend coordination.",
  }
];

const EDUCATION = [
  {
    university: "AKTU",
    college: "ABES College of Engineering",
    degree: "B.Tech in Computer Science & Engineering (Data Science)",
    year: "2023 – 2027",
    cgpa: "7.6",
    coursework: ["Data Structures & Algorithms", "Object-Oriented Programming", "DBMS", "Operating Systems", "Computer Networks", "Software Engineering", "Web Development", "Cloud Computing Fundamentals"]
  }
];

const ACHIEVEMENTS = [
  "Solved 500+ DSA problems on LeetCode, CodeChef, and GeeksforGeeks",
  "2-Star rating on CodeChef",
  "Strong focus on time complexity and optimization",
  "Built foundation in AWS concepts and cloud services"
];

const VOLUNTEERING = [
  {
    role: "Volunteer",
    org: "Light the Literacy NGO",
    description: "Help educate children in slums. Work with student teams on community initiatives. Developed strong teamwork, communication, and leadership skills."
  }
];

const EXTRA = {
  hobbies: ["Reading books", "Playing games", "Spending time with college friends"],
  interests: ["DSA", "Web Development", "Cloud Computing", "AWS", "Building full-stack projects"],
  languages: ["Hindi", "English", "Learning Welsh"],
  fun: [
    { name: "Favorite Cartoon", value: "Doraemon" },
    { name: "Favorite Gadgets", value: "Language Dumpling, Anywhere Door" }
  ]
};

const CATEGORIES = ["All", "Full Stack", "Frontend", "Java"];

// --- Components ---

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 glass border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <span className="text-xl font-bold tracking-tighter text-primary">ALGONITISH</span>
          </div>
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-6">
              {['About', 'Skills', 'Projects', 'Experience', 'Education', 'Contact'].map((item) => (
                <a
                  key={item}
                  href={`#${item.toLowerCase()}`}
                  className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
                >
                  {item}
                </a>
              ))}
            </div>
          </div>
          <div className="md:hidden">
            <Button variant="ghost" size="icon" onClick={() => setIsOpen(!isOpen)}>
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden glass border-t border-white/10"
          >
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              {['About', 'Skills', 'Projects', 'Experience', 'Education', 'Contact'].map((item) => (
                <a
                  key={item}
                  href={`#${item.toLowerCase()}`}
                  className="block px-3 py-2 rounded-md text-base font-medium text-muted-foreground hover:text-primary"
                  onClick={() => setIsOpen(false)}
                >
                  {item}
                </a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

const Hero = () => {
  return (
    <section id="about" className="pt-32 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
        >
          <Badge variant="secondary" className="mb-4">Third-Year B.Tech Student</Badge>
          <h1 className="text-5xl sm:text-7xl font-bold tracking-tight mb-6">
            Hi, I'm <span className="text-primary italic">{PERSONAL_INFO.name}</span>.
          </h1>
          <p className="text-xl text-muted-foreground mb-6 leading-relaxed">
            {PERSONAL_INFO.role} at <span className="text-foreground font-medium">{PERSONAL_INFO.college}</span>
          </p>
          <p className="text-lg text-muted-foreground mb-8 max-w-lg leading-relaxed">
            {PERSONAL_INFO.intro}
          </p>
          <div className="flex flex-wrap gap-4">
            <Button size="lg" className="rounded-full" asChild>
              <a href="#projects">View Projects <ChevronRight className="ml-2 h-4 w-4" /></a>
            </Button>
            <Button size="lg" variant="outline" className="rounded-full" asChild>
              <a href="#">Resume <Download className="ml-2 h-4 w-4" /></a>
            </Button>
          </div>
          <div className="mt-12 flex items-center gap-6">
            <a href={PERSONAL_INFO.github} target="_blank" rel="noreferrer" className="text-muted-foreground hover:text-primary transition-colors">
              <Github className="h-6 w-6" />
            </a>
            <a href={PERSONAL_INFO.linkedin} target="_blank" rel="noreferrer" className="text-muted-foreground hover:text-primary transition-colors">
              <Linkedin className="h-6 w-6" />
            </a>
            <a href={`mailto:${PERSONAL_INFO.email}`} className="text-muted-foreground hover:text-primary transition-colors">
              <Mail className="h-6 w-6" />
            </a>
          </div>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="relative"
        >
          <div className="aspect-square rounded-3xl overflow-hidden glass p-4">
            <img 
              src="https://picsum.photos/seed/nitishchauhan/800/800" 
              alt={PERSONAL_INFO.name} 
              className="w-full h-full object-cover rounded-2xl"
              referrerPolicy="no-referrer"
            />
          </div>
          <div className="absolute -top-4 -right-4 w-24 h-24 bg-primary/20 rounded-full blur-2xl animate-pulse" />
          <div className="absolute -bottom-8 -left-8 w-32 h-32 bg-secondary/20 rounded-full blur-3xl animate-pulse" />
        </motion.div>
      </div>
    </section>
  );
};

const Skills = () => {
  return (
    <section id="skills" className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="text-center mb-12">
        <h2 className="text-3xl sm:text-5xl font-bold tracking-tight mb-4">Technical Skills</h2>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          My technical toolkit for building modern applications and solving complex problems.
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card className="glass">
          <CardHeader>
            <Code className="h-8 w-8 text-primary mb-2" />
            <CardTitle>Languages</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-wrap gap-2">
            {SKILLS.languages.map(s => <Badge key={s} variant="secondary">{s}</Badge>)}
          </CardContent>
        </Card>
        <Card className="glass">
          <CardHeader>
            <Layout className="h-8 w-8 text-primary mb-2" />
            <CardTitle>Frameworks</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-wrap gap-2">
            {SKILLS.frameworks.map(s => <Badge key={s} variant="secondary">{s}</Badge>)}
          </CardContent>
        </Card>
        <Card className="glass">
          <CardHeader>
            <Settings className="h-8 w-8 text-primary mb-2" />
            <CardTitle>Tools & Others</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-wrap gap-2">
            {SKILLS.tools.concat(SKILLS.others).map(s => <Badge key={s} variant="secondary">{s}</Badge>)}
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

const Projects = () => {
  const [activeCategory, setActiveCategory] = useState("All");

  const filteredProjects = useMemo(() => {
    if (activeCategory === "All") return PROJECTS;
    return PROJECTS.filter(p => p.category === activeCategory);
  }, [activeCategory]);

  return (
    <section id="projects" className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="text-center mb-12">
        <h2 className="text-3xl sm:text-5xl font-bold tracking-tight mb-4">Projects</h2>
      </div>
      <div className="flex justify-center mb-12">
        <Tabs defaultValue="All" onValueChange={setActiveCategory} className="w-full max-w-xl">
          <TabsList className="grid grid-cols-4 h-auto p-1 glass">
            {CATEGORIES.map(cat => (
              <TabsTrigger key={cat} value={cat} className="text-xs sm:text-sm py-2">
                {cat}
              </TabsTrigger>
            ))}
          </TabsList>
        </Tabs>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <AnimatePresence mode="popLayout">
          {filteredProjects.map((project) => (
            <motion.div
              key={project.id}
              layout
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.4 }}
            >
              <Card className="glass overflow-hidden h-full flex flex-col group hover:border-primary/50 transition-colors">
                <div className="aspect-video overflow-hidden relative">
                  <img 
                    src={project.image} 
                    alt={project.title} 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-4">
                    <Button size="icon" variant="secondary" className="rounded-full"><ExternalLink className="h-4 w-4" /></Button>
                    <Button size="icon" variant="secondary" className="rounded-full"><Github className="h-4 w-4" /></Button>
                  </div>
                </div>
                <CardHeader>
                  <Badge variant="outline" className="w-fit mb-2">{project.category}</Badge>
                  <CardTitle className="text-xl">{project.title}</CardTitle>
                  <CardDescription className="line-clamp-2">{project.description}</CardDescription>
                </CardHeader>
                <CardContent className="flex-grow">
                  <p className="text-sm text-muted-foreground mb-4"><strong>Impact:</strong> {project.contribution}</p>
                  <div className="flex flex-wrap gap-2">
                    {project.tech.map(t => <Badge key={t} variant="secondary" className="text-[10px]">{t}</Badge>)}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </section>
  );
};

const Experience = () => {
  return (
    <section id="experience" className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="text-center mb-12">
        <h2 className="text-3xl sm:text-5xl font-bold tracking-tight mb-4">Internships</h2>
      </div>
      <div className="space-y-6">
        {EXPERIENCE.map((exp, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 }}
          >
            <Card className="glass">
              <CardHeader className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <CardTitle className="text-xl">{exp.title}</CardTitle>
                  <CardDescription className="text-primary font-medium">{exp.company}</CardDescription>
                </div>
                <Badge variant="secondary" className="w-fit">{exp.period}</Badge>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground leading-relaxed">{exp.description}</p>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

const Education = () => {
  return (
    <section id="education" className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        <div>
          <h2 className="text-3xl font-bold mb-8 flex items-center gap-3">
            <BookOpen className="text-primary" /> Education
          </h2>
          {EDUCATION.map((edu, i) => (
            <Card key={i} className="glass mb-6">
              <CardHeader>
                <CardTitle className="text-lg">{edu.college}</CardTitle>
                <CardDescription>{edu.degree}</CardDescription>
                <div className="flex justify-between items-center mt-2">
                  <span className="text-sm text-muted-foreground">{edu.year}</span>
                  <Badge variant="secondary">CGPA: {edu.cgpa}</Badge>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-3">Relevant Coursework</p>
                <div className="flex flex-wrap gap-2">
                  {edu.coursework.map(c => <Badge key={c} variant="outline" className="text-[10px]">{c}</Badge>)}
                </div>
              </CardContent>
            </Card>
          ))}
          
          <h2 className="text-3xl font-bold mt-12 mb-8 flex items-center gap-3">
            <Trophy className="text-primary" /> Achievements
          </h2>
          <div className="space-y-4">
            {ACHIEVEMENTS.map((ach, i) => (
              <Card key={i} className="glass p-4 flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                  <Zap className="h-5 w-5 text-primary" />
                </div>
                <p className="text-sm font-medium">{ach}</p>
              </Card>
            ))}
          </div>
        </div>
        
        <div>
          <h2 className="text-3xl font-bold mb-8 flex items-center gap-3">
            <Users className="text-primary" /> Leadership & Volunteering
          </h2>
          {VOLUNTEERING.map((v, i) => (
            <Card key={i} className="glass mb-8">
              <CardHeader>
                <CardTitle className="text-lg">{v.role}</CardTitle>
                <CardDescription className="text-primary">{v.org}</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground leading-relaxed">{v.description}</p>
              </CardContent>
            </Card>
          ))}

          <h2 className="text-3xl font-bold mb-8 flex items-center gap-3">
            <Smile className="text-primary" /> Extra Bits
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Card className="glass p-4">
              <div className="flex items-center gap-2 mb-3">
                <Gamepad2 className="h-4 w-4 text-primary" />
                <p className="text-xs text-muted-foreground uppercase tracking-wider font-bold">Hobbies</p>
              </div>
              <div className="flex flex-wrap gap-1">
                {EXTRA.hobbies.map(h => <Badge key={h} variant="secondary" className="text-[10px]">{h}</Badge>)}
              </div>
            </Card>
            <Card className="glass p-4">
              <div className="flex items-center gap-2 mb-3">
                <Languages className="h-4 w-4 text-primary" />
                <p className="text-xs text-muted-foreground uppercase tracking-wider font-bold">Languages</p>
              </div>
              <div className="flex flex-wrap gap-1">
                {EXTRA.languages.map(l => <Badge key={l} variant="secondary" className="text-[10px]">{l}</Badge>)}
              </div>
            </Card>
            <Card className="glass p-4 sm:col-span-2">
              <div className="flex items-center gap-2 mb-3">
                <Heart className="h-4 w-4 text-primary" />
                <p className="text-xs text-muted-foreground uppercase tracking-wider font-bold">Interests</p>
              </div>
              <div className="flex flex-wrap gap-1">
                {EXTRA.interests.map(i => <Badge key={i} variant="secondary" className="text-[10px]">{i}</Badge>)}
              </div>
            </Card>
            {EXTRA.fun.map((f, i) => (
              <Card key={i} className="glass p-4">
                <p className="text-xs text-muted-foreground mb-1 uppercase tracking-wider font-bold">{f.name}</p>
                <p className="text-sm font-medium">{f.value}</p>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

const Contact = () => {
  return (
    <section id="contact" className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
        <div>
          <h2 className="text-3xl sm:text-5xl font-bold tracking-tight mb-6">Let's <span className="text-primary italic">Connect</span>.</h2>
          <p className="text-xl text-muted-foreground mb-12">
            I'm always open to discussing new projects, creative ideas or opportunities to be part of your visions.
          </p>
          <div className="space-y-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-2xl glass flex items-center justify-center text-primary"><Mail className="h-6 w-6" /></div>
              <div><p className="text-sm text-muted-foreground">Email</p><p className="font-medium">{PERSONAL_INFO.email}</p></div>
            </div>
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-2xl glass flex items-center justify-center text-primary"><Phone className="h-6 w-6" /></div>
              <div><p className="text-sm text-muted-foreground">Phone</p><p className="font-medium">{PERSONAL_INFO.phone}</p></div>
            </div>
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-2xl glass flex items-center justify-center text-primary"><Linkedin className="h-6 w-6" /></div>
              <div><p className="text-sm text-muted-foreground">LinkedIn</p><p className="font-medium">/in/nitish-chauhan-dev</p></div>
            </div>
          </div>
        </div>
        <Card className="glass p-6 sm:p-8">
          <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2"><label className="text-sm font-medium">Name</label><Input placeholder="Your Name" className="bg-background/50" /></div>
              <div className="space-y-2"><label className="text-sm font-medium">Email</label><Input type="email" placeholder="your@email.com" className="bg-background/50" /></div>
            </div>
            <div className="space-y-2"><label className="text-sm font-medium">Message</label><Textarea placeholder="How can I help you?" className="min-h-[150px] bg-background/50" /></div>
            <Button className="w-full rounded-xl py-6 text-lg">Send Message <Send className="ml-2 h-4 w-4" /></Button>
          </form>
        </Card>
      </div>
    </section>
  );
};

export default function App() {
  return (
    <ReactLenis root>
      <div className="bg-abstract-gradient">
        <Navbar />
        <main>
          <Hero />
          <Skills />
          <Projects />
          <Experience />
          <Education />
          <Contact />
        </main>
        <footer className="py-12 border-t border-white/10 glass mt-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center gap-8 text-center md:text-left">
            <div className="flex items-center gap-2"><Terminal className="h-6 w-6 text-primary" /><span className="font-bold tracking-tighter">ALGONITISH</span></div>
            <p className="text-sm text-muted-foreground">© {new Date().getFullYear()} Nitish Chauhan. Built with React & Tailwind.</p>
            <div className="flex items-center gap-6">
              <a href={PERSONAL_INFO.github} target="_blank" rel="noreferrer" className="text-muted-foreground hover:text-primary transition-colors"><Github className="h-5 w-5" /></a>
              <a href={PERSONAL_INFO.linkedin} target="_blank" rel="noreferrer" className="text-muted-foreground hover:text-primary transition-colors"><Linkedin className="h-5 w-5" /></a>
              <a href={`mailto:${PERSONAL_INFO.email}`} className="text-muted-foreground hover:text-primary transition-colors"><Mail className="h-5 w-5" /></a>
            </div>
          </div>
        </footer>
      </div>
    </ReactLenis>
  );
}
