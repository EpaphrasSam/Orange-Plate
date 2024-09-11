"use server";

import { auth, signIn, signOut, unstable_update } from "@/utils/auth";
import axios from "@/utils/axios";

export async function login(email: string, password: string) {
  try {
    const res = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });
    if (res?.error) {
      // Extract the underlying error message
      const errorMessage =
        res.error instanceof Error ? res.error.message : res.error;
      throw new Error(errorMessage);
    }
    return res;
  } catch (error) {
    if (error instanceof Error) {
      // Check if the error has a 'cause' property with more details
      if (
        error.cause &&
        typeof error.cause === "object" &&
        "err" in error.cause
      ) {
        const underlyingError = (error.cause as any).err;
        throw new Error(underlyingError.message || error.message);
      }
      throw error;
    }
    throw new Error("An unexpected error occurred");
  }
}

export async function logout() {
  try {
    await signOut({ redirect: false });
  } catch (error) {
    throw error;
  }
}

export async function updateProfile(restaurantId: string, data: any) {
  try {
    console.log(data);
    const session = await auth();
    const res = await axios.put(
      `restaurant/update-restaurant/${restaurantId}`,
      data,
      {
        headers: {
          Authorization: `${session?.user?.token!}`,
        },
      }
    );

    const updatedUser = res.data.updatedRestaurant;

    // Update the session with the new data
    await unstable_update({
      ...session,
      user: {
        id: updatedUser.id,
        name: updatedUser.name,
        email: updatedUser.email,
        phone: updatedUser.phone,
        image: updatedUser.image,
        address: updatedUser.address,
        latitude: updatedUser.latitude,
        longitude: updatedUser.longitude,
        openingHours: updatedUser.openingHours,
        closingHours: updatedUser.closingHours,
        token: session?.user?.token, // Keep the existing token
      },
    });

    return res.data;
  } catch (error: any) {
    console.log(error.response?.data);
    throw error;
  }
}
