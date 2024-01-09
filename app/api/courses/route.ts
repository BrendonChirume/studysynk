import {NextResponse} from "next/server";
import connectMongoDB from "@/lib/connectMongoDB";
import {Course, Program} from "@/lib/models";
import {lower} from "@/lib/utils/helper";
import {ICourse} from "@/lib/types";

export async function POST(request: Request) {
    const res = await request.json();
    await lower(res, 'id');

    await connectMongoDB();
    const isExist = await Course.findOne({name: res.name}).select("_id");
    if (isExist) {
        return NextResponse.json({message: "Course already exists!"});
    }
    const course = await Course.create(res);

    (res.programs as ICourse['programs']).map(async (p) => {
        const program = await Program.findById(p.programId);

        program.programs.push(course.id);
        await program.save();
    })

    return NextResponse.json({message: "Course created successfully!"});
}

export async function GET() {
    await connectMongoDB();

    const data = await Course.find({});
    return NextResponse.json(data);
}