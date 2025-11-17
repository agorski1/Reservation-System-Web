import React, { useState } from 'react';
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
import AmenitiesAndGuestsFilter from '../components/filters/AmenitiesAndGuestsFilter';
import AvailableRoomCard from '../components/room/AvailableRoomCard';
import { useQuery } from '@tanstack/react-query';
import { getAvailableRoomTypes } from '../services/roomTypesService';
import { calculateNights, calculateTotalPrice } from '../utils/date';

export default function RoomSearchPage() {
    const [from, setFrom] = useState<string>('');
    const [to, setTo] = useState<string>('');
    const [minPrice, setMinPrice] = useState<string>('');
    const [maxPrice, setMaxPrice] = useState<string>('');
    const [guests, setGuests] = useState<number>(2);
    const [amenities, setAmenities] = useState<string[]>([]);

    const nights = calculateNights(from, to);

    const { data: rooms = [], isLoading } = useQuery({
        queryKey: ['availableRooms', { from, to, minPrice, maxPrice, guests, amenities }],
        queryFn: () =>
            getAvailableRoomTypes({
                from: from || undefined,
                to: to || undefined,
                capacity: guests ? [guests] : undefined,
                minPrice: minPrice ? Number(minPrice) : undefined,
                maxPrice: maxPrice ? Number(maxPrice) : undefined,
                amenities: amenities.length > 0 ? amenities : undefined,
            }),
        enabled: !!from && !!to && nights > 0,
        staleTime: 1000 * 60 * 5, // 5 minut cache
    });

    return (
        <Container maxWidth="lg" sx={{ py: { xs: 6, md: 10 } }}>
            <Typography variant="h3" fontWeight="bold" textAlign="center" gutterBottom>
                Wyszukaj pokój
            </Typography>

            <Grid container spacing={4}>
                {/* === LEWA KOLUMNA – FILTRY === */}
                <Grid item xs={12} md={4}>
                    <Paper sx={{ p: 4, position: 'sticky', top: 100, alignSelf: 'start' }}>
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

                        <AmenitiesAndGuestsFilter
                            guests={guests}
                            selectedAmenities={amenities}
                            onGuestsChange={setGuests}
                            onAmenitiesChange={setAmenities}
                        />
                    </Paper>
                </Grid>

                {/* === PRAWA KOLUMNA – WYNIKI === */}
                <Grid item xs={12} md={8}>
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
                        <Grid container spacing={4}>
                            {rooms.map((room) => {
                                const totalPrice = calculateTotalPrice(room.pricePerNight, nights);

                                return (
                                    <Grid item xs={12} sm={6} lg={4} key={room.id}>
                                        <AvailableRoomCard
                                            room={room}
                                            totalPrice={totalPrice}
                                            nights={nights}
                                        />
                                    </Grid>
                                );
                            })}
                        </Grid>
                    )}
                </Grid>
            </Grid>
        </Container>
    );
}