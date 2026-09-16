# 🚀 SARAVANESH PORTFOLIO & RESUME API

> Official portfolio website and OpenAPI-compliant Resume endpoint for **Saravanesh D S** — B.E. Computer Science & Engineering student at Chennai Institute of Technology specializing in AI/ML, cross-platform engineering, game development, and intelligent systems.

---

## 🌐 Live Website & API Endpoints

| Resource | URL / Path | Description |
|---|---|---|
| **Live Portfolio** | [`saravanesh07-cloud.github.io/saravanesh-portfolio`](https://saravanesh07-cloud.github.io/saravanesh-portfolio/) | Responsive Web Portfolio with dark glassmorphic UI |
| [`/api/profile.json`](./api/profile.json) | Personal info, contact & engineering summary |
| [`/api/skills.json`](./api/skills.json) | Technical skills & competencies |
| [`/api/experience.json`](./api/experience.json) | Hackathons, education & achievements |
| [`/api/education.json`](./api/education.json) | B.E. CSE credentials & certifications |
| [`/api/projects.json`](./api/projects.json) | Featured projects (JARVIS, Zone Strike, Smart Bus, Stock Prediction) |
| [`/openapi.yaml`](./openapi.yaml) | OpenAPI 3.1 spec for Custom GPT Actions |
| [`/privacy-policy.md`](./privacy-policy.md) | Privacy Policy |

---

## 🌟 Featured Engineering Projects

1. **JARVIS — Hybrid Cross-Platform Personal AI Workspace Platform**
   - Cross-platform AI assistant (Android Kotlin/Compose & Windows Electron/Node.js).
   - Multi-provider smart router (Gemini, OpenAI, Claude, local Ollama fallback), voice wake-word, 15 specialized agents, and Supabase sync.
2. **Zone Strike — 3D Third-Person Battle Royale Game**
   - Built in Unity 3D with C#, featuring realistic weapon ballistics, vehicle physics, dynamic shrinking safe zone, and autonomous enemy bots with Finite State Machine (FSM) AI.
3. **Stock Prediction System**
   - Java-based financial algorithmic forecasting engine utilizing statistical moving averages and regression modeling.
4. **Smart Bus AI**
   - Machine learning-driven urban transit tracking platform providing real-time telemetry and arrival forecasting.
5. **Modern Web Development Suite & YouTube AI Studio**
   - High-performance, zero-dependency glassmorphic web apps and AI-assisted workflow tools.

---

## 📁 Repository Structure

```
saravanesh-portfolio/
├── index.html                 ← Main portfolio entrypoint
├── saravanesh-portfolio.html  ← Mirror portfolio entrypoint
├── resume.md                  ← Full engineering resume in Markdown
├── assets/
│   └── Saravanesh_DS_Resume.html ← Clean ATS-ready HTML resume
├── css/                       ← Glassmorphism design system & styles
├── js/
│   ├── config.js              ← Centralized links & dynamic content configuration
│   └── app.js                 ← Interactive UI logic, modals & animations
├── api/                       ← REST API JSON endpoints
│   ├── profile.json
│   ├── skills.json
│   ├── experience.json
│   ├── education.json
│   └── projects.json
├── openapi.yaml               ← OpenAPI 3.1 spec for GPT Actions
└── privacy-policy.md          ← Privacy Policy
```

---

## 🚀 Setup Guide — Step by Step

### Step 1: Create GitHub Repository

1. Go to [github.com](https://github.com) → Click **"New Repository"**
2. Name it: `resume-gpt`
3. Set it to **Public**
4. Click **"Create Repository"**

### Step 2: Upload All Files

Upload all files from this folder into the repository:
- Drag & drop into GitHub, **OR**
- Use Git commands:

```bash
git init
git add .
git commit -m "Initial commit: Resume GPT files"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/resume-gpt.git
git push -u origin main
```

### Step 3: Enable GitHub Pages

1. Go to your repo → **Settings** tab
2. Click **Pages** (left sidebar)
3. Under **Source**, select `Deploy from a branch`
4. Choose branch: `main`, folder: `/ (root)`
5. Click **Save**
6. Wait 2–3 minutes → Your site will be live at:
   ```
   https://YOUR_USERNAME.github.io/resume-gpt
   ```

### Step 4: Update the OpenAPI Server URL

In `openapi.yaml`, replace line 14:
```yaml
# BEFORE:
  - url: https://saravkumar.github.io/resume-gpt

# AFTER:
  - url: https://YOUR_USERNAME.github.io/resume-gpt
```

Commit and push the change.

### Step 5: Create the Custom GPT on ChatGPT

1. Go to [chat.openai.com](https://chat.openai.com)
2. Click your profile → **My GPTs** → **Create a GPT**
3. Fill in the details:

**Name:**
```
Sarav Kumar — Resume Assistant
```

**Description:**
```
Ask me anything about Sarav Kumar's professional background, skills, experience, education, and projects.
```

**Instructions (paste this exactly):**
```
You are a professional resume assistant for Sarav Kumar.

When users ask questions about Sarav Kumar, use the available GPT Actions to fetch accurate, up-to-date information from the resume API:
- Use getProfile for general info, contact details, or summary
- Use getSkills for any questions about technical skills or technologies
- Use getExperience for work history, achievements, or job roles
- Use getEducation for degrees or certifications
- Use getProjects for portfolio or personal projects

Always respond in a friendly, professional tone. Format your answers clearly using bullet points or short paragraphs. Do not make up any information — only use data returned from the API.

If someone asks to contact Sarav Kumar, provide the email: sarav.kumar@email.com
```

### Step 6: Add GPT Actions

1. In the GPT Editor, click the **"Configure"** tab
2. Scroll down to **"Actions"**
3. Click **"Add actions"**
4. In the Schema field, paste the URL:
   ```
   https://YOUR_USERNAME.github.io/resume-gpt/openapi.yaml
   ```
5. Click **"Import"** — all 5 actions will be loaded automatically
6. Under **Privacy Policy URL**, paste:
   ```
   https://YOUR_USERNAME.github.io/resume-gpt/privacy-policy
   ```

### Step 7: Test Your GPT

Click **"Save"** → **"View GPT"** and try these questions:
- *"What are Sarav's top skills?"*
- *"Where has Sarav worked?"*
- *"What certifications does Sarav have?"*
- *"Show me Sarav's projects"*
- *"Is Sarav open to new opportunities?"*

---

## ✏️ How to Update Your Resume

1. Edit the JSON files in the `/api/` folder with your real info
2. Commit and push to GitHub
3. GitHub Pages updates automatically within minutes
4. Your ChatGPT GPT will instantly reflect the new data — **no GPT reconfiguration needed!**

---

## 🔧 Customization

To personalize this for yourself:
1. Replace all `Sarav Kumar` references in JSON files with your name
2. Update contact info, skills, experience, education, and projects
3. Update `openapi.yaml` server URL with your GitHub username
4. Update `privacy-policy.md` with your contact info

---

## 📜 License

This project is open source under the [MIT License](LICENSE).

---

## 🌟 Share It!

If this helped you, give the repo a ⭐ and share it with others building their AI-powered resume!
