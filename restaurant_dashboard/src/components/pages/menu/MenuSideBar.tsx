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
import { MenuItem } from "@/types/menuType";
import { motion, AnimatePresence } from "framer-motion";
import { FiEdit } from "react-icons/fi";

interface MenuSidebarProps {
  item: MenuItem;
  onSubmit: (data: MenuItem) => void;
  setSelectedItem: (item: MenuItem | null) => void;
  isMobile: boolean;
}

const categories = ["Pepper Jollof", "Chicken & Tomato", "Assorted Fried Rice"];

const MenuSidebar: React.FC<MenuSidebarProps> = ({
  item,
  onSubmit,
  setSelectedItem,
  isMobile,
}) => {
  const { control, handleSubmit, reset } = useForm<MenuItem>();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [profile, setProfile] = useState<MenuItem>();

  useEffect(() => {
    reset(item);
  }, [item, reset]);

  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfile((prev) =>
          prev ? { ...prev, image: reader.result as string } : undefined
        );
      };
      reader.readAsDataURL(file);
    }
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
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
                    src={item.image || ""}
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
                  name="category"
                  control={control}
                  defaultValue={item.category}
                  render={({ field }) => (
                    <Select
                      label="Category"
                      {...field}
                      selectedKeys={[item.category]}
                    >
                      {categories.map((category) => (
                        <SelectItem key={category} value={category}>
                          {category}
                        </SelectItem>
                      ))}
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
              >
                Apply
              </Button>
            </CardFooter>
          </motion.div>
        </AnimatePresence>
      </form>
    </Card>
  );
};

export default MenuSidebar;
