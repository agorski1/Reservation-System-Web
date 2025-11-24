import { Paper, Typography, Button } from '@mui/material';
import { CheckCircleOutline } from '@mui/icons-material';

type Props = {
  onBack: () => void;
};

export default function PaymentSuccess({ onBack }: Props) {
  return (
    <Paper sx={{ p: 6, textAlign: 'center' }}>
      <CheckCircleOutline sx={{ fontSize: 120, color: 'success.main' }} />
      <Typography variant="h4" color="success.main" gutterBottom>
        Płatność przyjęta!
      </Typography>
      <Typography variant="h6" sx={{ mb: 2 }}>
        Dziękujemy za dokonanie płatności
      </Typography>
      <Button variant="contained" size="large" sx={{ mt: 4 }} onClick={onBack}>
        Wróć do moich rezerwacji
      </Button>
    </Paper>
  );
}