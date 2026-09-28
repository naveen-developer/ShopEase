import express from "express";
import authenticate from "../middleware/auth.middleware.js";
import productModel from "../model/product.model.js";
import {
  createProductValidator,
  productIdValidator,
  updateProductValidator,
} from "../validators/product.validator.js";
import validate from "../middleware/validate.js";

const proute = express.Router();

proute.post(
  "/products",
  authenticate,
  createProductValidator,
  validate,
  async (req, res) => {
    const { name, image_url, price, rating, stock_quantity, description } =
      req.body;

    try {
      if (!name || !image_url || price === undefined) {
        return res.status(400).json({
          message: "name, image_url, and price are required",
        });
      }

      const product = await productModel.create({
        name,
        image_url,
        price: Number(price),
        rating: rating !== undefined ? Number(rating) : null,
        stock_quantity:
          stock_quantity !== undefined ? Number(stock_quantity) : 0,
        description: description || "",
      });

      // TODO: replace with actual DB insert

      res.status(201).json({
        message: "product has been created",
        data: product,
      });
    } catch (err) {
      return res.status(400).json({
        message: "Unauthorized " + err,
      });
    }
  },
);

proute.get("/products", async (req, res) => {
  try {
    const products = await productModel.find();

    res.status(200).json({
      message: "Products fetched successfully",
      data: products,
    });
  } catch (error) {
    res.status(500).json({
      message: "Something went wrong while fetching products",
      error: error.message,
    });
  }
});

proute.get("/products/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const product = await productModel.findById(id);

    if (!product) {
      return res.status(404).json({
        message: "Product not found",
      });
    }

    res.status(200).json({
      message: "Product fetched successfully",
      data: product,
    });
  } catch (error) {
    res.status(500).json({
      message: "Something went wrong while fetching the product",
      error: error.message,
    });
  }
});

// proute.get("/products/:id", async (req, res) => {
//   try {
//     const { id } = req.params;

//     const product = await productModel.findById(id);

//     if (!product) {
//       return res.status(404).json({
//         message: "Product not found",
//       });
//     }

//     res.status(200).json({
//       message: "Product fetched successfully",
//       data: product,
//     });
//   } catch (error) {
//     res.status(500).json({
//       message: "Something went wrong while fetching the product",
//       error: error.message,
//     });
//   }
// });

proute.put(
  "/products/:id",
  authenticate,
  productIdValidator,
  updateProductValidator,
  validate,
  async (req, res) => {
    try {
      const { id } = req.params;
      const { name, image_url, price, rating, stock_quantity, description } =
        req.body;

      const updatedProduct = await productModel.findByIdAndUpdate(
        id,
        {
          name,
          image_url,
          price: price !== undefined ? Number(price) : undefined,
          rating: rating !== undefined ? Number(rating) : undefined,
          stock_quantity:
            stock_quantity !== undefined ? Number(stock_quantity) : undefined,
          description,
        },
        { new: true, runValidators: true },
      );

      if (!updatedProduct) {
        return res.status(404).json({
          message: "Product not found",
        });
      }

      res.status(200).json({
        message: "Product updated successfully",
        data: updatedProduct,
      });
    } catch (error) {
      res.status(500).json({
        message: "Something went wrong while updating the product",
        error: error.message,
      });
    }
  },
);

proute.delete(
  "/products/:id",
  authenticate,
  productIdValidator,
  validate,
  async (req, res) => {
    try {
      const { id } = req.params;

      const deletedProduct = await productModel.findByIdAndDelete(id);

      if (!deletedProduct) {
        return res.status(404).json({
          message: "Product not found",
        });
      }

      res.status(200).json({
        message: "Product deleted successfully",
        data: deletedProduct,
      });
    } catch (error) {
      res.status(500).json({
        message: "Something went wrong while deleting the product",
        error: error.message,
      });
    }
  },
);

export default proute;
