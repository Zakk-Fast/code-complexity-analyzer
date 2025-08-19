from pydantic import BaseModel
from enum import Enum

class Language(str, Enum):
    JAVASCRIPT = 'javascript'
    TYPESCRIPT = "typescript"
    PYTHON = "python"
    JAVA = "java"
    CSHARP = "csharp"
    UNKNOWN = "unknown"
    

class Code_Block(BaseModel):
    language: Language
    code_text: str
    file_name: str
    
class AnalysisResult(BaseModel):
    is_code: bool
    line_count: int
    function_count: int
    variable_count: int
    complexity_score: int
    conditional_statements_count: int
    suggestions_list: list[str]
    function_breakdown: list[str]
    summary: list[str]