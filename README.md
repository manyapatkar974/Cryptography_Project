# 🔐 CipherAttend

### Cryptographically Secured AI Face Attendance & Academic Intelligence System
**Designed for VTU BCS703 Cryptography & Network Security | Academic Institution Ready**

[![Python 3.11](https://img.shields.io/badge/Python-3.11-3776AB?logo=python&logoColor=white)](https://python.org)
[![FastAPI](https://img.shields.io/badge/FastAPI-0.104-009688?logo=fastapi&logoColor=white)](https://fastapi.tiangolo.com)
[![React 18](https://img.shields.io/badge/React-18-61DAFB?logo=react&logoColor=black)](https://react.dev)
[![Cryptography](https://img.shields.io/badge/AES--256--GCM-Encrypted-FFB000?logo=security)](https://en.wikipedia.org/wiki/Galois/Counter_Mode)
[![SHA-256](https://img.shields.io/badge/SHA--256-Integrity_Verified-00E0C6)](https://en.wikipedia.org/wiki/SHA-2)
[![InsightFace](https://img.shields.io/badge/InsightFace-ArcFace_512D-orange)](https://github.com/deepinsight/insightface)
[![MediaPipe](https://img.shields.io/badge/MediaPipe-Liveness_Challenge-blue)](https://developers.google.com/mediapipe)
[![Tests Passing](https://img.shields.io/badge/Tests-77%2F77_Passed-brightgreen)](https://pytest.org)
[![License: MIT](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)

---

## 📌 Executive Summary

**CipherAttend** is an enterprise-grade academic biometric intelligence and security platform engineered to replace error-prone, proxy-vulnerable manual roll calls with **authenticated, anti-spoofed facial recognition** and **provable cryptographic security**.

Unlike standard facial attendance tools that store unencrypted biometric vectors or vulnerable raw photos on disk, CipherAttend enforces a strict **Zero-Raw-Image Security Architecture**:
1. **Volatile In-Memory Processing:** Video frames and uploaded images are processed entirely in RAM. Raw images are instantly wiped immediately after 512-D / 128-D vector extraction.
2. **AES-256-GCM Authenticated Encryption:** Every biometric embedding is stored at rest as AES-256-GCM ciphertext paired with a unique 96-bit nonce (IV) and a 128-bit authentication tag.
3. **SHA-256 Cryptographic Tamper Sealing:** Every biometric record is stamped with a cryptographic hash digest to immediately detect and flag any database alteration.
4. **Dynamic Active Liveness Challenge:** 3D facial yaw sweeps (server-dictated randomized `LEFT`/`RIGHT` challenges with micro-TTL nonces) reject 2D photos, screen replays, and mask attacks.
5. **Full 4-Year Academic Hierarchy & Multi-Period Scheduling:** Structured tracking across Branches, Years (1st–4th), Semesters (1–8), Sections (A, B, C), USN numbers, and up to 7 subject periods per day.
6. **Dual Mode Capture & Dual Theme Presentation:** Supports both **Live Web Camera** and **High-Resolution Photo Upload** for registration and attendance, alongside instant **Dark Theme** and **High-Contrast Light Theme** switching.

---

## 🏗️ System Architecture

```text
 ┌─────────────────────────────────────────────────────────────────────────────────────────┐
 │                                   CLIENT APPLICATION                                    │
 │  • React 18 SPA (Dual Theme: Dark Cyberpunk & High-Contrast Light Mode)                 │
 │  • Dual Input: Live Web Camera Stream (Webcam) OR Photo Upload (JPG/PNG/WEBP)           │
 │  • MediaPipe FaceMesh & Blendshapes (Anti-Spoofing & Active Liveness Challenge)        │
 │  • Dual Portals: Student Self-Service Dashboard & Admin Security Command Center         │
 └────────────────────────────────────────────┬────────────────────────────────────────────┘
                                              │ HTTPS / JWT Bearer Authentication
                                              ▼
 ┌─────────────────────────────────────────────────────────────────────────────────────────┐
 │                           FASTAPI BACKEND APIS & MICRO-SERVICES                         │
 │                                                                                         │
 │  ┌────────────────────────┐  ┌────────────────────────┐  ┌───────────────────────────┐  │
 │  │ Server-Side Liveness   │  │ ArcFace / InsightFace  │  │ AES-256-GCM Cryptographic │  │
 │  │ Challenge & Yaw Sweeps │  │ 512-D / 128-D Embedder │  │ Engine & SHA-256 Sealer   │  │
 │  └────────────────────────┘  └────────────────────────┘  └───────────────────────────┘  │
 │                                                                                         │
 │  ┌───────────────────────────────────────────────────────────────────────────────────┐  │
 │  │ 4-Year Academic Hierarchy Router & Multi-Period Subject Attendance Engine         │  │
 │  │ (Branch ──► Year [1-4] ──► Sem [1-8] ──► Section [A-C] ──► Subjects ──► P1..P7) │  │
 │  └───────────────────────────────────────────────────────────────────────────────────┘  │
 └────────────────────────────────────────────┬────────────────────────────────────────────┘
                                              │ SQLAlchemy 2.0 ORM
                                              ▼
 ┌─────────────────────────────────────────────────────────────────────────────────────────┐
 │                            CRYPTOGRAPHICALLY SECURED DATABASE                           │
 │   • users: Authentication, roles (admin/student), bcrypt salted passwords ($2b$12)     │
 │   • students: Cohort mappings (USN, Year 1-4, Sem 1-8, Section A-C, Branch)             │
 │   • subjects: VTU Course Catalog (BCS701 - BCS707, Cryptography & Network Security)     │
 │   • face_embeddings: Ciphertext + 96-bit Nonce + 128-bit Tag (AES-256-GCM) + SHA-256    │
 │   • attendance: Period logs (Unique Constraint: user_id + date + subject_id + period)   │
 │   • tamper_logs: Audit trail of biometric tampering attempts and spoof flags            │
 └─────────────────────────────────────────────────────────────────────────────────────────┘
```

---

## ✨ Comprehensive Features

### 🛡️ 1. Cryptographic Security & Biometric Privacy
- **AES-256-GCM Encryption:** Every biometric vector is encrypted at rest using Advanced Encryption Standard in Galois/Counter Mode with a 96-bit initialization vector and 128-bit authentication tag.
- **SHA-256 Digest Verification:** Biometric payload integrity is verified upon every retrieval. Any manual database tampering or row modification triggers an instant security alert.
- **Zero Raw Image Retention:** No photograph is ever committed to disk or database. Raw camera frames and uploaded photos are permanently wiped from RAM after vector extraction.
- **GDPR & VTU Compliance:** Full support for biometric template deletion without destroying academic records. Admin deletion cascades properly and frees credentials for clean re-enrollment.

### 👁️ 2. Dual Capture Modes & Liveness Verification
- **🎥 Live Webcam Mode:** Real-time facial bounding box tracking, dynamic randomized yaw challenge (`TURN LEFT` / `TURN RIGHT`), and 3D eye-aspect-ratio (EAR) blink verification.
- **📁 Photo Upload Mode:** Drag-and-drop support for high-resolution single or multi-photo uploads (1–10 images) for both attendance marking and biometric registration.
- **Multi-Frame Consensus Voting:** Eliminates sporadic lighting errors by evaluating cosine similarity consensus across multiple frames ($Threshold \ge 0.65$).

### 🏫 3. Academic Hierarchy & Multi-Period Attendance
- **Complete 4-Year Academic Mapping:**
  - **Branches:** `CSE`, `ISE`, `ECE`, `AIML`, `ME`, `CV`
  - **Years:** `1st Year`, `2nd Year`, `3rd Year`, `4th Year`
  - **Semesters:** `1` through `8`
  - **Sections:** `A`, `B`, `C`
  - **University Seat Number (USN):** e.g., `4SO23CS071`
- **Multi-Period Timetable Scheduling:**
  - Full semester course catalog (`BCS701` to `BCS707`, including `BCS703: Cryptography & Network Security`).
  - Attendance tracked independently across **Periods 1 to 7** per day.
- **VTU 75% Attendance Compliance Engine:** Real-time percentage calculation with visual alerts for students at risk of shortage.

### 🎨 4. Dynamic Dual-Theme UI (Presentation-Ready)
- **🌙 Dark Theme:** Cyberpunk-inspired deep dark interface (`#070A0F`, `#0D131F`) with neon cyan (`#00E0C6`) and amber (`#FFB000`) highlights.
- **☀️ Light Theme:** Presentation-optimized high-contrast palette with deep obsidian text (`#0F172A`), dark slate subtitles (`#334155`), vivid teal (`#0F766E`), and amber (`#B45309`) with crisp borders for projector displays.
- **Instant Navbar Switcher:** Persistent toggle stored in `localStorage` and synced dynamically across CSS tokens and MUI components.

### 📊 5. Administrative Command Center & Student Portal
- **Admin Command Center:**
  - 📊 **Main Dashboard:** Live statistics, attendance breakdown, and biometric cryptographic health indicators.
  - 👥 **Student Directory:** Real-time filtering by Branch, Year, Semester, Section, and USN search with inline profile editing.
  - 🔐 **Cryptography Lab:** Interactive visual demonstrator showing AES-256-GCM encryption, decryption, 128-D vector mapping, and SHA-256 hash validation.
  - 🛡️ **Face Management:** Inspect enrolled biometric metadata, view sample template thumbnails, or securely purge templates.
- **Student Dashboard:**
  - Weekday-aligned monthly calendar (`Sun`–`Sat`) with color-coded daily status badges.
  - Subject-by-subject attendance progress bars with expandable period-by-period audit logs.
  - One-click CSV attendance report generator.

---

## 🚀 Quick Start Guide

### Prerequisites
- **Python:** 3.10 or 3.11 (Recommended: Python 3.11)
- **Node.js:** 18+ and npm
- **Webcam:** Optional for live scan (or use the Image Upload feature)

---

### Step 1: Backend Setup & Launch

```bash
# Navigate to backend directory
cd CipherAttend/backend

# Create and activate virtual environment
python -m venv .venv

# On Windows (PowerShell / CMD):
.venv\Scripts\activate

# On Linux / macOS:
# source .venv/bin/activate

# Install dependencies
pip install -r requirements.txt

# Start FastAPI backend server (auto-initializes database & seed data)
uvicorn app.main:app --host 127.0.0.1 --port 8000 --reload
```

> **Interactive API Docs (Swagger UI):** Open [http://127.0.0.1:8000/docs](http://127.0.0.1:8000/docs)

---

### Step 2: Frontend Setup & Launch

```bash
# Open a new terminal and navigate to frontend directory
cd CipherAttend/frontend

# Install frontend packages
npm install

# Start React development server
npm start
```

> **Web Application:** Open [http://localhost:3000](http://localhost:3000)

---

## 🔑 Default Login Credentials

| Role | Portal | Email | Password | Details |
|---|---|---|---|---|
| **Administrator** | Admin Command Center | `admin@gmail.com` | `admin@123` | Full administrative control & crypto lab |
| **Student** | Student Portal | `milanraj.23cs071@sode-edu.in` | `milan@123` | USN: `4SO23CS071`, 4th Year, Sem 6, Sec A |

---

## 🧪 Testing & Verification

The system includes a test suite covering authentication, cryptographic integrity, AES-256-GCM encryption/decryption, liveness challenges, and academic hierarchy rules.

### Running Backend Tests (77/77 Passing)
```bash
cd CipherAttend/backend
.venv\Scripts\pytest -v
```

### Running Frontend Tests (3/3 Passing)
```bash
cd CipherAttend/frontend
npm test -- --watchAll=false
```

---

## 📡 Key REST API Endpoints

### 🔐 Authentication & Accounts
- `POST /auth/login` — User & Admin JWT authentication
- `POST /auth/register` — Student self-registration (auto-binds to academic cohort)
- `GET /user/profile` — Get current user academic & biometric profile
- `PUT /user/profile` — Update personal contact details
- `POST /user/change-password` — Secure password update with bcrypt hashing

### 📸 Biometrics & Attendance
- `POST /liveness/challenge` — Generates dynamic yaw challenge nonce
- `POST /face/register` — Registers biometric template via live camera frames (AES-256-GCM)
- `POST /face/register-upload` — Registers biometric template via uploaded images
- `POST /attendance/mark` — Marks subject attendance via live webcam
- `POST /attendance/mark-upload` — Marks subject attendance via photo upload
- `GET /user/attendance` — Student subject-wise attendance history & calendar

### 🏫 Academic & Administrative Management
- `GET /admin/students` — Cohort directory with Branch, Year, Sem, Section, USN filters
- `POST /admin/students` — Register new student profile
- `PUT /admin/students/{id}` — Edit student academic data (USN, Year 1-4, Sem 1-8, Section)
- `DELETE /admin/students/{id}` — Cascade purge of student account & biometrics
- `GET /admin/students/{id}/details` — Complete 4-tab biometric & cryptographic inspection
- `POST /admin/students/{id}/attendance/seed-multi-period` — Demo data seeder for period logs
- `GET /admin/subjects` — Course catalog listing
- `GET /admin/stats` — System-wide attendance, enrollment, and security metrics

---

## 🔬 VTU BCS703 Cryptography & Network Security Mapping

This project serves as a real-world implementation of the **VTU BCS703** curriculum:

| Cryptographic Principle | Implementation in CipherAttend |
|---|---|
| **Symmetric Encryption** | AES-256 in Galois/Counter Mode (GCM) for biometric vectors |
| **Cryptographic Hash Functions** | SHA-256 message digests for database integrity validation |
| **Password Hashing** | Bcrypt with work factor 12 and unique salt per user |
| **Challenge-Response Protocol** | Dynamic server-issued yaw challenge with micro-TTL nonce |
| **Authenticated Encryption** | 128-bit MAC tag verification preventing ciphertext tampering |
| **Key Management** | Master key separation; zero client-side crypto key exposure |

---

## 📁 Repository Directory Structure

```text
cryptooooo/
├── CipherAttend/
│   ├── backend/
│   │   ├── app/
│   │   │   ├── api/routers/      # auth, admin, attendance, face, liveness, user
│   │   │   ├── core/             # config, security (AES-256-GCM, SHA-256, JWT)
│   │   │   ├── db/               # database engine & seeders
│   │   │   ├── models/           # SQLAlchemy database schemas
│   │   │   ├── schemas/          # Pydantic request/response schemas
│   │   │   └── services/         # ArcFace recognition & crypto services
│   │   ├── tests/                # 77 automated test suites
│   │   └── requirements.txt      # Python dependencies
│   ├── frontend/
│   │   ├── src/
│   │   │   ├── components/       # Admin, Student, FaceCapture, Attendance, Theme
│   │   │   ├── context/          # ThemeContext (Dark / Light switcher)
│   │   │   ├── services/         # Axios API service bindings
│   │   │   └── index.css         # High-contrast CSS design tokens
│   │   └── package.json          # React dependencies
│   ├── run_backend.bat           # Windows 1-click backend launcher
│   ├── run_frontend.bat          # Windows 1-click frontend launcher
│   └── README.md                 # Project documentation
└── README.md                     # Root documentation
```

---

## 📄 License

This project is licensed under the **MIT License** — see the [LICENSE](LICENSE) file for details.

<p align="center">
  Crafted with precision for <strong>Secure Biometric Intelligence & Academic Excellence</strong>
</p>
