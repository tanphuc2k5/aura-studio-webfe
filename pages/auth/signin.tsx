import React, { useState } from "react";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useAuth } from "@/context/AuthContext";
import { signIn, getSession } from "next-auth/react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import toast from "react-hot-toast";

const loginSchema = z.object({
  email: z.string().refine((val) => val === "admin" || z.string().email().safeParse(val).success, {
    message: "Email hoặc tên đăng nhập không hợp lệ",
  }),
  password: z.string().min(8, { message: "Mật khẩu phải có ít nhất 8 ký tự" }),
});

type LoginFormData = z.infer<typeof loginSchema>;

export default function Signin() {
  const { login } = useAuth();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginFormData) => {
    setIsLoading(true);
    setError("");
    try {
      const result = await signIn("credentials", {
        username: data.email, // Mapping email field to username for credentials provider
        password: data.password,
        redirect: false,
      });

      if (result?.error) {
        setError("Đăng nhập thất bại. Vui lòng kiểm tra lại thông tin.");
        toast.error("Đăng nhập thất bại. Vui lòng kiểm tra lại thông tin.");
      } else {
        const session = await getSession();
        if (session?.user?.role === "admin") {
          toast.success("Đăng nhập thành công! Chào mừng Admin.");
          router.push("/admin");
        } else {
          toast.success("Đăng nhập thành công!");
          router.push("/");
        }
      }
    } catch (err) {
      setError("Đã có lỗi xảy ra. Vui lòng thử lại.");
      toast.error("Đã có lỗi xảy ra. Vui lòng thử lại.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Head>
        <title>Đăng nhập | Aura Studio</title>
      </Head>
      <Header />
      
      <main className="flex-grow flex flex-col md:flex-row">
        {/* Left: Lifestyle Image */}
        <div className="hidden md:block md:w-1/2 relative h-[calc(100vh-80px)]">
          <img
            src="https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?auto=format&fit=crop&q=80&w=1000"
            alt="Lifestyle"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/10" />
        </div>

        {/* Right: Signin Form */}
        <div className="w-full md:w-1/2 flex items-center justify-center p-8 md:p-16">
          <div className="max-w-md w-full">
            <h2 className="text-3xl font-bold uppercase tracking-luxury mb-2">Chào mừng trở lại</h2>
            <p className="text-aura-gray-dark text-sm mb-12 uppercase tracking-widest">Nhập thông tin của bạn để tiếp tục</p>

            {error && <p className="text-red-500 text-xs mb-6 uppercase tracking-wider font-bold">{error}</p>}

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
              <div>
                <label className="block text-[10px] font-bold uppercase tracking-widest text-aura-gray-dark mb-2">Email</label>
                <input
                  {...register("email")}
                  type="text"
                  className="w-full border-b border-aura-gray-medium py-3 text-sm focus:outline-none focus:border-aura-black transition-colors"
                  placeholder="name@email.com or username"
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

              <div className="flex items-center justify-between">
                <Link href="#" className="text-[10px] font-bold uppercase tracking-widest border-b border-aura-black pb-0.5">Quên mật khẩu?</Link>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-aura-black text-white py-5 text-xs font-bold uppercase tracking-[0.2em] hover:bg-aura-gray-dark transition-colors duration-300 disabled:opacity-50"
              >
                {isLoading ? "Đang xử lý..." : "Đăng nhập"}
              </button>
              </form>

              <div className="relative my-12">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t border-aura-gray-medium"></span>
              </div>
              <div className="relative flex justify-center text-xs uppercase tracking-widest text-aura-gray-dark">
                <span className="bg-white px-4">Hoặc tiếp tục với</span>
              </div>
              </div>

              <div className="grid grid-cols-2 gap-4 mb-12">
              <button
                onClick={() => signIn("google", { callbackUrl: "/" })}
                className="flex items-center justify-center gap-3 py-3 px-4 border border-aura-gray-medium hover:bg-aura-gray-light transition-colors duration-300 text-xs font-bold uppercase tracking-widest"
              >
                <svg className="w-4 h-4" viewBox="0 0 24 24">
                  <path
                    fill="#4285F4"
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  />
                  <path
                    fill="#34A853"
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  />
                  <path
                    fill="#FBBC05"
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z"
                  />
                  <path
                    fill="#EA4335"
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                  />
                </svg>
                Google
              </button>
              <button
                onClick={() => signIn("facebook", { callbackUrl: "/" })}
                className="flex items-center justify-center gap-3 py-3 px-4 bg-[#1877F2] text-white hover:bg-[#166FE5] transition-colors duration-300 text-xs font-bold uppercase tracking-widest"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M24 12.073C24 5.445 18.627 0 12 0S0 5.445 0 12.073C0 18.701 5.373 24 12 24S24 18.701 24 12.073ZM12 22C8.8 22 6.143 19.51 5.25 16.33H3.44C3.33 17.66 4.04 18.86 5.13 19.55C6.22 20.24 7.55 20.63 8.94 20.63C12.23 20.63 15.3 18.05 15.3 14.74H13.33V12.14H15.3V10.54C15.3 7.45 13.31 5.43 10.33 5.43C8.76 5.43 7.5 6.33 6.85 7.6C6.2 6.33 4.93 5.43 3.36 5.43C1.79 5.43 0.53 6.33 0 7.6C-0.65 7.6 -1.5 8.54 -1.5 10.54C-1.5 12.14 0 13.33 0 13.33V22C2.45 22 4.8 21.46 6.85 20.5C8.9 19.5 10.33 18.05 10.33 14.74V12.14H12.14V13.33C12.14 14.74 12.14 16.33 12.14 18.1C12.14 19.5 12.14 20.5 12.14 22Z" />
                </svg>
                Facebook
              </button>
              </div>

              <div className="mt-12 text-center">

              <p className="text-aura-gray-dark text-xs uppercase tracking-widest mb-4">Chưa có tài khoản?</p>
              <Link href="/auth/signup" className="text-sm font-bold uppercase tracking-[0.1em] border-b-2 border-aura-black pb-1">
                Tạo tài khoản mới
              </Link>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
