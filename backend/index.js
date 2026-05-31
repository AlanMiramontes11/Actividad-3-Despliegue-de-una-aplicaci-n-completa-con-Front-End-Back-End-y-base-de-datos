const express = require("express");
const cors = require("cors");
const { Pool } = require("pg");

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

const pool = new Pool({
  host: "db",
  user: "admin",
  password: "12345",
  database: "appdb",
  port: 5432
});

app.get("/", (req, res) => {
  res.json({
    mensaje: "Back-End funcionando correctamente"
  });
});

app.get("/api/productos", async (req, res) => {
  try {
    await pool.query(`
      CREATE TABLE IF NOT EXISTS productos (
        id SERIAL PRIMARY KEY,
        nombre VARCHAR(100),
        precio DECIMAL
      )
    `);

    const existe = await pool.query("SELECT COUNT(*) FROM productos");

    if (parseInt(existe.rows[0].count) === 0) {
      await pool.query(`
        INSERT INTO productos (nombre, precio) VALUES
        ('Laptop', 15000),
        ('Mouse', 250),
        ('Teclado', 600)
      `);
    }

    const productos = await pool.query("SELECT * FROM productos ORDER BY id ASC");

    res.json({
      mensaje: "Productos obtenidos desde PostgreSQL",
      productos: productos.rows
    });
  } catch (error) {
    res.status(500).json({
      error: "Error al conectar con la base de datos",
      detalle: error.message
    });
  }
});

app.listen(PORT, () => {
  console.log(`Back-End ejecutándose en puerto ${PORT}`);
});