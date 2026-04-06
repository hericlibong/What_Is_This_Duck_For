# Implementation Plan: Institutional UI Redesign

This document outlines the phased transition from a developer prototype to an immersive, bureaucratic-serious interface.

## Core Aesthetic
- **Visuals**: Harsh contrasts, paper/manila tones, sharp edges (2px radius max).
- **Typography**: Courier/Monospace for data, Impact/Serif for headers.
- **Tone**: "Serious inquiry into a trivial object."

## Phased Roadmap

### Phase 1: Visual Foundations (Done)
- Introduce CSS variables for institutional colors.
- Set global typography (Courier New & Impact).
- Add flat, harsh box-shadows.
- **Goal**: Establish the mood without changing structure.

### Phase 2: Structural Framing (Current)
- **Header**: Restructure into a "Department Letterhead" with contextual labels and a minimal nav.
- **Duck Area**: Add "Evidence Exhibit" framing (crosshairs, bounding boxes, or mock scale lines).
- **Report Panel**: Initial structural shift toward a "Dossier" layout.
- **Goal**: Reframe the content as an official inspection.

### Phase 3: Interactive Dossier & Actions (Done)
- Action Buttons: Redesign into physical terminal-style buttons.
- Report Card: Deep structural redesign into an official form with metadata fields (Case ID, Timestamp, Stamped Status).
- JS Integration: Ensure the dynamic injection matches the new structural complexity.
- **Goal**: Full immersion in the document-based reporting system.


### Phase 4: Polish & Interaction
- **Micro-interactions**: Harsh hover states (color inversion), loading animations (mock "Scanning" text).
- **Mobile Audit**: Ensure the "Dossier" feel translates to small screens.
- **Final Cleanup**: CSS/HTML optimization.
- **Goal**: Final aesthetic and functional verification.
