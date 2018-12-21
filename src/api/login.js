import axios from '@/utils/axios';

export const login = (params) => axios.post(`login`, params);