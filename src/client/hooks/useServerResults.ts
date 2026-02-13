import { useEffect, useState } from "react";
import type { LeaderboardEntry } from "../../shared/types/types";

interface ResultData {
  wordList: string[];
  leaderboard: LeaderboardEntry[];
}

export function useServerResults(dayId: string) {
  const [data, setData] = useState<ResultData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchResults = async () => {
      try {
        const res = await fetch(`/api/results/${dayId}`);

        if (!res.ok) {
          throw new Error("Failed to fetch results");
        }

        const json = await res.json();
        setData(json);
      } catch (err) {
        console.error("Failed to fetch results", err);
        setError("Unable to load results");
      } finally {
        setLoading(false);
      }
    };

    if (dayId) {
      fetchResults();
    }
  }, [dayId]);

  return { data, loading, error };
}