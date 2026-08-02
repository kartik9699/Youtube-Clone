import jwt from "jsonwebtoken";

export function verifyToken(req, res, next) {
  try {
    // 1. Get the Authorization header from the incoming request
    const authHeader = req.headers.authorization;

    //Check if the header exists
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ message: "Access denied. No token provided." });
    }

    //Extract the actual token string
    const token = authHeader.split(" ")[1];

    //Verify the token using your secret key
    const decoded = jwt.verify(token, process.env.JWT_SECRET);


    // This makes the user's ID available to any route that uses this middleware
    req.user = decoded;

    //Move to the actual route controller
    next();
    
  } catch (error) {
    // If the token is fake throws an error
    res.status(403).json({ message: "Invalid or expired token." });
  }
}