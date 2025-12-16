import React, { useEffect, useState } from "react";
import ProductoCard from "../components/ProductoCard";
import { obtenerProductos } from "../api/productos";
import { useCarrito } from "../context/CarritoContext";
import { Helmet } from "react-helmet";

function Home() {
  const [productos, setProductos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const { addToCart } = useCarrito();

  useEffect(() => {
    obtenerProductos()
      .then((data) => setProductos(data))
      .catch(() => setError("Error al cargar productos"))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <p>Cargando productos...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      <Helmet>
        <title>Mi Tienda | Productos</title>
        <meta name="description" content="Explora nuestros productos disponibles y agregalos al carrito." />
      </Helmet>

      <h2>Productos disponibles</h2>
      <div style={{ display: "flex", gap: "1rem" }}>
        {productos.map((prod) => (
          <ProductoCard
            key={prod.id}
            producto={prod}
            agregarAlCarrito={() => addToCart(prod)}
          />
        ))}
      </div>
    </div>
  );
}

export default Home;