import connectMongoDB from "@/lib/mongo";
import {NextResponse} from "next/server";
import {Student} from "@/lib/models";

export async function POST(request: Request) {
    const res = await request.json();
    await connectMongoDB();
    await Student.create(res);
    return NextResponse.json(res);
}