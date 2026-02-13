import { useState, useEffect } from "react";

export function useRedditUser() {
  const [username, setUsername] = useState<string>("anonymous");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await fetch("/api/user");
        const data = await res.json();
        setUsername(data.username);
      } catch (error) {
        console.error("Failed to fetch user:", error);
        setUsername("anonymous");
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  return { username, loading };
}