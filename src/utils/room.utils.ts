import { roomImages, type RoomImageKey } from '../constants/roomImages';

const getImageKey = (type: string, capacity: number): RoomImageKey => {
  if (type === 'Deluxe') {
    return capacity === 1 ? 'DeluxeSingle' : 'DeluxeDouble';
  }

  const map: Partial<Record<string, RoomImageKey>> = {
    Economy: 'Economy',
    Standard: 'Standard',
    Family: 'Family',
    Suite: 'Suite',
  };

  return map[type] ?? 'Standard';
};

export const getRoomImage = (type: string, capacity: number): string => {
  return roomImages[getImageKey(type, capacity)];
};

export const formatRoomName = (type: string, capacity: number): string => {
  if (type === 'Deluxe') return `Deluxe ${capacity}-osobowy`;
  return type;
};