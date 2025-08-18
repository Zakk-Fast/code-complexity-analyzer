prompt = """You are a code analysis expert. Analyze the following code and return your response as valid JSON in exactly this format:

{
    "line_count": 0,
    "function_count": 0,
    "variable_count": 0,
    "complexity_score": 0,
    "conditional_statements_count": 0,
    "suggestions_list": [],
    "function_breakdown": [],
    "summary": []
}

Instructions:
- line_count: Total lines of code (excluding empty lines and comments)
- function_count: Number of functions/methods defined
- variable_count: Number of variables declared
- complexity_score: Rate complexity from 1-100 (1=very simple, 100=extremely complex)
- conditional_statements_count: Number of if/else/switch statements
- suggestions_list: Array of strings with specific improvement suggestions
- function_breakdown: Array of strings describing each function (e.g., "handleSubmit: high complexity due to nested conditions")
- summary: Array of strings with 2-3 sentences summarizing the code's purpose and overall quality

Code to analyze:
{code_here}

Return ONLY the JSON response as plain text, no code blocks, no markdown formatting, no additional text."""
