import Footer from "@/components/shared/Footer";
import Header from "@/components/shared/Header";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Catalog",
};

export default function CatalogLayout({ children }: { children: React.ReactNode }) {
  return (
    <main>
      <Header />
      {children}
      <Footer />
    </main>
  );
}