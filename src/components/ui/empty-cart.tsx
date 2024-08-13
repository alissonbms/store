import Link from "next/link";
import { Badge } from "./badge";
import { SheetClose } from "./sheet";

export const EmptyCart = () => {
  return (
    <div className="flex h-full flex-col items-center justify-center gap-8">
      <p className="text-2xl">Carrinho vazio (0)</p>
      <div className="flex flex-col items-center justify-center gap-2">
        <p className="text-center">
          Dê uma olhada nas nossas{" "}
          <SheetClose asChild>
            <Link href="/deals" className="font-bold text-primary underline">
              OFERTAS
            </Link>
          </SheetClose>
        </p>
        <p className="text-center">
          ou vague pelo nosso vasto{" "}
          <SheetClose asChild>
            <Link href="/catalog" className="font-bold text-primary underline">
              CATÁLOGO
            </Link>
          </SheetClose>
        </p>
      </div>{" "}
      <Badge
        variant="outline"
        className="font-primary rounded-lg py-3 text-center text-base font-normal"
      >
        Faça um upgrade no seu setup, aqui você encontra descontos de até 55%
      </Badge>
    </div>
  );
};
