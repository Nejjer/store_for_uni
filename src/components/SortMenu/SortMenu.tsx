import React, { FC, useContext } from 'react';
import { observer } from 'mobx-react';
import { AppStoreContext, StoreCtx } from '../WithStore/WithStore';
import { Button, Menu, MenuItem, Stack } from '@mui/material';
import SortIcon from '@mui/icons-material/Sort';

const SortMenu: FC = (props) => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const {
    appStore: { shopStore },
  } = useContext<AppStoreContext>(StoreCtx);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <Stack direction={'row'} spacing={0.5}>
        <Button
          variant={'contained'}
          onClick={handleClick}
          sx={{ borderBottomRightRadius: 0, borderTopRightRadius: 0 }}
        >
          Сортировать по {shopStore.sortField == 'title' ? 'алфавиту' : 'цене'}
        </Button>
        <Button
          variant={'contained'}
          onClick={() => shopStore.revertSort()}
          sx={{ borderTopLeftRadius: 0, borderBottomLeftRadius: 0 }}
        >
          <SortIcon
            sx={{ transform: shopStore.descSort ? 'scale(1, -1)' : undefined }}
          />
        </Button>
      </Stack>
      <Menu anchorEl={anchorEl} open={open} onClose={handleClose}>
        <MenuItem
          onClick={() => {
            shopStore.sortField = 'title';
            handleClose();
          }}
        >
          Сортировать по алфавиту
        </MenuItem>
        <MenuItem
          onClick={() => {
            shopStore.sortField = 'price';
            handleClose();
          }}
        >
          Сортировать по цене
        </MenuItem>
      </Menu>
    </>
  );
};

const connected = observer(SortMenu);
export { connected as SortMenu };
