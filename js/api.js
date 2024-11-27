const API_URL = "http://localhost:3000/productos";

export const getProductos = async () => {
  const response = await fetch(API_URL);
  return response.json();
};

export const addProducto = async (producto) => {
  await fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(producto),
  });
};

export const deleteProducto = async (id) => {
  await fetch(`${API_URL}/${id}`, { method: "DELETE" });
};
