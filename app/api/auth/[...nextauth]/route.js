import NextAuth from "next-auth";
import CredentialsProvider from 'next-auth/providers/credentials';
import { connectDB } from "@/lib/database";
import Users from "@/models/user";
import bcrypt from "bcryptjs/dist/bcrypt";

const authOption = {
    providers: [
        CredentialsProvider({
            name: 'credentials',
            credentials: {},
            async authorize(credentials, req){
                const { email,password } = credentials;

                try{
                    await connectDB();
                    const user = await Users.findOne({ email });

                    if(!user){
                        return null;
                    }

                    const passwordMatch = await bcrypt.compare(password,user.password);

                    if(!passwordMatch){
                        return null;
                    }

                    return user;

                }catch(err){
                    console.log(err)
                }
            }
        })
    ],
    session: {
        strategy: "jwt",
    },
    secret: process.env.NEXTAUTH_SECRET,
    page:{
        signIn: "/login"
    }
}

const handler = NextAuth(authOption);
export { handler as GET, handler as POST };