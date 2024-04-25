import FilterNav from "@/components/shared/FilterNav";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: 'Catalog',
}

export default function Catalog({ 
  searchParams 
}:{
  searchParams?: {
    q?: string,
    type?: string,
  }
}) {
  const query = searchParams?.q || "";
  const type = searchParams?.type;

  if (query !== "") {
    metadata.title = `Results for: ${query}`;
  }

  return (
    <main>
      { query !== "" ? <h2 className="mb-4">You searched for: {query}</h2> : null }
      <div className="flex flex-row">
        <FilterNav />
      </div>
    </main>
  );
}