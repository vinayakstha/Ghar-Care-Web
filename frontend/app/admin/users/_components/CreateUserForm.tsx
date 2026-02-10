"use client";
import { Controller, useForm } from "react-hook-form";
import { UserData, UserSchema } from "@/app/admin/users/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRef, useState, useTransition } from "react";
import { toast } from "react-toastify";
import { handleCreateUser } from "@/lib/actions/admin/user-action";
import { Pencil } from "lucide-react";

export default function CreateUserForm() {
  const [pending, startTransition] = useTransition();
  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<UserData>({
    resolver: zodResolver(UserSchema),
  });

  const [error, setError] = useState<string | null>(null);
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageChange = (
    file: File | undefined,
    onChange: (file: File | undefined) => void,
  ) => {
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setPreviewImage(reader.result as string);
      reader.readAsDataURL(file);
    } else {
      setPreviewImage(null);
    }
    onChange(file);
  };

  const handleDismissImage = (onChange?: (file: File | undefined) => void) => {
    setPreviewImage(null);
    onChange?.(undefined);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const onSubmit = async (data: UserData) => {
    setError(null);
    startTransition(async () => {
      try {
        const formData = new FormData();
        if (data.firstName) formData.append("firstName", data.firstName);
        if (data.lastName) formData.append("lastName", data.lastName);

        formData.append("email", data.email);
        formData.append("username", data.username);
        formData.append("password", data.password);
        formData.append("confirmPassword", data.confirmPassword);
        formData.append("phoneNumber", data.phoneNumber);

        if (data.profilePicture)
          formData.append("profilePicture", data.profilePicture);

        const response = await handleCreateUser(formData);

        if (!response.success) {
          throw new Error(response.message || "Create profile failed");
        }
        reset();
        handleDismissImage();
        toast.success("Profile Created successfully");
      } catch (error: Error | any) {
        toast.error(error.message || "Create profile failed");
        setError(error.message || "Create profile failed");
      }
    });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      {/* Profile Image Display */}
      <div className="mb-4 flex justify-center">
        <div className="relative w-24 h-24">
          {previewImage ? (
            <img
              src={previewImage}
              alt="Profile Image Preview"
              className="w-24 h-24 rounded-full object-cover"
            />
          ) : (
            <div className="w-24 h-24 bg-gray-300 rounded-full flex items-center justify-center">
              <span className="text-gray-600">No Image</span>
            </div>
          )}

          {/* Pencil Button */}
          <Controller
            name="profilePicture"
            control={control}
            render={({ field: { onChange } }) => (
              <>
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="absolute bottom-1 right-1 bg-[#006BAA] text-white p-2 rounded-full shadow hover:bg-[#01508d] cursor-pointer"
                >
                  <Pencil size={12} />
                </button>
                <input
                  ref={fileInputRef}
                  type="file"
                  className="hidden"
                  onChange={(e) =>
                    handleImageChange(e.target.files?.[0], onChange)
                  }
                  accept=".jpg,.jpeg,.png,.webp"
                />
              </>
            )}
          />
        </div>
      </div>

      {/* Form Fields */}
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-1">
          <label className="text-sm font-medium" htmlFor="firstName">
            First name
          </label>
          <input
            id="firstName"
            type="text"
            autoComplete="given-name"
            className="h-10 w-full rounded-md border border-gray-300 dark:border-gray-600 bg-background px-3 text-sm outline-none focus:border-foreground/40"
            {...register("firstName")}
            placeholder="Enter your First Name"
          />
          {errors.firstName?.message && (
            <p className="text-xs text-red-600">{errors.firstName.message}</p>
          )}
        </div>

        <div className="space-y-1">
          <label className="text-sm font-medium" htmlFor="lastName">
            Last name
          </label>
          <input
            id="lastName"
            type="text"
            autoComplete="family-name"
            className="h-10 w-full rounded-md border border-gray-300 dark:border-gray-600 bg-background px-3 text-sm outline-none focus:border-foreground/40"
            {...register("lastName")}
            placeholder="Enter your Last Name"
          />
          {errors.lastName?.message && (
            <p className="text-xs text-red-600">{errors.lastName.message}</p>
          )}
        </div>
      </div>

      <div className="space-y-1">
        <label className="text-sm font-medium" htmlFor="email">
          Email
        </label>
        <input
          id="email"
          type="email"
          autoComplete="email"
          className="h-10 w-full rounded-md border border-gray-300 dark:border-gray-600 bg-background px-3 text-sm outline-none focus:border-foreground/40"
          {...register("email")}
          placeholder="Enter your Email"
        />
        {errors.email?.message && (
          <p className="text-xs text-red-600">{errors.email.message}</p>
        )}
      </div>

      <div className="space-y-1">
        <label className="text-sm font-medium" htmlFor="username">
          Username
        </label>
        <input
          id="username"
          type="text"
          autoComplete="username"
          className="h-10 w-full rounded-md border border-gray-300 dark:border-gray-600 bg-background px-3 text-sm outline-none focus:border-foreground/40"
          {...register("username")}
          placeholder="Enter your Username"
        />
        {errors.username?.message && (
          <p className="text-xs text-red-600">{errors.username.message}</p>
        )}
      </div>

      <div className="space-y-1">
        <label className="text-sm font-medium" htmlFor="phoneNumber">
          Phone Number
        </label>
        <input
          id="phoneNumber"
          type="tel"
          autoComplete="tel"
          className="h-10 w-full rounded-md border border-gray-300 dark:border-gray-600 bg-background px-3 text-sm outline-none focus:border-foreground/40"
          {...register("phoneNumber")}
          placeholder="Enter your Phone Number"
        />
        {errors.phoneNumber?.message && (
          <p className="text-xs text-red-600">{errors.phoneNumber.message}</p>
        )}
      </div>

      <div className="space-y-1">
        <label className="text-sm font-medium" htmlFor="password">
          Password
        </label>
        <input
          id="password"
          type="password"
          autoComplete="new-password"
          className="h-10 w-full rounded-md border border-gray-300 dark:border-gray-600 bg-background px-3 text-sm outline-none focus:border-foreground/40"
          {...register("password")}
          placeholder="Enter your Password"
        />
        {errors.password?.message && (
          <p className="text-xs text-red-600">{errors.password.message}</p>
        )}
      </div>

      <div className="space-y-1">
        <label className="text-sm font-medium" htmlFor="confirmPassword">
          Confirm password
        </label>
        <input
          id="confirmPassword"
          type="password"
          autoComplete="new-password"
          className="h-10 w-full rounded-md border border-gray-300 dark:border-gray-600 bg-background px-3 text-sm outline-none focus:border-foreground/40"
          {...register("confirmPassword")}
          placeholder="Enter your Password"
        />
        {errors.confirmPassword?.message && (
          <p className="text-xs text-red-600">
            {errors.confirmPassword.message}
          </p>
        )}
      </div>

      <button
        type="submit"
        disabled={isSubmitting || pending}
        className="bg-[#006BAA] h-10 w-full rounded-md text-white text-sm  hover:opacity-90 disabled:opacity-60"
      >
        {isSubmitting || pending ? "Creating account..." : "Create account"}
      </button>
    </form>
  );
}
