import React, { useState, useMemo, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'motion/react';
import { ReactLenis } from 'lenis/react';
import 'lenis/dist/lenis.css';
import html2canvas from 'html2canvas';
import { jsPDF } from 'jspdf';
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
  Zap,
  CheckCircle2,
  Eye,
  FileText,
  Loader2,
  AlertCircle
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';

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
  github: "https://github.com/algo-nitish",
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
    title: "Backend Authentication API",
    description: "Secure, production-ready backend authentication system featuring JWT, session handling, password hashing, and role-based access control.",
    contribution: "Designed database models, implemented secure route protection middleware, and structured robust error-handling mechanisms.",
    tech: ["Node.js", "Express.js", "MongoDB", "JWT", "bcrypt"],
    image: "https://picsum.photos/seed/auth/800/600",
    link: "#",
    github: "https://github.com/algo-nitish/Mern-AuthenApp",
    category: "Backend"
  },
  {
    id: 3,
    title: "Weather App",
    description: "Real-time weather information application with API integration and responsive UI.",
    contribution: "Integrated OpenWeather API, handled loading states and errors, and ensured a smooth user experience across devices.",
    tech: ["React.js", "Tailwind CSS", "OpenWeather API"],
    image: "https://picsum.photos/seed/weather/800/600",
    link: "#",
    github: "#",
    category: "Frontend"
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

const CATEGORIES = ["All", "Full Stack", "Frontend", "Backend"];

const ResumeModal = () => {
  const resumeRef = useRef(null);
  const [isDownloading, setIsDownloading] = useState(false);

  const handleDownload = async () => {
    if (!resumeRef.current) return;
    setIsDownloading(true);
    try {
      const element = resumeRef.current;
      const canvas = await html2canvas(element, {
        scale: 2,
        useCORS: true,
        logging: false,
        backgroundColor: '#ffffff'
      });
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('p', 'mm', 'a4');
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (canvas.height * pdfWidth) / canvas.width;
      pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
      pdf.save('Nitish_Chauhan_Resume.pdf');
    } catch (error) {
      console.error('Error generating PDF:', error);
    } finally {
      setIsDownloading(false);
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button size="lg" variant="outline" className="rounded-full group">
          <FileText className="mr-2 h-4 w-4 group-hover:scale-110 transition-transform" />
          View Resume
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto glass border-white/20">
        <DialogHeader className="flex flex-row items-center justify-between pr-8">
          <DialogTitle className="text-2xl font-bold flex items-center gap-2">
            <FileText className="text-primary" /> Nitish Chauhan - Resume
          </DialogTitle>
          <Button
            onClick={handleDownload}
            disabled={isDownloading}
            variant="secondary"
            size="sm"
            className="rounded-full"
          >
            {isDownloading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Download className="h-4 w-4" />}
            <span className="ml-2 hidden sm:inline">{isDownloading ? 'Generating...' : 'Download PDF'}</span>
          </Button>
        </DialogHeader>
        <div ref={resumeRef} className="bg-white text-black p-8 sm:p-12 rounded-xl shadow-2xl font-sans leading-relaxed">
          {/* Resume Header */}
          <div className="text-center border-b-2 border-black pb-6 mb-8">
            <h1 className="text-4xl font-bold uppercase tracking-tighter mb-2">Nitish Chauhan</h1>
            <div className="flex flex-wrap justify-center gap-x-4 gap-y-1 text-sm font-medium">
              <span className="flex items-center gap-1"><Phone className="h-3 w-3" /> 992-776-4287</span>
              <span className="flex items-center gap-1"><Mail className="h-3 w-3" /> cnitish440@gmail.com</span>
              <span className="flex items-center gap-1"><Linkedin className="h-3 w-3" /> linkedin.com/in/nitish-chauhan-dev</span>
              <span className="flex items-center gap-1"><Github className="h-3 w-3" /> github.com/algo-nitish</span>
            </div>
          </div>

          {/* Professional Summary */}
          <section className="mb-8">
            <h2 className="text-xl font-bold uppercase border-b border-gray-300 mb-3">Professional Summary</h2>
            <p className="text-sm text-gray-700">
              Third-year Computer Science student with hands-on experience in frontend and full-stack development, REST APIs, authentication systems, and responsive web applications. Strong foundation in data structures, algorithms, object-oriented programming, debugging, and software engineering principles. Experienced in collaborating on team projects, implementing features, solving technical problems, and building scalable applications using React, Node.js, Express, MongoDB, and Java.
            </p>
          </section>

          {/* Education */}
          <section className="mb-8">
            <h2 className="text-xl font-bold uppercase border-b border-gray-300 mb-3">Education</h2>
            <div className="flex justify-between items-start mb-1">
              <h3 className="font-bold">Dr. A.P.J. Abdul Kalam Technical University (AKTU)</h3>
              <span className="text-sm font-bold">Sept. 2023 – Sept. 2027</span>
            </div>
            <div className="flex justify-between items-start italic text-sm mb-2">
              <span>Bachelor of Technology in Computer Science & Engineering (Data Science)</span>
              <span>CGPA: 7.6</span>
            </div>
            <p className="text-xs text-gray-600">
              <strong>Relevant Coursework:</strong> Data Structures & Algorithms, Object-Oriented Programming, Database Management Systems, Operating Systems, Computer Networks, Software Engineering, Web Development, Cloud Computing Fundamentals
            </p>
          </section>

          {/* Experience */}
          <section className="mb-8">
            <h2 className="text-xl font-bold uppercase border-b border-gray-300 mb-3">Experience</h2>
            <div className="mb-4">
              <div className="flex justify-between items-start mb-1">
                <h3 className="font-bold">PBEL with IBM</h3>
                <span className="text-sm font-bold">23 June 2025 – 23 July 2025</span>
              </div>
              <p className="italic text-sm mb-2">Frontend Intern | Paid Internship</p>
              <ul className="list-disc list-outside ml-4 text-sm text-gray-700 space-y-1">
                <li>Developed responsive frontend components using HTML, CSS, JavaScript, and React to improve user-facing workflows and application usability.</li>
                <li>Worked closely with mentors and team members to understand requirements, implement features, debug issues, and improve frontend performance.</li>
                <li>Participated in testing, code reviews, and UI improvements to ensure smooth feature integration and better user experience.</li>
              </ul>
            </div>
            <div>
              <div className="flex justify-between items-start mb-1">
                <h3 className="font-bold">AI Resume Builder</h3>
                <span className="text-sm font-bold">10 Nov. 2025 – 10 Feb. 2026</span>
              </div>
              <p className="italic text-sm mb-2">Web Development Intern | Unpaid</p>
              <ul className="list-disc list-outside ml-4 text-sm text-gray-700 space-y-1">
                <li>Collaborated with a development team to build and improve features for an AI-powered resume builder platform.</li>
                <li>Implemented spell-check and text validation functionality to improve resume quality, content accuracy, and user experience.</li>
                <li>Supported debugging, testing, and API integration tasks to improve application reliability and overall performance.</li>
              </ul>
            </div>
          </section>

          {/* Projects */}
          <section className="mb-8">
            <h2 className="text-xl font-bold uppercase border-b border-gray-300 mb-3">Projects</h2>
            <div className="mb-4">
              <h3 className="font-bold text-sm">Full-Stack E-Commerce Platform | <span className="font-normal italic">React, Node.js, Express, MongoDB</span></h3>
              <ul className="list-disc list-outside ml-4 text-sm text-gray-700 space-y-1">
                <li>Built a full-stack e-commerce application with product listings, cart management, authentication, and order workflows.</li>
                <li>Designed and integrated REST APIs for product management, user authentication, and order handling.</li>
                <li>Improved application efficiency by 10% through debugging, optimized API flow, and better state management.</li>
              </ul>
            </div>
            <div className="mb-4">
              <h3 className="font-bold text-sm">Backend Authentication API | <span className="font-normal italic">Node.js, Express.js, MongoDB, JWT, bcrypt</span></h3>
              <ul className="list-disc list-outside ml-4 text-sm text-gray-700 space-y-1">
                <li>Developed a secure backend authentication system using JWT, session management, and role-based access control.</li>
                <li>Designed MongoDB schemas, implemented secure hashing with bcrypt, and set up protected route middlewares.</li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold text-sm">Weather App | <span className="font-normal italic">React.js, Tailwind CSS, OpenWeather API</span></h3>
              <ul className="list-disc list-outside ml-4 text-sm text-gray-700 space-y-1">
                <li>Created a real-time weather tracking application with clean dashboard visualization and dynamically updating assets.</li>
                <li>Integrated external API endpoints and optimized client-side state caching for better user loading experience.</li>
              </ul>
            </div>
          </section>

          {/* Technical Skills */}
          <section>
            <h2 className="text-xl font-bold uppercase border-b border-gray-300 mb-3">Technical Skills</h2>
            <div className="text-sm space-y-1">
              <p><strong>Programming Languages:</strong> Java, Python, C, C++, JavaScript, SQL, HTML, CSS</p>
              <p><strong>Frameworks & Libraries:</strong> React.js, Node.js, Express.js</p>
              <p><strong>Databases:</strong> MongoDB, MySQL, PostgreSQL</p>
              <p><strong>Developer Tools:</strong> Git, GitHub, Postman, VS Code, IntelliJ IDEA</p>
              <p><strong>Core CS Concepts:</strong> DSA, OOPs, DBMS, Operating Systems, Computer Networks, Software Engineering</p>
            </div>
          </section>
        </div>
      </DialogContent>
    </Dialog>
  );
};

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
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <section id="about" ref={containerRef} className="pt-32 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto overflow-hidden">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <motion.div
          style={{ opacity }}
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
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button size="lg" className="rounded-full shadow-lg shadow-primary/20" asChild>
                <a href="#projects">View Projects <ChevronRight className="ml-2 h-4 w-4" /></a>
              </Button>
            </motion.div>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <ResumeModal />
            </motion.div>
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
          style={{ y }}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="relative"
        >
          <div className="aspect-square rounded-3xl overflow-hidden glass p-4">
            <img
              src="/profile.png"
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
        <Tabs defaultValue="All" onValueChange={setActiveCategory} className="w-full max-w-xl mx-auto">
          <TabsList className="grid grid-cols-4 h-auto p-1 glass w-full">
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
                    <Button size="icon" variant="secondary" className="rounded-full" asChild><a href={project.link}><ExternalLink className="h-4 w-4" /></a></Button>
                    <Button size="icon" variant="secondary" className="rounded-full" asChild><a href={project.github}><Github className="h-4 w-4" /></a></Button>
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
  const [status, setStatus] = useState('idle');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('submitting');

    const form = e.currentTarget;
    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries());

    // Construct mailto link as a fallback
    const mailtoLink = `mailto:cnitish440@gmail.com?subject=Portfolio Contact from ${data.name}&body=${data.message}%0D%0A%0D%0AFrom: ${data.email}`;

    try {
      // Using a more reliable service for form submission
      const response = await fetch("https://formspree.io/f/xovjqqre", {
        method: "POST",
        body: formData,
        headers: {
          'Accept': 'application/json'
        }
      });

      if (response.ok) {
        setStatus('success');
        form.reset();
        setTimeout(() => setStatus('idle'), 5000);
      } else {
        // Fallback to mailto if API fails
        window.location.href = mailtoLink;
        setStatus('success');
      }
    } catch (error) {
      // Fallback to mailto on network error
      window.location.href = mailtoLink;
      setStatus('success');
    }
  };

  return (
    <section id="contact" className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl sm:text-5xl font-bold tracking-tight mb-6">Let's <span className="text-primary italic">Connect</span>.</h2>
          <p className="text-xl text-muted-foreground mb-12">
            I'm always open to discussing new projects, creative ideas or opportunities to be part of your visions.
          </p>
          <div className="space-y-6">
            {[
              { icon: Mail, label: 'Email', value: PERSONAL_INFO.email },
              { icon: Phone, label: 'Phone', value: PERSONAL_INFO.phone },
              { icon: Linkedin, label: 'LinkedIn', value: '/in/nitish-chauhan-dev' }
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="flex items-center gap-4 group"
              >
                <div className="w-12 h-12 rounded-2xl glass flex items-center justify-center text-primary group-hover:scale-110 transition-transform">
                  <item.icon className="h-6 w-6" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">{item.label}</p>
                  <p className="font-medium">{item.value}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
        >
          <Card className="glass p-6 sm:p-8 relative overflow-hidden">
            <AnimatePresence mode="wait">
              {status === 'success' ? (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  className="flex flex-col items-center justify-center py-12 text-center"
                >
                  <div className="w-20 h-20 rounded-full bg-primary/20 flex items-center justify-center mb-6">
                    <CheckCircle2 className="h-10 w-10 text-primary animate-bounce" />
                  </div>
                  <h3 className="text-2xl font-bold mb-2">Message Sent!</h3>
                  <p className="text-muted-foreground">Thank you for reaching out. I'll get back to you soon.</p>
                  <Button variant="ghost" className="mt-6" onClick={() => setStatus('idle')}>Send another message</Button>
                </motion.div>
              ) : (
                <motion.form
                  key="form"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="space-y-4"
                  onSubmit={handleSubmit}
                >
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Name</label>
                      <Input name="name" required placeholder="Your Name" className="bg-background/50 focus:ring-primary" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Email</label>
                      <Input name="email" type="email" required placeholder="your@email.com" className="bg-background/50 focus:ring-primary" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Message</label>
                    <Textarea name="message" required placeholder="How can I help you?" className="min-h-[150px] bg-background/50 focus:ring-primary" />
                  </div>
                  {status === 'error' && (
                    <div className="flex items-center gap-2 text-destructive text-sm bg-destructive/10 p-3 rounded-lg">
                      <AlertCircle className="h-4 w-4" />
                      <span>Something went wrong. Please try again or use the email link.</span>
                    </div>
                  )}
                  <Button
                    type="submit"
                    disabled={status === 'submitting'}
                    className="w-full rounded-xl py-6 text-lg group relative overflow-hidden"
                  >
                    <span className="relative z-10 flex items-center">
                      {status === 'submitting' ? 'Sending...' : 'Send Message'}
                      <Send className={`ml-2 h-4 w-4 transition-transform ${status === 'submitting' ? 'translate-x-10 opacity-0' : 'group-hover:translate-x-1 group-hover:-translate-y-1'}`} />
                    </span>
                    <motion.div
                      className="absolute inset-0 bg-primary-foreground/10"
                      initial={{ x: '-100%' }}
                      whileHover={{ x: '100%' }}
                      transition={{ duration: 0.5 }}
                    />
                  </Button>
                </motion.form>
              )}
            </AnimatePresence>
          </Card>
        </motion.div>
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
