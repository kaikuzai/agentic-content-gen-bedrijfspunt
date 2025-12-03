import { useState } from "react";
import apiClient from "../services/apiClient";

export type CloudProvider = "AZURE" | "GCP" | "AWS";

export interface Ticket {
  ticket_type: "frontend" | "backend" | "infra";
  number: number;
  title: string;
  description: string;
}

export interface GenerateIdeaResponse {
  assessment: string;
  tickets: Ticket[];
}

export const useGenerateIdea = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [data, setData] = useState<GenerateIdeaResponse | null>(null);

  const generateIdea = async (
    idea: string,
    cloudProvider: CloudProvider,
    userCount: string
  ) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await apiClient.post<GenerateIdeaResponse>(
        "/api/agents/generate-idea/",
        { idea, cloudProvider, userCount }
      );

      const result = response.data;
      setData(result);
      return result;
    } catch (err: any) {
      const errorMessage =
        err.response?.data?.error ||
        err.message ||
        "An unexpected error occurred.";
      setError(errorMessage);
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  return { generateIdea, data, isLoading, error };
};
