import axios from 'axios';

const instance = axios.create({
    baseURL: import.meta.env.VITE_BASE_API_URL
});

/**
 * todo: interceptors
 */

instance.defaults.params = {
    'locale': 'de',
    'populate': '*'
};


export default instance;