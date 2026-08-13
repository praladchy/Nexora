import Category from "../models/category.model.js";

export const categoryAggreate = async (req, res) => {
  try {
   const data= await Category.aggregate([
      {
        $group: {
          _id: null,
          totalCategories: {
            $sum: 1,
          },
          totalActiveCategories: {
            $sum: {
              $cond: [{ $eq: ["$isActive", "true"] }, 1, 0],
            },
          },
          totalGlobalCategories: {
            $sum: {
              $cond: [{ $eq: ["$isGlobal", "true"] }, 1, 0],
            },
          },
        },
      },
    ]);
    res.status(200).json({
      data: data,
      success: true,
      message: "Category Aggreate Service",
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error in Category Aggreate Service",
      error: error.message,
    });
  }
};
