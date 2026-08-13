import Product from "../models/product.model.js";

export const getProductAggregate = async (req, res) => {
  try {
  const data=  await Product.aggregate([
      {
        $facet: {
          productOverview: [
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
              $project: {
                name: 1,
                stock: 1,
                stockLimit: 1,

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
              $group: {
                _id: "$category",
                totalNumberOfProductsInCategory: { $sum: 1 },
              },
            },
            // {
            //   $lookup: {
            //     from: "categories",
            //     localField: "_id",
            //     foreignField: "_id",
            //     as: "category",
            //   },
            // },
            // { $unwind: "$category" },
          ],
          ShopsStats:[{
            $group:{
              _id:"$shop",
              totalNumberofProductsInShops:{$sum:1}
            }
          }]
        },
      },
    ]);
    res.status(200).json({
      data: data[0],
      success: true,
      message: "Product Aggreate Service",
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error in Category Aggreate Service",
      error: error.message,
    });
  }
};
