import React, { FC } from 'react';
import { Paper, Stack, Typography } from '@mui/material';
import { IProduct } from '../../stores/ShopStore';

export const ProductCard: FC<IProduct> = ({ title, description, image }) => {
  return (
    <Paper sx={{ padding: 2, height: 240 }}>
      <Stack spacing={2}>
        <Typography variant={'h5'}>{title}</Typography>
      </Stack>
    </Paper>
  );
};
