import axios from '@/utils/axios';

export const fetchChatRecord = () => axios.get(`chatrecord`);