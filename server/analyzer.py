import os
import json
from dotenv import load_dotenv
from models import Code_Block, AnalysisResult
from anthropic import Anthropic
from prompts import prompt

load_dotenv()

client = Anthropic(api_key=os.getenv("ANTHRO_API_KEY"))

def analyze_code(code_block: Code_Block) -> AnalysisResult:
    try:
        message = client.messages.create(
            model='claude-3-7-sonnet-20250219',
            max_tokens=2000,
            messages=[
                {"role": "user", "content": prompt.replace("{code_here}", code_block.code_text)}
            ]
        )
        print('Claude says:', message.content[0].text)
        
        json_string = message.content[0].text
        data = json.loads(json_string)
        analysis_result = AnalysisResult(
            line_count=data.get("line_count"),
            function_count=data.get("function_count"),
            variable_count=data.get("variable_count"),
            complexity_score=data.get("complexity_score"),
            conditional_statements_count=data.get("conditional_statements_count"),
            suggestions_list=data.get("suggestions_list", []),
            function_breakdown=data.get("function_breakdown", []),
            summary=data.get("summary", [])
        )
        
        print('Analysis Result:', analysis_result)
        
        return analysis_result
    except Exception as e:
        print('Error:', e)
        return False