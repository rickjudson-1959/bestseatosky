# ⚙️ Milo Production Pipeline Specification (v1.0)

> **Concise Technical Reference for the Currently Approved Production Stack.**  
> *Governed by [`MILO-BIBLE.md`](file:///Users/richardsjudson/bestseatosky/marketing/Milo/MILO-BIBLE.md) and [`milo-production/SKILL.md`](file:///Users/richardsjudson/bestseatosky/.agents/skills/milo-production/SKILL.md).*

---

## 🎬 Master Architecture

```
Approved Master Character Image (Milo the Sasquatch Welcomes Squamish.png)
      ↓
Google Gemini 3.1 Flash TTS
Parameters: Voice = "Fenrir" | Style = "Deadpan" | Pace = "Natural" | Accent = "Neutral"
      ↓
Final Approved Audio Stream (.mp3 / .wav)
      ↓
InfiniteTalk Engine (Kie.ai)
Payload: { image_url, audio_url }
      ↓
RAW MILO TALKING CLIP (Individual segments ≤15s | Episode #1 reference ~10s)
      ↓
CapCut / Automated Post-Production Assembly
+ Authentic Location B-roll (Real photos/videos of real subjects)
+ Contextually Appropriate Ambience (e.g., wind, water, workshop, street)
+ Burned-In Safe-Zone Captions
+ Clean Cut / Visual Transitions
      ↓
FINAL 9:16 SOCIAL MASTER (1080 × 1920)
      ↓
Rick Approval Gate
      ↓
Multi-Platform Publishing Package:
Facebook Reels | Instagram Reels | TikTok | YouTube Shorts
```

---

## 🔧 Technical Engine Specifications

| Component | Approved v1.0 Spec | Superseded / Obsolete Specs |
|---|---|---|
| **Voice Engine** | **Google Gemini 3.1 Flash TTS** (`google/gemini-3-1-flash-tts`) | ElevenLabs, OpenAI TTS (Rejected Legacy Experiments) |
| **Voice Persona** | **Fenrir** (`MILO_DEFAULT` per [`MILO_VOICE_LOCK.md`](./MILO_VOICE_LOCK.md)) | Charon, Sven, Puck, Zephyr (Strictly Prohibited) |
| **Lip-Sync Model** | **InfiniteTalk** on Kie.ai (`infinitetalk`) | Kling AI Avatar (`kling/ai-avatar-standard` - Obsolete) |
| **Talking Anchor** | [`marketing/Milo/Milo the Sasquatch Welcomes Squamish.png`](file:///Users/richardsjudson/bestseatosky/marketing/Milo/Milo%20the%20Sasquatch%20Welcomes%20Squamish.png) | AI approximations (Prohibited) |
| **Reaction Anchor** | [`marketing/Milo/ChatGPT Image Aug 22, 2026, 08_56_06 AM.png`](file:///Users/richardsjudson/bestseatosky/marketing/Milo/ChatGPT%20Image%20Aug%2022,%202026,%2008_56_06%20AM.png) | N/A |
| **Audio Ambience** | **Contextually Appropriate** (e.g. workshop, water, street, wind; `soundreality-wind-blowing-457954.mp3` is Ep #1 asset) | Universal static audio; synthetic car noises on static vehicles (Prohibited) |
| **Master Canvas** | **1080 × 1920 (9:16 Vertical)** | 1:1 Square (Cropped derived format only) |

---

## ⚠️ Versioned Production Constraints
* **InfiniteTalk Audio Limit:** Uploaded audio stream must not exceed **≤15 seconds** per generation task. Episode #1 established an optimal reference duration of approximately **10 seconds**. For 20–30s cuts, generate two ≤15s talking clips and intercut with authentic corridor scenery.
* **Ambient Sound Discipline:** Ambience must match what is actually present in the scene (e.g., subtle tools/creaks in a garage, gentle water at a falls). Never add noise merely because an object appears in frame.
* **Technology vs Character:** If future talking models surpass InfiniteTalk, the engine may be updated without altering Milo's character canon.
