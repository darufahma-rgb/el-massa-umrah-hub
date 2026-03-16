import express from "express";
import { db } from "./db.js";
import { umrahPrograms } from "../shared/schema.js";
import { eq, asc } from "drizzle-orm";
import path from "path";
import { fileURLToPath } from "url";
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const app = express();
const isDev = process.env.NODE_ENV !== "production";
const PORT = parseInt(process.env.PORT || (isDev ? "3001" : "5000"), 10);
app.use(express.json());
app.get("/api/programs", async (_req, res) => {
    try {
        const programs = await db
            .select()
            .from(umrahPrograms)
            .where(eq(umrahPrograms.is_active, true))
            .orderBy(asc(umrahPrograms.sort_order));
        res.json(programs);
    }
    catch (err) {
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
    }
    catch (err) {
        console.error("Error fetching program:", err);
        res.status(500).json({ error: "Failed to fetch program" });
    }
});
if (!isDev) {
    const distPath = path.resolve(__dirname, "../dist");
    app.use(express.static(distPath));
    app.get("*", (_req, res) => {
        res.sendFile(path.join(distPath, "index.html"));
    });
}
app.listen(PORT, "0.0.0.0", () => {
    console.log(`API server running on port ${PORT}`);
});
