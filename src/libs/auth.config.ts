import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";

import connectDB from "@/utils/connectDB";
import User from "@/models/User";

import { verifyPassword } from "@/utils/auth";



export const { handlers, auth, signIn, signOut } = NextAuth({
    session:{
      strategy:"jwt"
    },
    
    providers: [Credentials({
        credentials: {
            email: { label: "email", type: "email" },
            password: { label: "password", type: "password" }
        },
        authorize: async (credentials) => {
          
                // Type narrowing
                if (
                    typeof credentials?.email !== "string" ||
                    typeof credentials?.password !== "string"
                ) {
                    throw new Error("لطفا ایمیل یا رمز عبور معتبر وارد کنید");
                }

                if (!credentials.email || !credentials.password) {
                    throw new Error("لطفا رمز عبور یا ایمیل معتبر وارد کنید")
                }

                await connectDB();

                const user = await User.findOne({ email: credentials.email });
                if (!user) {
                    throw new Error('حساب کاربری یافت نشد. لطفا ثبت نام کنید');
                }

                const isValid = await verifyPassword(
                    credentials.password,
                    user.password
                );

                if (!isValid) {
                    throw new Error('ایمیل یا رمز عبور اشتباه است');
                }

                return {
                    id: user._id,
                    email: user.email
                }

            
        }
    })]
})