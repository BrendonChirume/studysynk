import connectMongoDB from "@/lib/connectMongoDB";
import {Faculty, University} from "@/lib/models";
import {NextResponse} from "next/server";
import {lower} from "@/lib/utils/helper";

export async function POST(request: Request) {
    const {uniId, ...rest} = await request.json();
    await connectMongoDB();

    const isExist = await Faculty.findOne({name: rest.name}).select("_id");
    if (isExist) {
        return NextResponse.json({message: "Faculty already exists!"});
    }
    await lower(rest);
    const faculty = await Faculty.create(rest);
    const doc = await University.findById(uniId);

    doc.faculties.push(faculty.id);
    await doc.save();

    return NextResponse.json({message: "Faculty created successfully!"});
}

export async function GET(request: Request) {
    const {searchParams} = new URL(request.url)
    const university = searchParams.get('university');
    await connectMongoDB();
    if (university) {
        const data = await Faculty.find({university});
        return NextResponse.json(data);
    }
    const data = await Faculty.find({});
    return NextResponse.json(data);
}