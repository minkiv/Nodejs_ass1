import Joi from "joi";
import Product from "../models/product.js";

const productSchema = Joi.object({
  name: Joi.string().required(),
  price: Joi.number().required(),
  description: Joi.string(),
});

export const getAll = async (req, res) => {
  try {
    const product = await Product.find();
    if (!product) {
      return res.json({
        message: "Khong ton tai san pham",
      });
    }
    return res.json(product);
  } catch (error) {
    return res.status(400).json({
      message: error,
    });
  }
};

export const get = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.json({
        message: "Khong tim thay san pham",
      });
    }
    return res.json(product);
  } catch (error) {
    return res.status(400).json({
      message: error,
    });
  }
};

export const create = async (req, res) => {
  try {
    const { error } = productSchema.validate(req.body);
    if (error) {
      return res.status(400).json({
        message: error.details[0].message,
      });
    }
    const product = await Product.create(req.body);
    if (!product) {
      return res.json({
        message: "Khong them duoc san pham",
      });
    }
    return res.json({
      message: "them san pham thanh cong",
      data: product,
    });
  } catch (error) {
    return res.status(400).json({
      message: error,
    });
  }
};

export const update = async (req, res) => {
  try {
    const { error } = productSchema.validate(req.body);
    if (error) {
      return res.status(400).json({
        message: error.details[0].message,
      });
    }
    const product = await Product.updateOne(
      { _id: req.params.id },
      { $set: req.body }
    );
    if (!product) {
      return res.json({
        message: "Khong update san pham thanh cong",
      });
    }
    return res.json({
      message: "Sua san pham thanh cong",
      data: product,
    });
  } catch (error) {
    return res.status(400).json({
      message: error,
    });
  }
};

export const remove = async (req, res) => {
  try {
    const product = await Product.deleteOne({ _id: req.params.id });
    return res.json({
      message: "Xoa san pham thanh cong",
      data: product,
    });
  } catch (error) {
    return res.status(400).json({
      message: error,
    });
  }
};
