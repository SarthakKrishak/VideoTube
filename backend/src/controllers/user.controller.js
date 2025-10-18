import { asyncHandler } from "../utils/asyncHandler.js";
import {ApiError} from "../utils/ApiError.js"
import { User } from "../models/user.model.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js"
import { ApiResponse } from "../utils/ApiResponse.js";

const generateAccessAndRefreshTokens = async (userId) => {
    try {
        const user = User.findById(userId);
        if (!user) {
            throw new ApiError(401, "User doesnt exists");
        }


    // Generating the refresh and access tokens
      const accessToken = user.generateAccessToken();
      const refreshToken = user.generateRefreshToken();
      
        // Now storing the refresh token in the database as well
        user.refreshToken = refreshToken;
        // We are saving but if we write only save then the mongodb will check for password as well to validate so we are making it as false so now it will not check
       await user.save({validateBeforeSave:false});

        return { accessToken, refreshToken }; 

    } catch (error) {
        throw new ApiError(500,"Something went wrong while generating Access and refresh tokenzz")
    }
}

const registerUser = asyncHandler(async (req, res) => {
    // Destructe the data from the req body
    const { fullName, email, username, password } = req.body;
    
    // Validation of the fields
    if (fullName === "" || email === "" || username==="" || password==="") {
        throw new ApiError(400, "All Fields are required");
    }

    // Checking for existing user using both email and username
    const existedUser = await User.findOne({
            $or: [{ email }, { username }]
    })

    if (existedUser) {
        throw new ApiError(409, "User already exists");
    }

    // Getting the avatar and coverImage on local path (consolelog req.files for better understanding)
    console.log(req.files);
    const avatarLocalPath = req.files?.avatar[0]?.path;
    // const coverImageLocalPath = req.files?.coverImage[0]?.path;

    // As we are not directly checking the coverImage directly
    let coverImageLocalPath;

    if (req.files && Array.isArray(req.files.coverImage) && req.files.coverImage.length>0) {
        coverImageLocalPath = req.files.coverImage[0].path;
    }



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

    // Again checking that is this user created also exclude the password and refreshtoken fields ( As we dont want to send the password and refresh token to the frontend )
   const userCreated = await User.findById(user._id).select("-password -refreshToken")

    if (!userCreated) {
        throw new ApiError(400,"Something went wrong while registering the User")
    }

    // Sending the response
    return res.status(201).json(
        new ApiResponse(200, userCreated, "User Created Successfully")
    );
})

const loginUser = asyncHandler(async (req, res) => {
    //Steps-
    // Getting the email and password
    // Find the user from email
    // check for the password
    // access and refresh token generated
    // send through cookies
    // send cookie

    const { email, password, username } = req.body;
    
    if (!username || !email) {
        throw new ApiError(400,"Username or email is required")
    }

    // using mongodb operator for both email and username
   const user = await User.findOne({ $or: [{ email }, { username }] });

    if (!user) {
        throw new ApiError(404, "User doesn't exist");
    }

   const passValid = await user.isPasswordCorrect(password);

    if (!passValid) {
        throw new ApiError(401, "Invalid Password");
    }

    // Generating the access and refresh token
    const { accessToken, refreshToken } = await generateAccessAndRefreshTokens(user._id);
    
    const loggedInUser = await User.findById(user._id).select("-password -refreshToken");

    const options = {
        httpOnly: true,
        secure:true
    }

    return res
        .status(200)
        .cookie("accessToken", accessToken, options)
        .cookie("refreshToken", refreshToken, options)
        .json(new ApiResponse(200, {
            user: loggedInUser, accessToken, refreshToken
        },
        "User loggedin Successfully"))
})

const logoutUser = asyncHandler(async (req, res) => {
    // Clearing the cookies and refresh token 
    
})

export { registerUser, loginUser, logoutUser };