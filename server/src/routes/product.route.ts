import { Router,Request,Response, } from "express";
import { getAllProducts, getProductById, createProduct, updateProduct, deleteProduct } from "../controller/product.controller";
import multer from 'multer';
import path from 'path';

const router = Router();

const storage = multer.diskStorage({
  destination: function (req: Request, file: Express.Multer.File, cb: (error: Error | null, destination: string) => void) {
    cb(null, path.join(__dirname, '../../uploads/'));
  },
  filename: function (req: Request, file: Express.Multer.File, cb: (error: Error | null, filename: string) => void) {
    cb(null, Date.now() + '-' + file.originalname);
  }
});
const upload = multer({ storage: storage });

// Fetch all products
router.get("/", (req: Request, res: Response) => {
  getAllProducts(req, res);
});
// Fetch product by ID
router.get("/:id", (req: Request, res: Response) => {
  getProductById(req, res);
});
// Create a new product
router.post("/", upload.array('images', 10), (req: Request, res: Response) => {
  createProduct(req, res);
});
// Update an existing product
router.put("/:id", upload.array('images', 10), (req: Request, res: Response) => {
  updateProduct(req, res);
});
// Delete a product
router.delete("/:id", (req: Request, res: Response) => {
  deleteProduct(req, res);
}); 

export default router;