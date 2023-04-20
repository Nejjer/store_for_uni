import React, { FC, ReactNode } from 'react';

import { AppStore, createAppStore } from '../../stores';

export interface AppStoreContext {
  appStore: AppStore;
}

export const StoreCtx = React.createContext<AppStoreContext>(
  null as unknown as AppStoreContext
);

export const WithStore: FC<{ children: ReactNode }> = ({ children }) => {
  const appStore = createAppStore();
  return <StoreCtx.Provider value={{ appStore }}>{children}</StoreCtx.Provider>;
};
