import React from "react";

function Carrito({ carrito, removeFromCart, clearCart, total }) {
  if (carrito.length === 0) {
    return <p className="alert alert-info">El carrito está vacío</p>;
  }

  return (
    <div className="container mt-3">
      <ul className="list-group mb-3">
        {carrito.map((p) => (
          <li
            key={p.id}
            className="list-group-item d-flex justify-content-between align-items-center"
          >
            {p.nombre} - ${p.precio} x {p.cantidad}
            <button
              className="btn btn-sm btn-danger"
              onClick={() => removeFromCart(p.id)}
            >
              Eliminar
            </button>
          </li>
        ))}
      </ul>
      <h3>Total: ${total}</h3>
      <button className="btn btn-warning" onClick={clearCart}>
        Vaciar carrito
      </button>
    </div>
  );
}

export default Carrito;