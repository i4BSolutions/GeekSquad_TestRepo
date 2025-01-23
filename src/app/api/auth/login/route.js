import { login
 } from "@/app/auth/auth"; 
import { NextResponse } from "next/server";

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
     console.log("Decoded Token: ", decoded);
    if (!decoded) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
   

  
    return NextResponse.json({
      email: decoded.email,
    });
  } catch (error) {
    console.error("Error fetching user:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
