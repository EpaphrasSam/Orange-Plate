"use client";

import React from "react";
import Image from "next/image";
import {
  Card,
  CardBody,
  Avatar,
  CardHeader,
  CardFooter,
  Divider,
} from "@nextui-org/react";
import { MenuItem } from "@/types/menu";
import { FaEdit } from "react-icons/fa";
import { motion } from "framer-motion";

interface MenuItemProps {
  item: MenuItem;
  handleSelect: (item: MenuItem) => void;
}

const MenuCard: React.FC<MenuItemProps> = ({ item, handleSelect }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      <Card className="h-[350px]">
        <CardHeader className="flex gap-4 items-start pb-0 ">
          <Avatar
            src={item.image}
            alt={item.name}
            size="lg"
            className="w-16 h-16 object-cover rounded-full mb-3"
          />
          <div className="flex flex-col ">
            <p className="text-lg font-semibold text-gray-800">{item.name}</p>
            <p className="text-sm text-gray-600 mb-1">{item.category}</p>
          </div>
        </CardHeader>
        <CardBody className="flex flex-col items-start px-6 py-0 ">
          <div className="text-sm text-gray-600 mb-1 flex-grow-0 overflow-y-auto scrollbar-thin max-h-[100px] h-full">
            {item.description}
          </div>
          <Divider className="mt-6 mb-3" />
          <div className="flex justify-between w-full mt-2">
            <div className="flex flex-col items-center gap-2">
              <span className="text-base font-semibold text-gray-800">
                Ready in
              </span>
              <span className="text-sm text-gray-600">{item.readyIn}</span>
            </div>
            <div className="flex flex-col items-center gap-2">
              <span className="text-base font-semibold text-gray-800">
                Ingredients
              </span>
              <span className="text-sm text-gray-600">
                {item.ingredients.length}
              </span>
            </div>
            <div className="flex flex-col items-center gap-2">
              <span className="text-base font-semibold text-gray-800">
                Serves
              </span>
              <span className="text-sm text-gray-600">{item.serves}</span>
            </div>
          </div>
          <CardFooter className="flex justify-between w-full mt-2">
            <span className="text-lg font-bold text-gray-700">
              ₵{item.price}
            </span>
            <FaEdit
              className="text-gray-600 text-lg cursor-pointer hover:opacity-70 hover:scale-110 transition duration-300 ease-in-out"
              onClick={() => handleSelect(item)}
            />
          </CardFooter>
        </CardBody>
      </Card>
    </motion.div>
  );
};

export default MenuCard;
