import { ShopStore } from './ShopStore';
import { SnackbarStore } from './SnackbarStore';

export interface AppStore {
  shopStore: ShopStore;
  snackbarStore: SnackbarStore;
}

export const createAppStore = (): AppStore => ({
  shopStore: new ShopStore(),
  snackbarStore: new SnackbarStore(),
});
