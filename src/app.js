import express from "express"
import ProductManager from "./ProductManager.js"

import cartsRouter from "./routes/cart.router.js";
import productsRouter from "./routes/product.router.js"
import path from "path";
import { fileURLToPath } from "url";

// Debemos crear nuestra propia variable __dirname a través de este método si usamos ESM
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
app.use(express.json());

const manager = new ProductManager("./src/manager.json")

app.use("/api/carts", cartsRouter);
app.use("/api/products", productsRouter);


/* app.get("/", async (req, res) => {

    res.send(manager)
})

app.get("/products", async (req, res) => {
    const { limit } = req.query

    const allProduct = await manager.getProducts()

    if (limit) {
        const product = allProduct.splice(Number(limit))
        return (res.send(allProduct))
    }
    res.send(allProduct)
})

app.get("/products/:id", async (req, res) => {
    const { id } = (req.params);
    const product = await manager.getProductById(+id)
    res.send(product)


}) */

app.use(express.static(__dirname + "/../public"));

app.listen(8080, () => {
    console.log("server en local 8080")
})