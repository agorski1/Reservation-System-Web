import React from 'react';
import {
    AppBar,
    Container,
    Toolbar,
    Typography,
    Button,
    Box,
    useScrollTrigger,
    Slide,
} from '@mui/material';
import {
    Hotel as HotelIcon,
    Logout as LogoutIcon,
    Login as LoginIcon,
    PersonAdd as RegisterIcon,
} from '@mui/icons-material';
import { useAuth } from '../context/AuthContext.tsx';
import { useNavigate } from 'react-router-dom';

function HideOnScroll({ children }: { children: React.ReactElement }) {
    const trigger = useScrollTrigger();
    return (
        <Slide appear={false} direction="down" in={!trigger}>
            {children}
        </Slide>
    );
}

export default function Header() {
    const { token, logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/');
    };

    return (
        <HideOnScroll>
            <AppBar
                position="sticky"
                elevation={4}
                sx={{
                    bgcolor: 'background.paper',
                    color: 'text.primary',
                    borderBottom: '1px solid',
                    borderColor: 'divider',
                }}
            >
                <Container maxWidth="lg">
                    <Toolbar sx={{ justifyContent: 'space-between', py: 1 }}>
                        {/* Logo */}
                        <Box
                            sx={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: 1,
                                cursor: 'pointer',
                            }}
                            onClick={() => navigate('/')}
                        >
                            <HotelIcon sx={{ fontSize: 32, color: 'primary.main' }} />
                            <Typography variant="h5" fontWeight="bold" sx={{ color: 'primary.main' }}>
                                Hotel Paradise
                            </Typography>
                        </Box>

                        {/* Menu */}
                        <Box sx={{ display: 'flex', gap: { xs: 1, md: 3 }, alignItems: 'center' }}>
                            <Button color="inherit" onClick={() => navigate('/room-types')}>
                                Pokoje
                            </Button>
                            <Button color="inherit" onClick={() => navigate('/contact')}>
                                Kontakt
                            </Button>

                            {/* ZAWSZE widoczne */}
                            <Button
                                color="inherit"
                                onClick={() => navigate('/reservations')}
                                sx={{ fontWeight: 500 }}
                            >
                                Rezerwacje
                            </Button>

                            {/* Warunkowe przyciski */}
                            {token ? (
                                <>
                                    <Button
                                        color="inherit"
                                        startIcon={<HotelIcon />}
                                        onClick={() => navigate('/my-reservations')}
                                    >
                                        Moje rezerwacje
                                    </Button>
                                    <Button
                                        color="inherit"
                                        startIcon={<LogoutIcon />}
                                        onClick={handleLogout}
                                    >
                                        Wyloguj
                                    </Button>
                                </>
                            ) : (
                                <>
                                    <Button
                                        color="inherit"
                                        startIcon={<LoginIcon />}
                                        onClick={() => navigate('/login')}
                                    >
                                        Logowanie
                                    </Button>
                                    <Button
                                        variant="contained"
                                        startIcon={<RegisterIcon />}
                                        onClick={() => navigate('/register')}
                                        sx={{
                                            bgcolor: 'primary.main',
                                            '&:hover': { bgcolor: 'primary.dark' },
                                        }}
                                    >
                                        Rejestracja
                                    </Button>
                                </>
                            )}
                        </Box>
                    </Toolbar>
                </Container>
            </AppBar>
        </HideOnScroll>
    );
}