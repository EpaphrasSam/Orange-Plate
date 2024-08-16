"use client";

import React, { useState, useEffect } from "react";
import MenuCard from "./MenuCard";
import { MenuItem } from "@/types/menu";
import MenuSidebar from "./MenuSideBar";
import { Input, Button } from "@nextui-org/react";
import { Drawer, useMediaQuery, useTheme } from "@mui/material";
import debounce from "lodash/debounce";
import { FiPlus, FiSearch } from "react-icons/fi";

interface MenuListProps {
  menuData: MenuItem[];
}

const MenuList: React.FC<MenuListProps> = ({ menuData }) => {
  const [selectedItem, setSelectedItem] = useState<MenuItem | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredMenu, setFilteredMenu] = useState(menuData);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
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
      category: "",
      readyIn: "",
      ingredients: "",
      serves: "",
      price: "0",
      image: "",
    });
    if (isMobile) {
      setIsDrawerOpen(true);
    }
  };

  const handleSubmit = (item: MenuItem) => {
    console.log(item);
    // API call will be handled here
    setSelectedItem(null);
    setIsDrawerOpen(false);
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
      <div className="flex justify-between items-center">
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
          Add New Menu
        </Button>
      </div>
      <div className="flex gap-4 relative min-h-screen">
        <div
          className={`w-full ${
            selectedItem && !isMobile ? "w-2/3" : ""
          } grid grid-cols-1 md:grid-cols-2 ${
            !selectedItem ? "xl:grid-cols-3" : ""
          } gap-4 auto-rows-min`}
        >
          {filteredMenu.map((item) => (
            <MenuCard key={item.id} item={item} handleSelect={handleSelect} />
          ))}
        </div>
        {!isMobile && selectedItem && (
          <div className="hidden lg:block w-1/3 sticky top-0 h-screen">
            <MenuSidebar
              item={selectedItem}
              onSubmit={handleSubmit}
              setSelectedItem={setSelectedItem}
              isMobile={isMobile}
            />
          </div>
        )}
      </div>
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
            />
          )}
        </div>
      </Drawer>
    </div>
  );
};

export default MenuList;
