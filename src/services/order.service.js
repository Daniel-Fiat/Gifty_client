import InitAxios from "./InitAxios.service";

class OrderAPI extends InitAxios {
    constructor() {
        super('order');
    }
    newReview(body) {
        // const { price, sellerUser, clientUser, productID, deliveryAddress } = req.body
        return this.axios.post(`/new`, body)
            .then((response) => response.data)
            .catch({ error: "error" });
    }
}
export default new OrderAPI();