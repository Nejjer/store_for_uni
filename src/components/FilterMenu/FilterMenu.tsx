import React, { FC, useContext } from 'react';
import { observer } from 'mobx-react';
import { AppStoreContext, StoreCtx } from '../WithStore/WithStore';
import { Button, Menu, MenuItem } from '@mui/material';

const FilterMenu: FC = () => {
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
      <Button variant={'contained'} onClick={handleClick}>
        {shopStore.filterCategory ? shopStore.filterCategory : 'Фильтр'}
      </Button>
      <Menu anchorEl={anchorEl} open={open} onClose={handleClose}>
        {shopStore.categories.map((category) => (
          <MenuItem
            key={category}
            onClick={() => {
              shopStore.filterByCategory(category);
              handleClose();
            }}
          >
            {category}
          </MenuItem>
        ))}
      </Menu>
      <Button variant={'contained'} onClick={() => shopStore.clearFilter()}>
        Очистить фильтр
      </Button>
      <Button
        variant={'contained'}
        onClick={() => (shopStore.onlyFavorites = !shopStore.onlyFavorites)}
      >
        {shopStore.onlyFavorites ? 'Все' : 'Избранные'}
      </Button>
    </>
  );
};

const connected = observer(FilterMenu);
export { connected as FilterMenu };
