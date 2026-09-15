import mongoose from "mongoose";
import Category from "../../../models/category.model.js";

export const categoryAggregateForSuperAdmin = async (req, res) => {
  try {
    const result = await Category.aggregate([
      {
        $facet: {
          categoryStats: [
            {
              $lookup: {
                from: "shops",
                localField: "shop",
                foreignField: "_id",
                as: "shop",
              },
            },
            {
              $unwind: { path: "$shop", preserveNullAndEmptyArrays: true },
            },
            {
              $lookup: {
                from: "categories",
                foreignField: "_id",
                localField: "parent",
                as: "parent",
              },
            },
            { $unwind: { path: "$parent", preserveNullAndEmptyArrays: true } },
            {
              $project: {
                name: 1,
                slug: 1,
                shop: "$shop.name",
                parent: "$parent.name",
                image: 1,
                isParent: 1,
                isActive: 1,
                isGlobal: 1,
                createdAt: 1,
                updatedAt: 1,
              },
            },
          ],

          categoryOverviews: [
            {
              $group: {
                _id: null,
                // name: { $first: "$name" },
                // slug: { $first: "$slug" },
                // shop: { $first: "$shop.name" },
                // parent: { $first: "$parent.name" },
                // isParent: { $first: "$isParent" },
                // isActive: { $first: "$isActive" },
                // isGlobal: { $first: "$isGlobal" },
                // createdAt: { $first: "$createdAt" },
                // updatedAt: { $first: "$updatedAt" },

                totalCategories: {
                  $sum: 1,
                },
                totalActiveCategories: {
                  $sum: {
                    $cond: [{ $eq: ["$isActive", true] }, 1, 0],
                  },
                },
                totalGlobalCategories: {
                  $sum: {
                    $cond: [{ $eq: ["$isGlobal", true] }, 1, 0],
                  },
                },
                totalParentCategories: {
                  $sum: {
                    $cond: [{ $eq: ["$isParent", true] }, 1, 0],
                  },
                },
              },
            },
          ],
        },  
      },
    ]);
    const data = result?.[0];
    res.status(200).json({
      data: {
        categoryOverviews: data.categoryOverviews?.[0] || {
          totalCategories: 0,
          totalActiveCategories: 0,
          totalGlobalCategories: 0,
          totalParentCategories: 0,
        },
        categoryStats: data.categoryStats || [],
      },
      success: true,
      message: "Category Aggreate Service",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error in Category Aggreate Service",
      error: error.message,
    });
  }
};
export const categoryAggregateForParentCategorySuperAdmin = async (
  req,
  res,
) => {
  const { categoryId } = req.params;
  console.log("CategoryId", categoryId);
  if (!categoryId)
    return res.status(400).json({ message: "categoryId is required" });
  const currentCategory = await Category.findById(categoryId);
  if (!currentCategory)
    return res.status(404).json({ message: "category not found" });
  console.log("category", currentCategory);
  const id = new mongoose.Types.ObjectId(categoryId);
  try {
    const data = await Category.aggregate([
      {
        $facet: {
          categoryStats: [
            {
              $match: {
                parent: id,
              },
            },
            {
              $lookup: {
                from: "shops",
                localField: "shop",
                foreignField: "_id",
                as: "shop",
              },
            },
            {
              $unwind: { path: "$shop", preserveNullAndEmptyArrays: true },
            },
            {
              $lookup: {
                from: "categories",
                foreignField: "_id",
                localField: "parent",
                as: "parent",
              },
            },
            { $unwind: { path: "$parent", preserveNullAndEmptyArrays: true } },

            {
              $project: {
                name: 1,
                slug: 1,
                shop: "$shop.name",
                parent: "$parent.name",
                image: 1,
                isParent: 1,
                isActive: 1,
                isGlobal: 1,
                createdAt: 1,
                updatedAt: 1,
              },
            },
          ],

          categoryOverviews: [
            {
              $match: {
                parent: id,
              },
            },
            {
              $group: {
                _id: null,
                // name: { $first: "$name" },
                // slug: { $first: "$slug" },
                // shop: { $first: "$shop.name" },
                // parent: { $first: "$parent.name" },
                // isParent: { $first: "$isParent" },
                // isActive: { $first: "$isActive" },
                // isGlobal: { $first: "$isGlobal" },
                // createdAt: { $first: "$createdAt" },
                // updatedAt: { $first: "$updatedAt" },

                totalCategories: {
                  $sum: 1,
                },
                totalActiveCategories: {
                  $sum: {
                    $cond: [{ $eq: ["$isActive", true] }, 1, 0],
                  },
                },
                totalGlobalCategories: {
                  $sum: {
                    $cond: [{ $eq: ["$isGlobal", true] }, 1, 0],
                  },
                },
                totalParentCategories: {
                  $sum: {
                    $cond: [{ $eq: ["$isParent", true] }, 1, 0],
                  },
                },
              },
            },
          ],
        },
      },
    ]);
    const result = data?.[0];
    // console.log("uytertyu", result);
    res.status(200).json({
      data: {
        currentCategory,
        categoryStats: result.categoryStats || [],
        categoryOverviews: result.categoryOverviews?.[0] || {
          totalCategories: 0,
          totalActiveCategories: 0,
          totalGlobalCategories: 0,
          totalParentCategories: 0,
        },
      },
      success: true,
      message: "Category Aggreate Service",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error in Category Aggreate Service",
      error: error.message,
    });
  }
};
export const categoryAggregateForSuperAdminForShop = async (req, res) => {
  const shopId = req.params;
  const shops =new mongoose.Types.ObjectId(shopId);
  try {
    const result = await Category.aggregate([

      {
        $facet: {
          categoryStats: [
            {
              $match: {
                shop: shops,
              },
            },
            {
              $lookup: {
                from: "shops",
                localField: "shop",
                foreignField: "_id",
                as: "shop",
              },
            },
            {
              $unwind: { path: "$shop", preserveNullAndEmptyArrays: true },
            },
            {
              $lookup: {
                from: "categories",
                foreignField: "_id",
                localField: "parent",
                as: "parent",
              },
            },
            { $unwind: { path: "$parent", preserveNullAndEmptyArrays: true } },
            {
              $project: {
                name: 1,
                slug: 1,
                shop: "$shop.name",
                parent: "$parent.name",
                image: 1,
                isParent: 1,
                isActive: 1,
                isGlobal: 1,
                createdAt: 1,
                updatedAt: 1,
              },
            },
          ],

          categoryOverviews: [
             {
              $match: {
                shop: shops,
              },
            },
            {
              $group: {
                _id: null,
                // name: { $first: "$name" },
                // slug: { $first: "$slug" },
                // shop: { $first: "$shop.name" },
                // parent: { $first: "$parent.name" },
                // isParent: { $first: "$isParent" },
                // isActive: { $first: "$isActive" },
                // isGlobal: { $first: "$isGlobal" },
                // createdAt: { $first: "$createdAt" },
                // updatedAt: { $first: "$updatedAt" },

                totalCategories: {
                  $sum: 1,
                },
                totalActiveCategories: {
                  $sum: {
                    $cond: [{ $eq: ["$isActive", true] }, 1, 0],
                  },
                },
                totalGlobalCategories: {
                  $sum: {
                    $cond: [{ $eq: ["$isGlobal", true] }, 1, 0],
                  },
                },
                totalParentCategories: {
                  $sum: {
                    $cond: [{ $eq: ["$isParent", true] }, 1, 0],
                  },
                },
              },
            },
          ],
        },  
      },
    ]);
    const data = result?.[0];
    res.status(200).json({
      data: {
        categoryOverviews: data.categoryOverviews?.[0] || {
          totalCategories: 0,
          totalActiveCategories: 0,
          totalGlobalCategories: 0,
          totalParentCategories: 0,
        },
        categoryStats: data.categoryStats || [],
      },
      success: true,
      message: "Category Aggreate Service",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error in Category Aggreate Service",
      error: error.message,
    });
  }
};
