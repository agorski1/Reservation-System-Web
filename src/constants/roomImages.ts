import economy from '../assets/rooms/economy.jpg';
import standard from '../assets/rooms/standard.jpg';
import deluxeSingle from '../assets/rooms/deluxe-single.jpg';
import deluxeDouble from '../assets/rooms/deluxe-double.jpg';
import family from '../assets/rooms/family.jpg';
import suite from '../assets/rooms/suite.jpg';

export const roomImages = {
    Economy: economy,
    Standard: standard,
    DeluxeSingle: deluxeSingle,
    DeluxeDouble: deluxeDouble,
    Family: family,
    Suite: suite,
} as const;

export type RoomImageKey = keyof typeof roomImages;
