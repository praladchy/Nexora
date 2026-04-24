import { User } from "../../models/user.model.js";
import { Product } from "../../models/product.model.js";
import { WhishList } from "../../models/whishList.model.js";
export const whishList = async (req, res) => {
  const { productId } = req.body;
  const userId = req.user;
  try {
    const user = await User.findById( userId );
    if (!user)
      return res.status(400).json({
        message: "user not found",
        success: false,
      });
    const product = await Product.findById( productId );
    if (!product)
      return res.status(400).json({
        message: "product not found",
        success: false,
      });
    const WhishListProduct =await WhishList.find({
      user: userId,
      product: productId,
    });
    if (WhishListProduct)
      return res.status(400).json({
        message: "product already in whishList",
        success: false,
      });
    const newWhishList =await whishList.create({
      user: userId,
      product: productId,
    });
    res.status(201).json({
      message: "product added to whishList",
      success: true,
      newWhishList
    });
  } catch (error) {
    return res.status(500).json({
      message: "internal server error",
      success: false,
    });
  }
};
export const removeWhishList = async (req, res) => {
  const { productId } = req.params;
  const userId = req.user;

  console.log(productId, userId);

  try {
    // check user
    const user = await User.findById(userId);

    if (!user) {
      return res.status(400).json({
        message: "User not found",
        success: false,
      });
    }

    // check product
    const product = await Product.findById(productId);

    if (!product) {
      return res.status(400).json({
        message: "Product not found",
        success: false,
      });
    }

    // check wishlist product exists
    const whishListProduct = await WhishList.findOne({
      user: userId,
      product: productId,
    });

    if (!whishListProduct) {
      return res.status(400).json({
        message: "Product not in wishlist",
        success: false,
      });
    }

    // remove from wishlist
    await WhishList.deleteOne({
      user: userId,
      product: productId,
    });

    return res.status(200).json({
      message: "Product removed from wishlist",
      success: true,
    });

  } catch (error) {
    return res.status(500).json({
      message: "Internal server error",
      success: false,
      error: error.message,
    });
  }
};
