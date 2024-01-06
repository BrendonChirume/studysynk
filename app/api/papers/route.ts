import {NextResponse} from "next/server";
import connectMongoDB from "@/lib/connectMongoDB";
import {Paper} from "@/lib/models";

export async function GET(request: Request) {
    let data;
    const {searchParams} = new URL(request.url)
    const id = searchParams.get('id');
    await connectMongoDB();
    if (id) {
        data = await Paper.findOne({id});
        return NextResponse.json(data);
    }
    data = await Paper.find();
    return NextResponse.json(data);

}

export async function POST(request: Request) {
    const res = await request.json();
    await connectMongoDB();
    await Paper.create(res);
    return NextResponse.json({message: 'Paper submitted for verification!'});
}