import React from 'react';
import {
    Card,
    CardActionArea,
    CardMedia,
    CardContent,
    Typography,
    Chip,
    Box,
    Button,
} from '@mui/material';
import { People, Euro } from '@mui/icons-material';
import { useNavigate, useLocation } from 'react-router-dom';
import type { AvailableRoomType } from '../../models/AvailableRoomType';

interface Props {
    room: AvailableRoomType;
    totalPrice: number;   // ← nowa propka!
    nights: number;       // ← ile nocy
}

export default function AvailableRoomCard({ room, totalPrice, nights }: Props) {
    const navigate = useNavigate();
    const location = useLocation();

    // Przekazujemy daty dalej do rezerwacji
    const searchParams = new URLSearchParams(location.search);
    const from = searchParams.get('from');
    const to = searchParams.get('to');

    const handleReserve = () => {
        navigate(`/reservations/${room.id}?from=${from}&to=${to}`);
    };

    return (
        <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
            <CardActionArea onClick={handleReserve}>
                <CardMedia
                    component="div"
                    sx={{
                        height: 240,
                        backgroundImage: `ur[](https://source.unsplash.com/random/800x600/?hotel,${room.name.toLowerCase().replace(/\s+/g, '-')})`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                    }}
                />
                <CardContent sx={{ flexGrow: 1 }}>
                    <Typography variant="h6" fontWeight="bold" gutterBottom>
                        {room.name}
                    </Typography>

                    {room.description && (
                        <Typography variant="body2" color="text.secondary" paragraph>
                            {room.description}
                        </Typography>
                    )}

                    <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap', my: 2 }}>
                        <Chip icon={<People />} label={`${room.capacity} osób`} size="small" />
                        {room.amenities.slice(0, 3).map((a) => (
                            <Chip key={a} label={a} size="small" variant="outlined" />
                        ))}
                        {room.amenities.length > 3 && (
                            <Chip label={`+${room.amenities.length - 3}`} size="small" />
                        )}
                    </Box>

                    {/* Ceny */}
                    <Box sx={{ mt: 3 }}>
                        <Typography variant="body2" color="text.secondary">
                            Cena za noc:
                        </Typography>
                        <Typography variant="h5" fontWeight="bold" color="primary">
                            {room.pricePerNight.toFixed(0)} zł
                        </Typography>

                        <Box sx={{ mt: 2, p: 2, bgcolor: 'primary.50', borderRadius: 2 }}>
                            <Typography variant="body2" fontWeight="medium">
                                {nights} {nights === 1 ? 'noc' : nights < 5 ? 'noce' : 'nocy'}
                            </Typography>
                            <Typography variant="h4" fontWeight="bold" color="primary.main">
                                {totalPrice.toFixed(0)} zł
                            </Typography>
                            <Typography variant="caption" color="text.secondary">
                                całkowita cena pobytu
                            </Typography>
                        </Box>
                    </Box>
                </CardContent>
            </CardActionArea>

            <Box sx={{ p: 2, pt: 0 }}>
                <Button
                    variant="contained"
                    size="large"
                    fullWidth
                    onClick={handleReserve}
                >
                    Zarezerwuj teraz
                </Button>
            </Box>
        </Card>
    );
}