import { CardItem } from "@/components/CardItem";
import { Navbar } from "@/components/Navbar";
import { useCartStore } from "@/store/shopcart";

export const Shopcart = () => {
  const { items} = useCartStore();

  return (
    <div>
      <Navbar />
      <div className="px-10 py-4">
        <h1 className="font-bold text-2xl mb-5">Store</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10">
          {items.map((item) => (
            <CardItem key={item.id} item={item} />
          ))}
        </div>
      </div>
    </div>
  );
};
