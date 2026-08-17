import { generateSlug } from "../../utils/slug.js";
import Category from "../../models/category.model.js";
import { uploadToCloudinary } from "../../utils/uploadCloudinary.js";
export const createCategory = async (req, res) => {
  const { name, description, shop, isGlobal, isActive,isParent } = req.body;
  console.log("sdfghjkmnb",isParent);
  const parent = req.body.parent || null;
  const { createdBy } = req.user;
  try {
    if (!name)
      return res.status(400).json({
        message: "Name is required",
        success: false,
      });
    const slug = generateSlug(name);
    const category = await Category.findOne({ slug, shop: shop || null })
      .populate("shop")
      .populate("parent")
      .populate("createdBy");
    if (category)
      return res.status(400).json({
        message: "Category with the same name already exists in this shop",
        success: false,
      });

    let uploadedImages = [];
    console.log(uploadedImages);
    if (req.files && req.files.length > 0) {
      for (const file of req.files) {
        const cloudinaryResult = await uploadToCloudinary(file.path);

        uploadedImages.push({
          url: cloudinaryResult.secure_url,
          public_id: cloudinaryResult.public_id,
        });
      }
    }
    const newCategory = new Category({
      name,
      slug,
      description,
      image: uploadedImages,
      parent,
      isParent,
      isGlobal,
      isActive,
      createdBy,
      shop: shop || null,
    });
    await newCategory.save();
    res.status(200).json({
      message: "Category created successfully",
      success: true,
      category: newCategory,
    });
  } catch (error) {
    res.status(500).json({
      message: "Internal server error, category is not created",
      success: false,
      error: error.message,
    });
  }
};
export const getCategory = async (req, res) => {
  try {
    const category = await Category.find({isParent: false});
    res.status(200).json({
      message: "Categories retrieved successfully",
      success: true,
      category,
    }); 
  } catch (error) {
    res.status(500).json({
      message: "Internal server error, categories are not retrieved",
      success: false,
      error: error.message,
    });
  }
};

export const getParentCategory = async (req, res) => {
  try {
    const category = await Category.find({isParent: true});
    res.status(200).json({
      message: "Categories retrieved successfully",
      success: true,
      category,
    });
  } catch (error) {
    res.status(500).json({
      message: "Internal server error, categories are not retrieved",
      success: false,
      error: error.message,
    });
  }
};
export const getCategoryByShop = async (req, res) => {
  const { shop } = req.query;
  try {
    if (!shop)
      return res.status(400).json({
        message: "Shop id is required",
        success: false,
      });
    const category = await Category.find({ shop, isActive: true })
      .populate("parent")
      .populate("shop")
      .populate("createdBy");
    res.status(200).json({
      message: "Categories retrieved successfully",
      success: true,
      category,
    });
  } catch (error) {
    res.status(500).json({
      message: "Internal server error, categories are not retrieved",
      success: false,
      error: error.message,
    });
  }
};
export const getCategoryBySlug = async (req, res) => {
  const { slug } = req.params;
  try {
    const category = await Category.findOne({ slug, isActive: true })
      .populate("parent")
      .populate("shop")
      .populate("createdBy");
    res.status(200).json({
      message: "Category retrieved successfully",
      success: true,
      category,
    });
  } catch (error) {
    res.status(500).json({
      message: "Internal server error, category is not retrieved",
      success: false,
      error: error.message,
    });
  }
};

export const updateCategory = async (req, res) => {
  const { id } = req.params;
  try {
    if (req.body.name) {
      req.body.slug = generateSlug(req.body.name);
    }

    const category = await Category.findByIdAndUpdate(id, req.body, {
      new: true,
    })
      .populate("parent")
      .populate("shop")
      .populate("createdBy");
    if (!category)
      return res.status(404).json({
        message: "Category not found",
        success: false,
      });
    res.status(200).json({
      message: "Category updated successfully",
      success: true,
      category,
    });
  } catch (error) {
    res.status(500).json({
      message: "Internal server error, category is not updated",
      success: false,
      error: error.message,
    });
  }
};
export const deleteCategory = async (req, res) => {
  const { id } = req.params;
  try {
    const category = await Category.findById(id);
    if (!category)
      return res.status(404).json({
        message: "Category not found",
        success: false,
      });
    category.isActive = false;
    category.updatedAt = Date.now();
    await category.save();
    res.status(200).json({
      message: "Category deleted successfully",
      success: true,
    });
  } catch (error) {
    res.status(500).json({
      message: "Internal server error, category is not deleted",
      success: false,
      error: error.message,
    });
  }
};
