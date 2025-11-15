import { NextResponse } from "next/server";

import connectDB from "@/utils/connectDB";
import User from "@/models/User";

import { hashPassword } from "@/utils/auth";

export async function POST(req: Request) {
    try {
        // اتصال به دیتا بیس
        await connectDB();
        //  گرفتن اطلاعت از فرانت  
        const { email, password } = await req.json();
        
        // اعتبار سنجی
        if (!email || !password) {
            return NextResponse.json(
                { message: "لطفا اطلاعات معتبر وارد کنید" },
                { status: 422 }
            )
        };

        // چک کنه این ایمیل در دیتا بیس وجود داره
        const user = await User.findOne({ email });
        if (user) {
            return NextResponse.json(
                { error: 'این حساب کاربری وجود دارد' },
                { status: 422 }
            );
        };

        // هش کردن پسورد

        const hashedPassword = await hashPassword(password);
        
        // ساخت یوزر جدید
        const newUser = await User.create({
            email,
            password: hashedPassword
        });
        // لاگ یوزر جدید
        console.log(newUser);
        return NextResponse.json(
            { message: 'حساب کاربری ایجاد شد' },
            { status: 201 }
        );
     
        // هندل کردن ارور
    } catch (error: unknown) {

        console.log(error)
        return NextResponse.json(
            { error: 'مشکلی در سرور رخ داده است' },
            {
                status: 500,
            }
        );
    }
}


