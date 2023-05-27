import React, { FC, useContext } from 'react';
import { observer } from 'mobx-react';
import {
  Button,
  Divider,
  Paper,
  Popover,
  Stack,
  Typography,
  useTheme,
} from '@mui/material';
import { AppStoreContext, StoreCtx } from '../WithStore/WithStore';
import { ProductCard } from '../ProductCard';

interface CartModalProps {
  open: boolean;
  anchorEl?: Element | null;
  onClose?: () => void;
}

const CartModal: FC<CartModalProps> = ({ open, anchorEl, onClose }) => {
  const {
    appStore: { shopStore },
  } = useContext<AppStoreContext>(StoreCtx);
  const theme = useTheme();

  return (
    <Popover
      anchorEl={anchorEl}
      open={open}
      onClose={onClose}
      anchorOrigin={{ horizontal: 'left', vertical: 'bottom' }}
      transformOrigin={{ horizontal: 'right', vertical: 'top' }}
    >
      <Paper
        sx={{
          backgroundColor: theme.palette.background.default,
          padding: 2,
        }}
      >
        <Stack spacing={2}>
          <Stack maxWidth={600} spacing={2}>
            {shopStore.cartItems.map((item) => (
              <ProductCard key={item.id} {...item} />
            ))}
          </Stack>
          <Divider />
          <Stack direction={'row'} justifyContent={'space-between'}>
            <Typography variant={'h5'}>Итого:</Typography>
            <Typography variant={'h5'}>{shopStore.totalCartPrice}</Typography>
          </Stack>
          <Stack alignItems={'end'}>
            <Button
              variant={'contained'}
              onClick={() => alert('Не, для этого я код не писал')}
            >
              Купить
            </Button>
          </Stack>
        </Stack>
      </Paper>
    </Popover>
  );
};

const connected = observer(CartModal);
export { connected as CartModal };
