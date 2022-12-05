import InitAxios from "./InitAxios.service";

class UserAPI extends InitAxios {
    constructor() {
        super('user');
    }
    createUser(username, email, password) {
        return axios.post(`/user/new`, body)
    }
}

export default new UserAPI();