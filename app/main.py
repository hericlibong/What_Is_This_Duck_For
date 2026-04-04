import os
from fastapi import FastAPI, Request, HTTPException
from fastapi.responses import HTMLResponse
from fastapi.staticfiles import StaticFiles
from fastapi.templating import Jinja2Templates
from pydantic import BaseModel
from dotenv import load_dotenv
from .gemini_service import GeminiService

# Load environment variables
load_dotenv()

app = FastAPI(title="What Is This Duck For?")

# Static files and templates
app.mount("/static", StaticFiles(directory="app/static"), name="static")
templates = Jinja2Templates(directory="app/templates")

# Initialize Gemini Service
gemini_service = GeminiService()

class AnalyzeRequest(BaseModel):
    mode: str

@app.get("/", response_class=HTMLResponse)
async def read_root(request: Request):
    return templates.TemplateResponse(
        request=request,
        name="index.html",
        context={"title": "WHAT IS THIS DUCK FOR?"}
    )

@app.post("/analyze")
async def analyze_duck(request_data: AnalyzeRequest):
    valid_modes = ["analyze", "deeper", "ministry", "trust", "distrust"]
    if request_data.mode not in valid_modes:
        raise HTTPException(status_code=400, detail="Invalid analysis mode.")
    
    try:
        result = await gemini_service.generate_analysis(request_data.mode)
        return result
    except ValueError as ve:
        # Gracefully handle missing API key
        raise HTTPException(status_code=400, detail=str(ve))
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=int(os.getenv("PORT", 8000)))
