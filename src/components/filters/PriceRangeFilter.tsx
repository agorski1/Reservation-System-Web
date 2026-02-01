import {Box, TextField, Typography} from '@mui/material';

interface Props {
    min: string;
    max: string;
    onChange: (min: string, max: string) => void;
}

export default function PriceRangeFilter({min, max, onChange}: Props) {
    return (
        <Box>
            <Typography fontWeight="bold" gutterBottom>Cena za noc</Typography>
            <Box
                sx={{
                    display: 'flex',
                    gap: 2,
                    alignItems: 'center',
                    flexWrap: 'wrap'
                }}>
                <TextField
                    label="Od"
                    type="number"
                    value={min}
                    onChange={(e) =>
                        onChange(e.target.value, max)}
                    placeholder="0"
                    sx={{width: 120}}
                />
                <Typography>–</Typography>
                <TextField
                    label="Do"
                    type="number"
                    value={max}
                    onChange={(e) =>
                        onChange(min, e.target.value)}
                    placeholder="1000"
                    sx={{width: 120}}
                />
                <Typography>zł</Typography>
            </Box>
        </Box>
    );
}