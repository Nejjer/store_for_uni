import React, { FC, useContext } from 'react';
import { observer } from 'mobx-react';
import { AppStoreContext, StoreCtx } from '../WithStore/WithStore';
import { Badge, Box, Container, Stack, useTheme } from '@mui/material';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import GradeIcon from '@mui/icons-material/Grade';

const Header: FC = (props) => {
  const {
    appStore: { shopStore },
  } = useContext<AppStoreContext>(StoreCtx);
  const theme = useTheme();
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
          spacing={2}
          justifyContent={'flex-end'}
        >
          <Badge
            badgeContent={shopStore.favoriteItems.length}
            color={'primary'}
          >
            <GradeIcon fontSize={'large'} />
          </Badge>
          <Badge badgeContent={shopStore.cart.length} color={'primary'}>
            <ShoppingCartIcon fontSize={'large'} />
          </Badge>
        </Stack>
      </Container>
    </Box>
  );
};

const connected = observer(Header);
export { connected as Header };
