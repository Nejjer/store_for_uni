import React, { FC, useContext } from 'react';
import { observer } from 'mobx-react';
import { AppStoreContext, StoreCtx } from '../WithStore/WithStore';
import { Button, Stack, Typography } from '@mui/material';

interface BuyButtonProps {
  productId: number;
}

const BuyButton: FC<BuyButtonProps> = ({ productId }) => {
  const {
    appStore: { shopStore },
  } = useContext<AppStoreContext>(StoreCtx);
  return (
    <>
      {!shopStore.isContainInCard(productId) ? (
        <Button
          variant={'contained'}
          onClick={() => shopStore.addToCart(productId)}
          sx={{ width: 120 }}
        >
          <Typography variant={'h4'}>купить</Typography>
        </Button>
      ) : (
        <Stack direction={'row'}>
          <Button
            variant={'contained'}
            onClick={() => shopStore.removeFromCart(productId)}
            sx={{ width: 40, minWidth: 40 }}
          >
            <Typography variant={'h3'}>-</Typography>
          </Button>
          <Stack justifyContent={'center'} alignItems={'center'}>
            <Typography variant={'h4'} width={40} textAlign={'center'}>
              {shopStore.getItemFromCart(productId)?.count}
            </Typography>
          </Stack>
          <Button
            variant={'contained'}
            onClick={() => shopStore.addToCart(productId)}
            sx={{ width: 40, minWidth: 40 }}
          >
            <Typography variant={'h3'}>+</Typography>
          </Button>
        </Stack>
      )}
    </>
  );
};

const connected = observer(BuyButton);
export { connected as BuyButton };
