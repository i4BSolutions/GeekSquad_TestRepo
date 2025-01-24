import { NextResponse , NextRequest } from "next/server";



//Database Connection
import supabase from "../../../utils/supabase"

export async function PUT(req,res){
  const body = await req.json();
  const { fullName, phoneNumber, address } = body;

  console.log("Received Data:", body);


  // Validation

  if (phoneNumber && !/^\d{6,}$/.test(phoneNumber)) {
    return NextResponse.json(
        { error: "Invalid phone number." },
        { status: 400 });
    
  }
  if (address && address.length > 200) {
    return NextResponse.json({
        error: "Address must be less than 200 characters"
    }, { status:400 });
   
  }


    // Update profile in database
           const {data,error}  = await supabase.from("Users").upsert({
             Name: fullName,
             PhoneNumber: phoneNumber,
            Address: address,
           });
          

           console.log("Updated Profile into database:", data);
              if (error) {
                console.error("Error updating profile in Database:", error);
                return NextResponse.json(
                  { error: "Unable to save changes. Please try again later" },
                  { status: 500 }
                );
            }
           return NextResponse.json({ message: "Profile updated successfully" },{ status: 200 });
    
 
   

}