import { CreatEventPayload, EventNameAndIdResponse, EventResponse } from '../types/event';
import { ResultModel } from '../types/resultModel';
import apiClient from './apiClient';

const createEvent = (dto: CreatEventPayload) =>
    apiClient.post<ResultModel<EventResponse>>('api/v1/event/create', dto);

const getActiveEvent = () => apiClient.get<ResultModel<EventNameAndIdResponse | null>>('api/v1/event/active-event');

const validateEventName = (eventName: string) =>
    apiClient.get<ResultModel<boolean>>(`api/v1/event/validate-name?name=${eventName}`);

export const EventService = {
    getActiveEvent,
    createEvent,
    validateEventName,
};
