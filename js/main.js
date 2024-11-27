import { getProductos, addProducto, deleteProducto } from "./api.js";

const productosLista = document.querySelector(".productos-lista");
const form = document.getElementById("form-agregar");

const renderProductos = async () => {
  const productos = await getProductos();
  productosLista.innerHTML = productos.length
    ? productos
        .map(
          (producto) => `
        <div class="card">
          <img src="${producto.imagen}" alt="${producto.nombre}">
          <div class="card-container--info">
            <p>${producto.nombre}</p>
            <div class="card-container--value">
              <p>$${producto.precio}</p>
              <img src="assets/trashIcon.png" data-id="${producto.id}" class="delete-icon">
            </div>
          </div>
        </div>`
        )
        .join("")
    : "<p>No se han agregado productos</p>";
};

form.addEventListener("submit", async (e) => {
  e.preventDefault();
  const nuevoProducto = {
    nombre: form.nombre.value,
    precio: form.precio.value,
    imagen: form.imagen.value,
  };
  await addProducto(nuevoProducto);
  form.reset();
  renderProductos();
});

productosLista.addEventListener("click", async (e) => {
  if (e.target.classList.contains("delete-icon")) {
    const id = e.target.dataset.id;
    await deleteProducto(id);
    renderProductos();
  }
});

renderProductos();
