import api from '../utils/api';
import type { UserReservation } from '../models/UserReservation';

export const getMyReservations = async (): Promise<UserReservation[]> => {
    const response = await api.get<UserReservation[]>('/reservations/my');
    return response.data;
};

export const getMyCurrentReservations = async (): Promise<UserReservation[]> => {
    const response = await api.get<UserReservation[]>('/reservations/my/current');
    return response.data;
};

export const cancelReservation = async (reservationId: number): Promise<void> => {
    await api.patch(`/reservations/${reservationId}/cancel`);
};