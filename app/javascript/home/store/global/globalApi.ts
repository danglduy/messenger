import axios, { AxiosResponse } from 'axios';
import { User } from '../sidebar/sidebarSlice';

export const fetchCurrentUserApi: () => Promise<
  AxiosResponse<{ data: User }>
> = async () => {
  return await axios.get(`/api/users/me`);
};

export const logoutApi: () => Promise<void> = async () => {
  const csrfToken = (
    document.getElementsByName('csrf-token')[0] as HTMLMetaElement
  ).content;

  try {
    return await axios.delete('/logout', {
      headers: { 'X-CSRF-Token': csrfToken },
    });
  } catch {} // There were something wrong with axios after logout
};
