import os
import json
from google import genai
from dotenv import load_dotenv
from .prompts import SYSTEM_PROMPT, get_prompt_for_mode

load_dotenv()

class GeminiService:
    def __init__(self):
        self.api_key = os.getenv("GEMINI_API_KEY")
        self.model_id = "gemini-2.0-flash"
        self.client = None
        if self.api_key:
            self.client = genai.Client(api_key=self.api_key)

    async def generate_analysis(self, mode: str):
        if not self.client:
            raise ValueError("GEMINI_API_KEY is not set. Please configure it in your .env file.")
        
        prompt = get_prompt_for_mode(mode)
        
        try:
            response = self.client.models.generate_content(
                model=self.model_id,
                config={
                    "system_instruction": SYSTEM_PROMPT,
                    "response_mime_type": "application/json"
                },
                contents=prompt
            )
            
            # The genai library handles the JSON structure if we specify the response_mime_type
            # We just need to parse it to ensure it's valid for our application
            data = json.loads(response.text)
            
            # Add the mode back to the data for frontend identification
            data["mode"] = mode
            return data
            
        except Exception as e:
            print(f"Gemini API Error: {str(e)}")
            # Fallback error response that still respects the structure
            return {
                "mode": mode,
                "hypothesis": "The duck has generated a temporary cognitive static field.",
                "classification": "Non-Responsive Synthetic Material",
                "threat_level": "Unclear",
                "confidence": 0,
                "conclusion": "The duck refuses to be analyzed at this time."
            }
