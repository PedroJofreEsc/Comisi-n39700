import fs from "fs"



class ProductManager {
    #path;
    id = 0;


    constructor(path) {

        this.#path = path;

    }

    async getProducts() {
        try {
            const products = await fs.promises.readFile(this.#path, "utf-8")
            return JSON.parse(products)
        }
        catch (error) {
            return error;

        }
    }

    async addProduct(title, description, price, thumbnail, code, stock) {
        const products = await this.getProducts();
        if (!title || !description || !price || !thumbnail || !stock || !code) { return console.log('falto un atributo ') }


        if (products.find(prod => prod.code === code)) {
            return console.log('code ya utilizado ')
        }

        const newProduct = {
            title,
            description,
            price,
            thumbnail,
            code,
            id: this.id,
            stock
        };
        this.id += 1


        const updateProducts = [...products, newProduct]

        await fs.promises.writeFile(this.#path, JSON.stringify(updateProducts))

    }


    async getProductById(id) {
        const products = await this.getProducts()


        const product = products.find((p) => p.id === id
        )
        if (product) {
            return product
        } else {
            return "ERROR: ID NO ENCONTRADA"
        }
    }

    async updateProduct(id, campo) {
        const products = await this.getProducts()
        const indexProduct = products.findIndex((p) => p === id)
        const product = this.getProductById(id)
        const updateProduct = { ...product, campo }
        const updateProductsList = products.splice(indexProduct, 1)
        updateProductsList.push(updateProduct)
        if (indexProduct) {
            await fs.promises.writeFile(this.#path, JSON.stringify({ updateProductsList }))
        } else {
            return console.log('Not found')
        }


    }

    async deleteProduct(id) {
        const products = await this.getProducts()
        const indexProduct = products.findIndex((p) => p === id)
        const productUpdate = products.splice(indexProduct, 1);
        if (indexProduct) {
            await fs.promises.writeFile(this.#path, JSON.stringify(productUpdate))
        } else {
            return console.log('Not found')
        }

    }
}

export default ProductManager