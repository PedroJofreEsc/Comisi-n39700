//agregar status (200 500 404)y try y catch 
import express from "express"
import ProductManager from "./ProductManager.js"
import { engine } from "express-handlebars"
import cartsRouter from "./routes/cart.router.js";
import productsRouter from "./routes/product.router.js"
import __dirname from "./utils.js";
import { Server } from "socket.io";
// Debemos crear nuestra propia variable __dirname a través de este método si usamos ESM
const app = express();
app.use(express.static(__dirname + "/../public"));

app.use(express.json());

const manager = new ProductManager("./src/products.json")

app.engine('handlebars', engine());
app.set('view engine', 'handlebars');
app.set('views', __dirname + '/views');

/* app.get("/", async (req, res) => {
    const products = await manager.getProducts();

    res.render("home", { products })
}) */
const httpServer = app.listen(8080, () => {
    console.log("server en local 8080")
});
const io = new Server(httpServer)

io.on("connection", (socket) => {
    console.log("new cliet connected")

    socket.on("message", (data) => {
        console.log(data)
    })

    setInterval(() => {
        socket.emit("",)
    }, 2000);
})

app.use(function (req, res, next) {
    req.io = io;
    next();
});

app.use("/api/carts", cartsRouter);
app.use("/api/products", productsRouter);
