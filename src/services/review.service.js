import InitAxios from './InitAxios.service';

class ReviewAPI extends InitAxios {
    constructor() {
        super('review');
    }
    newReview(body) {
        return this.axios.post(`/new`, body)
            .then((response) => response.data)
            .catch({ error: "error" });
    }

}
export default new ReviewAPI();