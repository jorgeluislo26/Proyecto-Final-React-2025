import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useCarrito } from "../context/CarritoContext";

function Navbar() {
  const { usuario, logout } = useAuth();
  const { carrito } = useCarrito(); // ✅ ahora sí lo usamos

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">Mi Tienda</Link>
        <div className="collapse navbar-collapse">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              <Link className="nav-link" to="/carrito">
                Carrito{" "}
                <span className="badge bg-light text-dark">
                  {carrito.length}
                </span>
              </Link>
            </li>
            {usuario ? (
              <>
                <li className="nav-item">
                  <span className="nav-link">👤 {usuario.nombre}</span>
                </li>
                <li className="nav-item">
                  <button className="btn btn-outline-light" onClick={logout}>
                    Cerrar sesión
                  </button>
                </li>
              </>
            ) : (
              <li className="nav-item">
                <Link className="nav-link" to="/login">Login</Link>
              </li>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;