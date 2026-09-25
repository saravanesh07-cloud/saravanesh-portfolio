/**
 * =============================================================================
 * CENTRAL CONFIGURATION - SARAVANESH D S PORTFOLIO
 * =============================================================================
 * Update all your links, contact details, stats, and project URLs from here.
 */

const PORTFOLIO_CONFIG = {
  // --- Personal & Academic Branding ---
  PROFILE: {
    NAME: "SARAVANESH D S",
    FIRST_NAME: "Saravanesh",
    INITIALS: "SDS",
    DEGREE: "B.E. Computer Science and Engineering",
    DEGREE_SHORT: "B.E. CSE",
    INSTITUTION: "Chennai Institute of Technology",
    INSTITUTION_SHORT: "CIT Chennai",
    LOCATION: "Chennai, Tamil Nadu, India",
    TAGLINE: "Building. Learning. Innovating.",
    ROLE_TITLE: "Second-Year B.E. CSE Student | AI/ML & Full-Stack Developer",
    HERO_BIO: "Second-year Computer Science & Engineering student at Chennai Institute of Technology with hands-on experience in Python, Java, and machine learning projects, seeking a first internship to apply full-stack development and AI/ML skills to real-world problems while contributing to a fast-paced engineering team.",
    CURRENT_STATUS: "Seeking First Internship • Open to Opportunities"
  },

  // --- Central Links & Contact URLs ---
  LINKS: {
    // Verified Professional profiles
    LINKEDIN_URL: "https://www.linkedin.com/in/saravanesh-d-s-8155823b0?utm_source=share_via&utm_content=profile&utm_medium=member_android",
    LINKEDIN_CERTS_URL: "https://www.linkedin.com/in/saravanesh-d-s-8155823b0?utm_source=share_via&utm_content=profile&utm_medium=member_android",
    GITHUB_URL: "https://github.com/saravanesh07-cloud",
    EMAIL_ADDRESS: "saravanesh07@gmail.com",
    PHONE_NUMBER: "+91 93452 19076",
    PHONE_TEL: "tel:+919345219076",
    
    // Resume link (companion resume template & printable view)
    RESUME_URL: "assets/Saravanesh_DS_Resume.html",
    
    // Institutional portal
    COLLEGE_URL: "https://www.citchennai.edu.in/",
    
    // Project 1: Stock Prediction System
    PROJECT_1_LIVE_URL: "https://github.com/saravanesh07-cloud",
    PROJECT_1_GITHUB_URL: "https://github.com/saravanesh07-cloud",
    
    // Project 2: Smart Bus AI
    PROJECT_2_LIVE_URL: "https://smartbus-sxre.onrender.com/",
    PROJECT_2_GITHUB_URL: "https://github.com/saravanesh07-cloud",
    
    // Official Portfolio URL
    PORTFOLIO_URL: "https://saravanesh07-cloud.github.io/saravanesh-portfolio/",
    
    // Project 3: Full-Stack & AI Suite
    PROJECT_3_LIVE_URL: "https://saravanesh07-cloud.github.io/saravanesh-portfolio/",
    PROJECT_3_GITHUB_URL: "https://github.com/saravanesh07-cloud",

    // Project 4: JARVIS Personal AI Workspace
    PROJECT_4_LIVE_URL: "https://github.com/saravanesh07-cloud",
    PROJECT_4_GITHUB_URL: "https://github.com/saravanesh07-cloud",

    // Project 5: Zone Strike 3D Battle Royale Game
    PROJECT_5_LIVE_URL: "https://github.com/saravanesh07-cloud",
    PROJECT_5_GITHUB_URL: "https://github.com/saravanesh07-cloud",

    // Profile Photo & Avatar Assets
    AVATAR_URL: "assets/profile-square.jpg",
    PROFILE_PHOTO_URL: "assets/profile.jpg",

    // Verified Certificate & Hackathon Asset Paths (Direct high-res images)
    HACKATHON_CERT_URL: "assets/certificates/build-with-bharat-microsoft-hackathon.png",
    CERTIFICATE_CLAUDE_CODE_URL: "assets/certificates/claude-code-101-anthropic.png",
    CERTIFICATE_CLAUDE_101_URL: "assets/certificates/claude-101-anthropic.png",
    CERTIFICATE_BE10X_URL: "assets/certificates/be10x-ai-tools-workshop.png",
    CERTIFICATE_UNSTOP_URL: "assets/certificates/unstop-resume-builder.png"
  },

  // --- Professional Stats ---
  STATS: {
    PROJECTS_COUNT: 5,
    PROJECTS_SUFFIX: "+",
    PROJECTS_LABEL: "Featured Projects Built",

    SKILLS_COUNT: 15,
    SKILLS_SUFFIX: "+",
    SKILLS_LABEL: "Technical Skills & Tools",

    HACKATHONS_COUNT: 3,
    HACKATHONS_SUFFIX: "",
    HACKATHONS_LABEL: "Hackathons & Competitions",

    CERTIFICATIONS_COUNT: 7,
    CERTIFICATIONS_SUFFIX: "+",
    CERTIFICATIONS_LABEL: "Certifications & Courses"
  },

  // --- Academic Year & Details ---
  EDUCATION: {
    ACADEMIC_YEAR: "Expected 2029 (Pursuing 2025 – 2029)",
    FOCUS_AREA: "Networking & Full-Stack Development (Centre of Excellence)",
    STATUS: "Second-Year B.E. Computer Science & Engineering"
  }
};

// Export to window for global access
if (typeof window !== "undefined") {
  window.PORTFOLIO_CONFIG = PORTFOLIO_CONFIG;
}
