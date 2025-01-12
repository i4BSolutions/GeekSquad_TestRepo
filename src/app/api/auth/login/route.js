import { login
 } from "@/app/auth/auth"; 
import { NextResponse } from "next/server";
import db from "@/app/utils/db";
import { verifySession } from "../../../auth/session";

export async function POST(req, res) {
    return await login(req, res);
}



export async function GET(req) {
  try {
    const token = req.cookies.get("token");
      console.log("Retrieved Token:", token);
    if (!token) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const decoded = await verifySession(token.value);
    if (!decoded) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    console.log("Decoded Token: ", decoded);
   
    const rows = await db("SELECT * FROM User WHERE UserId = ?", [
      decoded.userId,
    ]);

    if (!rows || rows.length === 0) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    const user = rows[0];
    return NextResponse.json({
      id: user.UserId,
      name: user.UserName,
      email: user.UserEmail,
    });
  } catch (error) {
    console.error("Error fetching user:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
