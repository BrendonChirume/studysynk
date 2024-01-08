import connectMongoDB from "@/lib/connectMongoDB";
import {Faculty, University} from "@/lib/models";
import {NextResponse} from "next/server";
import {lower} from "@/lib/utils/helper";

export async function POST(request: Request) {
    const res = await request.json();
    await lower(res, 'id');

    await connectMongoDB();

    // check if Faculty exists
    const isExist = await Faculty.findOne({name: res.name}).select("_id");
    if (isExist) {
        return NextResponse.json({message: "Faculty already exists!"});
    }

    // create Faculty to database
    const faculty = await Faculty.create(res);

    // add Faculty to University document
    const university = await University.findById(res.university.id);

    university.faculties.push(faculty.id);
    await university.save();

    return NextResponse.json({message: "Faculty created successfully!"});
}

export async function GET(request: Request) {
    const {searchParams} = new URL(request.url)
    const universityId = searchParams.get('universityId');
    console.log(universityId);
    await connectMongoDB();
    if (universityId) {
        const data = await Faculty.find({'university.id': universityId});
        return NextResponse.json(data);
    }
    const data = await Faculty.find({});
    return NextResponse.json(data);
}