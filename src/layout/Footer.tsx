import { Box, Container, Typography, Link, Divider } from '@mui/material';
import { Phone as PhoneIcon, Email as EmailIcon, LocationOn as LocationIcon } from '@mui/icons-material';

export default function Footer() {
    return (
        <Box sx={{ bgcolor: 'grey.900', color: 'white', py: { xs: 6, md: 8 }, mt: 'auto' }}>
            <Container maxWidth="lg">
                <Box sx={{ textAlign: 'center' }}>
                    <Typography variant="h5" fontWeight="bold" sx={{ mb: 3 }}>
                        Hotel
                    </Typography>

                    <Box sx={{ display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, justifyContent: 'center', gap: 3, mb: 4 }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, justifyContent: 'center' }}>
                            <LocationIcon fontSize="small" />
                            <Typography variant="body2">
                                ul. Leśna 12, 00-123 Mazury
                            </Typography>
                        </Box>

                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, justifyContent: 'center' }}>
                            <PhoneIcon fontSize="small" />
                            <Link href="tel:+48123456789" color="inherit" underline="none">
                                +48 123 456 789
                            </Link>
                        </Box>

                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, justifyContent: 'center' }}>
                            <EmailIcon fontSize="small" />
                            <Link href="mailto:recepcja@hotel.pl" color="inherit" underline="none">
                                recepcja@hotel.pl
                            </Link>
                        </Box>
                    </Box>

                    <Divider sx={{ bgcolor: 'grey.700', width: { xs: '100%', sm: 400 }, mx: 'auto', my: 3 }} />

                    <Typography variant="body2" color="grey.500">
                        © {new Date().getFullYear()} Hotel. Wszystkie prawa zastrzeżone.
                    </Typography>
                </Box>
            </Container>
        </Box>
    );
}