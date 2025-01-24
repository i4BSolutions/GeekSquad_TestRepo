import { login
 } from "@/app/auth/auth"; 
import { NextResponse } from "next/server";
import supabase from "@/app/utils/supabase";
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
   
      //Query Database to get user data 

  const {data , error} = await supabase
  .from('Users')
  .select('Name,Email,PhoneNumber,Address')
  .eq('Email',decoded.email)
  .single();

  console.log("Data from supabase: ", data);
 if (error) {
   console.error("Error fetching user data:", error.message);
   return NextResponse.json(
     { error: "Failed to fetch user data" },
     { status: 500 }
   );
 }

 if (!data) {
   return NextResponse.json({ error: "User not found" }, { status: 404 });
 }

    return NextResponse.json({
      email: decoded.email,
      fullName: data.Name ,
      email: data.Email,
      phoneNumber: data.PhoneNumber,
      address : data.Address

    });
  } catch (error) {
    console.error("Error fetching user:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
