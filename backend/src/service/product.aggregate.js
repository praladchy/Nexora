import Product from "../models/product.model.js";
import { User } from "../models/user.model.js";

export const getProductAggregate = async (req, res) => {
  const user = req.user.userId;
  console.log("poiuy", user);
  const userData = await User.findById(user).select("shops");
  const shops = userData?.shops;
  console.log("rtyui", shops);
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
      data: data[0],
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
