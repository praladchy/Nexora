import Category from "../../../models/category.model.js";

export const categoryAggregateForSuperAdmin = async (req, res) => {
  try {
    const data = await Category.aggregate([
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
