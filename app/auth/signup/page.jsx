'use client'
import { Loader2 } from "lucide-react";
import { set } from "mongoose";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { IoIosEye } from "react-icons/io";
import { IoIosEyeOff } from "react-icons/io";

export default function Signup() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const router = useRouter();

  const [loading, setLoading] = useState(false);

  const onSubmit = async (data) => {
    const toastId = toast.loading("Signing up...");
    setLoading(true);
    const res = await fetch('/api/auth/signup', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        firstName: data.firstName,
        lastName: data.lastName,
        age: data.age,
        email: data.email,
        password: data.password,
        confirmPassword: data.confirmPassword
      }),
    });
    const result = await res.json();
    console.log(result);
    if (!res.ok) {
      toast.error(result.message);
      setLoading(false);
      toast.dismiss(toastId);
      return;
    }

    toast.success("Signup successful! Please login.");
    router.push('/auth/login');
    toast.dismiss(toastId);
    setLoading(false);
  };

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const password = watch("password");

  return (
    <div className="flex items-center justify-center min-h-screen bg-[#f4f9f8]">
      <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-[10px_10px_50px_-5px] shadow-[#013147] my-4">
        <h2 className="text-2xl font-bold text-center flex items-center gap-2 mb-6">
          <Image
            className="w-9 h-9 rounded-full"
            src='/images/logoImage.svg'
            width='30'
            alt='logo'
            height='30'
          />
          Medical Voice Agent Signup
        </h2>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* First Name */}
          <div className="flex gap-4">
            <div>
              <label className="block text-sm font-medium">First Name</label>
              <input
                {...register("firstName", { required: "First name is required" })}
                className="w-full p-2 border rounded-lg"
                placeholder="Enter first name"
              />
              {errors.firstName && (
                <p className="text-red-500 text-sm">{errors.firstName.message}</p>
              )}
            </div>

            {/* Last Name */}
            <div>
              <label className="block text-sm font-medium">Last Name</label>
              <input
                {...register("lastName", { required: "Last name is required" })}
                className="w-full p-2 border rounded-lg"
                placeholder="Enter last name"
              />
              {errors.lastName && (
                <p className="text-red-500 text-sm">{errors.lastName.message}</p>
              )}
            </div>
          </div>

          {/* Age */}
          <div>
            <label className="block text-sm font-medium">Age</label>
            <input
              type="number"
              {...register("age", {
                required: "Age is required",
                min: { value: 18, message: "Minimum age is 18" },
              })}
              className="w-full p-2 border rounded-lg"
              placeholder="Enter age"
            />
            {errors.age && (
              <p className="text-red-500 text-sm">{errors.age.message}</p>
            )}
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-medium">Email</label>
            <input
              type="email"
              {...register("email", { required: "Email is required" })}
              className="w-full p-2 border rounded-lg"
              placeholder="Enter email"
            />
            {errors.email && (
              <p className="text-red-500 text-sm">{errors.email.message}</p>
            )}
          </div>

          {/* Password */}
          <div className='relative'>
            <label className="block text-sm font-medium">Password</label>
            <input
              type={`${showPassword ? "text" : "password"}`}
              {...register("password", { required: "Password is required" })}
              className="w-full p-2 border rounded-lg"
              placeholder="Enter password"
            />
            <div className="absolute right-4 top-8 text-xl" onClick={() => setShowPassword(!showPassword)}>
              {
                showPassword ? <IoIosEye /> : <IoIosEyeOff />
              }
            </div>
            {errors.password && (
              <p className="text-red-500 text-sm">{errors.password.message}</p>
            )}
          </div>

          {/* Confirm Password */}
          <div className='relative'>
            <label className="block text-sm font-medium">
              Confirm Password
            </label>
            <input
              type={`${showConfirmPassword ? "text" : "password"}`}
              {...register("confirmPassword", {
                required: "Confirm password is required",
                validate: (value) =>
                  value === password || "Passwords do not match",
              })}
              className="w-full p-2 border rounded-lg"
              placeholder="Confirm password"
            />
            <div className="absolute right-4 top-8 text-xl" onClick={() => setShowConfirmPassword(!showConfirmPassword)}>
              {
                showConfirmPassword ? <IoIosEye /> : <IoIosEyeOff />
              }
            </div>
            {errors.confirmPassword && (
              <p className="text-red-500 text-sm">
                {errors.confirmPassword.message}
              </p>
            )}
          </div>

          <button
            type="submit"
            className="w-full bg-[#013147] flex gap-2 justify-center text-white py-2 rounded-lg hover:bg-[#08567a] transition cursor-pointer"
          >
            {loading && <Loader2 className='animate-spin' />}
            Sign Up
          </button>

          <p className="text-sm text-center italic">
            Already have an account?{" "}
            <span
              className="text-[#013147] cursor-pointer"
              onClick={() => router.push("/auth/login")}
            >
              Login
            </span>
          </p>
        </form>
      </div>
    </div>
  );
}
