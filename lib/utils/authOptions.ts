import CredentialsProvider from "next-auth/providers/credentials";
import {NextAuthOptions} from "next-auth";
import bcrypt from "bcrypt";
import {Student} from "@/lib/models";
import connectMongoDB from "@/lib/connectMongoDB";
import {IStudent} from "@/lib/types";


const authOptions: NextAuthOptions = {
    pages: {
        signIn: '/signin'
    },
    providers: [
        CredentialsProvider({
            name: "credentials",
            type: "credentials",
            credentials: {
                email: {label: "Username", type: "email"},
                password: {label: "Password", type: "password"}
            },
            authorize: async (credentials) => {
                if (!credentials || !credentials.email || !credentials.password) {
                    return null
                }
                const {email, password} = credentials;
                await connectMongoDB();
                const student = await Student.findOne({email});
                if (!student) {
                    return null;
                }

                // check if the password is correct
                const isMatch = await bcrypt.compare(password, student.password);

                if (!isMatch) {
                    return null;
                }

                return student;
            },
        }),
    ],
    secret: process.env.NEXTAUTH_SECRET,
    session: {
        strategy: "jwt",
        maxAge: 60 * 60, // 1 hour
    },
    callbacks: {
        async session({session}) {
            await connectMongoDB();
            const student = await Student.findOne({email: session.user?.email}) as IStudent & {
                checkStreak: () => Promise<void>
            };

            if (student) {
                try {
                    await student.checkStreak();
                } catch (error) {
                    console.error('Error checking login streak:', error);
                }
                session.user = {
                    ...session.user,
                    streak: student.streak,
                    university: student.university,
                    program: student.program,
                    department: student.department,
                };
            }

            return session
        }
    }
}

export default authOptions