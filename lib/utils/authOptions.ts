import CredentialsProvider from "next-auth/providers/credentials";
import {NextAuthOptions} from "next-auth";
import bcrypt from "bcrypt";
import {Student} from "@/lib/models";


const authOptions: NextAuthOptions = {
    debug: process.env.NODE_ENV === "development",
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

                const student = await Student.findOne({email})
                if (!student) {
                    return null;
                }

                // check if the password is correct
                const isMatch = await bcrypt.compare(password, student.password);

                if (!isMatch) {
                    return null;
                }

                return student;
            }
        }),
    ],
    secret: process.env.NEXTAUTH_SECRET,
    session: {
        strategy: "jwt",
        maxAge: 60 * 60, // 1 hour
    },
}

export default authOptions