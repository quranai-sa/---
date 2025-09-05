import { GoogleGenAI, Type } from '@google/genai';
import { Category } from '../types';

/**
 * AI Service for intelligent search and filtering
 * Handles Google Gemini AI integration for enhanced user experience
 */

const getApiKey = (): string => {
  const apiKey = (import.meta as any).env?.VITE_GOOGLE_AI_API_KEY || process.env.API_KEY;
  if (!apiKey) {
    throw new Error('Google AI API key is not configured. Please set VITE_GOOGLE_AI_API_KEY in your environment variables.');
  }
  return apiKey;
};

const ai = new GoogleGenAI({ apiKey: getApiKey() });

const responseSchema = {
  type: Type.OBJECT,
  properties: {
    filters: {
      type: Type.OBJECT,
      properties: {
        categoryId: {
          type: Type.STRING,
          description: 'The category ID that best matches the query.',
        },
      },
      required: [],
    },
    explanation: {
      type: Type.STRING,
      description: 'A brief, friendly explanation for the user about the filters applied, in their language.',
    },
  },
  required: ['filters', 'explanation'],
};

export interface AIFilters {
    categoryId?: string;
}

export interface AIResponse {
    filters: AIFilters;
    explanation: string;
}

export const getIntelligentFilters = async (
  query: string,
  categories: Category[],
): Promise<AIResponse> => {
  const usableCategories = categories.filter(c => c.id !== 'all');
  const categoryList = usableCategories.map(c => `- ${c.name} (id: ${c.id})`).join('\n');

  const prompt = `You are an intelligent library assistant for the King Fahd Complex Digital Library. Your task is to analyze the user's search query and convert it into structured filter criteria. The user's language is Arabic.

  The user's query is: "${query}"

  Here are the available filter options:
  
  **Categories:**
  ${categoryList}

  Please respond with a JSON object that strictly adheres to the provided schema. The JSON object should contain two properties: 'filters' and 'explanation'.
  - The 'filters' object should contain the 'categoryId' that best matches the query. If a filter is not mentioned or implied, omit its key.
  - The 'explanation' should be a short, friendly message in Arabic explaining which filters you've applied. If no specific filters are found, explain that you are showing all results related to their search term.
  
  Example query: "show me kids books"
  Example JSON response:
  {
    "filters": {
      "categoryId": "special"
    },
    "explanation": "لقد قمت بفلترة النتائج لعرض الإصدارات الخاصة التي تتضمن إصدارات للأطفال."
  }`;

  const response = await ai.models.generateContent({
    model: 'gemini-2.5-flash',
    contents: prompt,
    config: {
      responseMimeType: 'application/json',
      responseSchema: responseSchema,
    },
  });
  
  const jsonText = response.text.trim();
  return JSON.parse(jsonText);
};
