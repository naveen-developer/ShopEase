import { body, param } from "express-validator";
import mongoose from "mongoose";

export const createProductValidator = [
  body("name").trim().notEmpty().withMessage("Product name is required"),

  body("image_url")
    .trim()
    .notEmpty()
    .withMessage("Image URL is required")
    .isURL()
    .withMessage("Image URL must be a valid URL"),

  body("price")
    .notEmpty()
    .withMessage("Price is required")
    .isFloat({ gt: 0 })
    .withMessage("Price must be a number greater than 0"),

  body("rating")
    .optional()
    .isFloat({ min: 0, max: 5 })
    .withMessage("Rating must be a number between 0 and 5"),

  body("stock_quantity")
    .optional()
    .isInt({ min: 0 })
    .withMessage(
      "Stock quantity must be a whole number greater than or equal to 0",
    ),

  body("description")
    .optional()
    .isString()
    .withMessage("Description must be a string"),
];

// For PUT — same rules, but everything optional since it's a partial update
export const updateProductValidator = [
  body("name")
    .optional()
    .trim()
    .notEmpty()
    .withMessage("Product name cannot be empty"),

  body("image_url")
    .optional()
    .trim()
    .isURL()
    .withMessage("Image URL must be a valid URL"),

  body("price")
    .optional()
    .isFloat({ gt: 0 })
    .withMessage("Price must be a number greater than 0"),

  body("rating")
    .optional()
    .isFloat({ min: 0, max: 5 })
    .withMessage("Rating must be a number between 0 and 5"),

  body("stock_quantity")
    .optional()
    .isInt({ min: 0 })
    .withMessage(
      "Stock quantity must be a whole number greater than or equal to 0",
    ),

  body("description")
    .optional()
    .isString()
    .withMessage("Description must be a string"),
];

export const productIdValidator = [
  param("id")
    .custom((value) => mongoose.Types.ObjectId.isValid(value))
    .withMessage("Invalid product id"),
];
