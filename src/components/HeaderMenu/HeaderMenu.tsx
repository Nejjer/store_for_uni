import React, { FC } from 'react';
import { Paper, Stack } from '@mui/material';
import { SortMenu } from '../SortMenu';
import { FilterMenu } from '../FilterMenu';
import { observer } from 'mobx-react';

interface HeaderMenuProps {}

const HeaderMenu: FC<HeaderMenuProps> = (props) => {
  return (
    <Paper sx={{ padding: 2 }}>
      <Stack spacing={2} direction={{ md: 'row', sx: 'column' }}>
        <SortMenu />
        <FilterMenu />
      </Stack>
    </Paper>
  );
};

const connected = observer(HeaderMenu);
export { connected as HeaderMenu };
