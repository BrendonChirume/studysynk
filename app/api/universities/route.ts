import connectMongoDB from "@/lib/connectMongoDB";
import {University} from "@/lib/models";
import {NextResponse} from "next/server";
import {lower} from "@/lib/utils/helper";

export async function POST(request: Request) {
    const res = await request.json();
    await connectMongoDB();

    const isExist = await University.findOne({name: res.name}).select("_id");
    if (isExist) {
        return NextResponse.json({message: "University already exists!"});
    }
    await lower(res);
    await University.create(res);
    return NextResponse.json({message: "University created successfully!"});
}

export async function GET(request: Request) {
    const {searchParams} = new URL(request.url)
    const id = searchParams.get('id');
    await connectMongoDB();
    if (id) {
        const data = await University.findOne({id: id as string});
        return NextResponse.json(data);
    } else {
        const data = await University.find({});
        return NextResponse.json(data);
    }
}