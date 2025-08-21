from pydantic import BaseModel
from enum import Enum

class Language(str, Enum):
    AUTO = 'auto'
    JAVASCRIPT = 'javascript'
    TYPESCRIPT = 'typescript'
    PYTHON = 'python'
    JAVA = 'java'
    CSHARP = 'csharp'
    CPP = 'cpp'
    C = 'c'
    GO = 'go'
    RUST = 'rust'
    PHP = 'php'
    RUBY = 'ruby'
    SWIFT = 'swift'
    KOTLIN = 'kotlin'
    SCALA = 'scala'
    R = 'r'
    MATLAB = 'matlab'
    PERL = 'perl'
    LUA = 'lua'
    DART = 'dart'
    ELIXIR = 'elixir'
    HASKELL = 'haskell'
    CLOJURE = 'clojure'
    SHELL = 'shell'
    BASH = 'bash'
    POWERSHELL = 'powershell'
    SQL = 'sql'
    HTML = 'html'
    CSS = 'css'
    JSON = 'json'
    XML = 'xml'
    YAML = 'yaml'
    TOML = 'toml'
    MARKDOWN = 'markdown'
    UNKNOWN = 'unknown'
    

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
    language: Language
    line_count: int
    function_count: int
    variable_count: int
    complexity_score: int
    conditional_statements_count: int
    suggestions_list: list[Suggestion]
    function_breakdown: list[str]
    summary: list[str]
    error: str | None = None
    success: bool = True