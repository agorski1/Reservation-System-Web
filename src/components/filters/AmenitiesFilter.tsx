import { Box, FormGroup, FormControlLabel, Checkbox, Typography } from '@mui/material';
import { Wifi, Tv, AcUnit, Deck, Balcony } from '@mui/icons-material';

const amenities = [
    { label: 'WiFi', icon: <Wifi />, value: 'WIFI' },
    { label: 'TV', icon: <Tv />, value: 'TV' },
    { label: 'Klimatyzacja', icon: <AcUnit />, value: 'AIR_CONDITIONING' },
    { label: 'Minibar', icon: <Deck />, value: 'MINIBAR' },
    { label: 'Balkon', icon: <Balcony />, value: 'BALCONY' },
];

interface Props {
    selectedAmenities: string[];
    onAmenitiesChange: (amenities: string[]) => void;
}

export default function AmenitiesFilter({ selectedAmenities, onAmenitiesChange }: Props) {
    const handleToggle = (value: string) => {
        const newAmenities = selectedAmenities.includes(value)
            ? selectedAmenities.filter(a => a !== value)
            : [...selectedAmenities, value];
        onAmenitiesChange(newAmenities);
    };

    return (
        <Box>
            <Typography fontWeight="bold" gutterBottom>Udogodnienia</Typography>
            <FormGroup>
                {amenities.map(({ label, icon, value }) => (
                    <FormControlLabel
                        key={value}
                        control={
                            <Checkbox
                                checked={selectedAmenities.includes(value)}
                                onChange={() => handleToggle(value)}
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
