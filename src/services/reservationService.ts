import api from '../utils/api';
import type { UserReservation } from '../models/UserReservation';
import {toLocalDateTime} from "../utils/date.ts";

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

export const makeReservation = async (data: {
  roomId: number;
  guestCount: number;
  from: string;
  to: string;
}): Promise<void> => {
  await api.post("/reservations", {
    roomId: data.roomId,
    guestCount: data.guestCount,
    from: toLocalDateTime(data.from, 14),
    to: toLocalDateTime(data.to, 12),
  });
};