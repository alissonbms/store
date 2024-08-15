"use client";

import {
  HomeIcon,
  ListOrderedIcon,
  LogInIcon,
  LogOutIcon,
  MenuIcon,
  PercentIcon,
  ShoppingCartIcon,
} from "lucide-react";
import { Button } from "./button";
import { Card } from "./card";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "./sheet";
import { signIn, signOut, useSession } from "next-auth/react";
import { Avatar, AvatarFallback, AvatarImage } from "./avatar";
import { Separator } from "./separator";
import Link from "next/link";
import Cart from "./cart";
import { useContext } from "react";
import { CartContext } from "@/providers/cart";

const Header = () => {
  const { status, data } = useSession();
  const handleLoginClick = async () => await signIn("google");
  const handleLogoutClick = async () => await signOut();
  const { cartTotalQuantity } = useContext(CartContext);

  return (
    <Card className="flex items-center justify-between rounded-none border-x-0 border-t-0 p-[1.875rem]">
      <div className="flex">
        <div className="flex lg:hidden">
          <Sheet>
            <SheetTrigger asChild>
              <Button size="icon" variant="outline">
                <MenuIcon />
              </Button>
            </SheetTrigger>

            <SheetContent side="left">
              <SheetHeader className="text-left text-lg font-semibold">
                <SheetTitle>Menu</SheetTitle>
              </SheetHeader>

              {status === "authenticated" && data?.user && (
                <div className="flex flex-col">
                  <div className="flex items-center gap-2 py-4">
                    <Avatar>
                      <AvatarFallback>
                        {data.user.name?.[0].toUpperCase()}
                      </AvatarFallback>

                      {data.user.image && <AvatarImage src={data.user.image} />}
                    </Avatar>

                    <div className="flex flex-col">
                      <p className="font-medium">{data?.user?.name}</p>
                      <p className="text-sm opacity-75">Boas compras!</p>
                    </div>
                  </div>
                  <Separator />
                </div>
              )}

              <div className="mt-4 flex flex-col gap-2">
                {status === "unauthenticated" ? (
                  <Button
                    onClick={handleLoginClick}
                    variant="outline"
                    className="w-full justify-start gap-2"
                  >
                    <LogInIcon size={18} />
                    Fazer Login
                  </Button>
                ) : (
                  status === "authenticated" && (
                    <Button
                      onClick={handleLogoutClick}
                      variant="outline"
                      className="w-full justify-start gap-2"
                    >
                      <LogOutIcon size={18} />
                      Fazer Logout
                    </Button>
                  )
                )}

                <SheetClose asChild>
                  <Link href="/">
                    <Button
                      variant="outline"
                      className="w-full justify-start gap-2"
                    >
                      <HomeIcon size={18} />
                      Início
                    </Button>
                  </Link>
                </SheetClose>

                <SheetClose asChild>
                  <Link href="/category/deals/all">
                    <Button
                      variant="outline"
                      className="w-full justify-start gap-2"
                    >
                      <PercentIcon size={18} />
                      Ofertas
                    </Button>
                  </Link>
                </SheetClose>

                <SheetClose asChild>
                  <Link href="/catalog">
                    <Button
                      variant="outline"
                      className="w-full justify-start gap-2"
                    >
                      <ListOrderedIcon size={18} />
                      Catálogo
                    </Button>
                  </Link>
                </SheetClose>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>

      <Link href="/">
        <h1 className="text-lg font-semibold">
          <span className="text-primary">Valeryian</span> Store
        </h1>
      </Link>

      <Sheet>
        <SheetTrigger asChild>
          <Button size="icon" variant="outline">
            <div className="relative">
              <ShoppingCartIcon />
              {cartTotalQuantity > 0 && (
                <div className="absolute -left-3 -top-2 w-4 rounded-full bg-primary px-1 text-xs">
                  <p className="text-center">{cartTotalQuantity}</p>{" "}
                </div>
              )}
            </div>
          </Button>
        </SheetTrigger>
        <SheetHeader className="hidden">
          <SheetDescription>Menu carrinho de compras</SheetDescription>
          <SheetTitle>Menu carrinho de compras</SheetTitle>
        </SheetHeader>

        <SheetContent className="w-[350px]">
          <Cart />
        </SheetContent>
      </Sheet>
    </Card>
  );
};

export default Header;
