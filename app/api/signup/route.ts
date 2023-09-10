import bcrypt from 'bcrypt';
import {prisma} from "@/lib/prisma";
import {NextResponse} from "next/server";

export async function POST(request: Request) {
    const data = await request.json();
    const {email, password, firstName, lastName} = JSON.parse(data.body);

    const exists = await prisma.student.findUnique({
        where: {
            email
        }
    });

    if (exists) {
        return NextResponse.json({error: "Student already exists"}, {status: 400});
    }

    let hashPassword = await bcrypt.hash(password, 10);

    const student = await prisma.student.create({
        data: {
            firstName, lastName, email,
            password: hashPassword
        }
    })
    return NextResponse.json(student);
}