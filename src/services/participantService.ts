import { ParticipantDto } from '../types/participant';
import { ResultModel } from '../types/resultModel';
import apiClient from './apiClient';

const createParticipants = (formData: FormData) =>
    apiClient.post<ResultModel<void>>('api/v1/participant/upload', formData, {
        headers: {
            'Content-Type': 'multipart/form-data',
        }
    });

const getParticipants = (eventId: string) =>
    apiClient.get<ResultModel<ParticipantDto[]>>(`api/v1/participant/event/${eventId}/participants`);

export const ParticipantService = {
    createParticipants,
    getParticipants
};
