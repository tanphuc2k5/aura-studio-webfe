import React, { useState } from "react";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useAuth } from "@/context/AuthContext";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const signupSchema = z.object({
  name: z.string().min(2, { message: "Tên phải có ít nhất 2 ký tự" }),
  email: z.string().email({ message: "Email không hợp lệ" }),
  password: z.string().min(8, { message: "Mật khẩu phải có ít nhất 8 ký tự" }),
});

type SignupFormData = z.infer<typeof signupSchema>;

export default function Signup() {
  const { signup } = useAuth();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignupFormData>({
    resolver: zodResolver(signupSchema),
  });

  const onSubmit = async (data: SignupFormData) => {
    setIsLoading(true);
    setError("");
    try {
      const success = await signup(data.name, data.email, data.password);
      if (success) {
        router.push("/checkout");
      } else {
        setError("Đăng ký thất bại. Vui lòng thử lại.");
      }
    } catch (err) {
      setError("Đã có lỗi xảy ra. Vui lòng thử lại.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Head>
        <title>Đăng ký | Aura Studio</title>
      </Head>
      <Header />
      
      <main className="flex-grow flex flex-col md:flex-row-reverse">
        {/* Right: Lifestyle Image */}
        <div className="hidden md:block md:w-1/2 relative h-[calc(100vh-80px)]">
          <img
            src="https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&q=80&w=1000"
            alt="Lifestyle"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/10" />
        </div>

        {/* Left: Signup Form */}
        <div className="w-full md:w-1/2 flex items-center justify-center p-8 md:p-16">
          <div className="max-w-md w-full">
            <h2 className="text-3xl font-bold uppercase tracking-luxury mb-2">Tạo tài khoản</h2>
            <p className="text-aura-gray-dark text-sm mb-12 uppercase tracking-widest">Trở thành một phần của Aura Studio</p>

            {error && <p className="text-red-500 text-xs mb-6 uppercase tracking-wider font-bold">{error}</p>}

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
              <div>
                <label className="block text-[10px] font-bold uppercase tracking-widest text-aura-gray-dark mb-2">Họ và tên</label>
                <input
                  {...register("name")}
                  type="text"
                  className="w-full border-b border-aura-gray-medium py-3 text-sm focus:outline-none focus:border-aura-black transition-colors"
                  placeholder="Nguyễn Văn A"
                />
                {errors.name && <p className="text-red-500 text-[10px] mt-1 uppercase tracking-wider">{errors.name.message}</p>}
              </div>

              <div>
                <label className="block text-[10px] font-bold uppercase tracking-widest text-aura-gray-dark mb-2">Email</label>
                <input
                  {...register("email")}
                  type="email"
                  className="w-full border-b border-aura-gray-medium py-3 text-sm focus:outline-none focus:border-aura-black transition-colors"
                  placeholder="name@email.com"
                />
                {errors.email && <p className="text-red-500 text-[10px] mt-1 uppercase tracking-wider">{errors.email.message}</p>}
              </div>

              <div>
                <label className="block text-[10px] font-bold uppercase tracking-widest text-aura-gray-dark mb-2">Mật khẩu</label>
                <input
                  {...register("password")}
                  type="password"
                  className="w-full border-b border-aura-gray-medium py-3 text-sm focus:outline-none focus:border-aura-black transition-colors"
                  placeholder="••••••••"
                />
                {errors.password && <p className="text-red-500 text-[10px] mt-1 uppercase tracking-wider">{errors.password.message}</p>}
              </div>

              <div className="flex items-center space-x-2">
                <input type="checkbox" required className="w-4 h-4 accent-aura-black" />
                <span className="text-[10px] uppercase tracking-widest text-aura-gray-dark">Tôi đồng ý với các điều khoản dịch vụ</span>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-aura-black text-white py-5 text-xs font-bold uppercase tracking-[0.2em] hover:bg-aura-gray-dark transition-colors duration-300 disabled:opacity-50"
              >
                {isLoading ? "Đang xử lý..." : "Đăng ký ngay"}
              </button>
            </form>

            <div className="mt-12 text-center">
              <p className="text-aura-gray-dark text-xs uppercase tracking-widest mb-4">Đã có tài khoản?</p>
              <Link href="/auth/signin" className="text-sm font-bold uppercase tracking-[0.1em] border-b-2 border-aura-black pb-1">
                Đăng nhập ngay
              </Link>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
