const axios = require('axios').default;

const post = (url, data) =>{
    return axios.post(url, data);
}
const get = (url, data) =>{
    return axios.get(url, data);
}
module.exports = {post, get};