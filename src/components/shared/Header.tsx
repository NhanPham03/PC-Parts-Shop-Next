'use client';

import Image from "next/image";
import ModeToggle from "../global/mode-toggle";
import Link from "next/link";
import clsx from "clsx";
import { usePathname } from "next/navigation";
import { Separator } from "../ui/separator";
import SearchBar from "./SearchBar";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";

export default function Header() {
  const pathname = usePathname();
  const showSearchBar = (pathname === "/catalog");
  const { push } = useRouter();

  return (
    <header className="top-0 w-full">
      <Link href={"/"}>
        <Image alt="Logo" src={"/images/Logo.png"} width={250} height={100} />
      </Link>

      <Separator className="my-4" />

      <div className="flex flex-row gap-2">
        <Link className={clsx("flex items-center rounded-lg px-8 ease-in hover:text-green-600 duration-100",
          {
            "text-green-600 bg-slate-100 dark:bg-slate-900": pathname === "/",
          },
        )}
          href={"/"}
        >
          <p className="font-medium">Home</p>
        </Link>

        <span className="w-full">
          <div className="mx-10">
            {showSearchBar ? (
              <SearchBar placeholder="Looking for something?" paramName="q" />
            ) : (
              <Button className="w-full"
                onClick={() => push("/catalog")}
              >
                Click here to start browsing!
              </Button>
            )}
          </div>
        </span>

        <Link className={clsx("flex items-center rounded-lg px-8 ease-in hover:text-green-600 duration-100",
          {
            "text-green-600 bg-slate-100 dark:bg-slate-900": pathname === "/cart",
          },
        )}
          href={"/cart"}
        >
          <p className="font-medium">Cart</p>
        </Link>
        <Link className={clsx("flex items-center rounded-lg px-8 ease-in hover:text-green-600 duration-100",
          {
            "text-green-600 bg-slate-100 dark:bg-slate-900": pathname === "/account",
          },
        )}
          href={"/account"}
        >
          <p className="font-medium">Account</p>
        </Link>
        
        <ModeToggle />
      </div>
    </header>
  );
}
