import { Order } from "../../../models/order.model.js";
import { User } from "../../../models/user.model.js";

export const OrderAggregate = async (req, res) => {
  const user = req.user.userId;
  console.log("poiuy", user);
  const userData = await User.findById(user).select("shops");
  const shops = userData?.shops;
  console.log("rtyui", shops);
  // console.log("rtyui", userData);
  if (shops?.length === 0) {
    return res.status(200).json({
      data: {
        orderOverview: {
          totalOrder: 0,
          totalPendingOrder: 0,
          totalPaidOrder: 0,
          totalFailedOrder: 0,
          totalRefundedOrder: 0,
          totalRevenue: 0,
        },

        OrderStatus: {
          totalOrderproducts: 0,
          totalProductsQuantity: 0,
          totalPendingOrderProducts: 0,
          totalConfirmedOrderProducts: 0,
          totalPackedOrderProducts: 0,
          totalShippedOrderProducts: 0,
          totalDeliveredOrderProducts: 0,
          totalCancelledOrderProducts: 0,
        },

        OrderPaymentStatus: {
          order: 0,
          revenue: 0,
        },

        productsOrderStats: {
          totalQuantity: 0,
          totalSale: 0,
        },
      },
      message: "NO Order data retrieved as user has no shops",
      success: true,
    });
  }
  try {
    const result = await Order.aggregate([
      {
        $facet: {
          orderOverview: [
            { $unwind: "$orderItems" },
            {
              $match: {
                "orderItems.shop": { $in: shops },
              },
            },
            {
              $group: {
                _id: null,
                totalOrder: {
                  $sum: 1,
                },
                totalPendingOrder: {
                  $sum: {
                    $cond: [{ $eq: ["$paymentStatus", "Pending"] }, 1, 0],
                  },
                },
                totalPaidOrder: {
                  $sum: {
                    $cond: [{ $eq: ["$paymentStatus", "Paid"] }, 1, 0],
                  },
                },
                totalFailedOrder: {
                  $sum: {
                    $cond: [{ $eq: ["$paymentStatus", "Failed"] }, 1, 0],
                  },
                },
                totalRefundedOrder: {
                  $sum: {
                    $cond: [{ $eq: ["$paymentStatus", "Refunded"] }, 1, 0],
                  },
                },
              },
            },
          ],
          OrderStatus: [
            { $unwind: "$orderItems" },
            {
              $match: {
                "orderItems.shop": { $in: shops },
              },
            },
            {
              $group: {
                _id: null,
                totalPrice: {
                  $sum: "$totalAmount",
                },
                totalOrderproducts: {
                  $sum: 1,
                },
                totalPendingOrderProducts: {
                  $sum: {
                    $cond: [
                      { $eq: ["$orderItems.orderStatus", "Pending"] },
                      1,
                      0,
                    ],
                  },
                },
                totalConfirmedOrderProducts: {
                  $sum: {
                    $cond: [
                      { $eq: ["$orderItems.orderStatus", "Confirmed"] },
                      1,
                      0,
                    ],
                  },
                },
                totalPackedOrderProducts: {
                  $sum: {
                    $cond: [
                      { $eq: ["$orderItems.orderStatus", "Packed"] },
                      1,
                      0,
                    ],
                  },
                },
                totalShippedOrderProducts: {
                  $sum: {
                    $cond: [
                      { $eq: ["$orderItems.orderStatus", "Shipped"] },
                      1,
                      0,
                    ],
                  },
                },
                totalDeliveredOrderProducts: {
                  $sum: {
                    $cond: [
                      { $eq: ["$orderItems.orderStatus", "Delivered"] },
                      1,
                      0,
                    ],
                  },
                },
                totalCancelledOrderProducts: {
                  $sum: {
                    $cond: [
                      { $eq: ["$orderItems.orderStatus", "Cancelled"] },
                      1,
                      0,
                    ],
                  },
                },
              },
            },
          ],
          paymentStatus: [
            { $unwind: "$orderItems" },
            {
              $match: {
                "orderItems.shop": { $in: shops },
              },
            },
            {
              $group: {
                _id: "$paymentMethod",

                orders: {
                  $sum: 1,
                },

                revenue: {
                  $sum: "$totalAmount",
                },
              },
            },

            {
              $sort: {
                revenue: -1,
              },
            },
          ],

          productsOrderStats: [
            { $unwind: "$orderItems" },
            {
              $match: {
                "orderItems.shop": { $in: shops },
              },
            },

            {
              $group: {
                _id: "$orderItems.product",

                totalQuantity: {
                  $sum: "$orderItems.quantity",
                },

                totalSale: {
                  $sum: {
                    $multiply: ["$orderItems.price", "$orderItems.quantity"],
                  },
                },
              },
            },

            {
              $lookup: {
                from: "products",
                localField: "_id",
                foreignField: "_id",
                as: "product",
              },
            },

            {
              $unwind: "$product",
            },

            {
              $project: {
                _id: 0,

                product: "$product.name",

                totalQuantity: 1,

                totalSale: 1,
              },
            },

            {
              $sort: {
                totalQuantity: -1,
              },
            },
          ],
        },
      },
    ]);
 const aggregateData = result?.[0] || {};
 const data= { 
  orderOverview: 
  aggregateData.orderOverview?.[0]||{
        
          totalOrder: 0,
          totalPendingOrder: 0,
          totalPaidOrder: 0,
          totalFailedOrder: 0,
          totalRefundedOrder: 0,
          totalRevenue: 0,
        },

        OrderStatus:aggregateData.OrderStatus?.[0]|| {
          totalOrderproducts: 0,
          totalProductsQuantity: 0,
          totalPendingOrderProducts: 0,
          totalConfirmedOrderProducts: 0,
          totalPackedOrderProducts: 0,
          totalShippedOrderProducts: 0,
          totalDeliveredOrderProducts: 0,
          totalCancelledOrderProducts: 0,
        },

        OrderPaymentStatus:aggregateData.OrderPaymentStatus?.[0]|| {
          order: 0,
          revenue: 0,
        },

        productsOrderStats:aggregateData.productsOrderStats?.[0]|| {
          totalQuantity: 0,
          totalSale: 0,
        },
      };
    res.status(200).json({
      data:data,
      success: true,
      message: "order aggregate is retrieved successfully",
    });
  } catch (error) {
    res.status(500).json({
      data: error.message,
      success: false,
      message: "order aggregate is not retrieved successfully",
    });
  }
};
