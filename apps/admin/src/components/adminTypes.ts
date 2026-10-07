export type Section = "Overview" | "Products" | "Orders" | "Customers" | "Categories" | "Analytics" | "Tasks";
export type DialogKind = "product" | "order" | "user" | "category" | "edit-user" | null;
export type Order = {
  id: string;
  customer: string;
  email: string;
  date: string;
  amount: number;
  status: "Delivered" | "Processing" | "Cancelled";
};
export type Product = {
  name: string;
  category: string;
  price: number;
  stock: number;
  status: "In stock" | "Low stock" | "Out of stock";
  image: string;
};
export type Customer = {
  name: string;
  email: string;
  joined: string;
  orders: number;
  spent: number;
  initials: string;
  color: string;
};
export type Todo = { text: string; done: boolean };
export type FormValues = Record<string, string>;
