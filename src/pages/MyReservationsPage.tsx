import { useState, useEffect } from 'react';
import {
  Container,
  Typography,
  Box,
  ToggleButton,
  ToggleButtonGroup,
  Paper,
  Stack,
  Alert,
  CircularProgress,
} from '@mui/material';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import {
  getMyReservations,
  getMyCurrentReservations,
  cancelReservation,
} from '../services/reservationService';
import type { UserReservation } from '../models/UserReservation';
import ReservationCard from '../components/reservation/ReservationCard';

type ViewMode = 'all' | 'active';

export default function MyReservationsPage() {
  const [viewMode, setViewMode] = useState<ViewMode>('active');
  const queryClient = useQueryClient();

  const refreshAllReservations = () => {
    queryClient.invalidateQueries({ queryKey: ['myReservations'] });
    queryClient.invalidateQueries({ queryKey: ['myReservations', 'active'] });
    queryClient.invalidateQueries({ queryKey: ['myReservations', 'all'] });
    queryClient.invalidateQueries({ queryKey: ['reservation'] });
  };

  const {
    data: reservations = [],
    isLoading,
    error,
  } = useQuery<UserReservation[]>({
    queryKey: ['myReservations', viewMode],
    queryFn: viewMode === 'active' ? getMyCurrentReservations : getMyReservations,
    staleTime: 1000 * 30,
  });

  const cancelMutation = useMutation({
    mutationFn: cancelReservation,
    onSuccess: () => {
      refreshAllReservations();
    },
    onError: () => {
      alert('Nie udało się anulować rezerwacji. Spróbuj ponownie.');
    },
  });

  const handleCancel = (id: number) => {
    if (window.confirm('Czy na pewno chcesz anulować tę rezerwację?')) {
      cancelMutation.mutate(id);
    }
  };

  useEffect(() => {
    const handleFocus = () => {
      refreshAllReservations();
    };

    window.addEventListener('focus', handleFocus);
    return () => window.removeEventListener('focus', handleFocus);
  }, [queryClient, refreshAllReservations]);

  if (isLoading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', my: 12 }}>
        <CircularProgress size={70} />
      </Box>
    );
  }

  if (error) {
    return (
      <Alert severity="error" sx={{ m: 4 }}>
        Nie udało się załadować rezerwacji. Spróbuj odświeżyć stronę.
      </Alert>
    );
  }

  return (
    <Container maxWidth="md" sx={{ py: { xs: 6, md: 10 } }}>
      <Typography variant="h3" fontWeight="bold" textAlign="center" gutterBottom>
        Moje rezerwacje
      </Typography>

      <Box sx={{ display: 'flex', justifyContent: 'center', mb: 6 }}>
        <ToggleButtonGroup
          value={viewMode}
          exclusive
          onChange={(_, value) => value && setViewMode(value)}
          color="primary"
        >
          <ToggleButton value="active">Aktywne</ToggleButton>
          <ToggleButton value="all">Wszystkie</ToggleButton>
        </ToggleButtonGroup>
      </Box>

      {reservations.length === 0 ? (
        <Paper sx={{ p: 8, textAlign: 'center', bgcolor: 'grey.50' }}>
          <Typography variant="h6" color="text.secondary">
            {viewMode === 'active'
              ? 'Nie masz żadnych aktywnych rezerwacji'
              : 'Nie masz jeszcze żadnych rezerwacji'}
          </Typography>
        </Paper>
      ) : (
        <Stack spacing={4}>
          {reservations.map((reservation) => (
            <ReservationCard
              key={reservation.reservationId}
              reservation={reservation}
              onCancel={handleCancel}
              isCancelling={cancelMutation.isPending}
            />
          ))}
        </Stack>
      )}
    </Container>
  );
}