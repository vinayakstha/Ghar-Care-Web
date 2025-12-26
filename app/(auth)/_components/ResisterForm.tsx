"use client";

import {
  Mail,
  Lock,
  Eye,
  EyeOff,
  X,
  User,
  Phone,
  BadgeCheck,
} from "lucide-react";
import { useState } from "react";
import Image from "next/image";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

/* ---------------- ZOD SCHEMA ---------------- */
const registerSchema = z
  .object({
    firstName: z.string().min(2, "First name is required"),
    lastName: z.string().min(2, "Last name is required"),
    username: z.string().min(3, "Username must be at least 3 characters"),
    email: z.string().email("Please enter a valid email address"),
    phoneNumber: z.string().min(10, "Enter a valid phone number"),
    password: z.string().min(6, "Password must be at least 6 characters"),
    confirmPassword: z.string().min(6, "Please confirm your password"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"], // sets the error to the confirmPassword field
  });

type RegisterFormValues = z.infer<typeof registerSchema>;

export default function RegisterForm() {
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
  });

  const onSubmit = async (data: RegisterFormValues) => {
    console.log("Registration Data:", data);
    // call API here
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <div className="w-full max-w-6xl bg-white rounded-2xl shadow-lg overflow-hidden grid grid-cols-1 md:grid-cols-2">
        {/* IMAGE SECTION */}
        <div className="hidden md:flex items-center justify-center p-10 bg-blue-50">
          <Image
            src="/images/registerImage.jpg" // Ensure this exists in public/images/
            alt="Register Illustration"
            width={520}
            height={420}
            className="max-w-full h-auto"
          />
        </div>

        {/* FORM SECTION */}
        <div className="p-8 md:p-12 flex flex-col justify-center">
          <div className="flex justify-end mb-2">
            <button type="button" className="cursor-pointer">
              <X className="text-black" />
            </button>
          </div>

          <h1 className="text-3xl font-bold text-gray-900">Create Account</h1>
          <p className="text-gray-500 mt-2">
            Join us to manage your household tasks easily
          </p>

          <form onSubmit={handleSubmit(onSubmit)} className="mt-6 space-y-4">
            {/* FIRST & LAST NAME GRID */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="relative">
                <User
                  size={18}
                  className="absolute left-3 top-3.5 text-gray-400"
                />
                <input
                  type="text"
                  placeholder="First Name"
                  {...register("firstName")}
                  className={`w-full pl-10 pr-4 py-3 border rounded-lg text-black focus:outline-none focus:ring-1 ${
                    errors.firstName
                      ? "border-red-500 focus:ring-red-500"
                      : "border-gray-300 focus:ring-[#006BAA]"
                  }`}
                />
                {errors.firstName && (
                  <p className="text-xs text-red-500 mt-1">
                    {errors.firstName.message}
                  </p>
                )}
              </div>
              <div className="relative">
                <User
                  size={18}
                  className="absolute left-3 top-3.5 text-gray-400"
                />
                <input
                  type="text"
                  placeholder="Last Name"
                  {...register("lastName")}
                  className={`w-full pl-10 pr-4 py-3 border rounded-lg text-black focus:outline-none focus:ring-1 ${
                    errors.lastName
                      ? "border-red-500 focus:ring-red-500"
                      : "border-gray-300 focus:ring-[#006BAA]"
                  }`}
                />
                {errors.lastName && (
                  <p className="text-xs text-red-500 mt-1">
                    {errors.lastName.message}
                  </p>
                )}
              </div>
            </div>

            {/* USERNAME */}
            <div className="relative">
              <BadgeCheck
                size={18}
                className="absolute left-3 top-3.5 text-gray-400"
              />
              <input
                type="text"
                placeholder="Username"
                {...register("username")}
                className={`w-full pl-10 pr-4 py-3 border rounded-lg text-black focus:outline-none focus:ring-1 ${
                  errors.username
                    ? "border-red-500 focus:ring-red-500"
                    : "border-gray-300 focus:ring-[#006BAA]"
                }`}
              />
              {errors.username && (
                <p className="text-xs text-red-500 mt-1">
                  {errors.username.message}
                </p>
              )}
            </div>

            {/* EMAIL & PHONE GRID */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="relative">
                <Mail
                  size={18}
                  className="absolute left-3 top-3.5 text-gray-400"
                />
                <input
                  type="email"
                  placeholder="Email"
                  {...register("email")}
                  className={`w-full pl-10 pr-4 py-3 border rounded-lg text-black focus:outline-none focus:ring-1 ${
                    errors.email
                      ? "border-red-500 focus:ring-red-500"
                      : "border-gray-300 focus:ring-[#006BAA]"
                  }`}
                />
                {errors.email && (
                  <p className="text-xs text-red-500 mt-1">
                    {errors.email.message}
                  </p>
                )}
              </div>
              <div className="relative">
                <Phone
                  size={18}
                  className="absolute left-3 top-3.5 text-gray-400"
                />
                <input
                  type="text"
                  placeholder="Phone Number"
                  {...register("phoneNumber")}
                  className={`w-full pl-10 pr-4 py-3 border rounded-lg text-black focus:outline-none focus:ring-1 ${
                    errors.phoneNumber
                      ? "border-red-500 focus:ring-red-500"
                      : "border-gray-300 focus:ring-[#006BAA]"
                  }`}
                />
                {errors.phoneNumber && (
                  <p className="text-xs text-red-500 mt-1">
                    {errors.phoneNumber.message}
                  </p>
                )}
              </div>
            </div>

            {/* PASSWORD */}
            <div className="relative">
              <Lock
                size={18}
                className="absolute left-3 top-3.5 text-gray-400"
              />
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                {...register("password")}
                className={`w-full pl-10 pr-10 py-3 border rounded-lg text-black focus:outline-none focus:ring-1 ${
                  errors.password
                    ? "border-red-500 focus:ring-red-500"
                    : "border-gray-300 focus:ring-[#006BAA]"
                }`}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-3.5 text-gray-400"
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
              {errors.password && (
                <p className="text-xs text-red-500 mt-1">
                  {errors.password.message}
                </p>
              )}
            </div>

            {/* CONFIRM PASSWORD */}
            <div className="relative">
              <Lock
                size={18}
                className="absolute left-3 top-3.5 text-gray-400"
              />
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Confirm Password"
                {...register("confirmPassword")}
                className={`w-full pl-10 pr-4 py-3 border rounded-lg text-black focus:outline-none focus:ring-1 ${
                  errors.confirmPassword
                    ? "border-red-500 focus:ring-red-500"
                    : "border-gray-300 focus:ring-[#006BAA]"
                }`}
              />
              {errors.confirmPassword && (
                <p className="text-xs text-red-500 mt-1">
                  {errors.confirmPassword.message}
                </p>
              )}
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-[#006BAA] text-white py-3 rounded-lg hover:bg-[#01508d] transition disabled:opacity-60 font-semibold"
            >
              {isSubmitting ? "Creating Account..." : "Sign Up"}
            </button>
          </form>

          <p className="text-sm text-gray-600 mt-6 text-center">
            Already have an account?{" "}
            <a
              href="/login"
              className="text-[#006BAA] font-medium hover:underline"
            >
              Log In
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
