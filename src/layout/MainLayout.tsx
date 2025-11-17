import React from 'react';
import { Box } from '@mui/material';
import Header from '../components/Header';
import Footer from '../components/Footer';

interface MainLayoutProps {
    children: React.ReactNode;
}

export default function MainLayout({ children }: MainLayoutProps) {
    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
            <Header />                 {/* Teraz jest na każdej stronie */}
            <Box component="main" sx={{ flexGrow: 1 }}>
                {children}
            </Box>
            <Footer />                 {/* Stopka też jest zawsze */}
        </Box>
    );
}