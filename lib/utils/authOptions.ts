import CredentialsProvider from "next-auth/providers/credentials";
import {NextAuthOptions} from "next-auth";
import bcrypt from "bcrypt";


const authOptions: NextAuthOptions = {
    session: {
        strategy: "jwt",
        maxAge: 60 * 60, // 1 hour
    },
    pages: {
        signIn: '/signin'
    },
    providers: [
        CredentialsProvider({
            name: "StudySynk",
            type: "credentials",
            credentials: {
                email: {label: "Username", type: "email"},
                password: {label: "Password", type: "password"}
            },
            authorize: async (credentials) => {
                if (!credentials || !credentials.email || !credentials.password) {
                    return null
                }

                const student = {
                    id: "1",
                    firstName: "John",
                    email: "",
                    password: "123"
                }

                if (!student) {
                    return null;
                }

                // check if the password is correct
                const isMatch = await bcrypt.compare(credentials.password, student.password);

                if (!isMatch) {
                    return null;
                }
                return student;
            }
        }),
    ],
    secret: process.env.NEXTAUTH_SECRET,
    debug: process.env.NODE_ENV === "development",
}

export default authOptions