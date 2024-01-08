import connectMongoDB from "@/lib/connectMongoDB";
import {Faculty, University} from "@/lib/models";
import {NextResponse} from "next/server";
import {lower} from "@/lib/utils/helper";

export async function POST(request: Request) {
    const res = await request.json();
    await lower(res, 'universityId');

    await connectMongoDB();

    // check if faculty exists
    const isExist = await Faculty.findOne({name: res.name}).select("_id");
    if (isExist) {
        return NextResponse.json({message: "Faculty already exists!"});
    }

    // create faculty to database
    const faculty = await Faculty.create(res);

    // add faculty to university document
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
        const data = await Faculty.find({universityId});
        return NextResponse.json(data);
    }
    const data = await Faculty.find({});
    return NextResponse.json(data);
}