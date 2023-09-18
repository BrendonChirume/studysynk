import connectMongoDB from "@/lib/mongo";
import {University} from "@/lib/models";
import {NextResponse} from "next/server";

export async function POST(request: Request) {
    const res = await request.json();
    await connectMongoDB();
    await University.create(res);
    return NextResponse.json(res);
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