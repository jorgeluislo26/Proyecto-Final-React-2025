import { createContext, useContext, useEffect, useState } from "react";
import { listProductos } from "../services/api";

const ProductosContext = createContext(null);

export function ProductosProvider({ children }) {
  const [productos, setProductos] = useState([]);

  useEffect(() => {
    listProductos().then(setProductos);
  }, []);

  return (
    <ProductosContext.Provider value={{ productos, setProductos }}>
      {children}
    </ProductosContext.Provider>
  );
}

export const useProductos = () => useContext(ProductosContext);