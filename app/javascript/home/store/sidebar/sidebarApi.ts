import axios from 'axios';

export const fetchUsersApi = async () => {
  return await axios.get('/api/users');
};
