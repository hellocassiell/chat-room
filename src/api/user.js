import axios from '@/utils/axios';

export const fetchUserList = () => axios.get(`userlist`);

export const fetchCurrUsers = () => axios.get(`currusers`);