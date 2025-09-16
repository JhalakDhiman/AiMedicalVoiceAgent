'use client'

import React, { useContext,useState } from "react";
import { useForm } from "react-hook-form";
import { AuthContext } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";
import toast from "react-hot-toast";
import Image from "next/image";

const LoginForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const { setUser, setToken } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const onSubmit = async (data) => {
    setLoading(true);
    const toastId = toast.loading("Logging in...");
    const res = await fetch('/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    const result = await res.json();
    console.log(result);

    if(!res.ok){
        toast.error(result.message);
        setLoading(false);
        toast.dismiss(toastId);
        return;
    }

    else{
        toast.success("Login successful!");
    }

    setUser(result.user);
    setToken(result.token);
    localStorage.setItem('user', JSON.stringify(result.user));
    localStorage.setItem('token', JSON.stringify(result.token));
    router.push('/dashboard');
    toast.dismiss(toastId);
    setLoading(false);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-[#f4f9f8]">
      <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-[10px_10px_50px_-5px] shadow-[#013147]">
        <h2 className="text-2xl font-bold text-center mb-6 flex items-center gap-2">
          <Image
              className="w-9 h-9 rounded-full"
              src='/images/logoImage.svg'
              width='30'
              alt='logo'
              height='30'
            />
          Medical Voice Agent Login 
        </h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="w-full">
            <label className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              {...register("email", { required: "Email is required" })}
              className="mt-1 w-full rounded-lg border px-3 py-2 text-sm focus:ring-2 focus:ring-indigo-400"
              placeholder="Enter your email"
            />
            {errors.email && (
              <p className="text-xs text-red-500">{errors.email.message}</p>
            )}
          </div>

          <div className="w-full">
            <label className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              type="password"
              {...register("password", { required: "Password is required" })}
              className="mt-1 w-full rounded-lg border px-3 py-2 text-sm focus:ring-2 focus:ring-indigo-400"
              placeholder="Enter your password"
            />
            {
              errors.password && (
              <p className="text-xs text-red-500">{errors.password.message}</p>
            )}
          </div>

          <button
            type="submit"
            className="w-full flex gap-2 justify-center rounded-lg bg-[#013147] py-2 mt-3 text-white font-medium hover:bg-[#08567a] transition cursor-pointer"
          >
            {loading && <Loader2 className='animate-spin' />}
            Login
          </button>

          <p className="text-sm text-center italic">
            Don't have an account?{" "}
            <span
              className="text-[#013147] cursor-pointer"
              onClick={() => router.push("/auth/signup")}
            >
              Sign Up
            </span>
          </p>
        </form>
      </div>
    </div>
  );
};

export default LoginForm;
