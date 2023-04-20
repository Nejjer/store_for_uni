import React, { FC, useContext } from 'react';
import { observer } from 'mobx-react';
import {
  AppStoreContext,
  StoreCtx,
} from '../../components/WithStore/WithStore';

interface MainProps {}

const Main: FC<MainProps> = (props) => {
  const {
    appStore: { shopStore },
  } = useContext<AppStoreContext>(StoreCtx);

  return (
    <div>
      {shopStore.products.map((item) => (
        <div>{item.title}</div>
      ))}
    </div>
  );
};

const connected = observer(Main);
export { connected as Main };
