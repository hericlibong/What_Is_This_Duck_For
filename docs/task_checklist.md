# Task Checklist: WHAT IS THIS DUCK FOR?

Keep track of the absurdity as it unfolds.

## Phase 1: Infrastructure (Done)
- [x] Project bootstrapped (FastAPI + Python .venv)
- [x] Dependencies installed (fastapi, uvicorn, jinja2, google-genai, etc.)
- [x] FastAPI skeleton created (app/main.py)
- [x] Static and template folder structure implemented

## Phase 2: Interface (Done)
- [x] Single-page UI created (centered on the duck)
- [x] "What Is This Duck For?" branding and explicit title set
- [x] 5 final action buttons added with official-looking labels
- [x] Button modes mapped in frontend JS (`triggerMode` logic)
- [x] Report/Result panel initialized with "No official conclusion" text

## Phase 3: Behavior & Logic (Done)
- [x] Create `docs/` folder for internal documentation
- [x] Define generation philosophy (Claim -> Interpretation)
- [x] Implement multi-mode handler in `app/main.py`
- [x] Connect `GeminiService` to real mode calls

## Phase 4: AI & Tone (Done)
- [x] Create refined system prompts for each of the 5 modes
- [x] Stabilize personas (Mock-Expert, Overthinker, Clerk, Believer, Conspiracy Theorist)
- [x] Enforce "Comic Plausibility" and "Functional Theory" rules
- [x] Implement local debug logging for prompt verification

## Phase 5: Aesthetic Polish (Current)
- [x] Apply institutional color palette and bureaucratic typography (Phase 1)
- [x] Restructure header and duck "Evidence Exhibit" framing (Phase 2)
- [ ] Redesign report panel into a "Case Dossier" and restyle action buttons (Phase 3)
- [ ] Final polish (CSS states, mobile responsiveness) (Phase 4)

## Phase 6: Final Review
- [ ] Clean up redundant code/logs
- [ ] Final documentation audit
- [ ] README refinement for final submission
- [ ] Verify that all secrets are safely excluded
