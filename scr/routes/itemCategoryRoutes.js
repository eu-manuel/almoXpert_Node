const express = require("express");
const router = express.Router();
const itemCategoryController = require("../controllers/itemCategoryController");

router.get("/", itemCategoryController.getAllRelations);
router.post("/", itemCategoryController.addRelation);
router.delete("/", itemCategoryController.removeRelation);

module.exports = router;
