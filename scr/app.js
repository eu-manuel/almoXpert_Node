const express = require("express");
const cors = require("cors");
require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.json());

// Rotas
const userRoutes = require("./routes/userRoutes");
const itemRoutes = require("./routes/itemRoutes");
const authRoutes = require("./routes/authRoutes");
const categoryRoutes = require("./routes/categoryRoutes");
const supplierRoutes = require("./routes/supplierRoutes");
const WarehouseRoutes = require("./routes/warehouseRoutes");
const movementRoutes = require("./routes/movementRoutes");
const permissionsRoutes = require("./routes/permissionRoutes");


//tabelas de relacionamento
const itemCategoryRoutes = require("./routes/itemCategoryRoutes");
const itemSupplierRoutes = require("./routes/itemSupplierRoutes");
const itemWarehouseRoutes = require("./routes/itemWarehouseRoutes");
const userPermissionRoutes = require("./routes/userPermissionRoutes");


app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/items", itemRoutes);
app.use("/api/category", categoryRoutes);
app.use("/api/supplier", supplierRoutes);
app.use("/api/moviment", movementRoutes);
app.use("/api/warehouse", WarehouseRoutes);
app.use("/api/permissions", permissionsRoutes);

//tabelas de relacionamento
app.use("/api/item-categories", itemCategoryRoutes);
app.use("/api/item-suppliers", itemSupplierRoutes);
app.use("/api/item-warehouses", itemWarehouseRoutes);
app.use("/api/user-permissions", userPermissionRoutes);



app.listen(process.env.PORT || 3000, () => {
  console.log(`Servidor rodando na porta ${process.env.PORT || 3000}`);
});
