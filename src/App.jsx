import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import CarritoPage from "./pages/CarritoPage";
import Admin from "./pages/Admin";
import Login from "./pages/Login";

import { CarritoProvider } from "./context/CarritoContext";
import { ProductosProvider } from "./context/ProductosContext";
import { AuthProvider } from "./context/AuthContext";
import ProtectedRoute from "./routes/ProtectedRoute";

function App() {
  return (
    <AuthProvider>
      <ProductosProvider>
        <CarritoProvider>
          <Router>
            <Navbar />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/carrito" element={<CarritoPage />} />
              <Route path="/login" element={<Login />} />
              <Route
                path="/admin"
                element={
                  <ProtectedRoute>
                    <Admin />
                  </ProtectedRoute>
                }
              />
            </Routes>
            <ToastContainer position="top-right" autoClose={2500} />
          </Router>
        </CarritoProvider>
      </ProductosProvider>
    </AuthProvider>
  );
}

export default App;