import {
    Card, CardActionArea, CardMedia, CardContent,
    Typography, Chip, Box
} from '@mui/material';
import { People, Wallet } from '@mui/icons-material';
import type { RoomType } from '../../models/RoomType';
import { useNavigate } from 'react-router-dom';
import {formatRoomName, getRoomImage} from "../../utils/room.utils.ts";

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
                    component="img"
                    height={240}
                    image={getRoomImage(room.name, room.capacity)}
                    alt={formatRoomName(room.name, room.capacity)}
                    sx={{
                        objectFit: 'cover',
                        borderRadius: '12px 12px 0 0',
                    }}
                />
                <CardContent>
                    <Typography variant="h6" fontWeight="bold" gutterBottom>
                        {room.name}
                    </Typography>

                    <Box sx={{ display: 'flex', gap: 2, my: 2 }}>
                        <Chip icon={<People />} label={`${room.capacity} os.`} color="primary" size="small" />
                        <Chip icon={< Wallet />} label={`${room.pricePerNight} zł`} color="success" size="small" />
                    </Box>

                    <Typography variant="body2" color="text.secondary" sx={{ mt: 2 }}>
                        Kliknij, aby zobaczyć szczegóły →
                    </Typography>
                </CardContent>
            </CardActionArea>
        </Card>
    );
}