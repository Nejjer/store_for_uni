import React, { FC, useCallback, useContext } from 'react';
import { Box, Button, Paper, Stack, Typography } from '@mui/material';
import { IProduct } from '../../stores/ShopStore';
import { observer } from 'mobx-react';
import { AppStoreContext, StoreCtx } from '../WithStore/WithStore';
import { BORDER_RADIUS } from '../../theme';
import classes from './styles.module.scss';
import StarImg from './img/start.svg';
import RemoveStarImg from './img/removeStar.svg';

const ProductCard: FC<IProduct> = ({
  title,
  description,
  image,
  price,
  id,
  category,
}) => {
  const {
    appStore: { shopStore },
  } = useContext<AppStoreContext>(StoreCtx);

  const renderBtn = useCallback(() => {
    return (
      <>
        {!shopStore.isContainInCard(id) ? (
          <Button
            variant={'contained'}
            onClick={() => shopStore.addToCart(id)}
            sx={{ width: 120 }}
          >
            <Typography variant={'h4'}>купить</Typography>
          </Button>
        ) : (
          <Stack direction={'row'}>
            <Button
              variant={'contained'}
              onClick={() => shopStore.removeFromCart(id)}
              sx={{ width: 40, minWidth: 40 }}
            >
              <Typography variant={'h3'}>-</Typography>
            </Button>
            <Stack justifyContent={'center'} alignItems={'center'}>
              <Typography variant={'h4'} width={40} textAlign={'center'}>
                {shopStore.getItemFromCart(id)?.count}
              </Typography>
            </Stack>
            <Button
              variant={'contained'}
              onClick={() => shopStore.addToCart(id)}
              sx={{ width: 40, minWidth: 40 }}
            >
              <Typography variant={'h3'}>+</Typography>
            </Button>
          </Stack>
        )}
      </>
    );
  }, [id, shopStore.cart, shopStore]);

  const imgStyle = { width: 120, height: 120, borderRadius: BORDER_RADIUS.min };

  return (
    <Paper sx={{ padding: 2 }}>
      <Stack spacing={2} direction={'row'}>
        <Box
          width={120}
          height={120}
          onClick={() => {
            if (!shopStore.favoriteItems.includes(id)) {
              shopStore.addToFavorite(id);
            } else {
              shopStore.deleteFavorite(id);
            }
          }}
          className={classes.img}
        >
          <img src={image} alt={id.toString()} style={imgStyle} />
          <img
            src={shopStore.favoriteItems.includes(id) ? RemoveStarImg : StarImg}
            alt={id.toString()}
            className={classes.img__star}
          />
        </Box>
        <Stack justifyContent={'space-between'} flexGrow={1}>
          <Typography variant={'h4'}>{title}</Typography>
          <Stack
            direction={'row'}
            alignItems={'center'}
            spacing={1}
            alignSelf={'end'}
          >
            <Typography variant={'h4'}>{price} $</Typography>
            {renderBtn()}
          </Stack>
        </Stack>
      </Stack>
    </Paper>
  );
};

const connected = observer(ProductCard);
export { connected as ProductCard };
