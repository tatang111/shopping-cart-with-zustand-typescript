import { useCartStore } from "@/store/shopCart";
import { Button } from "./ui/button";
import { Card, CardDescription, CardTitle } from "./ui/card";

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

export const CardItem = ({ item }: CardItemProps) => {
  const { decreaseItemQuantity, increaseItemQuantity, removeItem } =
    useCartStore();

  return (
    <Card className="flex flex-col p-5 h-full min-h-[350px]">
      <img src={item.imageUrl} className="w-full h-40 object-contain mb-4" />
      <div className="flex justify-between">
        <CardTitle>{item.name}</CardTitle>
        <CardDescription>${item.price}</CardDescription>
      </div>
      {item.quantity === 0 ? (
        <Button
          onClick={() => increaseItemQuantity(item.id)}
          className="bg-blue-500 hover:bg-blue-600 py-2 text-white text-md font-[600] rounded transition duration-200 ease-in-out shadow cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-1"
        >
          + Add To Cart
        </Button>
      ) : (
        <div className="flex flex-col gap-2 ">
          <div className="flex justify-center items-center gap-2 ">
            <Button
              onClick={() => decreaseItemQuantity(item.id)}
              className="bg-blue-500 hover:bg-blue-600 cursor-pointer text-xl w-10 h-10 flex items-center justify-center"
            >
              -
            </Button>
            <span>{item.quantity} in Cart</span>
            <Button
              onClick={() => increaseItemQuantity(item.id)}
              className="bg-blue-500 hover:bg-blue-600 cursor-pointer text-xl w-10 h-10 flex items-center justify-center"
            >
              +
            </Button>
          </div>
          <Button
            onClick={() => removeItem(item.id)}
            variant={"destructive"}
            className="hover:bg-red-600 bg-red-500 cursor-pointer"
          >
            Remove
          </Button>
        </div>
      )}
    </Card>
  );
};
