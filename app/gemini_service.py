import os
import json
from datetime import datetime
from google import genai
from dotenv import load_dotenv
from .prompts import SYSTEM_PROMPT, get_prompt_for_mode

load_dotenv()

class GeminiService:
    def __init__(self):
        self.api_key = os.getenv("GEMINI_API_KEY")
        self.model_id = "gemini-2.5-flash"
        self.client = None
        self.log_dir = "logs"
        self.log_file = os.path.join(self.log_dir, "duck_analysis.log")
        
        # Ensure logs directory exists
        if not os.path.exists(self.log_dir):
            os.makedirs(self.log_dir)
            
        if self.api_key:
            self.client = genai.Client(api_key=self.api_key)

    def _log_to_file(self, mode: str, result: dict, error: str = None):
        """Simple JSON Lines logger for development debugging."""
        log_entry = {
            "timestamp": datetime.now().isoformat(),
            "mode": mode,
            "model_id": self.model_id,
            "result": result,
            "error": error
        }
        try:
            with open(self.log_file, "a", encoding="utf-8") as f:
                f.write(json.dumps(log_entry) + "\n")
        except Exception as log_err:
            print(f"Failed to write to log file: {str(log_err)}")

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
            data = json.loads(response.text)
            
            # Add the mode back to the data for frontend identification
            data["mode"] = mode
            
            # Log the successful analysis
            self._log_to_file(mode, data)
            
            return data
            
        except Exception as e:
            error_msg = str(e)
            print(f"Gemini API Error: {error_msg}")
            
            # Fallback error response that still respects the structure
            fallback = {
                "mode": mode,
                "hypothesis": "The duck has generated a temporary cognitive static field.",
                "classification": "Non-Responsive Synthetic Material",
                "threat_level": "Unclear",
                "confidence": 0,
                "conclusion": "The duck refuses to be analyzed at this time."
            }
            
            # Log the error and fallback
            self._log_to_file(mode, fallback, error=error_msg)
            
            return fallback
