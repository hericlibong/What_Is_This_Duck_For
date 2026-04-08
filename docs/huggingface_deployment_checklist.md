# Hugging Face Spaces Deployment Checklist: WHAT IS THIS DUCK FOR?

This document serves as the official execution memo for deploying the "WHAT IS THIS DUCK FOR?" project to Hugging Face Spaces using the Docker SDK.

## 1. Purpose
To provide a safe, repeatable, and verified deployment workflow for the project demo on Hugging Face Spaces, ensuring the local development environment remains clean.

## 2. Branch Strategy
- [ ] Create a dedicated deployment branch: `deploy-hf`.
- [ ] Ensure all final UI refinements from `main` are merged into `deploy-hf`.
- [ ] Use `deploy-hf` exclusively for infrastructure files (`Dockerfile`, HF metadata).

## 3. Pre-deployment Checks
- [ ] **UI Stability:** Verify the homepage hero area and button grid are stable.
- [ ] **About Page:** Confirm the About page is functional and accessible via navigation.
- [ ] **Static Assets:** Ensure all duck personas and assets in `/static/assets` are present.
- [ ] **Error Handling:** Verify the app handles 429 (API quota) and 500 errors gracefully in the UI.

## 4. Required Hugging Face Files/Configuration
- [ ] **README.md (Metadata):** Add YAML header to the root `README.md` on the `deploy-hf` branch:
  ```yaml
  title: What Is This Duck For?
  emoji: 🦆
  colorFrom: yellow
  colorTo: gray
  sdk: docker
  app_port: 7860
  ```
- [ ] **Dockerfile:** Prepare a multi-stage or optimized Dockerfile in the root.
  - [ ] Base image: `python:3.11-slim`.
  - [ ] Port: Must expose and bind to `7860`.
  - [ ] Command: Use `uvicorn app.main:app --host 0.0.0.0 --port 7860`.
- [ ] **.dockerignore:** Create to exclude `.venv`, `__pycache__`, and local `.env` files.

## 5. Secrets & Environment Variables
- [ ] **GOOGLE_API_KEY:** Prepare the Gemini API key for injection into HF Secrets.
- [ ] **ENV:** Set to `production` if the app logic requires it.

## 6. Local Validation Checklist (MANDATORY)
- [ ] Build the container locally: `docker build -t duck-hf-test .`
- [ ] Run the container locally on the target port:
  `docker run -p 7860:7860 --env GOOGLE_API_KEY=your_key_here duck-hf-test`
- [ ] **Verification Flows:**
  - [ ] Access `http://localhost:7860/` in a browser.
  - [ ] Verify static images load (Duck hero, icons).
  - [ ] Perform a full "Analyze" flow to confirm API connectivity.
  - [ ] Check navigation to the About page.

## 7. Hugging Face Space Creation Checklist
- [ ] Create a new Space on Hugging Face.
- [ ] Select **Docker** as the SDK.
- [ ] Navigate to **Settings > Variables and secrets**.
- [ ] Add `GOOGLE_API_KEY` as a **Secret**.

## 8. Push / Build / Verification Checklist
- [ ] Add the Hugging Face Space as a git remote.
- [ ] Push the `deploy-hf` branch to the HF remote.
- [ ] Monitor the **Build Logs** in the HF UI for errors.
- [ ] Monitor the **Container Logs** for runtime startup issues.

## 9. Post-Deployment Verification
- [ ] **Public Access:** Open the Space URL in an Incognito window.
- [ ] **Functional Test:** Trigger each analysis mode (Standard, Deeper, Trust, Ministry, Distrust).
- [ ] **Responsive Test:** Verify the 2x2 button grid layout on mobile/narrow screens.
- [ ] **Metadata Test:** Verify the Space emoji and title appear correctly in the HF gallery.

## 10. Rollback & Troubleshooting
- [ ] **Port Error:** If the app is unreachable, verify `app_port: 7860` in `README.md` matches the Docker `EXPOSE` and `uvicorn` port.
- [ ] **API Failure:** If analysis fails, check HF Secret logs for "Environment Variable" access issues.
- [ ] **Rollback:** To "unpublish," delete the Space or push an empty/fix branch to HF.
- [ ] **Logs:** Always check the "Logs" tab on the HF Space page for Python tracebacks.
