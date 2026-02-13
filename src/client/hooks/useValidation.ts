import { useState } from "react";
import { ValidationResult } from "../../shared/types/types";

export function useValidation(
  letters: string[],
  dayId: string,
  username: string
) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const validateWord = async (word: string): Promise<ValidationResult> => {
    setLoading(true);
    setError(null);

    try {
      const res = await fetch("/api/validate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ word, letters, dayId, username }),
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.error || "Validation failed");
      }

      const data = await res.json();

      if (data.valid) {
        return {
          valid: true,
          wordData: {
            word: word.toUpperCase(),
            score: data.score,
            length: word.length,
            timestamp: Date.now(),
            isSnooed: false,
          },
        };
      } else {
        return {
          valid: false,
          error: data.error,
        };
      }
    } catch (err) {
      const errorMsg = err instanceof Error ? err.message : "Validation failed";
      setError(errorMsg);
      return {
        valid: false,
        error: errorMsg,
      };
    } finally {
      setLoading(false);
    }
  };

  return { validateWord, loading, error };
}