import axios from 'axios';

class InitAxios {
    constructor(path) {
        this.axios = axios.create({
            baseUrl: `http://localhost:5005/api/${path}`
        });
    }
}

export default InitAxios;