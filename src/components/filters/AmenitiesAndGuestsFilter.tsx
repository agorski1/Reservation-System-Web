import React from 'react';
import {
    Box,
    FormGroup,
    FormControlLabel,
    Checkbox,
    Typography,
    ToggleButton,
    ToggleButtonGroup,
} from '@mui/material';
import { Bed, AcUnit, Tv, Balcony, Deck, Wifi } from '@mui/icons-material';

const amenities = [
    { label: 'WiFi', icon: <Wifi />, value: 'WIFI' },
    { label: 'TV', icon: <Tv />, value: 'TV' },
    { label: 'Klimatyzacja', icon: <AcUnit />, value: 'AIR_CONDITIONING' },
    { label: 'Minibar', icon: <Deck />, value: 'MINIBAR' },
    { label: 'Balkon', icon: <Balcony />, value: 'BALCONY' },
];

interface Props {
    guests: number;
    selectedAmenities: string[];
    onGuestsChange: (guests: number) => void;
    onAmenitiesChange: (amenities: string[]) => void;
}

export default function AmenitiesAndGuestsFilter({
                                                     guests,
                                                     selectedAmenities,
                                                     onGuestsChange,
                                                     onAmenitiesChange,
                                                 }: Props) {
    const handleAmenityToggle = (value: string) => {
        const current = selectedAmenities;
        const newAmenities = current.includes(value)
            ? current.filter((a) => a !== value)
            : [...current, value];
        onAmenitiesChange(newAmenities);
    };

    return (
        <Box>
            <Typography fontWeight="bold" gutterBottom>Liczba osób</Typography>
            <ToggleButtonGroup
                value={guests}
                exclusive
                onChange={(_, v) => v && onGuestsChange(v)}
                sx={{ mb: 4 }}
            >
                {[1, 2, 3, 4].map((n) => (
                    <ToggleButton key={n} value={n}>
                        <Bed sx={{ mr: 0.5 }} /> {n}
                    </ToggleButton>
                ))}
            </ToggleButtonGroup>

            <Typography fontWeight="bold" gutterBottom>Udogodnienia</Typography>
            <FormGroup>
                {amenities.map(({ label, icon, value }) => (
                    <FormControlLabel
                        key={value}
                        control={
                            <Checkbox
                                checked={selectedAmenities.includes(value)}
                                onChange={() => handleAmenityToggle(value)}
                                icon={icon}
                                checkedIcon={icon}
                            />
                        }
                        label={label}
                    />
                ))}
            </FormGroup>
        </Box>
    );
}