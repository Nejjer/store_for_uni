import React, { FC, useContext } from 'react';
import { observer } from 'mobx-react';
import { AppStoreContext, StoreCtx } from '../WithStore/WithStore';
import { Badge, Box, Container, Stack, useTheme } from '@mui/material';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import GradeIcon from '@mui/icons-material/Grade';
import { CartModal } from '../CartModal';
import classes from './styles.module.scss';
import { FavoriteModal } from '../FavoriteModal';

const Header: FC = (props) => {
  const {
    appStore: { shopStore },
  } = useContext<AppStoreContext>(StoreCtx);
  const theme = useTheme();
  const [anchorElForCart, setAnchorElForCart] =
    React.useState<null | HTMLElement>(null);
  const [anchorElForFavorite, setAnchorElForFavorite] =
    React.useState<null | HTMLElement>(null);

  return (
    <Box
      sx={{
        backgroundColor: theme.palette.background.paper,
        marginBottom: 2,
      }}
    >
      <Container>
        <Stack
          padding={2}
          direction={'row'}
          spacing={3}
          justifyContent={'flex-end'}
        >
          <CartModal
            open={!!anchorElForCart}
            anchorEl={anchorElForCart}
            onClose={() => setAnchorElForCart(null)}
          />
          <FavoriteModal
            open={!!anchorElForFavorite}
            anchorEl={anchorElForFavorite}
            onClose={() => setAnchorElForFavorite(null)}
          />
          <Badge
            badgeContent={shopStore.favoriteIds.length}
            color={'primary'}
            className={classes.badge}
            onClick={(e) => setAnchorElForFavorite(e.currentTarget)}
          >
            <GradeIcon sx={{ fontSize: 50 }} fontSize={'large'} />
          </Badge>
          <Badge
            onClick={(e) => setAnchorElForCart(e.currentTarget)}
            badgeContent={shopStore.countItemsInCart}
            color={'primary'}
            className={classes.badge}
          >
            <ShoppingCartIcon sx={{ fontSize: 50 }} />
            {shopStore.totalCartPrice ? (
              <div className={classes.priceBadge}>
                {shopStore.totalCartPrice}&nbsp;$
              </div>
            ) : null}
          </Badge>
        </Stack>
      </Container>
    </Box>
  );
};

const connected = observer(Header);
export { connected as Header };
