"use client";

import React, { useEffect, useRef, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import {
  Input,
  Textarea,
  Select,
  Button,
  Avatar,
  SelectItem,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
} from "@nextui-org/react";
import { MenuItem, CategoryType } from "@/types/menuType";
import { motion, AnimatePresence } from "framer-motion";
import { FiEdit } from "react-icons/fi";
import useSWR from "swr";
import { getCategories } from "@/services/menuService";
import CustomSpinner from "@/components/ui/CustomSpinner";
import { CldUploadButton } from "next-cloudinary";
import toast from "react-hot-toast";

interface MenuSidebarProps {
  item: MenuItem;
  onSubmit: (data: MenuItem) => void;
  setSelectedItem: (item: MenuItem | null) => void;
  isMobile: boolean;
  isSubmitting: boolean;
  isEditMode: boolean; // Add this new prop
}

const MenuSidebar: React.FC<MenuSidebarProps> = ({
  item,
  onSubmit,
  setSelectedItem,
  isMobile,
  isSubmitting,
  isEditMode, // Destructure the new prop
}) => {
  const { control, handleSubmit, reset, setValue } = useForm<MenuItem>();
  const [image, setImage] = useState("");

  const {
    data: categories,
    error,
    isLoading,
  } = useSWR<CategoryType[]>("categories", getCategories);

  useEffect(() => {
    reset(item);
  }, [item, reset]);

  const handleUpload = (result: any) => {
    console.log(result);
    const imageUrl = result.info.secure_url;
    setValue("image", imageUrl);
    setImage(imageUrl);
    toast.success("Image uploaded successfully");
  };

  return (
    <Card
      className={`${
        isMobile ? "h-screen" : "h-[calc(100vh-80px)] w-96"
      } flex flex-col`}
    >
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col h-full bg-white rounded-lg shadow-md"
      >
        <AnimatePresence>
          <motion.div
            key="sidebar-content"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.3 }}
            className="flex flex-col h-full"
          >
            <CardHeader className="flex justify-center pb-0">
              <div className="flex justify-center mb-6">
                <div className="relative">
                  <Avatar
                    src={item.image || image || ""}
                    alt="Restaurant Logo"
                    className="w-24 h-24"
                  />
                  <CldUploadButton
                    options={{ maxFiles: 1 }}
                    onSuccess={handleUpload}
                    uploadPreset={
                      process.env.NEXT_PUBLIC_CLOUDINARY_PRESET_NAME
                    }
                    className="absolute bottom-0 right-0 bg-gray-300 rounded-full p-2 hover:opacity-80 transition-colors"
                  >
                    <FiEdit size={18} />
                  </CldUploadButton>
                </div>
              </div>
            </CardHeader>
            <CardBody className="flex-grow overflow-y-auto scrollbar-thin">
              <div className="flex flex-col gap-4 p-4">
                <Controller
                  name="name"
                  control={control}
                  defaultValue={item.name}
                  render={({ field }) => <Input label="Menu name" {...field} />}
                />
                <Controller
                  name="option"
                  control={control}
                  defaultValue={item.option}
                  render={({ field }) => <Input label="Option" {...field} />}
                />
                <Controller
                  name="description"
                  control={control}
                  defaultValue={item.description}
                  render={({ field }) => (
                    <Textarea label="Description" {...field} />
                  )}
                />
                <Controller
                  name="categoryId"
                  control={control}
                  defaultValue={item.categoryId}
                  render={({ field: { onChange, value, ...rest } }) => (
                    <Select
                      label="Category"
                      selectedKeys={value ? [value] : []}
                      onSelectionChange={(keys) =>
                        onChange(Array.from(keys)[0])
                      }
                      isLoading={isLoading}
                      placeholder="Select a category"
                      {...rest}
                    >
                      {categories?.map((category) => (
                        <SelectItem key={category.id} value={category.id}>
                          {category.name}
                        </SelectItem>
                      )) ?? (
                        <SelectItem key="no-categories">
                          No categories found
                        </SelectItem>
                      )}
                    </Select>
                  )}
                />
                {/* <div className="flex gap-4 justify-between">
                  <Controller
                    name="readyIn"
                    control={control}
                    defaultValue={item.readyIn}
                    render={({ field }) => (
                      <Input label="Ready in" {...field} />
                    )}
                  />
                  <Controller
                    name="ingredients"
                    control={control}
                    defaultValue={item.ingredients}
                    render={({ field }) => (
                      <Input label="Ingredients" {...field} />
                    )}
                  />
                  <Controller
                    name="serves"
                    control={control}
                    defaultValue={item.serves}
                    render={({ field }) => <Input label="Serves" {...field} />}
                  />
                </div> */}
                <Controller
                  name="price"
                  control={control}
                  defaultValue={item.price}
                  render={({ field }) => (
                    <Input label="Price" type="number" {...field} />
                  )}
                />
              </div>
            </CardBody>
            <CardFooter className="flex justify-evenly p-4">
              <Button
                type="button"
                color="danger"
                variant="bordered"
                className="border-[#FCAF01] text-[#FCAF01] w-[120px]"
                onClick={() => setSelectedItem(null)}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                color="primary"
                className="bg-[#FCAF01] w-[120px]"
                isLoading={isSubmitting}
                spinner={<CustomSpinner />}
              >
                {isEditMode ? "Update" : "Create"}{" "}
                {/* Change button text based on mode */}
              </Button>
            </CardFooter>
          </motion.div>
        </AnimatePresence>
      </form>
    </Card>
  );
};

export default MenuSidebar;
