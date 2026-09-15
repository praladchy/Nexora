import mongoose from "mongoose";
import Shop from "../../../models/shop.model.js";

export const shopAggregateForSuperAdminforShopId = async (req, res) => {
  const { shopId } = req.params;

  console.log("SHOP ID:", shopId);

  try {
    // Check ObjectId
    if (!mongoose.Types.ObjectId.isValid(shopId)) {
      return res.status(400).json({
        success: false,
        message: "Invalid shop ID",
      });
    }

    const shopObjectId = new mongoose.Types.ObjectId(shopId);

    const data = await Shop.aggregate([
      {
        $facet: {
          // =====================================================
          // SHOP DETAILS + SHOP STATISTICS
          // =====================================================

          shopStats: [
            // -------------------------------------------------
            // 1. Find selected shop
            // -------------------------------------------------
            {
              $match: {
                _id: shopObjectId,
              },
            },

            // -------------------------------------------------
            // 2. Get shop owner
            // -------------------------------------------------
            {
              $lookup: {
                from: "users",
                localField: "owner",
                foreignField: "_id",
                as: "ownerDetails",
              },
            },

            {
              $unwind: {
                path: "$ownerDetails",
                preserveNullAndEmptyArrays: true,
              },
            },

            // -------------------------------------------------
            // 3. Get shop admins
            // -------------------------------------------------
            {
              $lookup: {
                from: "users",
                localField: "admins",
                foreignField: "_id",
                as: "adminDetails",
              },
            },

            // -------------------------------------------------
            // 4. Get delivery men
            // -------------------------------------------------
            {
              $lookup: {
                from: "users",
                localField: "deliveryMen",
                foreignField: "_id",
                as: "deliveryMenDetails",
              },
            },

            // -------------------------------------------------
            // 5. Get products of this shop
            // -------------------------------------------------
            {
              $lookup: {
                from: "products",

                let: {
                  shopId: "$_id",
                },

                pipeline: [
                  // Find products belonging to this shop
                  {
                    $match: {
                      $expr: {
                        $eq: ["$shop", "$$shopId"],
                      },
                    },
                  },

                  // Product statistics
                  {
                    $group: {
                      _id: null,

                      totalProducts: {
                        $sum: 1,
                      },

                      totalActiveProducts: {
                        $sum: {
                          $cond: [
                            {
                              $eq: ["$status", "active"],
                            },
                            1,
                            0,
                          ],
                        },
                      },

                      totalInactiveProducts: {
                        $sum: {
                          $cond: [
                            {
                              $eq: ["$status", "inactive"],
                            },
                            1,
                            0,
                          ],
                        },
                      },

                      totalDraftProducts: {
                        $sum: {
                          $cond: [
                            {
                              $eq: ["$status", "draft"],
                            },
                            1,
                            0,
                          ],
                        },
                      },

                      totalBlockedProducts: {
                        $sum: {
                          $cond: [
                            {
                              $eq: ["$status", "blocked"],
                            },
                            1,
                            0,
                          ],
                        },
                      },

                      totalApprovedProducts: {
                        $sum: {
                          $cond: [
                            {
                              $eq: ["$isApproved", true],
                            },
                            1,
                            0,
                          ],
                        },
                      },

                      totalStock: {
                        $sum: "$stock",
                      },
                    },
                  },
                ],

                as: "products",
              },
            },

            // -------------------------------------------------
            // 6. Get product list
            // -------------------------------------------------
            {
              $lookup: {
                from: "products",

                let: {
                  shopId: "$_id",
                },

                pipeline: [
                  {
                    $match: {
                      $expr: {
                        $eq: ["$shop", "$$shopId"],
                      },
                    },
                  },

                  // Get category
                  {
                    $lookup: {
                      from: "categories",

                      localField: "category",
                      foreignField: "_id",

                      as: "categoryDetails",
                    },
                  },

                  {
                    $unwind: {
                      path: "$categoryDetails",
                      preserveNullAndEmptyArrays: true,
                    },
                  },

                  {
                    $project: {
                      _id: 1,
                      name: 1,
                      price: 1,
                      discount: 1,
                      finalPrice: 1,
                      stock: 1,
                      stockLimit: 1,
                      status: 1,
                      isApproved: 1,
                      images: 1,
                      createdAt: 1,

                      category: {
                        _id: "$categoryDetails._id",
                        name: "$categoryDetails.name",
                      },
                    },
                  },

                  {
                    $sort: {
                      createdAt: -1,
                    },
                  },

                  {
                    $limit: 10,
                  },
                ],

                as: "productList",
              },
            },

            // -------------------------------------------------
            // 7. Get orders of this shop
            // -------------------------------------------------
            {
              $lookup: {
                from: "orders",

                let: {
                  shopId: "$_id",
                },

                pipeline: [
                  // One order item = one document
                  {
                    $unwind: "$orderItems",
                  },

                  // Only this shop's order items
                  {
                    $match: {
                      $expr: {
                        $eq: [
                          "$orderItems.shop",
                          "$$shopId",
                        ],
                      },
                    },
                  },

                  // Order statistics
                  {
                    $group: {
                      _id: null,

                      totalOrderItems: {
                        $sum: 1,
                      },

                      totalQuantity: {
                        $sum: "$orderItems.quantity",
                      },

                      totalRevenue: {
                        $sum: {
                          $multiply: [
                            "$orderItems.price",
                            "$orderItems.quantity",
                          ],
                        },
                      },

                      customers: {
                        $addToSet: "$user",
                      },

                      // Pending
                      totalPendingOrders: {
                        $sum: {
                          $cond: [
                            {
                              $eq: [
                                "$orderItems.orderStatus",
                                "Pending",
                              ],
                            },
                            1,
                            0,
                          ],
                        },
                      },

                      // Confirmed
                      totalConfirmedOrders: {
                        $sum: {
                          $cond: [
                            {
                              $eq: [
                                "$orderItems.orderStatus",
                                "Confirmed",
                              ],
                            },
                            1,
                            0,
                          ],
                        },
                      },

                      // Packed
                      totalPackedOrders: {
                        $sum: {
                          $cond: [
                            {
                              $eq: [
                                "$orderItems.orderStatus",
                                "Packed",
                              ],
                            },
                            1,
                            0,
                          ],
                        },
                      },

                      // Shipped
                      totalShippedOrders: {
                        $sum: {
                          $cond: [
                            {
                              $eq: [
                                "$orderItems.orderStatus",
                                "Shipped",
                              ],
                            },
                            1,
                            0,
                          ],
                        },
                      },

                      // Delivered
                      totalDeliveredOrders: {
                        $sum: {
                          $cond: [
                            {
                              $eq: [
                                "$orderItems.orderStatus",
                                "Delivered",
                              ],
                            },
                            1,
                            0,
                          ],
                        },
                      },

                      // Cancelled
                      totalCancelledOrders: {
                        $sum: {
                          $cond: [
                            {
                              $eq: [
                                "$orderItems.orderStatus",
                                "Cancelled",
                              ],
                            },
                            1,
                            0,
                          ],
                        },
                      },
                    },
                  },

                  // Project order statistics
                  {
                    $project: {
                      _id: 0,

                      totalOrderItems: 1,

                      totalQuantity: 1,

                      totalRevenue: 1,

                      customers: 1,

                      totalPendingOrders: 1,

                      totalConfirmedOrders: 1,

                      totalPackedOrders: 1,

                      totalShippedOrders: 1,

                      totalDeliveredOrders: 1,

                      totalCancelledOrders: 1,
                    },
                  },
                ],

                as: "orders",
              },
            },

            // -------------------------------------------------
            // 8. Get recent orders
            // -------------------------------------------------
            {
              $lookup: {
                from: "orders",

                let: {
                  shopId: "$_id",
                },

                pipeline: [
                  // Separate order items
                  {
                    $unwind: "$orderItems",
                  },

                  // Only this shop
                  {
                    $match: {
                      $expr: {
                        $eq: [
                          "$orderItems.shop",
                          "$$shopId",
                        ],
                      },
                    },
                  },

                  // Get customer
                  {
                    $lookup: {
                      from: "users",

                      localField: "user",
                      foreignField: "_id",

                      as: "customerDetails",
                    },
                  },

                  {
                    $unwind: {
                      path: "$customerDetails",
                      preserveNullAndEmptyArrays: true,
                    },
                  },

                  // Get product
                  {
                    $lookup: {
                      from: "products",

                      localField: "orderItems.product",
                      foreignField: "_id",

                      as: "productDetails",
                    },
                  },

                  {
                    $unwind: {
                      path: "$productDetails",
                      preserveNullAndEmptyArrays: true,
                    },
                  },

                  // Final recent order object
                  {
                    $project: {
                      _id: 1,

                      createdAt: 1,

                      paymentMethod: 1,

                      paymentStatus: 1,

                      orderStatus:
                        "$orderItems.orderStatus",

                      quantity:
                        "$orderItems.quantity",

                      price:
                        "$orderItems.price",

                      totalPrice: {
                        $multiply: [
                          "$orderItems.price",
                          "$orderItems.quantity",
                        ],
                      },

                      customer: {
                        _id: "$customerDetails._id",
                        name: "$customerDetails.firstName",
                        email: "$customerDetails.email",
                        phone: "$customerDetails.phone",
                      },

                      product: {
                        _id: "$productDetails._id",
                        name: "$productDetails.name",
                      },
                    },
                  },

                  {
                    $sort: {
                      createdAt: -1,
                    },
                  },

                  {
                    $limit: 5,
                  },
                ],

                as: "recentOrders",
              },
            },

            // -------------------------------------------------
            // 9. Final shop result
            // -------------------------------------------------
            {
              $project: {
                _id: 1,

                name: 1,

                description: 1,

                logo: 1,

                address: 1,

                isActive: 1,

                createdAt: 1,

                updatedAt: 1,

                // Owner
                owner: {
                  _id: "$ownerDetails._id",
                  name: "$ownerDetails.firstName",
                  email: "$ownerDetails.email",
                  phone: "$ownerDetails.phone",
                },

                // Admins
                adminDetails: 1,

                // Delivery men
                deliveryMenDetails: 1,

                // Product statistics
                products: 1,

                // Product list
                productList: 1,

                // Order statistics
                orders: 1,

                // Recent orders
                recentOrders: 1,
              },
            },

            {
              $sort: {
                createdAt: -1,
              },
            },
          ],

          // =====================================================
          // SHOP OVERVIEW
          // =====================================================

          shopOverview: [
            {
              $group: {
                _id: null,

                totalShops: {
                  $sum: 1,
                },

                totalActiveShops: {
                  $sum: {
                    $cond: [
                      {
                        $eq: ["$isActive", true],
                      },
                      1,
                      0,
                    ],
                  },
                },

                totalInactiveShops: {
                  $sum: {
                    $cond: [
                      {
                        $eq: ["$isActive", false],
                      },
                      1,
                      0,
                    ],
                  },
                },
              },
            },
          ],
        },
      },
    ]);

    const result = data[0];

    console.log("SHOP AGGREGATE RESULT:");
    console.dir(result, {
      depth: null,
    });

    return res.status(200).json({
      success: true,

      message: "Shop Aggregate Service",

      data: {
        shopOverview: result.shopOverview,

        shopStats: result.shopStats,
      },
    });
  } catch (error) {
    console.error("SHOP AGGREGATE ERROR:");
    console.error(error);

    return res.status(500).json({
      success: false,

      message: "Error in Shop Aggregate Service",

      error: error.message,
    });
  }
};