import axios from 'axios';

class UserAPI {
    constructor() {
        this.axios = axios;
    }
    createUser(body) {
        console.log(body)
        return this.axios.post(`http://localhost:5005/user/new`, body).then(() => { })
    }
}

export default new UserAPI();