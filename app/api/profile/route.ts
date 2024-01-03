import {NextResponse} from "next/server";
import connectMongoDB from "@/lib/connectMongoDB";
import {Student} from "@/lib/models";
import mongoose from "mongoose";

export async function POST(request: Request) {
    const {email, ...rest} = await request.json();
    console.log(email, rest)
    // try {
    //     await connectMongoDB();
    //     const student = await Student.findOneAndUpdate({email}, {rest})
    //     return NextResponse.json(JSON.stringify(student));
    // } catch (error) {
    //     if(error instanceof mongoose.Error.ValidationError){
    //
    //     }
    //     console.log(error)
    // }

}