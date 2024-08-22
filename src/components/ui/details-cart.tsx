import { twMerge } from "tailwind-merge";
import { Separator } from "./separator";

export interface CartDetailsProps extends React.ComponentProps<"div"> {
  title: string;
  text?: string;
  value?: number;
  type?: string;
  className?: string;
}

const CartDetails = ({
  title,
  text,
  value,
  type,
  className,
}: CartDetailsProps) => {
  return (
    <div className="flex flex-col gap-3">
      <Separator />

      <div className={twMerge(`flex items-center justify-between`, className)}>
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
