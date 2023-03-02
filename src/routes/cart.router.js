import { Router } from "express";
import { urlencoded } from "express";
import CartManager from "../CartManager.js";

const cartsRouter = Router();
cartsRouter.use(urlencoded({ extended: true }));

const manager = new CartManager("./src/cart.json")

cartsRouter.get("/", async (req, res) => {

    res.send(await manager.getCart());
});

cartsRouter.get("/:cid", async (req, res) => {
    const { cid } = req.params

    res.send(await manager.getCartById(+cid));
});

cartsRouter.post("/", async (req, res) => {

    await manager.addCart()
    res.send("carro agregado")

})
cartsRouter.post("/:cid/product/:pid", async (req, res) => {
    const { cid, pid } = req.params
    await manager.updateCart(+cid, +pid)
    res.send("carro actualizado")

})
export default cartsRouter