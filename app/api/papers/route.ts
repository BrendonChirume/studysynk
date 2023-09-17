import {NextResponse} from "next/server";
import connectMongoDB from "@/lib/mongo";
import {Paper} from "@/lib/models";

export async function GET(request: Request) {
    const {searchParams} = new URL(request.url)
    const id = searchParams.get('id');
    await connectMongoDB();
    const data = await Paper.findOne({id});
    return NextResponse.json(data);
}

export async function POST(response: Response, request: Request) {
    const res = await request.json();
    await connectMongoDB();
    await Paper.create(res);
    return NextResponse.json(res);
}