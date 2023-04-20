import { ShopStore } from "./ShopStore";

export interface AppStore {
  shopStore: ShopStore;
}

export const createAppStore = (): AppStore => ({
  shopStore: new ShopStore(),
});
