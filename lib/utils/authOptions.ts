import CredentialsProvider from "next-auth/providers/credentials";
import {NextAuthOptions} from "next-auth";
import bcrypt from "bcrypt";
import {Student} from "@/lib/models";
import {MongoDBAdapter} from "@auth/mongodb-adapter";
import clientPromise from "@/lib/clientPromise";


const authOptions: NextAuthOptions = {
    adapter: MongoDBAdapter(clientPromise),
    pages: {
        signIn: '/signin',
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

                const user = await Student.findOne({email})
                if (!user) {
                    return null;
                }

                // check if the password is correct
                const isMatch = await bcrypt.compare(password, user.password);

                if (!isMatch) {
                    return null;
                }

                return user;
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