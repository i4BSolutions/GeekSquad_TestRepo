import { NextResponse, NextRequest } from "next/server";

//Database Connection
import supabase from "@/app/utils/supabaseClient";

export async function PUT(req, res) {
  const body = await req.json();
  const { fullName, phoneNumber, address } = body.validatedData;
  // Extract email from the query parameters
  const { searchParams } = new URL(req.url);
  const email = searchParams.get("email");
 
  if (!email) {
    return new Response(JSON.stringify({ error: "Email is required" }), {
      status: 400,
    });
  }

  // Validation

  if (phoneNumber && !/^\d{6,}$/.test(phoneNumber)) {
    return NextResponse.json(
      { error: "Invalid phone number." },
      { status: 400 }
    );
  }
  if (address && address.length > 200) {
    return NextResponse.json(
      {
        error: "Address must be less than 200 characters",
      },
      { status: 400 }
    );
  }
  // Check if the email exists in the database first
  const { data: existingUser, error: findError } = await supabase
    .from("Users")
    .select("*")
    .eq("Email", email.trim())
    .single();

  //console.log("Existing User: ", existingUser);
  if (findError || !existingUser) {
    console.error("No user found with this email:", email);
    return NextResponse.json({ error: "User not found." }, { status: 404 });
  }

  // Proceed with the update
  const { data, error } = await supabase
    .from("Users")
    .update({
      Name: fullName,
      PhoneNumber: phoneNumber,
      Address: address,
    })
    .eq("Email", email.trim());

  if (error) {
    console.error("Error updating profile in Database:", error);
    return NextResponse.json(
      { error: "Unable to save changes. Please try again later." },
      { status: 500 }
    );
  }

  console.log("Updated User Data:", data);

  return NextResponse.json(
    { message: "Profile updated successfully." },
    { status: 200 }
  );
}
