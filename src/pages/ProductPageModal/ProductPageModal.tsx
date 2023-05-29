import React, { FC, useCallback, useContext, useEffect, useState } from 'react';
import {
  Box,
  Modal,
  Paper,
  Rating,
  Skeleton,
  Stack,
  Typography,
} from '@mui/material';
import { observer } from 'mobx-react';
import {
  AppStoreContext,
  StoreCtx,
} from '../../components/WithStore/WithStore';
import { useLocation, useNavigate } from 'react-router-dom';
import classes from './styles.module.scss';
import { BuyButton } from '../../components/BuyButton';
import { BORDER_RADIUS } from '../../theme';
import { IProductDetailed } from '../../stores/ShopStore';
import { productApi } from '../../api/ProductAPI';

const ProductPageModal: FC = () => {
  const {
    appStore: { shopStore },
  } = useContext<AppStoreContext>(StoreCtx);
  const { search } = useLocation();
  const [id, setId] = useState<number | null>(null);
  const [product, setProduct] = useState<IProductDetailed | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const renderSkeleton = useCallback(
    () => (
      <Paper sx={{ padding: 5 }}>
        <Stack direction={'row'} spacing={4}>
          <Box flexBasis={'40%'}>
            <Skeleton width={'100%'} height={280} />
          </Box>
          <Stack flexBasis={'60%'} spacing={2}>
            <Skeleton height={76} />
            <Skeleton height={100} />
            <Skeleton height={50} />
          </Stack>
        </Stack>
      </Paper>
    ),
    []
  );

  useEffect(() => {
    const idFromParam = new URL(window.location.href).searchParams.get(
      'productId'
    );
    idFromParam ? setId(parseInt(idFromParam)) : setId(null);
  }, [search]);

  useEffect(() => {
    setProduct(null);
    setIsLoading(true);
    (async () => {
      id && setProduct(await productApi.getProduct(id));
      setIsLoading(false);
    })();
  }, [id]);

  const render = useCallback(() => {
    switch (true) {
      case !product && isLoading:
        return renderSkeleton();
      case !!product:
        return (
          product && (
            <Paper sx={{ padding: 5 }}>
              <Stack spacing={4} direction={{ sm: 'row' }}>
                <Box flexBasis={'40%'}>
                  <img
                    src={product.image}
                    style={{
                      borderRadius: BORDER_RADIUS.normal,
                      width: '100%',
                    }}
                    alt="КартинОчка"
                  />
                </Box>
                <Stack
                  justifyContent={'space-between'}
                  spacing={2}
                  flexBasis={'60%'}
                >
                  <Stack spacing={2}>
                    <Typography variant={'h2'}>{product.title}</Typography>
                    <Typography variant={'body1'}>
                      {product.description}
                    </Typography>
                  </Stack>
                  <Stack
                    direction={'row'}
                    spacing={2}
                    alignItems={'center'}
                    justifyContent={'space-between'}
                  >
                    <Rating value={product.rating.rate} readOnly />
                    <BuyButton productId={product.id} />
                  </Stack>
                </Stack>
              </Stack>
            </Paper>
          )
        );
      case !product:
        return (
          <Paper sx={{ padding: 5 }}>
            <Typography variant={'h3'} textAlign={'center'}>
              Товар не найден😞
            </Typography>
          </Paper>
        );
    }
  }, [product, isLoading]);

  return (
    <Modal open={!!id} onClose={() => navigate('/')}>
      <div className={classes.container}>{render()}</div>
    </Modal>
  );
};

const connected = observer(ProductPageModal);
export { connected as ProductPageModal };
