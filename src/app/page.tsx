import FilterNav from "@/components/shared/FilterNav";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "PC Parts Shop",
  description: "Best online PC hardware retailer!",
}

export default function Home() {
  return (
    <main className="flex flex-row">
      <FilterNav />
      <div className="flex-grow">

      </div>
    </main>
  );
}
