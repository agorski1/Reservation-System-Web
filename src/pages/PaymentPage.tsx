import { useParams, useNavigate } from 'react-router-dom';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import {
  Container,
  CircularProgress,
  Alert,
  Typography,
  Button,
  Box,
  TextField,
} from '@mui/material';
import api from '../utils/api';
import type { UserReservation } from '../models/UserReservation';
import { useState } from 'react';

export default function PaymentPage() {
  const { reservationId } = useParams<{ reservationId: string }>();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const id = Number(reservationId);
  const [paymentAmount, setPaymentAmount] = useState<string>('');
  const [errorAmount, setErrorAmount] = useState<string>('');

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
          {error?.message?.includes('403')
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
          Ta rezerwacja nie może być opłacona<br />
          Status: <strong>{reservation.status}</strong>
          {reservation.remainingAmount <= 0 && ' – już w pełni opłacona'}
        </Alert>
        <Button variant="contained" size="large" onClick={() => navigate('/my-reservations')} sx={{ mt: 4 }}>
          Wróć do moich rezerwacji
        </Button>
      </Container>
    );
  }

  const remaining = reservation.remainingAmount;

  const handlePayment = () => {
    const amount = Number(paymentAmount);

    if (!paymentAmount || isNaN(amount) || amount <= 0) {
      setErrorAmount('Wpisz prawidłową kwotę');
      return;
    }
    if (amount > remaining) {
      setErrorAmount(`Maksymalna kwota to ${remaining} PLN`);
      return;
    }

    setErrorAmount('');

    const payload = {
      reservationId: reservation.reservationId,
      amount: amount,
      paymentMethod: 'TRANSFER',
    };

    api
      .post('/payments/process', payload)
      .then(() => {
        alert(`Płatność ${amount} PLN przyjęta! Dziękujemy!`);

        queryClient.invalidateQueries({ queryKey: ['myReservations'] });
        queryClient.invalidateQueries({ queryKey: ['myReservations', 'active'] });
        queryClient.invalidateQueries({ queryKey: ['myReservations', 'all'] });
        queryClient.invalidateQueries({ queryKey: ['reservation', id] });

        navigate('/my-reservations');
      })
      .catch((err) => {
        alert('Błąd płatności: ' + (err.response?.data?.message || err.message));
      });
  };

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
          <strong>Pozostało do zapłaty: {remaining} PLN</strong>
        </Typography>
      </Box>

      <Box sx={{ mt: 6, maxWidth: 400, mx: 'auto' }}>
        <TextField
          label="Kwota do wpłaty (PLN)"
          value={paymentAmount}
          onChange={(e) => setPaymentAmount(e.target.value)}
          fullWidth
          type="number"
          inputProps={{ min: 1, max: remaining, step: '1' }}
          error={!!errorAmount}
          helperText={errorAmount || `Maksymalnie ${remaining} PLN`}
          sx={{ mb: 3 }}
        />

        <Button
          variant="contained"
          size="large"
          color="success"
          fullWidth
          sx={{ py: 2, fontSize: '1.4rem' }}
          onClick={handlePayment}
        >
          WPŁAĆ {paymentAmount || '0'} PLN
        </Button>

        <Button
          variant="outlined"
          fullWidth
          sx={{ mt: 2 }}
          onClick={() => setPaymentAmount(remaining.toString())}
        >
          Wpłać całą kwotę ({remaining} PLN)
        </Button>
      </Box>

      <Box sx={{ textAlign: 'center', mt: 6 }}>
        <Button variant="text" onClick={() => navigate('/my-reservations')}>
          Anuluj i wróć do rezerwacji
        </Button>
      </Box>
    </Container>
  );
}