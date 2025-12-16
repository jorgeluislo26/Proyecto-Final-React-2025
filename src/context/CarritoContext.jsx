import { createContext, useContext, useState } from "react";
import { toast } from "react-toastify";

const CarritoContext = createContext();

export function CarritoProvider({ children }) {
  const [carrito, setCarrito] = useState([]);

  const addToCart = (producto) => {
    setCarrito((prev) => {
      const existe = prev.find((p) => p.id === producto.id);
      if (existe) {
        toast.info("Cantidad aumentada en el carrito");
        return prev.map((p) =>
          p.id === producto.id ? { ...p, cantidad: p.cantidad + 1 } : p
        );
      }
      toast.success("Producto agregado al carrito");
      return [...prev, { ...producto, cantidad: 1 }];
    });
  };

  const removeFromCart = (id) => {
    setCarrito((prev) => prev.filter((p) => p.id !== id));
    toast.warn("Producto eliminado del carrito");
  };

  const clearCart = () => {
    setCarrito([]);
    toast.error("Carrito vaciado");
  };

  const total = carrito.reduce((acc, p) => acc + p.precio * p.cantidad, 0);

  return (
    <CarritoContext.Provider
      value={{ carrito, addToCart, removeFromCart, clearCart, total }}
    >
      {children}
    </CarritoContext.Provider>
  );
}

export const useCarrito = () => useContext(CarritoContext);