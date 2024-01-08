import connectMongoDB from "@/lib/connectMongoDB";
import {Department, Program} from "@/lib/models";
import {NextResponse} from "next/server";
import {lower} from "@/lib/utils/helper";

export async function POST(request: Request) {
    const res = await request.json();
    await lower(res, 'departmentId');

    await connectMongoDB();

    // check if Program exists
    const isExist = await Program.findOne({name: res.name}).select("_id");
    if (isExist) {
        return NextResponse.json({message: "Program already exists!"});
    }

    // create Program to database
    const program = await Program.create(res);

    // add Program to Department document
    const department = await Department.findById(res.department.id)

    department.programs.push(program.id);
    await department.save();

    return NextResponse.json({message: "Program created successfully!"});
}

export async function GET(request: Request) {
    const {searchParams} = new URL(request.url)
    const departmentId = searchParams.get('departmentId');
    await connectMongoDB();
    if (departmentId) {
        const data = await Program.find({'department.id': departmentId});
        return NextResponse.json(data);
    }
    const data = await Program.find({});
    return NextResponse.json(data);
}