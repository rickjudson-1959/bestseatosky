---
name: milo-production
description: Master production, scriptwriting, and quality-control skill for Milo the Sasquatch video shorts on Best Sea to Sky. Enforces character canon, factual integrity gates, Gemini Flash Fenrir voice synthesis, InfiniteTalk lip-sync orchestration, and multi-platform social mastering.
---

# 🎬 Milo Production System (SKILL.md)

> **The Canonical Operating Standard for Developing & Producing Milo Content.**  
> Dedicated Entity Capability for **Best Sea to Sky** (`bestseatosky.com`).  
> *Governed by [`marketing/Milo/MILO-BIBLE.md`](file:///Users/richardsjudson/bestseatosky/marketing/Milo/MILO-BIBLE.md).*

---

## 🏛️ 1. Conflict Resolution & Precedence Hierarchy

If instructions conflict, strictly adhere to this order of precedence:
1. **Rick Judson's Latest Explicit Instruction**
2. **[`marketing/Milo/MILO_VOICE_LOCK.md`](file:///Users/richardsjudson/bestseatosky/marketing/Milo/MILO_VOICE_LOCK.md)** *(Binding Voice Standard)*
3. **[`marketing/Milo/MILO-TEAM-PROTOCOL.md`](file:///Users/richardsjudson/bestseatosky/marketing/Milo/MILO-TEAM-PROTOCOL.md)** *(Team Collaboration & Decision Protocol)*
4. **[`marketing/Milo/MILO-BIBLE.md`](file:///Users/richardsjudson/bestseatosky/marketing/Milo/MILO-BIBLE.md)** *(Character Canon)*
5. **[`.agents/skills/milo-production/SKILL.md`](file:///Users/richardsjudson/bestseatosky/.agents/skills/milo-production/SKILL.md)** *(Production SOP)*
6. **[`marketing/Milo/MILO-PIPELINE.md`](file:///Users/richardsjudson/bestseatosky/marketing/Milo/MILO-PIPELINE.md)** *(Technical Reference)*
7. **[`marketing/Milo/MILO-EPISODES.md`](file:///Users/richardsjudson/bestseatosky/marketing/Milo/MILO-EPISODES.md)** *(Approved Historical Logs)*
8. Older project documentation
9. Historical generation settings

*(Note: Charon, Sven, ElevenLabs, Zephyr, Puck, and Kling AI Avatar are strictly prohibited and obsolete.)*

---

## 🎙️ 2. Approved Technical Stack (Fenrir Voice Lock Standard)

* **Sole Authorized Voice Engine:** **Google Gemini 3.1 Flash TTS** (`google/gemini-3-1-flash-tts` / `gemini-3.1-flash-tts-preview`).
  * **Voice Name:** `Fenrir` (Sole authorized voice).
  * **Default Delivery (`MILO_DEFAULT`):** Natural pace, neutral deadpan, medium-deep voice, slight natural gravel ([`marketing/Milo/voice/Milo_Audition_1_Natural_Deadpan.wav`](file:///Users/richardsjudson/bestseatosky/marketing/Milo/voice/Milo_Audition_1_Natural_Deadpan.wav)).
  * **Alternate Mood (`MILO_SLOW_GRAVELLY`):** Slower cadence, heavier gravel ([`marketing/Milo/voice/Milo_Audition_2_Slow_Gravelly.wav`](file:///Users/richardsjudson/bestseatosky/marketing/Milo/voice/Milo_Audition_2_Slow_Gravelly.wav)). **Requires explicit Rick Judson approval prior to production.**
  * **Immutable Master Baseline:** [`marketing/Milo/voice/Milo_Approved_Fenrir_Master.wav`](file:///Users/richardsjudson/bestseatosky/marketing/Milo/voice/Milo_Approved_Fenrir_Master.wav) (SHA-256: `dd4309e4d5e0268abf3c715a2a56d1b47334b755ac2839ad58c3573628670610`).
  * **Prohibitions:** Pitch shifting, voice conversion, alternative speaker models, or unapproved prompt changes are strictly prohibited.
  * **Mandatory Pre-Render Gate:** Generate audio track first, verify against master baseline, confirm metadata, and obtain Rick sign-off on any material doubt before submitting InfiniteTalk lip-sync jobs.
* **Lip-Sync Engine:** **InfiniteTalk on Kie.ai** (`infinitalk/from-audio`).
  * **Input 1 (Master Portrait):** Approved character image ([`marketing/Milo/Milo_Canonical_Master_Portrait.jpg`](file:///Users/richardsjudson/bestseatosky/marketing/Milo/Milo_Canonical_Master_Portrait.jpg) | CDN: `https://iili.io/CDrA0wg.jpg`).
  * **Input 2 (Closing "Fix It."):** Approved reaction image ([`marketing/Milo/Milo_Canonical_FixIt_Wrench.jpg`](file:///Users/richardsjudson/bestseatosky/marketing/Milo/Milo_Canonical_FixIt_Wrench.jpg) | CDN: `https://iili.io/CDrAGoJ.jpg`).
  * **Input 3 (Audio):** Final approved Gemini Fenrir audio stream (`.wav`).
  * **Segment Constraint:** Input audio must be **≤15 seconds** per talking clip. (For longer episodes, assemble multiple clips separated by authentic B-roll).
* **Master Resolution:** **1080 × 1920 (9:16 Vertical)**.

---

## 🛑 3. Character Development Gate (Episodes 1–20 Rule)

For **Episodes 1 through 20**, Rick Judson is in active character development with Milo:
* Subagents may autonomously research topics, draft scripts, verify facts, plan B-roll, and prepare approval cards.
* **HARD STOP:** **Rick must explicitly approve the exact spoken dialogue BEFORE generating TTS audio or running InfiniteTalk.**
* *This rule does not automatically expire at Episode 20; Rick must explicitly alter the gate.*

---

## 📋 4. Pre-Generation Approval Card Protocol

Before spending generation credits, present this card and pause for Rick's confirmation:

```markdown
### 🦧 MILO EPISODE APPROVAL CARD

* **Episode Number / Title:** [e.g. Episode #2: The Chief & The Straight-Through Drivers]
* **Hook (0:00–0:02):** [First spoken sentence / visual hook]
* **Exact Dialogue:** "[Full word-for-word transcript]"
* **Estimated Duration:** [e.g. 12 seconds]
* **Visual Scene / Pose:** [Location, background, Milo action]
* **Real B-Roll Required:** [List of authentic photos/videos of real landmarks/businesses]
* **Fact Check:** PASS
* **Sources & Evidence:** [Direct URLs / DB listing IDs]
* **Time-Sensitive Claims Verified:** YES / N/A
* **Unverified Claims:** 0
* **Ending Device:** [Reaction / Punchline / "Fix it." / CTA / Visual cut]
* **BestSeaToSky.com Verbal Mention:** YES / NO
* **"Fix it." Included in Script:** YES / NO
* **Production Plan:** [InfiniteTalk generation + B-roll cuts + wind ambience + captions]
* **Status:** 🛑 AWAITING RICK APPROVAL
```

---

## 🔍 5. Post-Generation Quality Control (QC) Checklist

Before presenting the final render for video sign-off, verify:

1. **Visual Continuity:** Milo matches v1.0 canon (faded blue coveralls, cap, MILO patch, fur texture, signature wrench).
2. **Lip-Sync Accuracy:** Mouth movement precisely tracks every spoken word; lips close when dialogue ends; no trailing audio after mouth stops.
3. **Audio Quality:** Clear Fenrir baritone, balanced volume, contextually appropriate environmental ambience (e.g., subtle workshop, wind, water, or street) present but never overpowering voice. Never add engine sounds to stationary cars.
4. **Captions:** Burned-in and native SRT/VTT, modern restrained typography, 100% transcript accuracy, spoken domain CTA formatted as **`bestseatosky.com`**, strictly within mobile 9:16 safe zones (not covering Milo's face or wrench).
5. **Authentic B-Roll:** All depicted real businesses, waterfalls, peaks, and attractions use verified, authentic imagery (no fake AI approximations).
6. **Formatting:** Clean 1080 × 1920 master with no black bars or baked-in platform UI icons.

---

## 🚦 6. The Three Distinct Approval Gates

Do not conflate development phases:

```
[1. Script Approval]  -->  Autonomous Media Generation & Assembly
         ↓
[2. Video Master Approval]  -->  Autonomous Platform Package Preparation
         ↓
[3. Live Publishing Authorization]  -->  Live Deployment to Meta / TikTok / YouTube
```

* **Gate 1:** Rick approves the exact dialogue.
* **Gate 2:** Rick reviews the finished 9:16 master cut.
* **Gate 3:** Rick explicitly authorizes external social publishing.

---

## 📦 7. Multi-Platform Distribution Packages

Upon Gate 2 approval, prepare tailored copy packages for:
* **YouTube Shorts:** Punchy title (≤60 chars), description with corridor keywords, tags, #Shorts.
* **TikTok:** Hook-heavy caption, trending sound/ambience tag, corridor hashtags.
* **Instagram Reels:** Clean brand copy, local geotag (Squamish/Whistler), collaboration invite, first comment.
* **Facebook Reels & Feed:** Community-focused caption, link to full guide where appropriate.
