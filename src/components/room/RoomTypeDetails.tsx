import {
    Box,
    Button,
    Chip,
    Grid,
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
    Typography,
} from '@mui/material';
import {
    ArrowBack as ArrowBackIcon,
    CheckCircle,
    Euro,
    People,
} from '@mui/icons-material';
import type { RoomType } from '../../models/RoomType';
import { useNavigate } from 'react-router-dom';

interface RoomTypeDetailsProps {
    room: RoomType;
}

export default function RoomTypeDetails({ room }: RoomTypeDetailsProps) {
    const navigate = useNavigate();

    return (
        <Box>
            {/* Przycisk Wróć */}
            <Button
                startIcon={<ArrowBackIcon />}
                onClick={() => navigate(-1)}
                sx={{ mb: 4 }}
            >
                ← Wróć do listy
            </Button>

            <Grid container spacing={6}>
                {/* Zdjęcie pokoju */}
                <Grid item xs={12} md={6}>
                    <Box
                        sx={{
                            height: { xs: 300, md: 520 },
                            borderRadius: 4,
                            overflow: 'hidden',
                            boxShadow: 12,
                            backgroundImage: `url(https://source.unsplash.com/random/1200x800/?hotel,${room.name
                                .toLowerCase()
                                .replace(/\s+/g, '-')})`,
                            backgroundSize: 'cover',
                            backgroundPosition: 'center',
                        }}
                    />
                </Grid>

                {/* Szczegóły */}
                <Grid item xs={12} md={6}>
                    <Typography variant="h3" fontWeight="bold" gutterBottom>
                        {room.name}
                    </Typography>

                    <Box sx={{ display: 'flex', gap: 2, my: 3 }}>
                        <Chip
                            icon={<People />}
                            label={`${room.capacity} osób`}
                            color="primary"
                            size="large"
                        />
                        <Chip
                            icon={<Euro />}
                            label={`${room.pricePerNight} zł/noc`}
                            color="success"
                            size="large"
                            sx={{ fontWeight: 'bold' }}
                        />
                    </Box>

                    {/* Opis */}
                    {room.description && (
                        <>
                            <Typography variant="h5" sx={{ mt: 6, mb: 2 }}>
                                Opis
                            </Typography>
                            <Typography variant="body1" color="text.secondary" paragraph>
                                {room.description}
                            </Typography>
                        </>
                    )}

                    {/* Udogodnienia */}
                    <Typography variant="h5" sx={{ mt: 6, mb: 2 }}>
                        Udogodnienia
                    </Typography>
                    <List>
                        {room.amenities.length > 0 ? (
                            room.amenities.map((amenity, index) => (
                                <ListItem key={index} disablePadding sx={{ py: 0.5 }}>
                                    <ListItemIcon sx={{ minWidth: 40 }}>
                                        <CheckCircle color="success" />
                                    </ListItemIcon>
                                    <ListItemText primary={amenity} />
                                </ListItem>
                            ))
                        ) : (
                            <Typography color="text.secondary" sx={{ ml: 5 }}>
                                Brak dodatkowych udogodnień
                            </Typography>
                        )}
                    </List>

                    {/* Przycisk rezerwacji */}
                    <Button
                        variant="contained"
                        size="large"
                        onClick={() => navigate('/reservations')}
                        sx={{
                            mt: 5,
                            px: 6,
                            py: 2,
                            fontSize: '1.2rem',
                            borderRadius: 3,
                        }}
                    >
                        Zarezerwuj teraz
                    </Button>
                </Grid>
            </Grid>
        </Box>
    );
}