import { differenceInDays, parseISO } from 'date-fns';

export const calculateNights = (from: string, to: string): number => {
    if (!from || !to) return 0;
    return differenceInDays(parseISO(to), parseISO(from));
};

export const calculateTotalPrice = (pricePerNight: number, nights: number): number => {
    return pricePerNight * nights;
};