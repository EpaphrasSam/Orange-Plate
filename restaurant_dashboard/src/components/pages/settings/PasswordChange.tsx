"use client";

import React, { useState } from "react";
import { Input, Button } from "@nextui-org/react";

const PasswordChange = () => {
  const [passwords, setPasswords] = useState({
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setPasswords((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Implement password change logic here
    console.log("Password change submitted", passwords);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <Input
        type="password"
        label="Old Password"
        name="oldPassword"
        value={passwords.oldPassword}
        onChange={handleChange}
      />
      <div className="flex flex-col md:flex-row gap-4">
        <Input
          type="password"
          label="New Password"
          name="newPassword"
          value={passwords.newPassword}
          onChange={handleChange}
          className="flex-1"
        />
        <Input
          type="password"
          label="Confirm New Password"
          name="confirmPassword"
          value={passwords.confirmPassword}
          onChange={handleChange}
          className="flex-1"
        />
      </div>
      <div className="flex justify-center">
        <Button
          type="submit"
          className="md:w-[200px] w-auto bg-[#FCAF01] text-white"
        >
          Change Password
        </Button>
      </div>
    </form>
  );
};

export default PasswordChange;
