import os
import json
from dotenv import load_dotenv
from models import Code_Block, AnalysisResult, Language
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
        
        print('Sending to Claude:', repr(code_block.code_text))
        print('Claude says:', message.content[0].text)
        
        json_string = message.content[0].text
        data = json.loads(json_string)
        analysis_result = AnalysisResult(
            is_code=data.get("is_code", True),
            language=Language(data.get("language", "unknown")),
            line_count=data.get("line_count", 0),
            function_count=data.get("function_count", 0),
            variable_count=data.get("variable_count", 0),
            complexity_score=data.get("complexity_score", 0),
            conditional_statements_count=data.get("conditional_statements_count", 0),
            suggestions_list=data.get("suggestions_list", []),
            function_breakdown=data.get("function_breakdown", []),
            summary=data.get("summary", []),
            success=True,
            error=None
        )
        
        print('Analysis Result:', analysis_result)
        
        return analysis_result
    except json.JSONDecodeError as e:
        print('JSON parsing error:', e)
        # Return a failed analysis result instead of raising an exception
        return AnalysisResult(
            is_code=False,
            language=Language.UNKNOWN,
            line_count=0,
            function_count=0,
            variable_count=0,
            complexity_score=0,
            conditional_statements_count=0,
            suggestions_list=[],
            function_breakdown=[],
            summary=["Failed to parse analysis response from AI model"],
            success=False,
            error="Failed to parse analysis response from AI model"
        )
    except Exception as e:
        print('Error:', e)
        # Return a failed analysis result instead of raising an exception
        return AnalysisResult(
            is_code=False,
            language=Language.UNKNOWN,
            line_count=0,
            function_count=0,
            variable_count=0,
            complexity_score=0,
            conditional_statements_count=0,
            suggestions_list=[],
            function_breakdown=[],
            summary=[f"Analysis failed: {str(e)}"],
            success=False,
            error=f"Analysis failed: {str(e)}"
        )