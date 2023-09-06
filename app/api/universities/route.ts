import {prisma} from "@/lib/prisma";
import {NextResponse} from "next/server";
import {NextApiRequest} from "next";

async function main() {
    try {
        await prisma.$connect();
    } catch (error) {
        return Error("Database connection unsuccessful")
    }
}

export async function GET() {
    try {
        await main();
        const papers = await prisma.university.findMany();
        return NextResponse.json(papers, {status: 200});
    } catch (error) {
        return NextResponse.json({message: "Error", error}, {status: 500});
    } finally {
        prisma.$disconnect();
    }
}