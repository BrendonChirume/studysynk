import {prisma} from "@/lib/prisma";
import {NextResponse} from "next/server";
import {NextApiRequest} from "next";

export async function GET() {
    const papers = await prisma.collage.findMany();
    return NextResponse.json(papers)
}

export async function POST(request: NextApiRequest) {
    const data = await request.body.json();
    const paper = await prisma.paper.create({data})
    return NextResponse.redirect(`/papers/${paper.id}`)
}