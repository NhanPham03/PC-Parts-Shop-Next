import { CopyrightIcon } from "lucide-react";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="mt-auto">
      <div className="flex bottom-0 my-2">
        <p className="flex text-sm items-center">
          Copyright
            <CopyrightIcon className="h-4 mt-[2px]" />
          {year}, Mot Thanh Vien Inc. All rights reserved.
        </p>
      </div>
    </footer>
  );
}