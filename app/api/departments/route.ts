import connectMongoDB from "@/lib/connectMongoDB";
import {NextResponse} from "next/server";
import {Department, Faculty} from "@/lib/models";
import {lower} from "@/lib/utils/helper";

export async function POST(request: Request) {

    const {facId, ...rest} = await request.json();

    await connectMongoDB();

    const isExist = await Department.findOne({name: rest.name}).select("_id");
    if (isExist) {
        return NextResponse.json({message: "Department already exists!"});
    }
    await lower(rest);
    const department = await Department.create(rest);
    const addFaculty = await Faculty.findById(facId);

    addFaculty.departments.push(department.id);
    await addFaculty.save();

    return NextResponse.json({message: "Department created successfully!"});

}

export async function GET(request: Request) {
    const {searchParams} = new URL(request.url)
    const faculty = searchParams.get('faculty');
    await connectMongoDB();
    if (faculty) {
        const data = await Department.find({faculty});
        return NextResponse.json(data);
    } else {
        const data = await Department.find({});
        return NextResponse.json(data);
    }
}