
import { NextRequest, NextResponse } from "next/server"
import { UserModel } from "@/utils/models/userModel"
import { User } from "@/utils/types/user"
import { dbConnect } from "@/utils/db"
 
export async function POST(request: NextRequest) {
 await dbConnect() // Connect to the MongoDB database
 
 try {
   const { name, email, age }: User = await request.json() // Parse JSON from the request body
 
   // Validate the request body
   if (!name || !email || !age) {
     return NextResponse.json(
       { message: "Invalid request body" },
       { status: 400 }
     )
   }
 
   // Create a new user using the UserModel
   const newUser = await UserModel.create({ name, email, age })
 
   return NextResponse.json(
     { message: "User created successfully", user: newUser },
     { status: 201 }
   )
 } catch (error) {
   console.error(error)
   return NextResponse.json({ message: "Error", error }, { status: 500 })
 }
}
 