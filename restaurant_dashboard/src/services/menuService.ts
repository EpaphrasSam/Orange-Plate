"use server";

import { CategoryType, MenuItem } from "@/types/menuType";
import { auth } from "@/utils/auth";
import axios from "@/utils/axios";
import { revalidatePath } from "next/cache";

export const getRestaurantMenu = async (): Promise<MenuItem[]> => {
  try {
    const session = await auth();
    const res = await axios.get(`/restaurant/${session?.user?.id}`, {
      headers: {
        Authorization: `${session?.user?.token}`,
      },
    });
    const filteredMenuItems = res.data.menuItems.map(
      ({ categoryName, ...item }: { categoryName: string } & MenuItem) => item
    );

    return filteredMenuItems;
  } catch (error) {
    console.error("Error fetching menu:", error);
    throw new Error("Failed to fetch menu");
  }
};

export const getCategories = async (): Promise<CategoryType[]> => {
  try {
    const session = await auth();
    const res = await axios.get(`/restaurant/categories`, {
      headers: {
        Authorization: `${session?.user?.token}`,
      },
    });

    const categories = res.data.categories as (CategoryType & {
      MenuItem: MenuItem[];
    })[];

    const filteredCategories = categories.map(
      ({ MenuItem, ...category }) => category
    );

    return filteredCategories;
  } catch (error) {
    console.error("Error fetching categories:", error);
    throw new Error("Failed to fetch categories");
  }
};

export const createMenuItem = async (
  menuItem: Omit<MenuItem, "id">
): Promise<boolean> => {
  try {
    const session = await auth();
    const res = await axios.post(
      `/restaurant/create-menu/${session?.user?.id}`,
      [
        {
          ...menuItem,
          price: parseFloat(menuItem.price),
          restaurantId: session?.user?.id,
        },
      ],
      {
        headers: {
          Authorization: `${session?.user?.token}`,
        },
      }
    );
    revalidatePath("/menu");
    return true;
  } catch (error: any) {
    console.error("Error creating menu item:", error.response.data);
    throw new Error("Failed to create menu item");
  }
};

export const updateMenuItem = async (menuItem: MenuItem): Promise<boolean> => {
  try {
    const session = await auth();
    const { id, ...data } = menuItem;
    console.log(data);
    const res = await axios.post(
      `/restaurant/update-menu-item/${id}`,
      {
        ...data,
        price: parseFloat(menuItem.price),
      },
      {
        headers: {
          Authorization: `${session?.user?.token}`,
        },
      }
    );
    revalidatePath("/menu");
    return true;
  } catch (error: any) {
    console.error("Error updating menu item:", error.response.data);
    throw new Error("Failed to update menu item");
  }
};
