import express from "express";
import cors from "cors";
import { AppDataSource } from "./db/dataSource";
import authRoutes from "./routes/auth.route";
import productRoutes from "./routes/product.route";
import path from "path";

AppDataSource.initialize().then(() => {
  const app = express();
  app.use(cors());
  const uploadsPath = path.resolve(__dirname, '../uploads');
  console.log('Serving uploads from:', uploadsPath);
  app.use('/uploads', express.static(uploadsPath));
  app.use(express.json({ limit: '20mb' }));
  app.use(express.urlencoded({ limit: '20mb', extended: true }));

  app.use("/api", authRoutes);
  app.use("/api/products", productRoutes);

  app.get("/", (req, res) => {
      res.send("API is live!");
    });

  app.listen(3000, () => {
    console.log("Server running on http://localhost:3000");
  });
});
