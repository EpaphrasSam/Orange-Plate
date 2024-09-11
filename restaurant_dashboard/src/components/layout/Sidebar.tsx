"use client";

import React, { useState, useEffect, useMemo } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { routes } from "@/lib/constant";
import { Avatar, Divider } from "@nextui-org/react";
import { MdLogout } from "react-icons/md";
import { FaBars } from "react-icons/fa";
import { Drawer } from "@mui/material";
import { toast } from "react-hot-toast";
import { logout } from "@/services/authService";
import { useSession } from "next-auth/react";
const Sidebar = () => {
  const { data: session } = useSession();
  const pathname = usePathname();
  const router = useRouter();
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => {
      clearInterval(timer);
    };
  }, []);

  const handleLogout = async () => {
    const loadingToast = toast.loading("Logging out...");
    try {
      await logout();
      router.push("/login");
      toast.dismiss(loadingToast);
      toast.success("Logout successful");
    } catch (error) {
      toast.dismiss(loadingToast);
      toast.error("Error during logout");
    }
  };

  const formattedDate = useMemo(() => {
    return currentTime.toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  }, [currentTime]);

  const formattedTime = useMemo(() => {
    return currentTime.toLocaleTimeString("en-US", { hour12: false });
  }, [currentTime]);

  const toggleDrawer =
    (open: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => {
      if (
        event.type === "keydown" &&
        ((event as React.KeyboardEvent).key === "Tab" ||
          (event as React.KeyboardEvent).key === "Shift")
      ) {
        return;
      }
      setIsDrawerOpen(open);
    };

  const sidebarContent = (showText: boolean) => (
    <div className={`h-full flex flex-col ${showText ? "w-64" : "w-20"}`}>
      <div className="p-4 flex flex-col items-center space-y-4">
        <Avatar src="" alt="Logo" size="lg" isBordered />
        {showText && (
          <div className="flex flex-col gap-1 items-center">
            <span className="text-lg font-bold text-center">
              {session?.user?.name}
            </span>
            <span className="text-xs font-semibold text-gray-700">
              {session?.user?.email}
            </span>
          </div>
        )}
        {showText && (
          <div className="text-center">
            <div className="text-sm">{formattedDate}</div>
            <div className="text-lg font-semibold">{formattedTime}</div>
          </div>
        )}
      </div>
      <nav className="flex-1 mt-4 flex-grow">
        <ul className="space-y-1">
          {routes.map((route) => (
            <SidebarItem
              key={route.path}
              icon={<route.icon />}
              text={route.name}
              href={route.path}
              isActive={pathname === route.path}
              showText={showText}
            />
          ))}
        </ul>
      </nav>
      <Divider />
      <motion.div
        className={`flex items-center ${
          showText ? "space-x-4 px-8" : "justify-center"
        } py-6 cursor-pointer text-red-500`}
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.95 }}
        onClick={handleLogout}
      >
        <motion.span className="text-2xl">
          <MdLogout />
        </motion.span>
        {showText && <span className="font-medium">Logout</span>}
      </motion.div>
    </div>
  );

  return (
    <>
      {/* Mobile view (md and below) */}
      <div className="md:hidden">
        <button onClick={toggleDrawer(true)} className="p-4">
          <FaBars size={24} />
        </button>
        <Drawer anchor="left" open={isDrawerOpen} onClose={toggleDrawer(false)}>
          {sidebarContent(true)}
        </Drawer>
      </div>

      {/* Tablet view (md to lg) */}
      <div className="hidden md:block lg:hidden h-screen bg-white shadow-lg">
        {sidebarContent(false)}
      </div>

      {/* Desktop view (lg and above) */}
      <div className="hidden lg:block h-screen bg-white shadow-lg">
        {sidebarContent(true)}
      </div>
    </>
  );
};

const SidebarItem = ({
  icon,
  text,
  href,
  isActive,
  showText,
}: {
  icon: React.ReactNode;
  text: string;
  href: string;
  isActive: boolean;
  showText: boolean;
}) => {
  return (
    <li>
      <Link
        href={href}
        className={`flex items-center ${
          showText ? "space-x-4 px-6" : "justify-center"
        } py-3 transition-colors ${
          isActive
            ? "bg-[#FCAF01] text-white"
            : "text-gray-700 hover:bg-[#FEF3C7]"
        }`}
      >
        <motion.span
          className={`text-2xl ${isActive ? "text-white" : "text-gray-700"}`}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
        >
          {icon}
        </motion.span>
        {showText && (
          <span className={`font-medium ${isActive ? "text-white" : ""}`}>
            {text}
          </span>
        )}
        {isActive && (
          <motion.div
            className="absolute left-0 w-1 h-8 bg-orange-500"
            layoutId="activeIndicator"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />
        )}
      </Link>
    </li>
  );
};

export default Sidebar;
