import { NextResponse } from 'next/server';
import db from '../utils/db';
import jwt from 'jsonwebtoken';

const JWT_SECRET= "mysecret";

//create session
export async function createSession(user) {
 
const token = jwt.sign(
  { userId: user.UserId, email: user.UserEmail },
  process.env.JWT_SECRET,
  { expiresIn: "1d" }
);
console.log("Token: ", token);
 
}



//verify session
export async function verifySession(token) {
  if (!token || token === "null") {
    
    return null;}
  try {
    const decoded =jwt.verify(token, JWT_SECRET);
    return decoded;
  } catch (error) {
    console.error("JWT verification failed:", error.message);
    return null;
  }
}

//destroy session
export async function destroySession(req) {
    const response = NextResponse.json({ message: "Session destroyed" });
    response.unsetCookie("token");

    return response;
}