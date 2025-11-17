import { Container, CircularProgress, Alert, Box } from '@mui/material';
import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { getRoomTypeById } from '../services/roomTypesService';
import RoomTypeDetails from '../components/room/RoomTypeDetails';

export default function RoomTypeDetailsPage() {
    const { id } = useParams<{ id: string }>();

    const {
        data: room,
        isLoading,
        error,
    } = useQuery({
        queryKey: ['roomType', id],
        queryFn: () => getRoomTypeById(Number(id)),
        enabled: !!id,
    });

    if (isLoading) {
        return (
            <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    minHeight: '60vh',
                }}
            >
                <CircularProgress size={70} />
            </Box>
        );
    }

    if (error || !room) {
        return (
            <Container sx={{ mt: 8 }}>
                <Alert severity="error">
                    Nie znaleziono typu pokoju. Spróbuj ponownie później.
                </Alert>
            </Container>
        );
    }

    return (
        <Container maxWidth="lg" sx={{ py: { xs: 6, md: 10 } }}>
            <RoomTypeDetails room={room} />
        </Container>
    );
}