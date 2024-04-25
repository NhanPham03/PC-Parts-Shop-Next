import Link from "next/link";

const filters = [
  { name: "CPU", type: "CPU", },
  { name: "GPU", type: "GPU", },
  { name: "RAM", type: "RAM", },
  { name: "Storage", type: "Storage", },
  { name: "Motherboard", type: "Motherboard", },
  { name: "Case", type: "Case", },
  { name: "Other", type: "Other" },
]

export default function FilterNav() {
  return (
    <div className="flex flex-col flex-none h-fit border rounded-xl p-6 gap-2">
      {filters.map((filter) => {
        return (
          <Link className="w-full h-[2rem] pl-3 mr-10 place-content-center rounded-md ease-in hover:text-green-600 hover:bg-slate-100 dark:hover:bg-slate-800 duration-100"
            key={filter.name} 
            href={`/catalog?type=${filter.type}`}
          >
            {filter.name}
          </Link>
        );
      })}
    </div>
  );
}