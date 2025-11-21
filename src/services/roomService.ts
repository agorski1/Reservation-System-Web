import api from "../utils/api";
import { toLocalDateTime } from "../utils/date";
import type { AvailableRoom } from "../models/AvailableRoom";

export const roomService = {
  getAvailableRooms: async (
    roomTypeId: number,
    from: string,
    to: string
  ): Promise<AvailableRoom[]> => {
    const response = await api.get<AvailableRoom[]>("/rooms/available", {
      params: {
        roomTypeId,
        from: toLocalDateTime(from, 14),
        to: toLocalDateTime(to, 12),
      },
    });
    return response.data;
  },
};