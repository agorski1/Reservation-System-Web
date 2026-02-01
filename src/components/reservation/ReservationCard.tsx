import { Paper, Stack, Typography, Chip, Button, Box } from '@mui/material';
import { format, parseISO } from 'date-fns';
import { pl } from 'date-fns/locale';
import { useNavigate } from 'react-router-dom';
import type { UserReservation } from '../../models/UserReservation';

const STATUS_TRANSLATIONS: Record<string, string> = {
    Pending: 'Oczekująca',
    Confirmed: 'Potwierdzona',
    Cancelled: 'Anulowana',
    Rejected: 'Odrzucona',
    Completed: 'Zakończona',
    'Partial-Paid': 'Częściowo opłacona',
    Paid: 'Opłacona',
};

type Props = {
  reservation: UserReservation;
  onCancel: (id: number) => void;
  isCancelling: boolean;
};

export default function ReservationCard({ reservation: res, onCancel, isCancelling }: Props) {
  const navigate = useNavigate();

  const canCancel = !['Cancelled', 'Rejected', 'Completed'].includes(res.status);
    const showPaymentInfo = !['Cancelled', 'Rejected'].includes(res.status);

  const handlePay = () => {
    navigate(`/payment/${res.reservationId}`);
  };

  return (
    <Paper elevation={4} sx={{ p: 4, borderRadius: 3 }}>
      <Stack direction={{ xs: 'column', md: 'row' }} justifyContent="space-between" spacing={4}>
        <Box>
          <Typography variant="h5" fontWeight="bold">
            Pokój {res.roomNumber}
            {res.roomType && ` – ${res.roomType}`}
          </Typography>

          <Typography variant="body1" color="text.secondary" sx={{ mt: 1 }}>
            Od: {format(parseISO(res.from), 'dd MMMM yyyy, HH:mm', { locale: pl })}
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Do: {format(parseISO(res.to), 'dd MMMM yyyy, HH:mm', { locale: pl })}
          </Typography>
        </Box>

        <Stack alignItems="flex-end" spacing={2}>
            <Chip
                label={STATUS_TRANSLATIONS[res.status] || res.status}
                color={
                    ['Cancelled', 'Rejected'].includes(res.status)
                        ? 'default'
                        : res.status === 'Paid'
                            ? 'success'
                            : res.status === 'Partial-Paid'
                                ? 'warning'
                                : 'primary'
                }
                size="medium"
            />

            {showPaymentInfo && (
                <Box textAlign="right">
                    <Typography variant="body2">
                        Cena całkowita: <strong>{res.totalPrice.toFixed(2)} zł</strong>
                    </Typography>
                    <Typography variant="body2">
                        Zapłacono: <strong style={{ color: 'green' }}>{res.paidAmount.toFixed(2)} zł</strong>
                    </Typography>

                    {res.remainingAmount > 0 ? (
                        <Typography variant="h6" fontWeight="bold" color="error">
                            Pozostało: {res.remainingAmount.toFixed(2)} zł
                        </Typography>
                    ) : (
                        <Typography variant="h6" fontWeight="bold" color="success">
                            Opłacona w całości
                        </Typography>
                    )}
                </Box>
            )}

          <Stack direction="row" spacing={2} sx={{ mt: 1 }}>
            {res.remainingAmount > 0 && (
              <Button
                variant="contained"
                color="success"
                size="small"
                onClick={handlePay}
              >
                Opłać teraz ({res.remainingAmount.toFixed(2)} zł)
              </Button>
            )}

            {canCancel && (
              <Button
                variant="outlined"
                color="error"
                size="small"
                onClick={() => onCancel(res.reservationId)}
                disabled={isCancelling}
              >
                {isCancelling ? 'Anulowanie...' : 'Anuluj'}
              </Button>
            )}
          </Stack>
        </Stack>
      </Stack>
    </Paper>
  );
}