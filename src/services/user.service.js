import InitAxios from "./InitAxios.service";


class UserAPI extends InitAxios {
    constructor() {
        super('user');
    }
    createUser(body) {
        return this.axios.post(`/user/new`, body)
    }
}

export default new UserAPI();