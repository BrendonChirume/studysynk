import {NextResponse} from "next/server";
import {NextApiRequest} from "next";
import connectMongoDB from "@/lib/mongo";
import {Paper} from "@/lib/models";

export async function GET(request: Request) {
    const {searchParams} = new URL(request.url)
    const id = searchParams.get('id');
    await connectMongoDB();
    const data = await Paper.findOne({id});
    return NextResponse.json(data);
}

export async function POST(request: NextApiRequest) {
    const res = await request.body;
    await connectMongoDB();
    await Paper.create(res);
    return NextResponse.json(res);
}