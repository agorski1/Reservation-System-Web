import { useEffect, useState } from 'react';
import { useParams, useLocation, useNavigate } from 'react-router-dom';
import {
  Container,
  Grid,
  Card,
  CardMedia,
  CardContent,
  Typography,
  Button,
  TextField,
  MenuItem,
  Alert,
  Box,
  Chip,
  CircularProgress,
} from '@mui/material';
import { format } from 'date-fns';

import { getRoomImage, formatRoomName } from '../utils/room.utils';
import { roomService } from '../services/roomService';
import { makeReservation } from '../services/reservationService';
import type { AvailableRoomType } from '../models/AvailableRoomType';
import type { AvailableRoom } from '../models/AvailableRoom';

export default function CreateReservationPage() {
  const { roomTypeId } = useParams<{ roomTypeId: string }>();
  const { state } = useLocation();
  const navigate = useNavigate();

  const { from, to, roomType: passedRoom, guests: initialGuests = 1 } = (state as any) || {};

  const [roomType] = useState<AvailableRoomType | null>(passedRoom || null);
  const [availableRooms, setAvailableRooms] = useState<AvailableRoom[]>([]);
  const [selectedRoomId, setSelectedRoomId] = useState<number | ''>('');
  const [guests, setGuests] = useState<number>(initialGuests);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!from || !to || !roomTypeId || !roomType) {
      setError('Brak wymaganych danych rezerwacji');
      setLoading(false);
      return;
    }

    roomService.getAvailableRooms(Number(roomTypeId), from, to)
      .then(rooms => {
        setAvailableRooms(rooms);
        if (rooms.length > 0) setSelectedRoomId(rooms[0].id);
      })
      .catch(() => setError('Brak wolnych pokoi w wybranym terminie'))
      .finally(() => setLoading(false));
  }, [roomTypeId, from, to, roomType]);

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', my: 10 }}>
        <CircularProgress size={70} />
      </Box>
    );
  }

  if (error || !roomType) {
    return <Alert severity="error">{error || 'Nieprawidłowe dane'}</Alert>;
  }

  const nights = Math.ceil((new Date(to).getTime() - new Date(from).getTime()) / 86400000);
  const totalPrice = roomType.pricePerNight * nights;

  const handleConfirm = async () => {
    if (!selectedRoomId) return;

    try {
      await makeReservation({
        roomId: selectedRoomId,
        guestCount: guests,
        from,
        to,
      });

      navigate('/my-reservations', {
        state: { successMessage: 'Rezerwacja została pomyślnie utworzona!' },
      });
    } catch (err: any) {
      alert(err.response?.data?.message || 'Wystąpił błąd podczas rezerwacji');
    }
  };

  return (
    <Container maxWidth="lg" sx={{ py: { xs: 6, md: 10 } }}>
      <Typography variant="h3" fontWeight="bold" textAlign="center" gutterBottom>
        Potwierdź rezerwację
      </Typography>

      <Grid container spacing={5} component="div">
        {/* Zdjęcie i opis pokoju */}
        <Grid size={{ xs: 12, md: 6 }} component="div">
          <Card>
            <CardMedia
              component="img"
              height="380"
              image={getRoomImage(roomType.name, roomType.capacity)}
              alt={formatRoomName(roomType.name, roomType.capacity)}
              sx={{ objectFit: 'cover' }}
            />
            <CardContent>
              <Typography variant="h5" fontWeight="bold" gutterBottom>
                {formatRoomName(roomType.name, roomType.capacity)}
              </Typography>
              <Typography color="text.secondary" gutterBottom>
                Maksymalnie {roomType.capacity} {roomType.capacity === 1 ? 'osoba' : 'osoby'}
              </Typography>

              {roomType.description && (
                <Typography paragraph sx={{ mt: 2 }}>
                  {roomType.description}
                </Typography>
              )}

              <Box sx={{ mt: 3 }}>
                {roomType.amenities.map(amenity => (
                  <Chip key={amenity} label={amenity} sx={{ mr: 1, mb: 1 }} />
                ))}
              </Box>
            </CardContent>
          </Card>
        </Grid>

        <Grid size={{ xs: 12, md: 6 }} component="div">
          <Card sx={{ p: 4, height: '100%', display: 'flex', flexDirection: 'column' }}>
            <Typography variant="h6" gutterBottom>
              Wybierz pokój
            </Typography>

            <TextField
              select
              fullWidth
              value={selectedRoomId}
              onChange={e => setSelectedRoomId(Number(e.target.value))}
              label="Dostępny pokój"
              disabled={availableRooms.length === 0}
              sx={{ mb: 3 }}
            >
              {availableRooms.map(room => (
                <MenuItem key={room.id} value={room.id}>
                  Pokój nr {room.number}
                </MenuItem>
              ))}
            </TextField>

            <TextField
              select
              fullWidth
              label="Liczba gości"
              value={guests}
              onChange={e => setGuests(Number(e.target.value))}
              sx={{ mb: 4 }}
            >
              {Array.from({ length: roomType.capacity }, (_, i) => (
                <MenuItem key={i + 1} value={i + 1}>
                  {i + 1} {i + 1 === 1 ? 'osoba' : 'osoby'}
                </MenuItem>
              ))}
            </TextField>

            <Box sx={{ mb: 4 }}>
              <Typography>
                <strong>Przyjazd:</strong> {format(new Date(from), 'dd.MM.yyyy')}
              </Typography>
              <Typography>
                <strong>Wyjazd:</strong> {format(new Date(to), 'dd.MM.yyyy')}
              </Typography>
              <Typography>
                <strong>Ilość nocy:</strong> {nights}
              </Typography>
            </Box>

            <Box
              sx={{
                mt: 'auto',
                textAlign: 'right',
                p: 3,
                bgcolor: 'grey.100',
                borderRadius: 2,
              }}
            >
              <Typography variant="h4" fontWeight="bold" color="primary">
                {totalPrice} zł
              </Typography>
              <Typography variant="body2" color="text.secondary">
                całkowita cena pobytu
              </Typography>
            </Box>

            <Button
              variant="contained"
              size="large"
              fullWidth
              sx={{ mt: 4, py: 2 }}
              onClick={handleConfirm}
              disabled={!selectedRoomId}
            >
              Potwierdź i zapłać
            </Button>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
}