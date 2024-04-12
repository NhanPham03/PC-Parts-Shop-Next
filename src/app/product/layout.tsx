import Footer from "@/components/shared/Footer";
import Header from "@/components/shared/Header";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Product",
};

export default function ProductLayout({ children }: { children: React.ReactNode }) {
  return (
    <main>
      <Header />
      {children}
      <Footer />
    </main>
  );
}