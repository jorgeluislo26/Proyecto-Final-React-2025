import React from "react";
import Carrito from "../components/Carrito";
import { useCarrito } from "../context/CarritoContext";
import { Helmet } from "react-helmet";

function CarritoPage() {
  const { carrito, removeFromCart, clearCart, total } = useCarrito();

  return (
    <div>
      <Helmet>
        <title>Mi Tienda | Carrito</title>
        <meta name="description" content="Revisa los productos en tu carrito y finaliza tu compra." />
      </Helmet>

      <h2>Tu carrito</h2>
      <Carrito
        carrito={carrito}
        removeFromCart={removeFromCart}
        clearCart={clearCart}
        total={total}
      />
    </div>
  );
}

export default CarritoPage;