import InitAxios from './InitAxios.service';

class UserAPI extends InitAxios {
    constructor() {
        super('user');
    }
    me(token) {
        return this.axios.get('/me', {
            headers: {
                'authorization': `Bearer ${token}`
            }
        }).then((response) => response.data);
    }
    createUser(body) {
        return this.axios.post(`/new`, body)
            .then((response) => response.data)
            .catch({ error: "error" });
    }
    login(body) {
        return this.axios.post('/login', body)
            .then((response) => response.data)
            .catch((response) => response.data);
    }
}
export default new UserAPI();