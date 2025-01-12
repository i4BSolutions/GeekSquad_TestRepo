import { NextResponse } from 'next/server';
import db from '../utils/db';
import jwt from 'jsonwebtoken';
import { SignJWT, jwtVerify } from 'jose';

export async function encrypt(payload) {
  return new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("1hr")
    .sign(key);
}

export async function decrypt(session) {
  try {
    const { payload } = await jwtVerify(session, key, {
      algorithms: ["HS256"],
    });
    return payload;
  } catch (error) {
    console.log("Failed to verify session");
    return null;
  }
}
//create session
export async function createSession(user) {
 
const token = jwt.sign(
  { userId: user.UserId, email: user.UserEmail },
  process.env.JWT_SECRET,
  { expiresIn: "1d" }
);
console.log("Token: ", token);
  // Update the UserToken for the specified UserId
  await db("UPDATE User SET UserToken = ? WHERE UserId = ?", [token, user.UserId]);
    return token;

}



//verify session
export async function verifySession(token) {
  if (!token || token === "null") {
    
    return null;}
  try {
    const decoded =jwt.verify(token, process.env.JWT_SECRET);
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