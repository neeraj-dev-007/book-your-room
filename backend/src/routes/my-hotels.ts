import express, { Request, Response } from "express";
import multer from 'multer';
import { buffer } from "stream/consumers";
import cloudinary from "cloudinary";
import Hotel, { HotelType } from "../models/hotel";
import verifyToken from "../middleware/auth";
import { check, validationResult } from "express-validator";

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
        fileSize: 5 * 1024 * 1024, //5MB
    }
})

//api/my-hotels
//images will come as part of multipart form
router.post("/", 
    verifyToken, [
        check("userId", "User Id is required").isString(),
        check("name", "Name is required").isString(),
        check("city", "City is required").isString(),
        check("country", "Country is required").isString(),
        check("description", "Description is required").isString(),
        check("pricePerNight", "Price per Night is required").isNumeric(),
        check("starRating", "Star rating is required").isNumeric(),
        check("type", "Hotel Type is required").isString(),
        check("adultCount", "Adult count is required").isNumeric(),
        check("childCount", "Child count is required").isNumeric(),
        check("facilities", "Facilities offered are required").isArray(),
    ],
    upload.array("imageFiles", 6), 
    async (req:Request, res: Response) => {

    const errors = validationResult(req);
    if(!errors.isEmpty()) {
        return res.status(400).json({message: errors.array()});
    }

    try {
        const imageFiles = req.files as Express.Multer.File[];
        const newHotel: HotelType = req.body;

        //1. Upload Images to cloudinary
        const uploadPromises = imageFiles.map( async(image) => {
            //converting image to base64 string
            const b64 = Buffer.from(image.buffer).toString("base64");
            let dataURI = "data:" + image.mimetype + ";base64," + b64;
            const res = await cloudinary.v2.uploader.upload(dataURI);
            return res.url;
        })
        //waiting for all our promises to complete i.e. images to upload to cloudinary
        const imageUrls = await Promise.all(uploadPromises);
        newHotel.imageUrls = imageUrls;
        newHotel.lastUpdated = new Date();
        //we are extracting userId from auth_token cookie for security reason
        newHotel.userId = req.userId;

        //2. Save hotel to database
        const hotel = new Hotel(newHotel);
        await hotel.save();

        return res.status(201).send(hotel);
    }
    catch( error ) {
        console.log("Error Creating Hotel: ", error);
        return res.status(500).json({ message: "Something Went Wrong" });
    }
});

export default router;