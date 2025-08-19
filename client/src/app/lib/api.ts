import { API_BASE_URL } from "../constants";

export interface CodeAnalysisRequest {
  code_text: string;
  language: string;
  file_name: string;
}

export interface Suggestion {
  message: string;
  severity: "critical" | "warning" | "info" | "good";
}

export interface AnalysisResult {
  is_code: boolean;
  line_count: number;
  function_count: number;
  variable_count: number;
  complexity_score: number;
  conditional_statements_count: number;
  suggestions_list: Suggestion[];
  function_breakdown: string[];
  summary: string[];
}

export class ApiError extends Error {
  constructor(message: string, public status?: number) {
    super(message);
    this.name = "ApiError";
  }
}

export async function analyzeCode(
  request: CodeAnalysisRequest
): Promise<AnalysisResult> {
  try {
    const response = await fetch(`${API_BASE_URL}/analyze`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(request),
    });

    if (!response.ok) {
      throw new ApiError(
        `Analysis failed: ${response.status} ${response.statusText}`,
        response.status
      );
    }

    const data = await response.json();
    return data;
  } catch (error) {
    if (error instanceof ApiError) {
      throw error;
    }

    throw new ApiError(
      error instanceof Error ? error.message : "Unknown error occurred",
      undefined
    );
  }
}
