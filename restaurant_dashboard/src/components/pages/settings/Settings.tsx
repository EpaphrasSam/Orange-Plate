"use client";

import React from "react";
import { motion } from "framer-motion";
import RestaurantProfile from "./RestaurantProfile";
import PasswordChange from "./PasswordChange";
import { Button, Divider } from "@nextui-org/react";

const Settings = () => {
  const handleDeleteAccount = () => {
    // Implement account deletion logic here
    console.log("Delete account clicked");
  };

  return (
    <div className="flex flex-col space-y-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <h2 className="text-2xl font-bold mb-4">Restaurant Profile</h2>
        <RestaurantProfile />
      </motion.div>

      <Divider className="my-6" />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.2 }}
      >
        <h2 className="text-2xl font-bold mb-4">Security</h2>
        <PasswordChange />
        <Divider className="my-6" />
        <div className="mt-12 flex justify-center">
          <Button
            color="danger"
            onClick={handleDeleteAccount}
            className="md:w-[400px] w-auto"
          >
            Delete Account
          </Button>
        </div>
      </motion.div>
    </div>
  );
};

export default Settings;
