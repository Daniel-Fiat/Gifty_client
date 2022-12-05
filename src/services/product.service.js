import InitAxios from "./InitAxios.service";

class ProductAPI extends InitAxios {
    constructor() {
        super('products');
    }
}

export default new ProductAPI();