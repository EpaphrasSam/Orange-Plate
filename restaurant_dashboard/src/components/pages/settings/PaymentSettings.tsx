"use client";

import React, { useState } from "react";
import { Input, Button, Select, SelectItem } from "@nextui-org/react";

const PaymentSettings = () => {
  const [settings, setSettings] = useState({
    acceptedMethods: [],
    defaultCurrency: "",
    taxRate: "",
  });

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setSettings((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(settings);
    // Handle submission logic here
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="flex flex-col md:flex-row gap-4">
        <Select
          label="Accepted Payment Methods"
          placeholder="Select payment methods"
          selectionMode="multiple"
          name="acceptedMethods"
          onChange={handleChange}
        >
          <SelectItem key="cash" value="Cash">
            Cash
          </SelectItem>
          <SelectItem key="card" value="Card">
            Card
          </SelectItem>
          <SelectItem key="mobileMoney" value="Mobile Money">
            Mobile Money
          </SelectItem>
        </Select>
        <Input
          label="Tax Rate (%)"
          name="taxRate"
          type="number"
          value={settings.taxRate}
          onChange={handleChange}
        />
      </div>
      <div className="flex justify-center">
        <Button
          type="submit"
          className="md:w-[200px] w-auto bg-[#FCAF01] text-white"
        >
          Save Payment Settings
        </Button>
      </div>
    </form>
  );
};

export default PaymentSettings;
