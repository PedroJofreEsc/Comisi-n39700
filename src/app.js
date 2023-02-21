import express from "express"
import ProductManager from "./ProductManager.js"

const app = express();

const manager = new ProductManager("./src/manager.json")

app.get("/", async (req, res) => {

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


})

app.listen(8080, () => {
    console.log("server en local 8080")
})