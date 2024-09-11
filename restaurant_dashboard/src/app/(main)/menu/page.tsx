import MenuList from "@/components/pages/menu/MenuList";
import { getRestaurantMenu } from "@/services/menuService";
import ErrorToast from "@/components/ui/ErrorToast";
import { MenuItem } from "@/types/menuType";

export const revalidate = 0;

export default async function Menu() {
  let menuItems: MenuItem[] = [];
  let error: string | null = null;

  try {
    menuItems = await getRestaurantMenu();
  } catch (e) {
    error = e instanceof Error ? e.message : "An unknown error occurred";
  }

  return (
    <>
      {error && <ErrorToast error={error} />}
      <MenuList menuData={menuItems} />
    </>
  );
}
