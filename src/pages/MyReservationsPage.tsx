// src/pages/MyReservationsPage.tsx – wersja FINALNA, 100% zgodna z Twoim backendem
import React, { useState } from 'react';
import {
    Container, Typography, Box, ToggleButton, ToggleButtonGroup,
    Paper, Stack, Chip, Button, Alert, CircularProgress
} from '@mui/material';
import { format, parseISO } from 'date-fns';
import { pl } from 'date-fns/locale';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import {
    getMyReservations,
    getMyCurrentReservations,
    cancelReservation,
} from '../services/reservationService';

type ViewMode = 'all' | 'active';

const EXCLUDED_STATUSES = ['Cancelled', 'Rejected', 'Completed'] as const;

export default function MyReservationsPage() {
    const [viewMode, setViewMode] = useState<ViewMode>('active');
    const queryClient = useQueryClient();

    const { data: reservations = [], isLoading, error } = useQuery({
        queryKey: ['myReservations', viewMode],
        queryFn: viewMode === 'active' ? getMyCurrentReservations : getMyReservations,
    });

    const cancelMutation = useMutation({
        mutationFn: cancelReservation,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['myReservations'] });
        },
    });

    const handleCancel = (id: number) => {
        if (confirm('Czy na pewno chcesz anulować tę rezerwację?')) {
            cancelMutation.mutate(id);
        }
    };

    if (isLoading) return <Box sx={{ display: 'flex', justifyContent: 'center', my: 12 }}><CircularProgress size={70} /></Box>;
    if (error) return <Alert severity="error" sx={{ m: 4 }}>Nie udało się załadować rezerwacji.</Alert>;

    return (
        <Container maxWidth="md" sx={{ py: { xs: 6, md: 10 } }}>
            <Typography variant="h3" fontWeight="bold" textAlign="center" gutterBottom>
                Moje rezerwacje
            </Typography>

            <Box sx={{ display: 'flex', justifyContent: 'center', mb: 6 }}>
                <ToggleButtonGroup
                    value={viewMode}
                    exclusive
                    onChange={(_, v) => v && setViewMode(v)}
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
                    {reservations.map((res) => {
                        const isCancellable = !EXCLUDED_STATUSES.includes(res.status as any);

                        return (
                            <Paper key={res.reservationId} elevation={3} sx={{ p: 4, borderRadius: 3 }}>
                                <Stack direction={{ xs: 'column', sm: 'row' }} justifyContent="space-between" spacing={3}>
                                    <Box>
                                        <Typography variant="h6" fontWeight="bold">
                                            Pokój nr {res.roomNumber}
                                        </Typography>
                                        <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                                            Od: {format(parseISO(res.from), 'dd MMMM yyyy, HH:mm', { locale: pl })}
                                        </Typography>
                                        <Typography variant="body2" color="text.secondary">
                                            Do: {format(parseISO(res.to), 'dd MMMM yyyy, HH:mm', { locale: pl })}
                                        </Typography>
                                    </Box>

                                    <Stack alignItems={{ xs: 'flex-start', sm: 'flex-end' }} spacing={2}>
                                        <Chip
                                            label={res.status === 'Paid' ? 'Opłacona' : res.status}
                                            color={
                                                EXCLUDED_STATUSES.includes(res.status as any)
                                                    ? 'default'
                                                    : 'success'
                                            }
                                            size="small"
                                        />

                                        {isCancellable && (
                                            <Button
                                                variant="outlined"
                                                color="error"
                                                size="small"
                                                onClick={() => handleCancel(res.reservationId)}
                                                disabled={cancelMutation.isPending}
                                            >
                                                {cancelMutation.isPending ? 'Anulowanie...' : 'Anuluj rezerwację'}
                                            </Button>
                                        )}
                                    </Stack>
                                </Stack>
                            </Paper>
                        );
                    })}
                </Stack>
            )}
        </Container>
    );
}