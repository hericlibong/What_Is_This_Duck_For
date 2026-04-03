import os
from fastapi import FastAPI, Request
from fastapi.responses import HTMLResponse
from fastapi.staticfiles import StaticFiles
from fastapi.templating import Jinja2Templates
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

app = FastAPI(title="What Is This Duck For?")

# Static files and templates
app.mount("/static", StaticFiles(directory="app/static"), name="static")
templates = Jinja2Templates(directory="app/templates")

@app.get("/", response_class=HTMLResponse)
async def read_root(request: Request):
    return templates.TemplateResponse(
        request,
        "index.html",
        {"title": "Ministry of Synthetic Anatidae"}
    )

@app.get("/analyze")
async def analyze_duck():
    # Placeholder for Gemini analysis
    return {"message": "Searching for meaning in the yellow void..."}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=int(os.getenv("PORT", 8000)))
