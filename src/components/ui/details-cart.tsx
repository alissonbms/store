import { Separator } from "./separator";

interface CartDetailsProps {
  title: string;
  text?: string;
  value?: number;
  type?: string;
}

const CartDetails = ({ title, text, value, type }: CartDetailsProps) => {
  return (
    <div className="flex flex-col gap-3">
      <Separator />

      <div
        className={`flex items-center justify-between ${type === "total" ? `text-base font-semibold` : `text-sm`}`}
      >
        <p>{title}</p>
        <p>
          {type === "discount" && ` - `}
          {type === "shipment"
            ? text
            : value &&
              parseFloat(value.toFixed(2)).toLocaleString("pt-BR", {
                currency: "BRL",
                style: "currency",
                minimumFractionDigits: 2,
              })}
        </p>
      </div>
    </div>
  );
};

export default CartDetails;
