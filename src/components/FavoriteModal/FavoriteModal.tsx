import React, { FC, useContext } from 'react';
import { Paper, Popover, useTheme } from '@mui/material';
import { observer } from 'mobx-react';
import { AppStoreContext, StoreCtx } from '../WithStore/WithStore';
import { ProductCard } from '../ProductCard';

interface FavoriteModalProps {
  open: boolean;
  anchorEl?: Element | null;
  onClose?: () => void;
}

const FavoriteModal: FC<FavoriteModalProps> = ({ anchorEl, onClose, open }) => {
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
        {shopStore.favoriteProducts.map((item) => (
          <ProductCard {...item} />
        ))}
      </Paper>
    </Popover>
  );
};
const connected = observer(FavoriteModal);
export { connected as FavoriteModal };
