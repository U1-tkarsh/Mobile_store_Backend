const express = require("express");
const asyncHandler = require("express-async-handler");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../model/userModel");
const nodemailer = require("nodemailer");
const { JWT_SECRET } = require("../config/keys");

const sendEmail = async (mail, password) => {
  try {
    // Create a Nodemailer transporter
    const transporter = nodemailer.createTransport({
      service: "gmail", // e.g., 'gmail'
      auth: {
        user: "t.guptacool1909@gmail.com",
        pass: "hdquiboomzjchpiz",
      },
    });
    // Set up email data
    // var OTP1 = Math.floor(Math.random() * 10000) + 10000;
    // otpGlobal = OTP1;
    const mailOptions = {
      from: process.env.Email,
      to: `${mail}`,
      subject: "Mobile Store Portal",
      text: `Hello!\n\nYou're receiving this email for your Mobile Store Portal account.\n\nYour Email: ${mail}\nYour Password: ${password}\n`,
    };
    // Send the email with attached PDF
    // console.log(otpGlobal);
    await transporter.sendMail(mailOptions);
    return true;
  } catch (err) {
    console.error("Error sending email:", err);
  }
};

//@desc Register a user
// http://localhost:5001/api/Users/register
//@access public
const registerUser = asyncHandler(async (req, res) => {
  const { username, email, password, userRole, mobileNumber, address } =
    req.body;
  if (!username || !password || !email) {
    res.status(400);
    throw new Error(`All fields are mandatory`);
  }
  const userAvailable = await User.findOne({ email });
  if (userAvailable) {
    res.status(400);
    throw new Error(`User Already Registered`);
  }

  //Hash Password
  const hashPassword = await bcrypt.hash(password, 10);
  console.log("Hash Password", hashPassword);
  const user = await User.create({
    username,
    email,
    password: hashPassword,
    userRole,
    mobileNumber,
    address,
  });
  sendEmail(email, password);
  console.log(`User created ${user}`);

  //we write if else statements because of we do not want to send user response whenever it registers because it contain our hash password
  if (user) {
    res.status(201).json({ _id: user.id, email: user.email });
  } else {
    res.status(400);
    throw new Error(`User data is not valid`);
  }
  //   res.json({ message: "Register the user!" });
});

//@desc Login a user
// http://localhost:5001/api/Users/login
//@access public
const loginUser = asyncHandler(async (req, res) => {
  let { email, password } = req.body;
  if (!email || !password) {
    return res.json({
      error: "Fields must not be empty",
    });
  }
  try {
    const MAIL = process.env.DEFAULT_MAIL;
    const PASS = process.env.DEFAULT_PASS;
    if (MAIL == email && PASS == password) {
      const token = jwt.sign(
        { data: { userRole: "admin", username: MAIL } },
        JWT_SECRET
      );
      const encode = jwt.verify(token, JWT_SECRET);
      return res.json({
        token: token,
        user: encode,
      });
    } else {
      const data = await User.findOne({ email: email });
      if (!data) {
        return res.json({
          error: "Invalid email",
        });
      } else {
        const login = await bcrypt.compare(password, data.password);
        if (login) {
          const token = jwt.sign({ data }, JWT_SECRET);
          const encode = jwt.verify(token, JWT_SECRET);
          return res.json({
            token: token,
            user: encode,
          });
        } else {
          return res.json({
            error: "Invalid password",
          });
        }
      }
    }
  } catch (err) {
    console.log(err);
  }
});

// http://localhost:5001/api/Users/admin/:id
const makeAdmin = asyncHandler(async (req, res) => {
  const { id } = req.params;

  try {
    const user = await User.findById({ _id: id });

    if (!user) {
      res.status(400);
      throw new Error("User not found");
    }

    if (user.userRole === "admin") {
      user.userRole = "student";
      await user.save();
    } else if (user.userRole === "student") {
      user.userRole = "admin";
      await user.save();
    }

    return res
      .status(200)
      .json({ success: true, message: "UserRole change successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err });
  }
});

// http://localhost:5001/api/Users/forgotPassword
const forgotPassword = asyncHandler(async (req, res) => {
  const { email, mobileNumber, password } = req.body;

  try {
    if (!email || !mobileNumber || !password) {
      res.status(400);
      throw new Error("Email, mobile number, and password are required");
    }

    const user = await User.findOne({ email, mobileNumber });

    if (!user) {
      res.status(404);
      throw new Error("User not found");
    }

    const newPassword = password;

    user.password = newPassword;
    await user.save();

    await sendEmail(email, newPassword);

    res.status(201).json({ message: "Password change successful" });
  } catch (error) {
    console.error("Error in forgotPassword controller:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// http://localhost:5001/api/Users/getAllUser
const getAllUser = asyncHandler(async (req, res) => {
  const user = await User.find({}, { password: 0 }); // in find method we use empty curly brackets as a first argument for filtering purposes and second argument password contains contains 0 which signifies that user will not see password

  res.status(200).json({ user });
});

// http://localhost:5001/api/Users/deleteUser/:id
const deleteUser = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const deletedUser = await User.findOneAndDelete({ _id: id });

  if (deletedUser) {
    return res.status(200).json({
      success: true,
      message: "User deleted.",
    });
  } else {
    return res.status(400).json({
      success: false,
      error: "User not Found.",
    });
  }
});

// http://localhost:5001/api/Users/updateUser/:id
const getUserandUpdate = asyncHandler(async (req, res) => {
  const { id } = req.params;

  try {
    const user = await User.findById({ _id: id });

    if (user) {
      const { username, email, mobileNumber, className } = req.body;

      user.username = username;
      user.email = email;
      user.mobileNumber = mobileNumber;
      user.className = className;

      await user.save();

      return res.json({
        success: true,
        message: "User record updated successfully",
      });
    } else {
      return res.json({ success: false, message: "user not found" });
    }
  } catch (err) {
    console.error(err);
    return res.status(500).json({ success: false, message: err.message });
  }
});

// http://localhost:5001/api/Users/getUser/:id
const getUser = asyncHandler(async (req, res) => {
  const { id } = req.params;

  if (!id) {
    return res.json({ success: false, message: "User not found" });
  } else {
    const user = await User.findById(id);

    if (user) {
      const { password, __v, ...data } = user._doc;

      return res.status(200).json({ success: true, User: data });
    } else {
      return res.status(404).json({
        success: false,
        error: "User Not Found.",
      });
    }
  }
});

const getUserbyEmail = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
try {
  

  if (!email ) {
    return res.json({ success: false, message: "email not found" });
  }
  else if ( !password ) {
    return res.json({ success: false, message: " password not found" });
  } else {
    const user = await User.findOne({ email, password });

    if (user) {
      const { password, __v, ...data } = user._doc;

      return res.status(200).json({ success: true, User: data });
    } 
  }}
  catch (error) {
  console.log(error);
  }
});

module.exports = {
  makeAdmin,
  loginUser,
  registerUser,
  forgotPassword,
  getUser,
  getUserandUpdate,
  deleteUser,
  getAllUser,
  getUserbyEmail,
};
