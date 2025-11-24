export interface UserReservation {
    reservationId: number;
    roomNumber: number;
    roomType: String;
    from: string;
    to: string;
    status: string;
    totalPrice: number;
    paidAmount: number;
    remainingAmount: number;
}