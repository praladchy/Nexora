import Shop from "../../../models/shop.model.js";

export const dashboardAggregateForSuperAdmin = async (req, res) => {
  try {
    // ============================================
    // TODAY DATE
    // ============================================

    const now = new Date();

    const startOfToday = new Date(
      now.getFullYear(),
      now.getMonth(),
      now.getDate()
    );

    const startOfTomorrow = new Date(
      now.getFullYear(),
      now.getMonth(),
      now.getDate() + 1
    );

    // console.log("Start Today:", startOfToday);
    // console.log("Start Tomorrow:", startOfTomorrow);

    // ============================================
    // MAIN AGGREGATION
    // ============================================

    const result = await Shop.aggregate([
      {
        $facet: {
          // =====================================================
          // 1. SHOP STATS
          // =====================================================

          shopStats: [
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

                totalPendingShops: {
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

            {
              $project: {
                _id: 0,
                totalShops: 1,
                totalActiveShops: 1,
                totalPendingShops: 1,
              },
            },
          ],

          // =====================================================
          // 2. USER STATS
          // =====================================================

          userStats: [
            {
              $lookup: {
                from: "users",

                pipeline: [
                  {
                    $group: {
                      _id: null,

                      totalUsers: {
                        $sum: 1,
                      },

                      totalVendors: {
                        $sum: {
                          $cond: [
                            {
                              $eq: ["$role", "vendor"],
                            },
                            1,
                            0,
                          ],
                        },
                      },
                    },
                  },

                  {
                    $project: {
                      _id: 0,
                      totalUsers: 1,
                      totalVendors: 1,
                    },
                  },
                ],

                as: "users",
              },
            },

            {
              $project: {
                _id: 0,
                users: 1,
              },
            },
          ],

          // =====================================================
          // 3. PRODUCT STATS
          // =====================================================

          productStats: [
            {
              $lookup: {
                from: "products",

                pipeline: [
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

                  {
                    $project: {
                      _id: 0,
                      totalProducts: 1,
                      totalActiveProducts: 1,
                      totalInactiveProducts: 1,
                      totalDraftProducts: 1,
                      totalBlockedProducts: 1,
                      totalApprovedProducts: 1,
                      totalStock: 1,
                    },
                  },
                ],

                as: "products",
              },
            },

            {
              $project: {
                _id: 0,
                products: 1,
              },
            },
          ],

          // =====================================================
          // 4. CATEGORY STATS
          // =====================================================

          categoryStats: [
            {
              $lookup: {
                from: "categories",

                pipeline: [
                  {
                    $group: {
                      _id: null,

                      totalCategories: {
                        $sum: 1,
                      },

                      totalActiveCategories: {
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

                      totalGlobalCategories: {
                        $sum: {
                          $cond: [
                            {
                              $eq: ["$isGlobal", true],
                            },
                            1,
                            0,
                          ],
                        },
                      },
                    },
                  },

                  {
                    $project: {
                      _id: 0,
                      totalCategories: 1,
                      totalActiveCategories: 1,
                      totalGlobalCategories: 1,
                    },
                  },
                ],

                as: "categories",
              },
            },

            {
              $project: {
                _id: 0,
                categories: 1,
              },
            },
          ],

          // =====================================================
          // 5. ORDER STATS
          // =====================================================

          orderStats: [
            {
              $lookup: {
                from: "orders",

                pipeline: [
                  {
                    $unwind: "$orderItems",
                  },

                  // ---------------------------------------------
                  // GROUP BY ORDER
                  // ---------------------------------------------
                  // This makes Total Orders unique.
                  //
                  // Example:
                  // One order contains 3 products
                  //
                  // Without this:
                  // totalOrders = 3
                  //
                  // With this:
                  // totalOrders = 1
                  // ---------------------------------------------

                  {
                    $group: {
                      _id: "$_id",

                      user: {
                        $first: "$user",
                      },

                      totalOrderAmount: {
                        $sum: {
                          $multiply: [
                            "$orderItems.price",
                            "$orderItems.quantity",
                          ],
                        },
                      },

                      totalQuantity: {
                        $sum: "$orderItems.quantity",
                      },

                      orderStatus: {
                        $first: "$status",
                      },

                      paymentStatus: {
                        $first: "$paymentStatus",
                      },
                    },
                  },

                  // ---------------------------------------------
                  // NOW GROUP ALL ORDERS
                  // ---------------------------------------------

                  {
                    $group: {
                      _id: null,

                      totalOrders: {
                        $sum: 1,
                      },

                      totalProductsQuantity: {
                        $sum: "$totalQuantity",
                      },

                      totalSales: {
                        $sum: "$totalOrderAmount",
                      },

                      totalPendingOrders: {
                        $sum: {
                          $cond: [
                            {
                              $eq: [
                                "$orderStatus",
                                "Pending",
                              ],
                            },
                            1,
                            0,
                          ],
                        },
                      },

                      totalConfirmedOrders: {
                        $sum: {
                          $cond: [
                            {
                              $eq: [
                                "$orderStatus",
                                "Confirmed",
                              ],
                            },
                            1,
                            0,
                          ],
                        },
                      },

                      totalPackedOrders: {
                        $sum: {
                          $cond: [
                            {
                              $eq: [
                                "$orderStatus",
                                "Packed",
                              ],
                            },
                            1,
                            0,
                          ],
                        },
                      },

                      totalShippedOrders: {
                        $sum: {
                          $cond: [
                            {
                              $eq: [
                                "$orderStatus",
                                "Shipped",
                              ],
                            },
                            1,
                            0,
                          ],
                        },
                      },

                      totalDeliveredOrders: {
                        $sum: {
                          $cond: [
                            {
                              $eq: [
                                "$orderStatus",
                                "Delivered",
                              ],
                            },
                            1,
                            0,
                          ],
                        },
                      },

                      totalCancelledOrders: {
                        $sum: {
                          $cond: [
                            {
                              $eq: [
                                "$orderStatus",
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

                  {
                    $project: {
                      _id: 0,

                      totalOrders: 1,
                      totalProductsQuantity: 1,
                      totalSales: 1,

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

            {
              $project: {
                _id: 0,
                orders: 1,
              },
            },
          ],

          // =====================================================
          // 6. TODAY'S SALES
          // =====================================================

          todayStats: [
            {
              $lookup: {
                from: "orders",

                pipeline: [
                  {
                    $match: {
                      createdAt: {
                        $gte: startOfToday,
                        $lt: startOfTomorrow,
                      },
                    },
                  },

                  {
                    $unwind: "$orderItems",
                  },

                  {
                    $group: {
                      _id: null,

                      todayOrders: {
                        $addToSet: "$_id",
                      },

                      todayProducts: {
                        $sum: "$orderItems.quantity",
                      },

                      todaySales: {
                        $sum: {
                          $multiply: [
                            "$orderItems.price",
                            "$orderItems.quantity",
                          ],
                        },
                      },
                    },
                  },

                  {
                    $project: {
                      _id: 0,

                      todayOrders: 1,
                      todayProducts: 1,
                      todaySales: 1,
                    },
                  },
                ],

                as: "today",
              },
            },

            {
              $project: {
                _id: 0,
                today: 1,
              },
            },
          ],
        },
      },
    ]);

    // =========================================================
    // RESULT
    // =========================================================

    const aggregateResult = result[0];

    // =========================================================
    // EXTRACT VALUES
    // =========================================================

    const shopData =
      aggregateResult?.shopStats?.[0] || {};

    const userData =
      aggregateResult?.userStats?.[0]?.users?.[0] || {};

    const productData =
      aggregateResult?.productStats?.[0]?.products?.[0] || {};

    const categoryData =
      aggregateResult?.categoryStats?.[0]?.categories?.[0] || {};

    const orderData =
      aggregateResult?.orderStats?.[0]?.orders?.[0] || {};

    const todayData =
      aggregateResult?.todayStats?.[0]?.today?.[0] || {};

    // =========================================================
    // FINAL RESPONSE
    // =========================================================

    return res.status(200).json({
      success: true,

      message: "SuperAdmin Dashboard Aggregate",

      data: {
        // -----------------------------------------
        // CARDS
        // -----------------------------------------

        totalSales: orderData.totalSales || 0,

        totalOrders: orderData.totalOrders || 0,

        totalProducts: productData.totalProducts || 0,

        totalUsers: userData.totalUsers || 0,

        totalVendors: userData.totalVendors || 0,

        pendingShops: shopData.totalPendingShops || 0,

        totalCategories:
          categoryData.totalCategories || 0,

        todaySalesProducts:
          todayData.todayProducts || 0,

        // -----------------------------------------
        // EXTRA DATA
        // -----------------------------------------

        todaySales:
          todayData.todaySales || 0,

        todayOrders:
          todayData.todayOrders?.length || 0,

        shopStats: shopData,

        productStats: productData,

        categoryStats: categoryData,

        orderStats: orderData,

        todayStats: todayData,
      },
    });
  } catch (error) {
    console.error(
      "SUPERADMIN DASHBOARD AGGREGATE ERROR:",
      error
    );

    return res.status(500).json({
      success: false,

      message:
        "Error in SuperAdmin Dashboard Aggregate",

      error: error.message,
    });
  }
};
