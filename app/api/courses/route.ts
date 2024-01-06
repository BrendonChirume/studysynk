import {NextResponse} from "next/server";
import connectMongoDB from "@/lib/connectMongoDB";
import {Course, Program} from "@/lib/models";

export async function POST(request: Request) {
    const {progId, ...rest} = await request.json();
    await connectMongoDB();

    const isExist = await Course.findOne({name: rest.name}).select("_id");
    if (isExist) {
        return NextResponse.json({message: "Course already exists!"});
    }
    const course = await Course.create(rest);
    const program = await Program.findById(progId);

    program.programs.push(course.id);
    await program.save();

    return NextResponse.json({message: "Course created successfully!"});
}