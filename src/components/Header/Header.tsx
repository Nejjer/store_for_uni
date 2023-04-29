import React, { FC, useContext } from 'react';

import classes from './styles.module.scss';
import { observer } from 'mobx-react';
import { AppStoreContext, StoreCtx } from '../WithStore/WithStore';
import { Stack } from '@mui/material';

const Header: FC = (props) => {
  const {
    appStore: { shopStore },
  } = useContext<AppStoreContext>(StoreCtx);
  return (
    <Stack className={classes.container}>
      <div>заголовок</div>
      <div>В избранном: {shopStore.favoriteItems.length}</div>
    </Stack>
  );
};

const connected = observer(Header);
export { connected as Header };
