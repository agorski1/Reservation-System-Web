import { Container, Typography, CircularProgress, Alert, Box } from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import { getRoomTypes } from '../services/roomTypesService';
import RoomTypeCard from '../components/room/RoomTypeCard';

export default function RoomTypesPage() {
    const { data: rooms, isLoading, error } = useQuery({
        queryKey: ['roomTypes'],
        queryFn: getRoomTypes,
    });

    if (isLoading) return <Box sx={{ display: 'flex', justifyContent: 'center', my: 20 }}><CircularProgress size={80} /></Box>;
    if (error) return <Alert severity="error" sx={{ m: 4 }}>Błąd ładowania pokoi</Alert>;

    return (
        <Container maxWidth="lg" sx={{ py: { xs: 6, md: 12 } }}>
            <Typography variant="h3" fontWeight="bold" textAlign="center" gutterBottom>
                Nasze pokoje
            </Typography>
            <Typography variant="h6" color="text.secondary" textAlign="center" sx={{ mb: 8 }}>
                Wybierz idealny typ pokoju
            </Typography>

            {}
            <Box
                sx={{
                    display: 'grid',
                    gap: 4,
                    gridTemplateColumns: {
                        xs: '1fr',
                        sm: 'repeat(2, 1fr)',
                        lg: 'repeat(3, 1fr)',
                    },
                }}
            >
                {rooms?.map((room) => (
                    <RoomTypeCard key={room.id} room={room} />
                ))}
            </Box>
        </Container>
    );
}