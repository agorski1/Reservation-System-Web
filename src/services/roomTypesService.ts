import api from "../utils/api";
import type {RoomType} from "../models/RoomType.ts";
import type { AvailableRoomType } from "../models/AvailableRoomType";
import { toLocalDateTime } from "../utils/date";

export const getRoomTypes = async (): Promise<RoomType[]> => {
    const response = await api.get("/room-type");
    return response.data;
};

export const getRoomTypeById = async (id: number): Promise<RoomType> => {
    const response = await api.get(`/room-type/${id}`);
    return response.data;
};

export const getAvailableRoomTypes = async (params?: {
    from?: string;
    to?: string;
    capacity?: number[];
    minPrice?: number;
    maxPrice?: number;
    amenities?: string[];
}): Promise<AvailableRoomType[]> => {
    const formattedParams = {
        ...params,
        from: toLocalDateTime(params?.from, 14),
        to: toLocalDateTime(params?.to, 12),
    };

    const response = await api.get<AvailableRoomType[]>("/room-type/available", {
        params: formattedParams,
    });

    return response.data;
};
