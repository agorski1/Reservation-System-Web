// src/pages/PaymentPage.tsx
import { useParams, useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { Container, CircularProgress, Alert, Typography, Button, Box } from '@mui/material';
import api from '../utils/api';
import type { UserReservation } from '../models/UserReservation';

export default function PaymentPage() {
  const { reservationId } = useParams<{ reservationId: string }>();
  const navigate = useNavigate();

  const id = Number(reservationId);

  if (!reservationId || isNaN(id)) {
    return (
      <Container sx={{ py: 10, textAlign: 'center' }}>
        <Alert severity="error">Nieprawidłowe ID rezerwacji!</Alert>
        <Button onClick={() => navigate('/my-reservations')} sx={{ mt: 2 }}>
          Wróć do rezerwacji
        </Button>
      </Container>
    );
  }

  const { data: reservation, isLoading, error } = useQuery<UserReservation>({
    queryKey: ['reservation', id],
    queryFn: () => api.get(`/reservations/${id}`).then(res => res.data),
    enabled: !!id,
    retry: 1,
  });

  if (isLoading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '80vh' }}>
        <CircularProgress size={60} />
        <Typography sx={{ ml: 2 }}>Ładowanie rezerwacji...</Typography>
      </Box>
    );
  }

  if (error || !reservation) {
    return (
      <Container sx={{ py: 10, textAlign: 'center' }}>
        <Alert severity="error">
          {error?.message.includes('403')
            ? 'Nie masz dostępu do tej rezerwacji'
            : 'Nie znaleziono rezerwacji lub została anulowana'}
        </Alert>
        <Button variant="contained" onClick={() => navigate('/my-reservations')} sx={{ mt: 3 }}>
          Wróć do moich rezerwacji
        </Button>
      </Container>
    );
  }

  if (reservation.status === 'Cancelled' || reservation.status === 'Rejected' || reservation.remainingAmount <= 0) {
    return (
      <Container sx={{ py: 10, textAlign: 'center' }}>
        <Alert severity="warning" sx={{ fontSize: '1.4rem' }}>
          Ta rezerwacja nie może być opłacona
          <br />
          Status: <strong>{reservation.status}</strong>
          {reservation.remainingAmount <= 0 && ' – już w pełni opłacona'}
        </Alert>
        <Button variant="contained" size="large" onClick={() => navigate('/my-reservations')} sx={{ mt: 4 }}>
          Wróć do moich rezerwacji
        </Button>
      </Container>
    );
  }

    return (
        <Container maxWidth="md" sx={{ py: 8 }}>
            <Typography variant="h3" gutterBottom align="center" color="primary">
                Opłać rezerwację #{reservation.reservationId}
            </Typography>

            <Box sx={{ mt: 4, p: 4, backgroundColor: '#f9f9f9', borderRadius: 2 }}>
                <Typography><strong>Pokój:</strong> {reservation.roomNumber}</Typography>
                <Typography><strong>Od:</strong> {new Date(reservation.from).toLocaleString()}</Typography>
                <Typography><strong>Do:</strong> {new Date(reservation.to).toLocaleString()}</Typography>
                <Typography variant="h5" sx={{ mt: 3, color: 'error.main' }}>
                    <strong>Pozostało do zapłaty: {reservation.remainingAmount} PLN</strong>
                </Typography>
            </Box>

            <Box sx={{ textAlign: 'center', mt: 6 }}>
                <Button
                    variant="contained"
                    size="large"
                    color="success"
                    sx={{ px: 10, py: 2.5, fontSize: '1.6rem', borderRadius: 3 }}
                    onClick={() => {
                        // SYMULACJA PŁATNOŚCI – W 3 SEKUNDY POKAŻE SUKCES
                        const payload = {
                            reservationId: reservation.reservationId,
                            amount: reservation.remainingAmount,
                            paymentMethod: "TRANSFER"
                        };

                        api.post('/payments/process', payload)
                            .then(() => {
                                alert('PŁATNOŚĆ PRZYJĘTA! Rezerwacja opłacona!');
                                navigate('/my-reservations');
                            })
                            .catch((err) => {
                                alert('Błąd płatności: ' + (err.response?.data?.message || err.message));
                            });
                    }}
                >
                    OPŁAĆ TERAZ – {reservation.remainingAmount} PLN
                </Button>
            </Box>

            <Box sx={{ textAlign: 'center', mt: 4 }}>
                <Button variant="outlined" onClick={() => navigate('/my-reservations')}>
                    Anuluj i wróć
                </Button>
            </Box>
        </Container>
    );
}