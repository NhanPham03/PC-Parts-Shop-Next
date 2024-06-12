'use client';

import { MagnifyingGlassIcon } from "@radix-ui/react-icons";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useDebouncedCallback } from "use-debounce";
import { Input } from "../ui/input";

export default function SearchBar({ 
  placeholder,
  paramName, 
}: { 
  placeholder: string,
  paramName: string, 
}) {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const handleSearch = useDebouncedCallback((query) => {
    const params = new URLSearchParams(searchParams);

    if (query) {
      params.set(paramName, query);
    } else {
      params.delete(paramName);
    }
    replace(`${pathname}?${params.toString()}`);
  }, 500);

  return (
    <div className="relative flex flex-1">
      <Input className="peer block w-full rounded-md py-[9px] pl-10 text-sm outline-2"
        type="text" 
        placeholder={placeholder} 
        onChange={(e) => {handleSearch(e.target.value)}} 
      />
      <MagnifyingGlassIcon className="absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 peer-focus:text-gray-500" />
    </div>
  );
}