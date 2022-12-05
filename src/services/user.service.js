import InitAxios from './InitAxios.service';

class UserAPI extends InitAxios {
    constructor() {
        super('user');
    }
    createUser(body) {
        return this.axios.post(`/new`, body).then((response) => response.data);
    }
}

export default new UserAPI();