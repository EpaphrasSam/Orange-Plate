"use client";

import Image from "next/image";
import React, { useState } from "react";
import { Input, Button } from "@nextui-org/react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { motion } from "framer-motion";
import { EyeIcon, EyeOffIcon } from "lucide-react";
import Link from "next/link";

const loginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

type LoginFormData = z.infer<typeof loginSchema>;

const LoginCard = () => {
  const [isVisible, setIsVisible] = useState(false);
  const toggleVisibility = () => setIsVisible(!isVisible);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = (data: LoginFormData) => {
    console.log(data); // Handle login logic here
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="flex flex-col h-full w-full items-center justify-start pt-12 px-8"
    >
      <div className="flex flex-col items-center gap-4 mb-8 md:mb-12 text-center">
        <Image src="/logo.png" alt="logo" width={70} height={70} />
        <p className="text-xl md:text-2xl font-bold text-black">orangePlate</p>
        <p className="text-sm text-gray-600 max-w-[250px]">
          Login to access your restaurant&apos;s dashboard on orangePlate
        </p>
      </div>
      <div className="w-full max-w-md">
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6">
          <Controller
            name="email"
            control={control}
            render={({ field }) => (
              <Input
                {...field}
                label="Email"
                type="email"
                labelPlacement="outside"
                placeholder="Enter Email"
                radius="sm"
                errorMessage={errors.email?.message}
                isInvalid={!!errors.email}
              />
            )}
          />
          <div className="space-y-1">
            <Controller
              name="password"
              control={control}
              render={({ field }) => (
                <Input
                  {...field}
                  label="Password"
                  labelPlacement="outside"
                  placeholder="Enter Password"
                  type={isVisible ? "text" : "password"}
                  radius="sm"
                  errorMessage={errors.password?.message}
                  isInvalid={!!errors.password}
                  endContent={
                    <button type="button" onClick={toggleVisibility}>
                      {isVisible ? (
                        <EyeIcon
                          size={20}
                          className="text-default-400 pointer-events-none"
                        />
                      ) : (
                        <EyeOffIcon
                          size={20}
                          className="text-default-400 pointer-events-none"
                        />
                      )}
                    </button>
                  }
                />
              )}
            />
            <div className="text-right">
              <Link
                href="/forgot-password"
                className="text-xs text-red-600 hover:underline"
              >
                Forgot password?
              </Link>
            </div>
          </div>
          <div className="pt-6">
            <Button
              type="submit"
              radius="sm"
              fullWidth
              style={{ backgroundColor: "#FCAF01", color: "white" }}
            >
              Login
            </Button>
          </div>
        </form>
      </div>
    </motion.div>
  );
};

export default LoginCard;
