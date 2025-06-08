import { navigationMenuTriggerStyle } from "@/components/ui/navigation-menu";
import {
  Link,
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
} from "@radix-ui/react-navigation-menu";
import { ShoppingCart } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "./ui/sheet";
import { CartSection } from "./CartSection";
import { useCartStore } from "@/store/shopCart";
import type { CartItem } from "@/store/shopCart";

export const Navbar = () => {
  const { items } = useCartStore();

  const total = items.reduce((acc: number, item: CartItem) => {
    return acc + item.price * item.quantity;
  }, 0);

  return (
    <nav className="bg-gray-100 shadow flex justify-between px-8 py-4">
      <NavigationMenu className="flex gap-4 list-none ">
        <NavigationMenuItem>
          <NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>
            <Link href="/home">Home</Link>
          </NavigationMenuLink>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>
            <Link href="/store">Store</Link>
          </NavigationMenuLink>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>
            <Link href="/about">About</Link>
          </NavigationMenuLink>
        </NavigationMenuItem>
      </NavigationMenu>
      <NavigationMenu className="flex items-center list-none">
        <NavigationMenuItem>
          {items.some((item) => item.quantity > 0) && (
            <Sheet>
              <SheetTrigger className="relative">
                <ShoppingCart className="cursor-pointer" />
                <span className="absolute top-4 -right-4 bg-red-500 text-white text-xs font-bold rounded-full w-6 h-6 flex items-center justify-center">
                  {items.reduce(
                    (quantity, item) => quantity + item.quantity,
                    0
                  )}
                </span>
              </SheetTrigger>
              <SheetContent className="px-4">
                <SheetHeader>
                  <SheetTitle>Cart</SheetTitle>
                </SheetHeader>
                {items.map((item) => {
                  if (item.quantity > 0) {
                    return <CartSection key={item.id} item={item} />;
                  }
                })}
                <SheetTitle className="text-end mr-4 text-xl">
                  Total: ${total.toFixed(2)}
                </SheetTitle>
              </SheetContent>
            </Sheet>
          )}
        </NavigationMenuItem>
      </NavigationMenu>
    </nav>
  );
};
