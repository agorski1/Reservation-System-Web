import {
    Card, CardActionArea, CardMedia, CardContent,
    Typography, Chip, Box
} from '@mui/material';
import { People, Euro } from '@mui/icons-material';
import type { RoomType } from '../../models/RoomType';
import { useNavigate } from 'react-router-dom';

interface Props {
    room: RoomType;
}

export default function RoomTypeCard({ room }: Props) {
    const navigate = useNavigate();

    return (
        <Card
            elevation={10}
            sx={{
                height: '100%',
                borderRadius: 4,
                overflow: 'hidden',
                transition: 'all 0.3s',
                '&:hover': { transform: 'translateY(-10px)', boxShadow: 20 },
            }}
        >
            <CardActionArea onClick={() => navigate(`/room-types/${room.id}`)}>
                <CardMedia
                    component="div"
                    sx={{
                        height: 240,
                        backgroundImage: `ur[](https://source.unsplash.com/random/800x600/?hotel,${room.name.toLowerCase()})`,
                        backgroundSize: 'cover',
                    }}
                />
                <CardContent>
                    <Typography variant="h6" fontWeight="bold" gutterBottom>
                        {room.name}
                    </Typography>

                    <Box sx={{ display: 'flex', gap: 2, my: 2 }}>
                        <Chip icon={<People />} label={`${room.capacity} os.`} color="primary" size="small" />
                        <Chip icon={<Euro />} label={`${room.pricePerNight} zł`} color="success" size="small" />
                    </Box>

                    <Typography variant="body2" color="text.secondary" sx={{ mt: 2 }}>
                        Kliknij, aby zobaczyć szczegóły →
                    </Typography>
                </CardContent>
            </CardActionArea>
        </Card>
    );
}