import connectMongoDB from "@/lib/connectMongoDB";
import {NextResponse} from "next/server";
import {Student} from "@/lib/models";

export async function POST(request: Request) {
    const res = await request.json();
    await connectMongoDB();
    const student = await Student.findOne({email: res.email});

    student.university = res.university;
    student.save();

    return NextResponse.json({message: "Profile updated successfully!"});
}