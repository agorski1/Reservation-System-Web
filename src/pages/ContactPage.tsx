import React, { useState } from 'react';
import {
    Box,
    TextField,
    Button,
    Typography,
    Container,
    Paper,
    Divider,
    Stack,
    Link,
} from '@mui/material';

import ContactPhoneIcon from '@mui/icons-material/ContactPhone';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import AccessTimeIcon from '@mui/icons-material/AccessTime';

const ContactPage: React.FC = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: '',
    });

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log(formData);
        alert('Wiadomość wysłana! Dziękujemy');
        setFormData({ name: '', email: '', message: '' });
    };

    return (
        <Container maxWidth="md">
            <Box
                sx={{
                    minHeight: '100vh',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    py: { xs: 4, md: 8 },
                }}
            >
                <Paper elevation={12} sx={{ p: { xs: 4, md: 7 }, width: '100%', maxWidth: 680, borderRadius: 4 }}>
                    <Typography variant="h4" component="h1" gutterBottom textAlign="center" fontWeight="bold">
                        Skontaktuj się z nami
                    </Typography>
                    <Typography variant="body1" color="text.secondary" textAlign="center" sx={{ mb: 6 }}>
                        Masz pytania? Chętnie pomożemy!
                    </Typography>

                    {/* Dane kontaktowe z ikonami */}
                    <Box sx={{ mb: 6 }}>
                        <Typography variant="h6" gutterBottom textAlign="center" color="primary">
                            Dane kontaktowe
                        </Typography>
                        <Divider sx={{ mb: 4 }} />

                        <Stack spacing={3.5}>
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, justifyContent: { xs: 'center', md: 'flex-start' } }}>
                                <ContactPhoneIcon color="primary" />
                                <Box>
                                    <Typography variant="body1" fontWeight="medium">Telefon</Typography>
                                    <Link href="tel:+48123456789" underline="none" color="inherit">
                                        <strong>+48 123 456 789</strong>
                                    </Link>
                                </Box>
                            </Box>

                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, justifyContent: { xs: 'center', md: 'flex-start' } }}>
                                <MailOutlineIcon color="primary" />
                                <Box>
                                    <Typography variant="body1" fontWeight="medium">E-mail</Typography>
                                    <Link href="mailto:kontakt@hotel.com" underline="none" color="inherit">
                                        <strong>kontakt@hotel.com</strong>
                                    </Link>
                                </Box>
                            </Box>

                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, justifyContent: { xs: 'center', md: 'flex-start' } }}>
                                <LocationOnIcon color="primary" />
                                <Box>
                                    <Typography variant="body1" fontWeight="medium">Adres</Typography>
                                    <Typography>ul. Przykładowa 15<br />00-000 Warszawa</Typography>
                                </Box>
                            </Box>

                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, justifyContent: { xs: 'center', md: 'flex-start' } }}>
                                <AccessTimeIcon color="primary" />
                                <Box>
                                    <Typography variant="body1" fontWeight="medium">Godziny pracy</Typography>
                                    <Typography>
                                        Poniedziałek – Piątek: 8:00 – 18:00<br />
                                        Sobota: 9:00 – 14:00<br />
                                        Niedziela: nieczynne
                                    </Typography>
                                </Box>
                            </Box>
                        </Stack>
                    </Box>


                </Paper>
            </Box>
        </Container>
    );
};

export default ContactPage;