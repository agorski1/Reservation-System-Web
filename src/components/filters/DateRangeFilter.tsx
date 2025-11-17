import { Box, TextField, Typography } from '@mui/material';
import { format } from 'date-fns';

interface Props {
    from: string;
    to: string;
    onChange: (from: string, to: string) => void;
}

export default function DateRangeFilter({ from, to, onChange }: Props) {
    return (
        <Box>
            <Typography fontWeight="bold" gutterBottom>Daty pobytu</Typography>
            <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
                <TextField
                    label="Od"
                    type="date"
                    value={from}
                    onChange={(e) => onChange(e.target.value, to)}
                    InputLabelProps={{ shrink: true }}
                    sx={{ minWidth: 160 }}
                />
                <TextField
                    label="Do"
                    type="date"
                    value={to}
                    onChange={(e) => onChange(from, e.target.value)}
                    InputLabelProps={{ shrink: true }}
                    sx={{ minWidth: 160 }}
                />
            </Box>
        </Box>
    );
}