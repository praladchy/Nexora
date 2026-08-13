import { Order } from "../models/order.model.js";

export const OrderAggregate = async (req, res) => {
  try {
   const result = await Order.aggregate([
      {
        $facet: {
          orderOverview: [
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
              $group: {
                _id: "$user",
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
                totalDelliveredOrderProducts: {
                  $sum: {
                    $cond: [
                      { $eq: ["$orderItems.orderStatus", "Dellivered"] },
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
            {
              $unwind: "$orderItems",
            },

            {
              $group: {
                _id: "$orderItems.product",

                totalQuantity: {
                  $sum: "$orderItems.quantity",
                },

                revenue: {
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

                revenue: 1,
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

    res.status(200).json({
      data:result[0],
      success:true,
      message:"order aggregate is retrieved successfully"
    })
  } catch (error) {
    res.status(500).json({
      data:error.message,
      success:false,
      message:"order aggregate is not retrieved successfully"
    })
  }
};
