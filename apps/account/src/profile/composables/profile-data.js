import { api } from '../../api/user-api.js';

export const getProfileData = async () => await api.getUser();
