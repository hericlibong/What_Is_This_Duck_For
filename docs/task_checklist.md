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

## Phase 5: Aesthetic Polish (Next Focus)
- [ ] UI visual polish and layout refinement
- [ ] Add a more "magnificent" visual representation for the duck
- [ ] Refine the loading/scanning visual feedback in the report panel
- [ ] Final visual audit (spacing, typography, "bureaucratic" feel)

### UI Refactor (feature/ui-refactor)
- [ ] Apply new title hierarchy
- [ ] Update button labels
- [ ] Simplify header
- [ ] Add About link
- [ ] Refine report panel layout

## Phase 6: Final Review
- [ ] Clean up redundant code/logs
- [ ] Final documentation audit
- [ ] README refinement for final submission
- [ ] Verify that all secrets are safely excluded
