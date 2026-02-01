import React from 'react';
import hotelBg from '../assets/hotel-background.jpg';
import {
    Box,
    Button,
    Container,
    Typography,
    Grid,
    Paper,
    Divider,
    Link,
    useTheme,
    useMediaQuery,
} from '@mui/material';
import {
    Hotel as HotelIcon,
    Restaurant as RestaurantIcon,
    Spa as SpaIcon,
} from '@mui/icons-material';

export default function HomePage() {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('md'));

    return (
        <>
            {/* HERO SECTION */}
            <Box
                sx={{
                    position: 'relative',
                    height: { xs: '80vh', md: '100vh' },
                    backgroundImage: `url(${hotelBg})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'white',
                    textAlign: 'center',
                    '&::before': {
                        content: '""',
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        background: 'linear-gradient(135deg, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.4) 100%)',
                    },
                }}
            >
                <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1 }}>
                    <Typography
                        variant={isMobile ? 'h3' : 'h1'}
                        fontWeight="bold"
                        sx={{ mb: 3, textShadow: '2px 2px 8px rgba(0,0,0,0.6)' }}
                    >
                        Hotel
                    </Typography>
                    <Typography variant={isMobile ? 'h6' : 'h5'} sx={{ mb: 5, opacity: 0.95 }}>
                        Luksusowy wypoczynek w sercu Mazur
                    </Typography>
                    <Box sx={{ display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, gap: 3, justifyContent: 'center' }}>
                        <Button
                            variant="contained"
                            size="large"
                            href="/reservations"
                            sx={{
                                px: 5,
                                py: 2,
                                fontSize: '1.2rem',
                                borderRadius: 3,
                                background: 'linear-gradient(45deg, #f59e0b, #d97706)',
                                boxShadow: '0 8px 20px rgba(245, 158, 11, 0.4)',
                                '&:hover': { transform: 'translateY(-3px)', boxShadow: '0 12px 25px rgba(245, 158, 11, 0.5)' },
                                transition: 'all 0.3s',
                            }}
                        >
                            Zarezerwuj teraz
                        </Button>
                        <Button
                            variant="outlined"
                            size="large"
                            href="/room-types"
                            sx={{
                                px: 5,
                                py: 2,
                                fontSize: '1.2rem',
                                borderRadius: 3,
                                border: '2px solid white',
                                color: 'white',
                                '&:hover': { bgcolor: 'rgba(255,255,255,0.15)', borderColor: 'white' },
                            }}
                        >
                            Zobacz pokoje
                        </Button>
                    </Box>
                </Container>
            </Box>

            {/* DLACZEGO MY */}
            <Container maxWidth="lg" sx={{ py: { xs: 8, md: 12 } }}>
                <Typography variant="h4" fontWeight="bold" textAlign="center" sx={{ mb: 8 }}>
                    Dlaczego warto nas wybrać?
                </Typography>

                <Grid container spacing={6}>
                    {[
                        { icon: <HotelIcon sx={{ fontSize: 60 }} />, title: 'Komfortowe pokoje', desc: 'Nowoczesne, klimatyzowane pokoje z widokiem na jezioro lub las.' },
                        { icon: <RestaurantIcon sx={{ fontSize: 60 }} />, title: 'Pyszne śniadania', desc: 'Bogaty bufet z regionalnymi, świeżymi produktami.' },
                        { icon: <SpaIcon sx={{ fontSize: 60 }} />, title: 'Strefa SPA & Wellness', desc: 'Basen, sauna, jacuzzi i profesjonalne zabiegi.' },
                    ].map((item, i) => (
                        <Grid item xs={12} md={4} key={i}>
                            <Paper
                                elevation={8}
                                sx={{
                                    p: 5,
                                    textAlign: 'center',
                                    height: '100%',
                                    borderRadius: 4,
                                    transition: 'all 0.3s',
                                    '&:hover': { transform: 'translateY(-12px)', boxShadow: 20 },
                                }}
                            >
                                <Box sx={{ color: 'primary.main', mb: 3 }}>{item.icon}</Box>
                                <Typography variant="h6" fontWeight="bold" sx={{ mb: 2 }}>
                                    {item.title}
                                </Typography>
                                <Typography variant="body1" color="text.secondary">
                                    {item.desc}
                                </Typography>
                            </Paper>
                        </Grid>
                    ))}
                </Grid>
            </Container>

            {/* O NAS */}
            <Box sx={{ bgcolor: 'grey.50', py: { xs: 8, md: 12 } }}>
                <Container maxWidth="md" sx={{ textAlign: 'center' }}>
                    <Typography variant="h4" fontWeight="bold" sx={{ mb: 4 }}>
                        Twój dom z dala od domu
                    </Typography>
                    <Typography variant="body1" color="text.secondary" sx={{ mb: 5, fontSize: '1.1rem', lineHeight: 1.8 }}>
                        Hotel to idealne miejsce na romantyczny weekend, rodzinny wypoczynek lub firmową konferencję.
                        Położony w malowniczej okolicy, zaledwie 2 godziny od Warszawy, oferuje ciszę, komfort i obsługę na najwyższym poziomie.
                    </Typography>
                    <Button
                        variant="contained"
                        size="large"
                        href="/contact"
                        sx={{
                            px: 6,
                            py: 2,
                            fontSize: '1.1rem',
                            borderRadius: 3,
                            bgcolor: 'primary.main',
                            '&:hover': { bgcolor: 'primary.dark' },
                        }}
                    >
                        Skontaktuj się z nami
                    </Button>
                </Container>
            </Box>

            {/* STOPKA */}
            <Box sx={{ bgcolor: 'grey.900', color: 'white', py: 6 }}>
                <Container maxWidth="lg" sx={{ textAlign: 'center' }}>
                    <Typography variant="h6" fontWeight="bold" sx={{ mb: 2 }}>
                        Hotel
                    </Typography>
                    <Typography variant="body2" sx={{ mb: 3 }}>
                        ul. Leśna 12, 00-123 Mazury
                        <br />
                        Telefon: <Link href="tel:+48123456789" color="inherit" underline="none">+48 123 456 789</Link> |
                        E-mail: <Link href="mailto:recepcja@hotel.pl" color="inherit" underline="none">recepcja@hotel.pl</Link>
                    </Typography>
                    <Divider sx={{ bgcolor: 'grey.700', width: 100, mx: 'auto', my: 3 }} />
                    <Typography variant="caption" color="grey.500">
                        © 2025 Hotel. Wszystkie prawa zastrzeżone.
                    </Typography>
                </Container>
            </Box>
        </>
    );
}