import { Box, ToggleButton, ToggleButtonGroup, Typography } from '@mui/material';
import { Bed } from '@mui/icons-material';

interface Props {
    selectedGuests: number[];
    onGuestsChange: (guests: number[]) => void;
}

export default function GuestsFilter({ selectedGuests, onGuestsChange }: Props) {
    const handleChange = (
        _event: React.MouseEvent<HTMLElement>,
        newValues: number[] | null
    ) => {
        onGuestsChange(newValues ?? []);
    };

    const isAllDeselected = selectedGuests.length === 0;

    return (
        <Box>
            <Typography fontWeight="bold" gutterBottom>
                Liczba osób
            </Typography>

            <ToggleButtonGroup value={selectedGuests} onChange={handleChange}>
                {[1, 2, 3, 4].map((n) => (
                    <ToggleButton key={n} value={n}>
                        <Bed sx={{ mr: 0.5 }} />
                        {n}
                    </ToggleButton>
                ))}
            </ToggleButtonGroup>

            <Typography variant="caption" color="text.secondary" sx={{ mt: 1, display: 'block' }}>
                {isAllDeselected
                    ? 'Wszystkie pojemności'
                    : `Wybrano: ${selectedGuests.join(', ')} os.`}
            </Typography>
        </Box>
    );
}