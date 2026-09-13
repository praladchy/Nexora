import mongoose from "mongoose";
import Category from "../../../models/category.model.js";

export const categoryAggregateForSuperAdmin = async (req, res) => {
  try {
    const data = await Category.aggregate([
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

          categoryOvervies: [
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
              },
            },
          ],
        },
      },
    ]);
    res.status(200).json({
      data: data || {
        totalCategories: 0,
        totalActiveCategories: 0,
        totalGlobalCategories: 0,
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
  const id = new mongoose.Types.ObjectId(categoryId);
  console.log("trew", id);
  try {
    const data = await Category.aggregate([
      {
        $facet: {
          categoryStats: [
             {
              $match: {
                "parent": id,
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

          // categoryOvervies: [
          //   {
          //     $group: {
          //       _id: null,
          //       // name: { $first: "$name" },
          //       // slug: { $first: "$slug" },
          //       // shop: { $first: "$shop.name" },
          //       // parent: { $first: "$parent.name" },
          //       // isParent: { $first: "$isParent" },
          //       // isActive: { $first: "$isActive" },
          //       // isGlobal: { $first: "$isGlobal" },
          //       // createdAt: { $first: "$createdAt" },
          //       // updatedAt: { $first: "$updatedAt" },

          //       totalCategories: {
          //         $sum: 1,
          //       },
          //       totalActiveCategories: {
          //         $sum: {
          //           $cond: [{ $eq: ["$isActive", true] }, 1, 0],
          //         },
          //       },
          //       totalGlobalCategories: {
          //         $sum: {
          //           $cond: [{ $eq: ["$isGlobal", true] }, 1, 0],
          //         },
          //       },
          //     },
          //   },
          // ],
        },
      },
    ]);
    res.status(200).json({
      data: data || {
        totalCategories: 0,
        totalActiveCategories: 0,
        totalGlobalCategories: 0,
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
  const shops = shopId;
  try {
    const data = await Category.aggregate([
      {
        $match: {
          shop: { $in: shops },
        },
      },
      {
        $group: {
          _id: null,
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
        },
      },
    ]);
    res.status(200).json({
      data: data || {
        totalCategories: 0,
        totalActiveCategories: 0,
        totalGlobalCategories: 0,
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
