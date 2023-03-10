import { Router, json } from "express";
import { urlencoded } from "express";
import ProductManager from "../ProductManager.js";

const productsRouter = Router();
productsRouter.use(json())
productsRouter.use(urlencoded({ extended: true }))
const manager = new ProductManager("./src/products.json")


productsRouter.get("/", async (req, res) => {

    const products = await manager.getProducts();

    req.io.emit("update", products)
    res.render("home", { products })
    /*  const { limit } = req.query
 
     const allProduct = await manager.getProducts()
 
     if (limit) {
         const product = allProduct.slice(0, Number(limit))
         return (res.send(product))
     }
     res.send(allProduct) */
});

/* productsRouter.get("/:pid", async (req, res) => {
    const { pid } = (req.params);
    const product = await manager.getProductById(+pid)
    res.send(product)
}); */

productsRouter.post("/", async (req, res) => {

    const { title, description, price, code, stock, category } = { ...req.body }

    await manager.addProduct(title, description, price, code, stock, category)
    const products = await manager.getProducts();
    req.io.emit("update", products)

    res.send()
})

productsRouter.delete("/:pid", async (req, res) => {
    req.io.emit("update", "qwe")
    const { pid } = (req.params);
    await manager.deleteProduct(+pid)
    const products = await manager.getProducts();

    req.io.emit("update", products)
    res.send("producto eliminado")
})

productsRouter.put("/:pid", async (req, res) => {
    console.log("put")
    const { pid } = (req.params);
    const campo = { ...req.body }
    await manager.updateProduct(+pid, campo)
    const products = await manager.getProducts();
    req.io.emit("update", products)
    res.send("id modificado")
})

productsRouter.get("/real-time-products", async (req, res) => {
    const products = await manager.getProducts();
    res.render("real_time_products", { products })
})

export default productsRouter 