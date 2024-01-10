import {NextResponse} from "next/server";
import bcrypt from "bcrypt";
import connectMongoDB from "@/lib/connectMongoDB";
import {Student} from "@/lib/models";

export async function POST(request: Request) {
    let {password, email, ...rest} = await request.json();
    await connectMongoDB();
    const student = await Student.findOne({email}).select("_id");

    if (student) {
        return NextResponse.json({message: "Account already exists!"});
    }

    password = await bcrypt.hash(password, 10);
    await Student.create({password, email, ...rest});
    return NextResponse.json({message: "Sign up successful!"});
}

