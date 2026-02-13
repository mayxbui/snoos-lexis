
import { getDailyGame } from "./routes/daily";
import { getValidation } from "./routes/validate";
import { getResults } from "./routes/results";

const app = new Hono();
  console.log("Server booting...");
app.get("/api/user", async (c: Context) => {
  try {
    const username = c.req.header("x-reddit-user") || c.req.header("username") || "anonymous";
    return c.json({ username });
  } catch (error) {
    return c.json({ username: "anonymous" });
  }
});

app.get("/api/daily", getDailyGame);
app.post("/api/validate", getValidation);
app.get("/api/results/:dayId", getResults);

app.notFound((c) => {
  return c.json({ error: "Not Found" }, 404);
});

app.onError((err, c) => {
  console.error("Server error:", err);
  return c.json({ error: "Internal server error" }, 500);
});

export default app;