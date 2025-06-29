import { useCartStore } from "@/store/shopCart";
import { Button } from "./ui/button";
import { SheetDescription, SheetTitle } from "./ui/sheet";

type Item = {
  id: number;
  name: string;
  quantity: number;
  price: number;
  imageUrl: string;
};

type CardItemProps = {
  item: Item;
};

export const CartSection = ({ item }: CardItemProps) => {
  const { removeItem } = useCartStore();
  return (
    <section className="flex gap-3">
      <img src={item.imageUrl} className="w-20" />
      <div className="flex justify-between w-full">
        <div className="flex flex-col  justify-center ">
          <SheetTitle className="text-lg font-[600]">
            {item.name}{" "}
            {item.quantity > 1 && (
              <span className="text-sm text-gray-500">x {item.quantity}</span>
            )}
          </SheetTitle>
          <SheetDescription className="text-md text-">
            ${item.price}
          </SheetDescription>
        </div>
        <div className="flex items-center gap-3">
          <h3>${item.price * item.quantity}</h3>
          <Button
            onClick={() => removeItem(item.id)}
            variant={"outline"}
            className="cursor-pointer p-4 leading-none"
          >
            x
          </Button>
        </div>
      </div>
    </section>
  );
};
