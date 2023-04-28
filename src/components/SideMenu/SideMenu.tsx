import React, { FC, useContext } from 'react';
import { observer } from 'mobx-react';
import { AppStoreContext, StoreCtx } from '../WithStore/WithStore';
import { Button, Menu, MenuItem } from '@mui/material';

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
    <div>
      <Button onClick={handleClick}>Сортировать</Button>
      <Menu anchorEl={anchorEl} open={open} onClose={handleClose}>
        <MenuItem
          onClick={() => {
            shopStore.sortByName();
            handleClose();
          }}
        >
          Сортировать по алфавиту
        </MenuItem>
        <MenuItem
          onClick={() => {
            shopStore.sortByPrice();
            handleClose();
          }}
        >
          Сортировать по цене
        </MenuItem>
      </Menu>
    </div>
  );
};

const connected = observer(SortMenu);
export { connected as SideMenu };
