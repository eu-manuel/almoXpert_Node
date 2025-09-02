const express = require("express");
const cors = require("cors");
require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.json());

// Rotas
const userRoutes = require("./routes/userRoutes");
const itemRoutes = require("./routes/itemRoutes");
app.use("/api/users", userRoutes);
app.use("/api/items", itemRoutes);

app.listen(process.env.PORT || 3000, () => {
  console.log(`Servidor rodando na porta ${process.env.PORT || 3000}`);
});
