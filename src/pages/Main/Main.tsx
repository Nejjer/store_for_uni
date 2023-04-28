import React, { FC, useContext } from 'react';
import { observer } from 'mobx-react';
import {
  AppStoreContext,
  StoreCtx,
} from '../../components/WithStore/WithStore';
import { ProductCard } from '../../components/ProductCard';
import { Container, Stack } from '@mui/material';

interface MainProps {}

const Main: FC<MainProps> = (props) => {
  const {
    appStore: { shopStore },
  } = useContext<AppStoreContext>(StoreCtx);

  const spacing = 8;
  return (
    <Container>
      <Stack direction={'column'} spacing={1}>
        {shopStore.products.map((item) => (
          <ProductCard {...item} />
        ))}
      </Stack>
    </Container>
  );
};

const connected = observer(Main);
export { connected as Main };
