import InitAxios from "./InitAxios.service";

class ProductAPI extends InitAxios {
    constructor() {
        super('products');
    }

    getAllproduct() {
        return this.axios.get(`/`)
            .then((response) => response.data)
            .catch({ error: "error" });
    }

    getCatalog(id) {
        return this.axios.get(`/catalog/${id}`)
            .then(response => response.data)
            .catch({ error: "error" });
    }

    createProduct(body) {
        return this.axios.put('/new', body)
            .then(response => response.data)
            .catch({ error: "error" });
    }

    updateProduct(body, idProduct) {
        console.log(body, idProduct)
        return this.axios.put(`/edit/${idProduct}`, body)
            .then(response => response.data)
            .catch({ error: "error" });
    }

    getOneProduct(productid) {
        return this.axios.get(`/${productid}`)
            .then(response => response.data)
            .catch({ error: "error" });
    }
    deleteOneProduct(productid) {
        return this.axios.delete(`/delete/${productid}`)
            .then(response => response.data)
            .catch({ error: "error" });
    }
}

export default new ProductAPI();