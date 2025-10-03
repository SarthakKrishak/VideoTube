import { asyncHandler } from "../utils/asyncHandler.js";
import {ApiError} from "../utils/ApiError.js"
import { User } from "../models/user.model.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js"
import { ApiResponse } from "../utils/ApiResponse.js";


const registerUser = asyncHandler(async (req, res) => {
    const { fullName, email, username, password } = req.body;
    
    // Validation of the fields
    if (fullName === "" || email === "" || username==="" || password==="") {
        throw new ApiError(400, "All Fields are required");
    }

    // Checking for existing user
    const existedUser = User.findOne({
            $or: [{ email }, { username }]
    })

    if (existedUser) {
        throw new ApiError(409, "User already exists");
    }

    // Getting the avatar and coverImage path
    const avatarLocalPath = req.files?.avatar[0]?.path;
    const coverImageLocalPath = req.files?.coverImage[0]?.path;

    if (!avatarLocalPath) {
        throw new ApiError(400,"Avatar File is required")
    }

    // Uploaded on cloudinary
    const avatar = await uploadOnCloudinary(avatarLocalPath);
    const coverImage = await uploadOnCloudinary(coverImageLocalPath);

    if (!avatar) {
        throw new ApiError(400,"Avatar is required")
    }

    // Creating User
    const user = await User.create({
        fullName,
        avatar: avatar.url,
        coverImage: coverImage?.url || "",
        email,
        password,
        username: username.toLowerCase()
    })

    // Again checking that is this user created also excluding the password and refreshtoken fields
   const userCreated = await User.findById(user._id).select("-password -refreshToken")

    if (!userCreated) {
        throw new ApiError(400,"Something went wrong while registering the User")
    }

    // Sending the response
    return res.status(201).json(
        new ApiResponse(200, userCreated, "User Created Successfully")
    );
})

export {registerUser}