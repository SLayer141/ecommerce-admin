import { Request, Response } from "express";
import { AppDataSource } from "../db/dataSource";
import { Product } from "../entity/product";

// Get repository
const productRepo = AppDataSource.getRepository(Product);

//fetch all products
export const getAllProducts = async (req: Request, res: Response): Promise<void> => {
  try {
    const products = await productRepo.find();
    res.json(products);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch products' });
  }
};

// Get product by ID
export const getProductById = async (req: Request, res: Response): Promise<void> => {
  try {
    const product = await productRepo.findOneBy({ id: Number(req.params.id) });
    if (!product) return void res.status(404).json({ error: 'Product not found' });
    res.json(product);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch product' });
  }
};

// Create product
export const createProduct = async (req: Request, res: Response): Promise<void> => {
  try {
    const { sku, name, price } = req.body;
    let images: string[] = [];
    if (req.files && Array.isArray(req.files)) {
      images = req.files.map((file: any) => '/uploads/' + file.filename);
    }
    console.log('Saving product with images:', images);
    const product = productRepo.create({ sku, name, price, images });
    await productRepo.save(product);
    res.status(201).json(product);
  } catch (err) {
    console.error('Error in createProduct:', err);
    res.status(500).json({ error: 'Failed to create product' });
  }
};

// Update product
export const updateProduct = async (req: Request, res: Response): Promise<void> => {
  try {
    const { sku, name, price } = req.body;
    let images: string[] = [];
    // Existing images from the form (as JSON or comma-separated string)
    if (req.body.images) {
      if (typeof req.body.images === 'string') {
        try {
          images = JSON.parse(req.body.images);
        } catch {
          images = req.body.images.split(',');
        }
      } else if (Array.isArray(req.body.images)) {
        images = req.body.images;
      }
    }
    // Add new uploaded files
    if (req.files && Array.isArray(req.files)) {
      images = images.concat(req.files.map((file: any) => '/uploads/' + file.filename));
    }
    console.log('Updating product with images:', images);
    const product = await productRepo.findOneBy({ id: Number(req.params.id) });
    if (!product) return void res.status(404).json({ error: 'Product not found' });
    product.sku = sku;
    product.name = name;
    product.price = price;
    product.images = images;
    await productRepo.save(product);
    res.json(product);
  } catch (err) {
    res.status(500).json({ error: 'Failed to update product' });
  }
};

// Delete product
export const deleteProduct = async (req: Request, res: Response): Promise<void> => {
  try {
    const product = await productRepo.findOneBy({ id: Number(req.params.id) });
    if (!product) return void res.status(404).json({ error: 'Product not found' });
    await productRepo.remove(product);
    res.json({ message: 'Product deleted' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to delete product' });
  }
}; 