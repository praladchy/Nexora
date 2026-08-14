import { Order } from "../models/order.model.js";

export const dateAggregate = async (req, res) => {
  try {
    const now = new Date();

    // Today
    const startToday = new Date(now);
    startToday.setHours(0, 0, 0, 0);

    const endToday = new Date(now);
    endToday.setHours(23, 59, 59, 999);

    // Last 1 Hour
    const startHour = new Date(now);
    startHour.setHours(startHour.getHours() - 1);

    const result = await Order.aggregate([
      {
        $facet: {
          // Last 1 Hour
          orderInHours: [
            {
              $match: {
                paymentStatus: "Paid",
                createdAt: {
                  $gte: startHour,
                  $lt: now,
                },
              },
            },
            { $unwind: "$orderItems" },
            {
              $group: {
                _id: "$_id",
                totalAmount: { $first: "$totalAmount" },
                totalProducts: { $sum: "$orderItems.quantity" },
              },
            },
            {
              $group: {
                _id: null,
                TotalOrder: { $sum: 1 },
                TotalSales: { $sum: "$totalAmount" },
                TotalProducts: { $sum: "$totalProducts" },
              },
            },
          ],

          // Today
          orderInToday: [
            {
              $match: {
                paymentStatus: "Paid",
                createdAt: {
                  $gte: startToday,
                  $lte: endToday,
                },
              },
            },
            { $unwind: "$orderItems" },
            {
              $group: {
                _id: "$_id",
                totalAmount: { $first: "$totalAmount" },
                totalProducts: { $sum: "$orderItems.quantity" },
              },
            },
            {
              $group: {
                _id: null,
                TotalOrder: { $sum: 1 },
                TotalSales: { $sum: "$totalAmount" },
                TotalProducts: { $sum: "$totalProducts" },
              },
            },
          ],

          // Daily Sales
          orderInDay: [
            { $match: { paymentStatus: "Paid" } },
            { $unwind: "$orderItems" },
            {
              $group: {
                _id: {
                  orderId: "$_id",
                  year: { $year: "$createdAt" },
                  month: { $month: "$createdAt" },
                  day: { $dayOfMonth: "$createdAt" },
                },
                totalAmount: { $first: "$totalAmount" },
                totalProducts: { $sum: "$orderItems.quantity" },
              },
            },
            {
              $group: {
                _id: {
                  year: "$_id.year",
                  month: "$_id.month",
                  day: "$_id.day",
                },
                TotalOrder: { $sum: 1 },
                TotalSales: { $sum: "$totalAmount" },
                TotalProducts: { $sum: "$totalProducts" },
              },
            },
            { $sort: { "_id.year": 1, "_id.month": 1, "_id.day": 1 } },
          ],

          // Weekly Sales
          orderInWeek: [
            { $match: { paymentStatus: "Paid" } },
            { $unwind: "$orderItems" },
            {
              $group: {
                _id: {
                  orderId: "$_id",
                  year: { $isoWeekYear: "$createdAt" },
                  week: { $isoWeek: "$createdAt" },
                },
                totalAmount: { $first: "$totalAmount" },
                totalProducts: { $sum: "$orderItems.quantity" },
              },
            },
            {
              $group: {
                _id: {
                  year: "$_id.year",
                  week: "$_id.week",
                },
                TotalOrder: { $sum: 1 },
                TotalSales: { $sum: "$totalAmount" },
                TotalProducts: { $sum: "$totalProducts" },
              },
            },
            { $sort: { "_id.year": 1, "_id.week": 1 } },
          ],

          // Monthly Sales
          orderInMonth: [
            { $match: { paymentStatus: "Paid" } },
            { $unwind: "$orderItems" },
            {
              $group: {
                _id: {
                  orderId: "$_id",
                  year: { $year: "$createdAt" },
                  month: { $month: "$createdAt" },
                },
                totalAmount: { $first: "$totalAmount" },
                totalProducts: { $sum: "$orderItems.quantity" },
              },
            },
            {
              $group: {
                _id: {
                  year: "$_id.year",
                  month: "$_id.month",
                },
                TotalOrder: { $sum: 1 },
                TotalSales: { $sum: "$totalAmount" },
                TotalProducts: { $sum: "$totalProducts" },
              },
            },
            { $sort: { "_id.year": 1, "_id.month": 1 } },
          ],

          // Yearly Sales
          orderInYear: [
            { $match: { paymentStatus: "Paid" } },
            { $unwind: "$orderItems" },
            {
              $group: {
                _id: {
                  orderId: "$_id",
                  year: { $year: "$createdAt" },
                },
                totalAmount: { $first: "$totalAmount" },
                totalProducts: { $sum: "$orderItems.quantity" },
              },
            },
            {
              $group: {
                _id: {
                  year: "$_id.year",
                },
                TotalOrder: { $sum: 1 },
                TotalSales: { $sum: "$totalAmount" },
                TotalProducts: { $sum: "$totalProducts" },
              },
            },
            { $sort: { "_id.year": 1 } },
          ],
        },
      },
    ]);

    res.status(200).json(result[0]);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
