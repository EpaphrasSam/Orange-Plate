"use client";

import React, { useState, useRef, useEffect } from "react";
import { Input, Button, Textarea, Avatar } from "@nextui-org/react";
import { FiEdit } from "react-icons/fi";
import { useSession } from "next-auth/react";
import { z } from "zod";
import { updateProfile } from "@/services/authService";
import CustomSpinner from "@/components/ui/CustomSpinner";
import { toast } from "react-hot-toast";
import { CldUploadButton } from "next-cloudinary";

const profileSchema = z.object({
  name: z.string().min(1, "Restaurant name is required"),
  phone: z.string().min(1, "Phone number is required"),
  email: z.string().email("Invalid email address"),
  address: z.string().min(1, "Address is required"),
  openingHours: z.string().min(1, "Opening hours are required"),
  closingHours: z.string().min(1, "Closing hours are required"),
  image: z.string().optional(),
});

const RestaurantProfile = () => {
  const { data: session, update: updateSession } = useSession();
  const [profile, setProfile] = useState({
    name: "",
    phone: "",
    email: "",
    address: "",
    openingHours: "",
    closingHours: "",
    image: null as string | null,
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (session?.user) {
      setProfile({
        name: session.user.name || "",
        phone: session.user.phone || "",
        image: session.user.image || "",
        email: session.user.email || "",
        address: session.user.address || "",
        openingHours: session.user.openingHours || "",
        closingHours: session.user.closingHours || "",
      });
    }
  }, [session]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setProfile((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const validatedData = profileSchema.parse(profile);
      if (session?.user?.id) {
        await updateProfile(session.user.id, {
          ...validatedData,
          longitude: parseFloat(session.user.longitude),
          latitude: parseFloat(session.user.latitude),
        });

        // Refresh the session to get the updated data
        await updateSession();
      }
      toast.success("Profile updated successfully");
    } catch (error) {
      if (error instanceof z.ZodError) {
        const fieldErrors: Record<string, string> = {};
        error.errors.forEach((err) => {
          if (err.path) {
            fieldErrors[err.path[0]] = err.message;
          }
        });
        setErrors(fieldErrors);
      } else {
        toast.error("Failed to update profile");
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogoUpload = (result: any) => {
    const imageUrl = result.info.secure_url;
    setProfile((prev) => ({ ...prev, image: imageUrl }));
    toast.success("Image uploaded successfully");
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="flex justify-center mb-6">
        <div className="relative">
          <Avatar
            src={profile.image || ""}
            alt="Restaurant Logo"
            className="w-24 h-24"
          />
          <CldUploadButton
            options={{ maxFiles: 1 }}
            onSuccess={handleLogoUpload}
            uploadPreset={process.env.NEXT_PUBLIC_CLOUDINARY_PRESET_NAME}
            className="absolute bottom-0 right-0 bg-gray-300 rounded-full p-2 hover:opacity-80 transition-colors"
          >
            <FiEdit size={18} />
          </CldUploadButton>
        </div>
      </div>
      <Input
        label="Email"
        name="email"
        value={profile.email}
        onChange={handleChange}
        errorMessage={errors.email}
        isInvalid={!!errors.email}
        isReadOnly
      />
      <div className="flex flex-col md:flex-row gap-4">
        <Input
          label="Restaurant Name"
          name="name"
          value={profile.name}
          onChange={handleChange}
          className="flex-1"
          errorMessage={errors.name}
          isInvalid={!!errors.name}
        />
        <Input
          label="Phone"
          name="phone"
          value={profile.phone}
          onChange={handleChange}
          className="flex-1"
          errorMessage={errors.phone}
          isInvalid={!!errors.phone}
        />
      </div>

      <Textarea
        label="Address"
        name="address"
        value={profile.address}
        onChange={handleChange}
        errorMessage={errors.address}
        isInvalid={!!errors.address}
      />
      <div className="flex flex-col md:flex-row gap-4">
        <Input
          label="Opening Hours"
          name="openingHours"
          value={profile.openingHours}
          onChange={handleChange}
          className="flex-1"
          errorMessage={errors.openingHours}
          isInvalid={!!errors.openingHours}
        />
        <Input
          label="Closing Hours"
          name="closingHours"
          value={profile.closingHours}
          onChange={handleChange}
          className="flex-1"
          errorMessage={errors.closingHours}
          isInvalid={!!errors.closingHours}
        />
      </div>
      <div className="flex justify-center">
        <Button
          type="submit"
          className="md:w-[200px] w-auto bg-[#FCAF01] text-white"
          isLoading={isLoading}
          spinner={<CustomSpinner />}
        >
          {isLoading ? "Saving..." : "Save Profile"}
        </Button>
      </div>
    </form>
  );
};

export default RestaurantProfile;
