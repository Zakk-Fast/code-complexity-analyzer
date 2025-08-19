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
    
class SeverityLevel(str, Enum):
    CRITICAL = 'critical'
    WARNING = 'warning'
    INFO = 'info'
    GOOD = 'good'

class Suggestion(BaseModel):
    message: str
    severity: SeverityLevel

class AnalysisResult(BaseModel):
    is_code: bool
    line_count: int
    function_count: int
    variable_count: int
    complexity_score: int
    conditional_statements_count: int
    suggestions_list: list[Suggestion]
    function_breakdown: list[str]
    summary: list[str]