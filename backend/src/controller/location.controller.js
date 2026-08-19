import Location from "../models/location.model.js";

export const saveLocation = async (req, res) => {
  try {
    const { latitude, longitude } = req.body;

    const place = await Location.find({
      location: {
        $near: {
          $geometry: {
            type: "Point",
            coordinates: [longitude, latitude],
          },
          $maxDistance: 5000,
        },
      },
    });

    const location = await Location.create({
      location: {
        type: "Point",
        coordinates: [longitude, latitude],
      },
    });

    res.json({
      success: true,
      location,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
