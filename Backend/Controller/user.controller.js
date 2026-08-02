import User from "../Model/user.model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export async function register(req, res) {
  try {
    const { username, email, password } = req.body;

    //Check if the user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Email is already in use." });
    }

    // Hash the password 
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    //Create the user 
    const user = new User({
      username, 
      email,
      password: hashedPassword
    });

    //Save to the database
    await user.save();

    //Send a successful response
    res.status(201).json({ message: "User registered successfully!" });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
}
export function login(req,res){

}