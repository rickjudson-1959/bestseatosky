# 🔒 Milo the Sasquatch: Canonical Fenrir Voice Lock

> **Binding Voice Lock Specification & Authority Standard**  
> *Ratified by Rick Judson — September 4, 2026*  
> *Governed under [`MILO-BIBLE.md`](./MILO-BIBLE.md) and [`milo-production/SKILL.md`](../../.agents/skills/milo-production/SKILL.md)*

---

## 🎙️ 1. Sole Authorized Voice Engine

| Parameter | Mandatory Locked Specification |
|---|---|
| **TTS Model Provider** | **Google Gemini 3.1 Flash TTS** (`google/gemini-3-1-flash-tts` / `gemini-3.1-flash-tts-preview`) |
| **Voice Name** | **Fenrir** |
| **Pace Parameter** | **Natural** |
| **Accent** | **Neutral** |
| **Delivery Style** | **Deadpan** |
| **Temperature** | `1.0` |
| **Dialogue Mode** | `single` |
| **Prohibited Voices** | **Charon, Sven, ElevenLabs, Zephyr, Puck, and all other models/voices are STRICTLY PROHIBITED.** |

---

## 🏛️ 2. Reference Hierarchy & Delivery Modes

### 🥇 Rank 1: Master Reference Authority (Immutable Baseline)
* **Designation**: `MILO_MASTER_BASELINE`
* **File Path**: [`marketing/Milo/voice/Milo_Approved_Fenrir_Master.wav`](./voice/Milo_Approved_Fenrir_Master.wav)
* **Duration**: **12.20 seconds** (PCM 16-bit, 24,000 Hz, Mono)
* **SHA-256 Checksum**: `dd4309e4d5e0268abf3c715a2a56d1b47334b755ac2839ad58c3573628670610`
* **Authority**: The ultimate vocal benchmark. All future generations must match the timbre, age, gravel, and cadence of this recording.

---

### 🥈 Rank 2: Default Production Delivery (Approved)
* **Designation**: `MILO_DEFAULT`
* **File Path**: [`marketing/Milo/voice/Milo_Audition_1_Natural_Deadpan.wav`](./voice/Milo_Audition_1_Natural_Deadpan.wav)
* **Duration**: **5.00 seconds** (PCM 16-bit, 24,000 Hz, Mono)
* **SHA-256 Checksum**: `8b32398a02b32e0f174717b4c8b47fd1cbc90b04b493b1673f957ee3d3a4d608`
* **Style Prompt (`sample_context`)**:
  > *"Natural, dry, understated deadpan delivery. Calm, intelligent, confident speech with clean pacing and zero theatrical exaggeration."*
* **Audio Profile**:
  > *"Male, about 45. Medium-deep voice, slight natural gravel, intelligent, dry humour, neutral accent. Natural conversational deadpan."*
* **Operational Scope**: **Mandatory default for all standard Milo episodes, video shorts, and reels.**

---

### 🥉 Rank 3: Alternate Mood — Slow & Gravelly (Conditionally Approved)
* **Designation**: `MILO_SLOW_GRAVELLY`
* **File Path**: [`marketing/Milo/voice/Milo_Audition_2_Slow_Gravelly.wav`](./voice/Milo_Audition_2_Slow_Gravelly.wav)
* **Duration**: **12.80 seconds** (PCM 16-bit, 24,000 Hz, Mono)
* **SHA-256 Checksum**: `c7c367cb7fbb894e55e92540fc6efe0fde2ec5aa01b82fa49d2880ed5bc040bd`
* **Style Prompt (`sample_context`)**:
  > *"Unhurried, dry, gravelly deadpan delivery. Slower cadence, deliberate pauses between sentences. Very understated, low energy, mature local."*
* **Audio Profile**:
  > *"Male, about 48. Deep voice, distinct natural gravel and texture, slow and unhurried cadence, dry and understated, weary but sharp local."*
* **Operational Gate**: **Requires explicit Rick Judson approval prior to production.** May only be proposed for intentionally serious, reflective, weary, or sarcastic scenes with extended pauses. **Zero autonomous selection permitted.**

---

### 🚫 Rejected Auditions & Legacy Experiments (Archived)
* **`Milo_Audition_3_Reference_Matched.wav`**:
  * **Designation**: `DO_NOT_USE`
  * **Status**: **Archived**. Its earlier filename/description does not constitute approval.
* **Legacy Pre-Episode 1 Experiments (Charon, Sven, ElevenLabs, Puck)**:
  * **Designation**: `REJECTED_LEGACY_DO_NOT_USE`
  * **Status**: Retained in `marketing/Milo/Mio Voice Tests/` solely for audit history. Never permitted in production.

---

## ⚙️ 3. Canonical API Payload Structure

All Milo dialogue generation scripts must use this exact payload shape, with environment-only credential loading (`process.env.KIE_API_KEY`):

```javascript
import fs from 'node:fs';
import path from 'node:path';

const API_KEY = process.env.KIE_API_KEY;
if (!API_KEY) {
  throw new Error("KIE_API_KEY is missing. Load it securely from .env.local.");
}

const payload = {
  model: 'google/gemini-3-1-flash-tts',
  input: {
    sample_context: "Natural, dry, understated deadpan delivery. Calm, intelligent, confident speech with clean pacing and zero theatrical exaggeration.",
    speakers: [
      {
        speaker_id: "Speaker 1",
        voice_name: "Fenrir",
        style: "Deadpan",
        pace: "Natural",
        accent: "Neutral",
        audio_profile: "Male, about 45. Medium-deep voice, slight natural gravel, intelligent, dry humour, neutral accent. Natural conversational deadpan."
      }
    ],
    temperature: 1.0,
    model: "gemini-3.1-flash-tts-preview",
    dialogue_mode: "single",
    scene: "A lifelong Squamish local Sasquatch speaking directly to visitors about the Sea-to-Sky corridor. He loves the area, knows it intimately, and is mildly amused by poor decisions.",
    dialogue_turns: [
      {
        speaker_id: "Speaker 1",
        text: "[Exact episode script with [pause] markup]"
      }
    ]
  }
};
```

---

## 🛡️ 4. Mandatory Production Pre-Render Gate

Before **ANY** Milo video rendering or lip-sync task begins:

1. **Audio-First Generation**: Generate the full dialogue audio track before submitting any video/lip-sync jobs.
2. **Reference Benchmark**: Compare the generated take against [`Milo_Approved_Fenrir_Master.wav`](./voice/Milo_Approved_Fenrir_Master.wav) and [`Milo_Audition_1_Natural_Deadpan.wav`](./voice/Milo_Audition_1_Natural_Deadpan.wav).
3. **Metadata Audit**: Verify model (`google/gemini-3-1-flash-tts`), voice (`Fenrir`), and profile.
4. **Rick Approval on Material Doubt**: If voice delivery varies noticeably from the standard, stop and present audio to Rick for sign-off.
5. **Fail-Closed**: Do not proceed to InfiniteTalk lip-sync until the audio track is 100% verified.
