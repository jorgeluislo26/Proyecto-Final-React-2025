import React, { useState } from "react";
import { editarProducto, eliminarProducto } from "../services/api";
import { toast } from "react-toastify";
import ConfirmModal from "./ConfirmModal";

function ProductoList({ productos, setProductos }) {
  const [editando, setEditando] = useState(null);
  const [nombre, setNombre] = useState("");
  const [precio, setPrecio] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [productoAEliminar, setProductoAEliminar] = useState(null);

  const handleEdit = (producto) => {
    setEditando(producto.id);
    setNombre(producto.nombre);
    setPrecio(producto.precio);
    setDescripcion(producto.descripcion);
  };

  const handleUpdate = async (id) => {
    if (!nombre || precio <= 0 || descripcion.length < 10) {
      toast.error("Datos inválidos");
      return;
    }
    try {
      const actualizado = await editarProducto(id, {
        nombre,
        precio: Number(precio),
        descripcion,
      });
      setProductos((prev) =>
        prev.map((p) => (p.id === id ? actualizado : p))
      );
      toast.success("Producto actualizado");
      setEditando(null);
      setNombre("");
      setPrecio("");
      setDescripcion("");
    } catch (err) {
      toast.error("Error al actualizar producto");
    }
  };

  const confirmarEliminar = (producto) => {
    setProductoAEliminar(producto);
    setShowModal(true);
  };

  const handleDelete = async () => {
    try {
      await eliminarProducto(productoAEliminar.id);
      setProductos((prev) =>
        prev.filter((p) => p.id !== productoAEliminar.id)
      );
      toast.success("Producto eliminado");
    } catch (err) {
      toast.error("Error al eliminar producto");
    } finally {
      setShowModal(false);
      setProductoAEliminar(null);
    }
  };

  return (
    <div>
      <h3>Lista de productos</h3>
      <ul className="list-group">
        {productos.map((p) => (
          <li key={p.id} className="list-group-item d-flex justify-content-between align-items-center">
            {editando === p.id ? (
              <div className="w-100">
                <input
                  type="text"
                  className="form-control mb-2"
                  value={nombre}
                  onChange={(e) => setNombre(e.target.value)}
                />
                <input
                  type="number"
                  className="form-control mb-2"
                  value={precio}
                  onChange={(e) => setPrecio(e.target.value)}
                />
                <textarea
                  className="form-control mb-2"
                  value={descripcion}
                  onChange={(e) => setDescripcion(e.target.value)}
                />
                <button
                  className="btn btn-success btn-sm me-2"
                  onClick={() => handleUpdate(p.id)}
                >
                  Guardar
                </button>
                <button
                  className="btn btn-secondary btn-sm"
                  onClick={() => setEditando(null)}
                >
                  Cancelar
                </button>
              </div>
            ) : (
              <>
                <span>
                  <strong>{p.nombre}</strong> - ${p.precio}  
                  <br />
                  {p.descripcion}
                </span>
                <div>
                  <button
                    className="btn btn-warning btn-sm me-2"
                    onClick={() => handleEdit(p)}
                  >
                    ✏️ Editar
                  </button>
                  <button
                    className="btn btn-danger btn-sm"
                    onClick={() => confirmarEliminar(p)}
                  >
                    🗑️ Eliminar
                  </button>
                </div>
              </>
            )}
          </li>
        ))}
      </ul>

      {showModal && (
        <ConfirmModal
          show={showModal}
          onClose={() => setShowModal(false)}
          onConfirm={handleDelete}
          message={`¿Seguro que quieres eliminar "${productoAEliminar?.nombre}"?`}
        />
      )}
    </div>
  );
}

export default ProductoList;