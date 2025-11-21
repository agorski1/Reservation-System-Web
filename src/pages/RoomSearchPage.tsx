// src/pages/RoomSearchPage.tsx
import { useState } from 'react';
import {
    Container,
    Grid,
    Paper,
    Typography,
    Divider,
    CircularProgress,
    Box,
} from '@mui/material';
import DateRangeFilter from '../components/filters/DateRangeFilter';
import PriceRangeFilter from '../components/filters/PriceRangeFilter';
import GuestsFilter from '../components/filters/GuestsFilter';
import AmenitiesFilter from '../components/filters/AmenitiesFilter';
import AvailableRoomCard from '../components/room/AvailableRoomCard';
import { useQuery } from '@tanstack/react-query';
import { getAvailableRoomTypes } from '../services/roomTypesService';
import { calculateNights } from '../utils/date';

export default function RoomSearchPage() {
    const [from, setFrom] = useState<string>('');
    const [to, setTo] = useState<string>('');
    const [minPrice, setMinPrice] = useState<string>('');
    const [maxPrice, setMaxPrice] = useState<string>('');
    const [selectedGuests, setSelectedGuests] = useState<number[]>([]);
    const [amenities, setAmenities] = useState<string[]>([]);

    const nights = calculateNights(from, to);

    const { data: rooms = [], isLoading } = useQuery({
        queryKey: ['availableRooms', { from, to, minPrice, maxPrice, selectedGuests, amenities }],
        queryFn: () =>
            getAvailableRoomTypes({
                from,
                to,
                capacity: selectedGuests.length > 0 ? selectedGuests : undefined,
                minPrice: minPrice ? Number(minPrice) : undefined,
                maxPrice: maxPrice ? Number(maxPrice) : undefined,
                amenities: amenities.length > 0 ? amenities : undefined,
            }),
        enabled: !!from && !!to && nights > 0,
        staleTime: 1000 * 60 * 5,
    });

    return (
        <Container maxWidth="lg" sx={{ py: { xs: 6, md: 10 } }}>
            <Typography variant="h3" fontWeight="bold" textAlign="center" gutterBottom>
                Wyszukaj pokój
            </Typography>

            <Grid container spacing={4} component="div">
                {/* Filtry */}
                <Grid size={{ xs: 12, md: 4 }} component="div">
                    <Paper elevation={3} sx={{ p: 4, position: 'sticky', top: 100 }}>
                        <DateRangeFilter
                            from={from}
                            to={to}
                            onChange={(f, t) => {
                                setFrom(f);
                                setTo(t);
                            }}
                        />
                        <Divider sx={{ my: 4 }} />
                        <PriceRangeFilter
                            min={minPrice}
                            max={maxPrice}
                            onChange={(min, max) => {
                                setMinPrice(min);
                                setMaxPrice(max);
                            }}
                        />
                        <Divider sx={{ my: 4 }} />
                        <GuestsFilter
                            selectedGuests={selectedGuests}
                            onGuestsChange={setSelectedGuests}
                        />
                        <Divider sx={{ my: 4 }} />
                        <AmenitiesFilter
                            selectedAmenities={amenities}
                            onAmenitiesChange={setAmenities}
                        />
                    </Paper>
                </Grid>

                {/* Lista pokoi */}
                <Grid size={{ xs: 12, md: 8 }} component="div">
                    {isLoading ? (
                        <Box sx={{ display: 'flex', justifyContent: 'center', my: 10 }}>
                            <CircularProgress size={70} />
                        </Box>
                    ) : rooms.length === 0 ? (
                        <Paper sx={{ p: 8, textAlign: 'center', bgcolor: 'grey.50' }}>
                            <Typography variant="h6" color="text.secondary">
                                Nie znaleziono dostępnych pokoi dla wybranych kryteriów
                            </Typography>
                        </Paper>
                    ) : (
                        <Grid container spacing={4} component="div">
                            {rooms.map((room) => (
                                <Grid
                                    key={room.id}
                                    size={{ xs: 12, sm: 6, lg: 4 }}
                                    component="div"
                                >
                                    <AvailableRoomCard
                                        room={room}
                                        totalPrice={room.pricePerNight * nights}
                                        nights={nights}
                                        from={from}
                                        to={to}
                                    />
                                </Grid>
                            ))}
                        </Grid>
                    )}
                </Grid>
            </Grid>
        </Container>
    );
}