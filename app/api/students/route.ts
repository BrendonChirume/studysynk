import connectMongoDB from "@/lib/connectMongoDB";
import {NextResponse} from "next/server";
import {Student} from "@/lib/models";

export async function POST(request: Request) {
    const res = await request.json();
    await connectMongoDB();
    let student = await Student.findOne({email: res.email});

    student.bio = res.bio;
    student.university = res.university;
    student.faculty = res.faculty;
    student.department = res.department;
    student.program = res.program;
    student.save();

    return NextResponse.json({message: "Profile updated successfully!"});
}

export async function GET(request: Request) {
    const res = await request.json();
    console.log(res);
    return NextResponse.json({message: "Sign up successful!"});
}