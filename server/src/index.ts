import express from "express";
import cors from "cors";
import { AppDataSource } from "./db/dataSource";
import authRoutes from "./routes/auth.route";

AppDataSource.initialize().then(() => {
  const app = express();
  app.use(cors());
  app.use(express.json());

  app.use("/api", authRoutes);

  app.get("/", (req, res) => {
      res.send("API is live!");
    });

  app.listen(3000, () => {
    console.log("🚀 Server running on http://localhost:3000");
  });
});
