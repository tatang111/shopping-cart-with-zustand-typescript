import { create } from "zustand";
import { persist } from "zustand/middleware";

type CartItem = {
  id: number;
  name: string;
  quantity: number;
  price: number;
  imageUrl: string;
};

type CartState = {
  items: CartItem[];
  increaseItemQuantity: (id: number) => void;
  decreaseItemQuantity: (id: number) => void;
  removeItem: (idDelete: number) => void;
};

export const useCartStore = create(
  persist<CartState>(
    (set) => ({
      items: [
        {
          id: 1,
          name: "Book",
          price: 10,
          quantity: 0,
          imageUrl:
            "https://static.vecteezy.com/system/resources/previews/024/043/963/original/book-icon-clipart-transparent-background-free-png.png",
        },
        {
          id: 2,
          name: "Computer",
          price: 200,
          quantity: 0,
          imageUrl:
            "https://cdn.britannica.com/77/170477-050-1C747EE3/Laptop-computer.jpg",
        },
        {
          id: 3,
          name: "Banana",
          price: 20,
          quantity: 0,
          imageUrl:
            "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8a/Banana-Single.jpg/2324px-Banana-Single.jpg",
        },
        {
          id: 4,
          name: "Lamborghini",
          price: 800,
          quantity: 0,
          imageUrl:
            "https://th.bing.com/th/id/OIP.cjUjzALkEKobv8G4Evr6GQHaEK?rs=1&pid=ImgDetMain",
        },
        {
          id: 5,
          name: "Mechanical Keyboard",
          price: 35,
          quantity: 0,
          imageUrl:
            "https://www.pcgamesn.com/wp-content/uploads/2021/03/Corsair_K65_RGB_Mini_gaming_keyboard.jpg",
        },
      ],
      increaseItemQuantity: (id) =>
        set((state) => ({
          items: state.items.map((item) =>
            item.id === id ? { ...item, quantity: item.quantity + 1 } : item
          ),
        })),
      decreaseItemQuantity: (id) =>
        set((state) => ({
          items: state.items.map((item) =>
            item.id === id ? { ...item, quantity: item.quantity - 1 } : item
          ),
        })),
      removeItem: (idDelete) =>
        set((state) => ({
          items: state.items.map((item) =>
            item.id === idDelete ? { ...item, quantity: 0 } : item
          ),
        })),
    }),
    {
      name: "cart-storage",
      version: 2,
    }
  )
);
