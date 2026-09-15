import mongoose from "mongoose";
import Product from "../../../models/product.model.js";

import { User } from "../../../models/user.model.js";

export const getProductAggregateForSuperAdmin = async (req, res) => {
  // const shopId=req.params
  // console.log("rtyui", shopId);
  // const shops = shopId;

  try {
    const data = await Product.aggregate([
      {
        $facet: {
          productOverview: [
            // {
            //   $match: {
            //     shop: { $in: shops },
            //   },
            // },
            {
              $group: {
                _id: null,
                totalProducts: { $sum: 1 },
                totalActiveProducts: {
                  $sum: {
                    $cond: [{ $eq: ["$status", "active"] }, 1, 0],
                  },
                },
                totalDraftProducts: {
                  $sum: {
                    $cond: [{ $eq: ["$status", "draft"] }, 1, 0],
                  },
                },
                totalInactiveProducts: {
                  $sum: {
                    $cond: [{ $eq: ["$status", "inactive"] }, 1, 0],
                  },
                },
                totalBlockedProducts: {
                  $sum: {
                    $cond: [{ $eq: ["$status", "blocked"] }, 1, 0],
                  },
                },
                approvedProducts: {
                  $sum: {
                    $cond: [{ $eq: ["$isApproved", true] }, 1, 0],
                  },
                },
                pendingProductsapproval: {
                  $sum: {
                    $cond: [{ $eq: ["$isApproved", false] }, 1, 0],
                  },
                },
              },
            },
          ],

          stockStats: [
            // {
            //   $match: {
            //     shop: { $in: shops },
            //   },
            // },
            {
              $project: {
                name: 1,
                stock: 1,
                stockLimit: 1,
                price: 1,
                category: 1,
                isApproved: 1,

                stockStatus: {
                  $switch: {
                    branches: [
                      {
                        case: { $eq: ["$stock", 0] },
                        then: "Invalid Stock",
                      },
                      {
                        case: { $lte: ["$stock", "$stockLimit"] },
                        then: "low stock",
                      },
                      {
                        case: { $gt: ["$stock", "$stockLimit"] },
                        then: "In Stock",
                      },
                    ],
                    default: "Unknown Stock",
                  },
                },
              },
            },
          ],

          CategoryStats: [
            // {
            //   $match: {
            //     shop: { $in: shops },
            //   },
            // },
            {
              $lookup: {
                from: "categories",
                localField: "category",
                foreignField: "_id",
                as: "categoryData",
              },
            },
            {
              $unwind: {
                path: "$categoryData",
                preserveNullAndEmptyArrays: true,
              },
            },

            {
              $lookup: {
                from: "shops",
                localField: "categoryData.shop",
                foreignField: "_id",
                as: "shopData",
              },
            },

            {
              $unwind: {
                path: "$shopData",
                preserveNullAndEmptyArrays: true,
              },
            },
            {
              $lookup: {
                from: "categories",
                localField: "categoryData.parent",
                foreignField: "_id",
                as: "parentData",
              },
            },

            {
              $unwind: {
                path: "$parentData",
                preserveNullAndEmptyArrays: true,
              },
            },
            {
              $unwind: {
                path: "$parentData",
                preserveNullAndEmptyArrays: true,
              },
            },
            {
              $lookup: {
                from: "products",
                localField: "_id",
                foreignField: "category",
                as: "products",
              },
            },
            {
              $group: {
                _id: "$categoryData._id",

                name: {
                  $first: "$categoryData.name",
                },

                shop: {
                  $first: "$shopData.name",
                },

                isParent: {
                  $first: "$categoryData.isParent",
                },

                isGlobal: {
                  $first: "$categoryData.isGlobal",
                },

                parent: {
                  $first: "$parentData.name",
                },

                image: {
                  $first: "$categoryData.image",
                },

                createdAt: {
                  $first: "$categoryData.createdAt",
                },

                updatedAt: {
                  $first: "$categoryData.updatedAt",
                },

                totalNumberOfProductsInCategory: {
                  $sum: 1,
                },

                totalActiveProductsInCategory: {
                  $sum: {
                    $cond: [{ $eq: ["$status", "active"] }, 1, 0],
                  },
                },

                totalDraftProductInCategory: {
                  $sum: {
                    $cond: [{ $eq: ["$status", "draft"] }, 1, 0],
                  },
                },

                totalInactiveProductInCategory: {
                  $sum: {
                    $cond: [{ $eq: ["$status", "inactive"] }, 1, 0],
                  },
                },

                totalBlockedProductInCategory: {
                  $sum: {
                    $cond: [{ $eq: ["$status", "blocked"] }, 1, 0],
                  },
                },
              },
            },
          ],
          ShopsStats: [
            // {
            //   $match: {
            //     shop: { $in: shops },
            //   },
            // },
            {
              $group: {
                _id: "$shop",
                totalNumberofProductsInShops: { $sum: 1 },
              },
            },
          ],
        },
      },
    ]);
    const result=data?.[0];
    res.status(200).json({
      // data: data[0] || {
      //   productOverview: {
      //     totalProducts: 0,
      //     totalActiveProducts: 0,
      //     totalDraftProducts: 0,
      //     totalInactiveProducts: 0,
      //     totalBlockedProducts: 0,
      //     approvedProducts: 0,
      //     pendingProductsapproval: 0,
      //   },
      //   stockStats: [
      //     {
      //       stock: 0,
      //       stockLimit: 0,
      //       price: 0,
      //     },
      //   ],
      //   CategoryStats: [
      //     {
      //       totalNumberOfProductsInCategory: 0,
      //       totalActiveProductsInCategory: 0,
      //       totalDraftProductInCategory: 0,
      //       totalInactiveProductInCategory: 0,
      //       totalBlockedProductInCategory: 0,
      //     },
      //   ],
      //   ShopsStats: [
      //     {
      //       totalNumberofProductsInShops: 0,
      //     },
      //   ],
      // },

      data: {
        productOverview: result?.productOverview?.[0] || [],
        productStats: result?.productStats?.[0] || {
          totalProducts: 0,
          totalActiveProducts: 0,
          totalDraftProducts: 0,
          totalInactiveProducts: 0,
          totalBlockedProducts: 0,
          approvedProducts: 0,
          pendingProductsapproval: 0,
        },
        stockStats: result?.stockStats || {
          stock: 0,
          stockLimit: 0,
          price: 0,
        },
        CategoryStats: result?.CategoryStats|| {
          totalNumberOfProductsInCategory: 0,
          totalActiveProductsInCategory: 0,
          totalDraftProductInCategory: 0,
          totalInactiveProductInCategory: 0,
          totalBlockedProductInCategory: 0,
        },
        ShopsStats: result?.ShopsStats || {
          totalNumberofProductsInShops: 0,
        },
      },
      success: true,
      message: "Product Aggreate Service",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error in Category Aggreate Service",
      error: error.message,
    });
  }
};
export const getProductAggregateForSuperAdminForShop = async (req, res) => {
  const shopId = req.params;
  console.log("rtyui", shopId);
  const shops = shopId;

  try {
    const data = await Product.aggregate([
      {
        $facet: {
          productOverview: [
            {
              $match: {
                shop: { $in: shops },
              },
            },
            {
              $group: {
                _id: null,
                totalProducts: { $sum: 1 },
                totalActiveProducts: {
                  $sum: {
                    $cond: [{ $eq: ["$status", "active"] }, 1, 0],
                  },
                },
                totalDraftProducts: {
                  $sum: {
                    $cond: [{ $eq: ["$status", "draft"] }, 1, 0],
                  },
                },
                totalInactiveProducts: {
                  $sum: {
                    $cond: [{ $eq: ["$status", "inactive"] }, 1, 0],
                  },
                },
                totalBlockedProducts: {
                  $sum: {
                    $cond: [{ $eq: ["$status", "blocked"] }, 1, 0],
                  },
                },
                approvedProducts: {
                  $sum: {
                    $cond: [{ $eq: ["$isApproved", true] }, 1, 0],
                  },
                },
                pendingProductsapproval: {
                  $sum: {
                    $cond: [{ $eq: ["$isApproved", false] }, 1, 0],
                  },
                },
              },
            },
          ],

          stockStats: [
            {
              $match: {
                shop: { $in: shops },
              },
            },
            {
              $project: {
                name: 1,
                stock: 1,
                stockLimit: 1,
                price: 1,
                category: 1,
                isApproved: 1,

                stockStatus: {
                  $switch: {
                    branches: [
                      {
                        case: { $eq: ["$stock", 0] },
                        then: "Invalid Stock",
                      },
                      {
                        case: { $lte: ["$stock", "$stockLimit"] },
                        then: "low stock",
                      },
                      {
                        case: { $gt: ["$stock", "$stockLimit"] },
                        then: "In Stock",
                      },
                    ],
                    default: "Unknown Stock",
                  },
                },
              },
            },
          ],

          CategoryStats: [
            {
              $match: {
                shop: { $in: shops },
              },
            },
            {
              $lookup: {
                from: "categories",
                localField: "category",
                foreignField: "_id",
                as: "categoryData",
              },
            },
            {
              $unwind: "$categoryData",
            },

            {
              $group: {
                _id: "$categoryData._id",
                name: { $first: "$categoryData.name" },
                totalNumberOfProductsInCategory: { $sum: 1 },
                totalActiveProductsInCategory: {
                  $sum: {
                    $cond: [{ $eq: ["$status", "active"] }, 1, 0],
                  },
                },
                totalDraftProductInCategory: {
                  $sum: {
                    $cond: [{ $eq: ["$status", "draft"] }, 1, 0],
                  },
                },
                totalInactiveProductInCategory: {
                  $sum: {
                    $cond: [{ $eq: ["$status", "inactive"] }, 1, 0],
                  },
                },
                totalBlockedProductInCategory: {
                  $sum: {
                    $cond: [{ $eq: ["$status", "blocked"] }, 1, 0],
                  },
                },
              },
            },
          ],
          ShopsStats: [
            {
              $match: {
                shop: { $in: shops },
              },
            },
            {
              $group: {
                _id: "$shop",
                totalNumberofProductsInShops: { $sum: 1 },
              },
            },
          ],
        },
      },
    ]);
    res.status(200).json({
      // data: data[0] || {

      //   productOverview: {
      //     totalProducts: 0,
      //     totalActiveProducts: 0,
      //     totalDraftProducts: 0,
      //     totalInactiveProducts: 0,
      //     totalBlockedProducts: 0,
      //     approvedProducts: 0,
      //     pendingProductsapproval: 0,
      //   },
      //   stockStats: [
      //     {
      //       stock: 0,
      //       stockLimit: 0,
      //       price: 0,
      //     },
      //   ],
      //   CategoryStats: [
      //     {
      //       totalNumberOfProductsInCategory: 0,
      //       totalActiveProductsInCategory: 0,
      //       totalDraftProductInCategory: 0,
      //       totalInactiveProductInCategory: 0,
      //       totalBlockedProductInCategory: 0,
      //     },
      //   ],
      //   ShopsStats: [
      //     {
      //       totalNumberofProductsInShops: 0,
      //     },
      //   ],
      // },

      data: {
        productOverview: result?.productOverview?.[0] || [],
        productStats: result?.productStats?.[0] || {
          totalProducts: 0,
          totalActiveProducts: 0,
          totalDraftProducts: 0,
          totalInactiveProducts: 0,
          totalBlockedProducts: 0,
          approvedProducts: 0,
          pendingProductsapproval: 0,
        },
        stockStats: result?.stockStats?.[0] || {
          stock: 0,
          stockLimit: 0,
          price: 0,
        },
        CategoryStats: result?.CategoryStats?.[0] || {
          totalNumberOfProductsInCategory: 0,
          totalActiveProductsInCategory: 0,
          totalDraftProductInCategory: 0,
          totalInactiveProductInCategory: 0,
          totalBlockedProductInCategory: 0,
        },
        ShopsStats: result?.ShopsStats || {
          totalNumberofProductsInShops: 0,
        },
      },
      success: true,
      message: "Product Aggreate Service",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error in Category Aggreate Service",
      error: error.message,
    });
  }
};

export const getProductAggregateForSuperAdminForCategory = async (req, res) => {
  const { categoryId } = req.params;
  const category = new mongoose.Types.ObjectId(categoryId);
  console.log("rtyuipoiu", category);

  try {
    const data = await Product.aggregate([
      {
        $facet: {
          productOverview: [
            {
              $match: {
                category:category,
              },
            },
            {
              $lookup: {
                from: "categories",
                localField: "category",
                foreignField: "_id",
                as: "category",
              },
            },
            {
              $unwind: "$category",
            },
          ],
          productStats: [
            {
              $match: {
                category:  category ,
              },
            },
            {
              $group: {
                _id: null,
                totalProducts: { $sum: 1 },
                totalActiveProducts: {
                  $sum: {
                    $cond: [{ $eq: ["$status", "active"] }, 1, 0],
                  },
                },
                totalDraftProducts: {
                  $sum: {
                    $cond: [{ $eq: ["$status", "draft"] }, 1, 0],
                  },
                },
                totalInactiveProducts: {
                  $sum: {
                    $cond: [{ $eq: ["$status", "inactive"] }, 1, 0],
                  },
                },
                totalBlockedProducts: {
                  $sum: {
                    $cond: [{ $eq: ["$status", "blocked"] }, 1, 0],
                  },
                },
                approvedProducts: {
                  $sum: {
                    $cond: [{ $eq: ["$isApproved", true] }, 1, 0],
                  },
                },
                pendingProductsapproval: {
                  $sum: {
                    $cond: [{ $eq: ["$isApproved", false] }, 1, 0],
                  },
                },
              },
            },
          ],

          stockStats: [
            {
              $match: {
                category: category,
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
            { $unwind: "$shop" },
            {
              $project: {
                name: 1,
                stock: 1,
                stockLimit: 1,
                price: 1,
                category: 1,
                isApproved: 1,
                shop: "$shop.name",
                stockStatus: {
                  $switch: {
                    branches: [
                      {
                        case: { $eq: ["$stock", 0] },
                        then: "Invalid Stock",
                      },
                      {
                        case: { $lte: ["$stock", "$stockLimit"] },
                        then: "low stock",
                      },
                      {
                        case: { $gt: ["$stock", "$stockLimit"] },
                        then: "In Stock",
                      },
                    ],
                    default: "Unknown Stock",
                  },
                },
              },
            },
          ],

          CategoryStats: [
            {
              $match: {
                category: category ,
              },
            },

            {
              $lookup: {
                from: "categories",
                localField: "category",
                foreignField: "_id",
                as: "categoryData",
              },
            },
            {
              $unwind: "$categoryData",
            },

            {
              $group: {
                _id: "$categoryData._id",
                name: { $first: "$categoryData.name" },
                totalNumberOfProductsInCategory: { $sum: 1 },
                totalActiveProductsInCategory: {
                  $sum: {
                    $cond: [{ $eq: ["$status", "active"] }, 1, 0],
                  },
                },
                totalDraftProductInCategory: {
                  $sum: {
                    $cond: [{ $eq: ["$status", "draft"] }, 1, 0],
                  },
                },
                totalInactiveProductInCategory: {
                  $sum: {
                    $cond: [{ $eq: ["$status", "inactive"] }, 1, 0],
                  },
                },
                totalBlockedProductInCategory: {
                  $sum: {
                    $cond: [{ $eq: ["$status", "blocked"] }, 1, 0],
                  },
                },
              },
            },
          ],
        },
      },
    ]);
    const result = data?.[0];
    console.log("resultgf", result);
    res.status(200).json({
      data: {
        productOverview: result?.productOverview?.[0] || [],
        productStats: result?.productStats?.[0] || {
          totalProducts: 0,
          totalActiveProducts: 0,
          totalDraftProducts: 0,
          totalInactiveProducts: 0,
          totalBlockedProducts: 0,
          approvedProducts: 0,
          pendingProductsapproval: 0,
        },
        stockStats: result?.stockStats?.[0] || {
          stock: 0,
          stockLimit: 0,
          price: 0,
        },
        CategoryStats: result?.CategoryStats?.[0] || {
          totalNumberOfProductsInCategory: 0,
          totalActiveProductsInCategory: 0,
          totalDraftProductInCategory: 0,
          totalInactiveProductInCategory: 0,
          totalBlockedProductInCategory: 0,
        },
        ShopsStats: result?.ShopsStats || {
          totalNumberofProductsInShops: 0,
        },
      },

      success: true,
      message: "Product Aggreate Service",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error in Category Aggreate Service",
      error: error.message,
    });
  }
};
export const getProductAggregateForSuperAdminForShopCategory = async (
  req,
  res,
) => {
  const { shopId, categoryId } = req.params;
  console.log("rtyui", shopId, categoryId);
  const category = categoryId;
  const shops = shopId;
  try {
    const data = await Product.aggregate([
      {
        $facet: {
          productOverview: [
            {
              $match: {
                shop: { $in: shops },
                category: { $in: category },
              },
            },
            {
              $group: {
                _id: null,
                totalProducts: { $sum: 1 },
                totalActiveProducts: {
                  $sum: {
                    $cond: [{ $eq: ["$status", "active"] }, 1, 0],
                  },
                },
                totalDraftProducts: {
                  $sum: {
                    $cond: [{ $eq: ["$status", "draft"] }, 1, 0],
                  },
                },
                totalInactiveProducts: {
                  $sum: {
                    $cond: [{ $eq: ["$status", "inactive"] }, 1, 0],
                  },
                },
                totalBlockedProducts: {
                  $sum: {
                    $cond: [{ $eq: ["$status", "blocked"] }, 1, 0],
                  },
                },
                approvedProducts: {
                  $sum: {
                    $cond: [{ $eq: ["$isApproved", true] }, 1, 0],
                  },
                },
                pendingProductsapproval: {
                  $sum: {
                    $cond: [{ $eq: ["$isApproved", false] }, 1, 0],
                  },
                },
              },
            },
          ],

          stockStats: [
            {
              $match: {
                shop: { $in: shops },
                category: { $in: category },
              },
            },
            {
              $project: {
                name: 1,
                stock: 1,
                stockLimit: 1,
                price: 1,
                category: 1,
                isApproved: 1,

                stockStatus: {
                  $switch: {
                    branches: [
                      {
                        case: { $eq: ["$stock", 0] },
                        then: "Invalid Stock",
                      },
                      {
                        case: { $lte: ["$stock", "$stockLimit"] },
                        then: "low stock",
                      },
                      {
                        case: { $gt: ["$stock", "$stockLimit"] },
                        then: "In Stock",
                      },
                    ],
                    default: "Unknown Stock",
                  },
                },
              },
            },
          ],

          CategoryStats: [
            {
              $match: {
                shop: { $in: shops },
                category: { $in: category },
              },
            },

            {
              $lookup: {
                from: "categories",
                localField: "category",
                foreignField: "_id",
                as: "categoryData",
              },
            },
            {
              $unwind: "$categoryData",
            },

            {
              $group: {
                _id: "$categoryData._id",
                name: { $first: "$categoryData.name" },
                totalNumberOfProductsInCategory: { $sum: 1 },
                totalActiveProductsInCategory: {
                  $sum: {
                    $cond: [{ $eq: ["$status", "active"] }, 1, 0],
                  },
                },
                totalDraftProductInCategory: {
                  $sum: {
                    $cond: [{ $eq: ["$status", "draft"] }, 1, 0],
                  },
                },
                totalInactiveProductInCategory: {
                  $sum: {
                    $cond: [{ $eq: ["$status", "inactive"] }, 1, 0],
                  },
                },
                totalBlockedProductInCategory: {
                  $sum: {
                    $cond: [{ $eq: ["$status", "blocked"] }, 1, 0],
                  },
                },
              },
            },
          ],
          ShopsStats: [
            {
              $match: {
                shop: { $in: shops },
              },
            },
            {
              $group: {
                _id: "$shop",
                totalNumberofProductsInShops: { $sum: 1 },
              },
            },
          ],
        },
      },
    ]);
    res.status(200).json({
      data: data[0],
      // data: data[0] || {
      //   productOverview: {
      //     totalProducts: 0,
      //     totalActiveProducts: 0,
      //     totalDraftProducts: 0,
      //     totalInactiveProducts: 0,
      //     totalBlockedProducts: 0,
      //     approvedProducts: 0,
      //     pendingProductsapproval: 0,
      //   },
      //   stockStats: [
      //     {
      //       stock: 0,
      //       stockLimit: 0,
      //       price: 0,
      //     },
      //   ],
      //   CategoryStats: [
      //     {
      //       totalNumberOfProductsInCategory: 0,
      //       totalActiveProductsInCategory: 0,
      //       totalDraftProductInCategory: 0,
      //       totalInactiveProductInCategory: 0,
      //       totalBlockedProductInCategory: 0,
      //     },
      //   ],
      //   ShopsStats: [
      //     {
      //       totalNumberofProductsInShops: 0,
      //     },
      //   ],
      // },

      data: {
        productOverview: result?.productOverview?.[0] || [],
        productStats: result?.productStats?.[0] || {
          totalProducts: 0,
          totalActiveProducts: 0,
          totalDraftProducts: 0,
          totalInactiveProducts: 0,
          totalBlockedProducts: 0,
          approvedProducts: 0,
          pendingProductsapproval: 0,
        },
        stockStats: result?.stockStats?.[0] || {
          stock: 0,
          stockLimit: 0,
          price: 0,
        },
        CategoryStats: result?.CategoryStats?.[0] || {
          totalNumberOfProductsInCategory: 0,
          totalActiveProductsInCategory: 0,
          totalDraftProductInCategory: 0,
          totalInactiveProductInCategory: 0,
          totalBlockedProductInCategory: 0,
        },
        ShopsStats: result?.ShopsStats || {
          totalNumberofProductsInShops: 0,
        },
      },
      success: true,
      message: "Product Aggreate Service",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error in Category Aggreate Service",
      error: error.message,
    });
  }
};
  