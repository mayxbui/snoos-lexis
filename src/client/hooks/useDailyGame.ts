import { useEffect, useState } from "react";

interface DailyGameResponse {
  id: string;
  letters: string[];
}

export function useDailyGame() {
  const [letters, setLetters] = useState<string[]>([]);
  const [dayId, setDayId] = useState<string>("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchDailyGame = async () => {
      try {
        console.log("Fetching daily game...");
        const res = await fetch("/api/daily");

        if (!res.ok) {
          throw new Error(`HTTP ${res.status}: ${res.statusText}`);
        }

        const data: DailyGameResponse = await res.json();
        console.log("Daily game data:", data);

        setLetters(data.letters);
        setDayId(data.id);
      } catch (err) {
        console.error("Daily game error:", err);
        setError(err instanceof Error ? err.message : "Unable to load daily game");
      } finally {
        setLoading(false);
      }
    };

    fetchDailyGame();
  }, []);

  return {
    letters,
    dayId,
    loading,
    error,
  };
}