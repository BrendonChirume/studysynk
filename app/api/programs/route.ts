import {Program} from "@/lib/models";
import {NextResponse} from "next/server";
import connectMongoDB from "@/lib/connectMongoDB";

export async function POST(request: Request) {
    const res = await request.json();
    await connectMongoDB();
    await Program.create(res);
    return NextResponse.json(res);
}

export async function GET(request: Request) {
    const {searchParams} = new URL(request.url)
    const id = searchParams.get('id');
    await connectMongoDB();
    const data = await Program.findOne({id: id as string});
    return NextResponse.json(data);
}