export interface AvailableRoomType {
    id: number;
    name: string;
    capacity: number;
    pricePerNight: number;
    totalPrice: number;
    description: string;
    amenities: string[];
}
