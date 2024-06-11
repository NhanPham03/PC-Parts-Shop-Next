export async function getProductsList() {
  try {
    const res = await fetch(`${process.env.API_URL}/api/products/`, {
      method: "GET",
    });

    if (!res.ok) {
      throw new Error("Error getting products list.");
    }

    const productsList = await res.json();
    return productsList;
  } catch (error) {
    console.error("[PRODUCTS LIST]", error);
    throw error;
  }
}

export async function getProduct(id: number) {
  try {
    if (typeof id !== "number" || isNaN(id)) {
      throw new Error("Invalid URL parameter.");
    }

    const res = await fetch(`${process.env.API_URL}/api/products/${encodeURIComponent(id)}/`, {
      method: "GET",
    });

    if (!res.ok) {
      throw new Error(`Error getting product #${encodeURIComponent(id)}`);
    }

    const product = await res.json();
    return product;
  } catch (error) {
    console.error("[PRODUCT GET]", error);
    throw error;
  }
}

export async function searchProducts(query: string) {
  try {
    const res = await fetch(`${process.env.API_URL}/api/products/search/${encodeURIComponent(query)}/`, {
      method: "GET",
    });
    
    if (!res.ok) {
      throw new Error("Error searching products.");
    }

    const results = await res.json();
    return results;
  } catch (error) {
    console.error("[PRODUCTS SEARCH]", error);
    throw error;
  } 
}
