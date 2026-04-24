import Product from "../../models/product.model.js";
import { generateSlug } from "../../utils/slug.js";
import { uploadToCloudinary } from "../../utils/uploadCloudinary.js";
 export const createProduct = async (req, res) => {
  try {
    // req.body from multer + formData
    const {
      name,
      description,
      price,
      finalPrice,
      discount,
      category,
      brand,
      stock,
      shop,
      sku,
      stockLimit,
      status,
    } = req.body;

    // validation
    if (!name || !category || !price || !stock) {
      return res.status(400).json({
        message: "name, category, price and stock is required",
        success: false,
      });
    }

    // slug generate
    const slug = generateSlug(name);

    // check duplicate product
    const product = await Product.findOne({
      name,
      category,
    });

    if (product) {
      return res.status(400).json({
        message: "Product with same name already exists in this category",
        success: false,
      });
    }

    // upload images to cloudinary
    let uploadedImages = [];

    if (req.files && req.files.length > 0) {
      for (const file of req.files) {
        const cloudinaryResult = await uploadToCloudinary(file.path);

        uploadedImages.push({
          url: cloudinaryResult.secure_url,
          public_id: cloudinaryResult.public_id,
        });
      }
    }

    // create product
    const newProduct = new Product({ 
      name,
      slug,
      description,
      price,
      finalPrice,
      discount,
      category,
      brand,
      stock,
      shop,
      sku,
      stockLimit,
      status,
      images: uploadedImages, // save cloudinary images
    });

    await newProduct.save();

    return res.status(201).json({
      message: "Product created successfully",
      success: true,
      newProduct,
    });
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      message: "Product not created",
      success: false,
      data: error.message,
    });
  }
};
export const getProducts = async (req, res) => {
  try {
    const products = await Product.find()
      .populate("category")
      .populate("shop");
    if (!products || products.length === 0) {
      return res.status(404).json({
        message: "No products found",
        success: false,
      });
    }
    res.status(200).json({
      message: "Products retrieved successfully",
      success: true,
      products,
    });
  } catch (error) {
    res.status(500).json({
      message: "Internal server error,products are not retrieved",
      data: error.message,
    });
  }
};


export const getProductById = async (req, res) => {
  const { id } = req.params;
  try {
    const product = await Product.findById(id)
      .populate("category")
      .populate("shop");
    if (!product) {
      return res.status(404).json({
        message: "Product not found",
        success: false,
      });
    }
    res.status(200).json({
      message: "Product retrieved successfully",
      success: true,
      product,
    });
  } catch (error) {
    res.status(500).json({
      message: "Internal server error,product is not retrieved",
      data: error.message,
    });
  }
};
export const getProductsByShop = async (req, res) => {
  const { shopId } = req.query;
  try {
    const products = await Product.find({ shop: shopId })
      .populate("category")
      .populate("shop");
    if (!products || products.length === 0) {
      return res.status(404).json({
        message: "No products found for this shop",
        success: false,
      });
    }
    res.status(200).json({
      message: "Products retrieved successfully",
      success: true,
      products,
    });
  } catch (error) {
    res.status(500).json({
      message: "Internal server error,products are not retrieved",
      data: error.message,
    });
  }
};
export const getProductsByCategory = async (req, res) => {
  const { categoryId } = req.query;

  try {
    const products = await Product.find({ category: categoryId })
      .populate("category")
      .populate("shop");
    if (!products || products.length === 0) {
      return res.status(400).json({
        message: "No product presents",
        success: false,
      });
    }
    res.status(200).json({
      message: "Products retrieved successfully",
      success: true,
      products,
    });
  } catch (error) {
    res.status(500).json({
      message: "Internal server error,products are not retrieved",
      data: error.message,
    });
  }
};
export const updateProduct = async (req, res) => {
  const { id } = req.params;

  try {
    if (req.body.name) {
      req.body.slug = generateSlug(req.body.name);
    }

    const updatedProduct = await Product.findByIdAndUpdate(
      id,
      req.body,
      { new: true }
    );

    if (!updatedProduct) {
      return res.status(404).json({
        message: "Product not found",
        success: false,
      });
    }

    res.status(200).json({
      success: true,
      product: updatedProduct,
    });
  } catch (error) {
    res.status(500).json({
      message: "Product not updated",
      error: error.message,
    });
  }
};

export const deleteProduct = async (req, res) => {
  const { id } = req.params;
  try {
    const deletedProduct = await Product.findByIdAndUpdate(
      {_id:id,isActive: true },
      { isActive: false },
      { new: true },
    );

    if (!deletedProduct) {
      return res.status(404).json({
        message: "Product not found",
        success: false,
      });
    }

    res.status(200).json({
      success: true,
      message: "Product deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: "product is not deleted",
      error: error.message,
    });
  }
};
