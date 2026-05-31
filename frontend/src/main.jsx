import React, { useEffect, useState } from "react";
import { createRoot } from "react-dom/client";

function App() {
  const [productos, setProductos] = useState([]);
  const [mensaje, setMensaje] = useState("Cargando datos...");

  useEffect(() => {
    fetch("http://localhost:3000/api/productos")
      .then((res) => res.json())
      .then((data) => {
        setMensaje(data.mensaje);
        setProductos(data.productos);
      })
      .catch((error) => {
        setMensaje("Error al consumir el Back-End");
        console.error(error);
      });
  }, []);

  return (
    <div style={{ fontFamily: "Arial", padding: "30px" }}>
      <h1>Front-End funcionando</h1>
      <h2>{mensaje}</h2>

      <table border="1" cellPadding="10">
        <thead>
          <tr>
            <th>ID</th>
            <th>Producto</th>
            <th>Precio</th>
          </tr>
        </thead>
        <tbody>
          {productos.map((producto) => (
            <tr key={producto.id}>
              <td>{producto.id}</td>
              <td>{producto.nombre}</td>
              <td>${producto.precio}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

createRoot(document.getElementById("root")).render(<App />);