import { Paper, Typography, RadioGroup, Button } from '@mui/material';
import PaymentMethodRadio from './PaymentMethodRadio';
import { CreditCard, Smartphone, AccountBalance } from '@mui/icons-material';

type Props = {
  selectedMethod: string;
  onMethodChange: (method: string) => void;
  remaining: number;
  onPay: () => void;
};

export default function PaymentMethodStep({ selectedMethod, onMethodChange, remaining, onPay }: Props) {
  return (
    <Paper sx={{ p: 5 }}>
      <Typography variant="h5" gutterBottom>
        Wybierz metodę płatności
      </Typography>
      <RadioGroup value={selectedMethod} onChange={(e) => onMethodChange(e.target.value)}>
        <PaymentMethodRadio value="BLIK" icon={<Smartphone />} label="BLIK" />
        <PaymentMethodRadio value="CARD" icon={<CreditCard />} label="Karta płatnicza" />
        <PaymentMethodRadio value="TRANSFER" icon={<AccountBalance />} label="Przelew tradycyjny" />
      </RadioGroup>
      <Button fullWidth variant="contained" color="success" size="large" sx={{ mt: 4 }} onClick={onPay}>
        Zapłać {remaining} zł
      </Button>
    </Paper>
  );
}