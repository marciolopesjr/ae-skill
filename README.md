# 🎬 AE Skill: The Autonomous Motion Design Standard

[![Remotion](https://img.shields.io/badge/Powered%20by-Remotion-blue.svg)](https://remotion.dev)
[![TypeScript](https://img.shields.io/badge/Language-TypeScript-blue.svg)](https://www.typescriptlang.org/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

> **"Converting the artistry of After Effects into the precision of code."**

This repository is a specialized **AI Skill** designed to instruct Large Language Models (LLMs) on how to build high-end motion design using **Remotion**. It bridges the gap between traditional video editing (After Effects) and deterministic, code-driven video engineering.

---

## 🚀 The "Apple-Level" Experience

We believe video should be as deployable as code. Our base project includes a promotional sequence that demonstrates all core motion principles with 12-sample motion blur and spring physics.

### 🎥 Watch the Showcase
- [**Full Skill Showcase (MP4)**](./base-project/out/full-showcase.mp4)
- [**Apple-Style Promo (MP4)**](./base-project/out/apple-promo.mp4)

---

## 🛠 Core Principles (The Translation Layer)

We don't just "write code"; we map cinematic ontological concepts to React components:

| AE Concept | Remotion Implementation | Key Tool |
| :--- | :--- | :--- |
| **Null Objects** | Parent `div` wrappers with `makeTransform` | `@remotion/animation-utils` |
| **Track Mattes** | `clipPath` or `overflow: hidden` containers | CSS Standard |
| **Wiggle** | `noise2D(seed, frame)` | `@remotion/noise` |
| **Easy Ease** | `interpolate(f, [range], [output], { easing })` | `Easing.bezier` |
| **Physics** | `spring({ frame, fps, config })` | Remotion Core |
| **Motion Blur** | `<CameraMotionBlur>` | `@remotion/motion-blur` |

---

## 📥 Getting Started

### 1. Clone & Install
```powershell
git clone <your-repo-url>
cd ae-skill/base-project
npm install
```

### 2. Preview & Render
```bash
# Start the Studio
npm run dev

# Default skill render: RAM frames + Intel VA-API when available
npm run render

# CPU fallback
npm run render:cpu
```

The default render stores frames in `/dev/shm/remotion-vaapi-*` when RAM-backed storage is available, encodes with FFmpeg `h264_vaapi` using Intel VA-API, then muxes Remotion's mixed AAC timeline audio. See [`base-project/docs/linux-intel-gpu-remotion.md`](./base-project/docs/linux-intel-gpu-remotion.md).

The large PDF knowledge base is converted into searchable Markdown under [`references/knowledge/INDEX.md`](./references/knowledge/INDEX.md). Use `rg` against `references/knowledge` before opening page chunks.

---

## 🧠 Why Deterministic Design?

Unlike traditional video files, this project is:
- **Git-Friendly**: Every frame is a line of code.
- **Parametric**: Change a color or string, and re-render in seconds.
- **Zero Drift**: No `Math.random()`. No flickering. Every render is identical.
- **AI-Native**: Designed specifically for agents to understand and modify.

---

## 📜 SkillManifest

The core logic of this agent's brain is stored in [`SKILL.md`](../SKILL.md). It contains the ontological mapping used by the Antigravity agent to generate these animations.

---

**Built with ☕ and cínismo by [Antigravity](https://github.com/google-deepmind).**
*"Because if you're still using keyframes manually in 2026, you're the bottleneck."*
