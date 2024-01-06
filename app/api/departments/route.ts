import connectMongoDB from "@/lib/connectMongoDB";
import {NextResponse} from "next/server";
import {Department, Faculty} from "@/lib/models";

export async function POST(request: Request) {

    const {facId, ...rest} = await request.json();

    await connectMongoDB();

    const isExist = await Department.findOne({name: rest.name}).select("_id");
    if (isExist) {
        return NextResponse.json({message: "Department already exists!"});
    }
    const department = await Department.create(rest);
    const addFaculty = await Faculty.findById(facId);

    addFaculty.departments.push(department.id);
    await addFaculty.save();

    return NextResponse.json({message: "Department created successfully!"});

}

export async function GET(request: Request) {
    const {searchParams} = new URL(request.url)
    const department = searchParams.get('department');
    await connectMongoDB();
    if (department) {
        const data = await Department.find({department});
        return NextResponse.json(data);
    } else {
        const data = await Department.find({});
        return NextResponse.json(data);
    }
}