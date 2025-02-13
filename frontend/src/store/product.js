import { create } from "zustand";

export const useProductStore = create((set) => ({
  products: [],
  setProduct: (product) => set({ product }),
  createProduct: async (newProduct) => {
    if (!newProduct.name || !newProduct.image || !newProduct.price) {
      return { success: false, message: "Please provide all fields." };
    }
    const res = await fetch("/api/products", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newProduct),
    });
    const data = res.json();
    set((state) => ({ prodacts: [...state.products, data.data] }));
    return { success: true, message: "Product created successfully." };
  },
  fetchProduct: async () => {
    const res = await fetch("/api/products");
    const data = await res.json();
    set({ products: data.data });
  },
  deleteProduct: async (productId) => {
    const res = await fetch(`/api/products/${productId}`, {
      method: "DELETE",
    });
    const data = await res.json();
    if (!data.success) return { success: false, message: data.message };

    //update UI kad se izbriše product
    set((state) => ({
      products: state.products.filter((product) => product._id !== productId),
    }));
    return { success: true, message: data.message };
  },
  updateProduct: async (productId, updatedProduct) => {
    const res = await fetch(`/api/products/${productId}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updatedProduct),
    });
    const data = await res.json();
    if (!data.success) return { success: false, message: data.message };
    //update UI kad se ažurira product
    set((state) => ({
      products: state.products.map((product) =>
        product._id === productId ? data.data : product
      ),
    }));
    return { success: true, message: data.message };
  },
}));
