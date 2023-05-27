import React, { FC, useContext } from 'react';
import { observer } from 'mobx-react';
import {
  AppStoreContext,
  StoreCtx,
} from '../../components/WithStore/WithStore';
import { ProductCard } from '../../components/ProductCard';
import { Button, Container, Stack } from '@mui/material';
import { Header } from '../../components/Header';
import { SideMenu } from '../../components/SideMenu';
import { FilterMenu } from '../../components/FilterMenu';
import Grid2 from '@mui/material/Unstable_Grid2';

interface MainProps {}

const Main: FC<MainProps> = (props) => {
  const {
    appStore: { shopStore },
  } = useContext<AppStoreContext>(StoreCtx);

  const spacing = 8;
  return (
    <Container>
      <Header />
      <Stack direction={'row'}>
        <SideMenu />
        <FilterMenu />
        <Button onClick={() => shopStore.clearFilter()}>Очистить фильтр</Button>
      </Stack>
      <Grid2 container spacing={2}>
        {shopStore.filteredProduct.map((item) => (
          <Grid2 xs={12} sm={12} md={6} key={item.id}>
            <ProductCard {...item} />
          </Grid2>
        ))}
      </Grid2>
    </Container>
  );
};

const connected = observer(Main);
export { connected as Main };
