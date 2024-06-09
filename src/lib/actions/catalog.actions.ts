export async function getProducts() {
  try {
    const res = await fetch(`${process.env.API_URL}/api/products/`, {
      method: "GET",
    });

    if (!res.ok) {
      throw new Error("Error getting products.");
    }

    const products = await res.json();
    return products;
  } catch (error) {
    console.error("Error getting products:", error);
    throw error;
  }
}

export async function searchProducts({ q, type }: { q?: string, type?: string }) {
  try {
    const res = await fetch(`${process.env.API_URL}/api/products/search/${q ? q : type}`, {
      method: "GET",
    });

    if (!res.ok) {
      throw new Error("Error searching products.");
    }

    const products = await res.json();
    return products;
  } catch (error) {
    console.error("Error searching products:", error);
    throw error;
  } 
}
