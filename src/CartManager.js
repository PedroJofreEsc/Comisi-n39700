import fs from "fs"

class CartManager {
    #path;
    cid;


    constructor(path) {
        this.cid = 0;

        this.#path = path;

    }

    async getCart() {
        try {
            const products = await fs.promises.readFile(this.#path, "utf-8")
            return JSON.parse(products)
        }
        catch (error) {
            return error;

        }
    }

    async addCart() {
        const cart = await this.getCart();
        const cartLen = cart.length;

        const newCart = {
            cid: cartLen + 1,
            products: []
        };
        this.cid += 1



        const updateCart = [...cart, newCart]

        await fs.promises.writeFile(this.#path, JSON.stringify(updateCart))

    }


    async getCartById(cid) {
        const carts = await this.getCart();


        const cart = carts.find((p) => p.cid === cid
        )
        if (cart) {
            return cart
        } else {
            return "ERROR: CARRITO NO ENCONTRADO"
        }
    }


    async updateCart(cid, productId) {
        const carts = await this.getCart();
        const indexCart = carts.findIndex((p) => p.cid === cid)
        console.log(indexCart)
        const cart = await this.getCartById(cid);
        console.log(cart)
        const cartProducts = cart.products;
        console.log(cartProducts)
        const productIndex = cartProducts.findIndex((p) => p.id = productId)
        console.log(productIndex)
        //chequear si se tiene el producto en el carro 
        if (productIndex >= 0) {
            cartProducts[productIndex].quantity += 1
        } else {
            cartProducts.push({
                id: productId,
                quantity: 0
            })
        }

        const updateCart = { ...cart, products: cartProducts }
        console.log(updateCart)
        const updateCartList = carts.filter(c => c.cid !== cid)
        updateCartList.push(updateCart)
        console.log(updateCartList)
        if (indexCart >= 0) {
            await fs.promises.writeFile(this.#path, JSON.stringify(updateCartList))
        } else {
            return console.log('Not found')
        }
    }


}

export default CartManager