import React, { useEffect, useState } from "react";
import { listProductos } from "../services/api";
import ProductoForm from "../components/ProductoForm";
import ProductoList from "../components/ProductoList";
import SearchBar from "../components/SearchBar";
import Pagination from "../components/Pagination";

function Admin() {
  const [productos, setProductos] = useState([]);
  const [busqueda, setBusqueda] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const productosPorPagina = 5;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await listProductos();
        setProductos(data);
      } catch (err) {
        console.error("Error al obtener productos:", err);
      }
    };
    fetchData();
  }, []);

  // Filtrar productos según búsqueda
  const productosFiltrados = productos.filter((p) =>
    p.nombre.toLowerCase().includes(busqueda.toLowerCase())
  );

  // Paginación
  const totalPages = Math.ceil(productosFiltrados.length / productosPorPagina);
  const indexOfLast = currentPage * productosPorPagina;
  const indexOfFirst = indexOfLast - productosPorPagina;
  const productosPaginados = productosFiltrados.slice(indexOfFirst, indexOfLast);

  return (
    <div className="container mt-4">
      <h2 className="mb-3">Panel de administración</h2>
      <SearchBar onSearch={setBusqueda} />
      <ProductoForm setProductos={setProductos} />
      <ProductoList productos={productosPaginados} setProductos={setProductos} />
      <Pagination
        totalPages={totalPages}
        currentPage={currentPage}
        onPageChange={setCurrentPage}
      />
    </div>
  );
}

export default Admin;