import {NextResponse} from "next/server";
import {Paper} from "@/lib/models";
import connectMongoDB from "@/lib/connectMongoDB";

export async function GET(request: Request) {
    const {searchParams} = new URL(request.url)
    const id = searchParams.get('id');
    await connectMongoDB();
    const data = await Paper.findOne({id});
    return NextResponse.json(data);
}

export async function POST(request: Request) {
    const res = await request.json();
    await connectMongoDB();
    await Paper.create(res);
    return NextResponse.json(res);
}