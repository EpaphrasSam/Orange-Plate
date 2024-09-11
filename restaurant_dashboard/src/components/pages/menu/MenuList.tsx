"use client";

import React, { useState, useEffect } from "react";
import MenuCard from "./MenuCard";
import { MenuItem } from "@/types/menuType";
import MenuSidebar from "./MenuSideBar";
import { Input, Button } from "@nextui-org/react";
import { Drawer, useMediaQuery, useTheme } from "@mui/material";
import debounce from "lodash/debounce";
import { FiPlus, FiSearch } from "react-icons/fi";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "react-hot-toast";
import { createMenuItem, updateMenuItem } from "@/services/menuService";

interface MenuListProps {
  menuData: MenuItem[];
}

const MenuList: React.FC<MenuListProps> = ({ menuData }) => {
  const [selectedItem, setSelectedItem] = useState<MenuItem | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredMenu, setFilteredMenu] = useState(menuData);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("lg"));

  const handleSelect = (item: MenuItem) => {
    setSelectedItem(item);
    if (isMobile) {
      setIsDrawerOpen(true);
    }
  };

  const handleAddNew = () => {
    setSelectedItem({
      id: "",
      name: "",
      description: "",
      option: "",
      price: "0",
      image: "",
      categoryId: "",
    });
    if (isMobile) {
      setIsDrawerOpen(true);
    }
  };

  const handleSubmit = async (item: MenuItem) => {
    setIsSubmitting(true);
    try {
      if (item.id) {
        // Editing existing item
        await updateMenuItem(item);
        toast.success("Menu item updated successfully");
      } else {
        // Creating new item
        const { id, ...newItem } = item; // Filter out the id for new items
        await createMenuItem(newItem);
        toast.success("New menu item created successfully");
      }
      setSelectedItem(null);
      setIsDrawerOpen(false);
      // Refresh the menu data here (you might want to add a function to fetch updated menu data)
    } catch (error) {
      toast.error(
        item.id ? "Failed to update menu item" : "Failed to create menu item"
      );
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSearch = debounce((value: string) => {
    const filtered = menuData.filter((item) =>
      item.name.toLowerCase().includes(value.toLowerCase())
    );
    setFilteredMenu(filtered);
  }, 300);

  useEffect(() => {
    handleSearch(searchTerm);
  }, [searchTerm]);

  useEffect(() => {
    if (!selectedItem) {
      setIsDrawerOpen(false);
    }
  }, [selectedItem]);

  return (
    <div className="flex flex-col gap-4">
      <div className="flex justify-between gap-4 items-center">
        <Input
          placeholder="Search menu..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-[300px]"
          radius="full"
          startContent={<FiSearch size={20} />}
          onClear={() => setSearchTerm("")}
          isClearable
        />
        <Button
          onClick={handleAddNew}
          color="primary"
          startContent={<FiPlus size={20} />}
          className="bg-[#FCAF01]"
        >
          <span className="max-sm:hidden">Add New Menu</span>
        </Button>
      </div>
      <div className="flex gap-4 relative min-h-screen">
        <motion.div
          className={`w-full ${
            selectedItem && !isMobile ? "w-2/3" : ""
          } grid grid-cols-1 md:grid-cols-2 ${
            !selectedItem ? "xl:grid-cols-3" : ""
          } gap-4 auto-rows-min`}
          layout
        >
          <AnimatePresence>
            {filteredMenu.length > 0 ? (
              filteredMenu.map((item) => (
                <motion.div
                  key={item.id}
                  layout
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  <MenuCard item={item} handleSelect={handleSelect} />
                </motion.div>
              ))
            ) : (
              <motion.div
                className="col-span-full flex justify-center items-center h-[200px]"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <p className="text-gray-500 text-xl font-bold">
                  No menu items found
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
        {!isMobile && selectedItem && (
          <motion.div
            className="hidden lg:block w-[500px] sticky top-0 h-screen"
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 100 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
          >
            <MenuSidebar
              item={selectedItem}
              onSubmit={handleSubmit}
              setSelectedItem={setSelectedItem}
              isMobile={isMobile}
              isSubmitting={isSubmitting}
              isEditMode={!!selectedItem.id} // Pass this prop to MenuSidebar
            />
          </motion.div>
        )}
      </div>
      <AnimatePresence>
        {isMobile && isDrawerOpen && (
          <Drawer
            anchor="right"
            open={isMobile && isDrawerOpen}
            onClose={() => setIsDrawerOpen(false)}
          >
            <div className="w-full sm:w-96">
              {selectedItem && (
                <MenuSidebar
                  item={selectedItem}
                  onSubmit={handleSubmit}
                  setSelectedItem={setSelectedItem}
                  isMobile={isMobile}
                  isSubmitting={isSubmitting}
                  isEditMode={!!selectedItem.id}
                />
              )}
            </div>
          </Drawer>
        )}
      </AnimatePresence>
    </div>
  );
};

export default MenuList;
