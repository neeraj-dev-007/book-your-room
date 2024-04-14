import express, { Request, Response } from "express";
import multer from "multer";
import cloudinary from "cloudinary";
import Hotel from "../models/hotel";
import { HotelType } from "../shared/types";
import verifyToken from "../middleware/auth";
import { body } from "express-validator";

/*installing the @types packages is only necessary for packages that do not come with their own TypeScript definitions. 
The @types packages provide type definitions for external modules that do not include them. 
So, if you are using an external package that has TypeScript definitions included, you do not need to install its corresponding 
@types package.
*/

const router = express.Router();
//store files we are getting in request in-memory.
const storage = multer.memoryStorage();
const upload = multer({
  storage: storage,
  limits: {
    fileSize: 6 * 1024 * 1024, //5MB
  },
});

//api/my-hotels
//images will come as part of multipart form
router.post(
  "/",
  verifyToken,
  [
    body("name").notEmpty().withMessage("Name is required"),
    body("city").notEmpty().withMessage("City is required"),
    body("country").notEmpty().withMessage("Country is required"),
    body("description").notEmpty().withMessage("Description is required"),
    body("type").notEmpty().withMessage("Hotel type is required"),
    body("pricePerNight")
      .notEmpty()
      .isNumeric()
      .withMessage("Price per night is required and must be a number"),
    body("facilities")
      .notEmpty()
      .isArray()
      .withMessage("Facilities are required"),
  ],
  upload.array("imageFiles", 6),
  async (req: Request, res: Response) => {
    // const errors = validationResult(req);
    // if(!errors.isEmpty()) {
    //     return res.status(400).json({message: errors.array()});
    // }

    try {
      const imageFiles = req.files as Express.Multer.File[];
      const newHotel: HotelType = req.body;

      //1. Upload Images to cloudinary
      const imageUrls = await uploadImages(imageFiles);
      newHotel.lastUpdated = new Date();
      //we are extracting userId from auth_token cookie for security reason
      newHotel.userId = req.userId;

      //2. Save hotel to database
      const hotel = new Hotel(newHotel);
      await hotel.save();

      return res.status(201).send(hotel);
    } catch (error) {
      console.log("Error Creating Hotel: ", error);
      return res.status(500).json({ message: "Something Went Wrong" });
    }
  }
);

router.get("/", verifyToken, async (req: Request, res: Response) => {
  try {
    const hotels = await Hotel.find({ userId: req.userId });
    res.status(200).send(hotels);
  } catch (error) {
    res.status(500).json({ message: "Error fetching Hotels" });
  }
});

router.get("/:id", verifyToken, async (req: Request, res: Response) => {
  try {
    const hotel = await Hotel.findOne({
      _id: req.params.id.toString(),
      userId: req.userId,
    });
    res.status(200).send(hotel);
  } catch (error) {
    res.status(500).json({ message: "Error fetching hotel details" });
  }
});

router.put(
  "/:id",
  verifyToken,
  upload.array("imageFiles", 6),
  async (req: Request, res: Response) => {
    try {
      const updatedHotel: HotelType = req.body;
      updatedHotel.lastUpdated = new Date();

      const hotel = await Hotel.findOneAndUpdate(
        { _id: req.params.id.toString(), userId: req.userId },
        updatedHotel,
        { new: true }
      );

      if (!hotel) return res.status(404).json({ message: "Hotel Not found!" });

      const files = req.files as Express.Multer.File[];
      const updatedImageUrls = await uploadImages(files);
      hotel.imageUrls = [
        ...updatedImageUrls,
        ...(updatedHotel.imageUrls || []),
      ];
      await hotel.save();

      return res.status(201).send(hotel);
    } catch (error) {
      res.status(500).json({ message: "Error Saving Hotel details" });
    }
  }
);

async function uploadImages(imageFiles: Express.Multer.File[]) {
  const uploadPromises = imageFiles.map(async (image) => {
    //converting image to base64 string
    const b64 = Buffer.from(image.buffer).toString("base64");
    let dataURI = "data:" + image.mimetype + ";base64," + b64;
    const res = await cloudinary.v2.uploader.upload(dataURI);
    return res.url;
  });
  //waiting for all our promises to complete i.e. images to upload to cloudinary
  const imageUrls = await Promise.all(uploadPromises);
  return imageUrls;
}

export default router;
