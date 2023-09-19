import connectMongoDB from "@/lib/connectMongoDB";
import {Faculty} from "@/lib/models";
import {NextResponse} from "next/server";

export async function POST(request: Request) {
    const res = await request.json();
    await connectMongoDB();
    await Faculty.create(res);
    return NextResponse.json(res);
}

export async function GET(request: Request) {
    const {searchParams} = new URL(request.url)
    const id = searchParams.get('id');
    await connectMongoDB();
    const data = await Faculty.findOne({id: id as string});
    return NextResponse.json(data);
}