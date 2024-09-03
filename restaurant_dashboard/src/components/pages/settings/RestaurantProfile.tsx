"use client";

import React, { useState, useRef } from "react";
import { Input, Button, Textarea, Avatar } from "@nextui-org/react";
import { FiEdit } from "react-icons/fi";

const RestaurantProfile = () => {
  const [profile, setProfile] = useState({
    name: "",
    phone: "",
    email: "",
    address: "",
    logo: null as string | null,
  });
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setProfile((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(profile);
    // Handle submission logic here
  };

  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfile((prev) => ({ ...prev, logo: reader.result as string }));
      };
      reader.readAsDataURL(file);
    }
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="flex justify-center mb-6">
        <div className="relative">
          <Avatar
            src={profile.logo || ""}
            alt="Restaurant Logo"
            className="w-24 h-24"
          />
          <button
            type="button"
            onClick={triggerFileInput}
            className="absolute bottom-0 right-0 bg-transparent rounded-full p-2 hover:opacity-80 transition-colors"
          >
            <FiEdit size={18} />
          </button>
        </div>
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleLogoUpload}
          accept="image/*"
          className="hidden"
        />
      </div>
      <div className="flex flex-col md:flex-row gap-4">
        <Input
          label="Restaurant Name"
          name="name"
          value={profile.name}
          onChange={handleChange}
          className="flex-1"
        />
        <Input
          label="Phone"
          name="phone"
          value={profile.phone}
          onChange={handleChange}
          className="flex-1"
        />
      </div>
      <Input
        label="Email"
        name="email"
        value={profile.email}
        onChange={handleChange}
      />
      <Textarea
        label="Address"
        name="address"
        value={profile.address}
        onChange={handleChange}
      />
      <div className="flex justify-center">
        <Button
          type="submit"
          className="md:w-[200px] w-auto bg-[#FCAF01] text-white"
        >
          Save Profile
        </Button>
      </div>
    </form>
  );
};

export default RestaurantProfile;
