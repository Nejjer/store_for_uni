import React, { FC, useContext } from 'react';
import { observer } from 'mobx-react';
import {
  AppStoreContext,
  StoreCtx,
} from '../../components/WithStore/WithStore';
import { ProductCard } from '../../components/ProductCard';
import Grid2 from '@mui/material/Unstable_Grid2';
import { Container } from '@mui/material';

interface MainProps {}

const Main: FC<MainProps> = (props) => {
  const {
    appStore: { shopStore },
  } = useContext<AppStoreContext>(StoreCtx);

  const spacing = 8;
  return (
    <Container>
      <Grid2 container columnSpacing={spacing} rowSpacing={spacing}>
        {shopStore.products.map((item) => (
          <Grid2 xs={12} sm={6} md={4} lg={3}>
            <ProductCard {...item} />
          </Grid2>
        ))}
      </Grid2>
    </Container>
  );
};

const connected = observer(Main);
export { connected as Main };
