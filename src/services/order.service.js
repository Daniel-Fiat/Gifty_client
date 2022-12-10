import InitAxios from "./InitAxios.service";

class OrderAPI extends InitAxios {
    constructor() {
        super('orders');
    }
    newOrder(body) {
        return this.axios.post(`/new`, body)
            .then((response) => response.data)
            .catch({ error: "error" });
    }
    getBySeller(id) {
        return this.axios.get(`/seller/${id}`)
            .then((response) => response.data)
            .catch({ error: "error" })
    }
    getByClient(id) {
        return this.axios.get(`/client/${id}`)
            .then((response) => response.data)
            .catch({ error: "error" })
    }
}
export default new OrderAPI();