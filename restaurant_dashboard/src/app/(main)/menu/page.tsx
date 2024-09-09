import MenuList from "@/components/pages/menu/MenuList";

const menuData = [
  {
    id: "1",
    name: "French Fries",
    category: "Chicken & Tomato",
    description:
      "It consists of chicken and tomato sauce; It comes in different packages based on customers' taste; Ingredients: Juicy tomatoes, Roasted chicken;",
    option: "Regular",
    price: "25.00",
    image: "/burger.jpg",
  },
  {
    id: "2",
    name: "Jollof Rice",
    category: "Pepper Jollof",
    description:
      "It consists of chicken and tomato sauce; It comes in different packages based on customers' taste; Ingredients: Juicy tomatoes, Roasted chicken;It consists of chicken and tomato sauce; It comes in different packages based on customers' taste; Ingredients: Juicy tomatoes, Roasted chicken;It consists of chicken and tomato sauce; It comes in different packages based on customers' taste; Ingredients: Juicy tomatoes, Roasted chicken;It consists of chicken and tomato sauce; It comes in different packages based on customers' taste; Ingredients: Juicy tomatoes, Roasted chicken;It consists of chicken and tomato sauce; It comes in different packages based on customers' taste; Ingredients: Juicy tomatoes, Roasted chicken;",
    option: "Spicy",
    price: "25.00",
    image: "/burger.jpg",
  },
  {
    id: "3",
    name: "Pizza",
    category: "Chicken & Tomato",
    description:
      "It consists of chicken and tomato sauce; It comes in different packages based on customers' taste; Ingredients: Juicy tomatoes, Roasted chicken;",
    option: "Large",
    price: "25.00",
    image: "/burger.jpg",
  },
  {
    id: "4",
    name: "Fried Rice",
    category: "Assorted Fried Rice",
    description:
      "It consists of chicken and tomato sauce; It comes in different packages based on customers' taste; Ingredients: Juicy tomatoes, Roasted chicken;",
    option: "Vegetarian",
    price: "25.00",
    image: "/burger.jpg",
  },
  {
    id: "5",
    name: "Pizza",
    category: "Chicken & Tomato",
    description:
      "It consists of chicken and tomato sauce; It comes in different packages based on customers' taste; Ingredients: Juicy tomatoes, Roasted chicken;",
    option: "Medium",
    price: "25.00",
    image: "/burger.jpg",
  },
  {
    id: "6",
    name: "Fried Rice",
    category: "Assorted Fried Rice",
    description:
      "It consists of chicken and tomato sauce; It comes in different packages based on customers' taste; Ingredients: Juicy tomatoes, Roasted chicken;",
    option: "Seafood",
    price: "25.00",
    image: "/burger.jpg",
  },
];

export default function Menu() {
  return (
    <>
      <MenuList menuData={menuData} />
    </>
  );
}
