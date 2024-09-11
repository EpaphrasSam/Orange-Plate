export interface MenuItem {
  id: string;
  name: string;
  description: string;
  option: string;
  price: string;
  image: string;
  categoryId: string;
}

export interface CategoryType {
  id: string;
  name: string;
  image: string;
}
