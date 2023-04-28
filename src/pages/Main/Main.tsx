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
      <Stack direction={'column'} spacing={1}>
        {shopStore.filteredProduct.map((item) => (
          <ProductCard key={item.id} {...item} />
        ))}
      </Stack>
    </Container>
  );
};

const connected = observer(Main);
export { connected as Main };
