import { differenceInDays, parseISO, setHours, setMinutes, setSeconds, format } from 'date-fns';

export const calculateNights = (from: string, to: string): number => {
    if (!from || !to) return 0;
    return differenceInDays(parseISO(to), parseISO(from));
};

export const calculateTotalPrice = (pricePerNight: number, nights: number): number => {
    return pricePerNight * nights;
};

export function toLocalDateTime(date?: string, hour = 0, minute = 0): string | undefined {
    if (!date) return undefined;
    const parsed = parseISO(date);
    const withTime = setSeconds(setMinutes(setHours(parsed, hour), minute), 0);
    return format(withTime, "yyyy-MM-dd'T'HH:mm:ss");
}