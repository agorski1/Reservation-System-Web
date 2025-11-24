// src/components/payment/PaymentSummary.tsx
import { Paper, Typography, Button, TextField, Box } from '@mui/material';
import type { UserReservation } from '../../models/UserReservation';

type Props = {
  reservation: UserReservation;
  remaining: number;
  onNext: () => void;
  amountToPay: number | '';
  onAmountChange: (value: number | '') => void;
};

export default function PaymentSummary({ reservation, remaining, onNext, amountToPay, onAmountChange }: Props) {
  return (
    <Paper sx={{ p: 5 }}>
      <Typography variant="h5" gutterBottom>Podsumowanie rezerwacji</Typography>

      <Typography>Pokój: {reservation.roomNumber} {reservation.roomType && `– ${reservation.roomType}`}</Typography>
      <Typography>Termin: od {new Date(reservation.from).toLocaleDateString()} do {new Date(reservation.to).toLocaleDateString()}</Typography>

      <Box sx={{ my: 3, py: 2, borderTop: 1, borderBottom: 1, borderColor: 'grey.300' }}>
        <Typography variant="h6">Cena całkowita: <strong>{reservation.totalPrice.toFixed(2)} zł</strong></Typography>
        {reservation.paidAmount > 0 && (
          <Typography color="success.main">Już wpłacono: {reservation.paidAmount.toFixed(2)} zł</Typography>
        )}
        <Typography variant="h5" color="error" sx={{ mt: 1 }}>
          Pozostało do zapłaty: {remaining.toFixed(2)} zł
        </Typography>
      </Box>

      <Typography variant="body1" gutterBottom>Ile chcesz wpłacić teraz?</Typography>
      <TextField
        fullWidth
        type="number"
        value={amountToPay}
        onChange={(e) => {
          const val = e.target.value === '' ? '' : Number(e.target.value);
          if (val === '' || (val > 0 && val <= remaining)) {
            onAmountChange(val);
          }
        }}
        inputProps={{ min: 1, max: remaining, step: 10 }}
        sx={{ mb: 3 }}
      />

      <Button fullWidth variant="contained" size="large" onClick={onNext}>
        Przejdź do płatności
      </Button>
    </Paper>
  );
}