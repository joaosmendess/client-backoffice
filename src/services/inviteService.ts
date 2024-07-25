import api from './apiClient';

import {  Invite } from '../types';


export const inviteUser = async (invitationEmail:string, companyId:number): Promise<Invite> => {
    const response = await api.post('/auth/invite', {invitationEmail, companyId});
    return response.data; 
}