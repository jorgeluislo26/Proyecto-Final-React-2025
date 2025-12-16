const BASE = process.env.REACT_APP_API_URL;

export async function listProductos() {
  const r = await fetch(`${BASE}/productos`);
  if (!r.ok) throw new Error("Error al listar productos");
  return r.json();
}

export async function crearProducto(data) {
  const r = await fetch(`${BASE}/productos`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!r.ok) throw new Error("Error al crear producto");
  return r.json();
}

export async function editarProducto(id, data) {
  const r = await fetch(`${BASE}/productos/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!r.ok) throw new Error("Error al editar producto");
  return r.json();
}

export async function eliminarProducto(id) {
  const r = await fetch(`${BASE}/productos/${id}`, { method: "DELETE" });
  if (!r.ok) throw new Error("Error al eliminar producto");
  return r.json(); // devuelve el objeto eliminado
}