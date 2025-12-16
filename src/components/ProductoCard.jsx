import React from "react";

function ProductoCard({ producto, agregarAlCarrito }) {
  return (
    <div className="producto-card">
      <img src={producto.imagen} alt={producto.nombre} width="150" />
      <h3>{producto.nombre}</h3>
      <p>Precio: ${producto.precio}</p>
      <button onClick={() => agregarAlCarrito(producto)}>Agregar al carrito</button>
    </div>
  );
}

export default ProductoCard;