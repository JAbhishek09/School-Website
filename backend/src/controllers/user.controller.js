import { asyncHandler } from "../utils/asyncHandler";
import { ApiResponse } from "../utils/ApiResponse";
import { ApiError } from "../utils/ApiError";
import jwt from "jsonwebtoken"
import {User} from "../modles/user.models.js"
const genereateAccessAndRefreshTokens=async(userId)=>{
    try{
        const user=await User.findById(userId);
        const accessToken=user.generateAccessToken();
        const refreshToken=user.generateRefreshToken();
        user.refreshToken=refreshToken;
        await user.save({validateBeforeSave:false})
        return {accessToken,refreshToken};
    }
    catch(error){
        throw new ApiError(500,"Something went wong while generating accessToken and refreshToken")
    }
}
const registerUser=asyncHandler(async(req,res)=>{
    const {fullName,email,username,password}=req.body;
    if([fullName,email,username,password].some((field)=>field?.trim()==="")){
        throw new ApiError(400,"All fields are required");
    }
    const existedUser=await User.findOne({$or:[{username},{email}]})
    if(existedUser)throw new ApiError(409,"User with email or username already exist");
    const otp=Math.floor(100000+Math.random()*900000).toString();
    const hashedotp=crypto.createHash("sha256").update(otp).digest("hex");
    const otpExpiry=new Date(Date.now()+15*60*1000);
    const user = await User.create({
        fullName,
        email,
        username,
        password,
        otp: hashedOtp,
        otpExpiry,
        isVerified: false
    });

    const emailSent=await sendEmail({
        email,
        subject:"Verify Your Account",
        message:`Your OTP is:${otp}.It is valid for 15 minutes `
    });
    if(!emailSent){
        throw new ApiError(500, "Error sending verification email");
    }
    return res.status(201).json(
        new ApiResponse(201,{email},"OTP sent to your email.")
    )
})
const verifyOTP=asyncHandler(async(req,res)=>{
    const{email,otp}=req.body;
    if(!email||!otp)throw new ApiError(400,"Email and OTP are required");
    const user=await User.findOne({email});
    if(!user) throw new ApiError(404,"User not found");
    if(user.isVerified)throw new ApiError(400,"User is already verified")
    const hashedOtp=crypto.createHash("sha256").update(otp).digest("hex");// Hash the provided OTP
    if(user.otp!==hashedOtp||user.otpExpiry<Date.now())throw new ApiError(400,"Invalid or expired OTP");
    user.isVerified=true;
    user.otp=undefined;
    user.otpExpiry=undefined;
    await user.save({validateBeforeSave:false});
    return res.status(200).json(new ApiResponse(200,{username:user.username},"Account verified sucessfully!"))

})
const loginUser=asyncHandler(async(req,res)=>{
    const{email,username,password}=req.body;
    if(!username&&!email)throw new ApiError(400," Username or email is required");
    const user=await User.findOne({$or:[{username},{email}]})
    if(!user)throw new ApiError(409,"User not exist")
    const isPasswordValid=await user.isPasswordCorrect(password);
    if(!isPasswordValid)throw new ApiError(401,"Invalid user credentials");
    const {accessToken,refreshToken}=await genereateAccessAndRefreshTokens(user._id);
    const loggedInUser=await User.findById(user._id).select("-password -refreshToken")
    const options={
        httpOnly:true,
        secure:true
    }
    return res.status(200)
            .cookie("accessToken",accessToken,options)
            .cookie("refreshToken",refreshToken,options)
            .json(new ApiResponse(200,{user:loggedInUser,accessToken,refreshToken},"User logged in Successfully"))
            
})
const logoutUser=asyncHandler(async(req,res)=>{
    await User.findByIdAndUpdate(req.user._id,{
        refreshToken:undefined
    })
    const options={
        httpOnly:true,
        secure:true
    }
    return res.status(200)
            .clearCookie("accessToken",options)
            .clearCookie("refreshToken",options)
            .json(new ApiResponse(200,{},"User logged out Successfully"))
})
const refreshAccessToken=asyncHandler(async(req,res)=>{
    const refreshToken=req.cookies?.refreshToken;
    if(!refreshToken)throw new ApiError(401,"Unauthorized request");

    try {
        const decodedToken=jwt.verify(refreshToken,process.env.REFRESHTOKENSECRET);
        const user=await User.findById(decodedToken?._id);
        if(!user||user?.refreshToken!==refreshToken)throw new ApiError(401,"Invalid refresh token");
        const accessToken=user.generateAccessToken();
        return res.status(200).json(new ApiResponse(200,{accessToken},"Access token refreshed successfully"))
    } catch (error) {
        throw new ApiError(401,error.message||"Invalid refresh token")
    }
})

export {registerUser,verifyOTP,logoutUser,refreshAccessToken,loginUser};