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
import { People } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import type { AvailableRoomType } from '../../models/AvailableRoomType';
import { formatRoomName, getRoomImage } from "../../utils/room.utils.ts";

interface Props {
    room: AvailableRoomType;
    totalPrice: number;
    nights: number;
    from: string;
    to: string;
}

export default function AvailableRoomCard({ room, totalPrice, nights, from, to }: Props) {
    const navigate = useNavigate();

    const handleReserve = () => {
        navigate(`/reservations/create/${room.id}`, {
            state: {
                from,
                to,
                roomType: room,        // cały obiekt pokoju – najważniejsze!
            },
        });
    };

    return (
        <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
            <CardActionArea onClick={handleReserve}>
                <CardMedia
                    component="img"
                    height="240"
                    image={getRoomImage(room.name, room.capacity)}
                    alt={formatRoomName(room.name, room.capacity)}
                    sx={{
                        objectFit: 'cover',
                        borderRadius: '12px 12px 0 0',
                    }}
                />
                <CardContent sx={{ flexGrow: 1 }}>
                    <Typography variant="h6" fontWeight="bold" gutterBottom>
                        {formatRoomName(room.name, room.capacity)}
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