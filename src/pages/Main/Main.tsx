import React, { FC, useCallback, useContext } from 'react';
import { observer } from 'mobx-react';
import {
  AppStoreContext,
  StoreCtx,
} from '../../components/WithStore/WithStore';
import { ProductCard } from '../../components/ProductCard';
import { Container, Skeleton, Snackbar, Stack } from '@mui/material';
import { Header } from '../../components/Header';
import Grid2 from '@mui/material/Unstable_Grid2';
import { HeaderMenu } from '../../components/HeaderMenu';
import { ProductPageModal } from '../ProductPageModal';
import { SNACKBAR_DELAY } from '../../stores/SnackbarStore';

interface MainProps {}

const Main: FC<MainProps> = () => {
  const {
    appStore: { shopStore, snackbarStore },
  } = useContext<AppStoreContext>(StoreCtx);

  const renderSkeleton = useCallback(
    () => (
      <Grid2 xs={12} sm={12} md={6}>
        <Skeleton height={152} />
      </Grid2>
    ),
    []
  );

  return (
    <>
      <ProductPageModal />
      <Header />
      <Container>
        <Stack spacing={2}>
          <HeaderMenu />
          <Grid2 container spacing={2}>
            {!shopStore.loading
              ? shopStore.filteredProduct.map((item) => (
                  <Grid2 xs={12} sm={12} md={6} key={item.id}>
                    <ProductCard {...item} />
                  </Grid2>
                ))
              : new Array(20).fill(renderSkeleton())}
          </Grid2>
        </Stack>
      </Container>
      <Snackbar
        open={snackbarStore.isOpen}
        autoHideDuration={SNACKBAR_DELAY}
        onClose={() => snackbarStore.onClose()}
        message={snackbarStore.message}
      />
    </>
  );
};

const connected = observer(Main);
export { connected as Main };
