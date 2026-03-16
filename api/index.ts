import express from "express";
import { db } from "../server/db.js";
import { umrahPrograms } from "../shared/schema.js";
import { eq, asc } from "drizzle-orm";

const app = express();
app.use(express.json());

app.get("/api/programs", async (_req, res) => {
  try {
    const programs = await db
      .select()
      .from(umrahPrograms)
      .where(eq(umrahPrograms.is_active, true))
      .orderBy(asc(umrahPrograms.sort_order));
    res.json(programs);
  } catch (err) {
    console.error("Error fetching programs:", err);
    res.status(500).json({ error: "Failed to fetch programs" });
  }
});

app.get("/api/programs/:slug", async (req, res) => {
  try {
    const { slug } = req.params;
    const [program] = await db
      .select()
      .from(umrahPrograms)
      .where(eq(umrahPrograms.slug_url, slug))
      .limit(1);
    if (!program || !program.is_active) {
      return res.status(404).json({ error: "Program not found" });
    }
    res.json(program);
  } catch (err) {
    console.error("Error fetching program:", err);
    res.status(500).json({ error: "Failed to fetch program" });
  }
});

export default app;
