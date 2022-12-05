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
}

export default new ProductAPI();