import React, { FC, useContext } from 'react';
import { Button, Paper, Stack, Typography } from '@mui/material';
import { IProduct } from '../../stores/ShopStore';
import { observer } from 'mobx-react';
import { AppStoreContext, StoreCtx } from '../WithStore/WithStore';

const ProductCard: FC<IProduct> = ({
  title,
  description,
  image,
  price,
  id,
}) => {
  const {
    appStore: { shopStore },
  } = useContext<AppStoreContext>(StoreCtx);

  return (
    <Paper sx={{ padding: 2, height: 240 }}>
      <Stack spacing={2}>
        <Typography variant={'h5'}>{title}</Typography>
        <Typography variant={'body2'}>Цена: {price}</Typography>
        <Button onClick={() => shopStore.addToFavorite(id)}>
          Добавить в избранное
        </Button>
      </Stack>
    </Paper>
  );
};
const connected = observer(ProductCard);
export { connected as ProductCard };
