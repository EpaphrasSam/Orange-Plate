"use client";

import React, { useState } from "react";
import { Input, Button } from "@nextui-org/react";
import { changePassword } from "@/services/authService";
import { toast } from "react-hot-toast";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { FiEye, FiEyeOff } from "react-icons/fi";
import CustomSpinner from "@/components/ui/CustomSpinner";

const passwordSchema = z
  .object({
    oldPassword: z.string().min(1, "Old password is required"),
    newPassword: z
      .string()
      .min(6, "New password must be at least 6 characters"),
    confirmPassword: z.string().min(1, "Confirm password is required"),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

type PasswordFormData = z.infer<typeof passwordSchema>;

const PasswordChange = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<PasswordFormData>({
    resolver: zodResolver(passwordSchema),
  });

  const [showOldPassword, setShowOldPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = async (data: PasswordFormData) => {
    try {
      setIsLoading(true);
      await changePassword(data.oldPassword, data.newPassword);
      toast.success("Password changed successfully");
      reset();
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message);
      } else {
        toast.error("An error occurred while changing the password");
      }
    } finally {
      setIsLoading(false);
    }
  };

  const togglePasswordVisibility = (field: "old" | "new" | "confirm") => {
    switch (field) {
      case "old":
        setShowOldPassword(!showOldPassword);
        break;
      case "new":
        setShowNewPassword(!showNewPassword);
        break;
      case "confirm":
        setShowConfirmPassword(!showConfirmPassword);
        break;
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <Input
        type={showOldPassword ? "text" : "password"}
        label="Old Password"
        {...register("oldPassword")}
        isInvalid={!!errors.oldPassword}
        errorMessage={errors.oldPassword?.message}
        endContent={
          <button type="button" onClick={() => togglePasswordVisibility("old")}>
            {showOldPassword ? <FiEyeOff /> : <FiEye />}
          </button>
        }
      />
      <div className="flex flex-col md:flex-row gap-4">
        <Input
          type={showNewPassword ? "text" : "password"}
          label="New Password"
          {...register("newPassword")}
          isInvalid={!!errors.newPassword}
          errorMessage={errors.newPassword?.message}
          className="flex-1"
          endContent={
            <button
              type="button"
              onClick={() => togglePasswordVisibility("new")}
            >
              {showNewPassword ? <FiEyeOff /> : <FiEye />}
            </button>
          }
        />
        <Input
          type={showConfirmPassword ? "text" : "password"}
          label="Confirm New Password"
          {...register("confirmPassword")}
          isInvalid={!!errors.confirmPassword}
          errorMessage={errors.confirmPassword?.message}
          className="flex-1"
          endContent={
            <button
              type="button"
              onClick={() => togglePasswordVisibility("confirm")}
            >
              {showConfirmPassword ? <FiEyeOff /> : <FiEye />}
            </button>
          }
        />
      </div>
      <div className="flex justify-center">
        <Button
          type="submit"
          className="md:w-[200px] w-auto bg-[#FCAF01] text-white"
          isLoading={isLoading}
          spinner={<CustomSpinner />}
        >
          Change Password
        </Button>
      </div>
    </form>
  );
};

export default PasswordChange;
