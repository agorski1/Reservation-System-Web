import { Box, CircularProgress, Typography } from '@mui/material';

export default function PaymentProcessing() {
  return (
    <Box textAlign="center" sx={{ py: 10 }}>
      <CircularProgress size={80} />
      <Typography variant="h5" sx={{ mt: 4 }}>
        Przetwarzamy Twoją płatność...
      </Typography>
    </Box>
  );
}