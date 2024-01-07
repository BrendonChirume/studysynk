import connectMongoDB from "@/lib/connectMongoDB";
import {Department, Program} from "@/lib/models";
import {NextResponse} from "next/server";
import {lower} from "@/lib/utils/helper";

export async function POST(request: Request) {
    const {deptId, ...rest} = await request.json();

    await connectMongoDB();

    const isExist = await Program.findOne({name: rest.name}).select("_id");
    if (isExist) {
        return NextResponse.json({message: "Program already exists!"});
    }
    await lower(rest);
    const program = await Program.create(rest);
    const department = await Department.findById(deptId)

    department.programs.push(program.id);
    await department.save();

    return NextResponse.json({message: "Program created successfully!"});
}

export async function GET(request: Request) {
    const {searchParams} = new URL(request.url)
    const program = searchParams.get('program');
    await connectMongoDB();
    if (program) {
        const data = await Program.find({program});
        return NextResponse.json(data);
    }
    const data = await Program.find({});
    return NextResponse.json(data);
}