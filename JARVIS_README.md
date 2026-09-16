# ⚡ JARVIS - Production-Ready Android Personal AI Assistant

> **JARVIS** is an all-in-one personal AI assistant for Android built with **Kotlin + Jetpack Compose** (MVVM/Clean Architecture), a high-performance **Node.js + Express** backend, a **Supabase PostgreSQL** database layer with Row Level Security (RLS), and a modular multi-provider AI engine.

---

## 🌟 Key Features

1. **🧠 Intelligent Multi-Mode Assistant**:
   - **General AI**: Natural conversation, deep reasoning, problem solving.
   - **Study & Exam Mode**: University syllabus explanations, 2, 5, 10, and 16-mark structured answers, flashcards, and exam revision quizzes.
   - **Coding & Debugging Engine**: Multi-language code generation, syntax debugging, optimization, and cross-language translation (Java, Kotlin, Python, C++, SQL, JavaScript).
   - **College Project Architect**: Full blueprint generation (Abstract, Objectives, Modules, Architecture, Database schema, UML suggestions, API designs).
   - **Tasks & Reminders**: Natural language reminder creation ("Remind me to study Java at 7 PM") synced with Android `AlarmManager` and notifications.
   - **Personal Memory Vault**: User-controlled persistent memory of skills, preferences, and projects with view/edit/clear capabilities.

2. **🎙️ Voice Assistant & "Jarvis" Activation**:
   - Integrated Android **SpeechRecognizer** for continuous speech-to-text with real-time waveform visualizer.
   - Android **Text-to-Speech (TTS)** output with adjustable rate, pitch, and clean code-omission logic for natural listening.
   - Keyword spotting architecture for **"Jarvis"** with Android background restriction compliance and an explicit 1-touch fallback: *"Tap microphone to activate Jarvis."*

3. **🌐 Real-Time Web Search & Current Info**:
   - Intelligent query router automatically identifies current events, scores, weather, and documentation.
   - Live search via DuckDuckGo and Tavily without exposing API keys to the Android client.

4. **📸 Vision & File Analysis**:
   - Camera and image analysis for error screenshots, circuit diagrams, and photos.
   - Ingestion and summarization of PDF, DOCX, TXT, CSV, and source code files.

5. **🎨 Futuristic UI & Design Language**:
   - Pure Dark Mode (`#0A0E17`) with glowing cyan accents (`#00E5FF`).
   - Animated Canvas AI Orb reacting dynamically to voice volume (RMS).
   - Markdown reader with syntax-highlighted code blocks and 1-tap clipboard copying.

---

## 📁 Repository Structure

```
d:/read me/
├── android/
│   ├── app/
│   │   ├── src/main/
│   │   │   ├── AndroidManifest.xml
│   │   │   ├── java/com/jarvis/assistant/
│   │   │   │   ├── JarvisApplication.kt
│   │   │   │   ├── MainActivity.kt
│   │   │   │   ├── data/
│   │   │   │   │   ├── api/ (Retrofit, OkHttp SSE Streaming)
│   │   │   │   │   ├── model/ (Auth, Chat, Study, Coding, Tasks, Memory)
│   │   │   │   │   ├── preferences/ (UserPreferences)
│   │   │   │   │   └── repository/ (Auth, Chat, Study, Coding, Task, Project, Memory)
│   │   │   │   ├── services/
│   │   │   │   │   ├── VoiceAssistantManager.kt (STT + TTS)
│   │   │   │   │   ├── WakeWordDetector.kt (Keyword Spotter & Fallback)
│   │   │   │   │   ├── JarvisVoiceService.kt (Foreground Service)
│   │   │   │   │   ├── NotificationHelper.kt (AlarmManager & Channels)
│   │   │   │   │   └── ReminderReceiver.kt (BroadcastReceiver)
│   │   │   │   ├── ui/
│   │   │   │   │   ├── theme/ (Color, Theme, Type)
│   │   │   │   │   ├── components/ (JarvisOrb, GlowingCard, FuturisticButton, MarkdownText)
│   │   │   │   │   └── screens/
│   │   │   │   │       ├── splash/ (SplashScreen.kt)
│   │   │   │   │       ├── onboarding/ (OnboardingScreen.kt)
│   │   │   │   │       ├── auth/ (LoginScreen.kt, RegisterScreen.kt)
│   │   │   │   │       ├── home/ (HomeScreen.kt)
│   │   │   │   │       ├── chat/ (ChatScreen.kt, VoiceAssistantDialog.kt)
│   │   │   │   │       ├── modes/ (ModesScreen.kt, StudyModeScreen.kt, CodingModeScreen.kt, ProjectModeScreen.kt)
│   │   │   │   │       ├── tasks/ (TaskScreen.kt)
│   │   │   │   │       ├── memory/ (MemoryScreen.kt)
│   │   │   │   │       └── settings/ (SettingsScreen.kt)
│   │   │   │   └── navigation/ (Screen.kt, BottomNavBar.kt, JarvisNavGraph.kt)
│   │   │   └── res/ (strings.xml, themes.xml, xml rules)
│   │   ├── build.gradle.kts
│   │   └── proguard-rules.pro
│   ├── build.gradle.kts
│   ├── settings.gradle.kts
│   ├── gradle.properties
│   └── gradlew.bat
│
├── backend/
│   ├── src/
│   │   ├── config/ (config.js, supabase.js)
│   │   ├── controllers/ (auth, chat, study, coding, project, task, memory, file, search)
│   │   ├── middleware/ (authMiddleware.js)
│   │   ├── routes/ (all REST and SSE routes)
│   │   ├── services/ (aiService.js, intelligenceRouter.js, searchService.js, fileService.js, memoryService.js)
│   │   └── server.js
│   ├── test/ (api_test.js - 13/13 Automated Tests)
│   ├── package.json
│   └── .env
│
├── database/
│   └── migrations/
│       └── 001_initial_schema.sql (Supabase PostgreSQL schema with RLS)
│
├── docs/
│   ├── architecture/system_architecture.md
│   └── api/api_specification.md
└── .env.example
```

---

## 🚀 Quickstart Guide

### 1. Backend Setup & Run

```bash
cd backend
npm install
npm test # Runs 13 automated integration tests verifying all flows
npm start
```
The server will boot on `http://localhost:5000` with the health check available at `/api/health`.

### 2. Configure Environment Variables

Edit `backend/.env` with your preferred AI provider:
```env
PORT=5000
NODE_ENV=development
JWT_SECRET=your_secret_key

# Supabase (Optional for local testing, required for cloud production)
SUPABASE_URL=https://your-project.supabase.co
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key

# AI Provider: 'openai', 'gemini', 'anthropic', 'ollama', or 'mock'
AI_PROVIDER=openai
AI_API_KEY=your_api_key_here
AI_BASE_URL=https://api.openai.com/v1
AI_MODEL=gpt-4o
```

### 3. Database Migration

Copy and run `database/migrations/001_initial_schema.sql` inside the **Supabase SQL Editor** to establish all 8 tables and Row Level Security policies.

### 4. Build Android Application

Open the `android/` project directory in **Android Studio (Ladybug / Koala / Hedgehog)** or run with Gradle:
```bash
cd android
./gradlew assembleDebug
```
To generate the signed release APK:
```bash
./gradlew assembleRelease
```
The output APK is generated at:
`android/app/build/outputs/apk/release/app-release.apk`

---

## 🔒 Security & Privacy Architecture

- **Zero Hardcoded Secrets**: All AI and database keys remain on the backend.
- **Microphone & Camera Privacy**: Permissions are requested explicitly; no background audio recording without user consent.
- **Row Level Security**: Every user's chats, projects, tasks, and memories are strictly isolated by `auth.uid()`.
- **Offline / Fallback Resilience**: If network drops or keys expire, Jarvis maintains functional cognitive fallbacks and local scheduling.
