import InitAxios from "./InitAxios.service";

class OrderAPI extends InitAxios {
    constructor() {
        super('orders');
    }
    newOrder(body) {
        console.log(body)
        return this.axios.post(`/new`, body)
            .then((response) => response.data)
            .catch({ error: "error" });
    }
}
export default new OrderAPI();