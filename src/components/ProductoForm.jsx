import React, { useState } from "react";
import { crearProducto } from "../services/api";
import { toast } from "react-toastify";

function ProductoForm({ setProductos }) {
  const [nombre, setNombre] = useState("");
  const [precio, setPrecio] = useState("");
  const [descripcion, setDescripcion] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validaciones
    if (!nombre) {
      toast.error("El nombre es obligatorio");
      return;
    }
    if (!precio || Number(precio) <= 0) {
      toast.error("El precio debe ser mayor a 0");
      return;
    }
    if (descripcion.length < 10) {
      toast.error("La descripción debe tener al menos 10 caracteres");
      return;
    }

    try {
      const nuevo = await crearProducto({
        nombre,
        precio: Number(precio),
        descripcion,
      });
      setProductos((prev) => [...prev, nuevo]);
      toast.success("Producto creado");
      setNombre("");
      setPrecio("");
      setDescripcion("");
    } catch (err) {
      toast.error("Error al crear producto");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mb-4">
      <div className="mb-3">
        <label className="form-label">Nombre</label>
        <input
          type="text"
          className="form-control"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
        />
      </div>
      <div className="mb-3">
        <label className="form-label">Precio</label>
        <input
          type="number"
          className="form-control"
          value={precio}
          onChange={(e) => setPrecio(e.target.value)}
        />
      </div>
      <div className="mb-3">
        <label className="form-label">Descripción</label>
        <textarea
          className="form-control"
          value={descripcion}
          onChange={(e) => setDescripcion(e.target.value)}
        />
      </div>
      <button type="submit" className="btn btn-primary">
        Crear producto
      </button>
    </form>
  );
}

export default ProductoForm;