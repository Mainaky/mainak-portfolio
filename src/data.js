export const NAV_LINKS = ["Home", "About", "Skills", "Projects", "Experience", "Contact"];

export const SKILLS = [
  { name: "Python",              level: 88, cat: "Core Languages" },
  { name: "SQL",                 level: 82, cat: "Core Languages" },
  { name: "R",                   level: 72, cat: "Core Languages" },
  { name: "JavaScript",          level: 70, cat: "Core Languages" },
  { name: "Machine Learning",    level: 85, cat: "ML / DS" },
  { name: "Deep Learning / CNN", level: 80, cat: "ML / DS" },
  { name: "Statistical Modelling", level: 83, cat: "ML / DS" },
  { name: "TensorFlow / Keras",  level: 78, cat: "ML Libraries" },
  { name: "Scikit-Learn",        level: 80, cat: "ML Libraries" },
  { name: "NumPy & Pandas",      level: 86, cat: "ML Libraries" },
  { name: "OpenCV",              level: 74, cat: "ML Libraries" },
  { name: "MySQL / OracleDB",    level: 76, cat: "Databases" },
  { name: "MongoDB",             level: 72, cat: "Databases" },
  { name: "AWS (EC2/S3/Lambda)", level: 68, cat: "Cloud & Tools" },
  { name: "Git & GitHub",        level: 84, cat: "Cloud & Tools" },
];

export const PROJECTS = [
  {
    id: 1,
    title: "Brain Tumor Detection System",
    description:
      "Implemented CNN architectures for MRI image segmentation and multi-class brain tumor classification, supporting early clinical diagnosis with deep learning.",
    tech: ["Python", "TensorFlow/Keras", "OpenCV", "CNN"],
    color: "#7c6fff",
    emoji: "🧠",
    github: "https://github.com/Mainaky/Brain-Tumor-Detection",
    highlight: "CNN-based MRI segmentation · Multi-class classification",
    cat: "Deep Learning",
    focus: "Clinical AI & Medical Imaging",
    status: "Completed · Available on GitHub",
  },
  {
    id: 2,
    title: "Maze Solving Algorithms — ICICV 2026",
    description:
      "Comparative study of maze-solving algorithms in known & unknown environments, analysing time complexity, path optimality, and adaptability. Published at ICICV 2026.",
    tech: ["Algorithms", "Path Planning", "Performance Analysis", "Research"],
    color: "#00d4aa",
    emoji: "🔬",
    github: "https://github.com/Mainaky/-Maze-Solving-Algorithms-in-Known-and-Unknown-Environments",
    highlight: "Accepted & Published — ICICV 2026 International Conference",
    cat: "Published Research",
    focus: "Algorithm Analysis & Complexity",
    status: "Published · ICICV 2026",
  },
  {
    id: 3,
    title: "Air Pollution Monitoring System",
    description:
      "Real-time system that forecasts air pollution levels using statistical models and AI, delivering actionable environmental insights from live sensor data streams.",
    tech: ["Python", "Pandas", "Matplotlib", "Statistical AI"],
    color: "#ff8c42",
    emoji: "🌫️",
    highlight: "Real-time forecasting · Statistical + AI models",
    cat: "Environmental AI",
    focus: "Real-time Prediction & Forecasting",
    status: "Completed",
  },
  {
    id: 4,
    title: "Crop Disease Detection via IoT & ML",
    description:
      "Building an IoT-integrated pipeline for real-time crop disease detection — from sensor data acquisition to ML-based classification. Active semester research project.",
    tech: ["Python", "Machine Learning", "IoT Sensors", "Optimisation"],
    color: "#f4a261",
    emoji: "🌾",
    highlight: "Active R&D · IoT sensor pipeline · Real-time ML",
    cat: "Ongoing R&D",
    focus: "IoT + ML · Agricultural AI",
    status: "🔬 Active Semester Research",
  },
];

export const EXPERIENCE = [
  {
    icon: "🛰️",
    title: "ISRO Bharatiya Antariksh Hackathon 2025",
    org: "Indian Space Research Organisation · National Level",
    year: "2025",
    color: "#7c6fff",
    link: "https://github.com/Mainaky/Bharatiya-Antariksh-Hackathon---2025",
    bullets: [
      "Nationally shortlisted to develop an AI-driven solution for real-world space and environmental challenges.",
      "Awarded ISRO Certificate of Acknowledgement for the submitted work.",
    ],
  },
  {
    icon: "📄",
    title: "Research Paper — ICICV 2026 (Accepted & Published)",
    org: "NIIT University · Co-Author · Guided by Prof. Sweta Malwe",
    year: "2026",
    color: "#00d4aa",
    bullets: [
      "Co-authored and published at the International Conference on Innovative Computing and Communications (ICICV) 2026.",
      "Research: comparative analysis of maze-solving algorithms across dynamic environments.",
    ],
  },
  {
    icon: "📐",
    title: "Club Coordinator — Ramanujan Mathematics Club",
    org: "NIIT University · RMC",
    year: "Ongoing",
    color: "#f4a261",
    bullets: [
      "Organised mathematical quizzes and analytical events to promote quantitative thinking among students.",
    ],
  },
];

export const ABOUT_CARDS = [
  { label: "University", val: "NIIT University, Neemrana",   icon: "🎓" },
  { label: "Degree",     val: "B.Tech CSE — Data Science",   icon: "📚" },
  { label: "Year",       val: "2023 – 2027 · Final Year",    icon: "📅" },
  { label: "CGPA",       val: "7.55 / 10",                   icon: "⭐" },
  { label: "Location",   val: "Neemrana, Rajasthan, IN",     icon: "📍" },
  { label: "Status",     val: "Open to placements · 2027",   icon: "🚀" },
];

export const SOCIAL = [
  { name: "GitHub",   icon: "GH", url: "https://github.com/Mainaky" },
  { name: "LinkedIn", icon: "in", url: "https://www.linkedin.com/in/mainak-roy-7415b2258/" },
  { name: "Email",    icon: "@",  url: "mailto:mainak.roy23@st.niituniversity.in" },
];
