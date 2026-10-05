# 🔐 CipherAttend

### Cryptographically Secured AI Face Attendance & Academic Intelligence System
**Designed for VTU BCS703 Cryptography & Network Security | Academic Institution Ready**

[![Python 3.11](https://img.shields.io/badge/Python-3.11-3776AB?logo=python&logoColor=white)](https://python.org)
[![FastAPI](https://img.shields.io/badge/FastAPI-0.104-009688?logo=fastapi&logoColor=white)](https://fastapi.tiangolo.com)
[![React 18](https://img.shields.io/badge/React-18-61DAFB?logo=react&logoColor=black)](https://react.dev)
[![Cryptography](https://img.shields.io/badge/AES--256--GCM-Encrypted-FFB000?logo=security)](https://en.wikipedia.org/wiki/Galois/Counter_Mode)
[![SHA-256](https://img.shields.io/badge/SHA--256-Integrity_Verified-00E0C6)](https://en.wikipedia.org/wiki/SHA-2)
[![InsightFace](https://img.shields.io/badge/InsightFace-ArcFace-orange)](https://github.com/deepinsight/insightface)
[![MediaPipe](https://img.shields.io/badge/MediaPipe-Liveness-blue)](https://developers.google.com/mediapipe)
[![License: MIT](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)

---

## 📌 Overview

**CipherAttend** is an enterprise-grade academic attendance and security platform that replaces error-prone manual roll calls with **authenticated, anti-spoofed facial recognition** and **provable cryptographic security**. 

Unlike conventional facial attendance systems that store vulnerable raw photographs or unencrypted vector arrays, CipherAttend adheres to a **Zero-Raw-Image Security Architecture**:
1. Camera video streams are analyzed strictly in volatile memory to extract facial landmark geometry.
2. Embeddings are immediately encrypted using **AES-256-GCM** (Galois/Counter Mode) with 96-bit initialization nonces and 128-bit authentication tags.
3. Every biometric payload is sealed with a **SHA-256 cryptographic integrity hash** to detect tampering.
4. Attendance is categorized across a complete **college-level academic hierarchy** with **multi-period subject tracking** (up to 7 periods per day).

---

## 🏗️ Architecture & Security Model

```text
 ┌────────────────────────────────────────────────────────────────────────┐
 │                         CLIENT / BROWSER                               │
 │   • React 18 SPA (Dark Cyberpunk Theme: #070A0F, #00E0C6, #FFB000)      │
 │   • MediaPipe FaceMesh & Blendshapes (Anti-Spoofing & Liveness)        │
 │   • Dual Role Portal: Student Dashboard & Admin Command Center         │
 └───────────────────────────────────┬────────────────────────────────────┘
                                     │ HTTPS / JWT Bearer
                                     ▼
 ┌────────────────────────────────────────────────────────────────────────┐
 │                     FASTAPI BACKEND APIS & SERVICES                    │
 │                                                                        │
 │  ┌──────────────────────┐  ┌────────────────────┐  ┌────────────────┐  │
 │  │ Server-Side Liveness │  │ ArcFace / Buffalo  │  │  AES-256-GCM   │  │
 │  │ Randomized Yaw Sweeps│  │ 128-D / 512-D ONNX │  │ Crypto Service │  │
 │  └──────────────────────┘  └────────────────────┘  └────────────────┘  │
 │                                                                        │
 │  ┌──────────────────────────────────────────────────────────────────┐  │
 │  │ Academic Hierarchy Router & Multi-Period Subject Attendance      │  │
 │  │ (Branch ──► Year ──► Semester ──► Section ──► Subjects ──► P1..7)│  │
 │  └──────────────────────────────────────────────────────────────────┘  │
 └───────────────────────────────────┬────────────────────────────────────┘
                                     │ SQLAlchemy ORM
                                     ▼
 ┌────────────────────────────────────────────────────────────────────────┐
 │                  ENCRYPTED PERSISTENCE / DATABASE                      │
 │   • users: Authentication, roles, password hashes (bcrypt)             │
 │   • students: Complete academic cohort mapping                         │
 │   • subjects: Course catalog (BCS701 - BCS707)                         │
 │   • face_embeddings: Ciphertext + 96-bit IV + 128-bit Tag (AES-256-GCM)│
 │   • attendance: Period logs (UQ: user_id + date + subject_id + period) │
 └────────────────────────────────────────────────────────────────────────┘
```

---

## ✨ Key Capabilities

### 🛡️ 1. Cryptographic Security & Biometric Privacy
- **AES-256-GCM Authenticated Encryption:** Every biometric vector is encrypted at rest. Decryption requires the verified master key and generates zero ciphertext leakage.
- **SHA-256 Cryptographic Digest:** Biometric records feature integrity validation digests to flag unauthorized database tampering.
- **Zero Raw Image Retention:** No photograph is ever committed to disk or database. Raw camera frames are destroyed immediately after mathematical feature extraction.
- **GDPR & Privacy Compliance (Right to be Forgotten):** Biometric templates can be purged independently without deleting academic identities. Admin deletion cascades and frees student credentials for clean re-registration.

### 👁️ 2. Anti-Spoofing & Active Liveness Challenge
- **Server-Issued Dynamic Challenges:** The server dictates a randomized head movement direction (`LEFT` or `RIGHT`) with a tight TTL nonce.
- **3D Head-Turn Verification:** Real-time angular yaw sweep measurement prevents 2D paper photos, static digital screens, or prerecorded videos from marking attendance.
- **Multi-Frame Consensus Voting:** Independent frame consensus prevents sporadic recognition errors.

### 🏫 3. College Academic Hierarchy & Scheduling
- **Academic Cohort Organization:**
  - **Branches:** `CSE`, `ISE`, `ECE`, `AIML`, `ME`, `CV`
  - **Years:** `1st`, `2nd`, `3rd`, `4th Year`
  - **Semesters:** `1` through `8`
  - **Sections:** `A`, `B`, `C`
- **Subject-Wise Scheduling:**
  - Full semester catalog (`BCS701` through `BCS707`, including `BCS703: Cryptography & Network Security`).
  - **Multi-Period Schedule (Periods 1 to 7):** Students can attend up to 7 distinct subject periods daily.
- **VTU 75% Attendance Compliance:** Dynamic eligibility tracking with real-time shortage alerts.

### 📊 4. Student & Admin Interfaces
- **Admin Security Command Center:**
  - 📊 **Main Dashboard:** System metrics, attendance ratios, cryptographic health monitors.
  - 👥 **Student Directory:** Real-time cohort filters, search, same-email automatic account binding, and student profile inspector.
  - 🔐 **Cryptography Lab:** Live AES-256-GCM encryption/decryption demonstrator, 128-D vector viewer, SHA-256 verifier.
  - 🛡️ **Security Center:** Tamper log alarms, spoofing attempt flags.
- **Student Dashboard:**
  - Monthly calendar strictly aligned with weekdays (`Sun` - `Sat`) with visual attendance indicators.
  - Subject-wise attendance breakdown cards with expandable period-by-period logs.
  - One-click CSV attendance report export.

---

## 🚀 Quick Start Guide

### Prerequisites
- Python 3.10+ (Recommended: Python 3.11)
- Node.js 18+ & npm
- Webcam for biometric capture

---

### 1. Backend Setup

```bash
# Navigate to backend directory
cd backend

# Create and activate virtual environment
python -m venv .venv

# On Windows:
.venv\Scripts\activate
# On Linux/macOS:
# source .venv/bin/activate

# Install dependencies
pip install -r requirements.txt

# Start backend server (auto-seeds database & default admin)
uvicorn app.main:app --reload --port 8000
```

> **API Documentation (Swagger UI):** Open [http://localhost:8000/docs](http://localhost:8000/docs)

---

### 2. Frontend Setup

```bash
# Navigate to frontend directory
cd frontend

# Install npm packages
npm install

# Start React development server
npm start
```

> **Web Application:** Open [http://localhost:3000](http://localhost:3000)

---

### 3. One-Click Windows Launchers

The project includes batch scripts for quick startup:
- Double-click `run_backend.bat` to launch the FastAPI server.
- Double-click `run_frontend.bat` to start the React interface.

---

## 🔑 Default Credentials

| Portal | Role | Email | Password |
|---|---|---|---|
| Admin Command Center | Administrator | `admin@gmail.com` | `admin@123` |
| Student Dashboard | Student Demo | `milanraj.23cs071@sode-edu.in` | `milan@123` |

*(Note: Pre-seeded demo student USN: `4SO23CS071`, Branch: `CSE`, Semester: `6`, Section: `A`)*

---

## ⚙️ Environment Variables

Configure backend settings via `backend/.env`:

| Key | Default | Description |
|---|---|---|
| `DATABASE_URL` | `sqlite:///attendance_system.db` | Database connection string (SQLite / PostgreSQL) |
| `SECRET_KEY` | `change-me-in-production` | Secret key for JWT signature and session validation |
| `ALGORITHM` | `HS256` | JWT signing algorithm |
| `ACCESS_TOKEN_EXPIRE_MINUTES` | `60` | Token validity duration |
| `APP_TIMEZONE` | `Asia/Kolkata` | Organization timezone |
| `BACKEND_CORS_ORIGINS` | `http://localhost:3000` | Permitted CORS frontend origins |
| `FACE_MODEL_PACK` | `buffalo_l` | InsightFace recognition model weights |
| `LIVENESS_CHALLENGE_ENABLED` | `True` | Enforce server-side 3D head sweep verification |

---

## 📡 Key API Endpoints

### 🔐 Authentication & Accounts
- `POST /auth/login` — User & Admin JWT authentication
- `POST /auth/register` — Student self-service registration (auto-binds to academic profile)

### 📸 Biometrics & Liveness
- `POST /liveness/challenge` — Generates dynamic head-turn nonce
- `POST /face/register` — Registers biometric template (AES-256-GCM encrypted)
- `POST /attendance/mark` — Multi-frame liveness verification & subject attendance marking

### 🏫 Academic & Cohort Management (Admin)
- `GET /admin/students` — Filter students by branch, year, semester, section, or subject
- `POST /admin/students` — Pre-register student academic identity
- `DELETE /admin/students/{id}` — Full purge of student profile, login account, and biometrics
- `GET /admin/students/{id}/details` — 4-tab biometric, cryptographic, and subject breakdown
- `POST /admin/students/{id}/attendance/seed-multi-period` — One-click multi-period demo seeder

### 📚 Subject & Attendance Stats
- `GET /admin/subjects` / `POST /admin/subjects` — Course catalog management
- `GET /user/attendance` — Student dashboard attendance & subject-wise performance breakdown

---

## 🔬 VTU BCS703 Academic Mapping

This project directly fulfills and demonstrates the practical requirements of **VTU BCS703 Cryptography & Network Security**:
- **Symmetric Block Ciphers:** AES-256 operating in Galois/Counter Mode (GCM).
- **Cryptographic Hash Functions:** SHA-256 for biometric payload integrity verification.
- **Non-Repudiation & Authentication:** Dynamic challenges + authenticated encryption tags.
- **Secure Key Management:** Zero exposure of master cryptographic keys to the client tier.

---

## 📄 License

This project is licensed under the **MIT License** — see the [LICENSE](LICENSE) file for details.

---

<p align="center">
  Crafted with precision for <strong>Secure Biometric Intelligence</strong>
</p>
