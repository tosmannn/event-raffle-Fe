import { RaffleDto } from '../types/raffle';
import { ResultModel } from '../types/resultModel';
import apiClient from './apiClient';

const drawWinner = (eventId: string) =>
    apiClient.get<ResultModel<RaffleDto>>(`api/v1/raffle/draw/${eventId}`);

export const RaffleService = {
    drawWinner,
};
