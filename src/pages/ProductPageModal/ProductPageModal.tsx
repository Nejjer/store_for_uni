import React, { FC, useContext, useEffect, useState } from 'react';
import { Modal } from '@mui/material';
import { ProductCard } from '../../components/ProductCard';
import { observer } from 'mobx-react';
import {
  AppStoreContext,
  StoreCtx,
} from '../../components/WithStore/WithStore';
import { useLocation, useNavigate } from 'react-router-dom';
import classes from './styles.module.scss';

const ProductPageModal: FC = (props) => {
  const {
    appStore: { shopStore },
  } = useContext<AppStoreContext>(StoreCtx);
  const { search } = useLocation();
  const [id, setId] = useState<number | undefined>(undefined);
  const navigate = useNavigate();

  useEffect(() => {
    const idFromParam = new URL(window.location.href).searchParams.get(
      'productId'
    );
    idFromParam ? setId(parseInt(idFromParam)) : setId(undefined);
  }, [search]);

  const product = id && shopStore.getProductById(id);

  return (
    <Modal open={!!id} onClose={() => navigate('/')}>
      <div className={classes.container}>
        {product && <ProductCard {...product} />}
      </div>
    </Modal>
  );
};

const connected = observer(ProductPageModal);
export { connected as ProductPageModal };
