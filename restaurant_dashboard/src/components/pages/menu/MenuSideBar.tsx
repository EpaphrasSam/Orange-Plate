"use client";

import React, { useEffect } from "react";
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
import { MenuItem } from "@/types/menu";

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

  useEffect(() => {
    reset(item);
  }, [item, reset]);

  return (
    <Card className={`${isMobile ? "h-screen" : "h-[calc(100vh-80px)]"}`}>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col h-full p-4 bg-white rounded-lg shadow-md"
      >
        <CardHeader className="flex justify-center mb-4 pb-0">
          <Avatar src={item.image} alt={item.name} size="lg" />
        </CardHeader>
        <CardBody className="flex flex-col gap-4 flex-grow overflow-y-auto pt-0">
          <Controller
            name="name"
            control={control}
            defaultValue={item.name}
            render={({ field }) => <Input label="Menu name" {...field} />}
          />
          <Controller
            name="description"
            control={control}
            defaultValue={item.description}
            render={({ field }) => <Textarea label="About" {...field} />}
          />
          <Controller
            name="category"
            control={control}
            defaultValue={item.category}
            render={({ field }) => (
              <Select label="Category" {...field}>
                {categories.map((category) => (
                  <SelectItem key={category} value={category}>
                    {category}
                  </SelectItem>
                ))}
              </Select>
            )}
          />
          <div className="flex gap-4 justify-between">
            <Controller
              name="readyIn"
              control={control}
              defaultValue={item.readyIn}
              render={({ field }) => <Input label="Ready in" {...field} />}
            />
            <Controller
              name="ingredients"
              control={control}
              defaultValue={item.ingredients}
              render={({ field }) => <Input label="Ingredients" {...field} />}
            />
            <Controller
              name="serves"
              control={control}
              defaultValue={item.serves}
              render={({ field }) => <Input label="Serves" {...field} />}
            />
          </div>
          <Controller
            name="price"
            control={control}
            defaultValue={item.price}
            render={({ field }) => (
              <Input label="Price" type="number" {...field} />
            )}
          />
        </CardBody>
        <CardFooter className="flex justify-evenly">
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
      </form>
    </Card>
  );
};

export default MenuSidebar;
