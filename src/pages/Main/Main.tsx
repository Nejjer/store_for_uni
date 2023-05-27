import React, { FC, useContext } from 'react';
import { observer } from 'mobx-react';
import {
  AppStoreContext,
  StoreCtx,
} from '../../components/WithStore/WithStore';
import { ProductCard } from '../../components/ProductCard';
import { Container, Skeleton, Stack } from '@mui/material';
import { Header } from '../../components/Header';
import Grid2 from '@mui/material/Unstable_Grid2';
import { HeaderMenu } from '../../components/HeaderMenu';

interface MainProps {}

const Main: FC<MainProps> = () => {
  const {
    appStore: { shopStore },
  } = useContext<AppStoreContext>(StoreCtx);

  console.log(shopStore.loading);

  return (
    <>
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
              : [1, 2, 4, 5, 6, 7, 8, 9, 10].map((_) => (
                  <Grid2 xs={12} sm={12} md={6} key={_}>
                    <Skeleton height={152} />
                  </Grid2>
                ))}
          </Grid2>
        </Stack>
      </Container>
    </>
  );
};

const connected = observer(Main);
export { connected as Main };
