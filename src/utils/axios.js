import axios from 'axios';

const instance = axios.create({
    withCredentials: true,
    timeout: 30000
  });

export default instance;