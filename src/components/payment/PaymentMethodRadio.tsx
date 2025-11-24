import { FormControlLabel, Radio, Box } from '@mui/material';
import type { ReactNode } from 'react';

type Props = {
  value: string;
  icon: ReactNode;
  label: string;
};

export default function PaymentMethodRadio({ value, icon, label }: Props) {
  return (
    <FormControlLabel
      value={value}
      control={<Radio />}
      label={
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          {icon} {label}
        </Box>
      }
      sx={{ mb: 1 }}
    />
  );
}