/**
 * Betty's knowledge base — everything about Betelhem Nurlachew.
 * Each entry has a set of trigger keywords and a response.
 * Betty picks the best matching entry and falls back to a default.
 */

export interface KnowledgeEntry {
  id: string
  keywords: string[]
  response: string
}

export const knowledge: KnowledgeEntry[] = [
  // ── Identity ──────────────────────────────────────────────────────────────
  {
    id: 'name',
    keywords: ['name', 'who', 'you', 'introduce', 'yourself', 'betty', 'betelhem'],
    response:
      "Hi! I'm **Betty** 👋 — Betelhem's personal AI assistant.\n\nBetelhem Nurlachew is a third-year Software Engineering student at Addis Ababa Science and Technology University (AASTU), Ethiopia. She is passionate about full-stack web development, mobile apps, and AI/ML.\n\nAsk me anything about her skills, projects, or how to contact her!",
  },
  {
    id: 'location',
    keywords: ['location', 'where', 'country', 'city', 'ethiopia', 'addis', 'addis ababa', 'live', 'based'],
    response:
      "Betelhem is based in **Addis Ababa, Ethiopia** 🇪🇹. She studies at Addis Ababa Science and Technology University (AASTU).",
  },

  // ── Education ─────────────────────────────────────────────────────────────
  {
    id: 'education',
    keywords: ['education', 'university', 'degree', 'study', 'student', 'aastu', 'school', 'college', 'academic', 'graduation', 'graduate'],
    response:
      "🎓 **Education**\n\n- **Degree:** BSc in Software Engineering\n- **University:** Addis Ababa Science and Technology University (AASTU)\n- **Year:** Third-Year Student\n- **Started:** October 2024\n- **Location:** Addis Ababa, Ethiopia\n\nShe has completed courses across mathematics, programming, databases, digital logic, and networking, earning strong grades including several A and A+ results.",
  },
  {
    id: 'grades',
    keywords: ['grade', 'gpa', 'marks', 'score', 'result', 'cgpa', 'transcript', 'record', 'courses', 'course'],
    response:
      "📊 **Academic Highlights**\n\nBetelhem has completed Year 1 and Year 2 coursework (71 credit hours) with strong results:\n\n- Anthropology, Psychology, Entrepreneurship, Geography → **A+**\n- General Mathematics, Logic, History → **A**\n- Intro to Software Engineering, Fundamentals of Programming II, Digital Logic, Economics → **A**\n- Physics, Applied Mathematics, Civics, Emerging Technology → **A−**\n- Discrete Mathematics, Fundamentals of Programming I, Database Systems, Networks → **B+**\n\nCheck the Education section of this portfolio for the full table!",
  },

  // ── Skills ────────────────────────────────────────────────────────────────
  {
    id: 'skills',
    keywords: ['skill', 'technology', 'tech', 'stack', 'know', 'language', 'programming', 'tools', 'expertise'],
    response:
      "💻 **Technical Skills**\n\n**Web:** HTML (85%), CSS (80%), JavaScript (60%), TypeScript (30%)\n**Programming:** Python (55%), C++ (45%), Java (40%), Dart (35%)\n**Mobile:** Flutter (40%), Mobile UI/UX (50%)\n**Databases:** SQLite (55%), MySQL (50%), MongoDB (30%), Supabase (25%)\n**AI/ML:** NumPy/Pandas (35%), Semantic Search (30%), AI fundamentals (25%)\n**Tools:** VS Code (80%), Git/GitHub (65%), Figma (55%), Vercel (50%), Google Colab (45%)\n\n*These are honest self-assessments based on coursework and personal projects.*",
  },
  {
    id: 'html_css',
    keywords: ['html', 'css', 'web', 'frontend', 'front-end', 'design', 'ui', 'interface'],
    response:
      "🌐 **Web Development**\n\nBetelhem has strong HTML (85%) and CSS (80%) skills, and is actively developing her JavaScript (60%) and TypeScript (30%) abilities. She can build responsive, accessible web interfaces and understands UI/UX design principles through her Figma experience.",
  },
  {
    id: 'python',
    keywords: ['python', 'machine learning', 'ml', 'ai', 'artificial intelligence', 'data', 'numpy', 'pandas', 'tensorflow', 'opencv', 'mediapipe'],
    response:
      "🐍 **Python & AI/ML**\n\nBetelhem uses Python (55%) for data processing, scripting, and AI-related work. She has experience with NumPy, Pandas, OpenCV, and MediaPipe — particularly in the Fikr Sign project where she worked on sign-language recognition pipelines.",
  },
  {
    id: 'flutter',
    keywords: ['flutter', 'dart', 'mobile', 'app', 'android', 'ios', 'cross-platform'],
    response:
      "📱 **Flutter & Mobile**\n\nBetelhem builds cross-platform mobile apps with **Flutter + Dart** (40% proficiency). Her main mobile project is **Fikr Sign** — an Ethiopian Sign Language app for deaf and hearing communication, where she handled UI/UX design and API integration.",
  },
  {
    id: 'cpp',
    keywords: ['c++', 'cpp', 'c plus plus', 'traffic', 'sqlite'],
    response:
      "⚙️ **C++**\n\nBetelhem has studied C++ (45%) and built the **Adaptive Traffic Signal Management System** — a C++ application that manages intersections based on traffic conditions and prioritises emergency vehicles, with SQLite for data storage.",
  },

  // ── Projects ──────────────────────────────────────────────────────────────
  {
    id: 'projects',
    keywords: ['project', 'build', 'built', 'work', 'portfolio', 'app', 'application', 'made', 'created'],
    response:
      "🚀 **Projects**\n\n1. **DishDecide – Ethiopian Meal Picker**\nHelps users choose Ethiopian meals based on fasting preferences, budget, and categories. Live at [dish-decide-application.vercel.app](https://dish-decide-application.vercel.app/) · Tech: HTML, CSS, JavaScript\n\n2. **Fikr Sign**\nMobile app for deaf-hearing communication via Ethiopian Sign Language. GitHub: [fikir300/FikirSign](https://github.com/fikir300/FikirSign) · Tech: Flutter, Dart, Python, FastAPI, AWS\n\n3. **Adaptive Traffic Signal Management System**\nManages traffic signals based on real-time conditions and prioritises emergency vehicles · Tech: C++, SQLite",
  },
  {
    id: 'dishdecide',
    keywords: ['dishdecide', 'dish decide', 'dish', 'food', 'meal', 'ethiopian food', 'fasting', 'budget'],
    response:
      "🍛 **DishDecide – Ethiopian Meal Picker**\n\nA web app that helps users choose Ethiopian meals based on:\n- Fasting or non-fasting preferences\n- Meal categories\n- Budget tracking (auto-deducts meal costs)\n- Favourite meal saving\n- Avatar customisation\n\n🔗 **Live Demo:** [dish-decide-application.vercel.app](https://dish-decide-application.vercel.app/)\n\n**Tech:** HTML, CSS, JavaScript, LocalStorage",
  },
  {
    id: 'fikrsign',
    keywords: ['fikr', 'fikrsign', 'sign', 'sign language', 'deaf', 'hearing', 'accessibility', 'aws', 'fastapi'],
    response:
      "🤟 **Fikr Sign**\n\nAn Ethiopian Sign Language mobile app designed to bridge communication between deaf patients and healthcare professionals.\n\n**Betelhem's contributions:**\n- UI/UX design and prototyping in Figma\n- Mobile app development with Flutter/Dart\n- FastAPI backend integration\n- AWS deployment setup\n\n🔗 **GitHub:** [github.com/fikir300/FikirSign](https://github.com/fikir300/FikirSign)",
  },
  {
    id: 'traffic',
    keywords: ['traffic', 'signal', 'adaptive', 'emergency', 'vehicle', 'intersection', 'c++'],
    response:
      "🚦 **Adaptive Traffic Signal Management System**\n\nA C++ system that:\n- Monitors real-time traffic conditions at intersections\n- Dynamically adjusts signal timings to improve flow\n- Detects and prioritises emergency vehicles\n- Stores state data with SQLite\n\n**Tech:** C++, SQLite, Git",
  },

  // ── Contact & Availability ─────────────────────────────────────────────────
  {
    id: 'contact',
    keywords: ['contact', 'email', 'reach', 'message', 'hire', 'connect', 'touch', 'talk', 'send'],
    response:
      "📬 **Contact Betelhem**\n\n- **Email:** [bettynure1@gmail.com](mailto:bettynure1@gmail.com)\n- **GitHub:** [github.com/Betty-1219](https://github.com/Betty-1219)\n- **LinkedIn:** [linkedin.com/in/betelhem-nurlachw-tech](https://www.linkedin.com/in/betelhem-nurlachw-tech)\n- **Location:** Addis Ababa, Ethiopia\n\nOr use the **Contact section** on this page to send a message directly — I'll make sure she gets it! 😊",
  },
  {
    id: 'availability',
    keywords: ['available', 'hire', 'intern', 'internship', 'freelance', 'job', 'opportunity', 'open', 'work for', 'employ'],
    response:
      "💼 **Availability**\n\nBetelhem is available for **internships and freelance web projects from June 2027** as she progresses through her degree at AASTU.\n\nIf you have an opportunity, feel free to reach out at [bettynure1@gmail.com](mailto:bettynure1@gmail.com) or via LinkedIn!",
  },
  {
    id: 'cv',
    keywords: ['cv', 'resume', 'download', 'curriculum'],
    response:
      "📄 **CV / Resume**\n\nYou can download Betelhem's CV directly from this portfolio using the **Download CV** button in the Hero section at the top of the page.",
  },
  {
    id: 'github',
    keywords: ['github', 'repository', 'repo', 'code', 'source'],
    response:
      "🐙 **GitHub**\n\nBetelhem's GitHub profile: [github.com/Betty-1219](https://github.com/Betty-1219)\n\nYou'll find her project repositories there, including DishDecide and contributions to Fikr Sign.",
  },
  {
    id: 'linkedin',
    keywords: ['linkedin', 'professional', 'network'],
    response:
      "💼 **LinkedIn**\n\nBetelhem's LinkedIn profile: [linkedin.com/in/betelhem-nurlachw-tech](https://www.linkedin.com/in/betelhem-nurlachw-tech)\n\nFeel free to connect with her there!",
  },

  // ── Personality / Fun ──────────────────────────────────────────────────────
  {
    id: 'interests',
    keywords: ['interest', 'hobby', 'passion', 'like', 'love', 'enjoy', 'fun', 'outside', 'free time'],
    response:
      "✨ **Interests & Passions**\n\nBetelhem loves:\n- Learning new technologies and turning ideas into real software\n- UI/UX design and crafting beautiful user experiences\n- Exploring AI and Machine Learning concepts\n- Reading — she recommends *Atomic Habits* by James Clear\n- Building apps that solve real problems in her community\n\nHer favourite quote: *\"Great things are done by a series of small things brought together.\"*",
  },
  {
    id: 'goals',
    keywords: ['goal', 'dream', 'future', 'plan', 'aspire', 'aspiration', 'want to be', 'career'],
    response:
      "🎯 **Goals & Aspirations**\n\nBetelhem's goal is to become a skilled **full-stack developer** who builds software that makes a real difference. She is especially interested in:\n\n- Full-stack web development (React, Django/FastAPI)\n- Cross-platform mobile development (Flutter)\n- AI/ML applications for African contexts\n- Accessibility technology (like Fikr Sign)\n\nShe expects to graduate from AASTU in 2030.",
  },
  {
    id: 'hello',
    keywords: ['hello', 'hi', 'hey', 'hii', 'helo', 'good morning', 'good afternoon', 'good evening', 'greetings', 'sup', 'howdy'],
    response:
      "Hello! 👋 I'm **Betty**, Betelhem's personal AI assistant.\n\nI can answer questions about Betelhem's skills, projects, education, contact info, and more. What would you like to know?",
  },
  {
    id: 'certificates',
    keywords: ['certificate', 'certification', 'course', 'udacity', 'sololearn', 'aws', 'credential', 'training', 'completed', 'achievement'],
    response:
      "🏆 **Certificates & Achievements**\n\nBetelhem has earned **7 certificates** so far:\n\n**AWS / AASTU**\n- Certificate of Appreciation — AWS Student Builders Group Volunteer (Nov 2026)\n\n**Sololearn**\n- Machine Learning for Beginners (Nov 6, 2026) — CC-OQ5CI1YK\n- Introduction to Python (Nov 22, 2026) — CC-SKEXYMWU\n\n**Udacity** (all December 20, 2024)\n- Android Developer Fundamentals\n- Artificial Intelligence Fundamentals\n- Data Analysis Fundamentals\n- Programming Fundamentals\n\nSee the **Certificates section** on this page to view each one!",
  },
  {
    id: 'thanks',
    keywords: ['thank', 'thanks', 'thank you', 'appreciate', 'helpful', 'great', 'awesome', 'nice'],
    response:
      "You're welcome! 😊 Feel free to ask me anything else about Betelhem. If you'd like to get in touch with her directly, use the Contact section or email **bettynure1@gmail.com**.",
  },
  {
    id: 'help',
    keywords: ['help', 'what can you', 'what do you', 'capabilities', 'can you', 'tell me about', 'question'],
    response:
      "🤖 I'm **Betty** and I know everything about Betelhem Nurlachew! You can ask me about:\n\n- 👩‍💻 **Skills** — programming languages, frameworks, tools\n- 🚀 **Projects** — DishDecide, Fikr Sign, Traffic System\n- 🎓 **Education** — AASTU, courses, grades\n- 📜 **Certificates** — Udacity, Sololearn, AWS\n- 📬 **Contact** — email, GitHub, LinkedIn\n- 💼 **Availability** — internships, freelance\n- ✨ **Interests & Goals** — what drives her\n\nJust type your question naturally!",
  },
]

// ── Matcher ────────────────────────────────────────────────────────────────

/**
 * Find the best matching knowledge entry for a given user input.
 * Returns null when nothing matches well enough.
 */
export function findAnswer(input: string): string | null {
  const lower = input.toLowerCase().trim()
  if (!lower) return null

  // Score every entry by how many of its keywords appear in the input
  let bestScore = 0
  let bestEntry: KnowledgeEntry | null = null

  for (const entry of knowledge) {
    let score = 0
    for (const kw of entry.keywords) {
      if (lower.includes(kw)) {
        // Longer keywords are more specific — give them extra weight
        score += kw.length > 4 ? 2 : 1
      }
    }
    if (score > bestScore) {
      bestScore = score
      bestEntry = entry
    }
  }

  // Require at least one keyword hit
  if (bestScore === 0 || !bestEntry) return null
  return bestEntry.response
}

export const DEFAULT_RESPONSE =
  "I'm not sure about that, but I can tell you about Betelhem's **skills**, **projects**, **education**, **contact info**, or **availability**.\n\nTry asking something like:\n- *\"What projects has she built?\"*\n- *\"What are her skills?\"*\n- *\"How can I contact her?\"*"

export const SUGGESTED_QUESTIONS = [
  'Tell me about her projects',
  'What are her skills?',
  'How can I contact her?',
  'Is she available for internships?',
  'What is her education?',
]
