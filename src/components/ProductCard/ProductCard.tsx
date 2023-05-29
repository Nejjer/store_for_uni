import React, { FC, useContext } from 'react';
import { Box, Paper, Stack, Typography } from '@mui/material';
import { IProduct } from '../../stores/ShopStore';
import { observer } from 'mobx-react';
import { AppStoreContext, StoreCtx } from '../WithStore/WithStore';
import { BORDER_RADIUS } from '../../theme';
import classes from './styles.module.scss';
import StarImg from './img/start.svg';
import RemoveStarImg from './img/removeStar.svg';
import { useNavigate } from 'react-router-dom';
import { BuyButton } from '../BuyButton';

const ProductCard: FC<IProduct> = ({ title, image, price, id }) => {
  const {
    appStore: { shopStore },
  } = useContext<AppStoreContext>(StoreCtx);

  const navigate = useNavigate();

  const imgStyle = { width: 120, height: 120, borderRadius: BORDER_RADIUS.min };

  return (
    <Paper sx={{ padding: 2 }}>
      <Stack spacing={2} direction={'row'}>
        <Box
          width={120}
          height={120}
          onClick={() => {
            if (!shopStore.favoriteIds.includes(id)) {
              shopStore.addToFavorite(id);
            } else {
              shopStore.deleteFavorite(id);
            }
          }}
          className={classes.img}
        >
          <img src={image} alt={id.toString()} style={imgStyle} />
          <img
            src={shopStore.favoriteIds.includes(id) ? RemoveStarImg : StarImg}
            alt={id.toString()}
            className={classes.img__star}
          />
        </Box>
        <Stack justifyContent={'space-between'} flexGrow={1}>
          <Typography
            variant={'h4'}
            onClick={() => navigate(`/?productId=${id.toString()}`)}
            className={classes.title}
          >
            {title}
          </Typography>
          <Stack
            direction={'row'}
            alignItems={'center'}
            spacing={1}
            alignSelf={'end'}
          >
            <Typography variant={'h4'}>{price} $</Typography>
            <BuyButton productId={id} />
          </Stack>
        </Stack>
      </Stack>
    </Paper>
  );
};

const connected = observer(ProductCard);
export { connected as ProductCard };
