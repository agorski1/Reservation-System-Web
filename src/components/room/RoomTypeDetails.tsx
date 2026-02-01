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
    Card,
    CardMedia,
} from '@mui/material';
import {
    ArrowBack as ArrowBackIcon,
    CheckCircle,
    Euro,
    People,
} from '@mui/icons-material';
import type { RoomType } from '../../models/RoomType';
import { useNavigate } from 'react-router-dom';
import { formatRoomName, getRoomImage } from "../../utils/room.utils.ts";

interface RoomTypeDetailsProps {
    room: RoomType;
}

export default function RoomTypeDetails({ room }: RoomTypeDetailsProps) {
    const navigate = useNavigate();

    return (
        <Box>
            <Button
                startIcon={<ArrowBackIcon />}
                onClick={() => navigate(-1)}
                sx={{ mb: 4 }}
            >
                ← Wróć do listy
            </Button>

            <Grid container spacing={6} component="div">
                <Grid size={{ xs: 12, md: 6 }} component="div">
                    <Card elevation={10} sx={{ borderRadius: 4, overflow: 'hidden' }}>
                        <CardMedia
                            component="img"
                            height="520"
                            image={getRoomImage(room.name, room.capacity)}
                            alt={formatRoomName(room.name, room.capacity)}
                            sx={{
                                objectFit: 'cover',
                            }}
                        />
                    </Card>
                </Grid>

                {/* Opis i szczegóły */}
                <Grid size={{ xs: 12, md: 6 }} component="div">
                    <Typography variant="h3" fontWeight="bold" gutterBottom>
                        {formatRoomName(room.name, room.capacity)}
                    </Typography>

                    <Box sx={{ display: 'flex', gap: 2, my: 3, flexWrap: 'wrap' }}>
                        <Chip
                            icon={<People />}
                            label={`${room.capacity} ${room.capacity === 1 ? 'osoba' : 'osoby'}`}
                            color="primary"
                            size="medium"
                            sx={{ fontSize: '1rem', py: 2.5 }}
                        />
                        <Chip
                            icon={<Euro />}
                            label={`${room.pricePerNight} zł / noc`}
                            color="success"
                            size="medium"
                            sx={{ fontWeight: 'bold', fontSize: '1rem', py: 2.5 }}
                        />
                    </Box>

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