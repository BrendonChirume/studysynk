import connectMongoDB from "@/lib/connectMongoDB";
import {NextResponse} from "next/server";
import {Department, Faculty} from "@/lib/models";
import {lower} from "@/lib/utils/helper";

export async function POST(request: Request) {
    const res = await request.json();
    await lower(res, 'id');

    await connectMongoDB();

    // check if faculty exists
    const isExist = await Department.findOne({name: res.name}).select("_id");
    if (isExist) {
        return NextResponse.json({message: "Department already exists!"});
    }

    // create Department to database
    const department = await Department.create(res);

    // add Department to Faculty document
    const faculty = await Faculty.findById(res.faculty.id);

    faculty.departments.push(department.id);
    await faculty.save();

    return NextResponse.json({message: "Department created successfully!"});

}

export async function GET(request: Request) {
    const {searchParams} = new URL(request.url)
    const facultyId = searchParams.get('facultyId');
    await connectMongoDB();
    if (facultyId) {
        const data = await Department.find({'faculty.id': facultyId});
        return NextResponse.json(data);
    } else {
        const data = await Department.find({});
        return NextResponse.json(data);
    }
}