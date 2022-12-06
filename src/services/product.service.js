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
}

export default new ProductAPI();